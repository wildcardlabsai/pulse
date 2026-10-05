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
  EnvironmentMode,
  IFightDataProvider,
  IFighterDataProvider,
  IEventDataProvider,
  IOddsDataProvider,
  ILiveDataProvider,
  IGlobalSearchProvider,
  IProviderTelemetry
} from './contracts';

import { FixtureDataProvider } from './FixtureDataProvider';
import { SportradarBoxingAdapter } from './adapters/SportradarBoxingAdapter';
import { TheOddsApiAdapter } from './adapters/TheOddsApiAdapter';
import { CompuboxTelemetryAdapter } from './adapters/CompuboxTelemetryAdapter';
import { ingestionEngine } from '../ingestion/IngestionEngine';
import { DataQualityValidator } from '../validation/dataQuality';

export class ProviderManager
  implements
    IFightDataProvider,
    IFighterDataProvider,
    IEventDataProvider,
    IOddsDataProvider,
    ILiveDataProvider,
    IGlobalSearchProvider,
    IProviderTelemetry
{
  private static instance: ProviderManager;

  // Environment state (Section 5)
  private environmentMode: EnvironmentMode = 'DEVELOPMENT_FIXTURE';

  // Providers
  private fixtureProvider: FixtureDataProvider;
  private sportradarAdapter: SportradarBoxingAdapter;
  private oddsAdapter: TheOddsApiAdapter;
  private telemetryAdapter: CompuboxTelemetryAdapter;

  private constructor() {
    this.fixtureProvider = new FixtureDataProvider();
    this.sportradarAdapter = new SportradarBoxingAdapter();
    this.oddsAdapter = new TheOddsApiAdapter();
    this.telemetryAdapter = new CompuboxTelemetryAdapter();

    // Auto-detect if live credentials are provided in environment
    const hasSportradar = typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SPORTRADAR_API_KEY;
    const hasTheOdds = typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_THE_ODDS_API_KEY;

    if (hasSportradar || hasTheOdds) {
      this.environmentMode = 'LIVE_PROVIDER';
    } else {
      this.environmentMode = 'DEVELOPMENT_FIXTURE';
    }
  }

  public static getInstance(): ProviderManager {
    if (!ProviderManager.instance) {
      ProviderManager.instance = new ProviderManager();
    }
    return ProviderManager.instance;
  }

  // Environment mode controls
  public getEnvironmentMode(): EnvironmentMode {
    return this.environmentMode;
  }

  public setEnvironmentMode(mode: EnvironmentMode): void {
    this.environmentMode = mode;
  }

  public isFixtureMode(): boolean {
    return this.environmentMode === 'DEVELOPMENT_FIXTURE';
  }

  public getProviderStatusReport() {
    return {
      environment: this.environmentMode,
      isRealDataConnected: !this.isFixtureMode(),
      adapters: [
        this.sportradarAdapter.getConfigurationStatus(),
        this.oddsAdapter.getConfigurationStatus(),
        this.telemetryAdapter.getConfigurationStatus()
      ],
      requiredCredentialsSummary: [
        { key: 'VITE_SPORTRADAR_API_KEY', purpose: 'Live fighter profiles, schedules & records' },
        { key: 'VITE_THE_ODDS_API_KEY', purpose: 'Real-time bookmaker odds & lines' }
      ]
    };
  }

  // --- IFightDataProvider ---
  async getLiveFights(): Promise<Fight[]> {
    if (this.isFixtureMode()) {
      return this.fixtureProvider.getLiveFights();
    }
    const live = await this.sportradarAdapter.getLiveFights();
    return live.length > 0 ? live : this.fixtureProvider.getLiveFights();
  }

  async getUpcomingFights(): Promise<Fight[]> {
    if (this.isFixtureMode()) {
      return this.fixtureProvider.getUpcomingFights();
    }
    const upcoming = await this.sportradarAdapter.getUpcomingFights();
    return upcoming.length > 0 ? upcoming : this.fixtureProvider.getUpcomingFights();
  }

  async getFightById(id: string): Promise<Fight | null> {
    if (this.isFixtureMode()) {
      return this.fixtureProvider.getFightById(id);
    }
    const fight = await this.sportradarAdapter.getFightById(id);
    return fight || this.fixtureProvider.getFightById(id);
  }

  async getHistoricalResults(filters?: {
    weightClass?: string;
    promotion?: string;
    method?: string;
    query?: string;
  }): Promise<any[]> {
    return this.fixtureProvider.getHistoricalResults(filters);
  }

  async getHistoricalFightDetail(id: string): Promise<Fight | null> {
    return this.fixtureProvider.getHistoricalFightDetail(id);
  }

  // --- IFighterDataProvider ---
  async getAllFighters(): Promise<Fighter[]> {
    if (this.isFixtureMode()) {
      return this.fixtureProvider.getAllFighters();
    }
    const fighters = await this.sportradarAdapter.getAllFighters();
    return fighters.length > 0 ? fighters : this.fixtureProvider.getAllFighters();
  }

  async getFighterById(id: string): Promise<Fighter | null> {
    if (this.isFixtureMode()) {
      return this.fixtureProvider.getFighterById(id);
    }
    const fighter = await this.sportradarAdapter.getFighterById(id);
    return fighter || this.fixtureProvider.getFighterById(id);
  }

  async searchFighters(query: string): Promise<Fighter[]> {
    return this.fixtureProvider.searchFighters(query);
  }

  // --- IEventDataProvider ---
  async getEvents(): Promise<BoxingEvent[]> {
    return this.fixtureProvider.getEvents();
  }

  async getEventById(id: string): Promise<BoxingEvent | null> {
    return this.fixtureProvider.getEventById(id);
  }

  async getPromotions(): Promise<Promotion[]> {
    return this.fixtureProvider.getPromotions();
  }

  async getNotifications(): Promise<AlertNotification[]> {
    return this.fixtureProvider.getNotifications();
  }

  // --- IOddsDataProvider ---
  async getOddsOverview(): Promise<any> {
    return this.fixtureProvider.getOddsOverview();
  }

  async getBookmakerList(): Promise<string[]> {
    return this.oddsAdapter.getBookmakerList();
  }

  async getOddsForFight(fightId: string): Promise<BookmakerPrice[]> {
    if (!this.isFixtureMode()) {
      const liveOdds = await this.oddsAdapter.getOddsForFight(fightId);
      if (liveOdds.length > 0) return liveOdds;
    }
    return this.fixtureProvider.getOddsForFight(fightId);
  }

  async getHistoricalOddsSnapshots(fightId: string): Promise<OddsSnapshot[]> {
    return this.oddsAdapter.getHistoricalOddsSnapshots(fightId);
  }

  calculateImpliedProbability(decimalOdds: number) {
    return this.oddsAdapter.calculateImpliedProbability(decimalOdds);
  }

  // --- ILiveDataProvider ---
  subscribeToLiveFight(
    fightId: string,
    callbacks: {
      onRoundUpdate?: (round: number, timer: string) => void;
      onPunchLogged?: (stats: CompuboxStats) => void;
      onOddsUpdate?: (odds: { fighterA: number; fighterB: number }) => void;
      onSignalEmitted?: (signal: FightSignal) => void;
    }
  ): () => void {
    if (this.isFixtureMode()) {
      return this.fixtureProvider.subscribeToLiveFight(fightId, callbacks);
    }
    return this.telemetryAdapter.subscribeToLiveFight(fightId, callbacks);
  }

  async getLiveFightStatus(fightId: string) {
    if (this.isFixtureMode()) {
      return this.fixtureProvider.getLiveFightStatus(fightId);
    }
    return this.telemetryAdapter.getLiveFightStatus(fightId);
  }

  // --- IGlobalSearchProvider ---
  async searchAll(query: string): Promise<{
    fighters: Fighter[];
    fights: any[];
    events: BoxingEvent[];
    promotions: Promotion[];
  }> {
    return this.fixtureProvider.searchAll(query);
  }

  // --- IProviderTelemetry ---
  async getProviderHealth(): Promise<ProviderHealth[]> {
    return this.fixtureProvider.getProviderHealth();
  }

  async getSyncAuditLog() {
    return ingestionEngine.getSyncLogs().map(entry => ({
      id: entry.id,
      provider: entry.source,
      timestamp: entry.timestamp,
      status: (entry.status === 'COMPLETED' ? 'SUCCESS' : entry.status === 'PARTIAL' ? 'DELAYED' : 'FAILED') as 'SUCCESS' | 'FAILED' | 'DELAYED',
      recordsProcessed: entry.recordsSynced,
      latencyMs: entry.latencyMs,
      message: entry.error
    }));
  }

  public runDataQualityAudit() {
    return this.fixtureProvider.getAllFighters().then(fighters => {
      return DataQualityValidator.validateFighters(fighters);
    });
  }
}

export const providerManager = ProviderManager.getInstance();
export const boxingService = providerManager;
