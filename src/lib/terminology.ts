import { supabase } from "./supabase";

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

const fallbackRows: TerminologyDetail[] = [];

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
    return "Invalid Supabase API key. Update VITE_SUPABASE_ANON_KEY in .env and restart dev server.";
  }

  if (lower.includes("relation") && lower.includes("terminology_entries")) {
    return "Terminology table is missing. Run supabase/schema.sql in Supabase SQL Editor.";
  }

  if (lower.includes("permission denied")) {
    return "Permission denied. Check RLS policies and user role configuration.";
  }

  if (lower.includes("infinite recursion") && lower.includes("profiles")) {
    return "Terminology access is blocked by a recursive Supabase profile policy. Apply the latest RLS migration, then refresh Sipopedia.";
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
    return fallbackRows
      .filter((row) => row.is_published !== false)
      .map((row) => ({
        id: row.id,
        term: row.term,
        sort_group: row.sort_group,
        meaning: row.meaning,
        infographic_url: row.infographic_url,
        rank_score: row.term.toLowerCase() === normalizedQuery ? 100 : row.term.toLowerCase().startsWith(normalizedQuery) ? 80 : row.term.toLowerCase().includes(normalizedQuery) ? 50 : 0
      }))
      .filter((row) => row.rank_score > 0)
      .sort((left, right) => right.rank_score - left.rank_score || left.term.localeCompare(right.term))
      .slice(0, limit);
  }

  const { data, error } = await supabase
    .from("terminology_entries")
    .select("id,term,sort_group,meaning,infographic_url")
    .eq("is_published", true)
    .ilike("term", `%${trimmedQuery.replace(/[%_]/g, "")}%`)
    .order("importance_score", { ascending: false })
    .order("normalized_term", { ascending: true })
    .limit(Math.max(limit * 4, 20));

  if (error) {
    throw new Error(mapTerminologyError(error.message));
  }

  return ((data ?? []) as TerminologySummary[])
    .map((row) => {
      const term = row.term.toLowerCase();
      const meaning = row.meaning.toLowerCase();
      const rank_score =
        term === normalizedQuery
          ? 100
          : term.startsWith(normalizedQuery)
            ? 85
            : term.includes(normalizedQuery)
              ? 70
              : meaning.includes(normalizedQuery)
                ? 35
                : 0;
      return { ...row, rank_score };
    })
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
  if (!supabase) {
    const local = fallbackRows.find((row) => row.id === id);
    if (!local) {
      throw new Error("Term not found.");
    }
    return local;
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
    throw new Error("Supabase is not configured.");
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



