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
import { FieldAtlasStudy } from "./FieldAtlasStudy";
import { ATLAS_SCENE_DESIGNS, type AtlasPoint } from "./fieldAtlasDesigns";
import { GuideSprite } from "./GuideSprite";
import { progressBetween, useScrollStoryProgress } from "./useScrollStoryProgress";
import { VineAnatomyStudyList } from "./VineAnatomyParallax";
import { VineFieldAtlas } from "./VineFieldAtlas";

type ScrollStoryStageProps = {
  chapter: BeyondTheGlassChapter;
};

type SceneWithNotes = BeyondTheGlassChapter["scenes"][number];

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
const NOTE_CROP_LAYOUTS: Record<number, readonly AtlasPoint[]> = {
  1: [[50, 52]],
  2: [[31, 36], [69, 36]],
  3: [[22, 34], [50, 22], [78, 34]],
  4: [[20, 32], [42, 20], [64, 20], [82, 36]],
  5: [[18, 31], [36, 18], [64, 18], [82, 31], [50, 72]],
  6: [[16, 28], [50, 17], [84, 28], [16, 72], [50, 83], [84, 72]],
  7: [[14, 27], [50, 15], [86, 27], [86, 70], [50, 84], [14, 70], [50, 49]],
  8: [[14, 25], [38, 15], [62, 15], [86, 25], [86, 73], [62, 84], [38, 84], [14, 73]],
  9: [[14, 24], [38, 14], [62, 14], [86, 24], [86, 72], [62, 84], [38, 84], [14, 72], [50, 49]]
};
const JOURNEY_STORAGE_SLUGS: Record<string, string> = {
  wine: "journey-of-a-drop",
  brewery: "brewery",
  distillery: "distillery",
  coffee: "coffee",
  kombucha: "kombucha",
  tea: "tea",
  water: "water"
};
const JOURNEY_LABELS: Record<string, string> = {
  wine: "Winery Adventure",
  brewery: "Brewery Adventure",
  distillery: "Distillery Adventure",
  "energy-drinks": "Energy Drinks Adventure",
  coffee: "Coffee Adventure",
  "health-drinks": "Health Drinks Adventure",
  juice: "Juice Adventure",
  kombucha: "Kombucha Adventure",
  milk: "Milk Adventure",
  sodas: "Sodas Adventure",
  tea: "Tea Adventure",
  water: "Water Adventure"
};
const DISCONNECTED_JOURNEYS = new Set([
  "energy-drinks",
  "health-drinks",
  "juice",
  "milk",
  "sodas"
]);
const ACADEMY_ROADMAP = [
  { enabled: true, journey: "wine", label: "Winery Adventure", note: "From Rain to First Sip", x: 50, y: 49 },
  { enabled: true, journey: "brewery", label: "Brewery Adventure", note: "From Grain to Tap", x: 19, y: 49 },
  { enabled: true, journey: "distillery", label: "Distillery Adventure", note: "From Source to Service", x: 81, y: 49 },
  { enabled: true, journey: "coffee", label: "Coffee Adventure", note: "From Seed to Service", x: 20, y: 75 },
  { enabled: true, journey: "tea", label: "Tea Adventure", note: "From Garden to Cup", x: 75, y: 22 },
  { enabled: true, journey: "water", label: "Water Adventure", note: "From Cloud to Glass", x: 50, y: 78 },
  { enabled: true, journey: "kombucha", label: "Kombucha Adventure", note: "From Tea to Living Culture", x: 82, y: 75 },
  { enabled: false, journey: "future", label: "Future Adventures", note: "Academy expansion", x: 49, y: 16 }
] as const;

function journeyHash(journey: string): string {
  return journey === "wine" ? "#app/btg" : `#app/btg?journey=${journey}`;
}

function clamp(value: number, minimum = 0, maximum = 1): number {
  return Math.min(maximum, Math.max(minimum, value));
}

