import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  BeerBottle,
  BookOpenText,
  Check,
  Coffee,
  Compass,
  Drop,
  Eye,
  Flask,
  Gauge,
  House,
  Leaf,
  MagnifyingGlass,
  MoonStars,
  Sparkle,
  Star,
  TeaBag,
  Wine,
  X
} from "@phosphor-icons/react";
import {
  LIVING_PALATE_DISTRICTS,
  LIVING_PALATE_GUIDES,
  LIVING_PALATE_INTRO_ROUTE,
  LIVING_PALATE_MASTERY,
  LIVING_PALATE_PHASES,
  LIVING_PALATE_SAFETY,
  LIVING_PALATE_SOURCES,
  LIVING_PALATE_SPECIMENS,
  type LivingPalateChoice,
  type LivingPalateDistrict,
  type LivingPalateGuideId,
  type LivingPalatePhaseId,
  type LivingPalateSpecimen,
  type LivingPalateSpecimenId
} from "./livingPalateData";
import "./living-palate.css";

const STORAGE_KEY = "sipstudies:living-palate:acidity:v2";

type LivingPalateView = "campus" | "flight";
type SampleMode = "dry" | "sample";

type SpecimenDraft = {
  recallNote: string;
  sensoryNote: string;
  explanationNote: string;
  guestLine: string;
  confidence: number;
  scaleValues: Record<string, number>;
  contrastChoiceId: string;
  serviceChoiceId: string;
};

type SavedLivingPalateState = {
  activeStep: number;
  selectedSpecimenId: LivingPalateSpecimenId;
  selectedDistrictId: string;
  completedPhaseIds: LivingPalatePhaseId[];
  sampleMode: SampleMode;
  specimenDrafts: Partial<Record<LivingPalateSpecimenId, SpecimenDraft>>;
};

const createDraft = (): SpecimenDraft => ({
  recallNote: "",
  sensoryNote: "",
  explanationNote: "",
  guestLine: "",
  confidence: -1,
  scaleValues: {},
  contrastChoiceId: "",
  serviceChoiceId: ""
});

const DEFAULT_STATE: SavedLivingPalateState = {
  activeStep: 0,
  selectedSpecimenId: "water",
  selectedDistrictId: "sensory",
  completedPhaseIds: [],
  sampleMode: "dry",
  specimenDrafts: {}
};

const isPlainRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

function sanitizeDraft(value: unknown, specimen: LivingPalateSpecimen): SpecimenDraft {
  if (!isPlainRecord(value)) return createDraft();
  const validContrastIds = new Set(specimen.contrastChoices.map((choice) => choice.id));
  const validServiceIds = new Set(specimen.serviceChoices.map((choice) => choice.id));
  const validScaleKeys = new Set(specimen.scales.map((scale) => `${specimen.id}:${scale.id}`));
  const scaleValues: Record<string, number> = {};
  if (isPlainRecord(value.scaleValues)) {
    Object.entries(value.scaleValues).forEach(([key, raw]) => {
      const numeric = Number(raw);
      if (validScaleKeys.has(key) && Number.isFinite(numeric)) {
        scaleValues[key] = Math.max(0, Math.min(5, Math.round(numeric)));
      }
    });
  }
  const confidence = Number(value.confidence);
  return {
    recallNote: typeof value.recallNote === "string" ? value.recallNote : "",
    sensoryNote: typeof value.sensoryNote === "string" ? value.sensoryNote : "",
    explanationNote: typeof value.explanationNote === "string" ? value.explanationNote : "",
    guestLine: typeof value.guestLine === "string" ? value.guestLine : "",
    confidence: Number.isInteger(confidence) && confidence >= -1 && confidence <= 3 ? confidence : -1,
    scaleValues,
    contrastChoiceId: typeof value.contrastChoiceId === "string" && validContrastIds.has(value.contrastChoiceId) ? value.contrastChoiceId : "",
    serviceChoiceId: typeof value.serviceChoiceId === "string" && validServiceIds.has(value.serviceChoiceId) ? value.serviceChoiceId : ""
  };
}

