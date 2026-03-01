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

async function normalizeFunctionError(error: unknown): Promise<string> {
  if (error instanceof FunctionsHttpError) {
    const response = error.context;
    try {
      const payload = await response.clone().json();
      if (typeof payload?.error === "string" && payload.error.trim().length > 0) {
        return payload.error.trim();
      }
      if (typeof payload?.message === "string" && payload.message.trim().length > 0) {
        return payload.message.trim();
      }
    } catch {
      // Fall through to text parse.
    }

    try {
      const raw = (await response.clone().text()).trim();
      if (raw.length > 0) {
        return raw;
      }
    } catch {
      // Ignore parse errors and return default below.
    }

    return `Edge Function failed (${response.status}).`;
  }

  if (error instanceof FunctionsRelayError) {
    return "Supabase relay error while calling ai-router. Try again in a moment.";
  }

  if (error instanceof FunctionsFetchError) {
    return "Network error calling ai-router. Check internet connection and retry.";
  }

  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  return "Could not reach ai-router.";
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
