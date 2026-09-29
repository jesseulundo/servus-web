import type { Locale } from "@/i18n/routing";
import type { SiteContent } from "./types";
import pt from "./locales/pt";
import en from "./locales/en";

/** Adding a locale to routing without adding it here is a type error. */
const content: Record<Locale, SiteContent> = { pt, en };

export function getContent(locale: Locale): SiteContent {
  return content[locale];
}

export * from "./catalog";
export type * from "./types";
