import {
  FunctionsFetchError,
  FunctionsHttpError,
  FunctionsRelayError
} from "@supabase/supabase-js";
import { supabase } from "./supabase";

export type TrialDurationDays = number;
export type TrialAccessResponse = {
  ok: true;
  action: "issue-trial" | "clear-trial" | "update-subscription-status";
  userId?: string;
  subscriptionId?: string;
  status?: string;
  trialEndsAt?: string | null;
  currentPeriodEnd?: string | null;
  promoCode?: string | null;
};

type TrialAccessRequest =
  | {
      action: "issue-trial";
      userId: string;
      trialDurationDays: TrialDurationDays;
      promoCode?: string;
    }
  | {
      action: "clear-trial";
      userId: string;
    }
  | {
      action: "update-subscription-status";
      subscriptionId: string;
      status: "trialing" | "active" | "past_due" | "unpaid" | "canceled" | "incomplete" | "incomplete_expired";
    };

function clientSafeErrorFromStatus(status: number): string {
  if (status === 400) return "That access request needs a quick correction before it can save.";
  if (status === 401) return "Sign in again before using admin access controls.";
  if (status === 403) return "Admin privileges are required for that action.";
  if (status === 404) return "That subscription or user record could not be found.";
  return "The admin access service could not finish that request.";
}

async function normalizeFunctionError(error: unknown): Promise<string> {
  if (error instanceof FunctionsHttpError) {
    const response = error.context;
    try {
      const payload = await response.clone().json();
      const payloadError = typeof payload?.error === "string" ? payload.error.trim() : "";
      if (payloadError) return payloadError;
    } catch {
      // Fall through to status-based fallback.
    }
    return clientSafeErrorFromStatus(response.status);
  }

  if (error instanceof FunctionsRelayError) {
    return "The admin access relay could not complete the request.";
  }

  if (error instanceof FunctionsFetchError) {
    return "Network trouble interrupted the admin access request.";
  }

  return "The admin access request failed before it could finish.";
}

async function invokeTrialAccess(input: TrialAccessRequest): Promise<TrialAccessResponse> {
  if (!supabase) {
    throw new Error("Supabase is not configured, so admin access controls are unavailable.");
  }

  const { data, error } = await supabase.functions.invoke<TrialAccessResponse>(
    "admin-trial-access",
    {
      body: input
    }
  );

  if (error) {
    throw new Error(await normalizeFunctionError(error));
  }

  if (!data?.ok) {
    throw new Error("The admin access service returned an invalid response.");
  }

  return data;
}

export async function issueTrialAccess(input: {
  userId: string;
  trialDurationDays: TrialDurationDays;
  promoCode?: string;
}): Promise<TrialAccessResponse> {
  return invokeTrialAccess({
    action: "issue-trial",
    ...input
  });
}

export async function clearTrialAccess(userId: string): Promise<TrialAccessResponse> {
  return invokeTrialAccess({
    action: "clear-trial",
    userId
  });
}

export async function updateManagedSubscriptionStatus(input: {
  subscriptionId: string;
  status: "trialing" | "active" | "past_due" | "unpaid" | "canceled" | "incomplete" | "incomplete_expired";
}): Promise<TrialAccessResponse> {
  return invokeTrialAccess({
    action: "update-subscription-status",
    ...input
  });
}
