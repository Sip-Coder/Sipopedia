type HarvestRequest = {
  target?: number;
};

type TerminologyCandidate = {
  term?: string;
  beverage_type?: string;
  category?: string;
  meaning?: string;
  how_to_apply?: string;
  examples?: string[];
  other_ideas?: string[];
  related_terms?: string[];
  reference_links?: string[];
  mla_citations?: string[];
  source_title?: string;
  source_authors?: string[];
  purchase_links?: string[];
  source_note?: string;
};

type OpenAiResponse = {
  output_text?: string;
  output?: Array<{ content?: Array<{ type?: string; text?: string }> }>;
};

type HarvestRun = {
  target: number;
  generated: number;
  inserted: number;
  attempts: number;
  status: "success" | "partial" | "failed";
  details: string;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-cron-secret",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

const BEVERAGE_TYPES = new Set([
  "wine",
  "beer",
  "spirits",
  "coffee",
  "tea",
  "kombucha",
  "juice",
  "milk",
  "water",
  "energy drinks",
  "health drinks",
  "powdered supplements"
]);

const CATEGORIES = new Set(["location", "terroir", "variety of source ingredient", "production style"]);
const MAX_TARGET = 500;
const DEFAULT_TARGET = 500;
const PER_CALL_TARGET = 75;
const MAX_ATTEMPTS = 20;

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}

function extractOpenAiText(payload: OpenAiResponse): string {
  if (typeof payload.output_text === "string" && payload.output_text.trim().length > 0) {
    return payload.output_text.trim();
  }

  if (!Array.isArray(payload.output)) {
    return "";
  }

  return payload.output
    .flatMap((row) => row.content ?? [])
    .filter((item) => item?.type === "output_text" && typeof item.text === "string")
    .map((item) => item.text ?? "")
    .join("\n")
    .trim();
}

function extractJsonBlock(text: string): string {
  const fenced = /```(?:json)?\s*([\s\S]*?)\s*```/i.exec(text);
  if (fenced?.[1]) {
    return fenced[1].trim();
  }
  return text.trim();
}

function normalizeTerm(input: string): string {
  return input.trim().toLowerCase().replace(/\s+/g, " ");
}

function uniqueCleanTextArray(input: unknown, fallback: string[] = []): string[] {
  const values = Array.isArray(input) ? input : fallback;
  const deduped = new Set<string>();
  for (const row of values) {
    if (typeof row !== "string") {
      continue;
    }
    const cleaned = row.replace(/\s+/g, " ").trim();
    if (cleaned) {
      deduped.add(cleaned);
    }
  }
  return Array.from(deduped);
}

function firstValidUrl(values: string[]): string | null {
  for (const value of values) {
    try {
      const parsed = new URL(value);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") {
        return parsed.toString();
      }
    } catch {
      continue;
    }
  }
  return null;
}

function fallbackCitation(term: string, sourceTitle: string, sourceUrl: string): string {
  const today = new Date().toISOString().slice(0, 10);
  return `${sourceTitle}. "${term}." Web. Accessed ${today}. ${sourceUrl}`;
}

function domainTitle(sourceUrl: string): string {
  try {
    return new URL(sourceUrl).hostname.replace(/^www\./, "");
  } catch {
    return "Professional beverage source";
  }
}

function normalizeBeverageType(input: unknown): string {
  if (typeof input !== "string") {
    return "wine";
  }
  const raw = input.trim().toLowerCase();
  if (BEVERAGE_TYPES.has(raw)) {
    return raw;
  }

  const aliases: Record<string, string> = {
    spirit: "spirits",
    whisky: "spirits",
    whiskey: "spirits",
    coffeehouse: "coffee",
    herbal: "tea",
    tisane: "tea",
    probiotic: "kombucha",
    mineral: "water",
    dairy: "milk",
    "sports drink": "health drinks",
    supplement: "powdered supplements"
  };

  return aliases[raw] ?? "wine";
}

function normalizeCategory(input: unknown): string {
  if (typeof input !== "string") {
    return "production style";
  }
  const raw = input.trim().toLowerCase();
  if (CATEGORIES.has(raw)) {
    return raw;
  }

  const aliases: Record<string, string> = {
    place: "location",
    origin: "location",
    climate: "terroir",
    soil: "terroir",
    grape: "variety of source ingredient",
    variety: "variety of source ingredient",
    process: "production style",
    technique: "production style"
  };

  return aliases[raw] ?? "production style";
}

