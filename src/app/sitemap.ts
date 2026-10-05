import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo";
import { PRODUCT_SLUGS, SERVICE_SLUGS, WORK_SLUGS, products, work } from "@/content/catalog";
import { legalStatus } from "@/content/legal";

type Href = Parameters<typeof absoluteUrl>[1];

/**
 * Every indexable route, once per language (PT and EN), each with its hreflang alternates.
 * Drafts (unapproved products / case studies / legal pages) are excluded until approved.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const hrefs: Href[] = [
    "/",
    "/company",
    "/services",
    ...SERVICE_SLUGS.map((slug) => ({ pathname: "/services/[slug]" as const, params: { slug } })),
    "/products",
    ...PRODUCT_SLUGS.filter((s) => products[s].publication === "approved").map((slug) => ({
      pathname: "/products/[slug]" as const,
      params: { slug },
    })),
    "/work",
    ...WORK_SLUGS.filter((s) => work[s].publication === "approved").map((slug) => ({ pathname: "/work/[slug]" as const, params: { slug } })),
    "/partnerships",
    "/contact",
    ...(legalStatus.privacy.approved ? (["/privacy"] as const) : []),
    ...(legalStatus.terms.approved ? (["/terms"] as const) : []),
  ];

  return hrefs.flatMap((href) => {
    const languages = Object.fromEntries([
      ...routing.locales.map((l) => [l, absoluteUrl(l, href)]),
      ["x-default", absoluteUrl(routing.defaultLocale, href)],
    ]);
    return routing.locales.map((locale) => ({ url: absoluteUrl(locale, href), alternates: { languages } }));
  });
}
