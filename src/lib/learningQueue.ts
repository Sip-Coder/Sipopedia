import type { CellarScannerSnapshot } from "./cellarScanner";
import type { CohortActivityCenter } from "./cohortActivity";
import type { QuizProgressSnapshot } from "./quizProgress";
import type { TeamTrainingSnapshot } from "./teamPlanner";

export type LearningQueueLane = "Learn" | "Taste" | "Connect";

export type LearningQueueItem = {
  id: string;
  lane: LearningQueueLane;
  priority: "High" | "Medium" | "Low";
  title: string;
  detail: string;
  route: string;
  source: string;
  metric: string;
};

export type LearningQueueContext = {
  academyCompleted: number;
  academyTotal: number;
  academyXp: number;
  academyStreak: number;
  equipmentCompleted: number;
  equipmentTotal: number;
  quiz: QuizProgressSnapshot;
  tasting: {
    total: number;
    blind: number;
    correctFlags: number;
    totalFlags: number;
    countries: number;
  };
  cellar: CellarScannerSnapshot;
  cohortActivity: CohortActivityCenter;
  eventBlocks: number;
  eventSocials: number;
  teamTraining: TeamTrainingSnapshot;
};

function priorityRank(priority: LearningQueueItem["priority"]) {
  if (priority === "High") return 3;
  if (priority === "Medium") return 2;
  return 1;
}

function cleanRoute(route: string | undefined | null, fallback: string) {
  const value = typeof route === "string" ? route.trim() : "";
  return value || fallback;
}

function queueItem(item: LearningQueueItem): LearningQueueItem {
  return item;
}

