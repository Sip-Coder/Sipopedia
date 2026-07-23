import "jsr:@supabase/functions-js@2.110.8/edge-runtime.d.ts";
import { createClient, type SupabaseClient } from "jsr:@supabase/supabase-js@2.110.8";

type AdminSupabaseClient = SupabaseClient<any>;

type BillingStatus =
  | "trialing"
  | "active"
  | "past_due"
  | "unpaid"
  | "canceled"
  | "incomplete"
  | "incomplete_expired";

type WebhookPayload = {
  user_id?: string;
  provider?: string;
  provider_customer_id?: string;
  provider_subscription_id?: string;
  plan_code?: string;
  status?: BillingStatus;
  current_period_end?: string | null;
  cancel_at_period_end?: boolean;
  metadata?: Record<string, unknown>;
};

type StripeEvent = {
  id?: string;
  type?: string;
  created?: number;
  livemode?: boolean;
  data?: {
    object?: Record<string, unknown>;
  };
};

const WEBHOOK_MAX_AGE_SECONDS = 300;
const ALLOWED_ORIGIN = Deno.env.get("ALLOWED_ORIGIN")?.trim() || "*";
const SUPPORTED_STRIPE_EVENTS = new Set([
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted"
]);

function responseHeaders() {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN
  };
}

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: responseHeaders()
  });
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let mismatch = 0;
  for (let index = 0; index < a.length; index += 1) {
    mismatch |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return mismatch === 0;
}

async function hmacSha256Hex(secret: string, input: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(input));
  return Array.from(new Uint8Array(signature))
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("");
}

async function verifySignedPayload(
  rawBody: string,
  secret: string,
  timestamp: string,
  signatures: string[]
): Promise<boolean> {
  const parsedTimestamp = Number.parseInt(timestamp, 10);
  if (!Number.isFinite(parsedTimestamp)) {
    return false;
  }

  const nowSeconds = Math.floor(Date.now() / 1000);
  if (Math.abs(nowSeconds - parsedTimestamp) > WEBHOOK_MAX_AGE_SECONDS) {
    return false;
  }

  const signedPayload = `${timestamp}.${rawBody}`;
  const expectedSignature = await hmacSha256Hex(secret, signedPayload);
  return signatures.some((signature) => timingSafeEqual(expectedSignature, signature.toLowerCase()));
}

async function verifyCustomWebhookSignature(
  rawBody: string,
  secret: string,
  timestamp: string,
  providedSignature: string
): Promise<boolean> {
  return verifySignedPayload(rawBody, secret, timestamp, [providedSignature]);
}

function parseStripeSignature(header: string): { timestamp: string; signatures: string[] } | null {
  const parts = header.split(",").map((part) => part.trim()).filter(Boolean);
  const timestamp = parts.find((part) => part.startsWith("t="))?.slice(2) ?? "";
  const signatures = parts
    .filter((part) => part.startsWith("v1="))
    .map((part) => part.slice(3))
    .filter(Boolean);
  if (!timestamp || signatures.length === 0) return null;
  return { timestamp, signatures };
}

