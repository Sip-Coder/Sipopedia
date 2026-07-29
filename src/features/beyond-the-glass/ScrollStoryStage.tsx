import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type SyntheticEvent
} from "react";
import type {
  BeyondTheGlassChapter,
  BeyondTheGlassMotion,
  BeyondTheGlassSpeaker
} from "../../data/beyondTheGlassChapters";
import { NarrationControls } from "./NarrationControls";
import { progressBetween, useScrollStoryProgress } from "./useScrollStoryProgress";

type ScrollStoryStageProps = {
  chapter: BeyondTheGlassChapter;
  transcriptId: string;
};

type StoryImageProps = {
  alt: string;
  className: string;
  eager?: boolean;
  sizes?: string;
  src: string;
  srcSet?: string;
  style?: CSSProperties;
};

const CHARACTER_ASSETS: Record<BeyondTheGlassSpeaker, string> = {
  Sippy: "/game/sprites/characters/main-5.png",
  Roma: "/game/sprites/characters/roma-2.png",
  Hummin: "/game/sprites/characters/main-3.png"
};

const CHARACTER_ROLES: Record<BeyondTheGlassSpeaker, string> = {
  Sippy: "Sipopedia lead",
  Roma: "Flavor detective",
  Hummin: "AI R&D · memory keeper"
};

const FIELD_NOTE_MATERIALS = ["paper", "glass", "brass"] as const;
const PROGRESS_STORAGE_KEY = "sipopedia:btg:wine:last-scene:v1";
const ACADEMY_ROADMAP = [
  { label: "Brewery", note: "Under construction · next", x: 19, y: 49 },
  { label: "Distillery", note: "Under construction · second", x: 81, y: 49 },
  { label: "Coffee ecosystem", note: "Under construction · third", x: 20, y: 75 },
  { label: "Tea ecosystem", note: "Under construction · fourth", x: 75, y: 22 },
  { label: "Future journeys", note: "Academy expansion", x: 49, y: 18 }
] as const;

function clamp(value: number, minimum = 0, maximum = 1): number {
  return Math.min(maximum, Math.max(minimum, value));
}

function smoothstep(value: number): number {
  const progress = clamp(value);
  return progress * progress * (3 - 2 * progress);
}

function focusJourneySection(id: string) {
  if (typeof window === "undefined") return;
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
}

function StoryImage({
  alt,
  className,
  eager,
  sizes,
  src,
  srcSet,
  style
}: StoryImageProps) {
  const [failed, setFailed] = useState(false);
  const handleError = (_event: SyntheticEvent<HTMLImageElement>) => setFailed(true);

  useEffect(() => setFailed(false), [src]);

  if (failed) {
    return (
      <div
        aria-label={alt}
        className={`${className} btg-story-image--fallback`}
        role="img"
        style={style}
      >
        <span>Field image unavailable</span>
      </div>
    );
  }

  const fetchPriority = eager ? "high" : "auto";
  const fetchPriorityAttribute = { fetchpriority: fetchPriority };

  return (
    <img
      alt={alt}
      className={className}
      decoding="async"
      {...fetchPriorityAttribute}
      loading={eager ? "eager" : "lazy"}
      onError={handleError}
      sizes={sizes}
      src={src}
      srcSet={srcSet}
      style={style}
    />
  );
}

function motionTransform(motion: BeyondTheGlassMotion, progress: number): string {
  const eased = smoothstep(progress);
  switch (motion) {
    case "establish":
      return `scale(${(0.965 + eased * 0.035).toFixed(4)})`;
    case "push-in":
      return `scale(${(1 + eased * 0.09).toFixed(4)}) translate3d(0, ${(-eased * 1.5).toFixed(2)}%, 0)`;
    case "orbit":
      return `perspective(1200px) rotateY(${((-3 + eased * 6)).toFixed(2)}deg) scale(${(1.025 + Math.sin(eased * Math.PI) * 0.035).toFixed(4)})`;
    case "cutaway":
      return `scale(1.035) translate3d(0, ${((0.5 - eased) * 3.5).toFixed(2)}%, 0)`;
    case "rotate":
      return `perspective(1200px) rotateY(${((-4 + eased * 8)).toFixed(2)}deg) scale(1.035)`;
    case "glide":
      return `scale(1.04) translate3d(${((0.5 - eased) * 3).toFixed(2)}%, 0, 0)`;
    case "reassemble":
      return `scale(${(1.07 - eased * 0.07).toFixed(4)})`;
  }
}