function smoothstep(value: number): number {
  const progress = clamp(value);
  return progress * progress * (3 - 2 * progress);
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
      return `scale(${(0.965 + eased * 0.035).toFixed(4)}) translate3d(0, ${((0.5 - eased) * 1.2).toFixed(2)}%, 0)`;
    case "orbit":
      return `perspective(1200px) rotateY(${((-3 + eased * 6)).toFixed(2)}deg) scale(${(0.965 + Math.sin(eased * Math.PI) * 0.02).toFixed(4)})`;
    case "cutaway":
      return `scale(0.97) translate3d(0, ${((0.5 - eased) * 1.6).toFixed(2)}%, 0)`;
    case "rotate":
      return `perspective(1200px) rotateY(${((-4 + eased * 8)).toFixed(2)}deg) scale(0.965)`;
    case "glide":
      return `scale(0.97) translate3d(${((0.5 - eased) * 1.6).toFixed(2)}%, 0, 0)`;
    case "reassemble":
      return `scale(${(0.94 + eased * 0.06).toFixed(4)})`;
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
      backfaceVisibility: "hidden",
      filter: `brightness(${(1 - sweep * 0.1).toFixed(3)}) drop-shadow(${(
        sweep * 0.55
      ).toFixed(2)}rem 0.35rem 0.55rem rgba(0, 0, 0, 0.22))`,
      opacity: clamp(1 - Math.max(0, sweep - 0.72) * 3.6, 0, 1),
      pointerEvents: sweep > 0.48 ? "none" : "auto",
      transform: `perspective(1250px) translate3d(${(-sweep * 7).toFixed(2)}%, ${(
        -sweep * 0.24
      ).toFixed(2)}rem, ${(sweep * 44).toFixed(2)}px) rotateY(${(
        -sweep * 164
      ).toFixed(2)}deg) rotateZ(${(-sweep * 2.25).toFixed(2)}deg)`,
      transformOrigin: "left center",
      zIndex: 160 - index
    };
  }

  const depth = Math.min(offset, 3);
  return {
    backfaceVisibility: "hidden",
    filter: `brightness(${(1 - depth * 0.045).toFixed(3)})`,
    opacity: clamp(1 - Math.max(0, depth - 1.8) * 0.7, 0.16, 1),
    pointerEvents: depth < 0.5 ? "auto" : "none",
    transform: `perspective(1250px) translate3d(${(depth * 0.48).toFixed(2)}rem, ${(
      depth * 0.42
    ).toFixed(2)}rem, ${(-depth * 32).toFixed(2)}px) rotateY(${(
      depth * 1.8
    ).toFixed(2)}deg) rotateZ(${(depth * 1.35).toFixed(2)}deg) scale(${(
      1 - depth * 0.026
    ).toFixed(3)})`,
    transformOrigin: "left center",
    zIndex: 120 - index
  };
}

function sceneNoteImage(scene: SceneWithNotes): string {
  return scene.artwork.srcSet?.split(",")[0]?.trim().split(" ")[0] ?? scene.artwork.src;
}

function noteCropFocus(scene: SceneWithNotes, index: number): AtlasPoint {
  const authoredFocus = ATLAS_SCENE_DESIGNS[scene.id]?.nodes[index]?.focus;
  if (authoredFocus) return authoredFocus;

  const count = Math.min(9, Math.max(1, scene.fieldNotes.length));
  return NOTE_CROP_LAYOUTS[count]?.[index] ?? [50, 50];
}

function noteImageStyle(
  scene: SceneWithNotes,
  index: number,
  baseStyle: CSSProperties = {}
): CSSProperties {
  const focus = noteCropFocus(scene, index);

  return {
    ...baseStyle,
    "--btg-note-image": `url(${sceneNoteImage(scene)})`,
    "--btg-note-image-position": `${focus[0]}% ${focus[1]}%`
  } as CSSProperties;
}

type NoteDeckView = "guide" | "study";

const NOTE_DECK_TRANSITIONS = [0.2, 0.4, 0.6, 0.8] as const;

function guideDeckWeight(sceneProgress: number, hasStudyCards: boolean): number {
  if (!hasStudyCards) return 1;

  const progress = clamp(sceneProgress);
  const states = [1, 0, 1, 0, 1] as const;
  const transitionRadius = 0.045;
  let currentState: number = states[0];

  for (let index = 0; index < NOTE_DECK_TRANSITIONS.length; index += 1) {
    const boundary = NOTE_DECK_TRANSITIONS[index];
    const nextState = states[index + 1];
    if (progress < boundary - transitionRadius) return currentState;
    if (progress <= boundary + transitionRadius) {
      const transition = smoothstep(
        progressBetween(progress, boundary - transitionRadius, boundary + transitionRadius)
      );
      return currentState + (nextState - currentState) * transition;
    }
    currentState = nextState;
  }

  return currentState;
}

