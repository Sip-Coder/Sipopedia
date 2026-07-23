import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  analyzeCellarText,
  buildCellarMetadataBrief,
  buildCellarTastingFeedbackPacket,
  buildCellarTastingFeedbackProfile,
  CELLAR_SCANNER_EVENT,
  cellarMetadataProfileForRecord,
  cellarRecommendationsForRecord,
  cellarStudyLinksForRecord,
  emptyCellarTastingFeedbackDraft,
  isCloudCellarRecordId,
  listCloudCellarScanRecords,
  readCellarScanRecords,
  saveCloudCellarScanRecord,
  saveCellarScanRecord,
  updateCloudCellarScanRecordQuantity,
  writeCellarScanRecords,
  type CellarBeverageType,
  type CellarScanDraft,
  type CellarScanRecord,
  type CellarScanSource,
  type CellarTastingFeedbackDraft
} from "../lib/cellarScanner";

type OcrStatus = "idle" | "reading" | "done" | "failed";
type CaptureTarget = "front" | "back" | "shelf";

const emptyDraft: CellarScanDraft = {
  sourceType: "label",
  rawText: "",
  beverageType: "wine",
  producer: "",
  name: "",
  vintage: "",
  region: "",
  country: "",
  grapeOrStyle: "",
  abv: "",
  cellarSlot: "",
  quantity: 1,
  rating: 0,
  pairingNeed: "",
  notes: ""
};

const sourceOptions: Array<{ value: CellarScanSource; label: string }> = [
  { value: "label", label: "Bottle label" },
  { value: "menu", label: "Menu / wine list" },
  { value: "manual", label: "Manual note" }
];

const beverageOptions: Array<{ value: CellarBeverageType; label: string }> = [
  { value: "wine", label: "Wine" },
  { value: "beer", label: "Beer" },
  { value: "spirits", label: "Spirits" },
  { value: "other", label: "Other" }
];

const captureTargetOptions: Array<{ value: CaptureTarget; label: string; detail: string }> = [
  { value: "front", label: "Front", detail: "Producer, name, region, style" },
  { value: "back", label: "Back", detail: "Importer, ABV, grape, service notes" },
  { value: "shelf", label: "Shelf", detail: "Price, store notes, pairing clue" }
];

function downloadTextFile(filename: string, content: string, type: string): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function safeFileSlug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 64) || "cellar-metadata";
}

