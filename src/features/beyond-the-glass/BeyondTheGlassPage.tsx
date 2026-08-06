import { useEffect, useState } from "react";
import { journeyOfADrop, type BeyondTheGlassChapter } from "../../data/beyondTheGlassChapters";
import { ScrollStoryStage } from "./ScrollStoryStage";
import "./beyond-the-glass.css";

const TRANSCRIPT_ID = "btg-transcript";

type BeyondTheGlassPageProps = {
  onNavigate?: (target: string) => void;
};

type JourneySlug =
  | "brewery"
  | "coffee"
  | "distillery"
  | "energy-drinks"
  | "health-drinks"
  | "juice"
  | "kombucha"
  | "milk"
  | "sodas"
  | "tea"
  | "water"
  | "wine";

type DeferredJourneySlug = Exclude<JourneySlug, "wine">;

const JOURNEY_LOADERS: Record<
  DeferredJourneySlug,
  () => Promise<{ default: BeyondTheGlassChapter }>
> = {
  brewery: () =>
    import("../../data/beyondTheGlassBrewery").then((module) => ({ default: module.breweryFieldTrip })),
  coffee: () =>
    import("../../data/beyondTheGlassCoffee").then((module) => ({ default: module.coffeeFieldTrip })),
  distillery: () =>
    import("../../data/beyondTheGlassDistillery").then((module) => ({ default: module.distilleryFieldTrip })),
  "energy-drinks": () =>
    import("../../data/beyondTheGlassEnergy").then((module) => ({ default: module.energyFieldTrip })),
  "health-drinks": () =>
    import("../../data/beyondTheGlassHealth").then((module) => ({ default: module.healthFieldTrip })),
  juice: () =>
    import("../../data/beyondTheGlassJuice").then((module) => ({ default: module.juiceFieldTrip })),
  kombucha: () =>
    import("../../data/beyondTheGlassKombucha").then((module) => ({ default: module.kombuchaFieldTrip })),
  milk: () =>
    import("../../data/beyondTheGlassMilk").then((module) => ({ default: module.milkFieldTrip })),
  sodas: () =>
    import("../../data/beyondTheGlassSodas").then((module) => ({ default: module.sodasFieldTrip })),
  tea: () =>
    import("../../data/beyondTheGlassTea").then((module) => ({ default: module.teaFieldTrip })),
  water: () =>
    import("../../data/beyondTheGlassWater").then((module) => ({ default: module.waterFieldTrip }))
};

const JOURNEY_FINALE_ARTIFACTS: Record<JourneySlug, string> = {
  brewery: "pint",
  coffee: "cup",
  distillery: "pour",
  "energy-drinks": "serving",
  "health-drinks": "serving",
  juice: "glass",
  kombucha: "glass",
  milk: "glass",
  sodas: "glass",
  tea: "cup",
  water: "glass",
  wine: "glass"
};