function ReducedMotionStory({ chapter }: ScrollStoryStageProps) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const activeScene = chapter.scenes[sceneIndex] ?? chapter.scenes[0];
  const isWineJourney = chapter.slug === "journey-of-a-drop";

  const returnToAcademy = () => {
    if (isWineJourney) {
      setSceneIndex(0);
      return;
    }
    if (typeof window !== "undefined") window.location.hash = "app/academy-plaza";
  };

  return (
    <section
      aria-labelledby="btg-reduced-title"
      className="btg-reduced"
      id="btg-story"
      tabIndex={-1}
    >
      {!isWineJourney || sceneIndex > 0 ? (
        <nav aria-label="Academy journey shortcuts" className="btg-reduced__toolbar">
          <button
            aria-label="Return to the Plaza"
            className="btg-academy-return"
            onClick={returnToAcademy}
            type="button"
          >
            Academy
          </button>
        </nav>
      ) : null}
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
        <p className="btg-kicker">Academy · Wine Academy</p>
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
          {activeScene.fieldNotes.map((note, index) => (
            <article key={note.title} style={noteImageStyle(activeScene, index)}>
              <span>{note.eyebrow}</span>
              <strong>{note.title}</strong>
              <p>{note.detail}</p>
            </article>
          ))}
        </div>
        {activeScene.id === "vine-and-berry" ? <VineAnatomyStudyList /> : null}
      </div>
    </section>
  );
}

