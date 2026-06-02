export type PlanId = "starter" | "pro" | "founding";

export type OnboardingIntent = {
  planId: PlanId;
  source: string;
  next: string | null;
  sessionId: string | null;
};

export const onboardingPlans: {
  id: PlanId;
  title: string;
  price: string;
  cadence: string;
  audience: string;
  checkoutMode: "preview" | "subscription" | "one-time";
  billingNote: string;
  features: string[];
}[] = [
  {
    id: "starter",
    title: "Starter",
    price: "$0",
    cadence: "forever",
    audience: "Evaluate the product",
    checkoutMode: "preview",
    billingNote: "No payment required. Starter keeps public previews available while paid rooms remain locked.",
    features: ["Marketing preview", "Account creation", "Upgrade path to Pro"]
  },
  {
    id: "pro",
    title: "Pro",
    price: "$10",
    cadence: "per month",
    audience: "Hospitality professionals",
    checkoutMode: "subscription",
    billingNote: "Billed in USD as a monthly subscription. Cancel or request billing help from the account dashboard.",
    features: ["Full Sip Academy mission access", "Quiz + terminology workflows", "Journal and tasting practice tools", "Priority support"]
  },
  {
    id: "founding",
    title: "Founding Cohort",
    price: "$1200",
    cadence: "one-time",
    audience: "Teams and serious learners",
    checkoutMode: "one-time",
    billingNote: "Billed in USD as a one-time cohort enrollment request. Scope and start date are confirmed before onboarding.",
    features: ["Everything in Pro", "4-6 week structured cohort track", "Founder office-hours and strategy reviews", "Early roadmap influence"]
  }
];

const validPlanIds = new Set<PlanId>(["starter", "pro", "founding"]);

export function normalizePlanId(value: string | null | undefined, fallback: PlanId = "pro"): PlanId {
  if (!value) return fallback;
  const cleaned = value.trim().toLowerCase();
  return validPlanIds.has(cleaned as PlanId) ? (cleaned as PlanId) : fallback;
}

export function getPlanById(planId: PlanId) {
  return onboardingPlans.find((plan) => plan.id === planId) ?? onboardingPlans[1];
}

export function readHashSearchParams(): URLSearchParams {
  if (typeof window === "undefined") return new URLSearchParams();
  const hash = window.location.hash.replace(/^#/, "");
  const queryIndex = hash.indexOf("?");
  return new URLSearchParams(queryIndex >= 0 ? hash.slice(queryIndex + 1) : "");
}

export function readOnboardingIntent(fallbackPlanId: PlanId = "pro"): OnboardingIntent {
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
