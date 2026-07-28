import { supabase } from "./supabase";
import curatedFallbackTerms from "../data/terminologyCuratedV2Terms.json";

export type TermBucket = "ALL" | "#" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";

export type TerminologySummary = {
  id: string;
  term: string;
  sort_group: string;
  meaning: string;
  infographic_url: string | null;
};

export type TerminologyCommandResult = TerminologySummary & {
  rank_score: number;
};

export type TerminologyDetail = {
  id: string;
  term: string;
  sort_group: string;
  meaning: string;
  how_to_apply: string;
  examples: string[];
  other_ideas: string[];
  reference_links: string[];
  mla_citations: string[];
  source_title: string;
  source_authors: string[];
  purchase_links: string[];
  infographic_url: string | null;
  infographic_caption: string | null;
  source_note: string | null;
  is_published?: boolean;
  updated_at: string;
};

export type TerminologyPage = {
  rows: TerminologySummary[];
  total: number;
};

export type TerminologyLinkTarget = {
  id: string;
  term: string;
};

const letterBuckets: Exclude<TermBucket, "ALL" | "#">[] = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];

type CuratedFallbackTerm = {
  term: string;
  beverage_type: string;
  category: string;
};

function fallbackTermId(term: string, index: number): string {
  const slug = term
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `fallback:${slug || "term"}:${index}`;
}

const fallbackRows: TerminologyDetail[] = (curatedFallbackTerms as CuratedFallbackTerm[]).map((entry, index) => {
  const initial = entry.term.trim().charAt(0).toUpperCase();
  const sortGroup = /^[A-Z]$/.test(initial) ? initial : "#";
  const beverageLabel = entry.beverage_type.replace(/[_-]+/g, " ");

  return {
    id: fallbackTermId(entry.term, index),
    term: entry.term,
    sort_group: sortGroup,
    meaning: `${beverageLabel.charAt(0).toUpperCase()}${beverageLabel.slice(1)} terminology match. Open the live Sipopedia entry for its full definition, application, examples, and references.`,
    how_to_apply: "",
    examples: [],
    other_ideas: [],
    reference_links: [],
    mla_citations: [],
    source_title: "Sipopedia offline search index",
    source_authors: [],
    purchase_links: [],
    infographic_url: null,
    infographic_caption: null,
    source_note: "Compact fallback entry for local and temporarily offline search.",
    is_published: true,
    updated_at: "2026-07-27T00:00:00.000Z"
  };
});

function scoreTerminologyResult(row: TerminologySummary, normalizedQuery: string): number {
  const term = row.term.toLowerCase();
  const meaning = row.meaning.toLowerCase();
  return term === normalizedQuery
    ? 100
    : term.startsWith(normalizedQuery)
      ? 85
      : term.includes(normalizedQuery)
        ? 70
        : meaning.includes(normalizedQuery)
          ? 35
          : 0;
}

function searchFallbackTerminologyResults(query: string, limit: number): TerminologyCommandResult[] {
  const normalizedQuery = query.trim().toLowerCase();
  return fallbackRows
    .filter((row) => row.is_published !== false)
    .map((row) => ({
      id: row.id,
      term: row.term,
      sort_group: row.sort_group,
      meaning: row.meaning,
      infographic_url: row.infographic_url,
      rank_score: scoreTerminologyResult(row, normalizedQuery)
    }))
    .filter((row) => row.rank_score > 0)
    .sort((left, right) => right.rank_score - left.rank_score || left.term.localeCompare(right.term))
    .slice(0, limit);
}