export function buildLearningQueue(context: LearningQueueContext, limit = 8): LearningQueueItem[] {
  const items: LearningQueueItem[] = [];
  const academyRemaining = Math.max(0, context.academyTotal - context.academyCompleted);
  const equipmentRemaining = Math.max(0, context.equipmentTotal - context.equipmentCompleted);
  const blindAccuracy = context.tasting.totalFlags ? Math.round((context.tasting.correctFlags / context.tasting.totalFlags) * 100) : null;
  const latestCellar = context.cellar.latestRecord;
  const nextTeamAssignment = context.teamTraining.nextAssignment;
  const latestCohort = context.cohortActivity.latestSnapshot;

  if (context.quiz.weakestTopic) {
    const topic = context.quiz.weakestTopic;
    const studyLink = topic.studyLinks[0];
    items.push(queueItem({
      id: `quiz-${topic.id}`,
      lane: "Learn",
      priority: "High",
      title: `Retake ${topic.label}`,
      detail: studyLink ? `${topic.missed}/${topic.total} missed. Study ${studyLink.label}, then retake the drill.` : `${topic.missed}/${topic.total} missed. Retake the focused quiz lane.`,
      route: cleanRoute(studyLink?.route, "app/beverage-quiz"),
      source: "Beverage Quiz remediation",
      metric: `${topic.missed}/${topic.total} missed`
    }));
  } else {
    items.push(queueItem({
      id: "quiz-start",
      lane: "Learn",
      priority: "Medium",
      title: "Save a baseline quiz attempt",
      detail: "Create the first weak-topic signal so the dashboard can route retakes and study links.",
      route: "app/beverage-quiz",
      source: "Beverage Quiz",
      metric: `${context.quiz.attempts.length} attempts`
    }));
  }

  if (academyRemaining > 0) {
    items.push(queueItem({
      id: "academy-next",
      lane: "Learn",
      priority: context.academyCompleted === 0 ? "High" : "Medium",
      title: context.academyCompleted === 0 ? "Start Sip Academy" : "Continue the next Academy mission",
      detail: `${context.academyCompleted}/${context.academyTotal} missions cleared. Keep the lesson streak tied to quiz remediation.`,
      route: "app/sip-academy",
      source: "Sip Academy progress",
      metric: `${academyRemaining} remaining`
    }));
  }

  if (equipmentRemaining > 0 && context.academyCompleted > 0) {
    items.push(queueItem({
      id: "equipment-next",
      lane: "Learn",
      priority: "Low",
      title: "Convert learning into equipment practice",
      detail: `${context.equipmentCompleted}/${context.equipmentTotal} equipment nodes cleared. Use the game path for process and safety recall.`,
      route: "app/sip-game",
      source: "Sip Studios equipment mastery",
      metric: `${equipmentRemaining} nodes`
    }));
  }

  if (latestCellar) {
    const primaryStudyLink = latestCellar.studyLinks[0];
    items.push(queueItem({
      id: `cellar-${latestCellar.id}`,
      lane: "Taste",
      priority: "High",
      title: `Turn ${latestCellar.name || latestCellar.producer || latestCellar.grapeOrStyle || "latest scan"} into study`,
      detail: latestCellar.recommendations[0] ?? "Use the scan to connect inventory, tasting, and study routes.",
      route: cleanRoute(primaryStudyLink?.route, "app/cellar-scanner"),
      source: "Cellar Scanner",
      metric: `${context.cellar.totalBottles} bottles`
    }));
  } else {
    items.push(queueItem({
      id: "cellar-start",
      lane: "Taste",
      priority: context.tasting.total === 0 ? "High" : "Medium",
      title: "Scan a label or menu item",
      detail: "Create a cellar signal that can route to Sipopedia, Regions, Flavor Wheel, or tasting notes.",
      route: "app/cellar-scanner",
      source: "Cellar Scanner",
      metric: "0 scans"
    }));
  }

  if (context.tasting.total === 0) {
    items.push(queueItem({
      id: "tasting-first-note",
      lane: "Taste",
      priority: "High",
      title: "Write the first structured tasting note",
      detail: "Competitors win on repeated practice; one note unlocks flavor, country, and blind-tasting signals.",
      route: "app/flavors",
      source: "Tasting Journal",
      metric: "0 notes"
    }));
  } else if (blindAccuracy !== null && blindAccuracy < 75) {
    items.push(queueItem({
      id: "blind-review",
      lane: "Taste",
      priority: "Medium",
      title: "Review blind tasting misses",
      detail: `${blindAccuracy}% blind-note flag accuracy. Rebuild the evidence chain with Flavor Wheel and Regions.`,
      route: "app/flavor-wheel",
      source: "Tasting notes",
      metric: `${blindAccuracy}% blind`
    }));
  } else {
    items.push(queueItem({
      id: "tasting-expand",
      lane: "Taste",
      priority: "Low",
      title: "Add another tasting category",
      detail: `${context.tasting.total} notes across ${context.tasting.countries} countries. Add a contrasting style to broaden calibration.`,
      route: "app/flavors",
      source: "Tasting notes",
      metric: `${context.tasting.total} notes`
    }));
  }

  if (nextTeamAssignment) {
    items.push(queueItem({
      id: `team-week-${nextTeamAssignment.week}`,
      lane: "Connect",
      priority: nextTeamAssignment.completed ? "Low" : "High",
      title: `${nextTeamAssignment.title}`,
      detail: `${nextTeamAssignment.owner}: ${nextTeamAssignment.outcome}`,
      route: cleanRoute(nextTeamAssignment.route, "support"),
      source: context.teamTraining.plan?.teamName ?? "Team training plan",
      metric: `Week ${nextTeamAssignment.week}`
    }));
  } else {
    items.push(queueItem({
      id: "team-start",
      lane: "Connect",
      priority: "Medium",
      title: "Create a team training plan",
      detail: "Turn support and manager workflows into a weekly staff-education loop.",
      route: "support",
      source: "Support & Teams",
      metric: "No plan"
    }));
  }

  if (latestCohort) {
    items.push(queueItem({
      id: `cohort-${latestCohort.groupId}`,
      lane: "Connect",
      priority: latestCohort.reminderCount > 0 || latestCohort.eventCount > 0 ? "High" : "Medium",
      title: `Follow up with ${latestCohort.groupName}`,
      detail: `${latestCohort.memberCardCount} member cards, ${latestCohort.threadCount} threads, ${latestCohort.reminderCount} reminder holds. ${latestCohort.latestPrompt ?? "Refresh the cohort handoff before the next tasting."}`,
      route: cleanRoute(latestCohort.dashboardRoute, "app/tasting-groups"),
      source: "Tasting Groups cohort activity",
      metric: `${latestCohort.eventCount} events`
    }));
  }

  if (context.eventBlocks === 0 && context.eventSocials === 0) {
    items.push(queueItem({
      id: "connect-events",
      lane: "Connect",
      priority: "Low",
      title: "Build an event or cohort signal",
      detail: "Add an event block or social channel so Connect activity has a durable next step.",
      route: "app/somm-events",
      source: "Somm Events",
      metric: "0 signals"
    }));
  }

  return items
    .sort((a, b) => priorityRank(b.priority) - priorityRank(a.priority) || a.lane.localeCompare(b.lane) || a.title.localeCompare(b.title))
    .slice(0, limit);
}
