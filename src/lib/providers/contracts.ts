import {
  Fight,
  Fighter,
  BoxingEvent,
  Promotion,
  AlertNotification,
  ProviderHealth,
  BookmakerPrice,
  OddsSnapshot,
  MomentumSnapshot,
  FightSignal,
  CompuboxStats,
  DataClassification
} from '../../types/boxing';

export type EnvironmentMode = 'DEVELOPMENT_FIXTURE' | 'LIVE_PROVIDER';

export interface ProviderCapability {
  name: string;
  isAvailable: boolean;
  requiresCredential?: string;
  description: string;
}

export interface ProviderMetadata {
  id: string;
  name: string;
  code: string;
  type: 'sports_data' | 'odds' | 'telemetry' | 'sanctioning_body' | 'fixture';
  isConfigured: boolean;
  capabilities: ProviderCapability[];
}

export interface IFightDataProvider {
  getLiveFights(): Promise<Fight[]>;
  getUpcomingFights(): Promise<Fight[]>;
  getFightById(id: string): Promise<Fight | null>;
  getHistoricalResults(filters?: {
    weightClass?: string;
    promotion?: string;
    method?: string;
    query?: string;
  }): Promise<any[]>;
  getHistoricalFightDetail(id: string): Promise<Fight | null>;
}

export interface IFighterDataProvider {
  getAllFighters(): Promise<Fighter[]>;
  getFighterById(id: string): Promise<Fighter | null>;
  searchFighters(query: string): Promise<Fighter[]>;
}

export interface IEventDataProvider {
  getEvents(): Promise<BoxingEvent[]>;
  getEventById(id: string): Promise<BoxingEvent | null>;
  getPromotions(): Promise<Promotion[]>;
}

export interface IOddsDataProvider {
  getOddsOverview(): Promise<{
    activeLiveFightsCount: number;
    upcomingFightsCount: number;
    trackedBookmakersCount: number;
    updateIntervalSec: string;
    oddsMovers: {
      fighter: string;
      opponent: string;
      division: string;
      change: string;
      odds: string;
      direction: 'up' | 'down';
    }[];
  }>;
  getBookmakerList(): Promise<string[]>;
  getOddsForFight(fightId: string): Promise<BookmakerPrice[]>;
  getHistoricalOddsSnapshots(fightId: string): Promise<OddsSnapshot[]>;
  calculateImpliedProbability(decimalOdds: number): {
    probability: number;
    classification: 'CALCULATED';
    formula: string;
  };
}

export interface ILiveDataProvider {
  subscribeToLiveFight(
    fightId: string,
    callbacks: {
      onRoundUpdate?: (round: number, timer: string) => void;
      onPunchLogged?: (stats: CompuboxStats) => void;
      onOddsUpdate?: (odds: { fighterA: number; fighterB: number }) => void;
      onSignalEmitted?: (signal: FightSignal) => void;
    }
  ): () => void; // Unsubscribe function
  getLiveFightStatus(fightId: string): Promise<{
    status: string;
    round: number;
    timer: string;
    hasLivePunchStats: boolean;
    hasLiveOdds: boolean;
    lastTelemetryAt: string;
  }>;
}

export interface IGlobalSearchProvider {
  searchAll(query: string): Promise<{
    fighters: Fighter[];
    fights: any[];
    events: BoxingEvent[];
    promotions: Promotion[];
  }>;
}

export interface IProviderTelemetry {
  getProviderHealth(): Promise<ProviderHealth[]>;
  getSyncAuditLog(): Promise<{
    id: string;
    provider: string;
    timestamp: string;
    status: 'SUCCESS' | 'FAILED' | 'DELAYED';
    recordsProcessed: number;
    latencyMs: number;
    message?: string;
  }[]>;
}
