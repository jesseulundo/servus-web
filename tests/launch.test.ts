import { describe, expect, it } from "vitest";
import { isIndexingEnabled } from "@/config/indexing";
import { legalStatus, getLegal } from "@/content/legal";

describe("indexing guard", () => {
  it("is off unless SITE_INDEXING=on, and never on Vercel previews", () => {
    expect(isIndexingEnabled({})).toBe(false);
    expect(isIndexingEnabled({ SITE_INDEXING: "on" })).toBe(true);
    expect(isIndexingEnabled({ SITE_INDEXING: "on", VERCEL_ENV: "production" })).toBe(true);
    expect(isIndexingEnabled({ SITE_INDEXING: "on", VERCEL_ENV: "preview" })).toBe(false);
  });
});

describe("legal pages", () => {
  it("PT and EN have the same structure", () => {
    for (const doc of Object.keys(legalStatus) as (keyof typeof legalStatus)[]) {
      const pt = getLegal(doc, "pt");
      const en = getLegal(doc, "en");
      expect(pt.sections.length).toBe(en.sections.length);
      pt.sections.forEach((s, i) => expect(s.blocks.map((b) => typeof b)).toEqual(en.sections[i].blocks.map((b) => typeof b)));
    }
  });

  it("shows visible placeholders while legal details are missing", () => {
    const text = JSON.stringify(getLegal("privacy", "pt"));
    expect(text).toContain("[A CONFIRMAR");
    expect(text).not.toContain("servus.example");
  });
});
