import { afterEach, describe, expect, it, vi } from "vitest";
import { deliver, destinationFor } from "@/lib/forms/deliver";
import { confirmationEmail } from "@/lib/forms/confirmation";

const sub = {
  type: "service" as const,
  reference: "SV-TEST1234",
  locale: "pt",
  data: { name: "Ana", email: "ana@empresa.ao", need: "<b>Site</b>" },
  consentAt: "2026-10-01T00:00:00.000Z",
};
const base = { NODE_ENV: "production", RESEND_API_KEY: "re_x", FORM_FROM: "Site <w@d.com>", FORM_TO_SERVICE: "a@d.com" };

function mockFetch(handler: (url: string, body: Record<string, unknown>) => number) {
  const calls: { url: string; body: Record<string, unknown>; headers: Record<string, string> }[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init: RequestInit) => {
      const body = JSON.parse(String(init.body));
      calls.push({ url, body, headers: init.headers as Record<string, string> });
      return new Response("{}", { status: handler(url, body) });
    }),
  );
  return calls;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});
vi.spyOn(console, "error").mockImplementation(() => {});
vi.spyOn(console, "info").mockImplementation(() => {});

describe("destinations", () => {
  it("waiting lists fall back to the general inbox; lists are comma-separated", () => {
    expect(destinationFor("notify", { FORM_TO_GENERAL: "g@d.com" })).toEqual(["g@d.com"]);
    expect(destinationFor("interest", { FORM_TO_WAITLIST: "w@d.com, x@d.com", FORM_TO_GENERAL: "g@d.com" })).toEqual(["w@d.com", "x@d.com"]);
    expect(destinationFor("service", {})).toEqual([]);
  });
});

describe("deliver", () => {
  it("rejects in production when nothing is configured, and alerts", async () => {
    const calls = mockFetch(() => 200);
    const r = await deliver(sub, { NODE_ENV: "production", ALERT_WEBHOOK_URL: "https://hooks.test/a" });
    expect(r).toEqual({ ok: false, reason: "not_configured" });
    expect(calls).toHaveLength(1);
    expect(calls[0].body.text).toContain("SV-TEST1234");
    expect(JSON.stringify(calls[0].body)).not.toContain("Ana");
  });

  it("log mode never calls the network", async () => {
    const calls = mockFetch(() => 200);
    expect(await deliver(sub, { ...base, FORM_DELIVERY: "log" })).toEqual({ ok: true, confirmationSent: false });
    expect(calls).toHaveLength(0);
  });

  it("emails the team with reply-to, and sends a content-free confirmation when enabled", async () => {
    const calls = mockFetch(() => 200);
    const r = await deliver(sub, { ...base, FORM_CONFIRMATION: "on" });
    expect(r).toEqual({ ok: true, confirmationSent: true });
    const [team, confirm] = calls;
    expect(team.body).toMatchObject({ to: ["a@d.com"], reply_to: "ana@empresa.ao" });
    expect(confirm.body.to).toEqual(["ana@empresa.ao"]);
    expect(String(confirm.body.text)).toContain("SV-TEST1234");
    expect(String(confirm.body.text)).not.toContain("Ana");
    expect(String(confirm.body.text)).not.toContain("Site</b>");
  });

  it("succeeds through the record webhook when email fails, and alerts", async () => {
    const calls = mockFetch((url) => (url.includes("resend") ? 500 : 200));
    const env = { ...base, FORM_WEBHOOK_URL: "https://rec.test/in", FORM_WEBHOOK_SECRET: "s3", ALERT_WEBHOOK_URL: "https://hooks.test/a", FORM_CONFIRMATION: "on" };
    const r = await deliver(sub, env);
    expect(r).toEqual({ ok: true, confirmationSent: false });
    const record = calls.find((c) => c.url.includes("rec.test"))!;
    expect(record.headers.Authorization).toBe("Bearer s3");
    expect(record.body).toMatchObject({ reference: "SV-TEST1234", form: "service" });
    expect(calls.some((c) => c.url.includes("hooks.test"))).toBe(true);
    expect(calls.filter((c) => c.url.includes("resend"))).toHaveLength(1); // no confirmation after a failed team email
  });

  it("fails when every durable channel fails", async () => {
    mockFetch(() => 503);
    expect(await deliver(sub, { ...base, FORM_WEBHOOK_URL: "https://rec.test/in" })).toEqual({ ok: false, reason: "provider_error" });
  });
});

describe("record receivers that always answer 200", () => {
  it('treats {"ok": false} as a failure', async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response('{"ok":false,"error":"forbidden"}', { status: 200 })));
    expect(await deliver(sub, { NODE_ENV: "production", FORM_WEBHOOK_URL: "https://script.test/exec?key=x" })).toEqual({
      ok: false,
      reason: "provider_error",
    });
  });
});

describe("confirmation email", () => {
  it("is localized", () => {
    expect(confirmationEmail("en", "SV-1").subject).toContain("received");
    expect(confirmationEmail("pt", "SV-1").text).toContain("dias úteis");
  });
});
