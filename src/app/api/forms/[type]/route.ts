import { NextResponse, type NextRequest } from "next/server";
import { isFormType } from "@/lib/forms/definitions";
import { buildSchema, toFieldErrors } from "@/lib/forms/schema";
import { checkSpam } from "@/lib/forms/spam";
import { createRateLimiter } from "@/lib/forms/rate-limit";
import { deliver } from "@/lib/forms/deliver";
import { routing } from "@/i18n/routing";

const MAX_BODY_BYTES = 20_000;
const WINDOW_MS = 10 * 60 * 1000;
// Loose cap on all requests (flood protection) + strict cap on delivered submissions,
// so a person correcting validation errors is never locked out.
const requestLimiter = createRateLimiter({ limit: 30, windowMs: WINDOW_MS });
const deliveryLimiter = createRateLimiter({ limit: 5, windowMs: WINDOW_MS });

/**
 * Duplicate protection: the browser sends one random submissionId per attempt and reuses it on
 * retries (double click, flaky network). A repeated id gets the original answer instead of a
 * second email. In-memory, so best effort per server instance; the id is also in the email/record
 * so duplicates can be spotted downstream.
 */
const IDEMPOTENCY_MS = 15 * 60 * 1000;
type Outcome = { reference: string; confirmationSent: boolean };
const seen = new Map<string, { at: number; outcome: Promise<Outcome | null> }>();

function submissionKey(type: string, body: Record<string, unknown>): string | null {
  const id = body.submissionId;
  return typeof id === "string" && /^[A-Za-z0-9-]{8,64}$/.test(id) ? `${type}:${id}` : null;
}

function prune(now: number) {
  for (const [k, v] of seen) if (now - v.at > IDEMPOTENCY_MS) seen.delete(k);
}

type ApiError = "unknown_form" | "bad_request" | "too_large" | "forbidden" | "rate_limited" | "retry" | "unavailable" | "invalid";

function fail(error: ApiError, status: number, extra: Record<string, unknown> = {}) {
  return NextResponse.json({ ok: false, error, ...extra }, { status });
}

function clientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

function newReference(): string {
  return `SV-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

export async function POST(req: NextRequest, ctx: RouteContext<"/api/forms/[type]">) {
  const { type } = await ctx.params;
  if (!isFormType(type)) return fail("unknown_form", 404);

  // Same-origin only (basic CSRF protection for a cookie-less JSON endpoint).
  const origin = req.headers.get("origin");
  if (origin) {
    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    let originHost: string | null = null;
    try {
      originHost = new URL(origin).host;
    } catch {
      /* malformed or "null" origin */
    }
    if (!originHost || originHost !== host) return fail("forbidden", 403);
  }

  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) return fail("too_large", 413);

  const ip = clientIp(req);
  const rl = requestLimiter(`${type}:${ip}`);
  if (!rl.allowed) return fail("rate_limited", 429, { retryAfter: Math.ceil((rl.resetAt - Date.now()) / 1000) });

  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) return fail("too_large", 413);
    body = JSON.parse(raw);
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error();
  } catch {
    return fail("bad_request", 400);
  }

  const spam = checkSpam(body);
  // Pretend success to bots so they don't adapt; nothing is delivered.
  if (spam === "honeypot") return NextResponse.json({ ok: true, reference: newReference() });
  if (spam === "too_fast") return fail("retry", 400);

  const parsed = buildSchema(type).safeParse(body);
  if (!parsed.success) return fail("invalid", 422, { fieldErrors: toFieldErrors(parsed.error) });

  const key = submissionKey(type, body);
  const now = Date.now();
  prune(now);
  const previous = key ? seen.get(key) : undefined;
  if (previous) {
    const outcome = await previous.outcome;
    if (outcome) return NextResponse.json({ ok: true, ...outcome, duplicate: true });
    seen.delete(key!); // the first attempt failed: allow a real retry
  }

  const dl = deliveryLimiter(`${type}:${ip}`);
  if (!dl.allowed) return fail("rate_limited", 429, { retryAfter: Math.ceil((dl.resetAt - Date.now()) / 1000) });

  const locale = (routing.locales as readonly string[]).includes(String(body.locale)) ? String(body.locale) : routing.defaultLocale;
  const data = { ...(parsed.data as Record<string, unknown>) };
  delete data.consent; // recorded as consentAt instead
  if (typeof body.submissionId === "string") data.submissionId = body.submissionId;
  const reference = newReference();

  const pending = deliver({ type, reference, locale, data, consentAt: new Date().toISOString() }).then((result) =>
    result.ok ? { reference, confirmationSent: result.confirmationSent } : null,
  );
  if (key) seen.set(key, { at: now, outcome: pending });
  const outcome = await pending;
  if (!outcome) {
    if (key) seen.delete(key);
    return fail("unavailable", 503);
  }
  return NextResponse.json({ ok: true, ...outcome });
}