function mapTerminologyError(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("terminology_entries_reference_links_required")) {
    return "At least one reference link is required for each term.";
  }

  if (lower.includes("terminology_entries_mla_citations_required")) {
    return "At least one MLA citation is required for each term.";
  }

  if (lower.includes("terminology_entries_source_title_required")) {
    return "A source title is required for each term.";
  }

  if (lower.includes("terminology_entries_source_authors_required")) {
    return "At least one source author is required for each term.";
  }

  if (lower.includes("terminology_entries_purchase_links_required")) {
    return "At least one purchase link is required for each term.";
  }

  if (lower.includes("terminology_entries_no_verbatim_only")) {
    return "Verbatim source text is not allowed. Save an original definition.";
  }

  if (lower.includes("invalid api key")) {
    return "Sipopedia terminology is temporarily unavailable. Please try again later.";
  }

  if (lower.includes("relation") && lower.includes("terminology_entries")) {
    return "Sipopedia terminology is temporarily unavailable. Please try again later.";
  }

  if (lower.includes("permission denied")) {
    return "You do not have permission to complete this terminology action.";
  }

  if (lower.includes("infinite recursion") && lower.includes("profiles")) {
    return "Sipopedia terminology is temporarily unavailable. Please try again later.";
  }

  return message;
}


function fallbackFilter(bucket: TermBucket, query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  return fallbackRows.filter((row) => {
    const bucketMatch = bucket === "ALL" || row.sort_group === bucket;
    const queryMatch = normalizedQuery.length === 0 || row.term.toLowerCase().includes(normalizedQuery);
    return bucketMatch && queryMatch;
  });
}

export async function listTerminologyPage(input: {
  bucket: TermBucket;
  query: string;
  page: number;
  pageSize: number;
  topImportant?: boolean;
  includeUnpublished?: boolean;
  withInfographicOnly?: boolean;
}): Promise<TerminologyPage> {
  const { bucket, query, page, pageSize, topImportant = false, includeUnpublished = false, withInfographicOnly = false } = input;

  const trimmedQuery = query.trim();
  const topAllByLetter = topImportant && bucket === "ALL";

  if (!supabase) {
    const filtered = fallbackFilter(bucket, query);
    const ranked = [...filtered].sort((left, right) => {
      const scoreLeft = computeFallbackImportance(left.term);
      const scoreRight = computeFallbackImportance(right.term);
      if (scoreRight !== scoreLeft) {
        return scoreRight - scoreLeft;
      }
      return left.term.localeCompare(right.term);
    });
    if (topAllByLetter) {
      const perLetter = letterBuckets.flatMap((letter) =>
        ranked.filter((row) => row.sort_group === letter).slice(0, 4)
      );
      const rows = perLetter.map((row) => ({
        id: row.id,
        term: row.term,
        sort_group: row.sort_group,
        meaning: row.meaning,
        infographic_url: row.infographic_url
      }));
      return { rows, total: rows.length };
    }

    const sourceRows = topImportant ? ranked.slice(0, 100) : filtered;
    const start = topImportant ? 0 : page * pageSize;
    const end = topImportant ? 100 : start + pageSize;
    const rows = sourceRows.slice(start, end).map((row) => ({
      id: row.id,
      term: row.term,
      sort_group: row.sort_group,
      meaning: row.meaning,
      infographic_url: row.infographic_url
    }));
    return { rows, total: sourceRows.length };
  }

  const client = supabase;
  let request = client
    .from("terminology_entries")
    .select("id,term,sort_group,meaning,infographic_url", { count: "exact" });

  if (bucket !== "ALL") {
    request = request.eq("sort_group", bucket);
  }

  if (withInfographicOnly) {
    request = request.not("infographic_url", "is", null).neq("infographic_url", "");
  }

  if (topAllByLetter) {
    const letterQueries = letterBuckets.map((letter) => {
      let letterRequest = client
        .from("terminology_entries")
        .select("id,term,sort_group,meaning,infographic_url")
        .eq("sort_group", letter)
        .order("importance_score", { ascending: false })
        .order("normalized_term", { ascending: true });

      if (!includeUnpublished) {
        letterRequest = letterRequest.eq("is_published", true);
      }

      if (withInfographicOnly) {
        letterRequest = letterRequest.not("infographic_url", "is", null).neq("infographic_url", "");
      }

      if (trimmedQuery.length > 0) {
        letterRequest = letterRequest.ilike("term", `%${trimmedQuery}%`);
      }

      return letterRequest.range(0, 3);
    });

    const letterResults = await Promise.all(letterQueries);
    const errored = letterResults.find((result) => result.error);
    if (errored?.error) {
      throw new Error(mapTerminologyError(errored.error.message));
    }

    const rows = letterResults.flatMap((result) => ((result.data ?? []) as TerminologySummary[]));
    return { rows, total: rows.length };
  } else if (topImportant) {
    request = request.order("importance_score", { ascending: false }).order("normalized_term", { ascending: true });
  } else {
    request = request.order("sort_group", { ascending: true }).order("normalized_term", { ascending: true });
  }

  if (!includeUnpublished) {
    request = request.eq("is_published", true);
  }

  if (trimmedQuery.length > 0) {
    request = request.ilike("term", `%${trimmedQuery}%`);
  }

  const from = topImportant ? 0 : page * pageSize;
  const to = topImportant ? 99 : from + pageSize - 1;
  const { data, error, count } = await request.range(from, to);

  if (error) {
    throw new Error(mapTerminologyError(error.message));
  }

  return {
    rows: (data ?? []) as TerminologySummary[],
    total: topImportant ? Math.min(count ?? 0, 100) : count ?? 0
  };
}

