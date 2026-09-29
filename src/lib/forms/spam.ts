/** Hidden field that humans never see; bots tend to fill every input. */
export const HONEYPOT_FIELD = "website_url";
/** Submissions faster than this after the form rendered are almost certainly automated. */
export const MIN_FILL_MS = 2500;

export type SpamVerdict = "ok" | "honeypot" | "too_fast";

export function checkSpam(body: Record<string, unknown>): SpamVerdict {
  const trap = body[HONEYPOT_FIELD];
  if (typeof trap === "string" && trap.trim() !== "") return "honeypot";
  const elapsed = Number(body.elapsedMs);
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) return "too_fast";
  return "ok";
}
