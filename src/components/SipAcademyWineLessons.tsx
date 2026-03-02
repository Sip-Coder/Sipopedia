import { useEffect, useMemo, useState } from "react";
import romaCalm from "../assets/brand/characters/variants/roma-calm-opt.webp";
import romaCelebrate from "../assets/brand/characters/variants/roma-celebrate-opt.webp";
import romaCoach from "../assets/brand/characters/variants/roma-coach-opt.webp";
import romaSpark from "../assets/brand/characters/variants/roma-spark-opt.webp";
import sippyCalm from "../assets/brand/characters/variants/sippy-calm-opt.webp";
import sippyCelebrate from "../assets/brand/characters/variants/sippy-celebrate-opt.webp";
import sippyCoach from "../assets/brand/characters/variants/sippy-coach-opt.webp";
import sippySpark from "../assets/brand/characters/variants/sippy-spark-opt.webp";

type LessonTag = "Foundations" | "Aromas" | "Structure" | "Service";
type MentorId = "sippy" | "roma";
type MentorMood = "calm" | "coach" | "spark" | "celebrate";
type MentorVoiceMode = "classic" | "tactical" | "story";

type ChoiceExercise = {
  id: string;
  kind: "choice";
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

type OrderExercise = {
  id: string;
  kind: "order";
  prompt: string;
  options: string[];
  answer: string[];
  explanation: string;
};

type Exercise = ChoiceExercise | OrderExercise;

type Lesson = {
  id: string;
  unit: number;
  title: string;
  tag: LessonTag;
  subtitle: string;
  xpBonus: number;
  exercises: Exercise[];
};

type LessonProgress = {
  unlocked: boolean;
  mastery: number;
  bestAccuracy: number;
  attempts: number;
  completions: number;
};

type AcademyProgress = {
  totalXp: number;
  streak: number;
  lastActiveDate: string | null;
  lessons: Record<string, LessonProgress>;
};

type FeedbackState = {
  correct: boolean;
  heartsAfter: number;
  note: string;
};

type SummaryState = {
  lessonId: string;
  lessonTitle: string;
  passed: boolean;
  correct: number;
  total: number;
  accuracy: number;
  xp: number;
  bestCombo: number;
};

type UnlockCeremony = {
  lessonId: string;
  title: string;
  unit: number;
};

const STORAGE_KEY = "sip-studies:academy:wine:v1";
const VOICE_MODE_KEY = "sip-studies:academy:wine:voice-mode:v1";
const MAX_HEARTS = 5;
const PASS_TARGET = 0.7;
const MAX_MASTERY = 5;

const LESSONS: Lesson[] = [
  {
    id: "wine-1",
    unit: 1,
    title: "Glass Basics",
    tag: "Foundations",
    subtitle: "Short wins for core tasting language.",
    xpBonus: 14,
    exercises: [
      {
        id: "wine-1-1",
        kind: "choice",
        prompt: "Dry wine means:",
        options: ["No sugar is perceived", "The wine has no aroma", "The wine is high alcohol only", "The wine is old"],
        correctIndex: 0,
        explanation: "Dry refers to perceived sugar, not age or alcohol."
      },
      {
        id: "wine-1-2",
        kind: "choice",
        prompt: "ABV on a label tells you:",
        options: ["Alcohol by volume", "Residual sugar", "Serving temperature", "Bottle age"],
        correctIndex: 0,
        explanation: "ABV is alcohol by volume."
      },
      {
        id: "wine-1-3",
        kind: "order",
        prompt: "Arrange the tasting sequence.",
        options: ["Look", "Smell", "Taste", "Conclude"],
        answer: ["Look", "Smell", "Taste", "Conclude"],
        explanation: "Systematic sequence improves consistency."
      },
      {
        id: "wine-1-4",
        kind: "choice",
        prompt: "A mouthwatering finish usually points to:",
        options: ["Acidity", "Oak", "Sugar", "High pH"],
        correctIndex: 0,
        explanation: "Acidity drives freshness and salivation."
      }
    ]
  },
  {
    id: "wine-2",
    unit: 1,
    title: "Aroma Families",
    tag: "Aromas",
    subtitle: "Build reliable descriptor buckets.",
    xpBonus: 16,
    exercises: [
      {
        id: "wine-2-1",
        kind: "choice",
        prompt: "Cassis and blackberry are typically:",
        options: ["Floral notes", "Black fruit notes", "Mineral notes", "Oxidative notes"],
        correctIndex: 1,
        explanation: "These belong to the black fruit family."
      },
      {
        id: "wine-2-2",
        kind: "choice",
        prompt: "Lavender and violet are:",
        options: ["Herbal notes", "Floral notes", "Oak notes", "Spice notes"],
        correctIndex: 1,
        explanation: "Both are floral cues."
      },
      {
        id: "wine-2-3",
        kind: "order",
        prompt: "Order fruit development from fresh to aged.",
        options: ["Fresh apple", "Baked apple", "Dried apple"],
        answer: ["Fresh apple", "Baked apple", "Dried apple"],
        explanation: "Fruit notes often evolve from fresh to baked to dried."
      },
      {
        id: "wine-2-4",
        kind: "choice",
        prompt: "Vanilla, toast, and cedar often indicate:",
        options: ["Fault", "Oak influence", "Lactic fermentation", "Carbonic maceration"],
        correctIndex: 1,
        explanation: "These are common oak signatures."
      }
    ]
  },
  {
    id: "wine-3",
    unit: 2,
    title: "Structure Drill",
    tag: "Structure",
    subtitle: "Train palate logic under time pressure.",
    xpBonus: 20,
    exercises: [
      {
        id: "wine-3-1",
        kind: "choice",
        prompt: "Drying grip on gums usually comes from:",
        options: ["Sugar", "Tannin", "Acidity", "Carbon dioxide"],
        correctIndex: 1,
        explanation: "Tannin creates that drying sensation."
      },
      {
        id: "wine-3-2",
        kind: "choice",
        prompt: "Cool-climate style commonly shows:",
        options: ["Lower acidity", "Higher freshness", "Higher residual sugar", "No aroma"],
        correctIndex: 1,
        explanation: "Cool climates often preserve acidity and lift."
      },
      {
        id: "wine-3-3",
        kind: "order",
        prompt: "Build a deduction chain.",
        options: ["Assess acidity", "Assess ripeness", "Estimate climate", "State conclusion"],
        answer: ["Assess acidity", "Assess ripeness", "Estimate climate", "State conclusion"],
        explanation: "Start with sensory evidence, then infer context."
      },
      {
        id: "wine-3-4",
        kind: "choice",
        prompt: "A long finish can suggest:",
        options: ["Lower quality only", "Concentration and quality", "A random fault", "Only high sugar"],
        correctIndex: 1,
        explanation: "Length can correlate with concentration."
      }
    ]
  }
];

const MENTORS: Record<MentorId, { name: string; title: string }> = {
  sippy: { name: "Sippy", title: "Lead Beverage Educator" },
  roma: { name: "Roma", title: "Senior Sensory Educator" }
};

const MENTOR_VARIANTS: Record<MentorId, Record<MentorMood, string>> = {
  sippy: {
    calm: sippyCalm,
    coach: sippyCoach,
    spark: sippySpark,
    celebrate: sippyCelebrate
  },
  roma: {
    calm: romaCalm,
    coach: romaCoach,
    spark: romaSpark,
    celebrate: romaCelebrate
  }
};

const VOICE_MODE_LABELS: Record<MentorVoiceMode, string> = {
  classic: "Classic",
  tactical: "Tactical",
  story: "Story"
};

function dateStamp(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function defaultProgress(): AcademyProgress {
  const lessons: Record<string, LessonProgress> = {};
  LESSONS.forEach((lesson, index) => {
    lessons[lesson.id] = { unlocked: index === 0, mastery: 0, bestAccuracy: 0, attempts: 0, completions: 0 };
  });
  return { totalXp: 0, streak: 0, lastActiveDate: null, lessons };
}

function parseProgress(raw: string | null): AcademyProgress {
  const fallback = defaultProgress();
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return fallback;
    const record = parsed as Record<string, unknown>;
    const lessonRecord = record.lessons;
    if (!lessonRecord || typeof lessonRecord !== "object") return fallback;

    const lessons: Record<string, LessonProgress> = {};
    LESSONS.forEach((lesson, index) => {
      const item = (lessonRecord as Record<string, unknown>)[lesson.id];
      if (!item || typeof item !== "object") {
        lessons[lesson.id] = { unlocked: index === 0, mastery: 0, bestAccuracy: 0, attempts: 0, completions: 0 };
        return;
      }
      const entry = item as Record<string, unknown>;
      lessons[lesson.id] = {
        unlocked: index === 0 ? true : Boolean(entry.unlocked),
        mastery: Math.max(0, Math.min(MAX_MASTERY, Number(entry.mastery) || 0)),
        bestAccuracy: Math.max(0, Math.min(1, Number(entry.bestAccuracy) || 0)),
        attempts: Math.max(0, Math.round(Number(entry.attempts) || 0)),
        completions: Math.max(0, Math.round(Number(entry.completions) || 0))
      };
    });

    return {
      totalXp: Math.max(0, Math.round(Number(record.totalXp) || 0)),
      streak: Math.max(0, Math.round(Number(record.streak) || 0)),
      lastActiveDate: typeof record.lastActiveDate === "string" ? record.lastActiveDate : null,
      lessons
    };
  } catch {
    return fallback;
  }
}

function shuffle(values: string[]) {
  const next = [...values];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    const value = next[index];
    next[index] = next[swap];
    next[swap] = value;
  }
  return next;
}

