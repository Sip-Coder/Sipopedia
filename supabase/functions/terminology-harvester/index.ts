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

type WikipediaSearchResponse = {
  query?: {
    search?: Array<{ title?: string; snippet?: string }>;
  };
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
const PER_CALL_TARGET = 40;
const MAX_ATTEMPTS = 12;
const WIKIPEDIA_SEARCH_URL = "https://en.wikipedia.org/w/api.php";
const WIKIPEDIA_SUMMARY_BASE_URL = "https://en.wikipedia.org/api/rest_v1/page/summary/";
const SEARCH_TOPICS = [
  "wine terminology",
  "wine grape variety",
  "wine region",
  "viticulture term",
  "oenology",
  "beer terminology",
  "brewery process",
  "hop variety",
  "malt term",
  "spirits terminology",
  "whisky production",
  "rum production",
  "tequila term",
  "gin botanical",
  "coffee terminology",
  "coffee processing",
  "coffee variety",
  "tea terminology",
  "tea processing",
  "tea cultivar",
  "kombucha terminology",
  "juice production",
  "water mineral profile",
  "dairy beverage term",
  "fermentation term",
  "beverage sensory term"
];
const BEVERAGE_KEYWORDS = [
  "wine",
  "beer",
  "brew",
  "brewery",
  "spirit",
  "whisky",
  "whiskey",
  "vodka",
  "rum",
  "tequila",
  "mezcal",
  "brandy",
  "liqueur",
  "coffee",
  "espresso",
  "tea",
  "kombucha",
  "juice",
  "milk",
  "water",
  "beverage",
  "ferment",
  "grape",
  "vineyard",
  "hop",
  "malt"
];

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
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

function splitSentences(text: string): string[] {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) {
    return [];
  }
  const pieces = normalized.match(/[^.!?]+[.!?]?/g) ?? [];
  return pieces.map((part) => part.trim()).filter(Boolean);
}

function textContainsBeverageContext(text: string): boolean {
  const lower = text.toLowerCase();
  return BEVERAGE_KEYWORDS.some((keyword) => lower.includes(keyword));
}

function inferBeverageType(text: string): string {
  const lower = text.toLowerCase();

  if (/(whisky|whiskey|vodka|rum|tequila|mezcal|brandy|cognac|gin|liqueur|spirits?)/.test(lower)) {
    return "spirits";
  }
  if (/(beer|ale|lager|stout|porter|pilsner|ipa|hop|malt|brew)/.test(lower)) {
    return "beer";
  }
  if (/(coffee|espresso|arabica|robusta|cappuccino|latte)/.test(lower)) {
    return "coffee";
  }
  if (/(tea|oolong|green tea|black tea|white tea|camellia sinensis)/.test(lower)) {
    return "tea";
  }
  if (/kombucha/.test(lower)) {
    return "kombucha";
  }
  if (/(juice|cider|must|nectar)/.test(lower)) {
    return "juice";
  }
  if (/(milk|dairy|whey)/.test(lower)) {
    return "milk";
  }
  if (/(water|mineral water|spring water|aquifer)/.test(lower)) {
    return "water";
  }

  return "wine";
}

function inferCategory(text: string): string {
  const lower = text.toLowerCase();

  if (/(country|region|valley|district|appellation|ava|denominaci[oó]n|geographical indication|gi\b)/.test(lower)) {
    return "location";
  }
  if (/(soil|climate|microclimate|elevation|altitude|terroir|maritime|continental)/.test(lower)) {
    return "terroir";
  }
  if (/(grape|varietal|variety|cultivar|hop variety|tea cultivar|arabica|robusta|species)/.test(lower)) {
    return "variety of source ingredient";
  }

  return "production style";
}

function buildHowToApply(term: string, beverageType: string, category: string): string {
  if (category === "location") {
    return `Use ${term} when discussing origin and regional identity to set expectations for style, quality, and labeling context in ${beverageType}.`;
  }
  if (category === "terroir") {
    return `Use ${term} to explain how site conditions influence flavor, structure, and consistency in ${beverageType}.`;
  }
  if (category === "variety of source ingredient") {
    return `Use ${term} when comparing ingredient choices and their sensory outcomes so recommendations and training notes stay precise.`;
  }
  return `Use ${term} to describe a production approach and its practical impact on aroma, texture, and finish in service or education.`;
}

function stripParentheticalTitle(title: string): string {
  return title.replace(/\s*\([^)]*\)\s*$/, "").trim();
}

function extractWikiUrl(summary: Record<string, unknown>, title: string): string {
  const contentUrls = summary.content_urls as
    | {
        desktop?: { page?: string };
      }
    | undefined;
  const page = contentUrls?.desktop?.page;
  if (typeof page === "string" && page.startsWith("http")) {
    return page;
  }
  return `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/\s+/g, "_"))}`;
}

