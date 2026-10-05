export type DataClassification = 'VERIFIED' | 'CALCULATED' | 'PENDING' | 'UNAVAILABLE' | 'CONFLICTING';

export interface DataSourceInfo {
  provider: string;
  providerId: string;
  timestamp: string;
  verificationStatus: DataClassification;
  confidence?: 'High' | 'Medium' | 'Low';
  lastUpdatedSecondsAgo?: number;
}

export interface FighterRecord {
  wins: number;
  losses: number;
  draws: number;
  kos: number;
  koPercentage: number;
}

export interface FighterBio {
  nationality: string;
  flag: string;
  born: string;
  hometown: string;
  stance: 'Orthodox' | 'Southpaw' | 'Switch';
  turnedPro: number;
  trainer: string;
  manager: string;
  promoter: string;
}

export interface FighterPhysicalStats {
  height: string;
  heightCm: number;
  reach: string;
  reachCm: number;
  weight: string;
  weightKg: number;
  age: number;
  division: string;
}

export interface FighterCareerAverages {
  punchesLandedPerRound: number;
  punchesThrownPerRound: number;
  accuracy: number;
  jabsLandedPerRound: number;
  powerLandedPerRound: number;
  knockdownsPerFight: number;
}

export interface FighterPerformanceTrend {
  fightNumber: number;
  opponent: string;
  punchesLanded: number;
  punchesThrown: number;
  accuracy: number;
}

export interface FighterAchievement {
  title: string;
  organization: string;
  year?: string;
  icon?: string;
}

export interface FighterStyleTag {
  label: string;
  description: string;
  icon: string;
}

export interface Fighter {
  id: string;
  name: string;
  nickname?: string;
  aliases?: string[];
  image: string;
  bannerImage?: string;
  record: FighterRecord;
  physical: FighterPhysicalStats;
  bio: FighterBio;
  stats: FighterCareerAverages;
  trends: FighterPerformanceTrend[];
  achievements: FighterAchievement[];
  styleTags: FighterStyleTag[];
  news: { id: string; title: string; time: string; source: string; image?: string }[];
  isFollowed?: boolean;
  source: DataSourceInfo;
}

export interface Promotion {
  id: string;
  name: string;
  logo: string;
  website: string;
  fightsCount: number;
  description: string;
}

export type FightStatus = 
  | 'NOT_STARTED'
  | 'WALKOUT'
  | 'LIVE'
  | 'ROUND_1'
  | 'ROUND_2'
  | 'ROUND_3'
  | 'ROUND_4'
  | 'ROUND_5'
  | 'ROUND_6'
  | 'ROUND_7'
  | 'ROUND_8'
  | 'ROUND_9'
  | 'ROUND_10'
  | 'ROUND_11'
  | 'ROUND_12'
  | 'BREAK'
  | 'FINISHED'
  | 'CANCELLED'
  | 'POSTPONED';

export interface CompuboxStats {
  totalPunchesThrown: number;
  totalPunchesLanded: number;
  accuracy: number;
  jabsThrown: number;
  jabsLanded: number;
  powerThrown: number;
  powerLanded: number;
  knockdowns: number;
  ringControlScore?: number; // 0-100
  aggressionScore?: number;  // 0-100
  defenceScore?: number;     // 0-100
}

export interface ShotMapPunch {
  id: string;
  fighterId: string;
  round: number;
  type: 'jab' | 'power';
  target: 'head' | 'body';
  landed: boolean;
  x: number; // percentage from left
  y: number; // percentage from top
}

export interface RoundResult {
  round: number;
  fighterAScore: number;
  fighterBScore: number;
  winner: string;
  analysis?: string;
  videoDuration?: string;
}

export interface JudgesScorecard {
  round: number;
  judge1: string;
  judge2: string;
  judge3: string;
  fightPulseScore: string;
}

export interface BookmakerPrice {
  bookmaker: string;
  homeOdds: number;
  awayOdds: number;
  drawOdds?: number;
  margin?: number;
  movement?: 'up' | 'down' | 'neutral';
  isBestPrice?: boolean;
}

export interface OddsMovementPoint {
  timestamp: string;
  label: string;
  fighterAOdds: number;
  fighterBOdds: number;
}

