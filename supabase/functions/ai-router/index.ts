import {
  buildDefaultOperationsInput,
  runOperationsOrchestrator
} from "../../../server/hyperagents/operations/operationsOrchestrator.ts";
import type {
  OperationsEvaluationInput,
  OperationsEvaluationOutput
} from "../../../server/hyperagents/operations/types.ts";
import { TerminologyMemoryStore } from "../../../server/hyperagents/terminology/terminologyMemoryStore.ts";
import { TerminologyOrchestrator } from "../../../server/hyperagents/terminology/terminologyOrchestrator.ts";
import type {
  BeverageType,
  TerminologyEntry,
  TerminologyRunBatchInput
} from "../../../server/hyperagents/terminology/types.ts";

type Provider = "openai" | "anthropic" | "google";

type RouterRequest = {
  provider?: Provider;
  prompt?: string;
  system?: string;
  maxTokens?: number;
};

type RouterResponse = {
  provider: Provider;
  model: string;
  text: string;
};

type OperationsRunRequest = Partial<OperationsEvaluationInput>;
type TerminologyRunRequest = Partial<TerminologyRunBatchInput>;

const MAX_PROMPT_LENGTH = 4_000;
const MAX_SYSTEM_LENGTH = 1_200;
const FETCH_TIMEOUT_MS = 15_000;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
};

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}

