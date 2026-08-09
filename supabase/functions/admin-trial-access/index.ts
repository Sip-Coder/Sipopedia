import { createClient, type SupabaseClient } from "npm:@supabase/supabase-js";

type AdminSupabaseClient = SupabaseClient<any>;

type ManagedSubscriptionStatus =
  | "trialing"
  | "active"
  | "past_due"
  | "unpaid"
  | "canceled"
  | "incomplete"
  | "incomplete_expired";

type AdminTrialAccessRequest =
  | {
      action: "issue-trial";
      userId?: string;
      trialDurationDays?: number;
      promoCode?: string;
    }
  | {
      action: "clear-trial";
      userId?: string;
    }
  | {
      action: "update-subscription-status";
      subscriptionId?: string;
      status?: ManagedSubscriptionStatus;
    };

const CANONICAL_APP_ORIGIN = "https://sipopedia.com";
const MAX_REQUEST_BYTES = 8_000;
const MIN_TRIAL_DAYS = 1;
const MAX_TRIAL_DAYS = 90;
const managedStatuses = new Set<ManagedSubscriptionStatus>([
  "trialing",
  "active",
  "past_due",
  "unpaid",
  "canceled",
  "incomplete",
  "incomplete_expired"
]);
const entitlingManagedStatuses = new Set<ManagedSubscriptionStatus>(["trialing", "active"]);

const builtInAllowedOrigins = [
  CANONICAL_APP_ORIGIN,
  "https://www.sipopedia.com",
  "https://sipopedia-02.replit.app",
  "http://localhost:3000",
  "http://localhost:5000",
  "http://localhost:5100",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5000",
  "http://127.0.0.1:5100",
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
  const allowed = new Set<string>(builtInAllowedOrigins);
  const configured = [Deno.env.get("ALLOWED_ORIGINS"), Deno.env.get("ALLOWED_ORIGIN")]
    .filter((value): value is string => Boolean(value?.trim()))
    .flatMap((value) => value.split(","));

  for (const candidate of configured) {
    const normalized = normalizeOrigin(candidate);
    if (normalized) allowed.add(normalized);
  }

  return allowed;
}

const allowedOrigins = configuredAllowedOrigins();

function allowedRequestOrigin(request: Request): string {
  const origin = request.headers.get("origin");
  if (!origin) return CANONICAL_APP_ORIGIN;
  const normalized = normalizeOrigin(origin);
  if (!normalized || !allowedOrigins.has(normalized)) return CANONICAL_APP_ORIGIN;
  return normalized;
}

function responseHeaders(request: Request) {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": allowedRequestOrigin(request),
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin"
  };
}

function json(request: Request, status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: responseHeaders(request)
  });
}

function isUuid(value: unknown): value is string {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function isManagedStatus(value: unknown): value is ManagedSubscriptionStatus {
  return typeof value === "string" && managedStatuses.has(value as ManagedSubscriptionStatus);
}

function cleanPromoCode(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim().slice(0, 48);
  return /^[a-z0-9_-]+$/i.test(normalized) ? normalized : null;
}

function trialEndsAt(days: number): string {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() + days);
  return end.toISOString();
}

function managedPeriodEnd(status: ManagedSubscriptionStatus, currentPeriodEnd: string | null): string | null {
  if (!entitlingManagedStatuses.has(status)) return currentPeriodEnd;

  const currentEndMs = currentPeriodEnd ? new Date(currentPeriodEnd).getTime() : Number.NaN;
  if (!Number.isNaN(currentEndMs) && currentEndMs >= Date.now()) return currentPeriodEnd;

  return trialEndsAt(30);
}

async function requestJson(request: Request): Promise<AdminTrialAccessRequest | null> {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_REQUEST_BYTES) return null;
  try {
    const payload = await request.json();
    return payload && typeof payload === "object" ? payload as AdminTrialAccessRequest : null;
  } catch {
    return null;
  }
}

function bearerToken(request: Request): string | null {
  const header = request.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(header);
  return match?.[1]?.trim() || null;
}

async function requireAdminUserId(request: Request, supabase: AdminSupabaseClient): Promise<string | null> {
  const token = bearerToken(request);
  if (!token) return null;

  const { data: authData, error: authError } = await supabase.auth.getUser(token);
  const userId = authData.user?.id;
  if (authError || !userId) return null;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single<{ role: string | null }>();

  if (profileError || profile?.role !== "admin") return null;
  return userId;
}

