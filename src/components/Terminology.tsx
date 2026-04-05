import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getTerminologyById,
  listTerminologyPage,
  type TermBucket,
  type TerminologyDetail,
  type TerminologySummary
} from "../lib/terminology";
import { supabase } from "../lib/supabase";
import { safeHttpUrl } from "../lib/urlSafety";
import anaerobicInfographic from "@assets/image_1775373876736.png";
import academyHeroPhoto from "@assets/image_1775373898527.png";

const buckets: TermBucket[] = ["ALL", "#", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const pageSizeOptions = [
  { value: "TOP_100", label: "Top 100" },
  { value: "10", label: "10" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
  { value: "250", label: "250" }
] as const;
type PageSizeMode = (typeof pageSizeOptions)[number]["value"];

function formatDate(isoText: string) {
  const parsed = new Date(isoText);
  if (Number.isNaN(parsed.getTime())) {
    return "Unknown update date";
  }
  return parsed.toLocaleDateString();
}

function shortMeaning(value: string) {
  if (value.length <= 150) {
    return value;
  }
  return `${value.slice(0, 147)}...`;
}

function extractMlaTitle(citation: string): string | null {
  const raw = citation.trim();
  if (!raw) return null;

  const quotedMatch = raw.match(/"([^"]+)"/);
  if (quotedMatch?.[1]) {
    return quotedMatch[1].trim();
  }

  const firstPeriod = raw.indexOf(".");
  if (firstPeriod === -1) return null;
  const afterAuthor = raw.slice(firstPeriod + 1).trim();
  if (!afterAuthor) return null;

  const secondPeriod = afterAuthor.indexOf(".");
  const candidate = secondPeriod === -1 ? afterAuthor : afterAuthor.slice(0, secondPeriod);
  const cleaned = candidate.trim().replace(/\s+/g, " ");
  return cleaned.length > 0 ? cleaned : null;
}

function referenceLabel(sourceTitle: string, citation: string | undefined, index: number, total: number) {
  const citationTitle = citation ? extractMlaTitle(citation) : null;
  const title = citationTitle || sourceTitle.trim() || "Reference source";
  return total > 1 ? `${title} (${index + 1})` : title;
}

function toTitleCaseTerm(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) =>
      word
        .split("-")
        .map((part) => {
          if (!part) return part;
          if (/^[A-Z]{2,4}$/.test(part)) return part;
          return `${part.charAt(0).toUpperCase()}${part.slice(1).toLowerCase()}`;
        })
        .join("-")
    )
    .join(" ");
}

function toTermSlug(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function decodeAmazonSearchTitle(rawUrl: string) {
  try {
    const parsed = new URL(rawUrl);
    if (!parsed.hostname.includes("amazon.")) return null;
    const k = parsed.searchParams.get("k");
    if (!k) return null;
    const decoded = decodeURIComponent(k.replace(/\+/g, " ")).replace(/\s+/g, " ").trim();
    return decoded || null;
  } catch {
    return null;
  }
}

function purchaseLinkLabel(rawUrl: string, index: number) {
  const fromAmazon = decodeAmazonSearchTitle(rawUrl);
  if (fromAmazon) {
    return fromAmazon;
  }

  const safe = safeHttpUrl(rawUrl);
  if (!safe) {
    return `Purchase link ${index + 1}`;
  }

  try {
    const parsed = new URL(safe);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return `Purchase link ${index + 1}`;
  }
}

function uniqueUrls(urls: string[]) {
  const seen = new Set<string>();
  const next: string[] = [];
  for (const url of urls) {
    const value = url.trim();
    if (!value || seen.has(value)) continue;
    seen.add(value);
    next.push(value);
  }
  return next;
}

function buildInfographicCandidates(term: string, url: string | null) {
  const original = String(url || "").trim();
  const candidates: string[] = [];
  const mappedAssets: Record<string, string> = {
    anaerobic: anaerobicInfographic,
    sippy: academyHeroPhoto,
    roma: academyHeroPhoto,
    hummin: academyHeroPhoto
  };

  const slug = toTermSlug(term);
  if (slug in mappedAssets) {
    candidates.push(mappedAssets[slug]);
  }

  if (original) {
    candidates.push(original);
    if (original.startsWith("/infographics/regeneration/") || original.startsWith("/infographics/regeneration 02/") || original.startsWith("/infographics/regeneration%2002/") || original.startsWith("/infographics/")) {
      const filename = original.split("/").pop() || "";
      if (filename) {
        candidates.push(`/infographics/regeneration/${filename}`);
      }
    }
  }

  if (slug) {
    candidates.push(`/infographics/regeneration/${slug}.png`);
  }

  return uniqueUrls(candidates);
}

export function Terminology() {
  const [bucket, setBucket] = useState<TermBucket>("ALL");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [pageSizeMode, setPageSizeMode] = useState<PageSizeMode>("TOP_100");
  const [rows, setRows] = useState<TerminologySummary[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<TerminologyDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");
  const [refreshTick, setRefreshTick] = useState(0);
  const [editorialProcessOpen, setEditorialProcessOpen] = useState(false);
  const [infographicIndex, setInfographicIndex] = useState(0);

  const navigateSelectedTerm = useCallback(
    (direction: 1 | -1) => {
      if (!selectedTermId || rows.length === 0) return;
      const currentIndex = rows.findIndex((row) => row.id === selectedTermId);
      if (currentIndex === -1) return;
      const nextIndex = (currentIndex + direction + rows.length) % rows.length;
      setSelectedTermId(rows[nextIndex].id);
    },
    [rows, selectedTermId]
  );

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");

    const topImportant = pageSizeMode === "TOP_100";
    const pageSize = topImportant ? 100 : Number(pageSizeMode);

    listTerminologyPage({ bucket, query, page: topImportant ? 0 : page, pageSize, topImportant })
      .then((result) => {
        if (!active) return;
        setRows(result.rows);
        setTotal(result.total);
      })
      .catch((loadError: unknown) => {
        if (!active) return;
        setError(loadError instanceof Error ? loadError.message : "Could not load terminology.");
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [bucket, page, pageSizeMode, query, refreshTick]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedTermId(null);
        setEditorialProcessOpen(false);
        return;
      }

      if (!selectedTermId) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigateSelectedTerm(-1);
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        navigateSelectedTerm(1);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [navigateSelectedTerm, selectedTermId]);

  useEffect(() => {
    if (!selectedTermId) {
      setSelectedTerm(null);
      setDetailError("");
      return;
    }

    let active = true;
    setDetailLoading(true);
    setDetailError("");

    getTerminologyById(selectedTermId)
      .then((result) => {
        if (!active) return;
        setSelectedTerm(result);
      })
      .catch((loadError: unknown) => {
        if (!active) return;
        setDetailError(loadError instanceof Error ? loadError.message : "Could not load term details.");
      })
      .finally(() => {
        if (active) {
          setDetailLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [selectedTermId]);

  const infographicCandidates = useMemo(
    () => buildInfographicCandidates(selectedTerm?.term ?? "", selectedTerm?.infographic_url ?? null),
    [selectedTerm?.infographic_url, selectedTerm?.term]
  );
  const infographicSrc = infographicCandidates[infographicIndex] || "";

  useEffect(() => {
    setInfographicIndex(0);
  }, [selectedTerm?.id, selectedTerm?.infographic_url, selectedTerm?.term]);

  return null;
}
