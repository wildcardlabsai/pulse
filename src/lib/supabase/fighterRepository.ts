import { Fighter } from '../../types/boxing';
import { supabaseService } from './supabaseClient';

const COLUMNS =
  'slug,name,nickname,nationality,flag_emoji,date_of_birth,division,stance,height_cm,reach_cm,weight_kg,' +
  'turned_pro_year,wins,losses,draws,kos,ko_percentage,verification_status,source_provider,source_provider_id,last_verified_at';

const ageFrom = (dob?: string | null) =>
  dob ? Math.floor((Date.now() - new Date(dob).getTime()) / 31557600000) : 0;

const cmToFeetIn = (cm: number) => {
  const inches = Math.round(cm / 2.54);
  return `${Math.floor(inches / 12)}'${inches % 12}"`;
};

/** Maps a `fighters` row to the app's Fighter type. Fields the database doesn't hold stay empty. */
function mapRow(r: any): Fighter {
  const heightCm = Number(r.height_cm) || 0;
  const weightKg = Number(r.weight_kg) || 0;
  const reachCm = Number(r.reach_cm) || 0;
  return {
    id: `db-${r.slug}`,
    name: r.name,
    nickname: r.nickname ?? undefined,
    image: '',
    record: {
      wins: r.wins ?? 0,
      losses: r.losses ?? 0,
      draws: r.draws ?? 0,
      kos: r.kos ?? 0,
      koPercentage: Number(r.ko_percentage) || 0
    },
    physical: {
      height: heightCm ? cmToFeetIn(heightCm) : '—',
      heightCm,
      reach: reachCm ? `${Math.round(reachCm / 2.54)}"` : '—',
      reachCm,
      weight: weightKg ? `${weightKg} kg` : '—',
      weightKg,
      age: ageFrom(r.date_of_birth),
      division: r.division || 'Unknown'
    },
    bio: {
      nationality: r.nationality ?? '—',
      flag: r.flag_emoji ?? '',
      born: r.date_of_birth ?? '—',
      hometown: '—',
      stance: (['Orthodox', 'Southpaw', 'Switch'].includes(r.stance) ? r.stance : 'Orthodox') as 'Orthodox',
      turnedPro: r.turned_pro_year ?? 0,
      trainer: '—',
      manager: '—',
      promoter: '—'
    },
    stats: {
      punchesLandedPerRound: 0,
      punchesThrownPerRound: 0,
      accuracy: 0,
      jabsLandedPerRound: 0,
      powerLandedPerRound: 0,
      knockdownsPerFight: 0
    },
    trends: [],
    achievements: [],
    styleTags: [],
    news: [],
    source: {
      provider: r.source_provider ?? 'supabase',
      providerId: r.source_provider_id ?? r.slug,
      timestamp: r.last_verified_at ?? new Date().toISOString(),
      // Directory data carries no verified fight record
      verificationStatus: 'PENDING'
    }
  };
}

export async function fetchDbFighters(query?: string, limit = 500): Promise<Fighter[]> {
  const client = supabaseService.getClient();
  if (!client) return [];
  try {
    let q = client.from('fighters').select(COLUMNS).order('name').limit(limit);
    if (query?.trim()) {
      // strip characters that are special in PostgREST filters
      const term = query.trim().replace(/[%,()*]/g, ' ');
      q = q.or(`name.ilike.%${term}%,nickname.ilike.%${term}%`);
    }
    const { data, error } = await q;
    if (error) {
      console.warn('[fighterRepository] query failed:', error.message);
      return [];
    }
    return (data || []).map(mapRow);
  } catch (err) {
    console.warn('[fighterRepository] unexpected error:', err);
    return [];
  }
}

export async function fetchDbFighterById(id: string): Promise<Fighter | null> {
  const client = supabaseService.getClient();
  if (!client || !id.startsWith('db-')) return null;
  const { data } = await client.from('fighters').select(COLUMNS).eq('slug', id.slice(3)).maybeSingle();
  return data ? mapRow(data) : null;
}
