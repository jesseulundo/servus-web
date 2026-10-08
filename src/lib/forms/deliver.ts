import "server-only";
import { FORMS, type FormType } from "./definitions";
import { confirmationEmail } from "./confirmation";

/**
 * Form delivery pipeline (production launch checklist, section 2).
 *
 *   1. Team notification email via Resend → the inbox configured for this form.
 *   2. Durable record via webhook (optional) → CRM, Google Sheets, Airtable, Zapier/Make…
 *   3. Confirmation email to the visitor with their reference (optional).
 *   4. Failure alert via webhook (optional) → Slack / Discord / Teams / Google Chat.
 *
 * The request succeeds when at least one durable channel (1 or 2) worked, so an enquiry is
 * never lost silently. Any failure is logged and alerted. All credentials stay server-side.
 */

export interface Submission {
  type: FormType;
  reference: string;
  locale: string;
  data: Record<string, unknown>;
  consentAt: string;
}

export type DeliveryResult =
  | { ok: true; confirmationSent: boolean }
  | { ok: false; reason: "not_configured" | "provider_error" };

type Env = Record<string, string | undefined>;

const RESEND_URL = "https://api.resend.com/emails";
const TIMEOUT_MS = 10_000;

export function destinationFor(type: FormType, env: Env = process.env): string[] {
  const def = FORMS[type];
  const raw = env[def.destinationEnv] || (def.fallbackEnv ? env[def.fallbackEnv] : "") || "";
  return raw
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

export function formatBody(s: Submission): string {
  const lines = Object.entries(s.data).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : String(v ?? "")}`);
  return [`Form: ${s.type}`, `Reference: ${s.reference}`, `Locale: ${s.locale}`, `Privacy consent: ${s.consentAt}`, "", ...lines].join(
    "\n",
  );
}

async function post(url: string, body: unknown, headers: Record<string, string> = {}): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) {
      console.error(`[forms] POST ${new URL(url).host} → HTTP ${res.status}`);
      return false;
    }
    // Some receivers (e.g. Google Apps Script) always answer HTTP 200; they report failure as {"ok": false}.
    const answer = await res.text().catch(() => "");
    if (/^\s*\{/.test(answer)) {
      try {
        if (JSON.parse(answer).ok === false) {
          console.error(`[forms] POST ${new URL(url).host} → rejected by receiver`);
          return false;
        }
      } catch {
        /* not JSON: fine */
      }
    }
    return true;
  } catch (err) {
    console.error(`[forms] POST ${new URL(url).host} failed: ${(err as Error).name}`);
    return false;
  }
}

async function sendEmail(env: Env, msg: { to: string[]; subject: string; text: string; replyTo?: string }): Promise<boolean> {
  return post(
    RESEND_URL,
    { from: env.FORM_FROM, to: msg.to, subject: msg.subject, text: msg.text, reply_to: msg.replyTo },
    { Authorization: `Bearer ${env.RESEND_API_KEY}` },
  );
}

/** Never includes form content: alerts may go to chat tools outside the privacy perimeter. */
async function alert(env: Env, text: string): Promise<void> {
  console.error(`[forms][alert] ${text}`);
  if (!env.ALERT_WEBHOOK_URL) return;
  // `text` is read by Slack, Teams and Google Chat; `content` by Discord.
  await post(env.ALERT_WEBHOOK_URL, { text, content: text });
}

export async function deliver(s: Submission, env: Env = process.env): Promise<DeliveryResult> {
  const to = destinationFor(s.type, env);
  const emailReady = Boolean(env.RESEND_API_KEY && env.FORM_FROM && to.length);
  const recordReady = Boolean(env.FORM_WEBHOOK_URL);

  // Explicit opt-in for staging/previews, or local development without credentials.
  if (env.FORM_DELIVERY === "log" || (!emailReady && !recordReady && env.NODE_ENV !== "production")) {
    console.info(`[forms] (log only, not sent) → ${to.join(", ") || "<no destination>"}\n${formatBody(s)}`);
    return { ok: true, confirmationSent: false };
  }
  if (!emailReady && !recordReady) {
    await alert(env, `Form "${s.type}" ${s.reference}: delivery is not configured (${FORMS[s.type].destinationEnv}).`);
    return { ok: false, reason: "not_configured" };
  }

  const replyTo = typeof s.data.email === "string" && s.data.email ? s.data.email : undefined;
  const [emailed, recorded] = await Promise.all([
    emailReady
      ? sendEmail(env, { to, subject: `[Website · ${s.type}] ${s.reference}`, text: formatBody(s), replyTo })
      : Promise.resolve(false),
    recordReady
      ? post(
          env.FORM_WEBHOOK_URL!,
          { reference: s.reference, form: s.type, locale: s.locale, receivedAt: new Date().toISOString(), consentAt: s.consentAt, data: s.data },
          env.FORM_WEBHOOK_SECRET ? { Authorization: `Bearer ${env.FORM_WEBHOOK_SECRET}` } : {},
        )
      : Promise.resolve(false),
  ]);

  const failures = [emailReady && !emailed && "team email", recordReady && !recorded && "record webhook"].filter(Boolean);
  if (!emailed && !recorded) {
    await alert(env, `Form "${s.type}" ${s.reference}: NOT delivered (${failures.join(", ")} failed). The visitor saw an error.`);
    return { ok: false, reason: "provider_error" };
  }
  if (failures.length) await alert(env, `Form "${s.type}" ${s.reference}: ${failures.join(", ")} failed; saved via the other channel.`);

  // Confirmation to the visitor: only after the enquiry is safely stored, and only when enabled.
  let confirmationSent = false;
  if (emailed && env.FORM_CONFIRMATION === "on" && replyTo) {
    const mail = confirmationEmail(s.locale, s.reference);
    confirmationSent = await sendEmail(env, { to: [replyTo], subject: mail.subject, text: mail.text, replyTo: to[0] });
    if (!confirmationSent) await alert(env, `Form "${s.type}" ${s.reference}: confirmation email to the visitor failed.`);
  }
  return { ok: true, confirmationSent };
}