function readSavedState(): SavedLivingPalateState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as unknown;
    if (!isPlainRecord(parsed)) return DEFAULT_STATE;
    const parsedSpecimenId = typeof parsed.selectedSpecimenId === "string" ? parsed.selectedSpecimenId : "";
    const parsedDistrictId = typeof parsed.selectedDistrictId === "string" ? parsed.selectedDistrictId : "";
    const specimenExists = LIVING_PALATE_SPECIMENS.some((item) => item.id === parsedSpecimenId);
    const districtExists = LIVING_PALATE_DISTRICTS.some((item) => item.id === parsedDistrictId);
    const parsedStep = Number(parsed.activeStep);
    const activeStep = Number.isFinite(parsedStep)
      ? Math.max(0, Math.min(LIVING_PALATE_PHASES.length - 1, Math.round(parsedStep)))
      : DEFAULT_STATE.activeStep;
    const validPhaseIds = new Set<LivingPalatePhaseId>(LIVING_PALATE_PHASES.map((phase) => phase.id));
    const completedPhaseIds = Array.isArray(parsed.completedPhaseIds)
      ? [...new Set(parsed.completedPhaseIds.filter((id): id is LivingPalatePhaseId => typeof id === "string" && validPhaseIds.has(id as LivingPalatePhaseId)))]
      : [];
    const specimenDrafts: Partial<Record<LivingPalateSpecimenId, SpecimenDraft>> = {};
    const parsedDrafts = parsed.specimenDrafts;
    if (isPlainRecord(parsedDrafts)) {
      LIVING_PALATE_SPECIMENS.forEach((specimen) => {
        if (Object.prototype.hasOwnProperty.call(parsedDrafts, specimen.id)) {
          specimenDrafts[specimen.id] = sanitizeDraft(parsedDrafts[specimen.id], specimen);
        }
      });
    }
    return {
      activeStep,
      selectedSpecimenId: specimenExists ? parsedSpecimenId as LivingPalateSpecimenId : DEFAULT_STATE.selectedSpecimenId,
      selectedDistrictId: districtExists ? parsedDistrictId : DEFAULT_STATE.selectedDistrictId,
      completedPhaseIds,
      sampleMode: parsed.sampleMode === "sample" ? "sample" : "dry",
      specimenDrafts
    };
  } catch {
    return DEFAULT_STATE;
  }
}

function phaseRequirement(phaseId: LivingPalatePhaseId): string {
  if (phaseId === "recall") return "Write one independent first thought to continue.";
  if (phaseId === "sense") return "Record one clear sensory observation to continue.";
  if (phaseId === "contrast") return "Choose the closest contrast—including uncertainty—to continue.";
  if (phaseId === "explain") return "Build a short cause-to-perception chain to continue.";
  if (phaseId === "serve") return "Choose a response and write your own guest-facing line to continue.";
  return "Choose a confidence signal to mark this concept for return.";
}

function isPhaseReady(phaseId: LivingPalatePhaseId, draft: SpecimenDraft): boolean {
  if (phaseId === "recall") return draft.recallNote.trim().length > 0;
  if (phaseId === "sense") return draft.sensoryNote.trim().length > 0;
  if (phaseId === "contrast") return draft.contrastChoiceId.length > 0;
  if (phaseId === "explain") return draft.explanationNote.trim().length > 0;
  if (phaseId === "serve") return draft.serviceChoiceId.length > 0 && draft.guestLine.trim().length > 0;
  return draft.confidence >= 0;
}

function SpecimenIcon({ specimen, size = 24 }: { specimen: LivingPalateSpecimen; size?: number }) {
  const props = { size, weight: "duotone" as const, "aria-hidden": true };
  if (specimen.icon === "wine") return <Wine {...props} />;
  if (specimen.icon === "coffee") return <Coffee {...props} />;
  if (specimen.icon === "beer") return <BeerBottle {...props} />;
  if (specimen.icon === "tea") return <TeaBag {...props} />;
  return <Drop {...props} />;
}

function GuideCompanion({
  guideId,
  compact = false,
  children
}: {
  guideId: LivingPalateGuideId;
  compact?: boolean;
  children?: ReactNode;
}) {
  const guide = LIVING_PALATE_GUIDES[guideId];
  return (
    <aside className={`lp-guide-companion ${compact ? "is-compact" : ""}`} aria-label={`${guide.name}, ${guide.role}`}>
      <div className="lp-guide-portrait" aria-hidden="true">
        <span className="lp-guide-aura" />
        <img src={guide.image} alt="" loading={compact ? "lazy" : "eager"} decoding="async" />
      </div>
      <div className="lp-guide-copy">
        <span>{guide.role}</span>
        <strong>{guide.name}</strong>
        {children ?? <p>{guide.line}</p>}
      </div>
    </aside>
  );
}