function nextLessonId(lessonId: string) {
  const index = LESSONS.findIndex((lesson) => lesson.id === lessonId);
  if (index < 0 || index + 1 >= LESSONS.length) return null;
  return LESSONS[index + 1].id;
}

function tagClass(tag: LessonTag) {
  if (tag === "Foundations") return "foundations";
  if (tag === "Aromas") return "aromas";
  if (tag === "Structure") return "structure";
  return "service";
}

export function SipAcademyWineLessons() {
  const [progress, setProgress] = useState<AcademyProgress>(() => parseProgress(window.localStorage.getItem(STORAGE_KEY)));
  const [voiceMode, setVoiceMode] = useState<MentorVoiceMode>(() => {
    const stored = window.localStorage.getItem(VOICE_MODE_KEY);
    return stored === "classic" || stored === "tactical" || stored === "story" ? stored : "classic";
  });
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [correct, setCorrect] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [choiceSelection, setChoiceSelection] = useState<number | null>(null);
  const [orderSelection, setOrderSelection] = useState<string[]>([]);
  const [orderPool, setOrderPool] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [summary, setSummary] = useState<SummaryState | null>(null);
  const [unlockCeremony, setUnlockCeremony] = useState<UnlockCeremony | null>(null);
  const [flashUnlockedLessonId, setFlashUnlockedLessonId] = useState<string | null>(null);

  const activeLesson = useMemo(
    () => (activeLessonId ? LESSONS.find((lesson) => lesson.id === activeLessonId) ?? null : null),
    [activeLessonId]
  );
  const activeExercise = activeLesson ? activeLesson.exercises[exerciseIndex] ?? null : null;

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    window.localStorage.setItem(VOICE_MODE_KEY, voiceMode);
  }, [voiceMode]);

  useEffect(() => {
    if (!flashUnlockedLessonId) return;
    const timer = window.setTimeout(() => setFlashUnlockedLessonId(null), 2200);
    return () => window.clearTimeout(timer);
  }, [flashUnlockedLessonId]);

  useEffect(() => {
    if (!unlockCeremony) return;
    const timer = window.setTimeout(() => setUnlockCeremony(null), 3800);
    return () => window.clearTimeout(timer);
  }, [unlockCeremony]);

  const completedCount = LESSONS.filter((lesson) => (progress.lessons[lesson.id]?.completions ?? 0) > 0).length;
  const masteryTotal = LESSONS.reduce((sum, lesson) => sum + (progress.lessons[lesson.id]?.mastery ?? 0), 0);
  const completionRatio = LESSONS.length > 0 ? completedCount / LESSONS.length : 0;
  const lowHearts = activeLesson ? hearts <= 2 : false;

  const prepareExercise = (lesson: Lesson, index: number) => {
    const exercise = lesson.exercises[index];
    setExerciseIndex(index);
    setFeedback(null);
    setChoiceSelection(null);
    setOrderSelection([]);
    setOrderPool(exercise.kind === "order" ? shuffle(exercise.options) : []);
  };

  const startLesson = (lessonId: string) => {
    const lessonProgress = progress.lessons[lessonId];
    if (!lessonProgress || !lessonProgress.unlocked) return;
    const lesson = LESSONS.find((item) => item.id === lessonId);
    if (!lesson) return;
    setSummary(null);
    setActiveLessonId(lessonId);
    setHearts(MAX_HEARTS);
    setCorrect(0);
    setCombo(0);
    setBestCombo(0);
    prepareExercise(lesson, 0);
    setProgress((current) => {
      const today = dateStamp(new Date());
      if (current.lastActiveDate === today) return current;
      let streak = 1;
      if (current.lastActiveDate) {
        const dayGap = Math.round(
          (new Date(`${today}T00:00:00`).getTime() - new Date(`${current.lastActiveDate}T00:00:00`).getTime()) / 86400000
        );
        if (dayGap === 1) streak = Math.max(1, current.streak + 1);
      }
      return { ...current, streak, lastActiveDate: today };
    });
  };

  const canCheck =
    activeExercise && !feedback
      ? activeExercise.kind === "choice"
        ? choiceSelection !== null
        : orderSelection.length === activeExercise.answer.length
      : false;

  const checkAnswer = () => {
    if (!activeExercise || feedback) return;
    let isCorrect = false;
    let correction = "";
    if (activeExercise.kind === "choice") {
      if (choiceSelection === null) return;
      isCorrect = choiceSelection === activeExercise.correctIndex;
      correction = `Correct answer: ${activeExercise.options[activeExercise.correctIndex]}.`;
    } else {
      if (orderSelection.length !== activeExercise.answer.length) return;
      isCorrect = orderSelection.every((value, index) => value === activeExercise.answer[index]);
      correction = `Expected order: ${activeExercise.answer.join(" -> ")}.`;
    }
    const heartsAfter = isCorrect ? hearts : Math.max(0, hearts - 1);
    const correctAfter = isCorrect ? correct + 1 : correct;
    const comboAfter = isCorrect ? combo + 1 : 0;
    setHearts(heartsAfter);
    setCorrect(correctAfter);
    setCombo(comboAfter);
    setBestCombo(Math.max(bestCombo, comboAfter));
    setFeedback({
      correct: isCorrect,
      heartsAfter,
      note: isCorrect ? activeExercise.explanation : `Not quite. ${correction}`
    });
  };

  const finishLesson = (lesson: Lesson, heartsAfter: number) => {
    const total = lesson.exercises.length;
    const accuracy = total > 0 ? correct / total : 0;
    const passed = heartsAfter > 0 && accuracy >= PASS_TARGET;
    const nextId = nextLessonId(lesson.id);
    const nextWasLocked = nextId ? !(progress.lessons[nextId]?.unlocked ?? false) : false;
    const comboBonus = bestCombo >= 4 ? 10 : bestCombo >= 2 ? 4 : 0;
    const xp = correct * 8 + (passed ? lesson.xpBonus : Math.floor(lesson.xpBonus / 4)) + comboBonus;
    setProgress((current) => {
      const currentLesson = current.lessons[lesson.id];
      if (!currentLesson) return current;
      const lessons = { ...current.lessons };
      lessons[lesson.id] = {
        ...currentLesson,
        attempts: currentLesson.attempts + 1,
        completions: passed ? currentLesson.completions + 1 : currentLesson.completions,
        bestAccuracy: Math.max(currentLesson.bestAccuracy, accuracy),
        mastery: passed ? Math.min(MAX_MASTERY, currentLesson.mastery + 1) : currentLesson.mastery
      };
      if (passed) {
        const unlockId = nextLessonId(lesson.id);
        if (unlockId && lessons[unlockId]) lessons[unlockId] = { ...lessons[unlockId], unlocked: true };
      }
      return { ...current, totalXp: current.totalXp + xp, lessons };
    });
    setSummary({
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      passed,
      correct,
      total,
      accuracy,
      xp,
      bestCombo
    });
    if (passed && nextId && nextWasLocked) {
      const nextLesson = LESSONS.find((item) => item.id === nextId);
      if (nextLesson) {
        setUnlockCeremony({ lessonId: nextLesson.id, title: nextLesson.title, unit: nextLesson.unit });
        setFlashUnlockedLessonId(nextLesson.id);
      }
    }
    setActiveLessonId(null);
    setFeedback(null);
    setChoiceSelection(null);
    setOrderSelection([]);
  };

  const continueExercise = () => {
    if (!activeLesson || !feedback) return;
    const finalStep = exerciseIndex + 1 >= activeLesson.exercises.length || feedback.heartsAfter <= 0;
    if (finalStep) {
      finishLesson(activeLesson, feedback.heartsAfter);
      return;
    }
    prepareExercise(activeLesson, exerciseIndex + 1);
  };

  const sessionProgress = activeLesson ? (exerciseIndex + (feedback ? 1 : 0)) / activeLesson.exercises.length : 0;
  const guideState = useMemo(() => {
    const lineByMode = (mood: MentorMood, lessonMentor: MentorId) => {
      if (voiceMode === "tactical") {
        if (mood === "celebrate") return "Excellent execution. Unlock achieved. Advance to the next node.";
        if (mood === "spark") return "Correct. Keep momentum and preserve combo.";
        if (mood === "coach") return lowHearts ? "Hearts critical. Slow down and verify evidence." : "Re-check cue and select strongest evidence match.";
        return lessonMentor === "roma" ? "Use aroma precision. Select only after signal confirmation." : "Use structure-first logic before choosing.";
      }
      if (voiceMode === "story") {
        if (mood === "celebrate") return "A golden pour of progress. Your next chapter is now uncorked.";
        if (mood === "spark") return "You are moving in rhythm now. Keep this flow going.";
        if (mood === "coach")
          return lowHearts
            ? "The glass runs low. Breathe, reset, and answer with intention."
            : "Close call. Let the clues tell their full story.";
        return lessonMentor === "roma"
          ? "Listen for the perfume of the wine, then commit."
          : "Read the backbone of the wine before your final choice.";
      }
      if (mood === "celebrate") return "Elegant work. You cleared the lesson and unlocked your next pour on the path.";
      if (mood === "spark") return combo >= 2 ? "Beautiful streak. Keep that rhythm and collect your combo bonus." : "Yes. Precision first.";
      if (mood === "coach")
        return lowHearts
          ? "Hearts are low. Slow down and trust structure before answering."
          : "Close. Read the cue, then answer from evidence.";
      return lessonMentor === "roma"
        ? "Select the strongest aroma or service cue and commit."
        : "Select the strongest option and commit. Fast, clean, confident.";
    };

    const lessonMentor: MentorId =
      activeLesson && (activeLesson.tag === "Aromas" || activeLesson.tag === "Service") ? "roma" : "sippy";
    const supportMentor: MentorId = lessonMentor === "roma" ? "sippy" : "roma";

    if (summary) {
      if (summary.passed) {
        return {
          speaker: "roma" as MentorId,
          mood: "celebrate" as MentorMood,
          expression: "celebrate" as MentorMood,
          line: lineByMode("celebrate", lessonMentor)
        };
      }
      return {
        speaker: "sippy" as MentorId,
        mood: "coach" as MentorMood,
        expression: "coach" as MentorMood,
        line: lineByMode("coach", lessonMentor)
      };
    }

    if (feedback) {
      if (feedback.correct) {
        return {
          speaker: lessonMentor,
          mood: "spark" as MentorMood,
          expression: "spark" as MentorMood,
          line: lineByMode("spark", lessonMentor)
        };
      }
      return {
        speaker: supportMentor,
        mood: "coach" as MentorMood,
        expression: "coach" as MentorMood,
        line: lineByMode("coach", lessonMentor)
      };
    }

    if (activeLesson && activeExercise) {
      if (activeExercise.kind === "order") {
        return {
          speaker: lessonMentor,
          mood: "calm" as MentorMood,
          expression: "calm" as MentorMood,
          line:
            voiceMode === "story"
              ? "Sequence is your route map. Step through it like a graceful service ritual."
              : voiceMode === "tactical"
                ? "Execute sequence in exact order. Build from first principle to conclusion."
                : "Sequence matters. Build the chain one clear step at a time."
        };
      }
      return {
        speaker: lessonMentor,
        mood: "calm" as MentorMood,
        expression: "calm" as MentorMood,
        line: lineByMode("calm", lessonMentor)
      };
    }

    return {
      speaker: "roma" as MentorId,
      mood: "calm" as MentorMood,
      expression: "calm" as MentorMood,
      line:
        voiceMode === "story"
          ? "Welcome back. Begin a lesson and we will guide your tasting journey together."
          : voiceMode === "tactical"
            ? "Welcome back. Select a node to begin focused training."
            : "Welcome back. Start a node and we will guide every round with you."
    };
  }, [activeExercise, activeLesson, combo, feedback, lowHearts, summary, voiceMode]);
  const activeMentor = MENTORS[guideState.speaker];
  const secondaryMentor = MENTORS[guideState.speaker === "roma" ? "sippy" : "roma"];
  const sippyImage =
    guideState.speaker === "sippy" ? MENTOR_VARIANTS.sippy[guideState.expression] : MENTOR_VARIANTS.sippy.calm;
  const romaImage =
    guideState.speaker === "roma" ? MENTOR_VARIANTS.roma[guideState.expression] : MENTOR_VARIANTS.roma.calm;

  return (
    <section
      className={`academy-game${feedback ? (feedback.correct ? " academy-state-correct" : " academy-state-wrong") : ""}${
        summary?.passed ? " academy-state-win" : ""
      }`}
    >
      <header className="academy-game-header">
        <div>
          <p className="academy-kicker">Sip Academy Reserve</p>
          <h2>Wine Atlas Lessons</h2>
          <p>Luxury-focused micro lessons that make wine fundamentals playful, elegant, and easy to retain.</p>
        </div>
        <div className="academy-level-band">
          <div>
            <strong>{Math.round(completionRatio * 100)}%</strong>
            <span>Path Completion</span>
          </div>
          <div>
            <strong>{completedCount}</strong>
            <span>Lessons Cleared</span>
          </div>
          <div>
            <strong>{masteryTotal}</strong>
            <span>Mastery Points</span>
          </div>
        </div>
        <div className="academy-metrics">
          <span className="academy-chip academy-chip-xp">XP {progress.totalXp}</span>
          <span className="academy-chip academy-chip-streak">Streak {progress.streak}</span>
          <span className="academy-chip academy-chip-mastery">Mastery {masteryTotal}</span>
          <span className={`academy-chip academy-chip-hearts${lowHearts ? " is-danger" : ""}`}>
            Hearts {activeLesson ? hearts : MAX_HEARTS}
          </span>
        </div>
        <div className="academy-voice-modes" aria-label="Mentor voice mode">
          {(["classic", "tactical", "story"] as MentorVoiceMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              className={`academy-voice-btn ${voiceMode === mode ? "active" : ""}`}
              onClick={() => setVoiceMode(mode)}
            >
              {VOICE_MODE_LABELS[mode]}
            </button>
          ))}
        </div>
      </header>

      <section className="academy-mentors" aria-label="Sippy and Roma lesson guidance">
        <article className={`academy-mentor-card ${guideState.speaker === "sippy" ? "active" : ""}`}>
          <div className="academy-mentor-portrait-wrap">
            <img className="academy-mentor-portrait" src={sippyImage} alt="Sippy, beverage educator" loading="lazy" decoding="async" />
          </div>
          <div className="academy-mentor-meta">
            <strong>{MENTORS.sippy.name}</strong>
            <span>{MENTORS.sippy.title}</span>
          </div>
        </article>
        <article className={`academy-mentor-card ${guideState.speaker === "roma" ? "active" : ""}`}>
          <div className="academy-mentor-portrait-wrap">
            <img className="academy-mentor-portrait" src={romaImage} alt="Roma, beverage educator" loading="lazy" decoding="async" />
          </div>
          <div className="academy-mentor-meta">
            <strong>{MENTORS.roma.name}</strong>
            <span>{MENTORS.roma.title}</span>
          </div>
        </article>
        <div className={`academy-mentor-dialog mood-${guideState.mood}`}>
          <p className="academy-mentor-speaker">
            {activeMentor.name} guiding now - backup by {secondaryMentor.name}
          </p>
          <p>{guideState.line}</p>
        </div>
      </section>

      <div className="academy-game-layout">
        <aside className="academy-path">
          <h3>Wine Path</h3>
          <p>{completedCount}/{LESSONS.length} lessons completed</p>
          <div className="academy-path-track" aria-hidden="true">
            <div className="academy-path-track-value" style={{ width: `${Math.round(completionRatio * 100)}%` }} />
          </div>
          <div className="academy-path-list">
            {LESSONS.map((lesson) => {
              const lessonProgress = progress.lessons[lesson.id];
              const unlocked = lessonProgress?.unlocked ?? false;
              const mastery = lessonProgress?.mastery ?? 0;
              const bestAccuracy = lessonProgress?.bestAccuracy ?? 0;
              const isActive = activeLessonId === lesson.id;
              return (
                <button
                  key={lesson.id}
                  type="button"
                  className={`academy-node ${unlocked ? "unlocked" : "locked"} ${isActive ? "active" : ""}`}
                  data-unlocked-flash={flashUnlockedLessonId === lesson.id ? "1" : "0"}
                  onClick={() => startLesson(lesson.id)}
                  disabled={!unlocked}
                >
                  <div className="academy-node-top">
                    <span className="academy-node-unit">Unit {lesson.unit}</span>
                    <span className={`academy-tag academy-tag-${tagClass(lesson.tag)}`}>{lesson.tag}</span>
                  </div>
                  <strong>{lesson.title}</strong>
                  <small>{lesson.subtitle}</small>
                  <div className="academy-node-foot">
                    <small>Mastery {"#".repeat(mastery).padEnd(MAX_MASTERY, "-")}</small>
                    <small>Best {Math.round(bestAccuracy * 100)}%</small>
                  </div>
                  {!unlocked ? <small className="academy-locked-label">Locked</small> : null}
                </button>
              );
            })}
          </div>
        </aside>

        <article className="academy-session">
          {activeLesson && activeExercise ? (
            <>
              <div className="academy-session-head">
                <p className="academy-round-kicker">Reserve Round</p>
                <h3>{activeLesson.title}</h3>
                <div className="academy-session-metrics">
                  <span className="academy-session-chip">Question {exerciseIndex + 1}/{activeLesson.exercises.length}</span>
                  <span className="academy-session-chip">Combo {combo}</span>
                  <span className={`academy-session-chip academy-session-chip-hearts${lowHearts ? " is-danger" : ""}`}>
                    Hearts {hearts}
                  </span>
                </div>
              </div>
              <div className="academy-progress-track" aria-hidden="true">
                <div className="academy-progress-value" style={{ width: `${Math.round(sessionProgress * 100)}%` }} />
              </div>
              <div className={`academy-exercise-card academy-exercise-${activeExercise.kind}`}>
                <h4>{activeExercise.prompt}</h4>
                {activeExercise.kind === "choice" ? (
                  <div className="academy-choice-grid">
                    {activeExercise.options.map((option, index) => (
                      <button
                        key={`${activeExercise.id}-${option}`}
                        type="button"
                        className={`academy-choice ${choiceSelection === index ? "selected" : ""}`}
                        onClick={() => setChoiceSelection(index)}
                        disabled={Boolean(feedback)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="academy-order-builder">
                    <div className="academy-order-selected">
                      {orderSelection.length === 0 ? <span>Select steps in order.</span> : null}
                      {orderSelection.map((value, index) => (
                        <button
                          key={`${value}-${index}`}
                          type="button"
                          disabled={Boolean(feedback)}
                          onClick={() => setOrderSelection((current) => current.filter((_, i) => i !== index))}
                        >
                          {index + 1}. {value}
                        </button>
                      ))}
                    </div>
                    <div className="academy-order-pool">
                      {orderPool.map((value) => {
                        const used = orderSelection.filter((item) => item === value).length;
                        const allowed = activeExercise.options.filter((item) => item === value).length;
                        const disabled = Boolean(feedback) || used >= allowed;
                        return (
                          <button
                            key={`${activeExercise.id}-pool-${value}`}
                            type="button"
                            disabled={disabled}
                            onClick={() => setOrderSelection((current) => (disabled ? current : [...current, value]))}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              {feedback ? (
                <div className={`academy-feedback ${feedback.correct ? "correct" : "wrong"}`}>
                  <strong>{feedback.correct ? "Correct" : "Keep going"}</strong>
                  <p>{feedback.note}</p>
                  <button type="button" className="btn btn-primary" onClick={continueExercise}>
                    {feedback.heartsAfter <= 0 || exerciseIndex + 1 >= activeLesson.exercises.length ? "Finish Lesson" : "Continue"}
                  </button>
                </div>
              ) : (
                <div className="academy-actions">
                  <button type="button" className="btn btn-primary" onClick={checkAnswer} disabled={!canCheck}>Check</button>
                  <button type="button" className="btn btn-light" onClick={() => setActiveLessonId(null)}>Exit</button>
                </div>
              )}
            </>
          ) : summary ? (
            <div className="academy-summary">
              <h3>{summary.lessonTitle}</h3>
              <p>{summary.passed ? "Lesson cleared and next node unlocked." : "Lesson not cleared yet. Practice again."}</p>
              <div className="academy-summary-grid">
                <span>Score {summary.correct}/{summary.total}</span>
                <span>Accuracy {Math.round(summary.accuracy * 100)}%</span>
                <span>XP +{summary.xp}</span>
                <span>Best Combo {summary.bestCombo}</span>
              </div>
              <div className="academy-actions">
                <button type="button" className="btn btn-primary" onClick={() => startLesson(summary.lessonId)}>Practice Again</button>
                <button type="button" className="btn btn-light" onClick={() => setSummary(null)}>Back to Path</button>
              </div>
            </div>
          ) : (
            <div className="academy-idle">
              <h3>Start Wine Lessons</h3>
              <p>Pick an unlocked lesson from the path. Pass at 70% accuracy before hearts run out.</p>
              <ul>
                <li>Short rounds with instant feedback.</li>
                <li>Elegant mastery progression for each lesson node.</li>
                <li>Daily streak and XP rewards to keep momentum.</li>
              </ul>
            </div>
          )}
        </article>
      </div>
      {unlockCeremony ? (
        <div className="academy-unlock-overlay" role="status" aria-live="polite" onClick={() => setUnlockCeremony(null)}>
          <div className="academy-unlock-card" onClick={(event) => event.stopPropagation()}>
            <p className="academy-unlock-kicker">Lesson Unlocked</p>
            <h3>
              Unit {unlockCeremony.unit}: {unlockCeremony.title}
            </h3>
            <p>Your next luxury lesson is ready. Sippy and Roma are waiting at the next node.</p>
            <div className="academy-unlock-mentors" aria-hidden="true">
              <img src={sippyCelebrate} alt="" loading="lazy" decoding="async" />
              <img src={romaCelebrate} alt="" loading="lazy" decoding="async" />
            </div>
            <button type="button" className="btn btn-primary" onClick={() => setUnlockCeremony(null)}>
              Continue
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