function sanitizeCandidate(raw: TerminologyCandidate): Record<string, unknown> | null {
  const term = typeof raw.term === "string" ? raw.term.trim().replace(/\s+/g, " ") : "";
  const meaning = typeof raw.meaning === "string" ? raw.meaning.trim() : "";
  const howToApply = typeof raw.how_to_apply === "string" ? raw.how_to_apply.trim() : "";

  if (!term || !meaning || !howToApply) {
    return null;
  }

  const referenceLinks = uniqueCleanTextArray(raw.reference_links);
  const sourceUrl = firstValidUrl(referenceLinks);
  if (!sourceUrl) {
    return null;
  }

  const sourceTitleRaw = typeof raw.source_title === "string" ? raw.source_title.trim() : "";
  const sourceTitle = sourceTitleRaw || domainTitle(sourceUrl);
  const sourceAuthors = uniqueCleanTextArray(raw.source_authors, ["Editorial Team"]);
  const purchaseLinks = uniqueCleanTextArray(raw.purchase_links);
  const mlaCitations = uniqueCleanTextArray(raw.mla_citations);
  const relatedTerms = uniqueCleanTextArray(raw.related_terms);
  const examples = uniqueCleanTextArray(raw.examples);
  const otherIdeas = uniqueCleanTextArray(raw.other_ideas);

  const safePurchaseLinks = purchaseLinks.length > 0 ? purchaseLinks : [sourceUrl];
  const safeMlaCitations =
    mlaCitations.length > 0 ? mlaCitations : [fallbackCitation(term, sourceTitle, sourceUrl)];

  return {
    term,
    beverage_type: normalizeBeverageType(raw.beverage_type),
    category: normalizeCategory(raw.category),
    meaning,
    how_to_apply: howToApply,
    examples,
    other_ideas: otherIdeas,
    related_terms: relatedTerms,
    reference_links: [sourceUrl],
    mla_citations: safeMlaCitations,
    source_title: sourceTitle,
    source_authors: sourceAuthors.length > 0 ? sourceAuthors : ["Editorial Team"],
    purchase_links: safePurchaseLinks,
    is_verbatim_from_source: false,
    source_rights_basis: "Original editorial rewrite based on public web sources",
    source_note:
      typeof raw.source_note === "string" && raw.source_note.trim().length > 0
        ? raw.source_note.trim()
        : "Automated terminology harvest from current professional discourse."
  };
}

