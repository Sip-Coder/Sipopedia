import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import {
  getTerminologyById,
  listTerminologyPage,
  upsertTerminologyEntry,
  type TermBucket,
  type TerminologySummary
} from "../lib/terminology";

const buckets: TermBucket[] = ["#", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const pageSize = 30;

type EditState = {
  id: string | null;
  term: string;
  meaning: string;
  howToApply: string;
  examples: string;
  otherIdeas: string;
  referenceLinks: string;
  mlaCitations: string;
  sourceTitle: string;
  sourceAuthors: string;
  purchaseLinks: string;
  infographicUrl: string;
  infographicCaption: string;
  sourceNote: string;
  isPublished: boolean;
};

const emptyState: EditState = {
  id: null,
  term: "",
  meaning: "",
  howToApply: "",
  examples: "",
  otherIdeas: "",
  referenceLinks: "",
  mlaCitations: "",
  sourceTitle: "",
  sourceAuthors: "",
  purchaseLinks: "",
  infographicUrl: "",
  infographicCaption: "",
  sourceNote: "",
  isPublished: false
};

function toLineArray(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function fromLineArray(values: string[] | undefined) {
  return (values ?? []).join("\n");
}

export function TerminologyAdmin() {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  const [bucket, setBucket] = useState<TermBucket>("#");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState<TerminologySummary[]>([]);
  const [total, setTotal] = useState(0);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState("");
  const [edit, setEdit] = useState<EditState>(emptyState);
  const [saveState, setSaveState] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;

    if (!supabase || !user) {
      setIsAdmin(false);
      setAdminLoading(false);
      return;
    }

    const client = supabase;
    setAdminLoading(true);
    const run = async () => {
      try {
        const { data, error } = await client.from("profiles").select("role").eq("id", user.id).single();
        if (!active) return;
        if (error) {
          setIsAdmin(false);
          return;
        }
        setIsAdmin(data?.role === "admin");
      } finally {
        if (active) {
          setAdminLoading(false);
        }
      }
    };
    void run();

    return () => {
      active = false;
    };
  }, [user]);

  useEffect(() => {
    if (!isAdmin) return;
    let active = true;
    setListLoading(true);
    setListError("");

    listTerminologyPage({ bucket, query, page, pageSize, includeUnpublished: true })
      .then((result) => {
        if (!active) return;
        setRows(result.rows);
        setTotal(result.total);
      })
      .catch((error: unknown) => {
        if (!active) return;
        setListError(error instanceof Error ? error.message : "Could not load terms.");
      })
      .finally(() => {
        if (active) setListLoading(false);
      });

    return () => {
      active = false;
    };
  }, [bucket, isAdmin, page, query]);

  const pageCount = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total]);

  const openForEdit = async (id: string) => {
    setSaveState("");
    try {
      const detail = await getTerminologyById(id);
      setEdit({
        id: detail.id,
        term: detail.term,
        meaning: detail.meaning,
        howToApply: detail.how_to_apply,
        examples: fromLineArray(detail.examples),
        otherIdeas: fromLineArray(detail.other_ideas),
        referenceLinks: fromLineArray(detail.reference_links),
        mlaCitations: fromLineArray(detail.mla_citations),
        sourceTitle: detail.source_title,
        sourceAuthors: fromLineArray(detail.source_authors),
        purchaseLinks: fromLineArray(detail.purchase_links),
        infographicUrl: detail.infographic_url ?? "",
        infographicCaption: detail.infographic_caption ?? "",
        sourceNote: detail.source_note ?? "",
        isPublished: detail.is_published ?? true
      });
    } catch (error: unknown) {
      setSaveState(error instanceof Error ? error.message : "Could not load term.");
    }
  };

  const saveTerm = async () => {
    if (!edit.term.trim() || !edit.meaning.trim()) {
      setSaveState("Term and meaning are required.");
      return;
    }

    const referenceLinks = toLineArray(edit.referenceLinks);
    const mlaCitations = toLineArray(edit.mlaCitations);
    const sourceAuthors = toLineArray(edit.sourceAuthors);
    const purchaseLinks = toLineArray(edit.purchaseLinks);
    if (!edit.sourceTitle.trim() || referenceLinks.length === 0 || mlaCitations.length === 0 || sourceAuthors.length === 0 || purchaseLinks.length === 0) {
      setSaveState("Source title, source authors, references, MLA citations, and purchase links are required.");
      return;
    }

    setSaving(true);
    setSaveState("");

    try {
      const id = await upsertTerminologyEntry({
        id: edit.id ?? undefined,
        term: edit.term,
        meaning: edit.meaning,
        how_to_apply: edit.howToApply,
        examples: toLineArray(edit.examples),
        other_ideas: toLineArray(edit.otherIdeas),
        reference_links: referenceLinks,
        mla_citations: mlaCitations,
        source_title: edit.sourceTitle,
        source_authors: sourceAuthors,
        purchase_links: purchaseLinks,
        infographic_url: edit.infographicUrl.trim() || null,
        infographic_caption: edit.infographicCaption.trim() || null,
        source_note: edit.sourceNote.trim() || null,
        is_published: edit.isPublished
      });

      setEdit((current) => ({ ...current, id }));
      setSaveState("Saved successfully.");
      const refreshed = await listTerminologyPage({ bucket, query, page, pageSize, includeUnpublished: true });
      setRows(refreshed.rows);
      setTotal(refreshed.total);
    } catch (error: unknown) {
      setSaveState(error instanceof Error ? error.message : "Could not save term.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || adminLoading) {
    return (
      <section className="terminology">
        <p>Checking session and admin permissions...</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="terminology">
        <h2>Terminology Admin</h2>
        <p className="error">Sign in first. Admin editing is available only to authenticated admin accounts.</p>
      </section>
    );
  }

  if (!isAdmin) {
    return (
      <section className="terminology">
        <h2>Terminology Admin</h2>
        <p className="error">Admin access required. Update your profile role to admin in Supabase to edit terms.</p>
      </section>
    );
  }

  return (
    <section className="terminology">
      <div className="section-header">
        <h2>Terminology Admin</h2>
        <p>Create, edit, publish, and maintain encyclopedic term entries in Supabase. Policy: original writing only, no verbatim excerpts.</p>
      </div>

      <div className="terminology-admin-layout">
        <aside className="terminology-admin-list">
          <div className="terminology-search">
            <label htmlFor="admin-term-search">Search terms</label>
            <input
              id="admin-term-search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(0);
              }}
              placeholder="Search by term name"
            />
          </div>

          <div className="bucket-strip">
            {buckets.map((item) => (
              <button
                key={item}
                className={`bucket-pill ${item === bucket ? "active" : ""}`}
                onClick={() => {
                  setBucket(item);
                  setPage(0);
                }}
              >
                {item}
              </button>
            ))}
          </div>

          <button className="btn btn-primary" onClick={() => setEdit(emptyState)}>
            New term
          </button>

          <div className="terminology-list">
            {listLoading ? <p>Loading...</p> : null}
            {listError ? <p className="error">{listError}</p> : null}
            {!listLoading &&
              rows.map((row) => (
                <button key={row.id} className="term-row" onClick={() => void openForEdit(row.id)}>
                  <div>
                    <h3>{row.term}</h3>
                    <p>{row.meaning.slice(0, 120)}...</p>
                  </div>
                  <span className="term-row-tag">{row.sort_group}</span>
                </button>
              ))}
          </div>

          <div className="terminology-pagination">
            <button className="btn btn-light" onClick={() => setPage((value) => Math.max(0, value - 1))} disabled={page === 0}>
              Previous
            </button>
            <span>
              Page {page + 1} of {pageCount}
            </span>
            <button
              className="btn btn-light"
              onClick={() => setPage((value) => Math.min(pageCount - 1, value + 1))}
              disabled={page >= pageCount - 1}
            >
              Next
            </button>
          </div>
        </aside>

        <article className="terminology-admin-form">
          <div className="terminology-admin-row">
            <label>Term</label>
            <input value={edit.term} onChange={(event) => setEdit((current) => ({ ...current, term: event.target.value }))} />
          </div>

          <div className="terminology-admin-row">
            <label>Meaning</label>
            <textarea value={edit.meaning} rows={4} onChange={(event) => setEdit((current) => ({ ...current, meaning: event.target.value }))} />
          </div>

          <div className="terminology-admin-row">
            <label>How to apply</label>
            <textarea
              value={edit.howToApply}
              rows={4}
              onChange={(event) => setEdit((current) => ({ ...current, howToApply: event.target.value }))}
            />
          </div>

          <div className="terminology-admin-row">
            <label>Examples (one per line)</label>
            <textarea value={edit.examples} rows={4} onChange={(event) => setEdit((current) => ({ ...current, examples: event.target.value }))} />
          </div>

          <div className="terminology-admin-row">
            <label>Other ideas (one per line)</label>
            <textarea
              value={edit.otherIdeas}
              rows={4}
              onChange={(event) => setEdit((current) => ({ ...current, otherIdeas: event.target.value }))}
            />
          </div>

          <div className="terminology-admin-row">
            <label>Source title (book)</label>
            <input
              value={edit.sourceTitle}
              onChange={(event) => setEdit((current) => ({ ...current, sourceTitle: event.target.value }))}
            />
          </div>

          <div className="terminology-admin-row">
            <label>Source authors (one per line)</label>
            <textarea
              value={edit.sourceAuthors}
              rows={3}
              onChange={(event) => setEdit((current) => ({ ...current, sourceAuthors: event.target.value }))}
            />
          </div>

          <div className="terminology-admin-row">
            <label>Purchase links (Amazon or reseller; one URL per line)</label>
            <textarea
              value={edit.purchaseLinks}
              rows={3}
              onChange={(event) => setEdit((current) => ({ ...current, purchaseLinks: event.target.value }))}
            />
          </div>

          <div className="terminology-admin-row">
            <label>Reference links (one URL per line)</label>
            <textarea
              value={edit.referenceLinks}
              rows={3}
              onChange={(event) => setEdit((current) => ({ ...current, referenceLinks: event.target.value }))}
            />
          </div>

          <div className="terminology-admin-row">
            <label>MLA citations (one citation per line)</label>
            <textarea
              value={edit.mlaCitations}
              rows={4}
              onChange={(event) => setEdit((current) => ({ ...current, mlaCitations: event.target.value }))}
            />
          </div>

          <div className="terminology-admin-row">
            <label>Infographic URL</label>
            <input
              value={edit.infographicUrl}
              onChange={(event) => setEdit((current) => ({ ...current, infographicUrl: event.target.value }))}
            />
          </div>

          <div className="terminology-admin-row">
            <label>Infographic caption</label>
            <input
              value={edit.infographicCaption}
              onChange={(event) => setEdit((current) => ({ ...current, infographicCaption: event.target.value }))}
            />
          </div>

          <div className="terminology-admin-row">
            <label>Source note</label>
            <textarea value={edit.sourceNote} rows={3} onChange={(event) => setEdit((current) => ({ ...current, sourceNote: event.target.value }))} />
          </div>

          <label className="terminology-admin-toggle">
            <input
              type="checkbox"
              checked={edit.isPublished}
              onChange={(event) => setEdit((current) => ({ ...current, isPublished: event.target.checked }))}
            />
            Published
          </label>

          <div className="terminology-admin-actions">
            <button className="btn btn-primary" onClick={() => void saveTerm()} disabled={saving}>
              {saving ? "Saving..." : "Save term"}
            </button>
          </div>

          {saveState ? <p className="hint">{saveState}</p> : null}
        </article>
      </div>
    </section>
  );
}