async function fetchWithTimeout(input: string, init: RequestInit): Promise<Response> {
  return await fetch(input, { ...init, signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
}

function extractOpenAiText(data: any): string {
  if (typeof data?.output_text === "string" && data.output_text.length > 0) {
    return data.output_text;
  }

  const fromOutput = Array.isArray(data?.output)
    ? data.output
        .flatMap((item: any) => item?.content ?? [])
        .filter((part: any) => part?.type === "output_text")
        .map((part: any) => part?.text)
        .filter(Boolean)
        .join("\n")
    : "";

  return fromOutput || "No text returned from OpenAI.";
}

function extractAnthropicText(data: any): string {
  if (!Array.isArray(data?.content)) {
    return "No text returned from Anthropic.";
  }
  return data.content
    .filter((part: any) => part?.type === "text")
    .map((part: any) => part?.text)
    .filter(Boolean)
    .join("\n");
}

function extractGoogleText(data: any): string {
  const parts = data?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) {
    return "No text returned from Google.";
  }
  return parts.map((part: any) => part?.text).filter(Boolean).join("\n");
}

function getBearerToken(request: Request): string | null {
  const auth = request.headers.get("authorization");
  if (!auth?.toLowerCase().startsWith("bearer ")) {
    return null;
  }
  const token = auth.slice(7).trim();
  return token.length > 0 ? token : null;
}

async function verifyAuthenticatedUser(request: Request): Promise<boolean> {
  const token = getBearerToken(request);
  if (!token) {
    return false;
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")?.trim() ?? "";
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")?.trim() ?? "";
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("ai-router auth verification is not configured.");
    return false;
  }

  try {
    const response = await fetchWithTimeout(`${supabaseUrl}/auth/v1/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: supabaseAnonKey
      }
    });
    if (!response.ok) {
      return false;
    }
    const data = (await response.json()) as { id?: string };
    return typeof data.id === "string" && data.id.length > 0;
  } catch {
    return false;
  }
}

function getSupabaseServiceConfig(): { supabaseUrl: string; serviceRoleKey: string } {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")?.trim() ?? "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")?.trim() ?? "";
  return { supabaseUrl, serviceRoleKey };
}

function isOperationsRunPath(pathname: string): boolean {
  return pathname.endsWith("/api/hyper/operations/runEvaluation");
}

function isOperationsDashboardPath(pathname: string): boolean {
  return pathname.endsWith("/api/hyper/operations/dashboard");
}

function isTerminologyRunBatchPath(pathname: string): boolean {
  return pathname.endsWith("/api/hyper/terminology/runBatch");
}

function isTerminologyStatusPath(pathname: string): boolean {
  return pathname.endsWith("/api/hyper/terminology/status");
}

function isBeverageType(value: unknown): value is BeverageType {
  return (
    value === "wine" ||
    value === "beer" ||
    value === "spirits" ||
    value === "coffee" ||
    value === "tea" ||
    value === "water" ||
    value === "fermented_beverages"
  );
}

function parseLetter(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length === 0) return null;
  return trimmed.charAt(0).toUpperCase();
}

function parseBatchSize(value: unknown): number | null {
  if (typeof value !== "number" || Number.isNaN(value)) return null;
  const rounded = Math.floor(value);
  if (rounded < 1 || rounded > 100) return null;
  return rounded;
}

function parseExternalEntries(value: unknown): TerminologyEntry[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const parsed: TerminologyEntry[] = [];

  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const entry = item as Record<string, unknown>;
    if (typeof entry.term !== "string" || entry.term.trim().length === 0) continue;
    if (typeof entry.definition !== "string" || entry.definition.trim().length === 0) continue;
    if (typeof entry.category !== "string" || entry.category.trim().length === 0) continue;
    if (typeof entry.exam_relevance !== "string" || entry.exam_relevance.trim().length === 0) continue;
    if (typeof entry.sensory_context !== "string" || entry.sensory_context.trim().length === 0) continue;
    if (typeof entry.production_context !== "string" || entry.production_context.trim().length === 0) continue;
    if (!Array.isArray(entry.related_terms) || !Array.isArray(entry.mla_citations)) continue;

    parsed.push({
      term: entry.term,
      definition: entry.definition,
      category: entry.category,
      related_terms: entry.related_terms.filter((v): v is string => typeof v === "string"),
      exam_relevance: entry.exam_relevance,
      sensory_context: entry.sensory_context,
      production_context: entry.production_context,
      mla_citations: entry.mla_citations.filter((v): v is string => typeof v === "string")
    });
  }

  return parsed;
}

function buildTerminologyInput(body: TerminologyRunRequest | null | undefined): TerminologyRunBatchInput | null {
  const letter = parseLetter(body?.letter);
  const batchSize = parseBatchSize(body?.batchSize);
  if (!letter || !batchSize || !isBeverageType(body?.beverageType)) {
    return null;
  }

  return {
    letter,
    beverageType: body.beverageType,
    batchSize,
    scoreThreshold: typeof body.scoreThreshold === "number" ? body.scoreThreshold : undefined,
    externalEntries: parseExternalEntries(body?.externalEntries)
  };
}

function createTerminologyOrchestrator(): TerminologyOrchestrator {
  const { supabaseUrl, serviceRoleKey } = getSupabaseServiceConfig();
  const memoryStore = new TerminologyMemoryStore({ supabaseUrl, serviceRoleKey, fetchImpl: fetch });
  return new TerminologyOrchestrator(memoryStore);
}

function buildOperationsInput(body: OperationsRunRequest | null | undefined): OperationsEvaluationInput {
  const defaults = buildDefaultOperationsInput();

  return {
    articleMetrics: Array.isArray(body?.articleMetrics) ? body.articleMetrics : defaults.articleMetrics,
    terminologyMetrics: Array.isArray(body?.terminologyMetrics)
      ? body.terminologyMetrics
      : defaults.terminologyMetrics,
    pricingMetrics: Array.isArray(body?.pricingMetrics) ? body.pricingMetrics : defaults.pricingMetrics,
    funnelMetrics: Array.isArray(body?.funnelMetrics) ? body.funnelMetrics : defaults.funnelMetrics,
    sponsorMetrics: Array.isArray(body?.sponsorMetrics) ? body.sponsorMetrics : defaults.sponsorMetrics
  };
}

async function persistOperationsLearningMemory(payload: {
  input: OperationsEvaluationInput;
  output: OperationsEvaluationOutput;
}): Promise<void> {
  const { supabaseUrl, serviceRoleKey } = getSupabaseServiceConfig();
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase service-role config for operations persistence.");
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/operations_learning_memory`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify([
      {
        evaluation_payload: payload.input,
        pricing_recommendations: payload.output.pricingRecommendations,
        content_roi_rankings: payload.output.contentRoiRankings,
        funnel_bottleneck_detection: payload.output.funnelBottleneckDetection,
        dashboard_payload: payload.output.dashboard
      }
    ])
  });

  if (!response.ok) {
    throw new Error(`Failed to persist operations memory (${response.status}).`);
  }
}

async function fetchLatestDashboardFromMemory(): Promise<Record<string, unknown> | null> {
  const { supabaseUrl, serviceRoleKey } = getSupabaseServiceConfig();
  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/operations_learning_memory?select=dashboard_payload,created_at&order=created_at.desc&limit=1`,
    {
      method: "GET",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`
      }
    }
  );

  if (!response.ok) {
    return null;
  }

  const rows = (await response.json()) as Array<{ dashboard_payload?: Record<string, unknown> }>;
  const first = rows[0];
  if (!first?.dashboard_payload || typeof first.dashboard_payload !== "object") {
    return null;
  }
  return first.dashboard_payload;
}

