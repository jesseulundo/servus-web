import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { routing } from "@/i18n/routing";
import { PRODUCT_SLUGS, WORK_SLUGS } from "@/content/catalog";

// next/image static imports aren't available in plain Node, so read the registry as text.
const registry = fs.readFileSync(path.resolve(import.meta.dirname, "../src/content/media.ts"), "utf8");
const imagesDir = path.resolve(import.meta.dirname, "../src/assets/images");

describe("media registry", () => {
  it("maps every product and case study to an image", () => {
    for (const slug of [...PRODUCT_SLUGS, ...WORK_SLUGS]) expect(registry, slug).toMatch(new RegExp(`["']?${slug}["']?:\\s*"\\w+"`));
  });

  it("gives every image alt text in every locale", () => {
    const entries = registry.split(/\n  (?=\w+: \{\n    src:)/).slice(1);
    expect(entries.length).toBeGreaterThan(0);
    for (const e of entries) for (const l of routing.locales) expect(e, e.slice(0, 40)).toMatch(new RegExp(`\\n\\s+${l}: "[^"]{10,}"`));
  });

  // Visual guide V2 manifest: generated images must carry the "Imagem conceptual" label.
  it.each(["servusHero", "audioCleaner", "moambeira", "rh", "fenixAcademy", "urolundo", "partnership"])(
    "%s stays marked as conceptual",
    (key) => expect(registry).toMatch(new RegExp(`${key}: \\{\\n\\s+src: \\w+,\\n\\s+kind: "conceptual"`)),
  );

  it("keeps every web image under 300 KB", () => {
    for (const f of fs.readdirSync(imagesDir)) expect(fs.statSync(path.join(imagesDir, f)).size, f).toBeLessThan(300 * 1024);
  });
});
