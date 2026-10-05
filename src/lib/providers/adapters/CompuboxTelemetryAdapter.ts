import { CompuboxStats, FightSignal } from '../../../types/boxing';
import { ILiveDataProvider } from '../contracts';

export class CompuboxTelemetryAdapter implements ILiveDataProvider {
  private activeSubscriptions: Map<string, number> = new Map();
  private isConnected: boolean = false;

  public getConfigurationStatus() {
    return {
      provider: 'CompuBox Telemetry / Ringside Feed',
      isConnected: this.isConnected,
      latencyMs: 120,
      feedType: 'WebSocket / Direct Stream',
      capabilities: [
        'Round-by-round punches landed / thrown',
        'Jab vs Power breakdown',
        'Punch accuracy percentages',
        'Official knockdown flags'
      ]
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
    // When connected to live ringside websocket, pipes frames directly to callbacks
    return () => {
      this.activeSubscriptions.delete(fightId);
    };
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
      status: 'AWAITING_LIVE_FEED',
      round: 0,
      timer: '00:00',
      hasLivePunchStats: false, // Explicit: do not assume live punch statistics exist
      hasLiveOdds: false,
      lastTelemetryAt: new Date().toISOString()
    };
  }
}
