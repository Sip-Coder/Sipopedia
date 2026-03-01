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

const MAX_PROMPT_LENGTH = 4_000;
const MAX_SYSTEM_LENGTH = 1_200;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
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

function decodeBase64Url(value: string): string | null {
  try {
    const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    return atob(padded);
  } catch {
    return null;
  }
}

function getJwtClaims(request: Request): Record<string, unknown> | null {
  const auth = request.headers.get("authorization");
  if (!auth?.toLowerCase().startsWith("bearer ")) {
    return null;
  }
  const token = auth.slice(7).trim();
  const parts = token.split(".");
  if (parts.length !== 3) {
    return null;
  }
  const payload = decodeBase64Url(parts[1]);
  if (!payload) {
    return null;
  }

  try {
    const parsed = JSON.parse(payload) as unknown;
    if (!parsed || typeof parsed !== "object") {
      return null;
    }
    return parsed as Record<string, unknown>;
  } catch {
    return null;
  }
}

function getAuthenticatedUserId(request: Request): string | null {
  const claims = getJwtClaims(request);
  if (!claims) {
    return null;
  }
  const role = typeof claims.role === "string" ? claims.role : "";
  const sub = typeof claims.sub === "string" ? claims.sub : "";
  if (role !== "authenticated" || sub.length === 0) {
    return null;
  }
  return sub;
}

async function callOpenAi(prompt: string, system: string, maxTokens: number): Promise<RouterResponse> {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY secret.");
  }

  const model = Deno.env.get("OPENAI_MODEL") ?? "gpt-4.1-mini";
  const response = await fetch("https://api.openai.com/v1/responses", {
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
  const response = await fetch("https://api.anthropic.com/v1/messages", {
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
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  if (!response.ok) {
    throw new Error(`Google request failed (${response.status}).`);
  }

  const data = await response.json();
  return { provider: "google", model, text: extractGoogleText(data) };
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return json(405, { error: "Use POST only." });
  }

  try {
    if (!getAuthenticatedUserId(request)) {
      return json(401, { error: "Sign in is required to use ai-router." });
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
    console.error("ai-router error", error);
    const message = error instanceof Error ? error.message : "AI router request failed.";
    return json(500, { error: message });
  }
});
