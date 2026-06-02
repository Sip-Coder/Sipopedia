import "jsr:@supabase/functions-js/edge-runtime.d.ts";

type CheckoutPlanId = "pro" | "founding";

type CheckoutRequest = {
  planId?: string;
  source?: string;
  next?: string | null;
};

type AuthUser = {
  id: string;
  email?: string;
};

type PlanConfig = {
  planId: CheckoutPlanId;
  label: string;
  mode: "payment" | "subscription";
  priceEnvKey: string;
  planCode: string;
};

const STRIPE_API_VERSION = "2026-02-25.clover";
const ALLOWED_ORIGIN = Deno.env.get("ALLOWED_ORIGIN")?.trim() || "*";

const plans: Record<CheckoutPlanId, PlanConfig> = {
  pro: {
    planId: "pro",
    label: "Sip Studies Pro",
    mode: "subscription",
    priceEnvKey: "STRIPE_PRICE_ID_PRO",
    planCode: "pro_monthly"
  },
  founding: {
    planId: "founding",
    label: "Sip Studies Founding Cohort",
    mode: "payment",
    priceEnvKey: "STRIPE_PRICE_ID_FOUNDING",
    planCode: "founding_cohort"
  }
};

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Headers": "authorization,content-type,x-client-info,apikey",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };
}

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: corsHeaders()
  });
}

function cleanMetadataValue(value: string | null | undefined, fallback: string): string {
  const cleaned = (value ?? "").trim();
  return (cleaned || fallback).slice(0, 500);
}

function getBearerToken(request: Request): string {
  const authorization = request.headers.get("authorization") ?? "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() ?? "";
}

async function fetchUser(token: string): Promise<AuthUser | null> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")?.trim() ?? "";
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")?.trim() ?? "";
  if (!supabaseUrl || !supabaseAnonKey || !token) return null;

  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apikey: supabaseAnonKey
    }
  });

  if (!response.ok) return null;
  const payload = (await response.json()) as Partial<AuthUser>;
  if (!payload.id) return null;
  return {
    id: payload.id,
    email: typeof payload.email === "string" ? payload.email : undefined
  };
}

function appBaseUrl(request: Request): string {
  const configuredUrl =
    Deno.env.get("APP_URL")?.trim() ||
    Deno.env.get("SITE_URL")?.trim() ||
    Deno.env.get("PUBLIC_SITE_URL")?.trim();
  if (configuredUrl) return configuredUrl.replace(/\/+$/, "");

  const origin = request.headers.get("origin")?.trim();
  if (origin) return origin.replace(/\/+$/, "");

  return "http://localhost:5173";
}

function buildReturnUrl(baseUrl: string, route: "success" | "cancel", plan: PlanConfig, source: string, next: string | null) {
  const params = new URLSearchParams({
    plan: plan.planId,
    source
  });
  if (next) params.set("next", next);
  if (route === "success") {
    return `${baseUrl}/#success?${params.toString()}&session_id={CHECKOUT_SESSION_ID}`;
  }
  return `${baseUrl}/#cancel?${params.toString()}`;
}

async function createStripeCheckoutSession({
  request,
  plan,
  user,
  source,
  next
}: {
  request: Request;
  plan: PlanConfig;
  user: AuthUser;
  source: string;
  next: string | null;
}) {
  const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY")?.trim() ?? "";
  const priceId = Deno.env.get(plan.priceEnvKey)?.trim() ?? "";

  if (!stripeSecretKey) {
    return { status: 500, body: { error: "Checkout is missing STRIPE_SECRET_KEY." } };
  }
  if (!priceId) {
    return { status: 500, body: { error: `Checkout is missing ${plan.priceEnvKey}.` } };
  }

  const baseUrl = appBaseUrl(request);
  const metadata = {
    user_id: user.id,
    plan_id: plan.planId,
    plan_code: plan.planCode,
    source,
    next: next ?? "app/launch"
  };
  const form = new URLSearchParams({
    mode: plan.mode,
    client_reference_id: user.id,
    success_url: buildReturnUrl(baseUrl, "success", plan, source, next),
    cancel_url: buildReturnUrl(baseUrl, "cancel", plan, source, next),
    "line_items[0][price]": priceId,
    "line_items[0][quantity]": "1",
    allow_promotion_codes: "true",
    "metadata[user_id]": metadata.user_id,
    "metadata[plan_id]": metadata.plan_id,
    "metadata[plan_code]": metadata.plan_code,
    "metadata[source]": metadata.source,
    "metadata[next]": metadata.next
  });

  if (user.email) {
    form.set("customer_email", user.email);
  }

  if (plan.mode === "subscription") {
    form.set("subscription_data[metadata][user_id]", metadata.user_id);
    form.set("subscription_data[metadata][plan_id]", metadata.plan_id);
    form.set("subscription_data[metadata][plan_code]", metadata.plan_code);
    form.set("subscription_data[metadata][source]", metadata.source);
    form.set("subscription_data[metadata][next]", metadata.next);
  } else {
    form.set("payment_intent_data[metadata][user_id]", metadata.user_id);
    form.set("payment_intent_data[metadata][plan_id]", metadata.plan_id);
    form.set("payment_intent_data[metadata][plan_code]", metadata.plan_code);
    form.set("payment_intent_data[metadata][source]", metadata.source);
    form.set("payment_intent_data[metadata][next]", metadata.next);
  }

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripeSecretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Stripe-Version": STRIPE_API_VERSION
    },
    body: form
  });

  const payload = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  if (!response.ok) {
    const requestId = crypto.randomUUID();
    console.error("create-checkout-session stripe request failed", { requestId, status: response.status, payload });
    return { status: 502, body: { error: "Checkout provider rejected the session request.", requestId } };
  }

  const sessionUrl = typeof payload.url === "string" ? payload.url : "";
  const sessionId = typeof payload.id === "string" ? payload.id : "";
  if (!sessionUrl || !sessionId) {
    const requestId = crypto.randomUUID();
    console.error("create-checkout-session returned incomplete payload", { requestId, payload });
    return { status: 502, body: { error: "Checkout provider returned an incomplete session.", requestId } };
  }

  return {
    status: 200,
    body: {
      checkoutUrl: sessionUrl,
      sessionId,
      mode: plan.mode,
      planCode: plan.planCode,
      expiresAt: typeof payload.expires_at === "number" ? payload.expires_at : null
    }
  };
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders() });
  }

  if (request.method !== "POST") {
    return json(405, { error: "Method not allowed." });
  }

  const user = await fetchUser(getBearerToken(request));
  if (!user) {
    return json(401, { error: "Sign in is required before checkout." });
  }

  let payload: CheckoutRequest;
  try {
    payload = (await request.json()) as CheckoutRequest;
  } catch {
    return json(400, { error: "Invalid JSON body." });
  }

  const plan = plans[payload.planId as CheckoutPlanId];
  if (!plan) {
    return json(400, { error: "Unsupported checkout plan." });
  }

  const source = cleanMetadataValue(payload.source, "checkout");
  const next = payload.next === null || payload.next === undefined ? null : cleanMetadataValue(payload.next, "app/launch");
  const result = await createStripeCheckoutSession({ request, plan, user, source, next });
  return json(result.status, result.body);
});
