import { describe, expect, it } from "vitest";
import { routing } from "@/i18n/routing";
import { FORMS, FORM_TYPES, OPTIONS } from "@/lib/forms/definitions";
import pt from "../messages/pt.json";
import en from "../messages/en.json";

const messages: Record<string, unknown> = { pt, en };

function keys(obj: unknown, prefix = ""): string[] {
  if (typeof obj !== "object" || obj === null) return [prefix];
  return Object.entries(obj).flatMap(([k, v]) => keys(v, prefix ? `${prefix}.${k}` : k));
}
function get(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((o, k) => (o as Record<string, unknown> | undefined)?.[k], obj);
}

describe("messages", () => {
  const reference = keys(pt).sort();

  it.each(routing.locales)("%s has exactly the same keys as pt", (locale) => {
    expect(messages[locale], `messages/${locale}.json missing`).toBeDefined();
    expect(keys(messages[locale]).sort()).toEqual(reference);
  });

  it.each(routing.locales)("%s labels every form type, field and option", (locale) => {
    const m = messages[locale];
    for (const type of FORM_TYPES) {
      expect(get(m, `forms.types.${type}`), type).toBeTypeOf("string");
      expect(get(m, `forms.intros.${type}`), type).toBeTypeOf("string");
      for (const f of FORMS[type].fields) {
        expect(get(m, `forms.fields.${f.name}`), f.name).toBeTypeOf("string");
        for (const o of f.options ?? []) expect(get(m, `forms.options.${f.name}.${o}`), `${f.name}.${o}`).toBeTypeOf("string");
      }
    }
    expect(Object.keys(OPTIONS).length).toBeGreaterThan(0);
  });
});
