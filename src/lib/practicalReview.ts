import type { SupportRequestDraft } from "./supportRequests";

export const SERVICE_ROLEPLAY_ATTEMPTS_STORAGE_KEY = "sipstudies:service-roleplay-attempts:v1";
export const COCKTAIL_TECHNIQUE_ATTEMPTS_STORAGE_KEY = "sipstudies:cocktail-technique-attempts:v1";
export const CATEGORY_TRAINING_ARCS_STORAGE_KEY = "sipstudies:category-training-arcs:v1";

export type PracticalReviewLane = "service" | "cocktail" | "category";

export type PracticalReviewItem = {
  id: string;
  lane: PracticalReviewLane;
  label: string;
  title: string;
  score: number;
  maxScore: number;
  percent: number;
  detail: string;
  route: string;
  createdAt: string;
};

export type PracticalReviewSnapshot = {
  items: PracticalReviewItem[];
  latestItem: PracticalReviewItem | null;
  averagePercent: number;
  readyCount: number;
  needsCoachingCount: number;
  laneCounts: Record<PracticalReviewLane, number>;
};

export type PracticalSignoffCriterionStatus = "met" | "partial" | "missing";

export type PracticalSignoffCriterion = {
  id: string;
  label: string;
  status: PracticalSignoffCriterionStatus;
  points: number;
  maxPoints: number;
  evidence: string;
  nextStep: string;
};

export type PracticalSignoffPlan = {
  decision: "ready" | "mentor-review" | "build-evidence";
  decisionLabel: string;
  readinessPercent: number;
  criteria: PracticalSignoffCriterion[];
  summary: string;
  nextSteps: string[];
};