async function callOpenAi(prompt: string, system: string, maxTokens: number): Promise<RouterResponse> {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY secret.");
  }

  const model = Deno.env.get("OPENAI_MODEL") ?? "gpt-4.1-mini";
  const response = await fetchWithTimeout("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: system }]
        },
        {
          role: "user",
          content: [{ type: "input_text", text: prompt }]
        }
      ],
      max_output_tokens: maxTokens
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed (${response.status}).`);
  }

  const data = await response.json();
  return { provider: "openai", model, text: extractOpenAiText(data) };
}

async function callAnthropic(prompt: string, system: string, maxTokens: number): Promise<RouterResponse> {
  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) {
    throw new Error("Missing ANTHROPIC_API_KEY secret.");
  }

  const model = Deno.env.get("ANTHROPIC_MODEL") ?? "claude-3-5-sonnet-latest";
  const response = await fetchWithTimeout("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      system,
      messages: [{ role: "user", content: prompt }]
    })
  });

  if (!response.ok) {
    throw new Error(`Anthropic request failed (${response.status}).`);
  }

  const data = await response.json();
  return { provider: "anthropic", model, text: extractAnthropicText(data) };
}

async function callGoogle(prompt: string, system: string): Promise<RouterResponse> {
  const apiKey = Deno.env.get("GOOGLE_AI_API_KEY");
  if (!apiKey) {
    throw new Error("Missing GOOGLE_AI_API_KEY secret.");
  }

  const model = Deno.env.get("GOOGLE_MODEL") ?? "gemini-2.0-flash";
  const response = await fetchWithTimeout(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  if (!response.ok) {
    throw new Error(`Google request failed (${response.status}).`);
  }

  const data = await response.json();
  return { provider: "google", model, text: extractGoogleText(data) };
}

Deno.serve(async (request) => {
  const pathname = new URL(request.url).pathname;

  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (!(await verifyAuthenticatedUser(request))) {
      return json(401, { error: "Sign in is required to use ai-router." });
    }

    if (isOperationsRunPath(pathname)) {
      if (request.method !== "POST") {
        return json(405, { error: "Use POST only." });
      }
      const body = (await request.json().catch(() => ({}))) as OperationsRunRequest;
      const input = buildOperationsInput(body);
      const output = await runOperationsOrchestrator(input, persistOperationsLearningMemory);

      return json(200, {
        pricingRecommendations: output.pricingRecommendations,
        contentRoiRankings: output.contentRoiRankings,
        funnelBottleneckDetection: output.funnelBottleneckDetection,
        sponsorFitScores: output.sponsorFitScores,
        dashboard: output.dashboard,
        generatedAt: output.generatedAt
      });
    }

    if (isOperationsDashboardPath(pathname)) {
      if (request.method !== "GET") {
        return json(405, { error: "Use GET only." });
      }

      const latestDashboard = await fetchLatestDashboardFromMemory();
      if (!latestDashboard) {
        const bootstrapOutput = await runOperationsOrchestrator(
          buildDefaultOperationsInput(),
          persistOperationsLearningMemory
        );
        return json(200, {
          membershipConversionTrends: bootstrapOutput.dashboard.membershipConversionTrends,
          topPerformingContentCategories: bootstrapOutput.dashboard.topPerformingContentCategories,
          engagementScoreIndex: bootstrapOutput.dashboard.engagementScoreIndex,
          generatedAt: bootstrapOutput.dashboard.generatedAt
        });
      }

      return json(200, {
        membershipConversionTrends:
          (latestDashboard.membershipConversionTrends as unknown[]) ?? [],
        topPerformingContentCategories:
          (latestDashboard.topPerformingContentCategories as unknown[]) ?? [],
        engagementScoreIndex: latestDashboard.engagementScoreIndex ?? 0,
        generatedAt: latestDashboard.generatedAt ?? new Date().toISOString()
      });
    }

    if (isTerminologyRunBatchPath(pathname)) {
      if (request.method !== "POST") {
        return json(405, { error: "Use POST only." });
      }

      const body = (await request.json().catch(() => ({}))) as TerminologyRunRequest;
      const input = buildTerminologyInput(body);
      if (!input) {
        return json(400, {
          error:
            "Invalid payload. Expected letter, beverageType, and batchSize with valid values."
        });
      }

      const orchestrator = createTerminologyOrchestrator();
      const output = await orchestrator.runBatch(input);
      return json(200, {
        batchId: output.batchId,
        generatedAt: output.generatedAt,
        generatedTerms: output.generatedTerms,
        evaluationMetrics: output.evaluationMetrics,
        improvementDeltas: output.improvementDeltas
      });
    }

    if (isTerminologyStatusPath(pathname)) {
      if (request.method !== "GET") {
        return json(405, { error: "Use GET only." });
      }

      const orchestrator = createTerminologyOrchestrator();
      const status = await orchestrator.getStatus(50);
      return json(200, {
        batchHistory: status.batchHistory,
        averageScoreTrend: status.averageScoreTrend,
        duplicateReductionTrend: status.duplicateReductionTrend,
        citationSuccessTrend: status.citationSuccessTrend
      });
    }

    if (request.method !== "POST") {
      return json(405, { error: "Use POST only." });
    }

    const body = (await request.json()) as RouterRequest;
    const provider = body.provider ?? "openai";
    const prompt = body.prompt?.trim() ?? "";
    const system = body.system?.trim() || "You are a helpful AI tutor for beginners.";
    const maxTokens = Math.min(Math.max(body.maxTokens ?? 400, 64), 1400);

    if (!prompt) {
      return json(400, { error: "Prompt is required." });
    }
    if (prompt.length > MAX_PROMPT_LENGTH) {
      return json(400, { error: `Prompt is too long. Max ${MAX_PROMPT_LENGTH} characters.` });
    }
    if (system.length > MAX_SYSTEM_LENGTH) {
      return json(400, { error: `System prompt is too long. Max ${MAX_SYSTEM_LENGTH} characters.` });
    }

    let result: RouterResponse;
    if (provider === "openai") {
      result = await callOpenAi(prompt, system, maxTokens);
    } else if (provider === "anthropic") {
      result = await callAnthropic(prompt, system, maxTokens);
    } else if (provider === "google") {
      result = await callGoogle(prompt, system);
    } else {
      return json(400, { error: "Provider must be openai, anthropic, or google." });
    }

    return json(200, result);
  } catch (error: unknown) {
    const requestId = crypto.randomUUID();
    console.error("ai-router error", { requestId, error });
    return json(500, { error: "Internal server error.", requestId });
  }
});
