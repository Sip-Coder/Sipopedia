import { useEffect, useMemo, useState } from "react";
import {
  getTerminologyById,
  listTerminologyPage,
  type TermBucket,
  type TerminologyDetail,
  type TerminologySummary
} from "../lib/terminology";
import { supabase } from "../lib/supabase";

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
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

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
        <h2>Terminology</h2>
        <p>
          Book-sourced beverage definitions with full attribution, purchase links, practical guidance, references, examples, and related ideas.
          All Sipopedia entries are original editorial rewrites (no verbatim source excerpts).
          Sorted as # first, then A-Z.
        </p>
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
                      <h3>{row.term}</h3>
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
                    <h3>{selectedTerm.term}</h3>
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
                    <h4>How to apply it</h4>
                    <p>{selectedTerm.how_to_apply}</p>
                    <h4>Examples</h4>
                    <ul>
                      {selectedTerm.examples.map((item) => (
                        <li key={`example-${item}`}>{item}</li>
                      ))}
                    </ul>
                    <h4>Other ideas</h4>
                    <ul>
                      {selectedTerm.other_ideas.map((item) => (
                        <li key={`idea-${item}`}>{item}</li>
                      ))}
                    </ul>
                  </section>

                  <aside>
                    <h4>Book source</h4>
                    <p>
                      <strong>Title:</strong> {selectedTerm.source_title}
                    </p>
                    {selectedTerm.source_authors.length > 0 ? (
                      <>
                        <p>
                          <strong>Authors:</strong>
                        </p>
                        <ul>
                          {selectedTerm.source_authors.map((author) => (
                            <li key={author}>{author}</li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <p className="hint">No source authors attached yet.</p>
                    )}

                    <h4>Purchase links</h4>
                    {selectedTerm.purchase_links.length > 0 ? (
                      <>
                        <ul>
                          {selectedTerm.purchase_links.map((link) => (
                            <li key={link}>
                              <a href={link} target="_blank" rel="noreferrer">
                                {link}
                              </a>
                            </li>
                          ))}
                        </ul>
                        <p className="hint">As an Amazon Associate I earn from qualifying purchases.</p>
                      </>
                    ) : (
                      <p className="hint">No purchase links attached yet.</p>
                    )}

                    <h4>Infographic</h4>
                    {selectedTerm.infographic_url ? (
                      <img className="term-infographic" src={selectedTerm.infographic_url} alt={selectedTerm.term} />
                    ) : (
                      <p className="hint">No infographic URL added yet.</p>
                    )}
                    {selectedTerm.infographic_caption ? <p className="hint">{selectedTerm.infographic_caption}</p> : null}

                    <h4>References</h4>
                    {selectedTerm.reference_links.length > 0 ? (
                      <ul>
                        {selectedTerm.reference_links.map((link) => (
                          <li key={link}>
                            <a href={link} target="_blank" rel="noreferrer">
                              {link}
                            </a>
                          </li>
                        ))}
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
                    {selectedTerm.source_note ? (
                      <>
                        <h4>Source note</h4>
                        <p>{selectedTerm.source_note}</p>
                      </>
                    ) : null}
                  </aside>
                </div>
              </>
            ) : null}
          </article>
        </div>
      ) : null}
    </section>
  );
}

