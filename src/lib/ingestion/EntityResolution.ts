import { Fighter, Fight, BoxingEvent } from '../../types/boxing';

export interface ResolutionMatch<T> {
  entity: T;
  confidence: number; // 0.0 to 1.0
  matchType: 'EXACT_ID' | 'EXACT_NAME' | 'ALIAS' | 'FUZZY_NAME';
}

export class EntityResolutionEngine {

  /**
   * Normalizes a fighter's name for comparison
   */
  public static normalizeName(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Generates a canonical slug from a fighter name
   */
  public static generateSlug(name: string): string {
    return this.normalizeName(name).replace(/\s+/g, '-');
  }

  /**
   * Resolves an incoming upstream fighter record against existing canonical database entities
   */
  public static resolveFighter(
    incomingName: string,
    existingFighters: Fighter[],
    incomingProviderId?: string
  ): ResolutionMatch<Fighter> | null {
    const cleanIncoming = this.normalizeName(incomingName);

    // 1. Exact Provider ID match
    if (incomingProviderId) {
      const byProviderId = existingFighters.find(
        f => f.source?.providerId === incomingProviderId
      );
      if (byProviderId) {
        return { entity: byProviderId, confidence: 1.0, matchType: 'EXACT_ID' };
      }
    }

    // 2. Exact normalized name match
    const exactNameMatch = existingFighters.find(
      f => this.normalizeName(f.name) === cleanIncoming
    );
    if (exactNameMatch) {
      return { entity: exactNameMatch, confidence: 0.98, matchType: 'EXACT_NAME' };
    }

    // 3. Known Aliases match
    for (const fighter of existingFighters) {
      if (fighter.aliases && fighter.aliases.length > 0) {
        for (const alias of fighter.aliases) {
          if (this.normalizeName(alias) === cleanIncoming) {
            return { entity: fighter, confidence: 0.95, matchType: 'ALIAS' };
          }
        }
      }
      if (fighter.nickname && this.normalizeName(fighter.nickname) === cleanIncoming) {
        return { entity: fighter, confidence: 0.85, matchType: 'ALIAS' };
      }
    }

    // 4. Fuzzy Levenshtein-like substring match
    for (const fighter of existingFighters) {
      const cleanTarget = this.normalizeName(fighter.name);
      if (cleanIncoming.includes(cleanTarget) || cleanTarget.includes(cleanIncoming)) {
        return { entity: fighter, confidence: 0.80, matchType: 'FUZZY_NAME' };
      }
    }

    return null;
  }

  /**
   * Resolves duplicate fights across multiple promotional sources
   */
  public static resolveFight(
    incomingA: string,
    incomingB: string,
    existingFights: Fight[]
  ): Fight | null {
    const normA = this.normalizeName(incomingA);
    const normB = this.normalizeName(incomingB);

    return existingFights.find(f => {
      const fNormA = this.normalizeName(f.fighterA.name);
      const fNormB = this.normalizeName(f.fighterB.name);

      return (
        (fNormA === normA && fNormB === normB) ||
        (fNormA === normB && fNormB === normA)
      );
    }) || null;
  }
}
