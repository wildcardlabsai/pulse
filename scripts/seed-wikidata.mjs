// Seeds the Supabase `fighters` table from Wikidata (CC0 data, no API key needed).
//
// Run locally (NOT on Vercel):
//   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm run seed:wikidata [-- --limit=500 --born-after=1975]
//
// Wikidata has reliable identity data (name, birth date, nationality, height, weight) but NOT
// fight records, so wins/losses/KOs are left at 0 and the row is marked PENDING_VERIFICATION.
// Records should come from the Boxing Data API sync or manual entry.
import { createClient } from '@supabase/supabase-js';

const args = Object.fromEntries(
  process.argv.slice(2).filter(a => a.startsWith('--')).map(a => a.slice(2).split('='))
);
const limit = Number(args.limit || 2000);
const bornAfter = Number(args['born-after'] || 1975);

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY; // secret: never commit, never VITE_-prefix
if (!url || !key) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}
const supabase = createClient(url, key, { auth: { persistSession: false } });

const query = `
SELECT ?p ?pLabel ?nick ?dob ?countryLabel ?cc ?height ?mass WHERE {
  ?p wdt:P106 wd:Q11338576; wdt:P569 ?dob.
  FILTER(?dob > "${bornAfter}-01-01T00:00:00Z"^^xsd:dateTime)
  ?article schema:about ?p; schema:isPartOf <https://en.wikipedia.org/>.
  OPTIONAL { ?p wdt:P1449 ?nick }
  OPTIONAL { ?p wdt:P27 ?country. OPTIONAL { ?country wdt:P297 ?cc } }
  OPTIONAL { ?p p:P2048/psn:P2048/wikibase:quantityAmount ?height }  # metres
  OPTIONAL { ?p p:P2067/psn:P2067/wikibase:quantityAmount ?mass }    # kilograms
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
LIMIT ${limit * 3}`;

// Upper limits in kg for pro boxing divisions
const DIVISIONS = [
  [47.6, 'Minimumweight'], [49.0, 'Light Flyweight'], [50.8, 'Flyweight'], [52.2, 'Super Flyweight'],
  [53.5, 'Bantamweight'], [55.3, 'Super Bantamweight'], [57.2, 'Featherweight'],
  [59.0, 'Super Featherweight'], [61.2, 'Lightweight'], [63.5, 'Super Lightweight'],
  [66.7, 'Welterweight'], [69.9, 'Super Welterweight'], [72.6, 'Middleweight'],
  [76.2, 'Super Middleweight'], [79.4, 'Light Heavyweight'], [90.7, 'Cruiserweight']
];
const division = kg => {
  if (!kg || kg < 40 || kg > 200) return 'Unknown';
  return (DIVISIONS.find(([max]) => kg <= max) || [0, 'Heavyweight'])[1];
};
const flag = cc =>
  cc && /^[A-Za-z]{2}$/.test(cc)
    ? String.fromCodePoint(...[...cc.toUpperCase()].map(c => 127397 + c.charCodeAt(0)))
    : null;
const slugify = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const res = await fetch('https://query.wikidata.org/sparql?format=json&query=' + encodeURIComponent(query), {
  headers: { 'User-Agent': 'FightPulse/1.0 (https://github.com/wildcardlabsai/pulse)', Accept: 'application/sparql-results+json' }
});
if (!res.ok) {
  console.error('Wikidata query failed:', res.status, (await res.text()).slice(0, 300));
  process.exit(1);
}
const rows = (await res.json()).results.bindings;

// Collapse multiple rows per fighter (several nicknames / citizenships)
const byQid = new Map();
for (const r of rows) {
  const qid = r.p.value.split('/').pop();
  const name = r.pLabel?.value;
  if (!name || /^Q\d+$/.test(name)) continue; // no English label
  if (!byQid.has(qid)) {
    const kg = r.mass ? Number(r.mass.value) : null;
    const m = r.height ? Number(r.height.value) : null;
    byQid.set(qid, {
      slug: `${slugify(name)}-${qid.toLowerCase()}`,
      name,
      nickname: r.nick?.value ?? null,
      nationality: r.countryLabel?.value ?? null,
      country_code: r.cc?.value ?? null,
      flag_emoji: flag(r.cc?.value),
      date_of_birth: r.dob.value.slice(0, 10),
      division: division(kg),
      height_cm: m && m > 1.2 && m < 2.4 ? Math.round(m * 1000) / 10 : null,
      weight_kg: kg && kg > 40 && kg < 200 ? Math.round(kg * 10) / 10 : null,
      verification_status: 'PENDING_VERIFICATION',
      source_provider: 'wikidata',
      source_provider_id: qid,
      last_verified_at: new Date().toISOString()
    });
  }
}
const fighters = [...byQid.values()].slice(0, limit);
console.log(`Fetched ${rows.length} rows -> ${fighters.length} unique fighters`);

const { data: src, error: srcErr } = await supabase
  .from('data_sources')
  .upsert({ name: 'Wikidata', code: 'wikidata', feed_type: 'fighter_records', api_endpoint: 'https://query.wikidata.org/sparql', polling_interval_sec: 86400 }, { onConflict: 'code' })
  .select('id').single();
if (srcErr) { console.error('data_sources upsert failed:', srcErr.message); process.exit(1); }

let done = 0;
for (let i = 0; i < fighters.length; i += 200) {
  const chunk = fighters.slice(i, i + 200);
  const { error } = await supabase.from('fighters').upsert(chunk, { onConflict: 'slug' });
  if (error) { console.error('fighters upsert failed:', error.message); break; }
  done += chunk.length;
}

await supabase.from('data_sync_runs').insert({
  source_id: src.id,
  status: done === fighters.length ? 'COMPLETED' : 'PARTIAL',
  records_synced: done,
  completed_at: new Date().toISOString()
});
console.log(`Upserted ${done}/${fighters.length} fighters.`);
