import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type SyntheticEvent
} from "react";
import type { BeyondTheGlassChapter } from "../../data/beyondTheGlassChapters";
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
  height: number;
  src: string;
  style?: CSSProperties;
  width: number;
};

const CHARACTER_ASSETS = {
  Sippy: "/game/sprites/characters/main-5.png",
  Roma: "/game/sprites/characters/roma-2.png",
  Hummin: "/game/sprites/characters/main-3.png"
} as const;

const CHARACTER_ROLES: Record<keyof typeof CHARACTER_ASSETS, string> = {
  Sippy: "Archivist",
  Roma: "Sensory guide",
  Hummin: "Systems guide"
};

type StoryBaseLayer = "opening" | "mid" | "isolation" | "orbit" | "artifact" | "lobby";

const SCENE_BASE_LAYERS: readonly StoryBaseLayer[] = [
  "opening",
  "opening",
  "mid",
  "isolation",
  "orbit",
  "orbit",
  "artifact",
  "lobby"
];

function smoothstep(value: number): number {
  const progress = Math.min(1, Math.max(0, value));
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

function StoryImage({ alt, className, eager, height, src, style, width }: StoryImageProps) {
  const [failed, setFailed] = useState(false);
  const handleError = (_event: SyntheticEvent<HTMLImageElement>) => setFailed(true);

  useEffect(() => setFailed(false), [src]);

  if (failed) {
    return (
      <div
        aria-hidden={alt ? undefined : true}
        aria-label={alt || undefined}
        className={`${className} btg-story-image--fallback`}
        role={alt ? "img" : undefined}
        style={style}
      >
        <span>Archive image unavailable</span>
      </div>
    );
  }

  return (
    <img
      alt={alt}
      className={className}
      decoding="async"
      height={height}
      loading={eager ? "eager" : "lazy"}
      onError={handleError}
      src={src}
      style={style}
      width={width}
    />
  );
}

function ReducedMotionStory({
  chapter,
  transcriptId
}: ScrollStoryStageProps) {
  const [captionsVisible, setCaptionsVisible] = useState(true);
  const [sceneIndex, setSceneIndex] = useState(0);
  const activeScene = chapter.scenes[sceneIndex] ?? chapter.scenes[0];

  return (
    <section className="btg-reduced" id="btg-story" aria-labelledby="btg-reduced-title" tabIndex={-1}>
      <StoryImage
        alt="Sippy, Roma, and Hummin follow a luminous drop through a connected beverage system"
        className="btg-reduced__poster"
        eager
        height={1358}
        src={chapter.assets.reducedMotionPoster}
        width={1086}
      />
      <div className="btg-reduced__copy">
        <p className="btg-kicker">Beyond The Glass · Chapter 01</p>
        <h1 id="btg-reduced-title">{chapter.chapterTitle}</h1>
        <p>{chapter.description}</p>
        <ol>
          {chapter.scenes.map((scene, index) => (
            <li aria-current={index === sceneIndex ? "step" : undefined} key={scene.id}>
              <strong>
                {scene.number} · {scene.title}
              </strong>
              <span>{scene.summary}</span>
            </li>
          ))}
        </ol>
        <NarrationControls
          captionsVisible={captionsVisible}
          onCaptionsChange={setCaptionsVisible}
          onSceneRequest={setSceneIndex}
          onTranscriptRequest={() => focusJourneySection(transcriptId)}
          scene={activeScene}
          sceneCount={chapter.scenes.length}
          sceneIndex={sceneIndex}
        />
        <a
          href={`#${transcriptId}`}
          onClick={(event) => {
            event.preventDefault();
            focusJourneySection(transcriptId);
          }}
        >
          Read the complete transcript
        </a>
      </div>
    </section>
  );
}

export function ScrollStoryStage({ chapter, transcriptId }: ScrollStoryStageProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { activeScene, progress, reducedMotion, sceneIndex, sceneProgress } = useScrollStoryProgress(
    sectionRef,
    chapter.scenes
  );
  const [captionsVisible, setCaptionsVisible] = useState(false);
  const [narratedLineIndex, setNarratedLineIndex] = useState<number | null>(null);

  const layerProgress = progressBetween(progress, 0.52, 0.86);
  const scrollLayerIndex = Math.min(
    chapter.knowledgeLayers.length - 1,
    Math.floor(layerProgress * chapter.knowledgeLayers.length)
  );
  const narratedLayerIndex =
    activeScene.id === "deconstruction" && narratedLineIndex !== null && narratedLineIndex > 0
      ? Math.min(chapter.knowledgeLayers.length - 1, narratedLineIndex - 1)
      : null;
  const activeLayerIndex = narratedLayerIndex ?? scrollLayerIndex;
  const activeLayer = chapter.knowledgeLayers[Math.max(0, activeLayerIndex)];
  const layerFocusVisible =
    activeScene.id === "deconstruction" || activeScene.id === "system-in-motion";

  const currentBaseLayer = SCENE_BASE_LAYERS[sceneIndex] ?? "opening";
  const previousBaseLayer =
    SCENE_BASE_LAYERS[Math.max(0, sceneIndex - 1)] ?? currentBaseLayer;
  const sceneEntryBlend =
    sceneIndex === 0 ? 1 : smoothstep(progressBetween(sceneProgress, 0, 0.08));
  const baseLayerOpacity = (layer: StoryBaseLayer) => {
    if (layer === currentBaseLayer && layer === previousBaseLayer) return 1;
    if (layer === currentBaseLayer) return sceneEntryBlend;
    if (layer === previousBaseLayer) return 1 - sceneEntryBlend;
    return 0;
  };

  const openingDive =
    sceneIndex === 0
      ? smoothstep(sceneProgress)
      : sceneIndex === 1
        ? 1 + smoothstep(sceneProgress) * 0.12
        : 1;
  const openingOpacity = baseLayerOpacity("opening");
  const midAltitudeOpacity = baseLayerOpacity("mid");
  const centralSubjectOpacity =
    sceneIndex === 1
      ? smoothstep(progressBetween(sceneProgress, 0.08, 0.28)) *
        (1 - smoothstep(progressBetween(sceneProgress, 0.78, 0.96)))
      : 0;
  const centralSubjectTravel =
    sceneIndex === 1 ? smoothstep(progressBetween(sceneProgress, 0.08, 0.82)) : 0;
  const isolationOpacity = baseLayerOpacity("isolation");
  const orbitOpacity = baseLayerOpacity("orbit");
  const artifactOpacity = baseLayerOpacity("artifact");
  const lobbyOpacity = baseLayerOpacity("lobby");
  const noiseOpacity =
    sceneIndex === 3
      ? smoothstep(progressBetween(sceneProgress, 0.05, 0.24)) *
        (1 - smoothstep(progressBetween(sceneProgress, 0.74, 0.96)))
      : 0;
  const characterOpacity =
    sceneIndex === 1
      ? smoothstep(progressBetween(sceneProgress, 0, 0.12))
      : sceneIndex >= 2 && sceneIndex < 5
        ? 1
        : sceneIndex === 5
          ? 1 - smoothstep(progressBetween(sceneProgress, 0.82, 1))
          : 0;

  const stageStyle = {
    "--btg-progress": progress.toFixed(4),
    "--btg-scene-progress": sceneProgress.toFixed(4)
  } as CSSProperties;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const candidates =
      progress > 0.68
        ? [chapter.assets.finalArtifact, chapter.assets.lobby]
        : progress > 0.08
          ? [
              chapter.assets.midAltitude,
              chapter.assets.centralSubject,
              chapter.assets.isolation,
              chapter.assets.orbit,
              chapter.assets.noise
            ]
          : [chapter.assets.opening, chapter.assets.centralSubject];
    candidates.forEach((src) => {
      const image = new Image();
      image.decoding = "async";
      image.src = src;
    });
  }, [chapter.assets, progress > 0.08, progress > 0.68]);

  const sceneOffsets = useMemo(
    () =>
      chapter.scenes.map((scene) => ({
        id: scene.id,
        progress: scene.range[0] + Math.min(0.02, (scene.range[1] - scene.range[0]) / 3)
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

  if (reducedMotion) {
    return <ReducedMotionStory chapter={chapter} transcriptId={transcriptId} />;
  }

  return (
    <section
      className="btg-scroll-story"
      id="btg-story"
      ref={sectionRef}
      aria-label={`${chapter.title}: ${chapter.chapterTitle}`}
    >
      <div className="btg-stage" data-scene={activeScene.id} style={stageStyle}>
        <div className="btg-stage__visual" aria-hidden="true">
          <StoryImage
            alt=""
            className="btg-visual-layer btg-visual-layer--opening"
            eager
            height={941}
            src={chapter.assets.opening}
            width={1672}
            style={{
              opacity: openingOpacity,
              transform: `scale(${1 + openingDive * 0.76}) translate3d(${openingDive * -6}%, ${openingDive * 3}%, 0)`
            }}
          />
          <StoryImage
            alt=""
            className="btg-visual-layer btg-visual-layer--mid"
            height={900}
            src={chapter.assets.midAltitude}
            width={1600}
            style={{
              opacity: midAltitudeOpacity,
              transform: `scale(${1.04 + smoothstep(sceneProgress) * 0.18})`
            }}
          />
          <StoryImage
            alt=""
            className="btg-central-drop"
            height={1152}
            src={chapter.assets.centralSubject}
            width={768}
            style={{
              left: `${73 - centralSubjectTravel * 9}%`,
              opacity: centralSubjectOpacity,
              top: `${68 - centralSubjectTravel * 18}%`,
              transform: `translate3d(-50%, -50%, 0) scale(${0.32 + centralSubjectTravel * 0.88})`
            }}
          />
          <StoryImage
            alt=""
            className="btg-visual-layer btg-visual-layer--isolation"
            height={941}
            src={chapter.assets.isolation}
            width={1672}
            style={{
              opacity: isolationOpacity,
              transform: `scale(${0.92 + smoothstep(sceneProgress) * 0.14})`
            }}
          />
          <StoryImage
            alt=""
            className="btg-visual-layer btg-visual-layer--orbit"
            height={1024}
            src={chapter.assets.orbit}
            width={1536}
            style={{
              opacity: orbitOpacity,
              transform: `scale(${0.82 + smoothstep(layerProgress) * 0.18}) rotate(${(layerProgress - 0.5) * 1.2}deg)`
            }}
          />
          <StoryImage
            alt=""
            className="btg-visual-layer btg-visual-layer--artifact"
            height={941}
            src={chapter.assets.finalArtifact}
            width={1672}
            style={{
              opacity: artifactOpacity,
              transform: `scale(${0.88 + smoothstep(sceneProgress) * 0.12})`
            }}
          />
          <StoryImage
            alt=""
            className="btg-visual-layer btg-visual-layer--lobby"
            height={941}
            src={chapter.assets.lobby}
            width={1672}
            style={{ opacity: lobbyOpacity, transform: `scale(${1.04 - lobbyOpacity * 0.04})` }}
          />

          <StoryImage
            alt=""
            className="btg-visual-layer btg-visual-layer--noise"
            height={900}
            src={chapter.assets.noise}
            width={1600}
            style={{ opacity: noiseOpacity }}
          />

          <div className="btg-characters" style={{ opacity: characterOpacity }}>
            {(Object.keys(CHARACTER_ASSETS) as Array<keyof typeof CHARACTER_ASSETS>).map((name) => (
              <figure className={`btg-character btg-character--${name.toLowerCase()}`} key={name}>
                <img alt="" height={768} loading="eager" src={CHARACTER_ASSETS[name]} width={512} />
                <figcaption>
                  <strong>{name}</strong>
                  <span>{CHARACTER_ROLES[name]}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <header className="btg-stage__header">
          <div>
            <span>Beyond The Glass</span>
            <strong>Chapter 01 · {chapter.chapterTitle}</strong>
          </div>
          <label>
            Journey progress
            <progress max={1} value={progress}>
              {Math.round(progress * 100)}%
            </progress>
          </label>
        </header>

        <div className="btg-stage__copy">
          <p className="btg-kicker">
            {activeScene.number} · {activeScene.eyebrow}
          </p>
          <h1>
            {sceneIndex === 0
              ? chapter.title
              : sceneIndex === chapter.scenes.length - 1
                ? "Go Beyond The Glass"
                : activeScene.title}
          </h1>
          {sceneIndex === 0 ? <h2>{chapter.chapterTitle}</h2> : null}
          {sceneIndex === chapter.scenes.length - 1 ? <h2>{activeScene.title}</h2> : null}
          <p>{activeScene.summary}</p>
          {sceneIndex === 0 ? <p className="btg-stage__invitation">Scroll to follow one Drop through the system.</p> : null}
          {sceneIndex === chapter.scenes.length - 1 ? (
            <div className="btg-stage__cta">
              <a href={`#app/${chapter.primaryCta.route}`}>{chapter.primaryCta.label}</a>
              <a
                href={chapter.secondaryCta.href}
                onClick={(event) => {
                  if (!chapter.secondaryCta.href.startsWith("#")) return;
                  event.preventDefault();
                  focusJourneySection(chapter.secondaryCta.href.slice(1));
                }}
              >
                {chapter.secondaryCta.label}
              </a>
            </div>
          ) : null}
        </div>

        {layerFocusVisible ? (
          <aside className="btg-layer-focus">
            <div className="btg-layer-focus__index">{activeLayer.number}</div>
            <div>
              <p className="btg-layer-focus__object">
                {activeLayer.guide} guides · {activeLayer.object}
              </p>
              <h2>{activeLayer.title}</h2>
              <p className="btg-layer-focus__explanation">{activeLayer.explanation}</p>
              <strong className="btg-layer-focus__question">
                Consider this: {activeLayer.question}
              </strong>
            </div>
          </aside>
        ) : null}

        <NarrationControls
          captionsVisible={captionsVisible}
          onActiveLineChange={setNarratedLineIndex}
          onCaptionsChange={setCaptionsVisible}
          onSceneRequest={requestScene}
          onTranscriptRequest={() => focusJourneySection(transcriptId)}
          scene={activeScene}
          sceneCount={chapter.scenes.length}
          sceneIndex={sceneIndex}
        />
      </div>
    </section>
  );
}
