import { BookmakerPrice, OddsSnapshot } from '../../../types/boxing';
import { IOddsDataProvider } from '../contracts';

export interface TheOddsApiConfig {
  baseUrl?: string; // our own serverless proxy, which holds the real key
  regions?: string; // 'uk,us,eu'
  markets?: string; // 'h2h'
}

export class TheOddsApiAdapter implements IOddsDataProvider {
  private baseUrl: string;
  private regions: string;
  // Assumed configured when live mode is enabled; the proxy returns 503 if the server key is missing.
  private isConfigured: boolean = false;
  private snapshotsHistory: Map<string, OddsSnapshot[]> = new Map();

  constructor(config?: TheOddsApiConfig) {
    this.isConfigured = typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_ENABLE_LIVE_DATA === 'true';
    this.baseUrl = config?.baseUrl || '/api/odds';
    this.regions = config?.regions || 'uk,us';
  }

  public getConfigurationStatus() {
    return {
      provider: 'The Odds API',
      isConfigured: this.isConfigured,
      requiredEnvVar: 'THE_ODDS_API_KEY (server-side, Vercel)',
      baseUrl: this.baseUrl,
      capabilities: [
        'Live & Pre-match Bookmaker Odds',
        'Multi-region aggregation (UK, US, EU)',
        'Historical Odds Snapshots',
        'Bookmaker Margin & Implied Probability Calculation'
      ]
    };
  }

  async getOddsOverview(): Promise<any> {
    return {
      activeLiveFightsCount: 0,
      upcomingFightsCount: 0,
      trackedBookmakersCount: 12,
      updateIntervalSec: '5.0s',
      oddsMovers: []
    };
  }

  async getBookmakerList(): Promise<string[]> {
    return [
      'Bet365', 'Sky Bet', 'Betfair', 'William Hill', 
      'Paddy Power', 'DraftKings', 'Bovada', 'Betfred', 'BoyleSports'
    ];
  }

  async getOddsForFight(fightId: string, fighterA?: string, fighterB?: string): Promise<BookmakerPrice[]> {
    if (!fighterA || !fighterB) return [];
    if (!this.isConfigured) {
      return [];
    }

    try {
      const res = await fetch(`${this.baseUrl}?regions=${this.regions}`, { signal: AbortSignal.timeout(8000) });
      if (!res.ok) return [];
      const data = await res.json();
      return this.mapToBookmakerPrices(data, fighterA, fighterB);
    } catch (err) {
      console.warn('[TheOddsApiAdapter] Failed to fetch odds:', err);
      return [];
    }
  }

  async getHistoricalOddsSnapshots(fightId: string): Promise<OddsSnapshot[]> {
    return this.snapshotsHistory.get(fightId) || [];
  }

  /**
   * Section 10 Specification:
   * impliedProbability = 1 / decimalOdds
   * Labelled strictly as CALCULATED.
   * Validates Section 16 (rejects odds <= 1.0).
   */
  calculateImpliedProbability(decimalOdds: number): {
    probability: number;
    classification: 'CALCULATED';
    formula: string;
  } {
    if (!decimalOdds || isNaN(decimalOdds) || decimalOdds <= 1.0) {
      return {
        probability: 0,
        classification: 'CALCULATED',
        formula: 'Invalid odds (< 1.0)'
      };
    }

    const prob = Number(((1.0 / decimalOdds) * 100).toFixed(2));
    return {
      probability: prob,
      classification: 'CALCULATED',
      formula: `(1.0 / ${decimalOdds}) * 100 = ${prob}%`
    };
  }

  public recordSnapshot(snapshot: OddsSnapshot): void {
    const list = this.snapshotsHistory.get(snapshot.fightId) || [];
    list.push(snapshot);
    this.snapshotsHistory.set(snapshot.fightId, list);
  }

  private mapToBookmakerPrices(apiMatches: any[], nameA: string, nameB: string): BookmakerPrice[] {
    // Match on surname so "Tyson Fury" matches "Fury, Tyson" or "Tyson Luke Fury"
    const last = (n: string) => n.trim().split(/\s+/).pop()!.toLowerCase();
    const a = last(nameA);
    const b = last(nameB);
    const match = (apiMatches || []).find((m: any) => {
      const teams = [m.home_team, m.away_team].map((t: string) => (t || '').toLowerCase());
      return teams.some(t => t.includes(a)) && teams.some(t => t.includes(b));
    });
    if (!match) return [];

    const prices: BookmakerPrice[] = [];
    for (const bk of match.bookmakers || []) {
      const outcomes = bk.markets?.find((mk: any) => mk.key === 'h2h')?.outcomes || [];
      const oa = outcomes.find((o: any) => (o.name || '').toLowerCase().includes(a));
      const ob = outcomes.find((o: any) => (o.name || '').toLowerCase().includes(b));
      const od = outcomes.find((o: any) => (o.name || '').toLowerCase() === 'draw');
      if (!oa || !ob) continue;
      const margin = Number(((1 / oa.price + 1 / ob.price + (od ? 1 / od.price : 0) - 1) * 100).toFixed(2));
      prices.push({
        bookmaker: bk.title,
        homeOdds: oa.price,
        awayOdds: ob.price,
        drawOdds: od?.price,
        margin,
        movement: 'neutral'
      });
    }
    const bestA = Math.max(...prices.map(p => p.homeOdds));
    const bestB = Math.max(...prices.map(p => p.awayOdds));
    return prices.map(p => ({ ...p, isBestPrice: p.homeOdds === bestA || p.awayOdds === bestB }));
  }
}
