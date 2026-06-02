export const QUIZ_PROGRESS_STORAGE_KEY = "sipstudies:beverage-quiz:attempts:v1";
export const QUIZ_PROGRESS_EVENT = "sipstudies:beverage-quiz:attempts-updated";

export type SavedQuizWeakTopic = {
  id: string;
  label: string;
  missed: number;
  total: number;
  studyLinks: SavedQuizStudyLink[];
};

export type SavedQuizStudyLink = {
  label: string;
  route: string;
  detail: string;
};

export type SavedQuizReviewQuestion = {
  id: string;
  prompt: string;
  topicId: string;
  topicLabel: string;
  selectedAnswer: string | null;
  correctAnswer: string;
  teachingNote: string;
  studyLinks: SavedQuizStudyLink[];
};

export type SavedQuizAttempt = {
  id: string;
  completedAt: string;
  examType: string;
  examTypeLabel: string;
  examDivision: string;
  examDivisionLabel: string;
  examLevel: string;
  examLevelLabel: string;
  focusTopicId: string;
  focusTopicLabel: string;
  questionCount: number;
  answered: number;
  correct: number;
  accuracy: number;
  weakTopics: SavedQuizWeakTopic[];
  reviewQuestions: SavedQuizReviewQuestion[];
};

export type QuizProgressSnapshot = {
  attempts: SavedQuizAttempt[];
  latestAttempt: SavedQuizAttempt | null;
  totalAnswered: number;
  totalCorrect: number;
  averageAccuracy: number;
  strongestTopic: SavedQuizWeakTopic | null;
  weakestTopic: SavedQuizWeakTopic | null;
  weakTopics: SavedQuizWeakTopic[];
};

function safeJson(raw: string | null): unknown {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function asAttempt(value: unknown): SavedQuizAttempt | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  const weakTopics = Array.isArray(record.weakTopics)
    ? (record.weakTopics as SavedQuizWeakTopic[]).map((topic) => ({
        ...topic,
        studyLinks: Array.isArray(topic.studyLinks) ? topic.studyLinks : quizStudyLinksForTopic(topic.id, topic.label)
      }))
    : [];
  const reviewQuestions = Array.isArray(record.reviewQuestions)
    ? (record.reviewQuestions as SavedQuizReviewQuestion[]).map((question) => ({
        ...question,
        studyLinks: Array.isArray(question.studyLinks) ? question.studyLinks : quizStudyLinksForTopic(question.topicId, question.topicLabel)
      }))
    : [];
  return {
    id: typeof record.id === "string" ? record.id : `attempt-${Date.now()}`,
    completedAt: typeof record.completedAt === "string" ? record.completedAt : new Date().toISOString(),
    examType: typeof record.examType === "string" ? record.examType : "unknown",
    examTypeLabel: typeof record.examTypeLabel === "string" ? record.examTypeLabel : "Unknown exam",
    examDivision: typeof record.examDivision === "string" ? record.examDivision : "all",
    examDivisionLabel: typeof record.examDivisionLabel === "string" ? record.examDivisionLabel : "All divisions",
    examLevel: typeof record.examLevel === "string" ? record.examLevel : "all",
    examLevelLabel: typeof record.examLevelLabel === "string" ? record.examLevelLabel : "All levels",
    focusTopicId: typeof record.focusTopicId === "string" ? record.focusTopicId : "all",
    focusTopicLabel: typeof record.focusTopicLabel === "string" ? record.focusTopicLabel : "All Topics",
    questionCount: Math.max(0, Math.round(Number(record.questionCount) || 0)),
    answered: Math.max(0, Math.round(Number(record.answered) || 0)),
    correct: Math.max(0, Math.round(Number(record.correct) || 0)),
    accuracy: Math.max(0, Math.min(100, Math.round(Number(record.accuracy) || 0))),
    weakTopics,
    reviewQuestions
  };
}

function sipopediaSearchRoute(query: string) {
  return `app/sipopedia?search=${encodeURIComponent(query)}`;
}

