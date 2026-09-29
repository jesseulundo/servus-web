import { describe, expect, it } from "vitest";
import { buildSchema, toFieldErrors } from "@/lib/forms/schema";
import { checkSpam, HONEYPOT_FIELD } from "@/lib/forms/spam";
import { MemoryStore, createRateLimiter } from "@/lib/forms/rate-limit";

describe("form schemas", () => {
  it("accepts a valid service request and strips unknown keys", () => {
    const r = buildSchema("service").safeParse({ name: "Ana", email: "ana@empresa.ao", need: "Site novo", consent: true, isAdmin: true });
    expect(r.success).toBe(true);
    expect(r.data).not.toHaveProperty("isAdmin");
    expect(r.data).toMatchObject({ company: "", timeline: "", budget: "" });
  });

  it("returns language-neutral error codes", () => {
    const r = buildSchema("general").safeParse({ name: " ", email: "x", subject: "a".repeat(500), message: "", consent: false });
    expect(r.success).toBe(false);
    expect(toFieldErrors(r.error!)).toEqual({
      name: "required",
      email: "invalid_email",
      subject: "too_long",
      message: "required",
      consent: "consent_required",
    });
  });

  it("reports required (not invalid email) for an empty required email", () => {
    const r = buildSchema("general").safeParse({ name: "A", email: "", subject: "s", message: "m", consent: true });
    expect(toFieldErrors(r.error!).email).toBe("required");
  });

  it("rejects options outside the allowed list", () => {
    const r = buildSchema("demo").safeParse({ name: "A", email: "a@b.co", company: "C", companySize: "huge", modules: ["payroll"], consent: true });
    expect(toFieldErrors(r.error!)).toMatchObject({ companySize: "invalid_option", modules: "invalid_option" });
  });

  it("requires at least one module for an RH demo", () => {
    const r = buildSchema("demo").safeParse({ name: "A", email: "a@b.co", company: "C", companySize: "1-10", modules: [], consent: true });
    expect(toFieldErrors(r.error!).modules).toBe("required");
  });

  it("allows empty optional selects", () => {
    const r = buildSchema("partnership").safeParse({
      name: "A", email: "a@b.co", company: "C", country: "JP", partnershipType: "distribution", description: "d", timeline: "", budget: "", consent: true,
    });
    expect(r.success).toBe(true);
  });
});

describe("spam checks", () => {
  it("flags the honeypot", () => expect(checkSpam({ [HONEYPOT_FIELD]: "http://x", elapsedMs: 9000 })).toBe("honeypot"));
  it("flags instant submissions", () => expect(checkSpam({ elapsedMs: 300 })).toBe("too_fast"));
  it("flags missing timing", () => expect(checkSpam({})).toBe("too_fast"));
  it("passes normal submissions", () => expect(checkSpam({ [HONEYPOT_FIELD]: "", elapsedMs: 12000 })).toBe("ok"));
});

describe("rate limiter", () => {
  it("blocks after the limit and resets after the window", () => {
    let now = 0;
    const limit = createRateLimiter({ limit: 2, windowMs: 1000, store: new MemoryStore(() => now) });
    expect(limit("k").allowed).toBe(true);
    expect(limit("k").allowed).toBe(true);
    expect(limit("k").allowed).toBe(false);
    expect(limit("other").allowed).toBe(true);
    now = 1001;
    expect(limit("k").allowed).toBe(true);
  });
});
