import { defineRouting } from "next-intl/routing";

/**
 * Launch locales: Portuguese (default) and English.
 * To add Japanese or French: add the code here, add messages/<code>.json and
 * src/content/locales/<code>.ts, then add the localized pathnames below.
 * TypeScript will flag every place that is missing a translation.
 */
export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/company": { pt: "/empresa", en: "/company" },
    "/services": { pt: "/servicos", en: "/services" },
    "/services/[slug]": { pt: "/servicos/[slug]", en: "/services/[slug]" },
    "/products": { pt: "/produtos", en: "/products" },
    "/products/[slug]": { pt: "/produtos/[slug]", en: "/products/[slug]" },
    "/work": { pt: "/trabalhos", en: "/work" },
    "/work/[slug]": { pt: "/trabalhos/[slug]", en: "/work/[slug]" },
    "/partnerships": { pt: "/parcerias", en: "/partnerships" },
    "/contact": { pt: "/contactos", en: "/contact" },
    "/privacy": { pt: "/privacidade", en: "/privacy" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
