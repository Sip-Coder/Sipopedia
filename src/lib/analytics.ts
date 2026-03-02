type AnalyticsPayload = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

function normalizePayload(payload: AnalyticsPayload): AnalyticsPayload {
  return Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined));
}

export function trackEvent(event: string, payload: AnalyticsPayload = {}): void {
  if (typeof window === "undefined") return;

  const safePayload = normalizePayload(payload);
  const eventPayload = {
    event,
    ...safePayload,
    app: "sip-studies",
    ts: new Date().toISOString()
  };

  try {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(eventPayload);
    }
    if (typeof window.gtag === "function") {
      window.gtag("event", event, safePayload);
    }
  } catch {
    // Never throw from analytics.
  }
}
