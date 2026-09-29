import { z } from "zod";
import { FORMS, type FieldDef, type FormType } from "./definitions";

/**
 * Error codes returned to the client. The client maps them to localized
 * messages (messages/<locale>.json → forms.errors.<code>), so the API never returns
 * user-facing text and stays language-neutral.
 */
export type FieldErrorCode = "required" | "too_long" | "invalid_email" | "invalid_option" | "consent_required";

// Pragmatic email check; deliverability is confirmed by the reply, not by regex.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function fieldSchema(field: FieldDef): z.ZodType {
  switch (field.kind) {
    case "text":
    case "textarea":
    case "email": {
      let s = z.string({ error: "required" }).trim().max(field.max ?? 200, { error: "too_long" });
      if (field.kind === "email") {
        const email = (field.required ? s.min(1, { error: "required" }) : s).regex(EMAIL_RE, { error: "invalid_email" });
        return field.required ? email : z.union([z.literal(""), email]).default("");
      }
      if (field.required) s = s.min(1, { error: "required" });
      return field.required ? s : s.default("");
    }
    case "select": {
      const options = field.options as readonly [string, ...string[]];
      const choice = z.enum(options, {
        error: (issue) => (issue.input === undefined || issue.input === "" ? "required" : "invalid_option"),
      });
      return field.required ? choice : z.union([z.literal(""), choice]).default("");
    }
    case "checkboxes": {
      const options = field.options as readonly [string, ...string[]];
      const list = z.array(z.enum(options, { error: "invalid_option" }), { error: "required" }).max(options.length);
      return field.required ? list.min(1, { error: "required" }) : list.default([]);
    }
  }
}

export function buildSchema(type: FormType) {
  const shape: Record<string, z.ZodType> = {};
  for (const field of FORMS[type].fields) shape[field.name] = fieldSchema(field);
  shape.consent = z.literal(true, { error: "consent_required" });
  // Unknown keys are stripped, never forwarded.
  return z.object(shape);
}

export type FieldErrors = Partial<Record<string, FieldErrorCode>>;

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "_form");
    if (!out[key]) out[key] = (issue.message as FieldErrorCode) || "required";
  }
  return out;
}