export interface FightSignal {
  id: string;
  timestamp: string;
  roundTime?: string;
  title: string;
  description: string;
  type: 'jab' | 'power' | 'control' | 'defence' | 'fatigue' | 'momentum' | 'output';
  status: string;
  confidence: 'High' | 'Medium' | 'Low';
  fighterId: string;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface MomentumHistoryPoint {
  round: number;
  roundLabel: string;
  fighterAScore: number; // 0-100
  fighterBScore: number; // 0-100
  explanation?: string;
}

export interface Fight {
  id: string;
  eventId: string;
  fighterA: Fighter;
  fighterB: Fighter;
  weightClass: string;
  scheduledRounds: number;
  title?: string;
  status: FightStatus;
  currentRound: number;
  roundTimer: string; // e.g. "2:15"
  venue: string;
  location: string;
  broadcast: string;
  date: string;
  timeBst: string;
  result?: {
    winnerId: string;
    method: 'KO' | 'TKO' | 'UD' | 'MD' | 'SD' | 'Draw' | 'No Contest';
    round?: number;
    officialScores?: string;
    summary: string;
  };
  liveStats?: {
    fighterA: CompuboxStats;
    fighterB: CompuboxStats;
    currentRoundFighterA: CompuboxStats;
    currentRoundFighterB: CompuboxStats;
  };
  momentum: {
    fighterAScore: number; // e.g. 68
    fighterBScore: number; // e.g. 32
    history: MomentumHistoryPoint[];
    explanationTitle: string;
    explanationPoints: string[];
    harutyunyanExplanation?: string[];
  };
  liveOdds: {
    favouriteId: string;
    underdogId: string;
    fighterAOdds: number;
    fighterBOdds: number;
    fighterAChange: number;
    fighterBChange: number;
    movementHistory: OddsMovementPoint[];
    bookmakers: BookmakerPrice[];
  };
  signals: FightSignal[];
  keyInsights: {
    title: string;
    description: string;
    type: 'jab' | 'control' | 'output' | 'defence' | 'pace';
  }[];
  shotMap: ShotMapPunch[];
  roundResults: RoundResult[];
  judgesScores: JudgesScorecard[];
  liveFeed: {
    id: string;
    time: string;
    text: string;
    type: 'bell' | 'punch' | 'momentum' | 'warning' | 'knockdown';
  }[];
  fightPulseScore?: number; // 0-100 rating
  source: DataSourceInfo;
}

export interface BoxingEvent {
  id: string;
  name: string;
  subtitle?: string;
  promotion: Promotion;
  date: string;
  doorsTime: string;
  mainCardTime: string;
  venue: string;
  location: string;
  broadcast: string;
  status: 'UPCOMING' | 'LIVE' | 'COMPLETED';
  ticketUrl?: string;
  countdownDays: number;
  countdownHours: number;
  countdownMins: number;
  countdownSecs: number;
  artwork: string;
  venueImage: string;
  mainFightId: string;
  fights: Fight[];
  news: { id: string; title: string; time: string; image?: string }[];
  source: DataSourceInfo;
}

export interface AlertNotification {
  id: string;
  title: string;
  category: 'Fight' | 'Odds' | 'Fighter' | 'Signal' | 'News';
  timestamp: string;
  timeAgo: string;
  description: string;
  isRead: boolean;
  active?: boolean;
  typeIcon: string;
  dataRef?: {
    fightId?: string;
    fighterId?: string;
    oddsChange?: string;
  };
}

export interface ProviderHealth {
  provider: string;
  service: 'Live Stream' | 'Odds Feed' | 'Compubox Stats' | 'Fighter Records';
  status: 'HEALTHY' | 'DEGRADED' | 'DELAYED' | 'UNAVAILABLE';
  latencyMs: number;
  lastUpdated: string;
  recordsSynced: number;
  coverage: string;
}

// Canonical Section 5 Entities
export interface FightParticipant {
  fightId: string;
  fighterId: string;
  corner: 'red' | 'blue';
  weighInWeightKg?: number;
  isWinner?: boolean;
}

export interface FightResult {
  winnerId?: string;
  method: 'KO' | 'TKO' | 'UD' | 'MD' | 'SD' | 'Draw' | 'No Contest';
  finishRound?: number;
  officialScores?: string;
  summary: string;
  verifiedBy?: string;
}

export interface Bookmaker {
  id: string;
  name: string;
  slug: string;
  region: string;
  isActive: boolean;
}

export interface OddsMarket {
  id: string;
  fightId: string;
  marketName: string;
  isLive: boolean;
}

export interface OddsSnapshot {
  id: string;
  fightId: string;
  bookmakerId: string;
  fighterAOdds: number;
  fighterBOdds: number;
  drawOdds?: number;
  fighterAImpliedProb: number;
  fighterBImpliedProb: number;
  bookmakerMargin: number;
  timestamp: string;
  source: string;
}

export interface MomentumSnapshot {
  id: string;
  fightId: string;
  roundNumber: number;
  fighterAScore: number;
  fighterBScore: number;
  explanationTitle?: string;
  explanationPoints?: string[];
  calculatedAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary?: string;
  source: string;
  url?: string;
  publishedAt: string;
  fighterIds?: string[];
  eventId?: string;
}

export interface DataSource {
  id: string;
  name: string;
  code: string;
  feedType: 'live_telemetry' | 'odds_feed' | 'fighter_records';
  isActive: boolean;
  pollingIntervalSec: number;
}

export interface DataSourceRecord {
  id: string;
  sourceId: string;
  entityType: 'fighter' | 'fight' | 'event' | 'odds' | 'stats';
  externalId: string;
  internalId: string;
  lastSyncedAt: string;
  rawPayload?: any;
}

export interface DataSyncRun {
  id: string;
  sourceId: string;
  status: 'RUNNING' | 'COMPLETED' | 'FAILED';
  recordsSynced: number;
  latencyMs: number;
  startedAt: string;
  completedAt?: string;
}

export interface User {
  id: string;
  email: string;
  fullName?: string;
  tier: 'free' | 'pro' | 'syndicate';
  createdAt: string;
}

export interface UserFollow {
  userId: string;
  fighterId: string;
  createdAt: string;
}

export interface NotificationPreference {
  userId: string;
  upcomingFights: boolean;
  fightReminders: boolean;
  liveUpdates: boolean;
  oddsMovement: boolean;
  oddsThresholdPercent: number;
  inApp: boolean;
  email: boolean;
  push: boolean;
  quietHoursStart?: string;
  quietHoursEnd?: string;
}

