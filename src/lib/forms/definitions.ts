/**
 * Single source of truth for every website form (blueprint: "Formulários separados").
 * The UI renderer and the server-side zod schema are both generated from these
 * definitions, so adding a field is a one-line change here plus its label in messages/*.json.
 *
 * Blueprint rule: no documents or sensitive data in a first contact — so there are
 * no file uploads and no ID/financial fields.
 */

export const FORM_TYPES = ["service", "partnership", "demo", "general", "support", "interest", "notify"] as const;
export type FormType = (typeof FORM_TYPES)[number];

export type FieldKind = "text" | "email" | "textarea" | "select" | "checkboxes";

export interface FieldDef {
  name: FieldName;
  kind: FieldKind;
  required: boolean;
  /** Max characters (text-like fields). */
  max?: number;
  options?: readonly string[];
  autoComplete?: string;
  /** Layout hint: half-width on ≥ sm screens. */
  half?: boolean;
}

export const OPTIONS = {
  timeline: ["asap", "1-3m", "3-6m", "6m+", "unsure"],
  budget: ["lt5k", "5-15k", "15-50k", "50k+", "undisclosed"],
  partnershipType: ["development", "joint-product", "distribution", "integration", "campaign"],
  companySize: ["1-10", "11-50", "51-200", "201-1000", "1000+"],
  modules: ["employees", "attendance", "recruitment", "documents-ocr", "workflows", "reports"],
  /** Products with live support. Add "audio-cleaner" when it launches. */
  product: ["trumuno-footy"],
  /** Products people can follow before launch ("Quero saber mais"). */
  interestProduct: ["audio-cleaner", "moambeira", "rh"],
  supportCategory: ["account", "bug", "billing", "feature", "other"],
  interestRole: ["buyer", "traveller", "logistics"],
} as const;

export type FieldName =
  | "name"
  | "email"
  | "company"
  | "country"
  | "need"
  | "timeline"
  | "budget"
  | "partnershipType"
  | "related"
  | "description"
  | "companySize"
  | "modules"
  | "availability"
  | "subject"
  | "message"
  | "product"
  | "account"
  | "supportCategory"
  | "interestRole"
  | "interestProduct";

const name: FieldDef = { name: "name", kind: "text", required: true, max: 120, autoComplete: "name", half: true };
const email: FieldDef = { name: "email", kind: "email", required: true, max: 254, autoComplete: "email", half: true };
const company = (required: boolean): FieldDef => ({
  name: "company",
  kind: "text",
  required,
  max: 160,
  autoComplete: "organization",
  half: true,
});
const country = (required: boolean): FieldDef => ({
  name: "country",
  kind: "text",
  required,
  max: 80,
  autoComplete: "country-name",
  half: true,
});
const timeline: FieldDef = { name: "timeline", kind: "select", required: false, options: OPTIONS.timeline, half: true };
const budget: FieldDef = { name: "budget", kind: "select", required: false, options: OPTIONS.budget, half: true };

export interface FormDef {
  fields: readonly FieldDef[];
  /** Env var holding the destination inbox (blueprint column "Destino"). Comma-separate several addresses. */
  destinationEnv: string;
  /** Used when destinationEnv is empty (e.g. waiting lists fall back to the general inbox). */
  fallbackEnv?: string;
}

export const FORMS: Record<FormType, FormDef> = {
  // Pedido de serviço → Equipa comercial
  service: {
    destinationEnv: "FORM_TO_SERVICE",
    fields: [name, email, company(false), country(false), { name: "need", kind: "textarea", required: true, max: 3000 }, timeline, budget],
  },
  // Parceria → Responsável de parcerias
  partnership: {
    destinationEnv: "FORM_TO_PARTNERSHIP",
    fields: [
      name,
      { ...email, autoComplete: "work email" },
      company(true),
      country(true),
      { name: "partnershipType", kind: "select", required: true, options: OPTIONS.partnershipType, half: true },
      { name: "related", kind: "text", required: false, max: 160, half: true },
      { name: "description", kind: "textarea", required: true, max: 3000 },
      timeline,
      budget,
    ],
  },
  // Demonstração RH → Produto RH
  demo: {
    destinationEnv: "FORM_TO_DEMO",
    fields: [
      name,
      email,
      company(true),
      { name: "companySize", kind: "select", required: true, options: OPTIONS.companySize, half: true },
      { name: "modules", kind: "checkboxes", required: true, options: OPTIONS.modules },
      { name: "availability", kind: "text", required: false, max: 200 },
    ],
  },
  // Contacto geral → Caixa geral
  general: {
    destinationEnv: "FORM_TO_GENERAL",
    fields: [name, email, { name: "subject", kind: "text", required: true, max: 160 }, { name: "message", kind: "textarea", required: true, max: 3000 }],
  },
  // Suporte de produto → Fila de suporte
  support: {
    destinationEnv: "FORM_TO_SUPPORT",
    fields: [
      name,
      email,
      { name: "product", kind: "select", required: true, options: OPTIONS.product, half: true },
      { name: "supportCategory", kind: "select", required: true, options: OPTIONS.supportCategory, half: true },
      { name: "account", kind: "text", required: false, max: 120 },
      { name: "description", kind: "textarea", required: true, max: 3000 },
    ],
  },
  // Product updates for products in development ("Quero saber mais")
  notify: {
    destinationEnv: "FORM_TO_WAITLIST",
    fallbackEnv: "FORM_TO_GENERAL",
    fields: [name, email, { name: "interestProduct", kind: "select", required: true, options: OPTIONS.interestProduct }],
  },
  // MOAMBEIRA interest list ("Entrar na lista de interesse")
  interest: {
    destinationEnv: "FORM_TO_WAITLIST",
    fallbackEnv: "FORM_TO_GENERAL",
    fields: [name, email, country(true), { name: "interestRole", kind: "select", required: true, options: OPTIONS.interestRole, half: true }],
  },
};

export function isFormType(value: unknown): value is FormType {
  return typeof value === "string" && (FORM_TYPES as readonly string[]).includes(value);
}
