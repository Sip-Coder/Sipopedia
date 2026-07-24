import {
  FunctionsFetchError,
  FunctionsHttpError,
  FunctionsRelayError
} from "@supabase/supabase-js";
import { supabase } from "./supabase";

export type CheckoutSessionRequest = {
  planId: "pro";
  source: string;
  next: string | null;
};

export type CheckoutSessionResponse = {
  checkoutUrl: string;
  sessionId: string;
  mode: "payment" | "subscription";
  planCode: string;
  expiresAt: number | null;
};

function clientSafeErrorFromStatus(status: number): string {
  if (status === 400) {
    return "Checkout request was invalid. Re-select the plan and retry.";
  }
  if (status === 401) {
    return "Sign in is required before checkout.";
  }
  if (status === 502) {
    return "The checkout provider could not create a session. Assisted Enrollment is available.";
  }
  return "Could not start checkout. Assisted Enrollment is available.";
}

async function normalizeFunctionError(error: unknown): Promise<string> {
  if (error instanceof FunctionsHttpError) {
    const response = error.context;
    try {
      const payload = await response.clone().json();
      const payloadError = typeof payload?.error === "string" ? payload.error.trim() : "";
      if (payloadError) {
        if (payloadError.includes("STRIPE_SECRET_KEY") || payloadError.includes("STRIPE_PRICE_ID")) {
          return `${payloadError} Assisted Enrollment is available.`;
        }
        return payloadError;
      }
    } catch {
      // Fall through to status-based fallback.
    }
    return clientSafeErrorFromStatus(response.status);
  }

  if (error instanceof FunctionsRelayError) {
    return "Supabase relay error while creating checkout. Assisted Enrollment is available.";
  }

  if (error instanceof FunctionsFetchError) {
    return "Network error while creating checkout. Assisted Enrollment is available.";
  }

  return "Could not reach checkout service. Assisted Enrollment is available.";
}

export async function createCheckoutSession(input: CheckoutSessionRequest): Promise<CheckoutSessionResponse> {
  if (!supabase) {
    throw new Error("Supabase is not configured, so secure checkout sessions cannot start yet. Assisted Enrollment is available.");
  }

  const { data, error } = await supabase.functions.invoke<CheckoutSessionResponse>("create-checkout-session", {
    body: input
  });

  if (error) {
    throw new Error(await normalizeFunctionError(error));
  }

  if (!data?.checkoutUrl || !data.sessionId) {
    throw new Error("Checkout service returned an invalid session. Assisted Enrollment is available.");
  }

  return data;
}