async function fetchExistingTerms(supabaseUrl: string, serviceRoleKey: string): Promise<Set<string>> {
  const existing = new Set<string>();
  const pageSize = 1000;
  let offset = 0;

  while (true) {
    const response = await fetch(`${supabaseUrl}/rest/v1/terminology_entries?select=term&order=term.asc`, {
      method: "GET",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        Range: `${offset}-${offset + pageSize - 1}`,
        "Range-Unit": "items"
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to load existing terms (${response.status}).`);
    }

    const rows = (await response.json()) as Array<{ term?: string }>;
    for (const row of rows) {
      if (typeof row.term !== "string") {
        continue;
      }
      existing.add(normalizeTerm(row.term));
    }

    if (rows.length < pageSize) {
      break;
    }
    offset += rows.length;
  }

  return existing;
}

async function generateCandidates(
  openAiApiKey: string,
  model: string,
  requestedCount: number,
  duplicateGuardSample: string[]
): Promise<TerminologyCandidate[]> {
  const systemPrompt = [
    "You are a Master Sommelier-level beverage lexicon researcher.",
    "Research current professional beverage discourse using web search and produce original terminology entries.",
    "Cover wine, beer, spirits, coffee, tea, kombucha, juice, milk, and water.",
    "Use only non-verbatim paraphrased writing.",
    "Return strict JSON with shape: {\"items\":[...]} and no prose."
  ].join(" ");

  const userPayload = {
    task: "Create novel beverage terminology entries suitable for a professional training database.",
    count: requestedCount,
    constraints: {
      unique_vs_existing_terms: true,
      avoid_terms_sample: duplicateGuardSample,
      required_fields: [
        "term",
        "beverage_type",
        "category",
        "meaning",
        "how_to_apply",
        "examples",
        "other_ideas",
        "related_terms",
        "reference_links",
        "mla_citations",
        "source_title",
        "source_authors",
        "purchase_links",
        "source_note"
      ],
      beverage_type_allowed: Array.from(BEVERAGE_TYPES),
      category_allowed: Array.from(CATEGORIES),
      style: {
        term_length: "1-4 words",
        meaning: "single sentence, practical and precise",
        how_to_apply: "single sentence, implementation-oriented",
        examples_count: 1,
        other_ideas_count: 1,
        related_terms_count: 2,
        references_count: 1,
        citations_count: 1
      }
    },
    freshness: "Prioritize discourse that appears current in the professional field."
  };

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openAiApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      max_output_tokens: 12000,
      tools: [{ type: "web_search_preview" }],
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: systemPrompt }]
        },
        {
          role: "user",
          content: [{ type: "input_text", text: JSON.stringify(userPayload) }]
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed (${response.status}).`);
  }

  const payload = (await response.json()) as OpenAiResponse;
  const text = extractOpenAiText(payload);
  if (!text) {
    return [];
  }

  const parsed = JSON.parse(extractJsonBlock(text)) as { items?: TerminologyCandidate[] };
  if (!Array.isArray(parsed.items)) {
    return [];
  }

  return parsed.items;
}

function pickSample(values: Set<string>, size: number): string[] {
  const all = Array.from(values);
  if (all.length <= size) {
    return all;
  }

  const output: string[] = [];
  const stride = Math.max(1, Math.floor(all.length / size));
  for (let i = 0; i < all.length && output.length < size; i += stride) {
    output.push(all[i]);
  }
  return output;
}

async function insertEntries(
  supabaseUrl: string,
  serviceRoleKey: string,
  rows: Array<Record<string, unknown>>
): Promise<number> {
  if (!rows.length) {
    return 0;
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/terminology_entries?on_conflict=term`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=ignore-duplicates,return=representation"
    },
    body: JSON.stringify(rows)
  });

  if (response.ok) {
    const inserted = (await response.json()) as unknown[];
    return inserted.length;
  }

  let insertedCount = 0;
  for (const row of rows) {
    const one = await fetch(`${supabaseUrl}/rest/v1/terminology_entries?on_conflict=term`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "resolution=ignore-duplicates,return=representation"
      },
      body: JSON.stringify([row])
    });
    if (!one.ok) {
      continue;
    }
    const inserted = (await one.json()) as unknown[];
    insertedCount += inserted.length;
  }

  return insertedCount;
}

async function insertRunLog(supabaseUrl: string, serviceRoleKey: string, run: HarvestRun): Promise<void> {
  try {
    await fetch(`${supabaseUrl}/rest/v1/terminology_harvest_runs`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify([
        {
          target_count: run.target,
          generated_count: run.generated,
          inserted_count: run.inserted,
          attempts: run.attempts,
          status: run.status,
          details: run.details
        }
      ])
    });
  } catch (error) {
    console.error("terminology-harvester log insert failed", error);
  }
}

function isAuthorized(request: Request): boolean {
  const bearer = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim() ?? "";
  const xCronSecret = request.headers.get("x-cron-secret")?.trim() ?? "";
  const serviceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")?.trim() ?? "";
  const configuredSecret = Deno.env.get("TERMINOLOGY_CRON_SECRET")?.trim() ?? "";
  const localBypass = Deno.env.get("ALLOW_TERMINOLOGY_HARVEST_LOCAL_BYPASS") === "true";

  if (localBypass) {
    return true;
  }

  if (serviceRole && bearer && bearer === serviceRole) {
    return true;
  }

  if (configuredSecret && xCronSecret && xCronSecret === configuredSecret) {
    return true;
  }

  return false;
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return json(405, { error: "Use POST only." });
  }

  if (!isAuthorized(request)) {
    return json(401, { error: "Unauthorized scheduler request." });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")?.trim() ?? "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")?.trim() ?? "";
  const openAiApiKey = Deno.env.get("OPENAI_API_KEY")?.trim() ?? "";
  const model = Deno.env.get("OPENAI_MODEL")?.trim() || "gpt-4.1-mini";

  if (!supabaseUrl || !serviceRoleKey || !openAiApiKey) {
    return json(500, {
      error:
        "Missing required secrets. Ensure SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and OPENAI_API_KEY are set."
    });
  }

  let target = DEFAULT_TARGET;
  try {
    const body = (await request.json()) as HarvestRequest;
    if (typeof body.target === "number") {
      target = Math.max(1, Math.min(MAX_TARGET, Math.floor(body.target)));
    }
  } catch {
    target = DEFAULT_TARGET;
  }

  let existingTerms: Set<string>;
  try {
    existingTerms = await fetchExistingTerms(supabaseUrl, serviceRoleKey);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load existing terms.";
    return json(500, { error: message });
  }

  const run: HarvestRun = {
    target,
    generated: 0,
    inserted: 0,
    attempts: 0,
    status: "failed",
    details: ""
  };

  try {
    while (run.inserted < target && run.attempts < MAX_ATTEMPTS) {
      run.attempts += 1;
      const remaining = target - run.inserted;
      const requestCount = Math.min(PER_CALL_TARGET, remaining + 25);
      const duplicateGuardSample = pickSample(existingTerms, 500);

      const generated = await generateCandidates(openAiApiKey, model, requestCount, duplicateGuardSample);
      run.generated += generated.length;

      const validated: Array<Record<string, unknown>> = [];
      for (const candidate of generated) {
        const sanitized = sanitizeCandidate(candidate);
        if (!sanitized) {
          continue;
        }
        const term = String(sanitized.term ?? "");
        const normalized = normalizeTerm(term);
        if (!normalized || existingTerms.has(normalized)) {
          continue;
        }
        validated.push(sanitized);
        existingTerms.add(normalized);
      }

      const insertedNow = await insertEntries(supabaseUrl, serviceRoleKey, validated);
      run.inserted += insertedNow;

      if (generated.length === 0 && insertedNow === 0) {
        break;
      }
    }

    run.status = run.inserted >= target ? "success" : "partial";
    run.details = `Generated ${run.generated} candidates across ${run.attempts} attempts; inserted ${run.inserted}.`;
    await insertRunLog(supabaseUrl, serviceRoleKey, run);

    return json(200, {
      ok: true,
      status: run.status,
      target: run.target,
      generated: run.generated,
      inserted: run.inserted,
      attempts: run.attempts
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Harvest failed.";
    run.status = "failed";
    run.details = message;
    await insertRunLog(supabaseUrl, serviceRoleKey, run);
    console.error("terminology-harvester error", error);
    return json(500, { error: message, inserted: run.inserted, attempts: run.attempts });
  }
});