function SourceNotebook({
  dialogRef,
  activeSourceIds,
  specimenTitle,
  onReset
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  activeSourceIds: string[];
  specimenTitle: string;
  onReset: () => void;
}) {
  const [confirmReset, setConfirmReset] = useState(false);
  const activeSources = LIVING_PALATE_SOURCES.filter((source) => activeSourceIds.includes(source.id));
  const learningSources = LIVING_PALATE_SOURCES.filter((source) => !activeSourceIds.includes(source.id));
  const renderSource = (source: (typeof LIVING_PALATE_SOURCES)[number]) => (
    <a key={source.id} href={source.url} target="_blank" rel="noreferrer" className="lp-source-entry">
      <span>{source.policy === "link" ? "Framework link" : "Evidence source"}</span>
      <strong>{source.title}</strong>
      <small>{source.organization} · {source.year}</small>
      <p>{source.note}</p>
    </a>
  );
  return (
    <dialog
      ref={dialogRef}
      className="lp-source-dialog"
      aria-labelledby="lp-source-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <article className="lp-source-book">
        <header>
          <div>
            <span className="lp-kicker">Hummin's evidence ledger</span>
            <h2 id="lp-source-title">Source Notebook</h2>
            <p>Claims are paraphrased and scoped. Professional frameworks remain linked—not reproduced.</p>
          </div>
          <button type="button" className="lp-icon-button" onClick={() => dialogRef.current?.close()} aria-label="Close source notebook">
            <X size={24} />
          </button>
        </header>
        <section className="lp-source-guardrail" aria-label="Measurement guardrail">
          <strong>Compare like with like.</strong>
          <p>Compare titratable acidity only within a documented method and beverage matrix; values from different methods or categories are not directly equivalent.</p>
        </section>
        <section className="lp-source-section" aria-labelledby="lp-active-receipts">
          <div className="lp-source-section-heading">
            <span>Selected teaching receipts</span>
            <h3 id="lp-active-receipts">{specimenTitle}</h3>
          </div>
          <div className="lp-source-list">{activeSources.map(renderSource)}</div>
        </section>
        <section className="lp-source-foundations" aria-labelledby="lp-foundation-sources">
          <div className="lp-source-section-heading">
            <span>Full evidence ledger</span>
            <h3 id="lp-foundation-sources">Learning design and other beverage sources ({learningSources.length})</h3>
          </div>
          <div className="lp-source-list">{learningSources.map(renderSource)}</div>
        </section>
        <footer>
          <p>Your Living Palate notes stay in this browser for this experimental build.</p>
          {confirmReset ? (
            <div className="lp-reset-confirm" role="group" aria-label="Confirm local experiment reset">
              <strong>Erase every saved specimen note on this device?</strong>
              <div>
                <button type="button" className="lp-text-button" onClick={() => setConfirmReset(false)}>Keep my notes</button>
                <button type="button" className="lp-text-button lp-danger-button" onClick={() => { setConfirmReset(false); onReset(); }}>Erase local notes</button>
              </div>
            </div>
          ) : (
            <button type="button" className="lp-text-button lp-danger-button" onClick={() => setConfirmReset(true)}>Reset my local experiment</button>
          )}
        </footer>
      </article>
    </dialog>
  );
}

