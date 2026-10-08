/**
 * Site-wide configuration. Values that differ per environment come from env vars
 * (see .env.example). Anything marked TODO is an open decision and must be confirmed
 * before launch. `npm run launch:check` reports what is still missing.
 */

/** Placeholder or empty values are treated as "not configured" and never shown publicly. */
function publicEmail(value: string | undefined): string | null {
  const v = value?.trim();
  if (!v || /@(servus\.)?example(\.|$)/i.test(v) || !v.includes("@")) return null;
  return v;
}

export const siteConfig = {
  /** Official spelling (confirmed 5 Oct 2026): ServUS — "Services Ulundo and Sampaio". */
  name: "ServUS",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  /**
   * Public contact address (footer, contact page, error messages, structured data).
   * Hidden everywhere until a real address is configured.
   */
  email: publicEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  /** Privacy contact shown in the privacy policy. Falls back to the public contact address. */
  privacyEmail: publicEmail(process.env.NEXT_PUBLIC_PRIVACY_EMAIL) ?? publicEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  /** TODO(legal): registered entity details for the footer and privacy policy. Empty = not shown. */
  legal: {
    name: process.env.NEXT_PUBLIC_LEGAL_NAME?.trim() || "",
    address: process.env.NEXT_PUBLIC_LEGAL_ADDRESS?.trim() || "",
    registration: process.env.NEXT_PUBLIC_LEGAL_REGISTRATION?.trim() || "",
  },
  /** Official social profiles. Empty entries are hidden. */
  social: {
    linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ?? "",
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? "",
    x: process.env.NEXT_PUBLIC_SOCIAL_X ?? "",
  },
  markets: ["JP", "AO"] as const,
} as const;
