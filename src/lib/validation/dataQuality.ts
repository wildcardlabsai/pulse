import { Fighter, Fight, BoxingEvent, BookmakerPrice } from '../../types/boxing';

export interface QualityIssue {
  id: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  ruleCode: string;
  entityType: 'fighter' | 'fight' | 'event' | 'odds';
  entityId: string;
  message: string;
  timestamp: string;
}

export interface ValidationResult<T> {
  isValid: boolean;
  sanitizedData?: T;
  issues: QualityIssue[];
}

export class DataQualityValidator {
  
  /**
   * Validates and detects duplicate fighters or conflicting records
   */
  public static validateFighters(fighters: Fighter[]): QualityIssue[] {
    const issues: QualityIssue[] = [];
    const seenNames = new Map<string, Fighter>();
    const seenProviderIds = new Map<string, Fighter>();

    for (const fighter of fighters) {
      const normalizedName = fighter.name.toLowerCase().trim();

      // Missing Provider ID check
      if (!fighter.source || !fighter.source.providerId) {
        issues.push({
          id: `missing-pid-${fighter.id}`,
          severity: 'WARNING',
          ruleCode: 'MISSING_PROVIDER_ID',
          entityType: 'fighter',
          entityId: fighter.id,
          message: `Fighter "${fighter.name}" has no upstream provider ID.`,
          timestamp: new Date().toISOString()
        });
      }

      // Duplicate Name Check
      if (seenNames.has(normalizedName)) {
        const existing = seenNames.get(normalizedName)!;
        issues.push({
          id: `dup-fighter-${fighter.id}`,
          severity: 'CRITICAL',
          ruleCode: 'DUPLICATE_FIGHTER',
          entityType: 'fighter',
          entityId: fighter.id,
          message: `Potential duplicate fighter found: "${fighter.name}" conflicts with ID "${existing.id}".`,
          timestamp: new Date().toISOString()
        });

        // Conflicting Records Check
        if (
          existing.record.wins !== fighter.record.wins ||
          existing.record.losses !== fighter.record.losses
        ) {
          issues.push({
            id: `conflict-rec-${fighter.id}`,
            severity: 'CRITICAL',
            ruleCode: 'CONFLICTING_RECORDS',
            entityType: 'fighter',
            entityId: fighter.id,
            message: `Conflicting professional records for "${fighter.name}": (${existing.record.wins}-${existing.record.losses}) vs (${fighter.record.wins}-${fighter.record.losses}).`,
            timestamp: new Date().toISOString()
          });
        }
      } else {
        seenNames.set(normalizedName, fighter);
      }
    }

    return issues;
  }

  /**
   * Validates fight integrity: participants, dates, scheduled rounds
   */
  public static validateFight(fight: Partial<Fight>): ValidationResult<Fight> {
    const issues: QualityIssue[] = [];
    const fightId = fight.id || 'unassigned';

    // 1. Missing required fight participants
    if (!fight.fighterA || !fight.fighterB) {
      issues.push({
        id: `missing-part-${fightId}`,
        severity: 'CRITICAL',
        ruleCode: 'MISSING_PARTICIPANTS',
        entityType: 'fight',
        entityId: fightId,
        message: 'Fight cannot exist without both Fighter A and Fighter B participants.',
        timestamp: new Date().toISOString()
      });
      return { isValid: false, issues };
    }

    if (fight.fighterA.id === fight.fighterB.id) {
      issues.push({
        id: `self-match-${fightId}`,
        severity: 'CRITICAL',
        ruleCode: 'INVALID_PARTICIPANTS',
        entityType: 'fight',
        entityId: fightId,
        message: 'A fighter cannot be scheduled to fight themselves.',
        timestamp: new Date().toISOString()
      });
      return { isValid: false, issues };
    }

    // 2. Invalid dates
    if (fight.date) {
      const parsedDate = Date.parse(fight.date);
      if (isNaN(parsedDate)) {
        issues.push({
          id: `inv-date-${fightId}`,
          severity: 'CRITICAL',
          ruleCode: 'INVALID_DATE',
          entityType: 'fight',
          entityId: fightId,
          message: `Date string "${fight.date}" is not a valid ISO date.`,
          timestamp: new Date().toISOString()
        });
      }
    }

    // 3. Scheduled rounds check
    if (fight.scheduledRounds && (fight.scheduledRounds < 1 || fight.scheduledRounds > 15)) {
      issues.push({
        id: `inv-rounds-${fightId}`,
        severity: 'WARNING',
        ruleCode: 'INVALID_SCHEDULED_ROUNDS',
        entityType: 'fight',
        entityId: fightId,
        message: `Scheduled rounds ${fight.scheduledRounds} outside sanctioned championship parameters (1-15).`,
        timestamp: new Date().toISOString()
      });
    }

    return {
      isValid: issues.filter(i => i.severity === 'CRITICAL').length === 0,
      sanitizedData: fight as Fight,
      issues
    };
  }

  /**
   * Section 16: Reject invalid odds (decimal odds <= 1.0 or NaN)
   */
  public static validateOdds(price: BookmakerPrice): ValidationResult<BookmakerPrice> {
    const issues: QualityIssue[] = [];

    if (!price.homeOdds || isNaN(price.homeOdds) || price.homeOdds <= 1.0) {
      issues.push({
        id: `inv-odds-home-${price.bookmaker}`,
        severity: 'CRITICAL',
        ruleCode: 'INVALID_ODDS',
        entityType: 'odds',
        entityId: price.bookmaker,
        message: `Home odds of ${price.homeOdds} for ${price.bookmaker} are mathematically invalid (must be > 1.00).`,
        timestamp: new Date().toISOString()
      });
    }

    if (!price.awayOdds || isNaN(price.awayOdds) || price.awayOdds <= 1.0) {
      issues.push({
        id: `inv-odds-away-${price.bookmaker}`,
        severity: 'CRITICAL',
        ruleCode: 'INVALID_ODDS',
        entityType: 'odds',
        entityId: price.bookmaker,
        message: `Away odds of ${price.awayOdds} for ${price.bookmaker} are mathematically invalid (must be > 1.00).`,
        timestamp: new Date().toISOString()
      });
    }

    return {
      isValid: issues.length === 0,
      sanitizedData: issues.length === 0 ? price : undefined,
      issues
    };
  }
}