export async function searchTerminologyCommandResults(query: string, limit = 10): Promise<TerminologyCommandResult[]> {
  const trimmedQuery = query.trim();
  if (trimmedQuery.length < 2) return [];

  const normalizedQuery = trimmedQuery.toLowerCase();
  if (!supabase) {
    return searchFallbackTerminologyResults(trimmedQuery, limit);
  }

  const safeSearchQuery = trimmedQuery
    .replace(/[^\p{L}\p{N}\s'-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!safeSearchQuery) return [];

  const selection = "id,term,sort_group,meaning,infographic_url";
  const exactRequest = supabase
    .from("terminology_entries")
    .select(selection)
    .eq("is_published", true)
    .ilike("term", safeSearchQuery)
    .limit(Math.max(2, limit));
  const prefixRequest = supabase
    .from("terminology_entries")
    .select(selection)
    .eq("is_published", true)
    .ilike("term", `${safeSearchQuery}%`)
    .order("normalized_term", { ascending: true })
    .limit(Math.max(limit * 2, 12));
  const broadRequest = supabase
    .from("terminology_entries")
    .select(selection)
    .eq("is_published", true)
    .or(`term.ilike.%${safeSearchQuery}%,meaning.ilike.%${safeSearchQuery}%`)
    .order("importance_score", { ascending: false })
    .order("normalized_term", { ascending: true })
    .limit(Math.max(limit * 4, 24));

  const results = await Promise.all([exactRequest, prefixRequest, broadRequest]);
  const successfulResults = results.filter((result) => !result.error);
  if (successfulResults.length === 0) {
    return searchFallbackTerminologyResults(trimmedQuery, limit);
  }

  const rowsById = new Map<string, TerminologySummary>();
  successfulResults.forEach((result) => {
    ((result.data ?? []) as TerminologySummary[]).forEach((row) => rowsById.set(row.id, row));
  });

  return [...rowsById.values()]
    .map((row) => ({ ...row, rank_score: scoreTerminologyResult(row, normalizedQuery) }))
    .filter((row) => row.rank_score > 0)
    .sort((left, right) => right.rank_score - left.rank_score || left.term.localeCompare(right.term))
    .slice(0, limit);
}

export async function listTerminologyLinkTargets(maxRows = 1200): Promise<TerminologyLinkTarget[]> {
  if (!supabase) {
    return fallbackRows
      .filter((row) => row.is_published !== false)
      .map((row) => ({
        id: row.id,
        term: row.term
      }));
  }

  const rows: TerminologyLinkTarget[] = [];
  const pageSize = 1000;
  let from = 0;

  while (from < maxRows) {
    const { data, error } = await supabase
      .from("terminology_entries")
      .select("id,term")
      .eq("is_published", true)
      .order("normalized_term", { ascending: true })
      .range(from, from + pageSize - 1);

    if (error) {
      throw new Error(mapTerminologyError(error.message));
    }

    const pageRows = (data ?? []) as TerminologyLinkTarget[];
    rows.push(...pageRows);

    if (pageRows.length < pageSize) {
      break;
    }

    from += pageSize;
  }

  return rows;
}

function computeFallbackImportance(term: string): number {
  const value = term.toLowerCase();
  let score = 10;

  if (/(acidity|sweetness|body|aroma|flavor|aftertaste|terroir|extraction|fermentation|brew)/.test(value)) {
    score += 40;
  }
  if (/(cupping|tasting|sensory|balance|mouthfeel|roast|origin|processing|blend)/.test(value)) {
    score += 35;
  }
  if (/(infusion|steep|temperature|grind|ratio|solubility|dissolved solids|clarity)/.test(value)) {
    score += 25;
  }
  if (/^[0-9]/.test(value)) {
    score += 10;
  }

  return score;
}

export async function getTerminologyById(id: string): Promise<TerminologyDetail> {
  const local = fallbackRows.find((row) => row.id === id);
  if (local) {
    return local;
  }

  if (!supabase) {
    throw new Error("Term not found.");
  }

  const { data, error } = await supabase
    .from("terminology_entries")
    .select(
      "id,term,sort_group,meaning,how_to_apply,examples,other_ideas,reference_links,mla_citations,source_title,source_authors,purchase_links,infographic_url,infographic_caption,source_note,is_published,updated_at"
    )
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(mapTerminologyError(error.message));
  }

  return {
    ...(data as TerminologyDetail),
    examples: (data?.examples as string[] | null) ?? [],
    other_ideas: (data?.other_ideas as string[] | null) ?? [],
    reference_links: (data?.reference_links as string[] | null) ?? [],
    mla_citations: (data?.mla_citations as string[] | null) ?? [],
    source_authors: (data?.source_authors as string[] | null) ?? [],
    purchase_links: (data?.purchase_links as string[] | null) ?? [],
    source_title: (data?.source_title as string | null) ?? ""
  };
}

export type TerminologyUpsertInput = {
  id?: string;
  term: string;
  meaning: string;
  how_to_apply: string;
  examples: string[];
  other_ideas: string[];
  reference_links: string[];
  mla_citations: string[];
  source_title: string;
  source_authors: string[];
  purchase_links: string[];
  infographic_url: string | null;
  infographic_caption: string | null;
  source_note: string | null;
  is_published: boolean;
};

export async function upsertTerminologyEntry(input: TerminologyUpsertInput): Promise<string> {
  if (!supabase) {
    throw new Error("Terminology publishing is temporarily unavailable. Please try again later.");
  }

  const referenceLinks = input.reference_links.map((value) => value.trim()).filter(Boolean);
  const mlaCitations = input.mla_citations.map((value) => value.trim()).filter(Boolean);
  const sourceAuthors = input.source_authors.map((value) => value.trim()).filter(Boolean);
  const purchaseLinks = input.purchase_links.map((value) => value.trim()).filter(Boolean);
  const sourceTitle = input.source_title.trim();
  if (referenceLinks.length === 0 || mlaCitations.length === 0 || sourceAuthors.length === 0 || purchaseLinks.length === 0 || !sourceTitle) {
    throw new Error("Each term requires references, MLA citations, source title, source author, and purchase link.");
  }

  const payload = {
    id: input.id,
    term: input.term.trim(),
    meaning: input.meaning.trim(),
    how_to_apply: input.how_to_apply.trim(),
    examples: input.examples,
    other_ideas: input.other_ideas,
    reference_links: referenceLinks,
    mla_citations: mlaCitations,
    source_title: sourceTitle,
    source_authors: sourceAuthors,
    purchase_links: purchaseLinks,
    is_verbatim_from_source: false,
    source_rights_basis: "",
    infographic_url: input.infographic_url,
    infographic_caption: input.infographic_caption,
    source_note: input.source_note,
    is_published: input.is_published
  };

  const { data, error } = await supabase
    .from("terminology_entries")
    .upsert(payload, { onConflict: "id" })
    .select("id")
    .single();

  if (error) {
    throw new Error(mapTerminologyError(error.message));
  }

  return String(data.id);
}



