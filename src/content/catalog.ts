/**
 * Locale-independent catalog: slugs, states, links and flags.
 * Translated copy lives in src/content/locales/<locale>.ts and is keyed by these slugs,
 * so TypeScript fails the build if a locale is missing an entry.
 *
 * This is "conteúdo versionado no repositório" (blueprint, phase 1). The shape is
 * deliberately CMS-friendly so it can move to a headless CMS later without page changes.
 */

export const SERVICE_SLUGS = [
  "it-consulting",
  "websites",
  "mobile-apps",
  "management-systems",
  "ai-automation",
  "maintenance",
] as const;
export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export const PRODUCT_SLUGS = ["trumuno-footy", "audio-cleaner", "moambeira", "rh"] as const;
export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

export const WORK_SLUGS = ["ibex", "fenix-academy", "urolundo"] as const;
export type WorkSlug = (typeof WORK_SLUGS)[number];

/** Blueprint UX rule: every product shows one of these states. */
export type ProductStatus = "production" | "development" | "partner";

/**
 * "approved" = cleared for public release.
 * "draft" = placeholder copy; page is rendered with noindex and excluded from the sitemap.
 */
export type Publication = "approved" | "draft";

export type ServiceIcon = "compass" | "monitor" | "smartphone" | "layout" | "sparkles" | "wrench";

export const services: Record<ServiceSlug, { icon: ServiceIcon; relatedWork?: WorkSlug; relatedProduct?: ProductSlug }> = {
  "it-consulting": { icon: "compass" },
  websites: { icon: "monitor", relatedWork: "ibex" },
  "mobile-apps": { icon: "smartphone", relatedWork: "urolundo" },
  "management-systems": { icon: "layout", relatedWork: "fenix-academy", relatedProduct: "rh" },
  "ai-automation": { icon: "sparkles", relatedProduct: "audio-cleaner" },
  maintenance: { icon: "wrench" },
};

export type ProductCtaTarget =
  | { kind: "external"; url: string | null } // null = URL not confirmed yet → falls back to contact
  | { kind: "form"; form: "service" | "partnership" | "demo" | "general" | "support" | "interest" };

export interface ProductMeta {
  status: ProductStatus;
  /** Each product keeps its own identity; accent is used sparingly on its card and page. */
  accent: string;
  publication: Publication;
  /** Primary and optional secondary CTA (blueprint: max one secondary action). */
  primary: ProductCtaTarget;
  secondary?: ProductCtaTarget;
}

export const products: Record<ProductSlug, ProductMeta> = {
  "trumuno-footy": {
    status: "production",
    accent: "#1f7a4d",
    publication: "approved",
    // TODO(product): confirm public URL
    primary: { kind: "external", url: process.env.NEXT_PUBLIC_URL_TRUMUNO ?? null },
    secondary: { kind: "form", form: "partnership" },
  },
  "audio-cleaner": {
    status: "production",
    accent: "#2f5d8a",
    publication: "approved",
    // TODO(product): confirm public URL
    primary: { kind: "external", url: process.env.NEXT_PUBLIC_URL_AUDIO_CLEANER ?? null },
    secondary: { kind: "form", form: "general" },
  },
  moambeira: {
    status: "development",
    accent: "#b4540a",
    publication: "draft", // TODO(product+legal): public roadmap and compliance review
    primary: { kind: "form", form: "interest" },
    secondary: { kind: "form", form: "partnership" },
  },
  rh: {
    status: "development",
    accent: "#3d5a73",
    publication: "draft", // TODO(product): public roadmap
    primary: { kind: "form", form: "demo" },
  },
};

export interface WorkMeta {
  /** TODO(partnerships): every case study needs written partner approval before "approved". */
  publication: Publication;
  /** Only set when confirmed. */
  country?: "JP" | "AO";
}

export const work: Record<WorkSlug, WorkMeta> = {
  ibex: { publication: "draft", country: "JP" },
  "fenix-academy": { publication: "draft", country: "AO" },
  urolundo: { publication: "draft" }, // TODO(partnerships): confirm market
};
