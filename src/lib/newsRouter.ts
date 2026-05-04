import { supabase } from "./supabase";
import { FunctionsFetchError, FunctionsHttpError, FunctionsRelayError } from "@supabase/supabase-js";

export type NewsRouterSource =
  | "wset"
  | "beer-connoisseur"
  | "robert-parker"
  | "whisky-advocate"
  | "wine-spectator"
  | "connoisseur-magazine"
  | "wine-enthusiast"
  | "decanter"
  | "usbg"
  | "iba"
  | "cicerone"
  | "sca-events"
  | "sca-news"
  | "barista-guild"
  | "world-of-coffee"
  | "brewers-association"
  | "tea-masters"
  | "sipstudies"
  | "sipstudies-blog"
  | "ttb-news"
  | "inao-news"
  | "eu-agri-news"
  | "masaf-docg"
  | "vinosdo-news"
  | "vdp-news"
  | "openai-news"
  | "deepmind-news"
  | "anthropic-news"
  | "microsoft-ai-news"
  | "xai-news"
  | "nvidia-news"
  | "amd-news"
  | "ai-daily-brief"
  | "venturebeat-ai-news"
  | "verge-ai-news"
  | "lex-fridman-ai-tech"
  | "mit-tech-review-ai-news"
  | "caltech-ai-news";

export type GuildNewsItem = {
  id: string;
  title: string;
  url: string;
  publishedAt: string;
  summary: string;
  imageUrl?: string;
  translatedFrom?: string;
};

type GuildNewsRequest = {
  source: NewsRouterSource;
};

type GuildNewsResponse = {
  source: NewsRouterSource;
  fetchedAt: string;
  items: GuildNewsItem[];
};

function clientSafeErrorFromStatus(status: number): string {
  if (status === 400) {
    return "News request was invalid.";
  }
  if (status === 401) {
    return "Sign in is required to load live news.";
  }
  if (status === 429) {
    return "News requests are temporarily rate-limited. Please retry shortly.";
  }
  return "News request failed. Please try again.";
}

async function normalizeFunctionError(error: unknown): Promise<string> {
  if (error instanceof FunctionsHttpError) {
    const response = error.context;
    try {
      const payload = await response.clone().json();
      const payloadError = typeof payload?.error === "string" ? payload.error.trim() : "";
      if (payloadError.length > 0) {
        const lowered = payloadError.toLowerCase();
        if (lowered.includes("sign in") || lowered.includes("authentication")) {
          return clientSafeErrorFromStatus(401);
        }
        if (lowered.includes("rate limit")) {
          return clientSafeErrorFromStatus(429);
        }
      }
    } catch {
      // Fall through to status-based fallback.
    }
    return clientSafeErrorFromStatus(response.status);
  }

  if (error instanceof FunctionsRelayError) {
    return "Supabase relay error while calling news-router.";
  }

  if (error instanceof FunctionsFetchError) {
    return "Network error calling news-router.";
  }

  return "Could not reach news-router.";
}

export async function fetchGuildNews(source: NewsRouterSource): Promise<GuildNewsItem[]> {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase.functions.invoke<GuildNewsResponse>("news-router", {
    body: { source } satisfies GuildNewsRequest
  });

  if (error) {
    throw new Error(await normalizeFunctionError(error));
  }

  if (!data || !Array.isArray(data.items)) {
    throw new Error("news-router returned an invalid payload.");
  }

  return data.items;
}