export function quizStudyLinksForTopic(topicId: string, topicLabel: string): SavedQuizStudyLink[] {
  const cleanLabel = topicLabel.trim() || "Beverage study";
  const countryName = topicId.startsWith("country-") ? topicId.replace(/^country-/, "").replace(/-/g, " ") : "";
  const fallbackSearch = countryName || cleanLabel;
  const topicRoutes: Record<string, SavedQuizStudyLink[]> = {
    service: [
      { label: "Sipopedia service terms", route: sipopediaSearchRoute("service"), detail: "Source-backed vocabulary and application notes" },
      { label: "Bev Recipes service reps", route: "app/cocktails", detail: "Apply language to recipes and table-side decisions" }
    ],
    storage: [
      { label: "Sipopedia storage terms", route: sipopediaSearchRoute("storage cellar"), detail: "Cellar, serving temperature, and condition terms" },
      { label: "Resources", route: "app/resources", detail: "Reference lists and exam recall supports" }
    ],
    viticulture: [
      { label: "Sipopedia viticulture", route: sipopediaSearchRoute("viticulture"), detail: "Vineyard vocabulary and study definitions" },
      { label: "Regions atlas", route: "app/regions", detail: "Connect climate and place to style" }
    ],
    vinification: [
      { label: "Sipopedia fermentation", route: sipopediaSearchRoute("fermentation"), detail: "Winemaking and production vocabulary" },
      { label: "Sip Academy", route: "app/sip-academy", detail: "Review production missions" }
    ],
    tasting: [
      { label: "Flavor Wheel", route: "app/flavor-wheel", detail: "Calibrate descriptors and sensory families" },
      { label: "Sipopedia tasting", route: sipopediaSearchRoute("tasting"), detail: "Source-backed tasting vocabulary" }
    ],
    sparkling: [
      { label: "Sipopedia sparkling", route: sipopediaSearchRoute("sparkling"), detail: "Method, dosage, and pressure terminology" },
      { label: "Sip Academy", route: "app/sip-academy", detail: "Review sparkling missions" }
    ],
    fortified: [
      { label: "Sipopedia fortified", route: sipopediaSearchRoute("fortified"), detail: "Port, sherry, and fortification terms" },
      { label: "Resources", route: "app/resources", detail: "Exam reference support" }
    ],
    "spirits-core": [
      { label: "Sipopedia distillation", route: sipopediaSearchRoute("distillation"), detail: "Production and proof terminology" },
      { label: "Spirits resources", route: "app/resources", detail: "Spirits category worksheet and answer key" }
    ],
    "beer-brewing": [
      { label: "Sipopedia brewing", route: sipopediaSearchRoute("brewing"), detail: "Brewing and production vocabulary" },
      { label: "Sip Game equipment", route: "app/sip-game", detail: "Practice brewery process checkpoints" }
    ],
    "beer-styles": [
      { label: "Sipopedia beer styles", route: sipopediaSearchRoute("beer styles"), detail: "Style and sensory vocabulary" },
      { label: "Bev Recipes beer maps", route: "app/cocktails", detail: "Review beer recipe and service maps" }
    ],
    "beer-draught": [
      { label: "Sipopedia draught", route: sipopediaSearchRoute("draught"), detail: "Draft-system and service vocabulary" },
      { label: "Sip Game equipment", route: "app/sip-game", detail: "Practice equipment checkpoints" }
    ],
    "beer-off-flavors": [
      { label: "Sipopedia off-flavors", route: sipopediaSearchRoute("off flavor"), detail: "Fault and sensory defect vocabulary" },
      { label: "Flavor Wheel", route: "app/flavor-wheel", detail: "Calibrate sensory descriptors" }
    ]
  };

  return (
    topicRoutes[topicId] ?? [
      { label: `Sipopedia: ${cleanLabel}`, route: sipopediaSearchRoute(fallbackSearch), detail: "Search source-backed definitions and citations" },
      { label: "Regions and resources", route: topicId.startsWith("country-") ? "app/regions" : "app/resources", detail: "Connect the missed topic to reference material" }
    ]
  );
}

export function readQuizAttempts(limit = 12): SavedQuizAttempt[] {
  if (typeof window === "undefined") return [];
  const parsed = safeJson(window.localStorage.getItem(QUIZ_PROGRESS_STORAGE_KEY));
  if (!Array.isArray(parsed)) return [];
  return parsed
    .map(asAttempt)
    .filter((attempt): attempt is SavedQuizAttempt => Boolean(attempt))
    .sort((a, b) => Date.parse(b.completedAt) - Date.parse(a.completedAt))
    .slice(0, limit);
}

export function saveQuizAttempt(attempt: SavedQuizAttempt): SavedQuizAttempt[] {
  if (typeof window === "undefined") return [attempt];
  const attempts = [attempt, ...readQuizAttempts(24).filter((item) => item.id !== attempt.id)].slice(0, 24);
  window.localStorage.setItem(QUIZ_PROGRESS_STORAGE_KEY, JSON.stringify(attempts));
  window.dispatchEvent(new Event(QUIZ_PROGRESS_EVENT));
  return attempts;
}

export function readQuizProgressSnapshot(): QuizProgressSnapshot {
  const attempts = readQuizAttempts(12);
  const latestAttempt = attempts[0] ?? null;
  const totalAnswered = attempts.reduce((sum, attempt) => sum + attempt.answered, 0);
  const totalCorrect = attempts.reduce((sum, attempt) => sum + attempt.correct, 0);
  const averageAccuracy = totalAnswered ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const topicTotals = new Map<string, SavedQuizWeakTopic>();

  attempts.forEach((attempt) => {
    attempt.weakTopics.forEach((topic) => {
      const current = topicTotals.get(topic.id) ?? { id: topic.id, label: topic.label, missed: 0, total: 0, studyLinks: quizStudyLinksForTopic(topic.id, topic.label) };
      topicTotals.set(topic.id, {
        ...current,
        missed: current.missed + topic.missed,
        total: current.total + topic.total
      });
    });
  });

  const weakTopics = [...topicTotals.values()].sort((a, b) => {
    const bMissRate = b.total ? b.missed / b.total : 0;
    const aMissRate = a.total ? a.missed / a.total : 0;
    return bMissRate - aMissRate || b.missed - a.missed;
  });
  const strongestTopic = [...topicTotals.values()]
    .filter((topic) => topic.total > 0)
    .sort((a, b) => (a.missed / a.total) - (b.missed / b.total))[0] ?? null;

  return {
    attempts,
    latestAttempt,
    totalAnswered,
    totalCorrect,
    averageAccuracy,
    strongestTopic,
    weakestTopic: weakTopics[0] ?? null,
    weakTopics
  };
}