export function ScrollStoryStage({ chapter }: ScrollStoryStageProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const storyPanelRef = useRef<HTMLDivElement>(null);
  const { activeScene, progress, reducedMotion, sceneIndex, sceneProgress } =
    useScrollStoryProgress(sectionRef, chapter.scenes);
  const [panelControlsCards, setPanelControlsCards] = useState(false);
  const [panelNoteProgress, setPanelNoteProgress] = useState(0);
  const [resumeSceneIndex, setResumeSceneIndex] = useState<number | null>(null);
  const [activeLabId, setActiveLabId] = useState<string | null>(null);
  const [noteView, setNoteView] = useState<NoteDeckView>("guide");
  const [guideNotesOpen, setGuideNotesOpen] = useState(false);
  // Each field atlas opens on its complete overview. Students get the full
  // system before choosing a single node, and a prior node selection never
  // drops a returning learner into the middle of a study plate.
  const [atlasNodeIndex, setAtlasNodeIndex] = useState<number | null>(null);
  const [academyResumeJourneys, setAcademyResumeJourneys] = useState<string[]>([]);
  const manualCardAnchorRef = useRef<number | null>(null);
  const restoredJourneyRef = useRef<string | null>(null);
  const activeJourneyKey = chapter.slug === "journey-of-a-drop" ? "wine" : chapter.slug;
  const activeJourneyLabel = JOURNEY_LABELS[activeJourneyKey] ?? chapter.chapterTitle;
  const isDisconnectedJourney = DISCONNECTED_JOURNEYS.has(activeJourneyKey);
  // Keep the established Wine storage key intact so returning students do
  // not lose their saved place while the Academy map uses the shorter route
  // name (`wine`) for journey switching.
  const progressStorageKey = `sipopedia:btg:${chapter.slug}:last-scene:v1`;
  const academyRoadmap = ACADEMY_ROADMAP.filter((landmark) => landmark.journey !== activeJourneyKey);
  const isPlazaRoute =
    typeof window !== "undefined" &&
    ["app/academy-plaza", "academy-plaza", "app/wine-academy-plaza", "wine-academy-plaza"].includes(
      window.location.hash.replace(/^#/, "").split("?")[0]
    );
  const shouldEnterWineJourneyDirectly = activeJourneyKey === "wine" && !isPlazaRoute;

  const activeSpeaker = activeScene.narration[0]?.speaker ?? "Sippy";
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
  const guideDeckPosition = guideScrollPosition;
  const visibleStudyCardIndex =
    Math.min(
      Math.max(0, Math.round(guideDeckPosition)),
      Math.max(0, activeScene.narration.length - 1)
    );
  const visibleFieldNoteIndex = Math.min(
    Math.max(0, Math.round(fieldNoteScrollPosition)),
    Math.max(0, activeScene.fieldNotes.length - 1)
  );
  const automaticGuideWeight = guideDeckWeight(
    sceneProgress,
    activeScene.fieldNotes.length > 0
  );
  const guideWeight = panelControlsCards
    ? noteView === "guide"
      ? 1
      : 0
    : automaticGuideWeight;
  const studyWeight = 1 - guideWeight;
  const effectiveNoteView: NoteDeckView = guideWeight >= 0.5 ? "guide" : "study";
  const guideDeckStyle = {
    opacity: clamp(guideWeight * 1.45, 0, 1).toFixed(3),
    pointerEvents: effectiveNoteView === "guide" ? "auto" : "none",
    transform: `perspective(1250px) translate3d(${((1 - guideWeight) * -5).toFixed(
      2
    )}%, 0, ${((1 - guideWeight) * 34).toFixed(2)}px) rotateY(${(
      (1 - guideWeight) * -162
    ).toFixed(2)}deg) rotateZ(${((1 - guideWeight) * -1.5).toFixed(2)}deg)`,
    zIndex: effectiveNoteView === "guide" ? 4 : 2
  } as CSSProperties;
  const studyDeckStyle = {
    opacity: clamp(studyWeight * 1.45, 0, 1).toFixed(3),
    pointerEvents: effectiveNoteView === "study" ? "auto" : "none",
    transform: `perspective(1250px) translate3d(${((1 - studyWeight) * 5).toFixed(
      2
    )}%, 0, ${((1 - studyWeight) * 34).toFixed(2)}px) rotateY(${(
      (1 - studyWeight) * 162
    ).toFixed(2)}deg) rotateZ(${((1 - studyWeight) * 1.5).toFixed(2)}deg)`,
    zIndex: effectiveNoteView === "study" ? 4 : 2
  } as CSSProperties;
  const activeLab = beyondTheGlassCurriculumLabs[activeScene.id];
  const isAcademyPlazaScene = activeScene.id === "academy-plaza";
  const atlasEnabled =
    !isAcademyPlazaScene &&
    activeScene.id !== "vine-and-berry" &&
    activeScene.fieldNotes.length > 0;
  const journeyPercent = Math.round(progress * 100);

  const sceneOffsets = useMemo(
    () =>
      chapter.scenes.map((scene) => ({
        id: scene.id,
        progress: scene.range[0] + Math.min(0.01, (scene.range[1] - scene.range[0]) / 4)
      })),
    [chapter.scenes]
  );

  const requestScene = (index: number, behaviorOverride?: ScrollBehavior) => {
    const section = sectionRef.current;
    const target = sceneOffsets[index];
    if (!section || !target || typeof window === "undefined") return;
    const rect = section.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const travel = Math.max(1, rect.height - window.innerHeight);
    const compactViewport =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(max-width: 760px)").matches;
    window.scrollTo({
      // Long smooth-scroll animations could cross more than one scene on a
      // phone after the responsive stage changed height. Compact navigation
      // now lands deterministically; direct user scrolling keeps the full
      // reversible card-flip and scene-motion language.
      behavior: behaviorOverride ?? (reducedMotion || compactViewport ? "auto" : "smooth"),
      top: sectionTop + travel * target.progress
    });
  };

  const requestGlobalAcademyMap = () => {
    if (typeof window === "undefined") return;
    window.location.hash = "app/sip-academy-map?guild=cask&campus=wine";
  };

  const requestAcademy = () => {
    setActiveLabId(null);
    setGuideNotesOpen(false);
    setAtlasNodeIndex(null);
    if (sceneIndex > 0) {
      try {
        window.localStorage.setItem(
          progressStorageKey,
          JSON.stringify({
            sceneId: activeScene.id,
            updatedAt: new Date().toISOString()
          })
        );
      } catch {
        // Returning to the Plaza still works when storage is unavailable.
      }
      setResumeSceneIndex(sceneIndex);
    }
    if (typeof window !== "undefined") window.location.hash = "app/academy-plaza";
    if (activeJourneyKey === "wine") requestScene(0, "auto");
  };

  const requestGuideCard = (index: number) => {
    const cardCount = activeScene.narration.length;
    if (cardCount <= 1) return;
    const cardProgress = index / (cardCount - 1);
    const localProgress = 0.14 + cardProgress * (0.62 - 0.14);
    setPanelControlsCards(true);
    setNoteView("guide");
    setPanelNoteProgress(localProgress);
    manualCardAnchorRef.current = sceneProgress;
  };

  const requestNoteView = (view: NoteDeckView) => {
    const cardCount =
      view === "guide" ? activeScene.narration.length : activeScene.fieldNotes.length;
    const visibleIndex = view === "guide" ? visibleStudyCardIndex : visibleFieldNoteIndex;
    const rangeStart = view === "guide" ? 0.14 : 0.36;
    const rangeEnd = view === "guide" ? 0.62 : 0.88;
    const snappedProgress =
      cardCount <= 1
        ? rangeStart
        : rangeStart + (visibleIndex / (cardCount - 1)) * (rangeEnd - rangeStart);
    setPanelControlsCards(true);
    setPanelNoteProgress(snappedProgress);
    setNoteView(view);
    manualCardAnchorRef.current = sceneProgress;
  };

  const handleStoryPanelScroll = (event: UIEvent<HTMLDivElement>) => {
    const panel = event.currentTarget;
    const travel = panel.scrollHeight - panel.clientHeight;
    if (travel <= 1) return;
    setPanelControlsCards(true);
    setPanelNoteProgress(clamp(panel.scrollTop / travel));
    manualCardAnchorRef.current = sceneProgress;
  };

  useEffect(() => {
    const anchor = manualCardAnchorRef.current;
    if (!panelControlsCards || anchor === null) return;
    if (Math.abs(sceneProgress - anchor) < 0.018) return;
    setPanelControlsCards(false);
    manualCardAnchorRef.current = null;
  }, [panelControlsCards, sceneProgress]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (restoredJourneyRef.current === chapter.slug) return;
    restoredJourneyRef.current = chapter.slug;
    try {
      const stored = window.localStorage.getItem(progressStorageKey);
      if (!stored) {
        if (shouldEnterWineJourneyDirectly && chapter.scenes[1]) {
          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => requestScene(1, "auto"));
          });
        }
        return;
      }
      const parsed = JSON.parse(stored) as { sceneId?: string };
      const storedIndex = chapter.scenes.findIndex((scene) => scene.id === parsed.sceneId);
      if (storedIndex > 0) {
        setResumeSceneIndex(storedIndex);
        if (activeJourneyKey !== "wine" || shouldEnterWineJourneyDirectly) {
          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => requestScene(storedIndex));
          });
        }
        return;
      }
      if (shouldEnterWineJourneyDirectly && chapter.scenes[1]) {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => requestScene(1, "auto"));
        });
      }
    } catch {
      window.localStorage.removeItem(progressStorageKey);
    }
  }, [activeJourneyKey, chapter.scenes, chapter.slug, progressStorageKey, shouldEnterWineJourneyDirectly]);

  useEffect(() => {
    if (typeof window === "undefined" || !isAcademyPlazaScene) return;
    const savedJourneys = ACADEMY_ROADMAP.filter((landmark) => landmark.enabled)
      .filter((landmark) => {
        const storageSlug = JOURNEY_STORAGE_SLUGS[landmark.journey];
        if (!storageSlug) return false;
        try {
          const stored = window.localStorage.getItem(
            `sipopedia:btg:${storageSlug}:last-scene:v1`
          );
          if (!stored) return false;
          const parsed = JSON.parse(stored) as { sceneId?: string };
          return Boolean(parsed.sceneId);
        } catch {
          return false;
        }
      })
      .map((landmark) => landmark.journey);
    setAcademyResumeJourneys(savedJourneys);
  }, [isAcademyPlazaScene]);

  useEffect(() => {
    if (typeof window === "undefined" || sceneIndex <= 0) return;
    try {
      window.localStorage.setItem(
        progressStorageKey,
        JSON.stringify({
          sceneId: activeScene.id,
          updatedAt: new Date().toISOString()
        })
      );
      setResumeSceneIndex(sceneIndex);
    } catch {
      // The tour remains fully usable when storage is unavailable or blocked.
    }
  }, [activeScene.id, progressStorageKey, sceneIndex]);

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
    setPanelControlsCards(false);
    setPanelNoteProgress(0);
    setNoteView("guide");
    manualCardAnchorRef.current = null;
    setGuideNotesOpen(false);
    // Begin every overview-capable scene with the whole system in view.
    // Learners then choose a node deliberately rather than being dropped
    // into a detail as they scroll or navigate between scenes.
    setAtlasNodeIndex(null);
    if (storyPanelRef.current) storyPanelRef.current.scrollTop = 0;
  }, [activeScene.fieldNotes.length, activeScene.id]);

  const selectAtlasNode = (index: number | null) => {
    if (index !== null) setGuideNotesOpen(false);
    setAtlasNodeIndex(index);
    try {
      const storageKey = `sipopedia:btg:atlas:${activeScene.id}:v1`;
      if (index === null) window.localStorage.removeItem(storageKey);
      else {
        const stableNodeId = activeScene.fieldNotes[index]?.title;
        if (stableNodeId) window.localStorage.setItem(storageKey, stableNodeId);
      }
    } catch {
      // The field atlas remains usable for this visit.
    }
  };

  const selectVineNode = (index: number | null) => {
    if (index !== null) setGuideNotesOpen(false);
    setAtlasNodeIndex(index);
  };

  if (reducedMotion) {
    return <ReducedMotionStory chapter={chapter} />;
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
      <div
        className="btg-stage"
        data-art-fit={activeScene.artwork.fit ?? "cinematic"}
        data-atlas-selection={atlasNodeIndex === null ? "overview" : "selected"}
        data-motion={activeScene.motion}
        data-scene={activeScene.id}
        data-study-panel={guideNotesOpen ? "open" : "closed"}
      >
        <div className="btg-stage__visual">
          {activeScene.id === "vine-and-berry" ? (
            <VineFieldAtlas onSelect={selectVineNode} />
          ) : atlasEnabled ? (
            <FieldAtlasStudy
              onOpenLab={activeLab ? () => setActiveLabId(activeLab.id) : undefined}
              onSelect={selectAtlasNode}
              scene={activeScene}
              selectedIndex={atlasNodeIndex}
            />
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
                opacity: 1,
                transform:
                  activeScene.id === "academy-plaza"
                    ? "none"
                    : motionTransform(activeScene.motion, sceneProgress),
                transformOrigin: "50% 50%"
              }}
            />
          )}
          <div className="btg-stage__wash" aria-hidden="true" />
          {activeScene.id === "academy-plaza" ? (
            <StoryImage
              alt=""
              className="btg-drop-protagonist"
              src={chapter.assets.centralDrop}
              style={{
                opacity: sceneIndex === 0 ? 0.68 : 0.88,
                transform: `translate(-50%, -50%) scale(${(0.82 + Math.sin(sceneProgress * Math.PI) * 0.18).toFixed(3)})`
              }}
            />
          ) : null}
        </div>

        <div className="btg-stage__hud">
          <header className="btg-stage__header">
            <div>
              <p className="btg-kicker">Academy · {activeJourneyLabel}</p>
              <strong>{activeScene.number} · {activeScene.title}</strong>
            </div>
            <div className="btg-progress">
              <span>{activeScene.checkpoint}</span>
              <progress aria-label="Journey progress" max={100} value={journeyPercent} />
            </div>
            {activeScene.id !== "academy-plaza" ? (
              <div className="btg-stage__actions">
                <button
                  aria-label="Return to the Plaza"
                  className="btg-academy-return"
                  onClick={requestAcademy}
                  type="button"
                >
                  Plaza
                </button>
                <button
                  aria-label="Return to the Academy map"
                  className="btg-academy-return"
                  onClick={requestGlobalAcademyMap}
                  type="button"
                >
                  Academy
                </button>
                {sceneIndex > 0 ? (
                  <button
                    aria-label={`Restart ${chapter.chapterTitle} from ${chapter.scenes[0]?.title ?? "the first stop"}`}
                    className="btg-journey-restart"
                    onClick={() => {
                      try {
                        window.localStorage.removeItem(progressStorageKey);
                      } catch {
                        // Restart still works for this visit when storage is blocked.
                      }
                      setResumeSceneIndex(null);
                      requestScene(0);
                    }}
                    type="button"
                  >
                    ↺ Start
                  </button>
                ) : null}
                <button
                  aria-controls="btg-guide-study-panel"
                  aria-expanded={guideNotesOpen}
                  className="btg-vine-notes-toggle"
                  onClick={() => setGuideNotesOpen((isOpen) => !isOpen)}
                  type="button"
                >
                  <span className="btg-desktop-label">
                    {guideNotesOpen ? "Return to field atlas" : "Open guide notes"}
                  </span>
                  <span className="btg-mobile-label">
                    {guideNotesOpen ? "Atlas" : "Notes"}
                  </span>
                </button>
              </div>
            ) : null}
          </header>

          {isAcademyPlazaScene ? (
            <div className="btg-plaza-map-layer">
              <button
                className="btg-plaza-node btg-plaza-node--active"
                onClick={() => requestScene(resumeSceneIndex ?? 1)}
                style={{ left: "50%", top: "49%" }}
                type="button"
              >
                <span>Active adventure</span>
                <strong>{activeJourneyLabel}</strong>
                <small>
                  {resumeSceneIndex
                    ? `Continue · ${chapter.scenes[resumeSceneIndex]?.title ?? "your last stop"}`
                    : chapter.chapterTitle}
                </small>
              </button>
              {academyRoadmap.map((landmark) => {
                const hasSavedProgress = academyResumeJourneys.includes(landmark.journey);
                return landmark.enabled ? (
                  <a
                    className="btg-plaza-node btg-plaza-node--adventure"
                    href={journeyHash(landmark.journey)}
                    key={landmark.label}
                    style={{ left: `${landmark.x}%`, top: `${landmark.y}%` }}
                  >
                    <span>{hasSavedProgress ? "Continue trip" : "Begin journey"}</span>
                    <strong>{landmark.label}</strong>
                    <small>{hasSavedProgress ? "Saved field notes ready" : landmark.note}</small>
                  </a>
                ) : (
                  <div
                    className="btg-plaza-node btg-plaza-node--future"
                    key={landmark.label}
                    style={{ left: `${landmark.x}%`, top: `${landmark.y}%` }}
                  >
                    <span>Forthcoming</span>
                    <strong>{landmark.label}</strong>
                    <small>{landmark.note}</small>
                  </div>
                );
              })}
              {resumeSceneIndex ? (
                <button
                  className="btg-plaza-replay"
                  onClick={() => {
                    try {
                      window.localStorage.removeItem(progressStorageKey);
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

          {isAcademyPlazaScene ? (
            <aside aria-label="SIP Academy journey board" className="btg-plaza-itinerary">
              <p className="btg-kicker">Active field trip</p>
              <strong>{activeJourneyLabel}</strong>
              <p>
                {resumeSceneIndex
                  ? `Your field notes are saved at ${chapter.scenes[resumeSceneIndex]?.title ?? "your last stop"}.`
                  : "Meet the guides at the Academy, then follow this field trip from origin to guest."}
              </p>
              <button onClick={() => requestScene(resumeSceneIndex ?? 1)} type="button">
                {resumeSceneIndex ? "Continue this journey" : "Begin this journey"}
              </button>
              <button onClick={requestGlobalAcademyMap} type="button">
                Return to Academy
              </button>
              <div aria-label="SIP Academy journeys">
                <span>Choose another adventure</span>
                <ul>
                  {academyRoadmap.map((landmark) => {
                    const hasSavedProgress = academyResumeJourneys.includes(landmark.journey);
                    return (
                      <li
                        className={landmark.enabled ? "is-available" : "is-forthcoming"}
                        key={`itinerary-${landmark.label}`}
                      >
                        {landmark.enabled ? (
                          <a
                            aria-label={`${hasSavedProgress ? "Continue" : "Begin"} ${landmark.label} adventure`}
                            className="btg-plaza-itinerary__journey"
                            href={journeyHash(landmark.journey)}
                          >
                            <strong>{landmark.label}</strong>
                            <span>{hasSavedProgress ? "Continue trip" : "Begin journey"}</span>
                          </a>
                        ) : (
                          <>
                            <strong>{landmark.label}</strong>
                            <span>Forthcoming</span>
                          </>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>
          ) : null}

          <aside
            aria-label="SIP Academy field-trip map"
            className={`btg-academy-map ${isAcademyPlazaScene ? "btg-academy-map--expanded" : ""}`}
          >
            <StoryImage
              alt=""
              className="btg-academy-map__image"
              eager={isAcademyPlazaScene}
              sizes={isAcademyPlazaScene ? "(max-width: 760px) 100vw, 42vw" : "18rem"}
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
            id="btg-guide-study-panel"
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
              {activeLab ? (
                <button
                  className="btg-open-lab"
                  onClick={() => setActiveLabId(activeLab.id)}
                  type="button"
                >
                  <span className="btg-desktop-label">Open visual lab · {activeLab.title}</span>
                  <span className="btg-mobile-label">Open visual lab</span>
                </button>
              ) : null}
            </div>

            <div className="btg-note-switcher" aria-label="Choose a field-note deck">
              <button
                aria-pressed={effectiveNoteView === "guide"}
                onClick={() => requestNoteView("guide")}
                type="button"
              >
                Guide note
              </button>
              <button
                aria-pressed={effectiveNoteView === "study"}
                onClick={() => requestNoteView("study")}
                type="button"
              >
                Study card
              </button>
            </div>

            <div
              className="btg-note-stack"
              data-note-motion={panelControlsCards ? "manual" : "scroll"}
              data-note-view={effectiveNoteView}
            >
              <aside
                aria-hidden={effectiveNoteView !== "guide"}
                aria-label={`${activeScene.title} guide study cards`}
                className="btg-guide-card-deck"
                style={guideDeckStyle}
              >
                {activeScene.narration.map((studyCard, index) => {
                  const isActive = index === visibleStudyCardIndex;
                  const speaker = studyCard.speaker;
                  return (
                    <blockquote
                      aria-hidden={!isActive || effectiveNoteView !== "guide"}
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
                        <p aria-live="off">
                          {studyCard.text}
                        </p>
                        <footer>
                          <span>
                            Note {index + 1} of {activeScene.narration.length}
                          </span>
                          {isActive &&
                          effectiveNoteView === "guide" &&
                          activeScene.narration.length > 1 ? (
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
                aria-hidden={effectiveNoteView !== "study"}
                aria-label={`${activeScene.title} field notes`}
                className="btg-field-notes"
                data-card-count={activeScene.fieldNotes.length}
                style={studyDeckStyle}
              >
                {activeScene.fieldNotes.map((note, index) => {
                  const isActive = index === visibleFieldNoteIndex;
                  return (
                    <article
                      aria-hidden={!isActive || effectiveNoteView !== "study"}
                      className={`btg-field-note btg-field-note--${FIELD_NOTE_MATERIALS[index % FIELD_NOTE_MATERIALS.length]}`}
                      data-card-state={noteCardState(index, fieldNoteScrollPosition)}
                      key={`${activeScene.id}-${note.title}`}
                      style={noteImageStyle(
                        activeScene,
                        index,
                        noteCardStyle(index, fieldNoteScrollPosition)
                      )}
                    >
                      <header>
                        <span>{note.eyebrow}</span>
                        <strong>{note.title}</strong>
                        <small>
                          Card {index + 1} of {activeScene.fieldNotes.length}
                        </small>
                      </header>
                      <p>{note.detail}</p>
                      {isActive && effectiveNoteView === "study" && activeScene.fieldNotes.length > 1 ? (
                        <nav aria-label="Study cards">
                          <button
                            aria-label="Show the previous study card"
                            disabled={index === 0}
                            onClick={() => {
                              setPanelControlsCards(true);
                              setNoteView("study");
                              setPanelNoteProgress(
                                activeScene.fieldNotes.length <= 1
                                  ? 0
                                  : 0.36 +
                                      (Math.max(0, index - 1) /
                                        (activeScene.fieldNotes.length - 1)) *
                                        (0.88 - 0.36)
                              );
                              manualCardAnchorRef.current = sceneProgress;
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
                              setNoteView("study");
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
                              manualCardAnchorRef.current = sceneProgress;
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

          <footer aria-label={`${chapter.chapterTitle} journey controls`} className="btg-journey-dock">
            <div className="btg-journey-path">
              <button
                aria-label={
                  sceneIndex === 0
                    ? activeJourneyKey === "wine"
                      ? "Already at the Plaza"
                      : isDisconnectedJourney
                        ? "Exit this standalone field trip"
                        : "Return to the Plaza"
                    : `Go back to ${chapter.scenes[sceneIndex - 1]?.title ?? "the previous stop"}`
                }
                className="btg-dock-action btg-dock-action--back"
                disabled={sceneIndex === 0 && activeJourneyKey === "wine"}
                onClick={() => {
                  if (sceneIndex === 0 && activeJourneyKey !== "wine") {
                    if (isDisconnectedJourney) {
                      window.location.hash = "app/launch";
                      return;
                    }
                    window.location.hash = "app/academy-plaza";
                    return;
                  }
                  requestScene(Math.max(0, sceneIndex - 1));
                }}
                type="button"
              >
                <span aria-hidden="true">←</span>
                <span>
                  {sceneIndex === 0 && activeJourneyKey !== "wine"
                    ? isDisconnectedJourney
                      ? "Exit"
                      : "Plaza"
                    : "Back"}
                </span>
              </button>
              <div className="btg-dock-status" aria-live="polite">
                <div>
                  <span>
                    Stop {sceneIndex + 1} of {chapter.scenes.length}
                  </span>
                  <strong>{activeScene.title}</strong>
                </div>
                <div
                  aria-label={`${chapter.chapterTitle} progress: stop ${sceneIndex + 1} of ${chapter.scenes.length}`}
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
                <span className="btg-desktop-label">Continue</span>
                <span className="btg-mobile-label">Next</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
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
