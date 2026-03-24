import { useEffect, useMemo, useState } from "react";

type FacilityId = "winery" | "brewery" | "distillery";
type LessonTag = "Foundations" | "Aromas" | "Structure" | "Service";
type MissionType = "Scout" | "Challenge" | "Boss";

type Facility = {
  id: FacilityId;
  label: string;
  subtitle: string;
  enabled: boolean;
};

type EquipmentLesson = {
  id: string;
  name: string;
  stage: string;
  purpose: string;
  safety: string;
  operatorTip: string;
};

type LearningContent = {
  overview: string;
  keyPoints: string[];
  stageFit: string;
};

type Challenge = {
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

type LessonNode = EquipmentLesson & {
  unit: number;
  mission: MissionType;
  tag: LessonTag;
  difficulty: number;
  art: string;
};

const FACILITIES: Facility[] = [
  { id: "winery", label: "Winery", subtitle: "Live now", enabled: true },
  { id: "brewery", label: "Brewery", subtitle: "Phase 2", enabled: false },
  { id: "distillery", label: "Distillery", subtitle: "Phase 3", enabled: false }
];

const WINERY_ART = [
  "/academy/units/unit-01-crystal-atrium.png",
  "/academy/units/unit-02-varietal-wilds.png",
  "/academy/units/unit-03-region-quest.png",
  "/academy/units/unit-04-cellar-craft.png",
  "/academy/units/unit-05-grand-sommelier-arena.png",
  "/academy/units/unit-06-sparkling-lab.png",
  "/academy/units/unit-07-old-cellar-archive.png",
  "/academy/units/unit-08-pairing-theater.png",
  "/academy/units/unit-09-blind-grid-forge.png",
  "/academy/units/unit-10-mastery-summit.png"
];

const WINERY_EQUIPMENT: EquipmentLesson[] = [
  {
    id: "crusher-destemmer",
    name: "Crusher-Destemmer",
    stage: "Fruit Intake",
    purpose: "Separates grapes from stems and lightly breaks berries before fermentation.",
    safety: "Never reach into the hopper while power is on; lock out before cleaning.",
    operatorTip: "Adjust roller gap to avoid over-crushing skins and seeds."
  },
  {
    id: "sorting-table",
    name: "Sorting Table",
    stage: "Fruit Intake",
    purpose: "Lets the cellar team remove leaves, damaged berries, and MOG before processing.",
    safety: "Use cut-resistant gloves and keep fingers clear of moving belts.",
    operatorTip: "Sort by ripeness and berry integrity to improve tank consistency."
  },
  {
    id: "fermenter",
    name: "Fermentation Tank",
    stage: "Fermentation",
    purpose: "Controls temperature and holds must while yeast converts sugar to alcohol.",
    safety: "Watch CO2 accumulation in enclosed spaces and ventilate thoroughly.",
    operatorTip: "Track Brix and temperature twice daily to catch stalled fermentations."
  },
  {
    id: "pump-over-system",
    name: "Pump-Over System",
    stage: "Fermentation",
    purpose: "Circulates fermenting juice over the cap to extract color, flavor, and tannin.",
    safety: "Verify hose clamps and valve positions before pressure starts.",
    operatorTip: "Use shorter, gentler cycles early to avoid over-extraction."
  },
  {
    id: "wine-press",
    name: "Wine Press",
    stage: "Pressing",
    purpose: "Separates free-run and pressed wine from skins and solids after maceration.",
    safety: "Confirm pressure release before opening doors or cages.",
    operatorTip: "Taste press fractions separately and blend with intent, not habit."
  },
  {
    id: "crossflow-filter",
    name: "Crossflow Filter",
    stage: "Clarification",
    purpose: "Removes suspended solids and microbes using membrane filtration.",
    safety: "Sanitize lines and monitor pressure to prevent membrane rupture.",
    operatorTip: "Pre-rack wine first so membranes stay efficient longer."
  },
  {
    id: "barrel-rack",
    name: "Barrel Rack",
    stage: "Aging",
    purpose: "Stores and stabilizes barrels during maturation and topping cycles.",
    safety: "Secure racks and use proper barrel handling tools for movement.",
    operatorTip: "Rotate topping schedule by lot so oxygen management stays uniform."
  },
  {
    id: "lab-bench",
    name: "Cellar Lab Bench",
    stage: "Quality Control",
    purpose: "Supports routine measurements like pH, TA, SO2, and dissolved oxygen.",
    safety: "Use PPE and label reagents clearly to avoid chemical mix-ups.",
    operatorTip: "Record every test with tank ID and timestamp for trend tracking."
  },
  {
    id: "bottling-line",
    name: "Bottling Line",
    stage: "Packaging",
    purpose: "Fills, corks or caps, labels, and cases finished wine for release.",
    safety: "Keep guards in place and isolate power before clearing jams.",
    operatorTip: "Run line checks every pallet to catch fill-height drift early."
  },
  {
    id: "steam-washer",
    name: "Barrel Steam Washer",
    stage: "Sanitation",
    purpose: "Uses heat and pressure to clean and sanitize barrels between fills.",
    safety: "Treat fittings as high-temperature hazards and vent before disconnecting.",
    operatorTip: "Follow steam cycles with odor checks so taints are not carried forward."
  }
];

const WINERY_LEARNING_CONTENT: Record<string, LearningContent> = {
  "crusher-destemmer": {
    overview: "This is the first mechanical step after harvest. It removes stems and lightly breaks berries before fermentation.",
    keyPoints: [
      "Use it when fruit needs stem removal before tank work.",
      "Keep the crush gentle so skins are opened without crushing seeds.",
      "Watch feed rate closely to prevent jams and uneven fruit handling."
    ],
    stageFit: "It belongs at the front of fruit intake, right after grapes arrive from the vineyard."
  },
  "sorting-table": {
    overview: "This is the last manual quality check before fruit moves deeper into the cellar process.",
    keyPoints: [
      "Remove leaves, damaged berries, and other material other than grapes.",
      "Sort by lot and ripeness so the tank stays consistent.",
      "Keep the pace steady so the team can make clean decisions."
    ],
    stageFit: "It supports intake by keeping poor material out before crush or destemming."
  },
  "fermenter": {
    overview: "This is the main vessel for active fermentation, where temperature and timing shape the final wine.",
    keyPoints: [
      "Track Brix and temperature so you can spot a slowdown early.",
      "Choose vessel management based on grape style and extraction goals.",
      "Use the tank data to guide punch-downs, pump-overs, and timing."
    ],
    stageFit: "It is the core fermentation stage that turns prepared must into wine."
  },
  "pump-over-system": {
    overview: "This tool manages the cap during red fermentation and helps the winemaker control extraction.",
    keyPoints: [
      "Use gentler cycles early so extraction stays balanced.",
      "Match the pump-over plan to the fruit's ripeness and tannin profile.",
      "Check hoses and valves before starting pressure."
    ],
    stageFit: "It belongs during active fermentation when skins are floating and extraction is underway."
  },
  "wine-press": {
    overview: "The press separates the clearest wine from the stronger press fractions after skin contact ends.",
    keyPoints: [
      "Treat free-run and press wine as different quality fractions.",
      "Taste fractions separately before deciding how to blend them.",
      "Stop at the right pressure for quality, not the highest possible yield."
    ],
    stageFit: "It bridges fermentation and clarification after maceration is complete."
  },
  "crossflow-filter": {
    overview: "This is a polishing step that helps prepare wine for stability and bottling.",
    keyPoints: [
      "Pre-rack the wine so the membranes do less heavy lifting.",
      "Monitor pressure and flow to keep filtration efficient.",
      "Sanitize before and after the run to protect quality."
    ],
    stageFit: "It sits in the clarification stage before the wine moves to packaging."
  },
  "barrel-rack": {
    overview: "This is the aging support system that keeps barrels organized and ready for topping and movement.",
    keyPoints: [
      "Group barrels by lot so aging decisions stay traceable.",
      "Keep topping on schedule to manage oxygen exposure.",
      "Use proper handling tools because full barrels are heavy and awkward."
    ],
    stageFit: "It supports maturation between clarification and the final packaging stage."
  },
  "lab-bench": {
    overview: "This is the decision-making station for cellar chemistry and routine quality checks.",
    keyPoints: [
      "Handle samples consistently so results stay comparable.",
      "Track pH, TA, SO2, and dissolved oxygen as standard QC markers.",
      "Log tank ID and timestamp every time so trends are useful later."
    ],
    stageFit: "It supports every stage by confirming stability and guiding cellar decisions."
  },
  "bottling-line": {
    overview: "This is the final production line that turns finished wine into sale-ready product.",
    keyPoints: [
      "Verify fill height, closures, and label placement before each run.",
      "Keep guards in place because the line has moving parts and jam points.",
      "Run checks frequently so drift is caught before whole pallets are affected."
    ],
    stageFit: "It belongs at the end of the workflow when wine is ready to leave the cellar."
  },
  "steam-washer": {
    overview: "This sanitation tool resets barrels between fills so the next aging cycle starts clean.",
    keyPoints: [
      "Treat the fittings as hot and pressurized at all times.",
      "Follow cleaning with an odor check so taints are not carried forward.",
      "Vent pressure before disconnecting any line or fitting."
    ],
    stageFit: "It supports sanitation work between barrel uses and before the next aging cycle."
  }
};

const MISSION_ROTATION: MissionType[] = ["Scout", "Challenge", "Scout", "Challenge", "Boss"];
const TAG_ROTATION: LessonTag[] = ["Foundations", "Aromas", "Structure", "Service"];
const STAGE_DISTRACTORS = ["Fruit Intake", "Fermentation", "Pressing", "Clarification", "Aging", "Quality Control", "Packaging", "Sanitation"];
export const EQUIPMENT_MASTERY_STORAGE_KEY = "sip-studies:academy:equipment-mastery:v1";
export const EQUIPMENT_MASTERY_EVENT = "sip-studies:equipment-mastery-updated";
export const EQUIPMENT_MASTERY_TOTAL_NODES = WINERY_EQUIPMENT.length;

export type EquipmentMasterySnapshot = {
  mastery: Record<string, number>;
  completedCount: number;
  masteryPoints: number;
  totalNodes: number;
};

function shuffle<T>(values: readonly T[]): T[] {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function takeUnique(source: string[], exclude: string, count: number): string[] {
  return shuffle(source.filter((value) => value !== exclude)).slice(0, count);
}

function buildChallenge(target: EquipmentLesson, allLessons: EquipmentLesson[]): Challenge {
  const mode = Math.floor(Math.random() * 3);
  if (mode === 0) {
    const wrong = takeUnique(
      allLessons.map((lesson) => lesson.name),
      target.name,
      3
    );
    const correctAnswer = target.name;
    return {
      prompt: `Which equipment matches this purpose: ${target.purpose}`,
      options: shuffle([correctAnswer, ...wrong]),
      correctAnswer,
      explanation: `${target.name} is the primary match for that cellar objective.`
    };
  }
  if (mode === 1) {
    const wrong = takeUnique(
      allLessons.map((lesson) => lesson.safety),
      target.safety,
      3
    );
    const correctAnswer = target.safety;
    return {
      prompt: `What is the key safety callout when operating ${target.name}?`,
      options: shuffle([correctAnswer, ...wrong]),
      correctAnswer,
      explanation: `Safety on ${target.name} should center on: ${target.safety}`
    };
  }
  const wrong = takeUnique(STAGE_DISTRACTORS, target.stage, 3);
  const correctAnswer = target.stage;
  return {
    prompt: `In which production stage is ${target.name} most commonly used?`,
    options: shuffle([correctAnswer, ...wrong]),
    correctAnswer,
    explanation: `${target.name} is grouped under ${target.stage}.`
  };
}

function buildWineryNodes(): LessonNode[] {
  return WINERY_EQUIPMENT.map((lesson, index) => ({
    ...lesson,
    unit: index + 1,
    mission: MISSION_ROTATION[index % MISSION_ROTATION.length],
    tag: TAG_ROTATION[index % TAG_ROTATION.length],
    difficulty: Math.min(5, 1 + Math.floor(index / 2)),
    art: WINERY_ART[index % WINERY_ART.length]
  }));
}

function getLearningContent(lesson: EquipmentLesson): LearningContent {
  return (
    WINERY_LEARNING_CONTENT[lesson.id] ?? {
      overview: lesson.purpose,
      keyPoints: [lesson.purpose, lesson.safety, lesson.operatorTip],
      stageFit: `This lesson supports the ${lesson.stage} stage.`
    }
  );
}

export function readEquipmentMasterySnapshot(): EquipmentMasterySnapshot {
  let mastery: Record<string, number> = {};
  if (typeof window === "undefined") {
    return { mastery, completedCount: 0, masteryPoints: 0, totalNodes: EQUIPMENT_MASTERY_TOTAL_NODES };
  }
  try {
    const raw = window.localStorage.getItem(EQUIPMENT_MASTERY_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as unknown;
      if (parsed && typeof parsed === "object") {
        const incoming = (parsed as { mastery?: unknown }).mastery;
        if (incoming && typeof incoming === "object") {
          mastery = Object.entries(incoming as Record<string, unknown>).reduce<Record<string, number>>((acc, [key, value]) => {
            const numeric = Number(value);
            if (Number.isFinite(numeric) && numeric > 0) acc[key] = numeric;
            return acc;
          }, {});
        }
      }
    }
  } catch {
    mastery = {};
  }
  const completedCount = Object.values(mastery).filter((value) => value > 0).length;
  const masteryPoints = Object.values(mastery).reduce((sum, value) => sum + value, 0);
  return { mastery, completedCount, masteryPoints, totalNodes: EQUIPMENT_MASTERY_TOTAL_NODES };
}

export function SipStudiosEquipmentMastery() {
  const [facilityId, setFacilityId] = useState<FacilityId>("winery");
  const [mastery, setMastery] = useState<Record<string, number>>(() => readEquipmentMasterySnapshot().mastery);
  const nodes = useMemo(() => buildWineryNodes(), []);
  const [activeNodeId, setActiveNodeId] = useState(nodes[0]?.id ?? "");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [challenge, setChallenge] = useState<Challenge | null>(() => (nodes[0] ? buildChallenge(nodes[0], nodes) : null));
  const [feedback, setFeedback] = useState<{ correct: boolean; text: string } | null>(null);
  const [lessonAcknowledged, setLessonAcknowledged] = useState(false);
  const [reviewChecks, setReviewChecks] = useState({ process: false, safety: false });

  const selectedFacility = FACILITIES.find((item) => item.id === facilityId) ?? FACILITIES[0];
  const completedCount = nodes.reduce((count, node) => count + (mastery[node.id] ? 1 : 0), 0);
  const progressPercent = nodes.length ? Math.round((completedCount / nodes.length) * 100) : 0;
  const activeIndex = nodes.findIndex((node) => node.id === activeNodeId);
  const activeNode = activeIndex >= 0 ? nodes[activeIndex] : null;
  const learningContent = activeNode ? getLearningContent(activeNode) : null;
  const allComplete = completedCount === nodes.length;
  const canUnlockQuiz = reviewChecks.process && reviewChecks.safety;

  useEffect(() => {
    window.localStorage.setItem(EQUIPMENT_MASTERY_STORAGE_KEY, JSON.stringify({ mastery }));
    window.dispatchEvent(new CustomEvent(EQUIPMENT_MASTERY_EVENT));
  }, [mastery]);

  const isUnlocked = (index: number) => {
    if (index <= 0) return true;
    return Boolean(mastery[nodes[index - 1].id]);
  };

  const openNode = (nodeId: string) => {
    const nextIndex = nodes.findIndex((node) => node.id === nodeId);
    if (nextIndex < 0 || !isUnlocked(nextIndex)) return;
    const nextNode = nodes[nextIndex];
    setActiveNodeId(nextNode.id);
    setLessonAcknowledged(false);
    setReviewChecks({ process: false, safety: false });
    setSelectedAnswer(null);
    setFeedback(null);
    setChallenge(buildChallenge(nextNode, nodes));
  };

  const answerChallenge = (answer: string) => {
    if (!lessonAcknowledged || !challenge || !activeNode || selectedAnswer) return;
    const correct = answer === challenge.correctAnswer;
    setSelectedAnswer(answer);
    if (correct) {
      setMastery((current) => ({ ...current, [activeNode.id]: Math.max(1, current[activeNode.id] ?? 0) }));
    }
    setFeedback({
      correct,
      text: correct ? `Correct. ${challenge.explanation}` : `Not quite. ${challenge.explanation}`
    });
  };

  const refreshChallenge = () => {
    if (!activeNode || !lessonAcknowledged) return;
    setSelectedAnswer(null);
    setFeedback(null);
    setChallenge(buildChallenge(activeNode, nodes));
  };

  const acknowledgeLesson = () => {
    if (!canUnlockQuiz) return;
    setLessonAcknowledged(true);
    setSelectedAnswer(null);
    setFeedback(null);
  };

  const goToNextNode = () => {
    if (!activeNode) return;
    const next = nodes.find((node, index) => index > activeIndex && isUnlocked(index) && !mastery[node.id]);
    if (next) {
      openNode(next.id);
      return;
    }
    if (activeIndex + 1 < nodes.length && isUnlocked(activeIndex + 1)) {
      openNode(nodes[activeIndex + 1].id);
    }
  };

  return (
    <section className="academy-game sip-studios-game-v2" aria-label="Sip Studios educational game">
      <header className="academy-game-header">
        <p className="academy-kicker">Sip Academy Equipment Mastery</p>
        <h2>Equipment Mastery Path</h2>
        <p>
          Duolingo-style progression is now live for Winery equipment. Complete each node to unlock the next lesson and keep
          your team training structured.
        </p>
        <div className="sip-studios-facility-tabs" role="tablist" aria-label="Facility tracks">
          {FACILITIES.map((facility) => (
            <button
              key={facility.id}
              type="button"
              role="tab"
              aria-selected={facilityId === facility.id}
              aria-label={`${facility.label} track`}
              className={`sip-studios-facility-tab ${facilityId === facility.id ? "active" : ""}`}
              disabled={!facility.enabled}
              onClick={() => setFacilityId(facility.id)}
            >
              <strong>{facility.label}</strong>
              <small>{facility.subtitle}</small>
            </button>
          ))}
        </div>
      </header>

      <div className="academy-game-layout">
        <aside className="academy-path">
          <h3>{selectedFacility.label} Path</h3>
          <p>
            {selectedFacility.enabled
              ? "Follow the sequence to learn equipment role, safety, and operating choices."
              : `${selectedFacility.label} content is scaffolded and currently locked for the next release.`}
          </p>
          <div className="academy-realm-meter" aria-hidden="true">
            <div
              className="academy-realm-meter-value"
              style={{ width: `${selectedFacility.enabled ? progressPercent : 0}%` }}
            />
          </div>
          <div className="academy-quest-log">
            <p className="academy-quest-kicker">Current Sprint</p>
            <strong>{selectedFacility.enabled ? "Winery equipment module in active rollout." : "Track planning in progress."}</strong>
            <small>
              {selectedFacility.enabled
                ? `Lessons mastered: ${completedCount}/${nodes.length} (${progressPercent}%)`
                : "Brewery and Distillery will unlock after content and art pass."}
            </small>
          </div>

          {selectedFacility.enabled ? (
            <div className="academy-path-list" role="list">
              {nodes.map((node, index) => {
                const unlocked = isUnlocked(index);
                const solved = Boolean(mastery[node.id]);
                const active = node.id === activeNodeId;
                const difficultyText = "★".repeat(node.difficulty);
                return (
                  <button
                    key={node.id}
                    type="button"
                    role="listitem"
                    className={`academy-node ${unlocked ? "unlocked" : "locked"} ${active ? "active" : ""}`}
                    onClick={() => openNode(node.id)}
                    disabled={!unlocked}
                    aria-label={`${node.name} ${unlocked ? "unlocked" : "locked"}`}
                  >
                    <div className="academy-node-top">
                      <span className={`academy-mission academy-mission-${node.mission.toLowerCase()}`}>{node.mission}</span>
                      <span className={`academy-tag academy-tag-${node.tag.toLowerCase()}`}>{node.tag}</span>
                    </div>
                    <span className="academy-node-unit">Unit {node.unit}</span>
                    <strong>{node.name}</strong>
                    <small>{node.purpose}</small>
                    <div className="academy-node-art">
                      <img src={node.art} alt="" loading="lazy" />
                      <small>{node.stage}</small>
                    </div>
                    <div className="academy-node-foot">
                      <span className="academy-node-difficulty">Difficulty: {difficultyText}</span>
                      {unlocked ? <span className="academy-session-chip">{solved ? "Mastered" : "Ready"}</span> : <span className="academy-locked-label">Locked</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : null}
        </aside>

        {selectedFacility.enabled && activeNode && challenge ? (
          <article className={`academy-session ${feedback?.correct ? "academy-state-correct" : ""} ${feedback && !feedback.correct ? "academy-state-wrong" : ""}`}>
            <p className="academy-round-kicker">Interactive Lesson</p>
            <div className="academy-session-head">
              <h3>{activeNode.name}</h3>
              <p>{activeNode.purpose}</p>
            </div>
            <div className="academy-session-metrics">
              <span className="academy-session-chip">Stage: {activeNode.stage}</span>
              <span className="academy-session-chip">Safety: required</span>
              <span className="academy-session-chip">{mastery[activeNode.id] ? "Completed" : "In progress"}</span>
              <span className="academy-session-chip">{lessonAcknowledged ? "Quiz unlocked" : "Lesson review required"}</span>
            </div>

            <div className="sip-studios-equipment-details academy-pre-quiz sip-studios-pre-quiz-panel">
              <p className="academy-pre-quiz-kicker">Teach First</p>
              <h4 className="academy-pre-quiz-title">Unit {activeNode.unit}: {activeNode.name}</h4>
              <p>
                <strong>Overview:</strong> {learningContent?.overview ?? activeNode.purpose}
              </p>
              <div>
                <strong>Key Points:</strong>
                <ul>
                  {(learningContent?.keyPoints ?? []).map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
              <p>
                <strong>Safety:</strong> {activeNode.safety}
              </p>
              <p>
                <strong>Coach Tip:</strong> {activeNode.operatorTip}
              </p>
              <p>
                <strong>Stage Fit:</strong> {learningContent?.stageFit ?? `This lesson supports the ${activeNode.stage} stage.`}
              </p>
            </div>

            {!lessonAcknowledged ? (
              <div className="academy-lesson-gate">
                <p>Read the lesson above, then acknowledge it to unlock the quiz.</p>
                <label>
                  <input
                    type="checkbox"
                    checked={reviewChecks.process}
                    onChange={(event) => setReviewChecks((current) => ({ ...current, process: event.target.checked }))}
                  />
                  I reviewed the process and stage fit.
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={reviewChecks.safety}
                    onChange={(event) => setReviewChecks((current) => ({ ...current, safety: event.target.checked }))}
                  />
                  I reviewed the safety callouts.
                </label>
                <button type="button" className="btn btn-primary" onClick={acknowledgeLesson} disabled={!canUnlockQuiz}>
                  I reviewed this lesson, continue to quiz
                </button>
              </div>
            ) : (
              <>
                <div className="academy-exercise-card">
                  <h4>{challenge.prompt}</h4>
                  <div className="academy-choice-grid">
                    {challenge.options.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`academy-choice ${selectedAnswer === option ? "selected" : ""}`}
                        disabled={Boolean(selectedAnswer)}
                        onClick={() => answerChallenge(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {feedback ? (
                  <div className={`academy-feedback ${feedback.correct ? "correct" : "wrong"}`}>
                    <strong>{feedback.correct ? "Correct answer" : "Try another prompt"}</strong>
                    <p>{feedback.text}</p>
                  </div>
                ) : null}

                <div className="academy-actions">
                  <button type="button" className="btn btn-light" onClick={refreshChallenge}>
                    New Prompt
                  </button>
                  <button type="button" className="btn btn-primary" disabled={!feedback?.correct || allComplete} onClick={goToNextNode}>
                    {allComplete ? "Path Complete" : "Next Equipment"}
                  </button>
                </div>
              </>
            )}
          </article>
        ) : (
          <article className="academy-idle">
            <h3>{selectedFacility.label} Track Locked</h3>
            <p>This track is staged and ready for content ingestion, mission writing, and final art mapping.</p>
          </article>
        )}
      </div>
    </section>
  );
}
