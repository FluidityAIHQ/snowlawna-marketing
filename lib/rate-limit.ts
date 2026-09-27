const hits = new Map<string, number[]>();

/**
 * Sliding-window limiter kept in memory. Best effort only: each serverless instance has its own
 * map and it resets on cold starts. Use a shared store (e.g. Upstash, Vercel KV) for anything stricter.
 */
export function rateLimit(key: string, { limit, windowMs }: { limit: number; windowMs: number }) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return { ok: false as const, retryAfterSeconds: Math.ceil((windowMs - (now - recent[0])) / 1000) };
  }

  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 5000) {
    for (const [entry, times] of hits) {
      if (times.every((time) => now - time >= windowMs)) hits.delete(entry);
    }
  }

  return { ok: true as const };
}
