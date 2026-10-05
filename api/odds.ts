// Vercel serverless proxy for The Odds API.
// Keeps THE_ODDS_API_KEY on the server and caches responses at the CDN edge so the
// free tier (500 credits/month) isn't burned by every visitor.

const SPORT = 'boxing_boxing';

export default async function handler(req: any, res: any) {
  const key = process.env.THE_ODDS_API_KEY;
  if (!key) {
    res.status(503).json({ error: 'THE_ODDS_API_KEY is not configured on the server.' });
    return;
  }

  const regions = typeof req.query?.regions === 'string' ? req.query.regions : 'uk,us';
  const url =
    `https://api.the-odds-api.com/v4/sports/${SPORT}/odds` +
    `?apiKey=${encodeURIComponent(key)}&regions=${encodeURIComponent(regions)}&markets=h2h&oddsFormat=decimal`;

  try {
    const upstream = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!upstream.ok) {
      res.status(upstream.status).json({ error: `Odds API responded ${upstream.status}` });
      return;
    }
    const data = await upstream.json();
    // 15 min fresh, serve stale for an hour while revalidating
    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600');
    const remaining = upstream.headers.get('x-requests-remaining');
    if (remaining) res.setHeader('x-requests-remaining', remaining);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(502).json({ error: `Failed to reach Odds API: ${err?.message ?? 'unknown error'}` });
  }
}