function safeJson(raw: string | null): unknown {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function asObject(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
}

function asText(value: unknown): string {
  return typeof value === "string" ? value : typeof value === "number" ? String(value) : "";
}

function asNumber(value: unknown, fallback = 0): number {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function clampPercent(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

function readArrayStorage(key: string): unknown[] {
  if (typeof window === "undefined") return [];
  const parsed = safeJson(window.localStorage.getItem(key));
  return Array.isArray(parsed) ? parsed : [];
}

function readObjectStorage(key: string): Record<string, unknown> {
  if (typeof window === "undefined") return {};
  return asObject(safeJson(window.localStorage.getItem(key))) ?? {};
}

function readServiceItems(): PracticalReviewItem[] {
  const items: Array<PracticalReviewItem | null> = readArrayStorage(SERVICE_ROLEPLAY_ATTEMPTS_STORAGE_KEY)
    .map((item, index): PracticalReviewItem | null => {
      const record = asObject(item);
      if (!record) return null;
      const points = asNumber(record.points);
      const maxPoints = Math.max(1, asNumber(record.maxPoints, 1));
      const percent = clampPercent(asNumber(record.percent, (points / maxPoints) * 100));
      const category = asText(record.category) || "service";
      return {
        id: asText(record.id) || `service-${index}`,
        lane: "service" as const,
        label: `${category} roleplay`,
        title: asText(record.scenarioTitle) || "Saved service roleplay",
        score: points,
        maxScore: maxPoints,
        percent,
        detail: `${points}/${maxPoints} points - ${asText(record.rating) || "Needs mentor read"}`,
        route: "app/service-roleplay",
        createdAt: asText(record.createdAt) || new Date(0).toISOString()
      };
    });
  return items.filter((item): item is PracticalReviewItem => item !== null);
}

function readCocktailItems(): PracticalReviewItem[] {
  const items: Array<PracticalReviewItem | null> = readArrayStorage(COCKTAIL_TECHNIQUE_ATTEMPTS_STORAGE_KEY)
    .map((item, index): PracticalReviewItem | null => {
      const record = asObject(item);
      if (!record) return null;
      const score = asNumber(record.score);
      const maxScore = Math.max(1, asNumber(record.maxScore, 4));
      const percent = clampPercent((score / maxScore) * 100);
      return {
        id: asText(record.id) || `cocktail-${index}`,
        lane: "cocktail" as const,
        label: "cocktail technique",
        title: asText(record.cocktailName) || "Saved cocktail technique attempt",
        score,
        maxScore,
        percent,
        detail: `${score}/${maxScore} technique decisions matched the benchmark`,
        route: "app/cocktails",
        createdAt: asText(record.createdAt) || new Date(0).toISOString()
      };
    });
  return items.filter((item): item is PracticalReviewItem => item !== null);
}

function categoryLabel(id: string): string {
  if (id === "beer") return "Beer lesson arc";
  if (id === "spirits") return "Spirits lesson arc";
  if (id === "bar") return "Bar service lesson arc";
  return "Category lesson arc";
}

function readCategoryItems(): PracticalReviewItem[] {
  const progress = readObjectStorage(CATEGORY_TRAINING_ARCS_STORAGE_KEY);
  const items: Array<PracticalReviewItem | null> = Object.entries(progress)
    .map(([id, value]): PracticalReviewItem | null => {
      const record = asObject(value);
      if (!record) return null;
      const completed = Array.isArray(record.completedModuleTitles)
        ? record.completedModuleTitles.filter((item) => typeof item === "string").length
        : 0;
      const maxScore = 3;
      const percent = clampPercent((completed / maxScore) * 100);
      return {
        id: `category-${id}`,
        lane: "category" as const,
        label: "lesson arc",
        title: categoryLabel(id),
        score: completed,
        maxScore,
        percent,
        detail: `${completed}/${maxScore} arc checkpoints complete`,
        route: "app/sip-academy",
        createdAt: asText(record.lastUpdated) || new Date(0).toISOString()
      };
    });
  return items.filter((item): item is PracticalReviewItem => item !== null && item.score > 0);
}

export function readPracticalReviewSnapshot(): PracticalReviewSnapshot {
  const items = [...readServiceItems(), ...readCocktailItems(), ...readCategoryItems()]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 12);
  const averagePercent = items.length
    ? clampPercent(items.reduce((sum, item) => sum + item.percent, 0) / items.length)
    : 0;
  const laneCounts: Record<PracticalReviewLane, number> = {
    service: items.filter((item) => item.lane === "service").length,
    cocktail: items.filter((item) => item.lane === "cocktail").length,
    category: items.filter((item) => item.lane === "category").length
  };

  return {
    items,
    latestItem: items[0] ?? null,
    averagePercent,
    readyCount: items.length,
    needsCoachingCount: items.filter((item) => item.percent < 85).length,
    laneCounts
  };
}

function representedLaneCount(snapshot: PracticalReviewSnapshot): number {
  return (Object.values(snapshot.laneCounts) as number[]).filter((count) => count > 0).length;
}

function statusFromPoints(points: number, maxPoints: number): PracticalSignoffCriterionStatus {
  if (points >= maxPoints) return "met";
  return points > 0 ? "partial" : "missing";
}

function practicalSignoffCriterion(
  id: string,
  label: string,
  points: number,
  maxPoints: number,
  evidence: string,
  nextStep: string
): PracticalSignoffCriterion {
  return {
    id,
    label,
    status: statusFromPoints(points, maxPoints),
    points,
    maxPoints,
    evidence,
    nextStep
  };
}

export function buildPracticalSignoffPlan(snapshot: PracticalReviewSnapshot): PracticalSignoffPlan {
  const strongArtifacts = snapshot.items.filter((item) => item.percent >= 85).length;
  const laneCoverage = representedLaneCount(snapshot);
  const coveragePoints = snapshot.readyCount >= 3 && laneCoverage >= 3
    ? 25
    : snapshot.readyCount >= 2 && laneCoverage >= 2
      ? 16
      : snapshot.readyCount > 0
        ? 8
        : 0;
  const scorePoints = snapshot.averagePercent >= 85 && snapshot.needsCoachingCount === 0
    ? 25
    : snapshot.averagePercent >= 75
      ? 16
      : snapshot.averagePercent > 0
        ? 8
        : 0;
  const repeatabilityPoints = strongArtifacts >= 3
    ? 25
    : strongArtifacts >= 2
      ? 16
      : strongArtifacts >= 1
        ? 8
        : 0;
  const packetPoints = snapshot.items.length > 0
    ? snapshot.items.every((item) => item.detail && item.route && item.createdAt)
      ? 25
      : 16
    : 0;

  const missingLanes = (["service", "cocktail", "category"] as PracticalReviewLane[])
    .filter((lane) => snapshot.laneCounts[lane] === 0)
    .map((lane) => (lane === "service" ? "service roleplay" : lane === "cocktail" ? "cocktail technique" : "category arc"));

  const criteria: PracticalSignoffCriterion[] = [
    practicalSignoffCriterion(
      "coverage",
      "Cross-lane evidence",
      coveragePoints,
      25,
      `${snapshot.readyCount} artifact${snapshot.readyCount === 1 ? "" : "s"} across ${laneCoverage}/3 lanes`,
      missingLanes.length
        ? `Add ${missingLanes.join(", ")} evidence before a formal review.`
        : "Keep the latest artifacts in the review packet for the instructor."
    ),
    practicalSignoffCriterion(
      "score",
      "Scored readiness",
      scorePoints,
      25,
      `${snapshot.averagePercent}% average with ${snapshot.needsCoachingCount} coaching flag${snapshot.needsCoachingCount === 1 ? "" : "s"}`,
      snapshot.needsCoachingCount > 0
        ? "Repeat any artifact below 85% or attach a mentor correction note."
        : "Use the score summary as the opening line of the sign-off request."
    ),
    practicalSignoffCriterion(
      "repeatability",
      "Repeatable execution",
      repeatabilityPoints,
      25,
      `${strongArtifacts} artifact${strongArtifacts === 1 ? "" : "s"} at or above 85%`,
      strongArtifacts >= 3
        ? "Ask the reviewer to sample one artifact per lane."
        : "Add enough 85%+ artifacts to show repeatable performance."
    ),
    practicalSignoffCriterion(
      "handoff",
      "Reviewable handoff",
      packetPoints,
      25,
      snapshot.latestItem ? `Latest artifact: ${snapshot.latestItem.title}` : "No saved review artifacts yet",
      snapshot.items.length
        ? "Download both the review packet and sign-off sheet for the reviewer."
        : "Complete one scored practical exercise to create a reviewable trail."
    )
  ];

  const readinessPercent = clampPercent(
    (criteria.reduce((sum, criterion) => sum + criterion.points, 0) / criteria.reduce((sum, criterion) => sum + criterion.maxPoints, 0)) * 100
  );
  const decision = readinessPercent >= 85 && criteria.every((criterion) => criterion.status === "met")
    ? "ready"
    : readinessPercent >= 55
      ? "mentor-review"
      : "build-evidence";
  const decisionLabel = decision === "ready"
    ? "Ready for provisional sign-off review"
    : decision === "mentor-review"
      ? "Needs mentor review before sign-off"
      : "Build more practical evidence";
  const nextSteps = criteria
    .filter((criterion) => criterion.status !== "met")
    .map((criterion) => criterion.nextStep)
    .slice(0, 3);

  return {
    decision,
    decisionLabel,
    readinessPercent,
    criteria,
    summary: decision === "ready"
      ? "The local evidence trail is complete enough to request a staffed practical sign-off review."
      : decision === "mentor-review"
        ? "The learner has useful evidence, but the packet still needs a mentor read before formal sign-off."
        : "The learner needs more scored practical work before a sign-off packet is meaningful.",
    nextSteps: nextSteps.length ? nextSteps : ["Schedule an instructor review and bring the downloaded evidence packet."]
  };
}

export function buildPracticalReviewPacket(snapshot: PracticalReviewSnapshot): string {
  return [
    "Sip Studies Practical Review Packet",
    `Artifacts: ${snapshot.items.length}`,
    `Average score: ${snapshot.averagePercent}%`,
    `Needs coaching: ${snapshot.needsCoachingCount}`,
    "",
    "Review artifacts",
    ...snapshot.items.flatMap((item, index) => [
      "",
      `${index + 1}. ${item.title}`,
      `Lane: ${item.label}`,
      `Score: ${item.score}/${item.maxScore} (${item.percent}%)`,
      `Detail: ${item.detail}`,
      `Route: ${item.route}`,
      `Saved: ${item.createdAt}`
    ]),
    "",
    "Instructor rubric",
    "- Confirm the learner can explain the decision in plain guest-facing language.",
    "- Identify one technical correction and one service-language correction.",
    "- Assign the next live rep: roleplay, cocktail technique, or category checkpoint.",
    "- Mark whether the learner is floor-ready, exam-drill-ready, or needs another coached rep."
  ].join("\n");
}

export function buildPracticalSignoffSheet(snapshot: PracticalReviewSnapshot): string {
  const plan = buildPracticalSignoffPlan(snapshot);
  return [
    "Sip Studies Practical Sign-Off Readiness Sheet",
    "This sheet summarizes local readiness evidence. It is not an official credential or staffed approval by itself.",
    "",
    `Decision: ${plan.decisionLabel}`,
    `Readiness: ${plan.readinessPercent}%`,
    `Summary: ${plan.summary}`,
    "",
    "Rubric",
    ...plan.criteria.flatMap((criterion) => [
      "",
      `- ${criterion.label}: ${criterion.status.toUpperCase()} (${criterion.points}/${criterion.maxPoints})`,
      `  Evidence: ${criterion.evidence}`,
      `  Next step: ${criterion.nextStep}`
    ]),
    "",
    "Instructor decision",
    "- Approve practical sign-off",
    "- Approve with one assigned follow-up rep",
    "- Defer sign-off and assign remedial practice",
    "",
    "Reviewer notes",
    "- Service language:",
    "- Technique correction:",
    "- Category/application correction:",
    "- Final next action:",
    "",
    "Evidence index",
    ...snapshot.items.map((item, index) => `${index + 1}. ${item.title} - ${item.label} - ${item.percent}% - ${item.createdAt}`)
  ].join("\n");
}

export function downloadPracticalReviewPacket(snapshot: PracticalReviewSnapshot): void {
  if (typeof document === "undefined") return;
  const blob = new Blob([buildPracticalReviewPacket(snapshot)], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "sip-studies-practical-review-packet.md";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function downloadPracticalSignoffSheet(snapshot: PracticalReviewSnapshot): void {
  if (typeof document === "undefined") return;
  const blob = new Blob([buildPracticalSignoffSheet(snapshot)], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "sip-studies-practical-signoff-readiness-sheet.md";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function buildPracticalReviewSupportDraft(
  snapshot: PracticalReviewSnapshot,
  contactName: string,
  contactEmail: string,
  sourceRoute: string
): SupportRequestDraft {
  return {
    laneId: "study",
    contactName,
    contactEmail,
    teamName: "",
    teamSize: null,
    planInterest: "practical-review",
    urgency: snapshot.needsCoachingCount > 0 ? "soon" : "normal",
    subject: `Instructor practical review request - ${snapshot.items.length} artifact${snapshot.items.length === 1 ? "" : "s"}`,
    message: buildPracticalReviewPacket(snapshot),
    sourceRoute
  };
}
