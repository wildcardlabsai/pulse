-- ROW LEVEL SECURITY
-- The anon key ships in the browser bundle, so without RLS anyone could read AND write
-- every table. This makes public data read-only for anon and locks user data entirely.
-- Writes happen only via the service-role key (server-side / local scripts), which bypasses RLS.

DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'data_sources','data_sync_runs','promotions','fighters','fighter_aliases','events','fights',
    'rounds','round_statistics','bookmakers','odds_markets','odds_snapshots','momentum_snapshots',
    'fight_signals','fight_participants','fight_status_history','data_source_records','data_quality_flags'
  ] LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('DROP POLICY IF EXISTS "public read" ON %I', t);
    EXECUTE format('CREATE POLICY "public read" ON %I FOR SELECT TO anon, authenticated USING (true)', t);
  END LOOP;

  -- No policies = no anon/authenticated access at all
  FOREACH t IN ARRAY ARRAY['users','user_follows','alerts'] LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
  END LOOP;
END $$;
