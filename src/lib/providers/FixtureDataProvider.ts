import {
  Fight,
  Fighter,
  BoxingEvent,
  Promotion,
  AlertNotification,
  ProviderHealth,
  BookmakerPrice,
  OddsSnapshot,
  CompuboxStats,
  FightSignal
} from '../../types/boxing';

import {
  IFightDataProvider,
  IFighterDataProvider,
  IEventDataProvider,
  IOddsDataProvider,
  ILiveDataProvider,
  IGlobalSearchProvider,
  IProviderTelemetry
} from './contracts';

import {
  FIXTURE_FIGHTERS,
  FIXTURE_PROMOTIONS,
  FIXTURE_EVENTS,
  FIXTURE_LIVE_STEVENSON,
  FIXTURE_LIVE_PACHECO,
  FIXTURE_UPCOMING_JOSHUA_WILDER,
  FIXTURE_UPCOMING_GARCIA_HANEY,
  FIXTURE_UPCOMING_CATTERALL_PROGRAIS,
  FIXTURE_HISTORICAL_GARCIA_HANEY,
  FIXTURE_RECENT_RESULTS,
  FIXTURE_NOTIFICATIONS,
  FIXTURE_PROVIDER_HEALTH
} from '../fixtures/boxingFixtures';

export class FixtureDataProvider
  implements
    IFightDataProvider,
    IFighterDataProvider,
    IEventDataProvider,
    IOddsDataProvider,
    ILiveDataProvider,
    IGlobalSearchProvider,
    IProviderTelemetry
{
  async getLiveFights(): Promise<Fight[]> {
    return [FIXTURE_LIVE_STEVENSON, FIXTURE_LIVE_PACHECO];
  }

  async getUpcomingFights(): Promise<Fight[]> {
    return [
      FIXTURE_UPCOMING_CATTERALL_PROGRAIS,
      FIXTURE_UPCOMING_GARCIA_HANEY,
      FIXTURE_UPCOMING_JOSHUA_WILDER
    ];
  }

  async getFightById(id: string): Promise<Fight | null> {
    if (id === 'stevenson-vs-harutyunyan') return FIXTURE_LIVE_STEVENSON;
    if (id === 'pacheco-vs-sulecki') return FIXTURE_LIVE_PACHECO;
    if (id === 'joshua-vs-wilder') return FIXTURE_UPCOMING_JOSHUA_WILDER;
    if (id === 'garcia-vs-haney') return FIXTURE_UPCOMING_GARCIA_HANEY;
    if (id === 'catterall-vs-prograis') return FIXTURE_UPCOMING_CATTERALL_PROGRAIS;
    if (id === 'hist-garcia-haney') return FIXTURE_HISTORICAL_GARCIA_HANEY;
    return null;
  }

  async getHistoricalResults(filters?: {
    weightClass?: string;
    promotion?: string;
    method?: string;
    query?: string;
  }): Promise<any[]> {
    let results = [...FIXTURE_RECENT_RESULTS];
    if (!filters) return results;

    if (filters.weightClass && filters.weightClass !== 'all') {
      results = results.filter(
        r => r.weightClass.toLowerCase() === filters.weightClass?.toLowerCase()
      );
    }
    if (filters.method && filters.method !== 'all') {
      results = results.filter(r =>
        r.method.toLowerCase().includes(filters.method!.toLowerCase())
      );
    }
    if (filters.query && filters.query.trim()) {
      const q = filters.query.toLowerCase().trim();
      results = results.filter(
        r => r.fight.toLowerCase().includes(q) || r.winner.toLowerCase().includes(q)
      );
    }
    return results;
  }

  async getHistoricalFightDetail(id: string): Promise<Fight | null> {
    if (id === 'garcia-vs-haney' || id === 'hist-garcia-haney') {
      return FIXTURE_HISTORICAL_GARCIA_HANEY;
    }
    return null;
  }

  async getAllFighters(): Promise<Fighter[]> {
    return FIXTURE_FIGHTERS;
  }

  async getFighterById(id: string): Promise<Fighter | null> {
    const fighter = FIXTURE_FIGHTERS.find(f => f.id === id);
    return fighter || null;
  }

  async searchFighters(query: string): Promise<Fighter[]> {
    const q = query.toLowerCase().trim();
    if (!q) return FIXTURE_FIGHTERS;
    return FIXTURE_FIGHTERS.filter(
      f =>
        f.name.toLowerCase().includes(q) ||
        (f.nickname && f.nickname.toLowerCase().includes(q)) ||
        (f.aliases && f.aliases.some(a => a.toLowerCase().includes(q))) ||
        f.physical.division.toLowerCase().includes(q)
    );
  }

  async getEvents(): Promise<BoxingEvent[]> {
    return FIXTURE_EVENTS;
  }

  async getEventById(id: string): Promise<BoxingEvent | null> {
    const event = FIXTURE_EVENTS.find(e => e.id === id);
    return event || null;
  }

  async getPromotions(): Promise<Promotion[]> {
    return FIXTURE_PROMOTIONS;
  }

  async getNotifications(): Promise<AlertNotification[]> {
    return FIXTURE_NOTIFICATIONS;
  }

  async getProviderHealth(): Promise<ProviderHealth[]> {
    return FIXTURE_PROVIDER_HEALTH;
  }

  async getSyncAuditLog(): Promise<any[]> {
    return [
      {
        id: 'sync-fixture-1',
        provider: 'Development Fixture Engine',
        timestamp: 'Just now',
        status: 'SUCCESS',
        recordsProcessed: FIXTURE_FIGHTERS.length + FIXTURE_EVENTS.length,
        latencyMs: 14
      }
    ];
  }

  async getOddsOverview(): Promise<any> {
    return {
      activeLiveFightsCount: 2,
      upcomingFightsCount: 18,
      trackedBookmakersCount: 12,
      updateIntervalSec: '2.4s',
      oddsMovers: [
        {
          fighter: 'Conor Benn',
          opponent: 'vs Peter Dobson',
          division: 'Lightweight',
          change: '+42%',
          odds: '1.62 → 2.30',
          direction: 'up'
        },
        {
          fighter: 'Anthony Joshua',
          opponent: 'vs Deontay Wilder',
          division: 'Heavyweight',
          change: '-28%',
          odds: '2.10 → 1.52',
          direction: 'down'
        },
        {
          fighter: 'Katie Taylor',
          opponent: 'vs Chantelle Cameron',
          division: 'Super Lightweight',
          change: '+35%',
          odds: '1.80 → 2.43',
          direction: 'up'
        }
      ]
    };
  }

  async getBookmakerList(): Promise<string[]> {
    return ['Bet365', 'William Hill', 'Paddy Power', 'Unibet', 'Sky Bet', 'Betfred', 'BoyleSports'];
  }

  async getOddsForFight(fightId: string): Promise<BookmakerPrice[]> {
    return FIXTURE_LIVE_STEVENSON.liveOdds.bookmakers;
  }

  async getHistoricalOddsSnapshots(fightId: string): Promise<OddsSnapshot[]> {
    return [];
  }

  calculateImpliedProbability(decimalOdds: number): {
    probability: number;
    classification: 'CALCULATED';
    formula: string;
  } {
    if (!decimalOdds || isNaN(decimalOdds) || decimalOdds <= 1.0) {
      return { probability: 0, classification: 'CALCULATED', formula: 'Invalid odds (< 1.0)' };
    }
    const prob = Number(((1.0 / decimalOdds) * 100).toFixed(2));
    return {
      probability: prob,
      classification: 'CALCULATED',
      formula: `(1.0 / ${decimalOdds}) * 100 = ${prob}%`
    };
  }

  subscribeToLiveFight(
    fightId: string,
    callbacks: {
      onRoundUpdate?: (round: number, timer: string) => void;
      onPunchLogged?: (stats: CompuboxStats) => void;
      onOddsUpdate?: (odds: { fighterA: number; fighterB: number }) => void;
      onSignalEmitted?: (signal: FightSignal) => void;
    }
  ): () => void {
    return () => {};
  }

  async getLiveFightStatus(fightId: string): Promise<{
    status: string;
    round: number;
    timer: string;
    hasLivePunchStats: boolean;
    hasLiveOdds: boolean;
    lastTelemetryAt: string;
  }> {
    return {
      status: 'ROUND_6',
      round: 6,
      timer: '01:42',
      hasLivePunchStats: true,
      hasLiveOdds: true,
      lastTelemetryAt: new Date().toISOString()
    };
  }

  async searchAll(query: string): Promise<{
    fighters: Fighter[];
    fights: any[];
    events: BoxingEvent[];
    promotions: Promotion[];
  }> {
    const q = query.toLowerCase().trim();
    if (!q) {
      return {
        fighters: FIXTURE_FIGHTERS,
        fights: FIXTURE_RECENT_RESULTS,
        events: FIXTURE_EVENTS,
        promotions: FIXTURE_PROMOTIONS
      };
    }

    const fighters = FIXTURE_FIGHTERS.filter(
      f =>
        f.name.toLowerCase().includes(q) ||
        (f.nickname && f.nickname.toLowerCase().includes(q)) ||
        f.physical.division.toLowerCase().includes(q)
    );

    const fights = FIXTURE_RECENT_RESULTS.filter(
      r =>
        r.fight.toLowerCase().includes(q) ||
        r.weightClass.toLowerCase().includes(q) ||
        r.winner.toLowerCase().includes(q)
    );

    const events = FIXTURE_EVENTS.filter(
      e =>
        e.name.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q)
    );

    const promotions = FIXTURE_PROMOTIONS.filter(p =>
      p.name.toLowerCase().includes(q)
    );

    return { fighters, fights, events, promotions };
  }
}
