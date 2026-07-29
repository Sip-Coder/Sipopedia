import { useEffect } from "react";
import { journeyOfADrop } from "../../data/beyondTheGlassChapters";
import { ScrollStoryStage } from "./ScrollStoryStage";
import "./beyond-the-glass.css";

const TRANSCRIPT_ID = "btg-transcript";

type BeyondTheGlassPageProps = {
  onNavigate?: (target: string) => void;
};

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
  const chapter = journeyOfADrop;

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "auto" });
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

      <ScrollStoryStage chapter={chapter} transcriptId={TRANSCRIPT_ID} />

      <section className="btg-finale" aria-labelledby="btg-finale-title">
        <div>
          <p className="btg-kicker">Field trip complete</p>
          <h2 id="btg-finale-title">Thirteen stops. One connected glass.</h2>
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
