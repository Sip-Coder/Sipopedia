import { useCallback, useMemo } from "react";
import {
  journeyOfADrop,
  type BeyondTheGlassChapter,
  type BeyondTheGlassSource
} from "../../data/beyondTheGlassChapters";
import { ScrollStoryStage } from "./ScrollStoryStage";
import "./beyond-the-glass.css";

type BeyondTheGlassPageProps = {
  chapter?: BeyondTheGlassChapter;
  onNavigate?: (route: string) => void;
};

type ArchiveChapter = {
  eyebrow: string;
  title: string;
  subject: string;
  status: "available" | "planned";
};

const TRANSCRIPT_ID = "btg-transcript";

const ARCHIVE_CHAPTERS: ArchiveChapter[] = [
  {
    eyebrow: "Chapter 01",
    title: "The Journey of a Drop",
    subject: "From watershed to beverage system",
    status: "available"
  },
  {
    eyebrow: "Chapter 02",
    title: "From Seed to Cup",
    subject: "Coffee, labor, roasting, and service",
    status: "planned"
  },
  {
    eyebrow: "Chapter 03",
    title: "From Leaf to Ritual",
    subject: "Tea, place, process, and living tradition",
    status: "planned"
  },
  {
    eyebrow: "Chapter 04",
    title: "From Grape to Memory",
    subject: "Wine, time, terroir, and sensory recall",
    status: "planned"
  }
];

function navigateToWorkspaceRoute(route: string, onNavigate?: (route: string) => void) {
  if (onNavigate) {
    onNavigate(route);
    return;
  }

  if (typeof window !== "undefined") {
    window.location.hash = `app/${route.replace(/^app\//, "")}`;
  }
}

function SourceLinks({
  sourceIds,
  sourceMap
}: {
  sourceIds: string[];
  sourceMap: Map<string, BeyondTheGlassSource>;
}) {
  const sources = sourceIds
    .map((sourceId) => sourceMap.get(sourceId))
    .filter((source): source is BeyondTheGlassSource => Boolean(source));

  if (sources.length === 0) return null;

  return (
    <p className="btg-source-links">
      <span>References:</span>{" "}
      {sources.map((source, index) => (
        <span key={source.id}>
          {index > 0 ? ", " : null}
          <a href={source.url} rel="noreferrer" target="_blank">
            {source.organization}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </span>
      ))}
    </p>
  );
}

