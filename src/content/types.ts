import type { ProductSlug, ServiceSlug, WorkSlug } from "./catalog";

export interface Step {
  title: string;
  text: string;
}
export interface Faq {
  q: string;
  a: string;
}
export interface TitledList {
  title: string;
  items: string[];
}
export interface SeoCopy {
  title: string;
  description: string;
}

export interface ServiceCopy {
  name: string;
  /** Card summary — benefit first, technology as detail (blueprint component rule). */
  summary: string;
  seo: SeoCopy;
  // Blueprint "Estrutura de cada página de serviço", sections 1–6:
  problem: { title: string; text: string; impact: string[] };
  approach: { title: string; text: string };
  deliverables: TitledList;
  process: { title: string; steps: Step[]; clientResponsibilities: TitledList };
  faq: Faq[];
  cta: { title: string; text: string };
}

export interface ProductSection {
  title: string;
  text?: string;
  items?: string[];
}

export interface ProductCopy {
  name: string;
  /** One-line value proposition used on cards. */
  valueProp: string;
  seo: SeoCopy;
  heroTitle: string;
  description: string;
  sections: ProductSection[];
  /** Ordered flow (e.g. MOAMBEIRA "Fluxo central"). */
  flow?: { title: string; steps: Step[] };
  /** Highlighted note: compliance, limits, positioning. */
  notice?: { title: string; text: string };
  primaryLabel: string;
  secondaryLabel?: string;
}

/** Blueprint "Modelo de caso de estudo". */
export interface WorkCopy {
  partner: string;
  context: string;
  seo: SeoCopy;
  challenge: string;
  responsibility: string;
  solution: string;
  status: string;
  outcome: string;
  /** Short scope indicators shown as chips (e.g. Urolundo, visual guide V3). */
  scope?: string[];
}

export interface SiteContent {
  home: {
    seo: SeoCopy;
    hero: { title: string; text: string };
    capabilities: { title: string; intro: string };
    products: { title: string; intro: string };
    work: { title: string; intro: string };
    method: { title: string; intro: string; steps: Step[] };
    trust: { title: string; items: Step[] };
    contact: { title: string; text: string; partnershipLink: string };
  };
  company: {
    seo: SeoCopy;
    title: string;
    intro: string;
    blocks: Step[];
    mission: Step;
    vision: Step;
    promise: Step;
    pillarsTitle: string;
    pillars: Step[];
    markets: { title: string; text: string; tags: string[] };
    cta: { title: string; text: string };
  };
  services: {
    seo: SeoCopy;
    title: string;
    intro: string;
    items: Record<ServiceSlug, ServiceCopy>;
    labels: { problem: string; deliverables: string; related: string; faq: string; process: string };
  };
  products: {
    seo: SeoCopy;
    title: string;
    intro: string;
    items: Record<ProductSlug, ProductCopy>;
  };
  work: {
    seo: SeoCopy;
    title: string;
    intro: string;
    items: Record<WorkSlug, WorkCopy>;
    labels: {
      context: string;
      challenge: string;
      responsibility: string;
      solution: string;
      status: string;
      outcome: string;
    };
    cta: { title: string; text: string };
  };
  partnerships: {
    seo: SeoCopy;
    title: string;
    intro: string;
    modelsTitle: string;
    models: { name: string; example: string; nextAction: string }[];
    labels: { example: string; nextAction: string };
    formTitle: string;
  };
  contact: {
    seo: SeoCopy;
    title: string;
    intro: string;
    directTitle: string;
    directText: string;
    practices: string[];
  };
}