function selectedJourneySlug(): JourneySlug {
  if (typeof window === "undefined") return "wine";
  const rawHash = window.location.hash.replace(/^#/, "");
  const queryIndex = rawHash.indexOf("?");
  if (queryIndex < 0) return "wine";
  const params = new URLSearchParams(rawHash.slice(queryIndex + 1));
  const journey = params.get("journey")?.trim().toLowerCase();
  if (journey === "brewery" || journey === "beer") return "brewery";
  if (journey === "coffee") return "coffee";
  if (journey === "distillery" || journey === "spirits") return "distillery";
  if (journey === "energy" || journey === "energy-drinks") return "energy-drinks";
  if (journey === "health" || journey === "health-drinks" || journey === "wellness") {
    return "health-drinks";
  }
  if (journey === "juice") return "juice";
  if (journey === "kombucha") return "kombucha";
  if (journey === "milk" || journey === "dairy") return "milk";
  if (journey === "soda" || journey === "sodas" || journey === "carbonated-beverages") {
    return "sodas";
  }
  if (journey === "tea") return "tea";
  if (journey === "water") return "water";
  return "wine";
}

function focusSection(id: string) {
  if (typeof window === "undefined") return;
  const target = document.getElementById(id);
  if (!target) return;
  target.focus({ preventScroll: true });
  target.scrollIntoView({
    behavior:
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    block: "start"
  });
}

export function BeyondTheGlassPage({ onNavigate }: BeyondTheGlassPageProps) {
  const [journeySlug, setJourneySlug] = useState<JourneySlug>(() => selectedJourneySlug());
  const [chapter, setChapter] = useState<BeyondTheGlassChapter>(journeyOfADrop);
  const [journeyLoading, setJourneyLoading] = useState(false);
  const finaleArtifact = JOURNEY_FINALE_ARTIFACTS[journeySlug];

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [journeySlug]);

  useEffect(() => {
    if (journeySlug === "wine") {
      setChapter(journeyOfADrop);
      setJourneyLoading(false);
      return;
    }

    let cancelled = false;
    setJourneyLoading(true);
    void JOURNEY_LOADERS[journeySlug]().then(({ default: loadedChapter }) => {
      if (cancelled) return;
      setChapter(loadedChapter);
      setJourneyLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [journeySlug]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleHashChange = () => setJourneySlug(selectedJourneySlug());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const enterSipopedia = () => {
    if (onNavigate) {
      onNavigate(chapter.primaryCta.route);
      return;
    }
    if (typeof window !== "undefined") {
      window.location.hash = `app/${chapter.primaryCta.route}`;
    }
  };

  return (
    <main className="btg-page">
      <a
        className="btg-skip-link"
        href={`#${TRANSCRIPT_ID}`}
        onClick={(event) => {
          event.preventDefault();
          focusSection(TRANSCRIPT_ID);
        }}
      >
        Skip the cinematic tour
      </a>

      {journeyLoading ? (
        <section aria-live="polite" className="btg-loading-state">
          <p className="btg-kicker">Opening the next field route</p>
          <p>Preparing the illustrated learning atlas.</p>
        </section>
      ) : (
        <ScrollStoryStage chapter={chapter} key={chapter.slug} />
      )}

      <section className="btg-finale" aria-labelledby="btg-finale-title">
        <div>
          <p className="btg-kicker">Field trip complete</p>
          <h2 id="btg-finale-title">
            {chapter.scenes.length} stops. One connected {finaleArtifact}.
          </h2>
          <p>{chapter.coreMessage}</p>
        </div>
        <div className="btg-finale__actions">
          <button onClick={enterSipopedia} type="button">
            {chapter.primaryCta.label}
          </button>
          <button onClick={() => focusSection(TRANSCRIPT_ID)} type="button">
            Open the field notebook
          </button>
        </div>
      </section>

      <section
        aria-labelledby="btg-transcript-title"
        className="btg-field-notebook"
        id={TRANSCRIPT_ID}
        tabIndex={-1}
      >
        <header>
          <p className="btg-kicker">Revisit at your pace</p>
          <h2 id="btg-transcript-title">Field notebook</h2>
          <p>
            The main adventure stays fast. Every stop remains visible below for spoken scripts,
            production clues, and the source trail.
          </p>
        </header>

        <div className="btg-notebook-grid">
          {chapter.scenes.map((scene) => (
            <article className="btg-notebook-entry" key={scene.id}>
              <header>
                <span>{scene.number}</span>
                <strong>{scene.title}</strong>
                <small>{scene.checkpoint}</small>
              </header>
              <div>
                <p>{scene.summary}</p>
                {scene.fieldNotes.map((note) => (
                  <article key={note.title}>
                    <span>{note.eyebrow}</span>
                    <strong>{note.title}</strong>
                    <p>{note.detail}</p>
                  </article>
                ))}
                <h3>Optional narration transcript</h3>
                {scene.narration.map((line, index) => (
                  <p key={`${scene.id}-${line.speaker}-${index}`}>
                    <strong>{line.speaker}:</strong> {line.text}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <section aria-labelledby="btg-sources-title" className="btg-sources">
          <h3 id="btg-sources-title">Sources and visit references</h3>
          <ul>
            {chapter.sources.map((source) => (
              <li key={source.id}>
                <a href={source.url} rel="noreferrer" target="_blank">
                  {source.organization} · {source.title}
                </a>
                <p>{source.note}</p>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}

export default BeyondTheGlassPage;
