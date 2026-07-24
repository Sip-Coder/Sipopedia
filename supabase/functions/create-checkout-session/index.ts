type CheckoutPlanId = "pro";

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
  mode: "subscription";
  priceEnvKey: "STRIPE_PRICE_ID_PRO";
  planCode: "pro_monthly";
};

const STRIPE_API_VERSION = "2026-02-25.clover";
const CANONICAL_APP_ORIGIN = "https://sipopedia.com";
const BUILT_IN_ALLOWED_ORIGINS = [
  CANONICAL_APP_ORIGIN,
  "https://www.sipopedia.com",
  "https://sipopedia-02.replit.app",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5173"
] as const;

function normalizeOrigin(value: string): string | null {
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (url.username || url.password || url.pathname !== "/" || url.search || url.hash) return null;
    return url.origin;
  } catch {
    return null;
  }
}

function configuredAllowedOrigins(): ReadonlySet<string> {
  const allowed = new Set<string>(BUILT_IN_ALLOWED_ORIGINS);
  const configured = [Deno.env.get("ALLOWED_ORIGINS"), Deno.env.get("ALLOWED_ORIGIN")]
    .filter((value): value is string => Boolean(value?.trim()))
    .flatMap((value) => value.split(","));

  for (const candidate of configured) {
    const normalized = normalizeOrigin(candidate);
    if (normalized) {
      allowed.add(normalized);
    } else {
      console.warn("create-checkout-session ignored an invalid configured origin");
    }
  }

  return allowed;
}

const ALLOWED_ORIGINS = configuredAllowedOrigins();

const plans: Record<CheckoutPlanId, PlanConfig> = {
  pro: {
    planId: "pro",
    label: "Sip Studies Pro",
    mode: "subscription",
    priceEnvKey: "STRIPE_PRICE_ID_PRO",
    planCode: "pro_monthly"
  }
};

function allowedRequestOrigin(request: Request): string | null {
  const origin = request.headers.get("origin");
  if (!origin) return null;
  const normalized = normalizeOrigin(origin);
  return normalized && ALLOWED_ORIGINS.has(normalized) ? normalized : null;
}

function hasDisallowedRequestOrigin(request: Request): boolean {
  return request.headers.has("origin") && allowedRequestOrigin(request) === null;
}

function corsHeaders(request: Request): Record<string, string> {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": "authorization,content-type,x-client-info,apikey",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
    Vary: "Origin"
  };
  const origin = allowedRequestOrigin(request);
  if (origin) headers["Access-Control-Allow-Origin"] = origin;
  return headers;
}

function json(request: Request, status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: corsHeaders(request)
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
  if (configuredUrl) {
    const normalized = normalizeOrigin(configuredUrl);
    if (!normalized || !ALLOWED_ORIGINS.has(normalized)) {
      throw new Error("The configured app URL is not in the checkout origin allowlist.");
    }
    return normalized;
  }

  const origin = allowedRequestOrigin(request);
  if (origin) return origin;

  return CANONICAL_APP_ORIGIN;
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

  let baseUrl: string;
  try {
    baseUrl = appBaseUrl(request);
  } catch (error) {
    const requestId = crypto.randomUUID();
    console.error("create-checkout-session rejected an unsafe return URL configuration", {
      requestId,
      error: error instanceof Error ? error.message : String(error)
    });
    return {
      status: 500,
      body: { error: "Checkout return URL is not configured safely.", requestId }
    };
  }
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

  form.set("subscription_data[metadata][user_id]", metadata.user_id);
  form.set("subscription_data[metadata][plan_id]", metadata.plan_id);
  form.set("subscription_data[metadata][plan_code]", metadata.plan_code);
  form.set("subscription_data[metadata][source]", metadata.source);
  form.set("subscription_data[metadata][next]", metadata.next);

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
  if (hasDisallowedRequestOrigin(request)) {
    return json(request, 403, { error: "Origin is not allowed." });
  }

  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders(request) });
  }

  if (request.method !== "POST") {
    return json(request, 405, { error: "Method not allowed." });
  }

  const user = await fetchUser(getBearerToken(request));
  if (!user) {
    return json(request, 401, { error: "Sign in is required before checkout." });
  }

  let payload: CheckoutRequest;
  try {
    payload = (await request.json()) as CheckoutRequest;
  } catch {
    return json(request, 400, { error: "Invalid JSON body." });
  }

  const plan = plans[payload.planId as CheckoutPlanId];
  if (!plan) {
    return json(request, 400, { error: "Unsupported checkout plan." });
  }

  const source = cleanMetadataValue(payload.source, "checkout");
  const next = payload.next === null || payload.next === undefined ? null : cleanMetadataValue(payload.next, "app/launch");
  const result = await createStripeCheckoutSession({ request, plan, user, source, next });
  return json(request, result.status, result.body);
});
