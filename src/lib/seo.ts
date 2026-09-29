import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import type { SeoCopy } from "@/content/types";

type Href = Parameters<typeof getPathname>[0]["href"];

export function absoluteUrl(locale: Locale, href: Href): string {
  return siteConfig.url + getPathname({ locale, href });
}

/** Per-page metadata with canonical URL, hreflang alternates and Open Graph. */
export function pageMetadata(opts: { locale: Locale; href: Href; seo: SeoCopy; noindex?: boolean; isHome?: boolean }): Metadata {
  const { locale, href, seo, noindex, isHome } = opts;
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = absoluteUrl(l, href);
  languages["x-default"] = absoluteUrl(routing.defaultLocale, href);

  const title = isHome ? `${siteConfig.name} — ${seo.title}` : seo.title;
  return {
    title: isHome ? { absolute: title } : title,
    description: seo.description,
    alternates: { canonical: absoluteUrl(locale, href), languages },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: locale === "pt" ? "pt_PT" : "en_GB",
      url: absoluteUrl(locale, href),
      title,
      description: seo.description,
      images: [{ url: "/og/servus-og.png", width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: { card: "summary_large_image", title, description: seo.description, images: ["/og/servus-og.png"] },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}
