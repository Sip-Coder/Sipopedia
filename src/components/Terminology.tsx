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
  const preferred: string[] = [];
  const compatibility: string[] = [];

  const addPreferredFromFilename = (filename: string) => {
    if (!filename) return;
    preferred.push(`/infographics/regeneration/${filename}`);
  };

  if (original && original.startsWith("/infographics/regeneration/")) {
    preferred.push(original);
    const filename = original.split("/").pop() || "";
    addPreferredFromFilename(filename);
  } else if (original) {
    if (original.startsWith("/infographics/regeneration 02/") || original.startsWith("/infographics/regeneration%2002/")) {
      const filename = original.split("/").pop() || "";
      addPreferredFromFilename(filename);
    } else if (original.startsWith("/infographics/")) {
      const filename = original.split("/").pop() || "";
      addPreferredFromFilename(filename);
    } else {
      compatibility.push(original);
    }
  }

  const slug = toTermSlug(term);
  if (slug) {
    preferred.push(`/infographics/regeneration/${slug}.png`);
  }

  if (original && !original.startsWith("/infographics/regeneration/")) {
    compatibility.push(original);
  }

  return uniqueUrls([...preferred, ...compatibility]);
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
      .then((value) => {
        if (!active) return;
        setSelectedTerm(value);
      })
      .catch((loadError: unknown) => {
        if (!active) return;
        setDetailError(loadError instanceof Error ? loadError.message : "Could not load term.");
      })
      .finally(() => {
        if (active) {
          setDetailLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [selectedTermId, refreshTick]);

  useEffect(() => {
    const client = supabase;
    if (!client) return;

    const channel = client
      .channel("terminology-live-updates")
      .on("postgres_changes", { event: "*", schema: "public", table: "terminology_entries" }, () => {
        setRefreshTick((value) => value + 1);
      })
      .subscribe();

    return () => {
      void client.removeChannel(channel);
    };
  }, []);

  const topImportant = pageSizeMode === "TOP_100";
  const topAllByLetter = topImportant && bucket === "ALL";
  const effectivePageSize = topAllByLetter ? 104 : topImportant ? 100 : Number(pageSizeMode);
  const pageCount = useMemo(() => Math.max(1, Math.ceil(total / effectivePageSize)), [effectivePageSize, total]);
  const infographicCandidates = useMemo(
    () => buildInfographicCandidates(selectedTerm?.term ?? "", selectedTerm?.infographic_url ?? null),
    [selectedTerm?.infographic_url, selectedTerm?.term]
  );
  const infographicSrc = infographicCandidates[infographicIndex] || "";

  useEffect(() => {
    setInfographicIndex(0);
  }, [selectedTerm?.id, selectedTerm?.infographic_url, selectedTerm?.term]);

  const handlePrevious = () => {
    setPage((value) => Math.max(0, value - 1));
  };

  const handleNext = () => {
    if (topImportant) {
      setPageSizeMode("100");
      setPage(0);
      return;
    }
    setPage((value) => Math.min(pageCount - 1, value + 1));
  };

  const renderPagination = (className?: string) => (
    <div className={`terminology-pagination${className ? ` ${className}` : ""}`}>
      <button className="btn btn-light" onClick={handlePrevious} disabled={topImportant || page === 0}>
        Previous
      </button>
      <span className="pagination-sep" aria-hidden="true">
        |
      </span>
      <span>
        Page {page + 1} of {pageCount} ({total.toLocaleString()} terms)
      </span>
      <span className="pagination-sep" aria-hidden="true">
        |
      </span>
      <button className="btn btn-light" onClick={handleNext} disabled={topImportant ? false : page >= pageCount - 1}>
        Next
      </button>
    </div>
  );

  return (
    <section className="terminology">
      <div className="section-header">
        <div className="section-header-copy">
          <h2>Terminology</h2>
          <p>
            Book-sourced beverage definitions with full attribution, practical guidance, references, examples, and citations.
            All Sipopedia entries are original editorial rewrites (no verbatim source excerpts).
            Sorted as # first, then A-Z.
          </p>
        </div>
        <button type="button" className="btn btn-light section-header-action" onClick={() => setEditorialProcessOpen(true)}>
          Editorial Process
        </button>
      </div>

      <div className="terminology-layout">
        <aside className="terminology-sidebar" aria-label="Terminology filters">
          <div className="terminology-search">
            <label htmlFor="term-search">Search</label>
            <div className="search-input-wrap">
              <input
                id="term-search"
                value={query}
                onChange={(event) => {
                  const nextQuery = event.target.value;
                  const hadQuery = query.trim().length > 0;
                  const hasQuery = nextQuery.trim().length > 0;
                  if (!hadQuery && hasQuery) {
                    setBucket("ALL");
                  }
                  setQuery(nextQuery);
                  setPage(0);
                }}
                placeholder="Search by term name"
              />
              {query.trim().length > 0 ? (
                <button
                  type="button"
                  className="search-clear-btn"
                  aria-label="Clear search"
                  onClick={() => {
                    setQuery("");
                    setPage(0);
                  }}
                >
                  x
                </button>
              ) : null}
            </div>
          </div>

          <div className="terminology-controls">
            <label htmlFor="term-page-size">Terms per page</label>
            <select
              id="term-page-size"
              value={pageSizeMode}
              onChange={(event) => {
                setPageSizeMode(event.target.value as PageSizeMode);
                setPage(0);
              }}
            >
              {pageSizeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="terminology-bucket-grid" role="tablist" aria-label="Term buckets">
            {buckets.map((item) => (
              <button
                key={item}
                role="tab"
                aria-selected={item === bucket}
                className={`bucket-pill terminology-bucket-pill ${item === bucket ? "active" : ""}`}
                onClick={() => {
                  setBucket(item);
                  setPage(0);
                }}
              >
                {item === "ALL" ? "All" : item}
              </button>
            ))}
          </div>
        </aside>

        <div className="terminology-main">
          {renderPagination("terminology-pagination-top")}

                <div className="terminology-list">
            {loading ? <p>Loading terms...</p> : null}
            {error ? <p className="error">{error}</p> : null}
            {!loading && !error && rows.length === 0 ? <p>No terms found for this bucket and query.</p> : null}
            {!loading && !error
              ? rows.map((row) => (
                  <button key={row.id} className="term-row" onClick={() => setSelectedTermId(row.id)}>
                    <div>
                      <h3>{toTitleCaseTerm(row.term)}</h3>
                      <p>{shortMeaning(row.meaning)}</p>
                    </div>
                    <span className="term-row-tag">{row.sort_group}</span>
                  </button>
                ))
              : null}
          </div>

          {renderPagination()}
        </div>
      </div>

      {selectedTermId ? (
        <div className="term-modal-overlay" onClick={() => setSelectedTermId(null)}>
          <article className="term-modal" onClick={(event) => event.stopPropagation()}>
            {detailLoading ? <p>Loading term details...</p> : null}
            {detailError ? <p className="error">{detailError}</p> : null}
            {!detailLoading && !detailError && selectedTerm ? (
              <>
                <header className="term-modal-header">
                  <div>
                    <p className="lesson-chip">Term {selectedTerm.sort_group}</p>
                    <h3>{toTitleCaseTerm(selectedTerm.term)}</h3>
                    <p>Updated: {formatDate(selectedTerm.updated_at)}</p>
                  </div>
                  <button className="btn btn-light" onClick={() => setSelectedTermId(null)}>
                    Close
                  </button>
                </header>

                <div className="term-modal-grid">
                  <section>
                    <h4>Meaning</h4>
                    <p>{selectedTerm.meaning}</p>
                    <h4>How to apply in Beverage Study</h4>
                    <p>{selectedTerm.how_to_apply}</p>
                    <h4>Real-world Example</h4>
                    <ul>
                      {selectedTerm.examples.map((item) => (
                        <li key={`example-${item}`}>{item}</li>
                      ))}
                    </ul>
                  </section>

                  <aside>
                    <h4>Book source</h4>
                    <p>
                      <strong>Title:</strong> {selectedTerm.source_title || "Not set"}
                    </p>
                    <h4>Authors</h4>
                    {selectedTerm.source_authors.length > 0 ? (
                      <ul>
                        {selectedTerm.source_authors.map((author) => (
                          <li key={author}>{author}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="hint">No source authors attached yet.</p>
                    )}

                    <h4>Infographic</h4>
                    {infographicSrc ? (
                      <div className="term-infographic-wrap">
                        <img
                          className="term-infographic"
                          src={infographicSrc}
                          alt={selectedTerm.term}
                          onError={(event) => {
                            event.preventDefault();
                            setInfographicIndex((current) => {
                              const next = current + 1;
                              return next < infographicCandidates.length ? next : current;
                            });
                          }}
                        />
                        <a
                          className="btn btn-light term-infographic-download"
                          href={infographicSrc}
                          download={`${selectedTerm.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-infographic.png`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Download Infographic
                        </a>
                      </div>
                    ) : (
                      <p className="hint">No infographic URL added yet.</p>
                    )}
                    {selectedTerm.infographic_caption ? <p className="hint">{selectedTerm.infographic_caption}</p> : null}

                    <h4>Purchase links</h4>
                    {selectedTerm.purchase_links.length > 0 ? (
                      <ul>
                        {selectedTerm.purchase_links.map((link, index) => {
                          const safeLink = safeHttpUrl(link);
                          return (
                            <li key={`${link}-${index}`}>
                              {safeLink ? (
                                <a href={safeLink} target="_blank" rel="noreferrer">
                                  {purchaseLinkLabel(link, index)}
                                </a>
                              ) : (
                                <span className="hint">{link}</span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="hint">No purchase links attached yet.</p>
                    )}

                    <h4>References</h4>
                    {selectedTerm.reference_links.length > 0 ? (
                      <ul>
                        {selectedTerm.reference_links.map((link, index) => {
                          const safeLink = safeHttpUrl(link);
                          return (
                            <li key={link}>
                              {safeLink ? (
                                <a href={safeLink} target="_blank" rel="noreferrer">
                                  {referenceLabel(
                                    selectedTerm.source_title,
                                    selectedTerm.mla_citations[index],
                                    index,
                                    selectedTerm.reference_links.length
                                  )}
                                </a>
                              ) : (
                                <span className="hint">{link}</span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="hint">No verified references attached yet.</p>
                    )}
                    <h4>MLA citations</h4>
                    {selectedTerm.mla_citations.length > 0 ? (
                      <ul>
                        {selectedTerm.mla_citations.map((citation) => (
                          <li key={citation}>{citation}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="hint">No MLA citation recorded for this term yet.</p>
                    )}
                    <h4>Editorial policy</h4>
                    <p>Original editorial definition. No verbatim source excerpts are published in Sipopedia.</p>
                  </aside>
                </div>
              </>
            ) : null}
          </article>
        </div>
      ) : null}

      {editorialProcessOpen ? (
        <div className="term-modal-overlay" onClick={() => setEditorialProcessOpen(false)}>
          <article className="term-modal editorial-process-modal" onClick={(event) => event.stopPropagation()}>
            <header className="term-modal-header">
              <div>
                <p className="lesson-chip">Sipopedia Standard</p>
                <h3>Editorial Process</h3>
                <p>How Sipopedia uses AI-assisted editorial production to scale beverage knowledge responsibly.</p>
              </div>
              <button className="btn btn-light" onClick={() => setEditorialProcessOpen(false)}>
                Close
              </button>
            </header>

            <div className="editorial-process-body">
              <p>
                Sipopedia uses AI as a drafting tool, not as a source authority. We use it to accelerate first-pass glossary production across wine,
                beer, spirits, coffee, tea, water, dairy, juice, kombucha, and other beverage categories where the vocabulary load is large and growing.
              </p>
              <p>
                Each published definition is written as original editorial prose. The goal is not to reproduce another author&apos;s sentence, but to distill
                the professional meaning of a term into clear language that works for service, tasting, production, retail, and study.
              </p>
              <ul>
                <li>We draft definitions in a professional beverage voice designed for working users and serious learners.</li>
                <li>We cite respected books and reference works so users can see the intellectual lineage behind the topic.</li>
                <li>We include purchase links to help redirect readers toward the original authors and publishers who built the field.</li>
                <li>We do not publish verbatim source excerpts as glossary definitions inside Sipopedia.</li>
              </ul>
              <p>
                The result is a community-facing knowledge layer: original definitions for fast understanding, plus transparent citation and author credit
                for deeper study. Sipopedia is intended to widen access without obscuring provenance.
              </p>
            </div>
          </article>
        </div>
      ) : null}
    </section>
  );
}