function ReducedMotionStory({ chapter, transcriptId }: ScrollStoryStageProps) {
  const [captionsVisible, setCaptionsVisible] = useState(true);
  const [sceneIndex, setSceneIndex] = useState(0);
  const activeScene = chapter.scenes[sceneIndex] ?? chapter.scenes[0];

  return (
    <section
      aria-labelledby="btg-reduced-title"
      className="btg-reduced"
      id="btg-story"
      tabIndex={-1}
    >
      <StoryImage
        alt={activeScene.artwork.alt}
        className="btg-reduced__poster"
        eager
        sizes="(max-width: 760px) 100vw, 58vw"
        src={activeScene.artwork.src}
        srcSet={activeScene.artwork.srcSet}
      />
      <div className="btg-reduced__copy">
        <p className="btg-kicker">Beyond The Glass · Reduced motion tour</p>
        <h1 id="btg-reduced-title">{activeScene.title}</h1>
        <p>{activeScene.summary}</p>
        <div className="btg-reduced__steps" aria-label="Journey chapters">
          {chapter.scenes.map((scene, index) => (
            <button
              aria-current={index === sceneIndex ? "step" : undefined}
              key={scene.id}
              onClick={() => setSceneIndex(index)}
              type="button"
            >
              <span>{scene.number}</span>
              {scene.title}
            </button>
          ))}
        </div>
        <div className="btg-reduced__notes">
          {activeScene.fieldNotes.map((note) => (
            <article key={note.title}>
              <span>{note.eyebrow}</span>
              <strong>{note.title}</strong>
              <p>{note.detail}</p>
            </article>
          ))}
        </div>
        <section aria-label="Optional narration and captions" className="btg-optional-audio">
          <NarrationControls
            captionsVisible={captionsVisible}
            onCaptionsChange={setCaptionsVisible}
            onSceneRequest={setSceneIndex}
            onTranscriptRequest={() => focusJourneySection(transcriptId)}
            scene={activeScene}
            sceneCount={chapter.scenes.length}
            sceneIndex={sceneIndex}
          />
        </section>
      </div>
    </section>
  );
}