export function BeyondTheGlassPage({
  chapter = journeyOfADrop,
  onNavigate
}: BeyondTheGlassPageProps) {
  const sourceMap = useMemo(
    () =>
      new Map<string, BeyondTheGlassSource>(
        chapter.sources.map((source) => [source.id, source] as const)
      ),
    [chapter.sources]
  );

  const handlePrimaryCta = useCallback(
    () => navigateToWorkspaceRoute(chapter.primaryCta.route, onNavigate),
    [chapter.primaryCta.route, onNavigate]
  );
  const focusSection = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const reducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.focus({ preventScroll: true });
    const appBarHeight =
      document.querySelector<HTMLElement>(".sip-compact-navigation")?.getBoundingClientRect()
        .height ?? 0;
    const targetTop = window.scrollY + target.getBoundingClientRect().top - appBarHeight - 16;
    window.scrollTo({
      behavior: reducedMotion ? "auto" : "smooth",
      top: Math.max(0, targetTop)
    });
  }, []);

  return (
    <main className="btg-page">
      <a
        className="btg-skip-link"
        href="#btg-field-guide"
        onClick={(event) => {
          event.preventDefault();
          focusSection("btg-field-guide");
        }}
      >
        Skip the cinematic journey
      </a>

      <ScrollStoryStage chapter={chapter} transcriptId={TRANSCRIPT_ID} />

      <section
        aria-labelledby="btg-complete-title"
        className="btg-complete btg-content-section"
        id="btg-field-guide"
        tabIndex={-1}
      >
        <div className="btg-complete__image">
          <img
            alt="A luminous Living Knowledge Card assembled from the ten connected beverage-system layers"
            decoding="async"
            height={941}
            loading="lazy"
            src={chapter.assets.finalArtifact}
            width={1672}
          />
        </div>
        <div className="btg-complete__copy">
          <p className="btg-kicker">Chapter 01 complete · Living Knowledge Card unlocked</p>
          <h2 id="btg-complete-title">You returned with more than a drop.</h2>
          <p>
            You traced one everyday subject through origin, ingredients, process, science,
            culture, people, access, service, technology, and responsibility.
          </p>
          <blockquote>{chapter.coreMessage}</blockquote>
          <div className="btg-action-row">
            <button className="btg-button btg-button--primary" onClick={handlePrimaryCta} type="button">
              {chapter.primaryCta.label}
            </button>
            <a
              className="btg-button btg-button--quiet"
              href={`#${TRANSCRIPT_ID}`}
              onClick={(event) => {
                event.preventDefault();
                focusSection(TRANSCRIPT_ID);
              }}
            >
              Read the transcript
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="btg-layers-title" className="btg-content-section btg-layers">
        <div className="btg-section-heading">
          <div>
            <p className="btg-kicker">The field guide</p>
            <h2 id="btg-layers-title">Ten ways to look beyond the glass</h2>
          </div>
          <p>
            Use these prompts with any beverage. Each lens reveals a different part of the same
            connected system.
          </p>
        </div>

        <ol className="btg-layer-grid">
          {chapter.knowledgeLayers.map((layer) => (
            <li className="btg-layer-card" id={`btg-layer-${layer.id}`} key={layer.id}>
              <div className="btg-layer-card__meta">
                <span>{layer.number}</span>
                <span>{layer.guide} guides</span>
              </div>
              <h3>{layer.title}</h3>
              <p className="btg-layer-card__object">{layer.object}</p>
              <p>{layer.explanation}</p>
              <div className="btg-layer-card__question">
                <span>Ask yourself</span>
                <strong>{layer.question}</strong>
              </div>
              <SourceLinks sourceIds={layer.sourceIds} sourceMap={sourceMap} />
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="btg-archive-title" className="btg-archive">
        <img
          alt="A tactile archive room with connected beverage objects surrounding a central pedestal"
          decoding="async"
          height={941}
          loading="lazy"
          src={chapter.assets.lobby}
          width={1672}
        />
        <div className="btg-archive__scrim" aria-hidden="true" />
        <div className="btg-archive__content btg-content-section">
          <div className="btg-section-heading btg-section-heading--archive">
            <div>
              <p className="btg-kicker">The Living Archive</p>
              <h2 id="btg-archive-title" tabIndex={-1}>
                One engine. Many beverage journeys.
              </h2>
            </div>
            <p>
              This first chapter opens a reusable collection of cinematic lessons. Future stories
              will follow new subjects through the same connected learning lenses.
            </p>
          </div>

          <ol className="btg-chapter-list">
            {ARCHIVE_CHAPTERS.map((archiveChapter) => (
              <li
                className={`btg-chapter-card btg-chapter-card--${archiveChapter.status}`}
                key={archiveChapter.title}
              >
                <div>
                  <span>{archiveChapter.eyebrow}</span>
                  <strong>{archiveChapter.title}</strong>
                  <p>{archiveChapter.subject}</p>
                </div>
                <span className="btg-chapter-card__status">
                  {archiveChapter.status === "available" ? "Available now" : "In development"}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="btg-transcript-title"
        className="btg-content-section btg-transcript"
        id={TRANSCRIPT_ID}
        tabIndex={-1}
      >
        <div className="btg-section-heading">
          <div>
            <p className="btg-kicker">Read or revisit</p>
            <h2 id="btg-transcript-title">Complete journey transcript</h2>
          </div>
          <p>
            Narration is always optional. This transcript preserves the full journey for silent,
            keyboard, reduced-motion, and review-based learning.
          </p>
        </div>

        <ol className="btg-transcript__scenes">
          {chapter.scenes.map((scene) => (
            <li className="btg-transcript__scene" key={scene.id}>
              <header>
                <span>{scene.number}</span>
                <div>
                  <p>{scene.eyebrow}</p>
                  <h3>{scene.title}</h3>
                </div>
              </header>
              <p className="btg-transcript__cue">{scene.visualCue}</p>
              <div className="btg-transcript__lines">
                {scene.narration.map((line, index) => (
                  <figure key={`${scene.id}-${line.speaker}-${index}`}>
                    <blockquote>{line.text}</blockquote>
                    <figcaption>
                      {line.speaker} · approximately {line.durationSeconds} seconds
                    </figcaption>
                  </figure>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="btg-sources-title" className="btg-content-section btg-sources">
        <div className="btg-section-heading">
          <div>
            <p className="btg-kicker">Evidence shelf</p>
            <h2 id="btg-sources-title">Sources behind the journey</h2>
          </div>
          <p>
            The story begins with wonder, but it stays useful through transparent sources and
            questions that can be checked. Cinematic artwork is conceptual and AI-generated;
            factual claims are grounded in the evidence below.
          </p>
        </div>

        <ol className="btg-source-grid">
          {chapter.sources.map((source, index) => (
            <li key={source.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p>{source.organization}</p>
                <h3>
                  <a href={source.url} rel="noreferrer" target="_blank">
                    {source.title}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </h3>
                <p>{source.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="btg-invitation-title" className="btg-invitation">
        <div>
          <p className="btg-kicker">Learn · Engage · Teach</p>
          <h2 id="btg-invitation-title">The archive is alive.</h2>
          <p>
            Continue into Sipopedia, or return to the opening and follow the connections again.
          </p>
        </div>
        <div className="btg-action-row">
          <button className="btg-button btg-button--primary" onClick={handlePrimaryCta} type="button">
            {chapter.primaryCta.label}
          </button>
          <a
            className="btg-button btg-button--quiet"
            href={chapter.secondaryCta.href}
            onClick={(event) => {
              if (!chapter.secondaryCta.href.startsWith("#")) return;
              event.preventDefault();
              focusSection(chapter.secondaryCta.href.slice(1));
            }}
          >
            {chapter.secondaryCta.label}
          </a>
        </div>
      </section>
    </main>
  );
}

export default BeyondTheGlassPage;