function Field({
  label,
  value,
  onChange,
  type = "text"
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label>
      {label}
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

export function CellarScanner({ onNavigate }: { onNavigate: (route: string) => void }) {
  const { user, loading: authLoading, isConfigured: isAuthConfigured } = useAuth();
  const [draft, setDraft] = useState<CellarScanDraft>(emptyDraft);
  const [records, setRecords] = useState<CellarScanRecord[]>(() => readCellarScanRecords());
  const [activeRecordId, setActiveRecordId] = useState<string | null>(null);
  const [captureTarget, setCaptureTarget] = useState<CaptureTarget>("front");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [ocrStatus, setOcrStatus] = useState<OcrStatus>("idle");
  const [ocrMessage, setOcrMessage] = useState("Upload a label or paste menu text to start.");
  const [cloudStatus, setCloudStatus] = useState("");
  const [cloudLoading, setCloudLoading] = useState(false);
  const [savingRecord, setSavingRecord] = useState(false);
  const [syncingRecordId, setSyncingRecordId] = useState<string | null>(null);
  const [feedbackDraft, setFeedbackDraft] = useState<CellarTastingFeedbackDraft>(() => emptyCellarTastingFeedbackDraft());
  const [stage, setStage] = useState<"scan" | "verify" | "next">("scan");
  const studyLinks = useMemo(() => cellarStudyLinksForRecord(draft), [draft]);
  const recommendations = useMemo(() => cellarRecommendationsForRecord(draft), [draft]);
  const metadataProfile = useMemo(() => cellarMetadataProfileForRecord(draft), [draft]);
  const tastingFeedback = useMemo(() => buildCellarTastingFeedbackProfile(draft, feedbackDraft), [draft, feedbackDraft]);
  const totalBottles = records.reduce((sum, record) => sum + record.quantity, 0);
  const topRecord = records.find((record) => record.rating > 0) ?? records[0] ?? null;

  useEffect(() => {
    const refresh = () => setRecords(readCellarScanRecords());
    window.addEventListener(CELLAR_SCANNER_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(CELLAR_SCANNER_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  useEffect(() => {
    if (authLoading) {
      setCloudStatus("Checking cellar sync...");
      return;
    }

    if (!isAuthConfigured) {
      setCloudLoading(false);
      setCloudStatus("Local cellar mode. Supabase configuration is required for cloud sync.");
      return;
    }

    if (!user) {
      setCloudLoading(false);
      setCloudStatus("Sign in to sync cellar records across devices.");
      return;
    }

    let cancelled = false;
    setCloudLoading(true);
    setCloudStatus("Syncing cloud cellar...");
    listCloudCellarScanRecords()
      .then((cloudRecords) => {
        if (cancelled) return;
        const localRecords = readCellarScanRecords();
        const localOnly = localRecords.filter((record) => !record.cloudBacked && !isCloudCellarRecordId(record.id));
        const nextRecords = [...cloudRecords, ...localOnly].slice(0, 120);
        setRecords(writeCellarScanRecords(nextRecords));
        setCloudStatus(
          cloudRecords.length
            ? `${cloudRecords.length} cloud cellar record${cloudRecords.length === 1 ? "" : "s"} synced.`
            : "Cloud cellar ready. Save a scan while signed in to sync it."
        );
      })
      .catch((error: unknown) => {
        if (!cancelled) setCloudStatus(`Cloud cellar sync paused: ${error instanceof Error ? error.message : "Unknown error"}`);
      })
      .finally(() => {
        if (!cancelled) setCloudLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [authLoading, isAuthConfigured, user?.id]);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl("");
      return;
    }
    const nextUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(nextUrl);
    return () => URL.revokeObjectURL(nextUrl);
  }, [selectedFile]);

  const updateDraft = <K extends keyof CellarScanDraft>(key: K, value: CellarScanDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const updateFeedbackDraft = <K extends keyof CellarTastingFeedbackDraft>(key: K, value: CellarTastingFeedbackDraft[K]) => {
    setFeedbackDraft((current) => ({ ...current, [key]: value }));
  };

  const analyzeCurrentText = () => {
    const next = analyzeCellarText(draft.rawText, draft.sourceType);
    setDraft((current) => ({
      ...current,
      ...next,
      cellarSlot: current.cellarSlot,
      quantity: current.quantity,
      rating: current.rating,
      pairingNeed: current.pairingNeed,
      notes: current.notes
    }));
    setOcrStatus("done");
    setOcrMessage("Text analyzed. Review the extracted fields before saving.");
    setStage("verify");
  };

  const runOcr = async () => {
    if (!selectedFile) {
      setOcrStatus("failed");
      setOcrMessage("Choose an image first.");
      return;
    }
    setOcrStatus("reading");
    setOcrMessage("Reading label image. You can still paste text manually if OCR misses details.");
    try {
      const { recognize } = await import("tesseract.js");
      const result = await recognize(selectedFile, "eng");
      const text = result.data.text.trim();
      const labeledText = text ? `${captureTarget.toUpperCase()} LABEL\n${text}` : "";
      const combinedText = [draft.rawText, labeledText].filter(Boolean).join("\n\n");
      const next = analyzeCellarText(combinedText, draft.sourceType);
      setDraft((current) => ({
        ...current,
        ...next,
        rawText: combinedText,
        cellarSlot: current.cellarSlot,
        quantity: current.quantity,
        rating: current.rating,
        pairingNeed: current.pairingNeed,
        notes: current.notes
      }));
      setOcrStatus("done");
      setOcrMessage(text ? `${captureTargetOptions.find((option) => option.value === captureTarget)?.label ?? "Label"} OCR appended. Capture the next side or review fields before saving.` : "OCR finished but found little text. Try a sharper image or paste text.");
      setStage("verify");
    } catch {
      setOcrStatus("failed");
      setOcrMessage("OCR could not complete in this browser session. Paste label or menu text and run Analyze Text.");
    }
  };

  const saveDraft = () => {
    const saveLocalRecord = (message: string) => {
      const nextRecords = saveCellarScanRecord(draft, activeRecordId);
      setRecords(nextRecords);
      setActiveRecordId(nextRecords[0]?.id ?? null);
      setOcrStatus("done");
      setOcrMessage(message);
      setStage("next");
    };

    if (isAuthConfigured && user) {
      setSavingRecord(true);
      setCloudStatus("Saving cellar record to cloud...");
      void saveCloudCellarScanRecord(user.id, draft, activeRecordId)
        .then((cloudRecord) => {
          const nextRecords = writeCellarScanRecords([cloudRecord, ...records.filter((record) => record.id !== cloudRecord.id && record.id !== activeRecordId)].slice(0, 120));
          setRecords(nextRecords);
          setActiveRecordId(cloudRecord.id);
          setOcrStatus("done");
          setOcrMessage("Saved to cloud cellar. Open the study route or create a tasting note next.");
          setCloudStatus("Cloud cellar sync active.");
          setStage("next");
        })
        .catch((error: unknown) => {
          saveLocalRecord(`Cloud save failed, so the record is saved locally: ${error instanceof Error ? error.message : "Unknown error"}`);
          setCloudStatus("Cloud cellar sync paused.");
        })
        .finally(() => setSavingRecord(false));
      return;
    }

    saveLocalRecord(
      isAuthConfigured
        ? "Saved locally. Sign in to sync this cellar record across devices."
        : "Saved locally. Configure Supabase to enable cloud cellar sync."
    );
  };

  const loadRecord = (record: CellarScanRecord) => {
    setActiveRecordId(record.id);
    setDraft({
      sourceType: record.sourceType,
      rawText: record.rawText,
      beverageType: record.beverageType,
      producer: record.producer,
      name: record.name,
      vintage: record.vintage,
      region: record.region,
      country: record.country,
      grapeOrStyle: record.grapeOrStyle,
      abv: record.abv,
      cellarSlot: record.cellarSlot,
      quantity: record.quantity,
      rating: record.rating,
      pairingNeed: record.pairingNeed,
      notes: record.notes
    });
    setFeedbackDraft((current) => ({
      ...current,
      serviceIntent: current.serviceIntent || record.pairingNeed,
      conclusion: current.conclusion || record.notes
    }));
    setStage("verify");
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const downloadMetadataBrief = () => {
    const label = draft.name || draft.producer || draft.grapeOrStyle || "cellar-metadata";
    downloadTextFile(
      `sip-studies-${safeFileSlug(label)}-metadata.md`,
      buildCellarMetadataBrief(draft),
      "text/markdown;charset=utf-8"
    );
    setOcrStatus("done");
    setOcrMessage("Metadata brief downloaded for external lookup and study review.");
  };

  const downloadTastingFeedbackPacket = () => {
    const label = tastingFeedback.title || draft.name || draft.producer || draft.grapeOrStyle || "tasting-feedback";
    downloadTextFile(
      `sip-studies-${safeFileSlug(label)}-tasting-feedback.md`,
      buildCellarTastingFeedbackPacket(draft, feedbackDraft),
      "text/markdown;charset=utf-8"
    );
    setOcrStatus("done");
    setOcrMessage("Tasting feedback packet downloaded for mentor review or journal cleanup.");
  };

  const adjustQuantity = async (record: CellarScanRecord, quantity: number) => {
    const nextQuantity = Math.max(0, quantity);
    if (record.cloudBacked && isAuthConfigured && user && isCloudCellarRecordId(record.id)) {
      setSyncingRecordId(record.id);
      setCloudStatus("Syncing cellar quantity...");
      try {
        const cloudRecord = await updateCloudCellarScanRecordQuantity(record.id, nextQuantity);
        const nextRecords = records.map((item) => (item.id === record.id ? cloudRecord : item));
        setRecords(writeCellarScanRecords(nextRecords));
        setCloudStatus("Cloud cellar quantity synced.");
      } catch (error: unknown) {
        setCloudStatus(`Cloud quantity sync failed: ${error instanceof Error ? error.message : "Unknown error"}`);
      } finally {
        setSyncingRecordId(null);
      }
      return;
    }

    const nextRecords = records.map((item) =>
      item.id === record.id ? { ...item, quantity: nextQuantity, updatedAt: new Date().toISOString() } : item
    );
    setRecords(writeCellarScanRecords(nextRecords));
  };

  return (
    <section className="cellar-scanner-page">
      <header className="section-header cellar-scanner-hero">
        <p className="checkout-eyebrow">Three-step bottle workflow</p>
        <h2>Scan → Verify → Next Action</h2>
        <p>Capture only what the label can tell you, correct the extracted facts, then choose one useful learning or service action.</p>
      </header>

      <p className="cellar-cloud-status">{cloudLoading ? "Syncing..." : cloudStatus}</p>

      <nav className="journal-tabs" aria-label="Cellar Scanner steps">
        <button type="button" className={`btn ${stage === "scan" ? "btn-primary" : "btn-light"}`} onClick={() => setStage("scan")}>1. Scan</button>
        <button type="button" className={`btn ${stage === "verify" ? "btn-primary" : "btn-light"}`} onClick={() => setStage("verify")}>2. Verify</button>
        <button type="button" className={`btn ${stage === "next" ? "btn-primary" : "btn-light"}`} onClick={() => setStage("next")} disabled={!activeRecordId}>3. Next Action</button>
      </nav>

      <div className="cellar-scanner-grid">
        {stage === "scan" ? <article className="cellar-scanner-input-card">
          <p className="nav-overline">Step 1 · Scan or paste</p>
          <div className="cellar-scanner-mode-row">
            {sourceOptions.map((option) => (
              <button key={option.value} type="button" className={draft.sourceType === option.value ? "active" : ""} onClick={() => updateDraft("sourceType", option.value)}>
                {option.label}
              </button>
            ))}
          </div>
          <div className="cellar-capture-target-row" aria-label="Camera capture target">
            {captureTargetOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={captureTarget === option.value ? "active" : ""}
                onClick={() => setCaptureTarget(option.value)}
              >
                <span>{option.label}</span>
                <small>{option.detail}</small>
              </button>
            ))}
          </div>
          <label className="cellar-scanner-file">
            <span>{captureTargetOptions.find((option) => option.value === captureTarget)?.label ?? "Label"} image</span>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
            />
          </label>
          {previewUrl ? <img className="cellar-scanner-preview" src={previewUrl} alt="Selected bottle or menu label" /> : null}
          <textarea
            value={draft.rawText}
            onChange={(event) => updateDraft("rawText", event.target.value)}
            placeholder="Paste label, shelf tag, or menu text here..."
            rows={8}
          />
          <div className="cellar-scanner-actions">
            <button type="button" className="btn btn-primary" onClick={() => void runOcr()} disabled={ocrStatus === "reading"}>
              {ocrStatus === "reading" ? "Reading..." : "Run OCR"}
            </button>
            <button type="button" className="btn btn-light" onClick={analyzeCurrentText}>
              Analyze Text
            </button>
            <button type="button" className="btn btn-light" onClick={downloadMetadataBrief}>
              Metadata Brief
            </button>
          </div>
          <p className={`cellar-scanner-status status-${ocrStatus}`}>{ocrMessage}</p>
        </article> : null}

        {stage === "verify" ? <article className="cellar-scanner-form-card">
          <div className="cellar-scanner-form-head">
            <p className="nav-overline">Step 2 · Verify extracted facts</p>
            <select value={draft.beverageType} onChange={(event) => updateDraft("beverageType", event.target.value as CellarBeverageType)}>
              {beverageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="cellar-scanner-field-grid">
            <Field label="Producer / brewery" value={draft.producer} onChange={(value) => updateDraft("producer", value)} />
            <Field label="Name / cuvee / item" value={draft.name} onChange={(value) => updateDraft("name", value)} />
            <Field label="Vintage" value={draft.vintage} onChange={(value) => updateDraft("vintage", value)} />
            <Field label="Region" value={draft.region} onChange={(value) => updateDraft("region", value)} />
            <Field label="Country" value={draft.country} onChange={(value) => updateDraft("country", value)} />
            <Field label="Grape / style / base" value={draft.grapeOrStyle} onChange={(value) => updateDraft("grapeOrStyle", value)} />
            <Field label="ABV" value={draft.abv} onChange={(value) => updateDraft("abv", value)} />
            <Field label="Cellar slot" value={draft.cellarSlot} onChange={(value) => updateDraft("cellarSlot", value)} />
            <label>
              Quantity
              <input type="number" min={0} value={draft.quantity} onChange={(event) => updateDraft("quantity", Number(event.target.value) || 0)} />
            </label>
            <label>
              Rating
              <input type="number" min={0} max={100} value={draft.rating} onChange={(event) => updateDraft("rating", Number(event.target.value) || 0)} />
            </label>
          </div>
          <label className="cellar-scanner-wide-label">
            Pairing or service goal
            <input value={draft.pairingNeed} onChange={(event) => updateDraft("pairingNeed", event.target.value)} placeholder="e.g., by-the-glass seafood pairing" />
          </label>
          <label className="cellar-scanner-wide-label">
            Notes
            <textarea value={draft.notes} onChange={(event) => updateDraft("notes", event.target.value)} rows={3} />
          </label>
          <button type="button" className="btn btn-primary" onClick={saveDraft} disabled={savingRecord}>
            {savingRecord ? "Saving..." : user && isAuthConfigured ? "Save Cloud Record" : "Save Cellar Record"}
          </button>
          <button type="button" className="btn btn-light" onClick={() => setStage("scan")}>Back to scan</button>
        </article> : null}
      </div>

      {stage === "next" ? (
        <section className="cellar-scanner-recommendations" aria-labelledby="cellar-recommendations-title">
          <div>
            <p className="checkout-eyebrow">Step 3 · Choose one next action</p>
            <h3 id="cellar-recommendations-title">Turn this bottle into a learning decision</h3>
            <p>Pick the route that answers your next question. The scan is a starting clue, not a final verdict.</p>
          </div>
          <div className="cellar-study-link-grid">
            {studyLinks.slice(0, 4).map((link) => (
              <button key={link.label} type="button" onClick={() => onNavigate(link.route)}>
                <span>{link.label}</span>
                <strong>{link.detail}</strong>
              </button>
            ))}
          </div>
          {recommendations[0] ? <p className="hint"><strong>Coach cue:</strong> {recommendations[0]}</p> : null}
          <div className="cellar-scanner-actions">
            <button type="button" className="btn btn-primary" onClick={() => onNavigate("app/flavors")}>Start a Tasting Note</button>
            <button type="button" className="btn btn-light" onClick={() => setStage("scan")}>Scan another</button>
          </div>
        </section>
      ) : null}

      {stage === "next" ? <details>
        <summary>Advanced bottle metadata and external matching</summary>
      <section className="cellar-metadata-section" aria-labelledby="cellar-metadata-title">
        <div className="cellar-metadata-head">
          <div>
            <p className="checkout-eyebrow">Bottle Metadata</p>
            <h3 id="cellar-metadata-title">{metadataProfile.score}% ready for external match</h3>
            <p>{metadataProfile.priceStatus}</p>
          </div>
          <div className="cellar-metadata-score" aria-label={`Metadata readiness ${metadataProfile.score}%`}>
            <strong>{metadataProfile.score}%</strong>
            <span>{metadataProfile.query || "Add identity fields"}</span>
          </div>
        </div>
        <div className="cellar-metadata-grid">
          <article className="cellar-metadata-card">
            <h4>Readiness Signals</h4>
            <div className="cellar-metadata-signal-list">
              {metadataProfile.signals.map((signal) => (
                <span key={signal.label} className={`status-${signal.status}`}>
                  <strong>{signal.label}</strong>
                  {signal.detail}
                </span>
              ))}
            </div>
          </article>
          <article className="cellar-metadata-card">
            <h4>Drink Window Prompt</h4>
            <p>{metadataProfile.drinkWindow}</p>
          </article>
          <article className="cellar-metadata-card cellar-metadata-lookup-card">
            <h4>External Lookup Handoffs</h4>
            <div className="cellar-lookup-link-grid">
              {metadataProfile.lookupLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  <span>{link.label}</span>
                  <strong>{link.detail}</strong>
                </a>
              ))}
            </div>
          </article>
        </div>
      </section>
      </details> : null}

      {stage === "next" ? <details>
        <summary>Optional tasting feedback coach</summary>
      <section className="cellar-tasting-feedback-section" aria-labelledby="cellar-feedback-title">
        <div className="cellar-tasting-feedback-head">
          <div>
            <p className="checkout-eyebrow">Tasting Feedback Coach</p>
            <h3 id="cellar-feedback-title">{tastingFeedback.score}% ready for mentor-style review</h3>
            <p>{tastingFeedback.calibration}</p>
          </div>
          <div className="cellar-tasting-feedback-score" aria-label={`Tasting feedback readiness ${tastingFeedback.score}%`}>
            <strong>{tastingFeedback.score}%</strong>
            <span>{tastingFeedback.title}</span>
          </div>
        </div>

        <div className="cellar-feedback-field-grid">
          <label>
            Appearance
            <textarea
              value={feedbackDraft.appearance}
              onChange={(event) => updateFeedbackDraft("appearance", event.target.value)}
              rows={3}
              placeholder="Color, clarity, rim, foam, concentration, visible condition..."
            />
          </label>
          <label>
            Aroma
            <textarea
              value={feedbackDraft.aroma}
              onChange={(event) => updateFeedbackDraft("aroma", event.target.value)}
              rows={3}
              placeholder="Fruit, grain, botanical, oak, spice, development, intensity..."
            />
          </label>
          <label>
            Palate
            <textarea
              value={feedbackDraft.palate}
              onChange={(event) => updateFeedbackDraft("palate", event.target.value)}
              rows={3}
              placeholder="Flavors, texture, intensity, balance, whether the palate confirms the nose..."
            />
          </label>
          <label>
            Structure
            <textarea
              value={feedbackDraft.structure}
              onChange={(event) => updateFeedbackDraft("structure", event.target.value)}
              rows={3}
              placeholder="Acid, tannin, body, bitterness, carbonation, proof, sweetness..."
            />
          </label>
          <label>
            Finish
            <textarea
              value={feedbackDraft.finish}
              onChange={(event) => updateFeedbackDraft("finish", event.target.value)}
              rows={3}
              placeholder="Length, aftertaste, harshness, fade, texture after swallowing..."
            />
          </label>
          <label>
            Fault Check
            <textarea
              value={feedbackDraft.faultCheck}
              onChange={(event) => updateFeedbackDraft("faultCheck", event.target.value)}
              rows={3}
              placeholder="Clean, questionable, flawed, stale, corked, oxidized, heat damaged..."
            />
          </label>
          <label>
            Conclusion
            <textarea
              value={feedbackDraft.conclusion}
              onChange={(event) => updateFeedbackDraft("conclusion", event.target.value)}
              rows={3}
              placeholder="Quality, readiness, typicity, drink/hold/chill/decant, pairing fit..."
            />
          </label>
          <label>
            Service Intent
            <textarea
              value={feedbackDraft.serviceIntent}
              onChange={(event) => updateFeedbackDraft("serviceIntent", event.target.value)}
              rows={3}
              placeholder="Guest, pairing, occasion, exam drill, by-the-glass use, cocktail use..."
            />
          </label>
        </div>

        <div className="cellar-feedback-review-grid">
          <article className="cellar-feedback-card">
            <h4>Evidence Review</h4>
            <div className="cellar-feedback-signal-list">
              {tastingFeedback.signals.map((signal) => (
                <span key={signal.label} className={`status-${signal.status}`}>
                  <strong>{signal.label}</strong>
                  {signal.detail}
                </span>
              ))}
            </div>
          </article>
          <article className="cellar-feedback-card">
            <h4>Coaching Prompts</h4>
            <ul>
              {tastingFeedback.coachingPrompts.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="cellar-feedback-card">
            <h4>Next Actions</h4>
            <ul>
              {tastingFeedback.nextActions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="cellar-scanner-actions">
          <button type="button" className="btn btn-primary" onClick={downloadTastingFeedbackPacket}>
            Download Feedback Packet
          </button>
          <button type="button" className="btn btn-light" onClick={() => onNavigate("app/flavors")}>
            Open Tasting Journal
          </button>
        </div>
      </section>
      </details> : null}

      <details>
        <summary>Saved cellar records ({records.length})</summary>
      <section className="cellar-records-section" aria-labelledby="cellar-records-title">
        <div className="cellar-records-head">
          <div>
            <p className="checkout-eyebrow">Local Cellar</p>
            <h3 id="cellar-records-title">{records.length} saved scan{records.length === 1 ? "" : "s"} · {totalBottles} bottle{totalBottles === 1 ? "" : "s"}</h3>
          </div>
          {topRecord ? <span>Current benchmark: {topRecord.name || topRecord.producer || topRecord.grapeOrStyle}</span> : null}
        </div>
        <div className="cellar-record-grid">
          {records.length > 0 ? (
            records.slice(0, 9).map((record) => (
              <article key={record.id} className="cellar-record-card">
                <span>{record.beverageType} - {record.quantity}x {record.cloudBacked ? "- cloud" : "- local"}</span>
                <h4>{record.name || record.producer || record.grapeOrStyle || "Untitled scan"}</h4>
                <p>{[record.vintage, record.region, record.country].filter(Boolean).join(" · ") || "Add origin and vintage details."}</p>
                <div>
                  <button type="button" className="btn btn-light" onClick={() => loadRecord(record)}>
                    Edit
                  </button>
                  <button type="button" className="btn btn-light" onClick={() => void adjustQuantity(record, record.quantity - 1)} disabled={syncingRecordId === record.id}>
                    {syncingRecordId === record.id ? "Syncing" : "Drink"}
                  </button>
                  <button type="button" className="btn btn-light" onClick={() => onNavigate(record.studyLinks[0]?.route ?? "app/flavors")}>
                    Study
                  </button>
                </div>
              </article>
            ))
          ) : (
            <article className="cellar-record-empty">
              <h4>No cellar records yet.</h4>
              <p>Scan or paste one bottle, menu item, or shelf tag to start a study-linked inventory.</p>
            </article>
          )}
        </div>
      </section>
      </details>
    </section>
  );
}
