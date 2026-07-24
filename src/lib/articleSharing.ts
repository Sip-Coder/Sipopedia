import {
  FunctionsFetchError,
  FunctionsHttpError,
  FunctionsRelayError
} from "@supabase/supabase-js";
import { supabase } from "./supabase";
import type { ArticleSnapshot } from "./articleLibrary";

export type ShareArticleInput = {
  recipientName: string;
  recipientEmail: string;
  message: string;
  article: ArticleSnapshot;
};

type ShareArticleResponse = {
  delivered: boolean;
  requestId: string;
};

function statusMessage(status: number): string {
  if (status === 400) return "Check the recipient and article details, then try again.";
  if (status === 401) return "Sign in to share articles through Sip Studies.";
  if (status === 403) return "This article source cannot be shared through Sip Studies.";
  if (status === 429) return "You’ve shared several articles recently. Please try again later.";
  if (status === 503) return "Article sharing is being connected. Please try again later.";
  return "We couldn’t send the article. Your message is still here—try again.";
}

async function normalizeFunctionError(error: unknown): Promise<string> {
  if (error instanceof FunctionsHttpError) {
    const response = error.context;
    try {
      const payload = (await response.clone().json()) as { error?: unknown };
      if (typeof payload.error === "string" && payload.error.trim()) {
        if (response.status === 429) return statusMessage(429);
        if (response.status === 503) return statusMessage(503);
      }
    } catch {
      // Use the status-based message below.
    }
    return statusMessage(response.status);
  }
  if (error instanceof FunctionsRelayError || error instanceof FunctionsFetchError) {
    return "We couldn’t reach Sip Studies. Your message is still here—try again.";
  }
  return "We couldn’t send the article. Your message is still here—try again.";
}

export async function shareArticle(input: ShareArticleInput): Promise<ShareArticleResponse> {
  if (!supabase) throw new Error("Article sharing is not configured yet.");

  const { data, error } = await supabase.functions.invoke<ShareArticleResponse>("share-article", {
    body: {
      recipientName: input.recipientName.trim(),
      recipientEmail: input.recipientEmail.trim().toLowerCase(),
      message: input.message.trim(),
      article: {
        id: input.article.articleId,
        surface: input.article.surface,
        sourceId: input.article.sourceId,
        sourceName: input.article.sourceName,
        sourceCategory: input.article.sourceCategory,
        title: input.article.title,
        url: input.article.url,
        publishedAt: input.article.publishedAt,
        summary: input.article.summary
      }
    }
  });

  if (error) throw new Error(await normalizeFunctionError(error));
  if (!data?.delivered) throw new Error("Sip Studies did not confirm delivery. Please try again.");
  return data;
}
