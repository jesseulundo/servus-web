/**
 * Provider-agnostic analytics events (blueprint: measure start, error and completion
 * of forms; consent-based tool). No provider is wired yet — TODO(pm): choose a
 * consent-based tool (e.g. Plausible, Matomo, or GA4 with consent mode).
 * A provider adapter only needs to set `window.servusAnalytics = { track }`
 * after consent is granted; until then events are dropped.
 */
export type AnalyticsEvent =
  | { name: "form_start"; form: string }
  | { name: "form_error"; form: string; reason: string }
  | { name: "form_submit"; form: string }
  | { name: "cta_click"; id: string }
  | { name: "product_outbound"; product: string };

declare global {
  interface Window {
    servusAnalytics?: { track: (e: AnalyticsEvent) => void };
  }
}

export function track(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV !== "production") console.debug("[analytics]", event);
  window.servusAnalytics?.track(event);
}