async function verifyStripeSignature(rawBody: string, secret: string, signatureHeader: string): Promise<boolean> {
  const parsed = parseStripeSignature(signatureHeader);
  if (!parsed) return false;
  return verifySignedPayload(rawBody, secret, parsed.timestamp, parsed.signatures);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function stringValue(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function booleanValue(value: unknown): boolean {
  return value === true;
}

function numberValue(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function metadataFrom(value: unknown): Record<string, unknown> {
  return isRecord(value) ? value : {};
}

function isoFromUnixSeconds(value: unknown): string | null {
  const seconds = numberValue(value);
  if (!seconds) return null;
  return new Date(seconds * 1000).toISOString();
}

function stripeStatusToBillingStatus(value: unknown, fallback: BillingStatus = "incomplete"): BillingStatus {
  const status = stringValue(value);
  if (
    status === "trialing" ||
    status === "active" ||
    status === "past_due" ||
    status === "unpaid" ||
    status === "canceled" ||
    status === "incomplete" ||
    status === "incomplete_expired"
  ) {
    return status;
  }
  if (status === "paused") {
    return "unpaid";
  }
  return fallback;
}

function planCodeFromMetadata(metadata: Record<string, unknown>, fallback = "pro_monthly"): string {
  const planCode = stringValue(metadata.plan_code);
  if (planCode) return planCode;
  const planId = stringValue(metadata.plan_id);
  if (planId === "founding") return "founding_cohort";
  if (planId === "pro") return "pro_monthly";
  return fallback;
}

function sessionStatus(session: Record<string, unknown>): BillingStatus {
  const paymentStatus = stringValue(session.payment_status);
  if (paymentStatus === "paid" || paymentStatus === "no_payment_required") return "active";
  if (paymentStatus === "unpaid") return "incomplete";
  return "incomplete";
}

function subscriptionCurrentPeriodEnd(subscription: Record<string, unknown>): string | null {
  const rootPeriodEnd = isoFromUnixSeconds(subscription.current_period_end);
  if (rootPeriodEnd) return rootPeriodEnd;

  const items = isRecord(subscription.items) ? subscription.items : null;
  const data = Array.isArray(items?.data) ? items.data : [];
  const firstItem = data.find(isRecord);
  return firstItem ? isoFromUnixSeconds(firstItem.current_period_end) : null;
}

async function existingSubscriptionContext(
  supabase: AdminSupabaseClient,
  providerSubscriptionId: string
): Promise<{ user_id: string | null; plan_code: string | null }> {
  const { data, error } = await supabase
    .from("customer_subscriptions")
    .select("user_id,plan_code")
    .eq("provider", "stripe")
    .eq("provider_subscription_id", providerSubscriptionId)
    .maybeSingle();

  if (error) {
    console.error("billing-webhook existing subscription lookup failed", { error });
    return { user_id: null, plan_code: null };
  }

  return {
    user_id: typeof data?.user_id === "string" ? data.user_id : null,
    plan_code: typeof data?.plan_code === "string" ? data.plan_code : null
  };
}

async function stripeCheckoutSessionPayload(event: StripeEvent): Promise<WebhookPayload | null> {
  const session = event.data?.object;
  if (!isRecord(session)) return null;

  const metadata = metadataFrom(session.metadata);
  const userId = stringValue(metadata.user_id) ?? stringValue(session.client_reference_id);
  if (!userId) return null;

  const sessionId = stringValue(session.id);
  const subscriptionId = stringValue(session.subscription);
  const mode = stringValue(session.mode);
  const providerSubscriptionId = subscriptionId ?? sessionId;
  if (!providerSubscriptionId) return null;

  return {
    user_id: userId,
    provider: "stripe",
    provider_customer_id: stringValue(session.customer) ?? undefined,
    provider_subscription_id: providerSubscriptionId,
    plan_code: planCodeFromMetadata(metadata, mode === "payment" ? "founding_cohort" : "pro_monthly"),
    status: sessionStatus(session),
    current_period_end: null,
    cancel_at_period_end: false,
    metadata: {
      ...metadata,
      stripe_event_id: event.id,
      stripe_event_type: event.type,
      stripe_session_id: sessionId,
      stripe_subscription_id: subscriptionId,
      stripe_mode: mode,
      stripe_payment_status: stringValue(session.payment_status),
      stripe_livemode: event.livemode === true
    }
  };
}

async function stripeSubscriptionPayload(
  supabase: AdminSupabaseClient,
  event: StripeEvent
): Promise<WebhookPayload | null> {
  const subscription = event.data?.object;
  if (!isRecord(subscription)) return null;

  const subscriptionId = stringValue(subscription.id);
  if (!subscriptionId) return null;

  const metadata = metadataFrom(subscription.metadata);
  const existing = await existingSubscriptionContext(supabase, subscriptionId);
  const userId = stringValue(metadata.user_id) ?? existing.user_id;
  if (!userId) return null;

  const eventType = stringValue(event.type);
  const status = eventType === "customer.subscription.deleted"
    ? "canceled"
    : stripeStatusToBillingStatus(subscription.status);

  return {
    user_id: userId,
    provider: "stripe",
    provider_customer_id: stringValue(subscription.customer) ?? undefined,
    provider_subscription_id: subscriptionId,
    plan_code: planCodeFromMetadata(metadata, existing.plan_code ?? "pro_monthly"),
    status,
    current_period_end: subscriptionCurrentPeriodEnd(subscription),
    cancel_at_period_end: booleanValue(subscription.cancel_at_period_end),
    metadata: {
      ...metadata,
      stripe_event_id: event.id,
      stripe_event_type: event.type,
      stripe_subscription_id: subscriptionId,
      stripe_livemode: event.livemode === true
    }
  };
}

async function stripeEventPayload(
  supabase: AdminSupabaseClient,
  event: StripeEvent
): Promise<{ payload: WebhookPayload | null; ignored: boolean }> {
  const eventType = stringValue(event.type);
  if (!eventType || !SUPPORTED_STRIPE_EVENTS.has(eventType)) {
    return { payload: null, ignored: true };
  }

  if (eventType.startsWith("checkout.session.")) {
    return { payload: await stripeCheckoutSessionPayload(event), ignored: false };
  }

  if (eventType.startsWith("customer.subscription.")) {
    return { payload: await stripeSubscriptionPayload(supabase, event), ignored: false };
  }

  return { payload: null, ignored: true };
}

async function processBillingPayload({
  supabase,
  eventId,
  provider,
  payload
}: {
  supabase: AdminSupabaseClient;
  eventId: string;
  provider: string;
  payload: WebhookPayload;
}) {
  const requestId = crypto.randomUUID();
  const { data: existingEvent, error: checkReplayError } = await supabase
    .from("billing_webhook_events")
    .select("event_id")
    .eq("event_id", eventId)
    .maybeSingle();

  if (checkReplayError) {
    console.error("billing-webhook replay check failed", { requestId, error: checkReplayError });
    return json(500, { error: "Internal server error.", requestId });
  }

  if (existingEvent?.event_id) {
    return json(200, { ok: true, duplicate: true });
  }

  if (!payload.user_id) {
    return json(400, { error: "Missing user_id in webhook payload." });
  }

  const { error } = await supabase.from("customer_subscriptions").upsert(
    {
      user_id: payload.user_id,
      provider: payload.provider ?? provider,
      provider_customer_id: payload.provider_customer_id ?? null,
      provider_subscription_id: payload.provider_subscription_id ?? eventId,
      plan_code: payload.plan_code ?? "pro_monthly",
      status: payload.status ?? "incomplete",
      current_period_end: payload.current_period_end ?? null,
      cancel_at_period_end: payload.cancel_at_period_end ?? false,
      metadata: payload.metadata ?? {}
    },
    { onConflict: "provider,provider_subscription_id" }
  );

  if (error) {
    console.error("billing-webhook upsert failed", { requestId, error });
    return json(500, { error: "Internal server error.", requestId });
  }

  const { error: recordEventError } = await supabase.from("billing_webhook_events").insert({
    event_id: eventId,
    provider
  });

  if (recordEventError) {
    if (recordEventError.code === "23505") {
      return json(200, { ok: true, duplicate: true });
    }
    console.error("billing-webhook event record failed", { requestId, error: recordEventError });
    return json(500, { error: "Internal server error.", requestId });
  }

  return json(200, { ok: true });
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers":
          "content-type,stripe-signature,x-billing-webhook-id,x-billing-webhook-timestamp,x-billing-webhook-signature"
      }
    });
  }

  if (request.method !== "POST") {
    return json(405, { error: "Method not allowed." });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    return json(500, { error: "Server is missing Supabase service credentials." });
  }

  const rawBody = await request.text();
  const stripeSignature = request.headers.get("stripe-signature")?.trim() ?? "";
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  if (stripeSignature) {
    const secret = Deno.env.get("STRIPE_WEBHOOK_SECRET")?.trim() ?? "";
    if (!secret) {
      return json(401, { error: "Stripe webhook secret is not configured." });
    }

    const signatureValid = await verifyStripeSignature(rawBody, secret, stripeSignature);
    if (!signatureValid) {
      return json(401, { error: "Unauthorized Stripe webhook call." });
    }

    let event: StripeEvent;
    try {
      event = JSON.parse(rawBody) as StripeEvent;
    } catch {
      return json(400, { error: "Invalid Stripe JSON body." });
    }

    const eventId = stringValue(event.id);
    if (!eventId) {
      return json(400, { error: "Missing Stripe event id." });
    }

    const { payload, ignored } = await stripeEventPayload(supabase, event);
    if (ignored) {
      return json(200, { ok: true, ignored: true });
    }
    if (!payload) {
      return json(400, { error: "Stripe event is missing required billing metadata." });
    }

    return processBillingPayload({ supabase, eventId, provider: "stripe", payload });
  }

  const secret = Deno.env.get("BILLING_WEBHOOK_SECRET")?.trim() ?? "";
  const eventId = request.headers.get("x-billing-webhook-id")?.trim() ?? "";
  const timestamp = request.headers.get("x-billing-webhook-timestamp")?.trim() ?? "";
  const signature = request.headers.get("x-billing-webhook-signature")?.trim() ?? "";
  if (!secret || !eventId || !timestamp || !signature) {
    return json(401, { error: "Unauthorized webhook call." });
  }

  const signatureValid = await verifyCustomWebhookSignature(rawBody, secret, timestamp, signature);
  if (!signatureValid) {
    return json(401, { error: "Unauthorized webhook call." });
  }

  let payload: WebhookPayload;
  try {
    payload = JSON.parse(rawBody) as WebhookPayload;
  } catch {
    return json(400, { error: "Invalid JSON body." });
  }

  return processBillingPayload({
    supabase,
    eventId,
    provider: payload.provider ?? "stripe",
    payload
  });
});
