/**
 * Fixed-window rate limiter.
 * NOTE: in-memory state is per server instance. It is enough for launch on a single
 * region, but on serverless/multi-instance hosting swap `MemoryStore` for a shared
 * store (e.g. Upstash Redis) behind the same interface.
 */
export interface RateLimitStore {
  hit(key: string, windowMs: number): { count: number; resetAt: number };
}

export class MemoryStore implements RateLimitStore {
  private buckets = new Map<string, { count: number; resetAt: number }>();
  constructor(private now: () => number = Date.now) {}

  hit(key: string, windowMs: number) {
    const t = this.now();
    const current = this.buckets.get(key);
    if (!current || current.resetAt <= t) {
      const fresh = { count: 1, resetAt: t + windowMs };
      this.buckets.set(key, fresh);
      if (this.buckets.size > 10_000) this.sweep(t);
      return fresh;
    }
    current.count += 1;
    return current;
  }

  private sweep(t: number) {
    for (const [k, v] of this.buckets) if (v.resetAt <= t) this.buckets.delete(k);
  }
}

export function createRateLimiter(opts: { limit: number; windowMs: number; store?: RateLimitStore }) {
  const store = opts.store ?? new MemoryStore();
  return (key: string) => {
    const { count, resetAt } = store.hit(key, opts.windowMs);
    return { allowed: count <= opts.limit, remaining: Math.max(0, opts.limit - count), resetAt };
  };
}
