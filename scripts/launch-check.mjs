#!/usr/bin/env node
/**
 * Launch readiness check (production launch checklist, P0).
 *
 *   npm run launch:check      → report only
 *   runs automatically before every `npm run build` (prebuild)
 *
 * When SITE_INDEXING=on in a production build, missing P0 items FAIL the build, so the site
 * can never be opened to search engines with placeholder email, log-only forms or an
 * unapproved privacy policy. Otherwise problems are printed as warnings and the build continues.
 */
import { existsSync, readFileSync } from "node:fs";

// Local runs: read .env.local like Next.js does (Vercel injects env vars directly).
for (const file of [".env.production.local", ".env.local", ".env"]) {
  if (!existsSync(file)) continue;
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^(["'])(.*)\1$/, "$2");
  }
}

const env = process.env;
const strict = env.SITE_INDEXING === "on" && (env.VERCEL_ENV ?? "production") === "production";
const placeholder = (v) => !v || !v.trim() || /example(\.|$|>)|your-domain|localhost/i.test(v);
const legal = readFileSync(new URL("../src/content/legal.ts", import.meta.url), "utf8");
const approved = (doc) => new RegExp(`${doc}:\\s*\\{\\s*approved:\\s*true`).test(legal);

const blockers = [];
const warnings = [];
const need = (ok, msg) => ok || blockers.push(msg);
const nice = (ok, msg) => ok || warnings.push(msg);

const url = env.NEXT_PUBLIC_SITE_URL ?? "";
need(/^https:\/\//.test(url) && !placeholder(url), "NEXT_PUBLIC_SITE_URL must be the real https:// address");
need(!/\.vercel\.app/i.test(url), "NEXT_PUBLIC_SITE_URL still points to *.vercel.app — connect the real domain first");
need(!placeholder(env.NEXT_PUBLIC_CONTACT_EMAIL), "NEXT_PUBLIC_CONTACT_EMAIL is empty or a placeholder");
need(env.FORM_DELIVERY !== "log", 'FORM_DELIVERY=log — forms would only be logged, not delivered. Remove it in Production');
const email = env.RESEND_API_KEY && !placeholder(env.FORM_FROM);
need(email || env.FORM_WEBHOOK_URL, "No form delivery: set RESEND_API_KEY + FORM_FROM (and/or FORM_WEBHOOK_URL)");
if (email) {
  for (const k of ["FORM_TO_SERVICE", "FORM_TO_PARTNERSHIP", "FORM_TO_DEMO", "FORM_TO_GENERAL", "FORM_TO_SUPPORT"])
    need(!placeholder(env[k]), `${k} (form recipient) is empty or a placeholder`);
}
need(!placeholder(env.NEXT_PUBLIC_LEGAL_NAME), "NEXT_PUBLIC_LEGAL_NAME (responsible legal entity) is empty");
need(!placeholder(env.NEXT_PUBLIC_PRIVACY_EMAIL ?? env.NEXT_PUBLIC_CONTACT_EMAIL), "No privacy contact email");
need(approved("privacy"), "Privacy policy not approved (src/content/legal.ts → legalStatus.privacy.approved)");

nice(env.FORM_WEBHOOK_URL, "FORM_WEBHOOK_URL not set — no durable record/CRM copy of enquiries besides email");
nice(env.ALERT_WEBHOOK_URL, "ALERT_WEBHOOK_URL not set — delivery failures only appear in Vercel logs");
nice(env.FORM_CONFIRMATION === "on", "FORM_CONFIRMATION is not \"on\" — visitors get a reference on screen but no confirmation email");
nice(!placeholder(env.FORM_TO_WAITLIST), "FORM_TO_WAITLIST not set — waiting lists go to FORM_TO_GENERAL");
nice(approved("terms"), "Terms of use not approved (legalStatus.terms.approved)");
nice(!placeholder(env.NEXT_PUBLIC_LEGAL_ADDRESS), "NEXT_PUBLIC_LEGAL_ADDRESS is empty");

const label = strict ? "PRODUCTION + INDEXING ON (strict)" : `indexing off / ${env.VERCEL_ENV ?? "local"} (report only)`;
console.log(`\nLaunch check — ${label}`);
for (const b of blockers) console.log(`  ${strict ? "✗" : "!"} ${b}`);
for (const w of warnings) console.log(`  · ${w}`);
if (!blockers.length && !warnings.length) console.log("  ✓ All launch checks pass");
else if (!blockers.length) console.log("  ✓ No blockers");
console.log("");

if (strict && blockers.length) {
  console.error(`Launch check failed: ${blockers.length} blocker(s). Fix them or remove SITE_INDEXING=on.\n`);
  process.exit(1);
}
