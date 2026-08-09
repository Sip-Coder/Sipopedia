export type PlanId = "starter" | "pro" | "founding";
export type PurchasablePlanId = "pro";

export type OnboardingIntent = {
  planId: PurchasablePlanId;
  source: string;
  next: string | null;
  sessionId: string | null;
};

export const onboardingPlans: {
  id: PurchasablePlanId;
  title: string;
  price: string;
  cadence: string;
  audience: string;
  checkoutMode: "subscription";
  billingNote: string;
  features: string[];
}[] = [
  {
    id: "pro",
    title: "Sip Studies Membership",
    price: "$10",
    cadence: "per month",
    audience: "Curious learners, hospitality staff, and visual credential prep",
    checkoutMode: "subscription",
    billingNote: "Billed in USD as a monthly subscription. Cancel or request billing help from the account dashboard.",
    features: [
      "Visual academy routes from source to service",
      "Sipopedia terms, maps, recipes, and reference lists",
      "Tasting practice, quiz loops, and guided notes",
      "Billing, support, and assisted enrollment help"
    ]
  }
];

export function normalizePlanId(
  _value: string | null | undefined,
  fallback: PurchasablePlanId = "pro"
): PurchasablePlanId {
  return fallback;
}

export function getPlanById(planId: PlanId) {
  return onboardingPlans.find((plan) => plan.id === planId) ?? onboardingPlans[0];
}

export function readHashSearchParams(): URLSearchParams {
  if (typeof window === "undefined") return new URLSearchParams();
  const hash = window.location.hash.replace(/^#/, "");
  const queryIndex = hash.indexOf("?");
  return new URLSearchParams(queryIndex >= 0 ? hash.slice(queryIndex + 1) : "");
}

export function readOnboardingIntent(fallbackPlanId: PurchasablePlanId = "pro"): OnboardingIntent {
  const params = readHashSearchParams();
  return {
    planId: normalizePlanId(params.get("plan"), fallbackPlanId),
    source: params.get("source")?.trim() || "direct",
    next: params.get("next")?.trim() || null,
    sessionId: params.get("session_id")?.trim() || null
  };
}

export function buildOnboardingRoute(
  route: string,
  intent: {
    planId?: PlanId;
    source?: string;
    next?: string | null;
  } = {}
): string {
  const params = new URLSearchParams();
  if (intent.planId) params.set("plan", intent.planId);
  if (intent.source) params.set("source", intent.source);
  if (intent.next) params.set("next", intent.next);
  const query = params.toString();
  return query ? `${route}?${query}` : route;
}

export function buildMembershipSupportRoute({
  source,
  next,
  sessionId,
  urgency = "soon",
  lane = "enrollment",
  billingStatus
}: {
  source: string;
  next?: string | null;
  sessionId?: string | null;
  urgency?: "normal" | "soon" | "urgent";
  lane?: "enrollment" | "billing";
  billingStatus?: string | null;
}): string {
  const params = new URLSearchParams({
    lane,
    source,
    urgency
  });
  if (next) params.set("next", next);
  if (sessionId) params.set("session_id", sessionId);
  if (billingStatus) params.set("billing_status", billingStatus);
  return `support?${params.toString()}`;
}