function candidateFromWikipediaSummary(summary: Record<string, unknown>): TerminologyCandidate | null {
  const rawTitle = typeof summary.title === "string" ? summary.title.trim() : "";
  const extract = typeof summary.extract === "string" ? summary.extract.trim() : "";
  const description = typeof summary.description === "string" ? summary.description.trim() : "";
  const wikiType = typeof summary.type === "string" ? summary.type.trim() : "";

  if (!rawTitle || !extract || wikiType === "disambiguation") {
    return null;
  }

  const term = stripParentheticalTitle(rawTitle);
  if (!term || term.length > 80) {
    return null;
  }

  const contextText = `${rawTitle} ${description} ${extract}`;
  if (!textContainsBeverageContext(contextText)) {
    return null;
  }

  const beverageType = inferBeverageType(contextText);
  const category = inferCategory(contextText);
  const sentences = splitSentences(extract);
  const meaning = (sentences[0] ?? extract).trim();
  const exampleSentence = sentences[1] ?? sentences[0] ?? "";
  const referenceUrl = extractWikiUrl(summary, rawTitle);

  if (!meaning) {
    return null;
  }

  const examples = exampleSentence
    ? [`Example context: ${exampleSentence}`]
    : [`Example context: ${term} appears in professional ${beverageType} discussions and training materials.`];

  return {
    term,
    beverage_type: beverageType,
    category,
    meaning,
    how_to_apply: buildHowToApply(term, beverageType, category),
    examples,
    other_ideas: [
      `Compare ${term} across producers and regions to evaluate style variation and practical use.`
    ],
    related_terms: [],
    reference_links: [referenceUrl],
    mla_citations: [fallbackCitation(term, "Wikipedia", referenceUrl)],
    source_title: "Wikipedia",
    source_authors: ["Wikipedia contributors"],
    purchase_links: [referenceUrl],
    source_note: "Automated non-OpenAI ingest from Wikipedia search and summary endpoints."
  };
}

async function searchWikipedia(topic: string, limit: number): Promise<string[]> {
  const query = new URLSearchParams({
    action: "query",
    list: "search",
    srsearch: topic,
    srlimit: String(limit),
    format: "json",
    utf8: "1",
    origin: "*"
  });

  const response = await fetch(`${WIKIPEDIA_SEARCH_URL}?${query.toString()}`);
  if (!response.ok) {
    return [];
  }

  const payload = (await response.json()) as WikipediaSearchResponse;
  const rows = payload.query?.search ?? [];
  const out = new Set<string>();

  for (const row of rows) {
    if (typeof row.title !== "string") {
      continue;
    }
    const title = row.title.trim();
    if (title) {
      out.add(title);
    }
  }

  return Array.from(out);
}

async function fetchWikipediaSummary(title: string): Promise<Record<string, unknown> | null> {
  const response = await fetch(`${WIKIPEDIA_SUMMARY_BASE_URL}${encodeURIComponent(title)}`);
  if (!response.ok) {
    return null;
  }

  try {
    const payload = (await response.json()) as Record<string, unknown>;
    return payload;
  } catch {
    return null;
  }
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
  requestedCount: number,
  duplicateGuardSample: string[]
): Promise<TerminologyCandidate[]> {
  const sampleSet = new Set(duplicateGuardSample.map((value) => normalizeTerm(value)));
  const titleSet = new Set<string>();

  for (const topic of SEARCH_TOPICS) {
    if (titleSet.size >= requestedCount * 3) {
      break;
    }
    const titles = await searchWikipedia(topic, 30);
    for (const title of titles) {
      const normalized = normalizeTerm(stripParentheticalTitle(title));
      if (!normalized || sampleSet.has(normalized)) {
        continue;
      }
      titleSet.add(title);
    }
  }

  const output: TerminologyCandidate[] = [];
  const titles = Array.from(titleSet);

  for (let i = 0; i < titles.length && output.length < requestedCount; i += 6) {
    const batch = titles.slice(i, i + 6);
    const summaries = await Promise.all(batch.map((title) => fetchWikipediaSummary(title)));

    for (const summary of summaries) {
      if (!summary) {
        continue;
      }
      const candidate = candidateFromWikipediaSummary(summary);
      if (!candidate) {
        continue;
      }
      const normalized = normalizeTerm(candidate.term ?? "");
      if (!normalized || sampleSet.has(normalized)) {
        continue;
      }
      sampleSet.add(normalized);
      output.push(candidate);
      if (output.length >= requestedCount) {
        break;
      }
    }
  }

  return output;
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

  if (!supabaseUrl || !serviceRoleKey) {
    return json(500, {
      error: "Missing required secrets. Ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set."
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

      const generated = await generateCandidates(requestCount, duplicateGuardSample);
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
