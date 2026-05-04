import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

type WebhookPayload = {
  user_id?: string;
  provider?: string;
  provider_customer_id?: string;
  provider_subscription_id?: string;
  plan_code?: string;
  status?: "trialing" | "active" | "past_due" | "unpaid" | "canceled" | "incomplete" | "incomplete_expired";
  current_period_end?: string | null;
  cancel_at_period_end?: boolean;
  metadata?: Record<string, unknown>;
};

const WEBHOOK_MAX_AGE_SECONDS = 300;
const ALLOWED_ORIGIN = Deno.env.get("ALLOWED_ORIGIN")?.trim() || "*";

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

async function verifyWebhookSignature(
  rawBody: string,
  secret: string,
  timestamp: string,
  providedSignature: string
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
  return timingSafeEqual(expectedSignature, providedSignature.toLowerCase());
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers":
          "content-type,x-billing-webhook-id,x-billing-webhook-timestamp,x-billing-webhook-signature"
      }
    });
  }

  if (request.method !== "POST") {
    return json(405, { error: "Method not allowed." });
  }

  const secret = Deno.env.get("BILLING_WEBHOOK_SECRET")?.trim() ?? "";
  const eventId = request.headers.get("x-billing-webhook-id")?.trim() ?? "";
  const timestamp = request.headers.get("x-billing-webhook-timestamp")?.trim() ?? "";
  const signature = request.headers.get("x-billing-webhook-signature")?.trim() ?? "";
  if (!secret || !eventId || !timestamp || !signature) {
    return json(401, { error: "Unauthorized webhook call." });
  }

  const rawBody = await request.text();
  const signatureValid = await verifyWebhookSignature(rawBody, secret, timestamp, signature);
  if (!signatureValid) {
    return json(401, { error: "Unauthorized webhook call." });
  }

  let payload: WebhookPayload;
  try {
    payload = JSON.parse(rawBody) as WebhookPayload;
  } catch {
    return json(400, { error: "Invalid JSON body." });
  }

  if (!payload.user_id) {
    return json(400, { error: "Missing user_id in webhook payload." });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    return json(500, { error: "Server is missing Supabase service credentials." });
  }

  const requestId = crypto.randomUUID();
  const supabase = createClient(supabaseUrl, serviceRoleKey);
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
    return json(409, { error: "Duplicate webhook delivery rejected." });
  }

  const { error } = await supabase.from("customer_subscriptions").upsert(
    {
      user_id: payload.user_id,
      provider: payload.provider ?? "stripe",
      provider_customer_id: payload.provider_customer_id ?? null,
      provider_subscription_id: payload.provider_subscription_id ?? null,
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
    provider: payload.provider ?? "stripe"
  });

  if (recordEventError) {
    console.error("billing-webhook event record failed", { requestId, error: recordEventError });
    return json(500, { error: "Internal server error.", requestId });
  }

  return json(200, { ok: true });
});
