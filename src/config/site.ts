/**
 * Site-wide configuration. Values that differ per environment come from env vars
 * (see .env.example). Anything marked TODO is an open decision in the blueprint
 * ("Decisões para iniciar o design") and must be confirmed before launch.
 */
export const siteConfig = {
  /** TODO(brand): blueprint text uses "Servus", logo reads "ServUS". Confirm official spelling. */
  name: "Servus",
  legalName: "Servus", // TODO(legal): registered company name
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  /** Official contact channels. TODO(ops): confirm addresses and owners per form. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@servus.example",
  /** TODO(marketing): confirm social profiles. Empty entries are hidden. */
  social: {
    linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ?? "",
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? "",
    x: process.env.NEXT_PUBLIC_SOCIAL_X ?? "",
  },
  markets: ["JP", "AO"] as const,
} as const;