async function issueTrial(
  request: Request,
  supabase: AdminSupabaseClient,
  adminUserId: string,
  payload: Extract<AdminTrialAccessRequest, { action: "issue-trial" }>
): Promise<Response> {
  if (!isUuid(payload.userId)) return json(request, 400, { error: "A valid user id is required." });

  const trialDurationDays = Number(payload.trialDurationDays);
  if (!Number.isInteger(trialDurationDays) || trialDurationDays < MIN_TRIAL_DAYS || trialDurationDays > MAX_TRIAL_DAYS) {
    return json(request, 400, { error: `Trial duration must be ${MIN_TRIAL_DAYS}-${MAX_TRIAL_DAYS} days.` });
  }

  const periodEnd = trialEndsAt(trialDurationDays);
  const promoCode = cleanPromoCode(payload.promoCode);
  const { error } = await supabase.from("customer_subscriptions").upsert(
    {
      user_id: payload.userId,
      provider: "admin-trial",
      provider_customer_id: payload.userId,
      provider_subscription_id: `admin-trial:${payload.userId}`,
      plan_code: promoCode ? `trial_${promoCode}` : "trial",
      status: "trialing",
      current_period_end: periodEnd,
      cancel_at_period_end: true,
      metadata: {
        source: "admin-trial-access",
        admin_user_id: adminUserId,
        promo_code: promoCode,
        trial_duration_days: trialDurationDays,
        updated_at: new Date().toISOString()
      }
    },
    { onConflict: "provider,provider_subscription_id" }
  );

  if (error) return json(request, 500, { error: "Trial access could not be saved." });
  return json(request, 200, {
    ok: true,
    action: "issue-trial",
    userId: payload.userId,
    status: "trialing",
    trialEndsAt: periodEnd,
    promoCode
  });
}

async function clearTrial(
  request: Request,
  supabase: AdminSupabaseClient,
  adminUserId: string,
  payload: Extract<AdminTrialAccessRequest, { action: "clear-trial" }>
): Promise<Response> {
  if (!isUuid(payload.userId)) return json(request, 400, { error: "A valid user id is required." });

  const { error } = await supabase
    .from("customer_subscriptions")
    .update({
      status: "canceled",
      current_period_end: new Date().toISOString(),
      cancel_at_period_end: true,
      metadata: {
        source: "admin-trial-access",
        admin_user_id: adminUserId,
        cleared_at: new Date().toISOString()
      }
    })
    .eq("provider", "admin-trial")
    .eq("provider_subscription_id", `admin-trial:${payload.userId}`);

  if (error) return json(request, 500, { error: "Trial access could not be cleared." });
  return json(request, 200, {
    ok: true,
    action: "clear-trial",
    userId: payload.userId,
    status: "canceled",
    trialEndsAt: null
  });
}

async function updateSubscriptionStatus(
  request: Request,
  supabase: AdminSupabaseClient,
  adminUserId: string,
  payload: Extract<AdminTrialAccessRequest, { action: "update-subscription-status" }>
): Promise<Response> {
  if (!isUuid(payload.subscriptionId)) return json(request, 400, { error: "A valid subscription id is required." });
  if (!isManagedStatus(payload.status)) return json(request, 400, { error: "A valid subscription status is required." });

  const { data: currentSubscription, error: lookupError } = await supabase
    .from("customer_subscriptions")
    .select("current_period_end,metadata")
    .eq("id", payload.subscriptionId)
    .single<{ current_period_end: string | null; metadata: Record<string, unknown> | null }>();

  if (lookupError) {
    return json(request, lookupError.code === "PGRST116" ? 404 : 500, { error: "Subscription status could not be loaded." });
  }

  const currentPeriodEnd = managedPeriodEnd(payload.status, currentSubscription.current_period_end);
  const metadata = {
    ...(currentSubscription.metadata ?? {}),
    admin_status_update: {
      admin_user_id: adminUserId,
      status: payload.status,
      updated_at: new Date().toISOString()
    }
  };

  const { data, error } = await supabase
    .from("customer_subscriptions")
    .update({
      status: payload.status,
      current_period_end: currentPeriodEnd,
      metadata
    })
    .eq("id", payload.subscriptionId)
    .select("id,current_period_end")
    .single<{ id: string; current_period_end: string | null }>();

  if (error) return json(request, error.code === "PGRST116" ? 404 : 500, { error: "Subscription status could not be saved." });
  return json(request, 200, {
    ok: true,
    action: "update-subscription-status",
    subscriptionId: data.id,
    status: payload.status,
    currentPeriodEnd: data.current_period_end
  });
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: responseHeaders(request) });
  }

  if (request.method !== "POST") {
    return json(request, 405, { error: "Method not allowed." });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    return json(request, 500, { error: "Admin access service is not configured." });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const adminUserId = await requireAdminUserId(request, supabase);
  if (!adminUserId) {
    return json(request, 403, { error: "Admin privileges are required for that action." });
  }

  const payload = await requestJson(request);
  if (!payload?.action) {
    return json(request, 400, { error: "A valid admin access action is required." });
  }

  if (payload.action === "issue-trial") {
    return issueTrial(request, supabase, adminUserId, payload);
  }

  if (payload.action === "clear-trial") {
    return clearTrial(request, supabase, adminUserId, payload);
  }

  if (payload.action === "update-subscription-status") {
    return updateSubscriptionStatus(request, supabase, adminUserId, payload);
  }

  return json(request, 400, { error: "Unsupported admin access action." });
});
