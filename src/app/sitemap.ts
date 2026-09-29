import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo";
import { PRODUCT_SLUGS, SERVICE_SLUGS, WORK_SLUGS, products, work } from "@/content/catalog";

type Href = Parameters<typeof absoluteUrl>[1];

/** Drafts (unapproved products / case studies) and the provisional privacy page are excluded. */
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
  ];

  return hrefs.map((href) => ({
    url: absoluteUrl(routing.defaultLocale, href),
    alternates: { languages: Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(l, href)])) },
  }));
}
