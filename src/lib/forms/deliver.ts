import "server-only";
import { FORMS, type FormType } from "./definitions";

export interface Submission {
  type: FormType;
  reference: string;
  locale: string;
  data: Record<string, unknown>;
  consentAt: string;
}

export type DeliveryResult = { ok: true } | { ok: false; reason: "not_configured" | "provider_error" };

function formatBody(s: Submission): string {
  const lines = Object.entries(s.data).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : String(v ?? "")}`);
  return [
    `Form: ${s.type}`,
    `Reference: ${s.reference}`,
    `Locale: ${s.locale}`,
    `Privacy consent: ${s.consentAt}`,
    "",
    ...lines,
  ].join("\n");
}

/**
 * Sends the submission to the inbox configured for its form.
 * Provider: Resend HTTP API (no SDK needed). Credentials stay server-side only.
 */
export async function deliver(s: Submission): Promise<DeliveryResult> {
  const to = process.env[FORMS[s.type].destinationEnv];
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FORM_FROM;

  const logOnly = process.env.FORM_DELIVERY === "log"; // explicit opt-in for staging/previews
  if (logOnly || !apiKey || !to || !from) {
    if (logOnly || process.env.NODE_ENV !== "production") {
      console.info(`[forms] (log only, not sent) → ${to ?? "<no destination>"}\n${formatBody(s)}`);
      return { ok: true };
    }
    console.error(`[forms] delivery not configured for "${s.type}" (${FORMS[s.type].destinationEnv})`);
    return { ok: false, reason: "not_configured" };
  }

  const replyTo = typeof s.data.email === "string" && s.data.email ? s.data.email : undefined;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((x) => x.trim()),
      reply_to: replyTo,
      subject: `[Website · ${s.type}] ${s.reference}`,
      text: formatBody(s),
    }),
    signal: AbortSignal.timeout(10_000),
  }).catch(() => null);

  if (!res?.ok) {
    console.error(`[forms] provider error for ${s.reference}: ${res?.status ?? "network"}`);
    return { ok: false, reason: "provider_error" };
  }
  return { ok: true };
}
