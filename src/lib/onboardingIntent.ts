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
    audience: "Beverage learners and hospitality professionals",
    checkoutMode: "subscription",
    billingNote: "Billed in USD as a monthly subscription. Cancel or request billing help from the account dashboard.",
    features: ["Full Sip Academy mission access", "Quiz + terminology workflows", "Journal and tasting practice tools", "Priority support"]
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
