import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type SyntheticEvent,
  type UIEvent
} from "react";
import type {
  BeyondTheGlassChapter,
  BeyondTheGlassMotion,
  BeyondTheGlassSpeaker
} from "../../data/beyondTheGlassChapters";
import { beyondTheGlassCurriculumLabs } from "../../data/beyondTheGlassCurriculum";
import { CurriculumLab } from "./CurriculumLab";
import { GuideSprite } from "./GuideSprite";
import { NarrationControls } from "./NarrationControls";
import { progressBetween, useScrollStoryProgress } from "./useScrollStoryProgress";
import {
  VineAnatomyParallax,
  VineAnatomyReadout,
  VineAnatomyStudyList
} from "./VineAnatomyParallax";

type ScrollStoryStageProps = {
  chapter: BeyondTheGlassChapter;
  transcriptId: string;
};

type StoryImageProps = {
  alt: string;
  className: string;
  eager?: boolean;
  portraitSrc?: string;
  portraitSrcSet?: string;
  sizes?: string;
  src: string;
  srcSet?: string;
  style?: CSSProperties;
};

const GUIDE_ORDER: BeyondTheGlassSpeaker[] = ["Sippy", "Roma", "Hummin"];

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
  portraitSrc,
  portraitSrcSet,
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

  const image = (
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

  if (!portraitSrc && !portraitSrcSet) return image;

  return (
    <picture className="btg-story-picture">
      <source
        media="(max-width: 640px) and (orientation: portrait)"
        sizes="100vw"
        srcSet={portraitSrcSet ?? portraitSrc}
      />
      {image}
    </picture>
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

function noteDeckPosition(
  sceneProgress: number,
  cardCount: number,
  start: number,
  end: number
): number {
  if (cardCount <= 1) return 0;
  return smoothstep(progressBetween(sceneProgress, start, end)) * (cardCount - 1);
}

function noteCardState(index: number, position: number): "active" | "future" | "past" {
  const offset = index - position;
  if (Math.abs(offset) < 0.5) return "active";
  return offset < 0 ? "past" : "future";
}

function noteCardStyle(index: number, position: number): CSSProperties {
  const offset = index - position;

  if (offset < 0) {
    const sweep = clamp(-offset, 0, 1.15);
    return {
      filter: `brightness(${(1 - sweep * 0.08).toFixed(3)})`,
      opacity: clamp(1 - sweep * 1.08, 0, 1),
      pointerEvents: sweep > 0.48 ? "none" : "auto",
      transform: `translate3d(${(-sweep * 108).toFixed(2)}%, ${(-sweep * 0.9).toFixed(2)}rem, 0) rotate(${(-sweep * 9).toFixed(2)}deg) scale(${(1 - sweep * 0.035).toFixed(3)})`,
      zIndex: 120 - index
    };
  }

  const depth = Math.min(offset, 3);
  return {
    filter: `brightness(${(1 - depth * 0.045).toFixed(3)})`,
    opacity: clamp(1 - Math.max(0, depth - 1.8) * 0.7, 0.16, 1),
    pointerEvents: depth < 0.5 ? "auto" : "none",
    transform: `translate3d(${(depth * 0.58).toFixed(2)}rem, ${(depth * 0.5).toFixed(2)}rem, ${(-depth * 34).toFixed(2)}px) rotate(${(depth * 1.75).toFixed(2)}deg) scale(${(1 - depth * 0.028).toFixed(3)})`,
    zIndex: 120 - index
  };
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
        portraitSrc={activeScene.artwork.portraitSrc}
        portraitSrcSet={activeScene.artwork.portraitSrcSet}
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
        {activeScene.id === "vine-and-berry" ? <VineAnatomyStudyList /> : null}
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
  const storyPanelRef = useRef<HTMLDivElement>(null);
  const { activeScene, progress, reducedMotion, sceneIndex, sceneProgress } =
    useScrollStoryProgress(sectionRef, chapter.scenes);
  const [captionsVisible, setCaptionsVisible] = useState(false);
  const [activeNarrationLineIndex, setActiveNarrationLineIndex] = useState<number | null>(null);
  const [panelControlsCards, setPanelControlsCards] = useState(false);
  const [panelNoteProgress, setPanelNoteProgress] = useState(0);
  const [resumeSceneIndex, setResumeSceneIndex] = useState<number | null>(null);
  const [activeLabId, setActiveLabId] = useState<string | null>(null);
  const [noteView, setNoteView] = useState<"guide" | "study">("guide");

  const previousScene = chapter.scenes[Math.max(0, sceneIndex - 1)] ?? activeScene;
  const sceneEntryBlend =
    sceneIndex === 0 ? 1 : smoothstep(progressBetween(sceneProgress, 0, 0.13));
  const activeSpeaker = activeScene.narration[0]?.speaker ?? "Sippy";
  const activeCaptionLine =
    activeNarrationLineIndex === null
      ? null
      : (activeScene.narration[activeNarrationLineIndex] ?? activeScene.narration[0] ?? null);
  const cardInteractionProgress = panelControlsCards ? panelNoteProgress : sceneProgress;
  const guideScrollPosition = noteDeckPosition(
    cardInteractionProgress,
    activeScene.narration.length,
    0.14,
    0.62
  );
  const fieldNoteScrollPosition = noteDeckPosition(
    cardInteractionProgress,
    activeScene.fieldNotes.length,
    0.36,
    0.88
  );
  const guideDeckPosition =
    captionsVisible && activeNarrationLineIndex !== null
      ? activeNarrationLineIndex
      : guideScrollPosition;
  const visibleStudyCardIndex =
    Math.min(
      Math.max(0, Math.round(guideDeckPosition)),
      Math.max(0, activeScene.narration.length - 1)
    );
  const visibleFieldNoteIndex = Math.min(
    Math.max(0, Math.round(fieldNoteScrollPosition)),
    Math.max(0, activeScene.fieldNotes.length - 1)
  );
  const activeLab = beyondTheGlassCurriculumLabs[activeScene.id];
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

  const requestGuideCard = (index: number) => {
    const cardCount = activeScene.narration.length;
    if (cardCount <= 1) return;
    const cardProgress = index / (cardCount - 1);
    const localProgress = 0.14 + cardProgress * (0.62 - 0.14);
    setPanelControlsCards(true);
    setPanelNoteProgress(localProgress);
  };

  const handleStoryPanelScroll = (event: UIEvent<HTMLDivElement>) => {
    const panel = event.currentTarget;
    const travel = panel.scrollHeight - panel.clientHeight;
    if (travel <= 1) return;
    setPanelControlsCards(true);
    setPanelNoteProgress(clamp(panel.scrollTop / travel));
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

  useEffect(() => {
    setActiveLabId(null);
    setActiveNarrationLineIndex(null);
    setPanelControlsCards(false);
    setPanelNoteProgress(0);
    setNoteView("guide");
    if (storyPanelRef.current) storyPanelRef.current.scrollTop = 0;
  }, [activeScene.id]);

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
              className="btg-scene-art btg-scene-art--previous"
              portraitSrc={previousScene.artwork.portraitSrc}
              portraitSrcSet={previousScene.artwork.portraitSrcSet}
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
          {activeScene.id === "vine-and-berry" ? (
            <VineAnatomyParallax opacity={sceneEntryBlend} progress={sceneProgress} />
          ) : (
            <StoryImage
              alt={activeScene.artwork.alt}
              className="btg-scene-art btg-scene-art--active"
              eager
              portraitSrc={activeScene.artwork.portraitSrc}
              portraitSrcSet={activeScene.artwork.portraitSrcSet}
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
          )}
          <div className="btg-stage__wash" aria-hidden="true" />
          {activeScene.id === "vine-and-berry" ? null : (
            <StoryImage
              alt=""
              className="btg-drop-protagonist"
              src={chapter.assets.centralDrop}
              style={{
                opacity: sceneIndex === 0 ? 0.68 : 0.88,
                transform: `translate(-50%, -50%) scale(${(0.82 + Math.sin(sceneProgress * Math.PI) * 0.18).toFixed(3)})`
              }}
            />
          )}
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

          <div
            aria-label={`${activeScene.title} illustrated scene notes`}
            className="btg-story-panel"
            onScroll={handleStoryPanelScroll}
            ref={storyPanelRef}
            tabIndex={0}
          >
            <div className="btg-stage__copy">
              <p className="btg-kicker">
                {activeScene.number} · {activeScene.eyebrow}
              </p>
              <h1>{activeScene.title}</h1>
              <p>{activeScene.summary}</p>
              {activeScene.id === "vine-and-berry" ? (
                <VineAnatomyReadout progress={sceneProgress} />
              ) : null}
              {activeLab ? (
                <button
                  className="btg-open-lab"
                  onClick={() => setActiveLabId(activeLab.id)}
                  type="button"
                >
                  Open visual lab · {activeLab.title}
                </button>
              ) : null}
            </div>

            <div className="btg-note-switcher" aria-label="Choose a field-note deck">
              <button
                aria-pressed={noteView === "guide"}
                onClick={() => setNoteView("guide")}
                type="button"
              >
                Guide note
              </button>
              <button
                aria-pressed={noteView === "study"}
                onClick={() => setNoteView("study")}
                type="button"
              >
                Study card
              </button>
            </div>

            <div className="btg-note-stack" data-note-view={noteView}>
              <aside
                aria-label={`${activeScene.title} guide study cards`}
                className="btg-guide-card-deck"
              >
                {activeScene.narration.map((studyCard, index) => {
                  const isActive = index === visibleStudyCardIndex;
                  const speaker = studyCard.speaker;
                  return (
                    <blockquote
                      aria-hidden={!isActive}
                      className="btg-guide-note"
                      data-card-state={noteCardState(index, guideDeckPosition)}
                      data-speaker={speaker}
                      key={`${activeScene.id}-${speaker}-${index}`}
                      style={noteCardStyle(index, guideDeckPosition)}
                    >
                      <span aria-hidden="true" className="btg-guide-note__pin" />
                      <div className="btg-guide-note__guide">
                        <GuideSprite
                          active={isActive}
                          cue={`${activeScene.id}:${index}`}
                          reducedMotion={reducedMotion}
                          speaker={speaker}
                        />
                        <span>{CHARACTER_ROLES[speaker]}</span>
                      </div>
                      <div className="btg-guide-note__body">
                        <header>
                          <span>Sommelier field card</span>
                          <strong>{speaker}</strong>
                        </header>
                        <p aria-live={isActive && captionsVisible && activeCaptionLine ? "polite" : "off"}>
                          {studyCard.text}
                        </p>
                        <footer>
                          <span>
                            Note {index + 1} of {activeScene.narration.length}
                          </span>
                          {isActive && activeScene.narration.length > 1 && !captionsVisible ? (
                            <nav aria-label="Guide study cards">
                              <button
                                aria-label="Show the previous guide note"
                                disabled={index === 0}
                                onClick={() => requestGuideCard(Math.max(0, index - 1))}
                                type="button"
                              >
                                ←
                              </button>
                              <button
                                aria-label="Show the next guide note"
                                disabled={index === activeScene.narration.length - 1}
                                onClick={() =>
                                  requestGuideCard(
                                    Math.min(activeScene.narration.length - 1, index + 1)
                                  )
                                }
                                type="button"
                              >
                                →
                              </button>
                            </nav>
                          ) : null}
                        </footer>
                      </div>
                    </blockquote>
                  );
                })}
              </aside>
              <div
                aria-label={`${activeScene.title} field notes`}
                className="btg-field-notes"
                data-card-count={activeScene.fieldNotes.length}
              >
                {activeScene.fieldNotes.map((note, index) => {
                  const isActive = index === visibleFieldNoteIndex;
                  return (
                    <article
                      aria-hidden={!isActive}
                      className={`btg-field-note btg-field-note--${FIELD_NOTE_MATERIALS[index % FIELD_NOTE_MATERIALS.length]}`}
                      data-card-state={noteCardState(index, fieldNoteScrollPosition)}
                      key={`${activeScene.id}-${note.title}`}
                      style={noteCardStyle(index, fieldNoteScrollPosition)}
                    >
                      <header>
                        <span>{note.eyebrow}</span>
                        <strong>{note.title}</strong>
                        <small>
                          Card {index + 1} of {activeScene.fieldNotes.length}
                        </small>
                      </header>
                      <p>{note.detail}</p>
                      {isActive && activeScene.fieldNotes.length > 1 ? (
                        <nav aria-label="Study cards">
                          <button
                            aria-label="Show the previous study card"
                            disabled={index === 0}
                            onClick={() => {
                              setPanelControlsCards(true);
                              setPanelNoteProgress(
                                activeScene.fieldNotes.length <= 1
                                  ? 0
                                  : 0.36 +
                                      (Math.max(0, index - 1) /
                                        (activeScene.fieldNotes.length - 1)) *
                                        (0.88 - 0.36)
                              );
                            }}
                            type="button"
                          >
                            ←
                          </button>
                          <button
                            aria-label="Show the next study card"
                            disabled={index === activeScene.fieldNotes.length - 1}
                            onClick={() => {
                              setPanelControlsCards(true);
                              setPanelNoteProgress(
                                activeScene.fieldNotes.length <= 1
                                  ? 0
                                  : 0.36 +
                                      (Math.min(
                                        activeScene.fieldNotes.length - 1,
                                        index + 1
                                      ) /
                                        (activeScene.fieldNotes.length - 1)) *
                                        (0.88 - 0.36)
                              );
                            }}
                            type="button"
                          >
                            →
                          </button>
                        </nav>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="btg-character-party" aria-label="Your SIP Academy guides">
            {GUIDE_ORDER.map((speaker) => (
              <figure
                className={speaker === activeSpeaker || sceneIndex <= 1 ? "is-active" : ""}
                key={speaker}
              >
                <GuideSprite
                  active={speaker === activeSpeaker || sceneIndex <= 1}
                  cue={`${activeScene.id}:${speaker}`}
                  reducedMotion={reducedMotion}
                  speaker={speaker}
                />
                <figcaption>
                  <strong>{speaker}</strong>
                  <span>{CHARACTER_ROLES[speaker]}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <footer aria-label="Wine adventure journey controls" className="btg-journey-dock">
            <div className="btg-journey-path">
              <button
                aria-label={
                  sceneIndex === 0
                    ? "Already at the first stop"
                    : `Go back to ${chapter.scenes[sceneIndex - 1]?.title ?? "the previous stop"}`
                }
                className="btg-dock-action btg-dock-action--back"
                disabled={sceneIndex === 0}
                onClick={() => requestScene(Math.max(0, sceneIndex - 1))}
                type="button"
              >
                <span aria-hidden="true">←</span>
                <span>Back</span>
              </button>
              <div className="btg-dock-status" aria-live="polite">
                <div>
                  <span>
                    Stop {sceneIndex + 1} of {chapter.scenes.length}
                  </span>
                  <strong>{activeScene.title}</strong>
                </div>
                <div
                  aria-label={`Wine adventure progress: stop ${sceneIndex + 1} of ${chapter.scenes.length}`}
                  aria-valuemax={chapter.scenes.length}
                  aria-valuemin={1}
                  aria-valuenow={sceneIndex + 1}
                  className="btg-dock-progress"
                  role="progressbar"
                >
                  <span
                    style={{
                      width: `${((sceneIndex + 1) / chapter.scenes.length) * 100}%`
                    }}
                  />
                </div>
              </div>
              <button
                aria-label={
                  sceneIndex === chapter.scenes.length - 1
                    ? "Already at the final stop"
                    : `Continue to ${chapter.scenes[sceneIndex + 1]?.title ?? "the next stop"}`
                }
                className="btg-dock-action btg-dock-action--continue"
                disabled={sceneIndex === chapter.scenes.length - 1}
                onClick={() => requestScene(Math.min(chapter.scenes.length - 1, sceneIndex + 1))}
                type="button"
              >
                <span>Continue</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
            <section aria-label="Optional narration" className="btg-optional-audio">
              <span className="btg-dock-tools-label">Field kit</span>
              <NarrationControls
                captionsVisible={captionsVisible}
                onActiveLineChange={setActiveNarrationLineIndex}
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
        {activeLab && activeLabId === activeLab.id ? (
          <CurriculumLab
            lab={activeLab}
            onClose={() => setActiveLabId(null)}
            reducedMotion={reducedMotion}
          />
        ) : null}
      </div>
    </section>
  );
}
