import { supabase } from "./supabase";
import {
  FunctionsFetchError,
  FunctionsHttpError,
  FunctionsRelayError
} from "@supabase/supabase-js";

export type AiProvider = "openai" | "anthropic" | "google";

type AskAiInput = {
  provider: AiProvider;
  prompt: string;
};

type AskAiOutput = {
  provider: AiProvider;
  model: string;
  text: string;
};

function clientSafeErrorFromStatus(status: number): string {
  if (status === 400) {
    return "Request was invalid. Please review your prompt and retry.";
  }
  if (status === 401) {
    return "Sign in is required.";
  }
  if (status === 429) {
    return "Rate limit reached. Please retry shortly.";
  }
  return "AI request failed. Please try again.";
}

async function normalizeFunctionError(error: unknown): Promise<string> {
  if (error instanceof FunctionsHttpError) {
    const response = error.context;
    try {
      const payload = await response.clone().json();
      const payloadError = typeof payload?.error === "string" ? payload.error.trim() : "";
      const payloadMessage = typeof payload?.message === "string" ? payload.message.trim() : "";
      const combined = `${payloadError} ${payloadMessage}`.toLowerCase();
      if (combined.includes("insufficient_quota")) {
        return "insufficient_quota";
      }
    } catch {
      // Fall through to status-based message.
    }
    return clientSafeErrorFromStatus(response.status);
  }

  if (error instanceof FunctionsRelayError) {
    return "Supabase relay error while calling ai-router. Try again in a moment.";
  }

  if (error instanceof FunctionsFetchError) {
    return "Network error calling ai-router. Check internet connection and retry.";
  }

  return "Could not reach ai-router. Please try again.";
}

export async function askAi(input: AskAiInput): Promise<AskAiOutput> {
  if (!supabase) {
    throw new Error("Supabase is not connected yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
  }

  const { data, error } = await supabase.functions.invoke<AskAiOutput>("ai-router", {
    body: input
  });

  if (error) {
    const message = await normalizeFunctionError(error);

    if (message.includes("insufficient_quota")) {
      throw new Error("OpenAI quota exceeded. Add billing or use another provider key in Supabase secrets.");
    }

    throw new Error(message);
  }

  if (!data?.text) {
    throw new Error("AI router returned no text.");
  }

  return data;
}
