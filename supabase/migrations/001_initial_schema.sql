-- FIGHT PULSE CANONICAL DATABASE SCHEMA (PostgreSQL / Supabase)
-- Real-time Boxing Intelligence Platform
-- Compliant with Fight Pulse Data Specification v2.4

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
CREATE TYPE data_classification AS ENUM (
  'VERIFIED',
  'CALCULATED',
  'PENDING_VERIFICATION',
  'UNAVAILABLE',
  'CONFLICTING'
);

CREATE TYPE fight_status AS ENUM (
  'NOT_STARTED',
  'WALKOUT',
  'LIVE',
  'ROUND_1', 'ROUND_2', 'ROUND_3', 'ROUND_4',
  'ROUND_5', 'ROUND_6', 'ROUND_7', 'ROUND_8',
  'ROUND_9', 'ROUND_10', 'ROUND_11', 'ROUND_12',
  'BREAK',
  'FINISHED',
  'CANCELLED',
  'POSTPONED',
  'DATA_DELAYED'
);

CREATE TYPE fight_result_method AS ENUM (
  'KO', 'TKO', 'UD', 'MD', 'SD', 'DRAW', 'NO_CONTEST', 'DISQUALIFICATION'
);

-- 3. DATA SOURCES & SYNC TRACKING
CREATE TABLE IF NOT EXISTS data_sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  code VARCHAR(50) NOT NULL UNIQUE, -- e.g. 'compubox', 'betfair', 'boxrec', 'bbbofc'
  feed_type VARCHAR(50) NOT NULL,    -- 'live_telemetry', 'odds_feed', 'fighter_records'
  is_active BOOLEAN DEFAULT TRUE,
  api_endpoint VARCHAR(255),
  polling_interval_sec INT DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS data_sync_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_id UUID REFERENCES data_sources(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL, -- 'RUNNING', 'COMPLETED', 'FAILED', 'PARTIAL'
  records_synced INT DEFAULT 0,
  latency_ms INT,
  error_message TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- 4. PROMOTIONS
CREATE TABLE IF NOT EXISTS promotions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(150) NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  headquarters VARCHAR(100),
  fights_count INT DEFAULT 0,
  source_id UUID REFERENCES data_sources(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. FIGHTERS
CREATE TABLE IF NOT EXISTS fighters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(150) NOT NULL UNIQUE,
  name VARCHAR(150) NOT NULL,
  nickname VARCHAR(100),
  nationality VARCHAR(100),
  country_code VARCHAR(10),
  flag_emoji VARCHAR(10),
  date_of_birth DATE,
  hometown VARCHAR(150),
  division VARCHAR(50) NOT NULL,
  stance VARCHAR(20) DEFAULT 'Orthodox',
  height_cm NUMERIC(5,1),
  reach_cm NUMERIC(5,1),
  weight_kg NUMERIC(5,1),
  turned_pro_year INT,
  trainer VARCHAR(100),
  manager VARCHAR(100),
  promoter_id UUID REFERENCES promotions(id),
  image_url TEXT,
  banner_url TEXT,
  bio TEXT,
  -- Record
  wins INT DEFAULT 0,
  losses INT DEFAULT 0,
  draws INT DEFAULT 0,
  kos INT DEFAULT 0,
  ko_percentage NUMERIC(5,2) DEFAULT 0.00,
  -- Verification & Source
  verification_status data_classification DEFAULT 'VERIFIED',
  source_provider VARCHAR(100),
  source_provider_id VARCHAR(100),
  last_verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS fighter_aliases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fighter_id UUID REFERENCES fighters(id) ON DELETE CASCADE,
  alias VARCHAR(150) NOT NULL,
  source_provider VARCHAR(50)
);

-- 6. EVENTS
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(150) NOT NULL UNIQUE,
  name VARCHAR(200) NOT NULL,
  subtitle VARCHAR(200),
  promotion_id UUID REFERENCES promotions(id),
  date DATE NOT NULL,
  doors_time VARCHAR(50),
  main_card_time VARCHAR(50),
  venue_name VARCHAR(150) NOT NULL,
  location VARCHAR(150) NOT NULL,
  broadcast_channel VARCHAR(100),
  status VARCHAR(20) DEFAULT 'UPCOMING',
  artwork_url TEXT,
  venue_image_url TEXT,
  ticket_url TEXT,
  source_id UUID REFERENCES data_sources(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. FIGHTS
CREATE TABLE IF NOT EXISTS fights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(200) NOT NULL UNIQUE,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  fighter_a_id UUID REFERENCES fighters(id) NOT NULL,
  fighter_b_id UUID REFERENCES fighters(id) NOT NULL,
  weight_class VARCHAR(50) NOT NULL,
  scheduled_rounds INT DEFAULT 12,
  title VARCHAR(200),
  status fight_status DEFAULT 'NOT_STARTED',
  current_round INT DEFAULT 0,
  round_timer VARCHAR(10) DEFAULT '00:00',
  is_main_event BOOLEAN DEFAULT FALSE,
  is_co_main BOOLEAN DEFAULT FALSE,
  card_order INT DEFAULT 1,
  -- Result
  winner_id UUID REFERENCES fighters(id),
  result_method fight_result_method,
  finish_round INT,
  official_scores TEXT,
  result_summary TEXT,
  -- Telemetry & Source
  verification_status data_classification DEFAULT 'VERIFIED',
  source_provider VARCHAR(100),
  source_provider_id VARCHAR(100),
  last_telemetry_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ROUNDS & COMPUBOX ROUND STATISTICS
CREATE TABLE IF NOT EXISTS rounds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fight_id UUID REFERENCES fights(id) ON DELETE CASCADE,
  round_number INT NOT NULL,
  duration_seconds INT DEFAULT 180,
  status VARCHAR(20) DEFAULT 'SCHEDULED', -- 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED'
  winner_id UUID REFERENCES fighters(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS round_statistics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fight_id UUID REFERENCES fights(id) ON DELETE CASCADE,
  round_number INT NOT NULL,
  fighter_id UUID REFERENCES fighters(id) ON DELETE CASCADE,
  -- Compubox Metrics
  punches_thrown INT DEFAULT 0,
  punches_landed INT DEFAULT 0,
  accuracy NUMERIC(5,2) DEFAULT 0.00,
  jabs_thrown INT DEFAULT 0,
  jabs_landed INT DEFAULT 0,
  power_thrown INT DEFAULT 0,
  power_landed INT DEFAULT 0,
  knockdowns INT DEFAULT 0,
  ring_control_score INT,
  aggression_score INT,
  defence_score INT,
  -- Source & Verification
  verification_status data_classification DEFAULT 'VERIFIED',
  source_id UUID REFERENCES data_sources(id),
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. BOOKMAKERS & ODDS
CREATE TABLE IF NOT EXISTS bookmakers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  region VARCHAR(50) DEFAULT 'UK/GLOBAL',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS odds_markets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fight_id UUID REFERENCES fights(id) ON DELETE CASCADE,
  market_name VARCHAR(100) DEFAULT 'FIGHT_WINNER',
  is_live BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS odds_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fight_id UUID REFERENCES fights(id) ON DELETE CASCADE,
  bookmaker_id UUID REFERENCES bookmakers(id) ON DELETE CASCADE,
  market_id UUID REFERENCES odds_markets(id) ON DELETE CASCADE,
  fighter_a_odds NUMERIC(8,4) NOT NULL,
  fighter_b_odds NUMERIC(8,4) NOT NULL,
  draw_odds NUMERIC(8,4),
  fighter_a_implied_prob NUMERIC(5,2) GENERATED ALWAYS AS (ROUND((1.0 / fighter_a_odds) * 100, 2)) STORED,
  fighter_b_implied_prob NUMERIC(5,2) GENERATED ALWAYS AS (ROUND((1.0 / fighter_b_odds) * 100, 2)) STORED,
  bookmaker_margin NUMERIC(5,2),
  source_provider VARCHAR(50),
  snapshot_timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- 10. MOMENTUM SNAPSHOTS & SIGNALS
CREATE TABLE IF NOT EXISTS momentum_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fight_id UUID REFERENCES fights(id) ON DELETE CASCADE,
  round_number INT NOT NULL,
  fighter_a_score INT NOT NULL, -- 0 to 100
  fighter_b_score INT NOT NULL, -- 0 to 100
  explanation_title TEXT,
  explanation_points TEXT[],
  input_features JSONB,
  calculated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS fight_signals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fight_id UUID REFERENCES fights(id) ON DELETE CASCADE,
  fighter_id UUID REFERENCES fighters(id),
  round_number INT,
  round_time VARCHAR(10),
  signal_type VARCHAR(50) NOT NULL, -- 'jab', 'power', 'control', 'defence', 'fatigue'
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(50),
  confidence VARCHAR(20) DEFAULT 'High', -- 'High', 'Medium', 'Low'
  trend VARCHAR(20) DEFAULT 'stable',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. USERS & ALERTS
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(150),
  tier VARCHAR(20) DEFAULT 'free', -- 'free', 'pro', 'syndicate'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  fighter_id UUID REFERENCES fighters(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, fighter_id)
);

CREATE TABLE IF NOT EXISTS alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  fight_id UUID REFERENCES fights(id),
  fighter_id UUID REFERENCES fighters(id),
  category VARCHAR(50) NOT NULL, -- 'Fight', 'Odds', 'Fighter', 'Signal', 'News'
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  is_read BOOLEAN DEFAULT FALSE,
  threshold_percentage NUMERIC(5,2),
  notify_email BOOLEAN DEFAULT TRUE,
  notify_push BOOLEAN DEFAULT TRUE,
  notify_in_app BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_fights_status ON fights(status);
CREATE INDEX IF NOT EXISTS idx_fights_event ON fights(event_id);
CREATE INDEX IF NOT EXISTS idx_fights_fighters ON fights(fighter_a_id, fighter_b_id);
CREATE INDEX IF NOT EXISTS idx_round_stats_fight ON round_statistics(fight_id, round_number);
CREATE INDEX IF NOT EXISTS idx_odds_snapshots_fight_time ON odds_snapshots(fight_id, snapshot_timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_momentum_fight_round ON momentum_snapshots(fight_id, round_number);
CREATE INDEX IF NOT EXISTS idx_signals_fight ON fight_signals(fight_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_fighters_slug ON fighters(slug);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
