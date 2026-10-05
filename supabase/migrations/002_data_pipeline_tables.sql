-- FIGHT PULSE DATA PIPELINE & QUALITY TABLES (PostgreSQL / Supabase)
-- Extension to 001_initial_schema.sql

-- 1. FIGHT PARTICIPANTS
CREATE TABLE IF NOT EXISTS fight_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fight_id UUID REFERENCES fights(id) ON DELETE CASCADE,
  fighter_id UUID REFERENCES fighters(id) ON DELETE CASCADE,
  corner VARCHAR(10) NOT NULL CHECK (corner IN ('red', 'blue')),
  weigh_in_weight_kg NUMERIC(5,2),
  weigh_in_weight_lbs NUMERIC(5,1),
  is_winner BOOLEAN,
  purse_usd NUMERIC(12,2),
  source_provider VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(fight_id, fighter_id),
  UNIQUE(fight_id, corner)
);

-- 2. FIGHT STATUS HISTORY
CREATE TABLE IF NOT EXISTS fight_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fight_id UUID REFERENCES fights(id) ON DELETE CASCADE,
  previous_status fight_status,
  new_status fight_status NOT NULL,
  round_number INT,
  elapsed_seconds INT,
  changed_at TIMESTAMPTZ DEFAULT NOW(),
  triggered_by VARCHAR(50) -- 'provider_feed', 'admin_override', 'simulation'
);

-- 3. DATA SOURCE RECORDS (Raw payloads for audit trail and deduplication)
CREATE TABLE IF NOT EXISTS data_source_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_id UUID REFERENCES data_sources(id) ON DELETE CASCADE,
  entity_type VARCHAR(50) NOT NULL, -- 'fighter', 'fight', 'event', 'odds', 'stats'
  external_id VARCHAR(150) NOT NULL,
  internal_id UUID,
  checksum VARCHAR(64) NOT NULL,
  raw_payload JSONB NOT NULL,
  last_synced_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(source_id, entity_type, external_id)
);

-- 4. DATA QUALITY AUDIT & CONFLICT LOG
CREATE TABLE IF NOT EXISTS data_quality_flags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type VARCHAR(50) NOT NULL,
  entity_id VARCHAR(150) NOT NULL,
  severity VARCHAR(20) NOT NULL CHECK (severity IN ('CRITICAL', 'WARNING', 'INFO')),
  rule_code VARCHAR(50) NOT NULL, -- 'DUPLICATE_FIGHTER', 'CONFLICTING_RECORDS', 'INVALID_ODDS', 'MISSING_PARTICIPANTS'
  message TEXT NOT NULL,
  conflicting_payload JSONB,
  is_resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMPTZ,
  resolved_by VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_fight_participants_fight ON fight_participants(fight_id);
CREATE INDEX IF NOT EXISTS idx_fight_status_history_fight ON fight_status_history(fight_id, changed_at DESC);
CREATE INDEX IF NOT EXISTS idx_data_source_records_lookup ON data_source_records(source_id, entity_type, external_id);
CREATE INDEX IF NOT EXISTS idx_data_quality_flags_entity ON data_quality_flags(entity_type, entity_id);
