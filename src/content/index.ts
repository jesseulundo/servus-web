import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import type { SiteContent } from "./types";
import pt from "./locales/pt";
import en from "./locales/en";

/** Adding a locale to routing without adding it here is a type error. */
const content: Record<Locale, SiteContent> = { pt, en };

/**
 * Unknown locales 404 instead of crashing. Pages and metadata render in parallel with the
 * layout's locale check, so a stray request like /sw.js (locale "sw.js") reaches them too.
 */
export function getContent(locale: Locale | string): SiteContent {
  if (!hasLocale(routing.locales, locale)) notFound();
  return content[locale];
}

export * from "./catalog";
export type * from "./types";