function MasteryConstellation({ completedPhaseIds }: { completedPhaseIds: LivingPalatePhaseId[] }) {
  return (
    <section className="lp-mastery" aria-labelledby="lp-mastery-title">
      <div className="lp-mastery-heading">
        <Sparkle size={28} weight="duotone" aria-hidden="true" />
        <div>
          <span>Your private learning trail</span>
          <h2 id="lp-mastery-title">Mastery constellation</h2>
        </div>
      </div>
      <ol>
        {LIVING_PALATE_MASTERY.map((node) => {
          const active = completedPhaseIds.includes(node.phaseId);
          return (
            <li key={node.id} className={active ? "is-lit" : ""}>
              <span className="lp-mastery-star" aria-hidden="true"><Star size={22} weight={active ? "fill" : "regular"} /></span>
              <strong>{node.label}</strong>
              <small>{node.detail}</small>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function CampusView({
  selectedDistrict,
  completedPhaseIds,
  completedCount,
  activeStep,
  sampleMode,
  onSelectDistrict,
  onSetSampleMode,
  onStart,
  onOpenSources
}: {
  selectedDistrict: LivingPalateDistrict;
  completedPhaseIds: LivingPalatePhaseId[];
  completedCount: number;
  activeStep: number;
  sampleMode: SampleMode;
  onSelectDistrict: (district: LivingPalateDistrict) => void;
  onSetSampleMode: (mode: SampleMode) => void;
  onStart: (stepIndex?: number) => void;
  onOpenSources: () => void;
}) {
  const activeRouteId = activeStep >= 5 ? "reflect" : activeStep >= 4 ? "serve" : "compare";

  return (
    <>
      <section className="lp-campus-layout" aria-labelledby="lp-campus-title">
        <h1 id="lp-campus-title" className="lp-sr-only">The Living Palate</h1>
        <div className="lp-campus-column">
          <div className="lp-campus-stage">
            <div className="lp-campus-map">
              <picture>
                <source media="(max-width: 620px) and (orientation: portrait)" srcSet="/living-palate/campus-intro-portrait-960.webp" />
                <source media="(max-width: 980px)" srcSet="/living-palate/campus-intro-960.webp" />
                <img
                  src="/living-palate/campus-intro-1600.webp"
                  alt="The Living Palate campus with a crystal Worldglass, six academy districts, and luminous blue waterways"
                  loading="eager"
                  decoding="async"
                />
              </picture>
              <div className="lp-campus-vignette" aria-hidden="true" />
              <div className="lp-campus-nodes" aria-label="Living Palate campus districts">
                {LIVING_PALATE_DISTRICTS.map((district, index) => (
                  <button
                    key={district.id}
                    type="button"
                    data-district={district.id}
                    className={`lp-map-node ${district.id === selectedDistrict.id ? "is-selected" : ""} ${district.id === "contrast" ? "is-today" : ""}`}
                    style={{
                      "--lp-x": `${district.mapX}%`,
                      "--lp-y": `${district.mapY}%`,
                      "--lp-mobile-x": `${district.mapMobileX}%`,
                      "--lp-mobile-y": `${district.mapMobileY}%`
                    } as CSSProperties}
                    onClick={() => onSelectDistrict(district)}
                    aria-pressed={district.id === selectedDistrict.id}
                    aria-label={`${district.name}: ${district.signal}`}
                  >
                    <span>{index + 1}</span>
                    <strong>{district.shortName}</strong>
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="lp-worldglass"
              onClick={() => selectedDistrict.id === "archive" ? onOpenSources() : onStart(activeStep)}
            >
              <span className="lp-worldglass-ring" aria-hidden="true"><Wine size={34} weight="duotone" /></span>
              <span>
                <small>{selectedDistrict.id === "archive" ? "Open the evidence ledger" : completedCount > 0 ? "Continue today's flight" : "Begin today's flight"}</small>
                <strong>{selectedDistrict.id === "archive" ? "Source Archive" : `${LIVING_PALATE_PHASES[activeStep].title} · 8 min`}</strong>
              </span>
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>

          <div className="lp-mobile-districts" aria-label="Living Palate campus district list">
            {LIVING_PALATE_DISTRICTS.map((district) => (
              <button
                key={district.id}
                type="button"
                onClick={() => onSelectDistrict(district)}
                aria-pressed={district.id === selectedDistrict.id}
                className={district.id === selectedDistrict.id ? "is-selected" : ""}
              >
                <span>{district.shortName}</span>
                <small>{district.signal}</small>
              </button>
            ))}
          </div>

          <MasteryConstellation completedPhaseIds={completedPhaseIds} />
        </div>

        <div className="lp-campus-sidebar">
          <aside className="lp-next-move" aria-live="polite">
            <span className="lp-paper-tab"><Compass size={17} weight="duotone" /> Your next move</span>
            <div className="lp-paper-heading">
              <h2>Compare five expressions of acidity.</h2>
              <p>Name the cue. Explain the cause. Choose the service response.</p>
            </div>

            <ol className="lp-intro-route" aria-label="Today's Living Palate route">
              {LIVING_PALATE_INTRO_ROUTE.map((route, index) => (
                <li key={route.id}>
                  <button
                    type="button"
                    className={route.id === activeRouteId ? "is-selected" : ""}
                    onClick={() => {
                      const district = route.districtId
                        ? LIVING_PALATE_DISTRICTS.find((item) => item.id === route.districtId)
                        : undefined;
                      if (district) onSelectDistrict(district);
                      onStart(route.stepIndex);
                    }}
                    aria-current={route.id === activeRouteId ? "step" : undefined}
                  >
                    <span>{index + 1}</span>
                    <strong>{route.label}</strong>
                    <small>{route.location}</small>
                  </button>
                </li>
              ))}
            </ol>

            <div className="lp-mode-choice lp-mode-choice--compact" role="group" aria-label="Learning mode">
              <span>Flight mode</span>
              <div>
                <button type="button" aria-pressed={sampleMode === "dry"} className={sampleMode === "dry" ? "is-selected" : ""} onClick={() => onSetSampleMode("dry")}>
                  <Flask size={18} /> Dry lab
                </button>
                <button type="button" aria-pressed={sampleMode === "sample"} className={sampleMode === "sample" ? "is-selected" : ""} onClick={() => onSetSampleMode("sample")}>
                  <Wine size={18} /> With sample
                </button>
              </div>
              <small>No alcohol or physical sample is required.</small>
            </div>
          </aside>

          <section className="lp-intro-guide-bench" aria-labelledby="lp-guide-bench-title">
            <div className="lp-intro-guide-heading">
              <span className="lp-kicker">Your guide bench</span>
              <h2 id="lp-guide-bench-title">Three guides. Three distinct jobs.</h2>
            </div>
            <picture aria-hidden="true">
              <source media="(max-width: 760px)" srcSet="/living-palate/guide-bench-720.webp" />
              <img src="/living-palate/guide-bench-1500.webp" alt="" width={1500} height={500} loading="lazy" decoding="async" />
            </picture>
            <ul>
              {(Object.keys(LIVING_PALATE_GUIDES) as LivingPalateGuideId[]).map((guideId) => {
                const guide = LIVING_PALATE_GUIDES[guideId];
                return <li key={guideId}><strong>{guide.name}</strong><span>{guide.role}</span></li>;
              })}
            </ul>
          </section>
        </div>
      </section>
    </>
  );
}

function ScalePractice({
  specimen,
  values,
  onChange
}: {
  specimen: LivingPalateSpecimen;
  values: Record<string, number>;
  onChange: (id: string, value: number) => void;
}) {
  return (
    <div className="lp-scale-stack">
      {specimen.scales.map((scale) => {
        const key = `${specimen.id}:${scale.id}`;
        const value = values[key] ?? 2;
        return (
          <label key={scale.id}>
            <span><strong>{scale.label}</strong><output>{value} / 5</output></span>
            <input type="range" min="0" max="5" step="1" value={value} onChange={(event) => onChange(key, Number(event.target.value))} />
          </label>
        );
      })}
    </div>
  );
}

function ChoiceStack({
  choices,
  selectedId,
  onSelect
}: {
  choices: LivingPalateChoice[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const selected = choices.find((choice) => choice.id === selectedId);
  return (
    <div className="lp-choice-stack">
      {choices.map((choice) => (
        <button
          key={choice.id}
          type="button"
          className={`${selectedId === choice.id ? "is-selected" : ""} ${selectedId === choice.id && choice.preferred ? "is-preferred" : ""}`}
          onClick={() => onSelect(choice.id)}
          aria-pressed={selectedId === choice.id}
        >
          <span>{selectedId === choice.id ? <Check size={18} weight="bold" /> : null}</span>
          {choice.label}
        </button>
      ))}
      {selected ? <p className="lp-choice-feedback" role="status">{selected.feedback}</p> : null}
    </div>
  );
}

function FlightNotebook({
  stepIndex,
  specimen,
  sampleMode,
  recallNote,
  sensoryNote,
  explanationNote,
  guestLine,
  confidence,
  scaleValues,
  contrastChoiceId,
  serviceChoiceId,
  onRecallNote,
  onSensoryNote,
  onExplanationNote,
  onGuestLine,
  onConfidence,
  onScaleChange,
  onContrastChoice,
  onServiceChoice
}: {
  stepIndex: number;
  specimen: LivingPalateSpecimen;
  sampleMode: SampleMode;
  recallNote: string;
  sensoryNote: string;
  explanationNote: string;
  guestLine: string;
  confidence: number;
  scaleValues: Record<string, number>;
  contrastChoiceId: string;
  serviceChoiceId: string;
  onRecallNote: (value: string) => void;
  onSensoryNote: (value: string) => void;
  onExplanationNote: (value: string) => void;
  onGuestLine: (value: string) => void;
  onConfidence: (value: number) => void;
  onScaleChange: (id: string, value: number) => void;
  onContrastChoice: (id: string) => void;
  onServiceChoice: (id: string) => void;
}) {
  const phase = LIVING_PALATE_PHASES[stepIndex];
  if (phase.id === "recall") {
    return (
      <div className="lp-notebook-task">
        <label htmlFor="lp-recall-note">Your first thought</label>
        <textarea id="lp-recall-note" value={recallNote} onChange={(event) => onRecallNote(event.target.value)} placeholder="Acidity can change…" rows={5} />
        <p className="lp-task-hint"><MoonStars size={18} /> The archive remains closed until you choose to move on.</p>
      </div>
    );
  }
  if (phase.id === "sense") {
    return (
      <div className="lp-notebook-task">
        <div className="lp-task-context"><Eye size={19} /><span>{sampleMode === "dry" ? specimen.dryLab : specimen.setup}</span></div>
        <p className="lp-sense-cue"><strong>Focus:</strong> {specimen.observationCue}</p>
        <ScalePractice specimen={specimen} values={scaleValues} onChange={onScaleChange} />
        <label htmlFor="lp-sensory-note">One clear observation</label>
        <textarea id="lp-sensory-note" value={sensoryNote} onChange={(event) => onSensoryNote(event.target.value)} placeholder={specimen.observationCue} rows={3} />
      </div>
    );
  }
  if (phase.id === "contrast") {
    return (
      <div className="lp-notebook-task">
        <h3>{specimen.contrastPrompt}</h3>
        <ChoiceStack choices={specimen.contrastChoices} selectedId={contrastChoiceId} onSelect={onContrastChoice} />
        {contrastChoiceId ? <div className="lp-reveal"><MagnifyingGlass size={20} /><p>{specimen.contrastReveal}</p></div> : null}
      </div>
    );
  }
  if (phase.id === "explain") {
    return (
      <div className="lp-notebook-task">
        <h3>{specimen.explanationPrompt}</h3>
        <ol className="lp-cause-chain" aria-label="Causal explanation chain">
          <li><span>1</span>Source or process</li>
          <li><span>2</span>Measurable change</li>
          <li><span>3</span>Possible perception</li>
          <li><span>4</span>Responsible claim</li>
        </ol>
        <label htmlFor="lp-explanation-note">Build your chain</label>
        <textarea id="lp-explanation-note" value={explanationNote} onChange={(event) => onExplanationNote(event.target.value)} placeholder="Because… this may… while we still cannot assume…" rows={4} />
        <section className="lp-model-note" aria-label="Hummin's scoped explanation">
          <strong>Hummin's scoped explanation</strong>
          <p>{specimen.explanation}</p>
        </section>
      </div>
    );
  }
  if (phase.id === "serve") {
    return (
      <div className="lp-notebook-task">
        <div className="lp-service-scenario"><span>Guest situation</span><p>{specimen.serviceScenario}</p></div>
        <ChoiceStack choices={specimen.serviceChoices} selectedId={serviceChoiceId} onSelect={onServiceChoice} />
        <label htmlFor="lp-guest-line">Say it in your own words</label>
        <textarea id="lp-guest-line" value={guestLine} onChange={(event) => onGuestLine(event.target.value)} placeholder="I hear what you're looking for…" rows={3} />
      </div>
    );
  }
  return (
    <div className="lp-notebook-task lp-return-task">
      <Gauge size={42} weight="duotone" aria-hidden="true" />
      <h3>How confidently could you explain this tomorrow?</h3>
      <div className="lp-confidence" role="group" aria-label="Confidence rating">
        {[0, 1, 2, 3].map((value) => (
          <button key={value} type="button" aria-pressed={confidence === value} className={confidence === value ? "is-selected" : ""} onClick={() => onConfidence(value)}>
            {value === 0 ? "Not yet" : value === 1 ? "With notes" : value === 2 ? "Mostly" : "Confident"}
          </button>
        ))}
      </div>
      <p>Confidence is stored separately from correctness. This concept is marked for a later retrieval, not streak pressure.</p>
      <div className="lp-completion-summary">
        <strong>{specimen.domain}: {specimen.title}</strong>
        <span>{guestLine || "Your service language can be refined on the next return."}</span>
      </div>
    </div>
  );
}

function FlightView({
  activeStep,
  specimen,
  completedPhaseIds,
  sampleMode,
  recallNote,
  sensoryNote,
  explanationNote,
  guestLine,
  confidence,
  scaleValues,
  contrastChoiceId,
  serviceChoiceId,
  phaseReady,
  onStep,
  onSpecimen,
  onCampus,
  onOpenSources,
  onRecallNote,
  onSensoryNote,
  onExplanationNote,
  onGuestLine,
  onConfidence,
  onScaleChange,
  onContrastChoice,
  onServiceChoice,
  onCompleteAndContinue
}: {
  activeStep: number;
  specimen: LivingPalateSpecimen;
  completedPhaseIds: string[];
  sampleMode: SampleMode;
  recallNote: string;
  sensoryNote: string;
  explanationNote: string;
  guestLine: string;
  confidence: number;
  scaleValues: Record<string, number>;
  contrastChoiceId: string;
  serviceChoiceId: string;
  phaseReady: boolean;
  onStep: (index: number) => void;
  onSpecimen: (id: LivingPalateSpecimenId) => void;
  onCampus: () => void;
  onOpenSources: () => void;
  onRecallNote: (value: string) => void;
  onSensoryNote: (value: string) => void;
  onExplanationNote: (value: string) => void;
  onGuestLine: (value: string) => void;
  onConfidence: (value: number) => void;
  onScaleChange: (id: string, value: number) => void;
  onContrastChoice: (id: string) => void;
  onServiceChoice: (id: string) => void;
  onCompleteAndContinue: () => void;
}) {
  const phase = LIVING_PALATE_PHASES[activeStep];
  const guide = LIVING_PALATE_GUIDES[phase.guide];
  const phaseHeadingRef = useRef<HTMLHeadingElement>(null);
  const previousStepRef = useRef(activeStep);

  useEffect(() => {
    if (previousStepRef.current !== activeStep) {
      previousStepRef.current = activeStep;
      window.requestAnimationFrame(() => phaseHeadingRef.current?.focus({ preventScroll: true }));
    }
  }, [activeStep]);

  return (
    <section className="lp-flight" aria-labelledby="lp-flight-title" tabIndex={-1}>
      <p className="lp-sr-only" role="status" aria-live="polite">
        Phase {activeStep + 1} of {LIVING_PALATE_PHASES.length}: {phase.title}. {phase.prompt}
      </p>
      <header className="lp-flight-header">
        <button type="button" className="lp-back-campus" onClick={onCampus}><House size={19} /> Campus</button>
        <div>
          <span className="lp-kicker">Today's flight · 8 minutes · {sampleMode === "dry" ? "Dry lab" : "Verified sample"}</span>
          <h1 id="lp-flight-title">Acidity: measure, perceive, translate</h1>
        </div>
        <button type="button" className="lp-source-shortcut" onClick={onOpenSources}><BookOpenText size={19} /> Sources</button>
      </header>

      <nav className="lp-flight-steps" aria-label="Daily flight phases">
        {LIVING_PALATE_PHASES.map((step, index) => {
          const complete = completedPhaseIds.includes(step.id);
          return (
            <button
              key={step.id}
              type="button"
              className={`${index === activeStep ? "is-active" : ""} ${complete ? "is-complete" : ""}`}
              onClick={() => onStep(index)}
              aria-current={index === activeStep ? "step" : undefined}
            >
              <span>{complete ? <Check size={15} weight="bold" /> : index + 1}</span>
              <strong>{step.title}</strong>
            </button>
          );
        })}
      </nav>

      <div className="lp-flight-workspace">
        <div className="lp-flight-visual">
          <header>
            <span>{phase.eyebrow}</span>
            <h2 ref={phaseHeadingRef} tabIndex={-1}>{phase.title}</h2>
            <p>{phase.prompt}</p>
          </header>
          <div className="lp-specimen-art">
            <picture>
              <source media="(max-width: 760px)" srcSet={phase.imageSmall} />
              <img src={phase.image} alt={phase.imageAlt} decoding="async" />
            </picture>
            <div className="lp-art-caption">
              <span>{specimen.domain}</span>
              <strong>{specimen.title}</strong>
              <small>{specimen.learningClaim}</small>
            </div>
          </div>
          <div className="lp-specimen-rail" role="group" aria-label="Choose a beverage specimen">
            {LIVING_PALATE_SPECIMENS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={item.id === specimen.id ? "is-selected" : ""}
                aria-pressed={item.id === specimen.id}
                onClick={() => onSpecimen(item.id)}
                style={{ "--lp-specimen-accent": item.accent } as CSSProperties}
              >
                <span><SpecimenIcon specimen={item} /></span>
                <strong>{item.domain}</strong>
                <small>{item.observationCue}</small>
              </button>
            ))}
          </div>
        </div>

        <article className="lp-notebook">
          <div className="lp-notebook-edge" aria-hidden="true" />
          <header className="lp-notebook-header">
            <GuideCompanion guideId={phase.guide} compact>
              <p>{phase.guideLine}</p>
            </GuideCompanion>
            <div className="lp-note-meta">
              <span>Field note {activeStep + 1} / {LIVING_PALATE_PHASES.length}</span>
              <strong>{guide.name}'s prompt</strong>
            </div>
          </header>
          <FlightNotebook
            stepIndex={activeStep}
            specimen={specimen}
            sampleMode={sampleMode}
            recallNote={recallNote}
            sensoryNote={sensoryNote}
            explanationNote={explanationNote}
            guestLine={guestLine}
            confidence={confidence}
            scaleValues={scaleValues}
            contrastChoiceId={contrastChoiceId}
            serviceChoiceId={serviceChoiceId}
            onRecallNote={onRecallNote}
            onSensoryNote={onSensoryNote}
            onExplanationNote={onExplanationNote}
            onGuestLine={onGuestLine}
            onConfidence={onConfidence}
            onScaleChange={onScaleChange}
            onContrastChoice={onContrastChoice}
            onServiceChoice={onServiceChoice}
          />
          <footer className="lp-notebook-nav">
            <button type="button" onClick={() => onStep(Math.max(0, activeStep - 1))} disabled={activeStep === 0}>
              <ArrowLeft size={19} /> Back
            </button>
            <div>
              <span className={phaseReady ? "is-ready" : "is-required"}>{phaseReady ? phase.successEvidence : phaseRequirement(phase.id)}</span>
              <small>Saved privately on this device</small>
            </div>
            <button type="button" className="lp-note-continue" onClick={onCompleteAndContinue} disabled={!phaseReady}>
              {activeStep === LIVING_PALATE_PHASES.length - 1 ? "Return to campus" : "Lock note & continue"} <ArrowRight size={19} />
            </button>
          </footer>
        </article>
      </div>
    </section>
  );
}

export function LivingPalatePage() {
  const initial = useMemo(readSavedState, []);
  const [view, setView] = useState<LivingPalateView>("campus");
  const [activeStep, setActiveStep] = useState(initial.activeStep);
  const [selectedSpecimenId, setSelectedSpecimenId] = useState<LivingPalateSpecimenId>(initial.selectedSpecimenId);
  const [selectedDistrictId, setSelectedDistrictId] = useState(initial.selectedDistrictId);
  const [completedPhaseIds, setCompletedPhaseIds] = useState(initial.completedPhaseIds);
  const [sampleMode, setSampleMode] = useState<SampleMode>(initial.sampleMode);
  const [specimenDrafts, setSpecimenDrafts] = useState(initial.specimenDrafts);
  const [textScale, setTextScale] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const sourceDialogRef = useRef<HTMLDialogElement>(null);

  const specimen = LIVING_PALATE_SPECIMENS.find((item) => item.id === selectedSpecimenId) ?? LIVING_PALATE_SPECIMENS[0];
  const selectedDistrict = LIVING_PALATE_DISTRICTS.find((item) => item.id === selectedDistrictId) ?? LIVING_PALATE_DISTRICTS[0];
  const draft = specimenDrafts[selectedSpecimenId] ?? createDraft();
  const activePhase = LIVING_PALATE_PHASES[activeStep];
  const phaseReady = isPhaseReady(activePhase.id, draft);

  const updateDraft = (patch: Partial<SpecimenDraft>) => {
    setSpecimenDrafts((current) => ({
      ...current,
      [selectedSpecimenId]: {
        ...createDraft(),
        ...(current[selectedSpecimenId] ?? {}),
        ...patch
      }
    }));
  };

  useEffect(() => {
    const state: SavedLivingPalateState = {
      activeStep,
      selectedSpecimenId,
      selectedDistrictId,
      completedPhaseIds,
      sampleMode,
      specimenDrafts
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // The experiment remains fully usable when local storage is unavailable.
    }
  }, [activeStep, completedPhaseIds, sampleMode, selectedDistrictId, selectedSpecimenId, specimenDrafts]);

  const openSources = () => {
    if (!sourceDialogRef.current?.open) sourceDialogRef.current?.showModal();
  };

  const startFlight = (stepIndex = activeStep) => {
    setActiveStep(Math.max(0, Math.min(LIVING_PALATE_PHASES.length - 1, stepIndex)));
    setView("flight");
    window.requestAnimationFrame(() => {
      const flight = document.querySelector<HTMLElement>(".lp-flight");
      flight?.scrollIntoView({ block: "start", behavior: "auto" });
      flight?.focus({ preventScroll: true });
    });
  };

  const completeAndContinue = () => {
    const phaseId = activePhase.id;
    if (!isPhaseReady(phaseId, draft)) return;
    setCompletedPhaseIds((current) => current.includes(phaseId) ? current : [...current, phaseId]);
    if (activeStep >= LIVING_PALATE_PHASES.length - 1) {
      setView("campus");
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      return;
    }
    setActiveStep((current) => current + 1);
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const resetProgress = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Continue with in-memory reset.
    }
    setActiveStep(DEFAULT_STATE.activeStep);
    setSelectedSpecimenId(DEFAULT_STATE.selectedSpecimenId);
    setSelectedDistrictId(DEFAULT_STATE.selectedDistrictId);
    setCompletedPhaseIds([]);
    setSampleMode(DEFAULT_STATE.sampleMode);
    setSpecimenDrafts({});
    setView("campus");
    sourceDialogRef.current?.close();
  };

  return (
    <main
      className="living-palate"
      data-view={view}
      data-reduce-motion={reduceMotion ? "true" : "false"}
      style={{ "--lp-user-scale": 1 + textScale * 0.08 } as CSSProperties}
    >
      <div className="lp-utility-rail" aria-label="Living Palate controls">
        <div className="lp-utility-brand">
          <span className="lp-utility-mark"><Wine size={22} weight="duotone" /></span>
          <div><span>Sip Studies</span><strong>The Living Palate</strong></div>
        </div>
        <div className="lp-utility-day" aria-label="Day 12, today's concept is acidity">
          <span>Day 12</span>
          <strong>Acidity</strong>
        </div>
        <div className="lp-utility-path" aria-label={`${completedPhaseIds.length} of ${LIVING_PALATE_PHASES.length} phases complete`}>
          <span>Today's path</span>
          <div aria-hidden="true">
            {LIVING_PALATE_PHASES.map((phase) => <i key={phase.id} className={completedPhaseIds.includes(phase.id) ? "is-complete" : ""} />)}
          </div>
          <strong>{completedPhaseIds.length} / {LIVING_PALATE_PHASES.length}</strong>
        </div>
        <div className="lp-utility-actions">
          <button type="button" onClick={() => setTextScale((value) => (value + 1) % 3)} aria-label="Change Living Palate text size">
            <span aria-hidden="true">Aa</span><small>Text</small>
          </button>
          <button type="button" onClick={() => setReduceMotion((value) => !value)} aria-pressed={reduceMotion} aria-label={reduceMotion ? "Enable Living Palate motion" : "Reduce Living Palate motion"}>
            <MoonStars size={19} /><small>{reduceMotion ? "Motion off" : "Motion"}</small>
          </button>
          <button type="button" onClick={openSources} aria-label="Open source notebook">
            <BookOpenText size={19} /><small>Sources</small>
          </button>
        </div>
      </div>

      {view === "campus" ? (
        <CampusView
          selectedDistrict={selectedDistrict}
          completedPhaseIds={completedPhaseIds}
          completedCount={completedPhaseIds.length}
          activeStep={activeStep}
          sampleMode={sampleMode}
          onSelectDistrict={(district) => setSelectedDistrictId(district.id)}
          onSetSampleMode={setSampleMode}
          onStart={startFlight}
          onOpenSources={openSources}
        />
      ) : (
        <FlightView
          activeStep={activeStep}
          specimen={specimen}
          completedPhaseIds={completedPhaseIds}
          sampleMode={sampleMode}
          recallNote={draft.recallNote}
          sensoryNote={draft.sensoryNote}
          explanationNote={draft.explanationNote}
          guestLine={draft.guestLine}
          confidence={draft.confidence}
          scaleValues={draft.scaleValues}
          contrastChoiceId={draft.contrastChoiceId}
          serviceChoiceId={draft.serviceChoiceId}
          phaseReady={phaseReady}
          onStep={setActiveStep}
          onSpecimen={setSelectedSpecimenId}
          onCampus={() => setView("campus")}
          onOpenSources={openSources}
          onRecallNote={(value) => updateDraft({ recallNote: value })}
          onSensoryNote={(value) => updateDraft({ sensoryNote: value })}
          onExplanationNote={(value) => updateDraft({ explanationNote: value })}
          onGuestLine={(value) => updateDraft({ guestLine: value })}
          onConfidence={(value) => updateDraft({ confidence: value })}
          onScaleChange={(id, value) => updateDraft({ scaleValues: { ...draft.scaleValues, [id]: value } })}
          onContrastChoice={(value) => updateDraft({ contrastChoiceId: value })}
          onServiceChoice={(value) => updateDraft({ serviceChoiceId: value })}
          onCompleteAndContinue={completeAndContinue}
        />
      )}

      {view === "flight" ? <MasteryConstellation completedPhaseIds={completedPhaseIds} /> : null}

      <section className="lp-safety-strip" aria-label="Living Palate participation principles">
        <div><Leaf size={22} weight="duotone" /><strong>Learning without pressure</strong></div>
        <ul>{LIVING_PALATE_SAFETY.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <SourceNotebook dialogRef={sourceDialogRef} activeSourceIds={specimen.sourceIds} specimenTitle={`${specimen.domain}: ${specimen.title}`} onReset={resetProgress} />
    </main>
  );
}