export function ScrollStoryStage({ chapter, transcriptId }: ScrollStoryStageProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { activeScene, progress, reducedMotion, sceneIndex, sceneProgress } =
    useScrollStoryProgress(sectionRef, chapter.scenes);
  const [captionsVisible, setCaptionsVisible] = useState(false);
  const [resumeSceneIndex, setResumeSceneIndex] = useState<number | null>(null);

  const previousScene = chapter.scenes[Math.max(0, sceneIndex - 1)] ?? activeScene;
  const sceneEntryBlend =
    sceneIndex === 0 ? 1 : smoothstep(progressBetween(sceneProgress, 0, 0.13));
  const activeSpeaker = activeScene.narration[0]?.speaker ?? "Sippy";
  const journeyPercent = Math.round(progress * 100);

  const sceneOffsets = useMemo(
    () =>
      chapter.scenes.map((scene) => ({
        id: scene.id,
        progress: scene.range[0] + Math.min(0.01, (scene.range[1] - scene.range[0]) / 4)
      })),
    [chapter.scenes]
  );

  const requestScene = (index: number) => {
    const section = sectionRef.current;
    const target = sceneOffsets[index];
    if (!section || !target || typeof window === "undefined") return;
    const rect = section.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const travel = Math.max(1, rect.height - window.innerHeight);
    window.scrollTo({
      behavior: reducedMotion ? "auto" : "smooth",
      top: sectionTop + travel * target.progress
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as { sceneId?: string };
      const storedIndex = chapter.scenes.findIndex((scene) => scene.id === parsed.sceneId);
      if (storedIndex > 0) setResumeSceneIndex(storedIndex);
    } catch {
      window.localStorage.removeItem(PROGRESS_STORAGE_KEY);
    }
  }, [chapter.scenes]);

  useEffect(() => {
    if (typeof window === "undefined" || sceneIndex <= 0) return;
    try {
      window.localStorage.setItem(
        PROGRESS_STORAGE_KEY,
        JSON.stringify({
          sceneId: activeScene.id,
          updatedAt: new Date().toISOString()
        })
      );
      setResumeSceneIndex(sceneIndex);
    } catch {
      // The tour remains fully usable when storage is unavailable or blocked.
    }
  }, [activeScene.id, sceneIndex]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const candidates = [
      chapter.scenes[sceneIndex]?.artwork,
      chapter.scenes[sceneIndex + 1]?.artwork
    ].filter(Boolean);
    candidates.forEach((artwork) => {
      if (!artwork) return;
      const image = new Image();
      image.decoding = "async";
      image.src = artwork.src;
    });
  }, [chapter.scenes, sceneIndex]);

  if (reducedMotion) {
    return <ReducedMotionStory chapter={chapter} transcriptId={transcriptId} />;
  }

  const stageStyle = {
    "--btg-progress": progress.toFixed(4),
    "--btg-scene-progress": sceneProgress.toFixed(4),
    "--btg-scene-count": chapter.scenes.length,
    "--btg-drop-x": `${activeScene.drop.x}%`,
    "--btg-drop-y": `${activeScene.drop.y}%`,
    "--btg-drop-size": `${activeScene.drop.size}rem`
  } as CSSProperties;

  return (
    <section
      aria-label={`${chapter.title}: ${chapter.chapterTitle}`}
      className="btg-scroll-story"
      id="btg-story"
      ref={sectionRef}
      style={stageStyle}
    >
      <div className="btg-stage" data-motion={activeScene.motion} data-scene={activeScene.id}>
        <div className="btg-stage__visual">
          {sceneIndex > 0 ? (
            <StoryImage
              alt=""
              className="btg-scene-backdrop btg-scene-backdrop--previous"
              sizes="100vw"
              src={previousScene.artwork.src}
              srcSet={previousScene.artwork.srcSet}
              style={{ opacity: 0.82 * (1 - sceneEntryBlend) }}
            />
          ) : null}
          <StoryImage
            alt=""
            className="btg-scene-backdrop btg-scene-backdrop--active"
            eager
            sizes="100vw"
            src={activeScene.artwork.src}
            srcSet={activeScene.artwork.srcSet}
            style={{ opacity: 0.82 * sceneEntryBlend }}
          />
          {sceneIndex > 0 ? (
            <StoryImage
              alt=""
              className="btg-scene-art btg-scene-art--previous"
              sizes="100vw"
              src={previousScene.artwork.src}
              srcSet={previousScene.artwork.srcSet}
              style={{
                objectFit: previousScene.artwork.fit ?? "contain",
                objectPosition: previousScene.artwork.position ?? "center",
                opacity: 1 - sceneEntryBlend,
                transform: motionTransform(previousScene.motion, 1)
              }}
            />
          ) : null}
          <StoryImage
            alt={activeScene.artwork.alt}
            className="btg-scene-art btg-scene-art--active"
            eager
            sizes="100vw"
            src={activeScene.artwork.src}
            srcSet={activeScene.artwork.srcSet}
            style={{
              objectFit: activeScene.artwork.fit ?? "contain",
              objectPosition: activeScene.artwork.position ?? "center",
              opacity: sceneEntryBlend,
              transform: motionTransform(activeScene.motion, sceneProgress)
            }}
          />
          <div className="btg-stage__wash" aria-hidden="true" />
          <StoryImage
            alt=""
            className="btg-drop-protagonist"
            src={chapter.assets.centralDrop}
            style={{
              opacity: sceneIndex === 0 ? 0.68 : 0.88,
              transform: `translate(-50%, -50%) scale(${(0.82 + Math.sin(sceneProgress * Math.PI) * 0.18).toFixed(3)})`
            }}
          />
        </div>

        <div className="btg-stage__hud">
          <header className="btg-stage__header">
            <div>
              <p className="btg-kicker">Beyond The Glass · From Rain to First Sip</p>
              <strong>
                Stop {sceneIndex + 1} of {chapter.scenes.length}
              </strong>
            </div>
            <div className="btg-progress">
              <span>{activeScene.checkpoint}</span>
              <progress aria-label="Journey progress" max={100} value={journeyPercent} />
            </div>
          </header>

          {sceneIndex === 0 ? (
            <div className="btg-plaza-map-layer">
              <button
                className="btg-plaza-node btg-plaza-node--active"
                onClick={() => requestScene(resumeSceneIndex ?? 1)}
                style={{ left: "50%", top: "49%" }}
                type="button"
              >
                <span>Active adventure</span>
                <strong>Wine · From Rain to First Sip</strong>
                <small>
                  {resumeSceneIndex
                    ? `Continue at ${chapter.scenes[resumeSceneIndex]?.title ?? "your last stop"}`
                    : "Begin at sunrise"}
                </small>
              </button>
              {ACADEMY_ROADMAP.map((landmark) => (
                <div
                  className="btg-plaza-node btg-plaza-node--future"
                  key={landmark.label}
                  style={{ left: `${landmark.x}%`, top: `${landmark.y}%` }}
                >
                  <span>Forthcoming</span>
                  <strong>{landmark.label}</strong>
                  <small>{landmark.note}</small>
                </div>
              ))}
              {resumeSceneIndex ? (
                <button
                  className="btg-plaza-replay"
                  onClick={() => {
                    try {
                      window.localStorage.removeItem(PROGRESS_STORAGE_KEY);
                    } catch {
                      // Storage may be disabled; replay still works.
                    }
                    setResumeSceneIndex(null);
                    requestScene(1);
                  }}
                  type="button"
                >
                  Replay the sunrise opening
                </button>
              ) : null}
            </div>
          ) : null}

          <aside
            aria-label="SIP Academy field-trip map"
            className={`btg-academy-map ${sceneIndex === 0 ? "btg-academy-map--expanded" : ""}`}
          >
            <StoryImage
              alt=""
              className="btg-academy-map__image"
              eager={sceneIndex === 0}
              sizes={sceneIndex === 0 ? "(max-width: 760px) 100vw, 42vw" : "18rem"}
              src={chapter.assets.academyMap}
              srcSet={chapter.assets.academyMapSet}
            />
            <div className="btg-academy-map__hotspots">
              {chapter.scenes.map((scene, index) => (
                <button
                  aria-current={index === sceneIndex ? "step" : undefined}
                  aria-label={`Go to ${scene.title}: ${scene.landmark.label}`}
                  key={scene.id}
                  onClick={() => requestScene(index)}
                  style={{
                    left: `${scene.landmark.x}%`,
                    top: `${scene.landmark.y}%`
                  }}
                  title={scene.landmark.label}
                  type="button"
                >
                  <span>{index + 1}</span>
                </button>
              ))}
            </div>
            <p>
              <span>Now entering</span>
              <strong>{activeScene.landmark.label}</strong>
            </p>
          </aside>

          <div className="btg-story-panel">
            <div className="btg-stage__copy">
              <p className="btg-kicker">
                {activeScene.number} · {activeScene.eyebrow}
              </p>
              <h1>{activeScene.title}</h1>
              <p>{activeScene.summary}</p>
            </div>

            <div className="btg-note-stack">
              <blockquote className="btg-guide-note">
                <img alt="" decoding="async" src={CHARACTER_ASSETS[activeSpeaker]} />
                <div>
                  <strong>{activeSpeaker}</strong>
                  <p>{activeScene.narration[0]?.text}</p>
                </div>
              </blockquote>
              <div className="btg-field-notes" aria-label={`${activeScene.title} field notes`}>
                {activeScene.fieldNotes.map((note, index) => (
                  <article
                    className={`btg-field-note btg-field-note--${FIELD_NOTE_MATERIALS[index % FIELD_NOTE_MATERIALS.length]}`}
                    key={`${activeScene.id}-${note.title}`}
                  >
                    <header>
                      <span>{note.eyebrow}</span>
                      <strong>{note.title}</strong>
                    </header>
                    <p>{note.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="btg-character-party" aria-label="Your SIP Academy guides">
            {(Object.keys(CHARACTER_ASSETS) as BeyondTheGlassSpeaker[]).map((speaker) => (
              <figure
                className={speaker === activeSpeaker || sceneIndex <= 1 ? "is-active" : ""}
                key={speaker}
              >
                <img alt="" decoding="async" src={CHARACTER_ASSETS[speaker]} />
                <figcaption>
                  <strong>{speaker}</strong>
                  <span>{CHARACTER_ROLES[speaker]}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <footer className="btg-journey-dock">
            <button
              disabled={sceneIndex === 0}
              onClick={() => requestScene(Math.max(0, sceneIndex - 1))}
              type="button"
            >
              Back
            </button>
            <div aria-live="polite">
              <span>{activeScene.number}</span>
              <strong>{activeScene.title}</strong>
            </div>
            <button
              disabled={sceneIndex === chapter.scenes.length - 1}
              onClick={() => requestScene(Math.min(chapter.scenes.length - 1, sceneIndex + 1))}
              type="button"
            >
              Continue
            </button>
            <section aria-label="Optional narration" className="btg-optional-audio">
              <NarrationControls
                captionsVisible={captionsVisible}
                onCaptionsChange={setCaptionsVisible}
                onSceneRequest={requestScene}
                onTranscriptRequest={() => focusJourneySection(transcriptId)}
                scene={activeScene}
                sceneCount={chapter.scenes.length}
                sceneIndex={sceneIndex}
              />
            </section>
          </footer>
        </div>
      </div>
    </section>
  );
}
