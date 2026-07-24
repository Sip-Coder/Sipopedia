import { useEffect, useMemo, useState } from "react";
import { useAccess } from "../context/AccessContext";
import { useAuth } from "../context/AuthContext";
import { workspaceItemsForSection, type WorkspaceSectionId } from "../lib/workspaceNavigation";
import { buildOnboardingRoute } from "../lib/onboardingIntent";
import { buildLearningQueue, type LearningQueueItem } from "../lib/learningQueue";
import {
  buildLearnerReminderCenter,
  downloadLearnerReminderCalendar,
  downloadLearnerReminderDigest,
  type LearnerReminderCenter
} from "../lib/learnerReminders";
import {
  OFFICE_HOURS_BOOKING_EVENT,
  OFFICE_HOURS_BOOKING_STORAGE_KEY,
  readOfficeHoursBookings
} from "../lib/officeHours";
import {
  createCloudSupportRequest,
  isSupportRequestRateLimitError,
  listCloudSupportRequests,
  readLocalSupportRequests,
  saveLocalSupportRequest,
  SUPPORT_REQUEST_EVENT,
  SUPPORT_REQUEST_STORAGE_KEY,
  updateCloudSupportRequestStatus,
  type SupportRequestDraft,
  type SupportRequestLane,
  type SupportRequestRecord,
  type SupportRequestStatus
} from "../lib/supportRequests";
import {
  downloadSupportTriageDigest,
  supportRequestSla,
  supportSlaSummary
} from "../lib/supportSla";
import {
  CATEGORY_TRAINING_ARCS_STORAGE_KEY,
  COCKTAIL_TECHNIQUE_ATTEMPTS_STORAGE_KEY,
  SERVICE_ROLEPLAY_ATTEMPTS_STORAGE_KEY,
  buildPracticalSignoffPlan,
  buildPracticalReviewSupportDraft,
  downloadPracticalReviewPacket,
  downloadPracticalSignoffSheet,
  readPracticalReviewSnapshot,
  type PracticalReviewSnapshot
} from "../lib/practicalReview";
import {
  QUIZ_PROGRESS_EVENT,
  QUIZ_PROGRESS_STORAGE_KEY,
  readQuizProgressSnapshot,
  type QuizProgressSnapshot
} from "../lib/quizProgress";
import {
  listCloudTeamTrainingPlans,
  readTeamTrainingSnapshot,
  saveTeamTrainingPlan,
  TEAM_PLANNER_EVENT,
  TEAM_PLANNER_STORAGE_KEY,
  type TeamTrainingPlan,
  type TeamTrainingSnapshot
} from "../lib/teamPlanner";
import {
  CELLAR_SCANNER_EVENT,
  CELLAR_SCANNER_STORAGE_KEY,
  readCellarScannerSnapshot,
  type CellarScannerSnapshot
} from "../lib/cellarScanner";
import {
  COHORT_ACTIVITY_EVENT,
  COHORT_ACTIVITY_STORAGE_KEY,
  buildCohortActivityCenter,
  downloadCohortActivityDashboardDigest,
  readCohortActivitySnapshots,
  type CohortActivityCenter
} from "../lib/cohortActivity";
import {
  LOCAL_TASTING_NOTES_EVENT,
  LOCAL_TASTING_NOTE_STORAGE_KEYS,
  readLocalTastingNoteItems
} from "../lib/tastingJournal";
import {
  EQUIPMENT_MASTERY_EVENT,
  EQUIPMENT_MASTERY_STORAGE_KEY,
  EQUIPMENT_MASTERY_TOTAL_NODES,
  readEquipmentMasterySnapshot
} from "./SipStudiosEquipmentMastery";
import { SipAvatarFigure } from "./SipAvatar";
import {
  getAvatarBeverageCategory,
  getAvatarLoadout,
  getAvatarMasteryTier,
  getAvatarProfession,
  getAvatarPronounLabel,
  getAvatarSecondaryBeverageCategory,
  getAvatarSpecialization,
  getAvatarWorkContext,
  readSipAvatar,
  SIP_AVATAR_EVENT,
  type SipAvatarDesign
} from "../lib/sipAvatar";

type AccountDashboardProps = {
  onNavigate: (route: string) => void;
};

type AccountSectionName = "Learn" | "Taste" | "Connect";

type HudMetric = {
  label: string;
  value: string;
  detail: string;
};

type AccountSubtabProgress = {
  id: string;
  label: string;
  progress: number;
  detail: string;
  route: string;
};

type AccountAchievement = {
  id: string;
  title: string;
  section: AccountSectionName;
  progress: number;
  detail: string;
  route: string;
};

type AccountSectionProgress = {
  id: WorkspaceSectionId;
  section: AccountSectionName;
  completed: number;
  total: number;
  percentage: number;
  streak: string;
  lastMilestone: string;
  signal: string;
  subTabs: AccountSubtabProgress[];
};

type TastingNoteSummary = {
  total: number;
  blind: number;
  correctFlags: number;
  totalFlags: number;
  countries: number;
};

type AccountProgressSnapshot = {
  academyCompleted: number;
  academyTotal: number;
  academyXp: number;
  academyStreak: number;
  equipmentCompleted: number;
  equipmentTotal: number;
  quiz: QuizProgressSnapshot;
  tasting: TastingNoteSummary;
  cellar: CellarScannerSnapshot;
  cohortActivity: CohortActivityCenter;
  eventBlocks: number;
  eventSocials: number;
  teamTraining: TeamTrainingSnapshot;
  sections: AccountSectionProgress[];
  achievements: AccountAchievement[];
  learningQueue: LearningQueueItem[];
  reminders: LearnerReminderCenter;
  totalCompleted: number;
  totalAvailable: number;
  overallProgress: number;
};

const ACADEMY_STORAGE_KEY = "sip-studies:academy:wine:v2";
const EVENTS_STORAGE_KEY = "sipstudies:somm-events-builder:v1";
const supportStatusLabels: Record<SupportRequestStatus, string> = {
  new: "New",
  triaged: "Triaged",
  in_progress: "In Progress",
  closed: "Closed"
};

function clampPercent(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

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

function readAcademyProgress() {
  const raw = typeof window === "undefined" ? null : window.localStorage.getItem(ACADEMY_STORAGE_KEY);
  const record = asObject(safeJson(raw));
  const lessons = asObject(record?.lessons);
  const lessonEntries = lessons ? Object.values(lessons).map((item) => asObject(item)).filter((item): item is Record<string, unknown> => Boolean(item)) : [];
  const completed = lessonEntries.filter((item) => Number(item.completions) > 0).length;
  const unlocked = lessonEntries.filter((item) => Boolean(item.unlocked)).length;
  const mastery = lessonEntries.reduce((sum, item) => sum + Math.max(0, Number(item.mastery) || 0), 0);
  const total = lessonEntries.length || 80;
  const xp = Math.max(0, Math.round(Number(record?.totalXp) || 0));
  const streak = Math.max(0, Math.round(Number(record?.streak) || 0));
  return { completed, unlocked, mastery, total, xp, streak };
}

function noteFlagCount(note: Record<string, unknown>) {
  const flags = ["grapeCorrect", "alcoholCorrect", "countryCorrect", "regionCorrect", "vintageCorrect"].map((key) => note[key]);
  return {
    total: flags.filter((flag) => flag === true || flag === false).length,
    correct: flags.filter((flag) => flag === true).length
  };
}

function readTastingNotes(): TastingNoteSummary {
  const byId = new Map<string, Record<string, unknown>>();
  readLocalTastingNoteItems().forEach((item, index) => {
    const note = asObject(item);
    if (!note) return;
    const id = typeof note.id === "string" && note.id ? note.id : `local-tasting-note-${index}`;
    byId.set(id, note);
  });

  let blind = 0;
  let correctFlags = 0;
  let totalFlags = 0;
  const countries = new Set<string>();
  byId.forEach((note) => {
    if (note.isBlind === true) blind += 1;
    const flags = noteFlagCount(note);
    correctFlags += flags.correct;
    totalFlags += flags.total;
    const country = typeof note.actualCountry === "string" ? note.actualCountry.trim() : "";
    if (country) countries.add(country.toLowerCase());
  });

  return { total: byId.size, blind, correctFlags, totalFlags, countries: countries.size };
}

function readEventBuilderProgress() {
  const fallback = { enabledBlocks: 4, connectedSocials: 5 };
  const record = asObject(typeof window === "undefined" ? null : safeJson(window.localStorage.getItem(EVENTS_STORAGE_KEY)));
  if (!record) return fallback;
  const blocks = Array.isArray(record.blocks) ? record.blocks : [];
  const socials = Array.isArray(record.socials) ? record.socials : [];
  const enabledBlocks = blocks.filter((item) => asObject(item)?.enabled === true).length;
  const connectedSocials = socials.filter((item) => {
    const record = asObject(item);
    return record?.enabled === true && typeof record.url === "string" && record.url.trim().length > 0;
  }).length;
  return { enabledBlocks, connectedSocials };
}

function itemPercent(section: WorkspaceSectionId, itemId: string, context: AccountProgressSnapshotContext): number {
  if (section === "learn") {
    if (itemId === "sip-academy") return context.academyTotal ? (context.academyCompleted / context.academyTotal) * 100 : 0;
    if (itemId === "sip-game") return context.equipmentTotal ? (context.equipmentCompleted / context.equipmentTotal) * 100 : 0;
    if (itemId === "beverage-quiz") return Math.min(100, context.quiz.attempts.length * 18 + context.quiz.averageAccuracy / 2);
    if (itemId === "sipopedia") return Math.min(100, context.academyXp / 18);
    if (itemId === "maps" || itemId === "regions") return context.academyCompleted > 0 ? 28 : 0;
    return context.academyCompleted > 0 ? 18 : 0;
  }
  if (section === "taste") {
    if (itemId === "cellar-scanner") return Math.min(100, context.cellar.records.length * 18 + context.cellar.totalBottles * 4);
    if (itemId === "tasting-journal" || itemId === "flavors") return Math.min(100, context.tasting.total * 12 + context.cellar.records.length * 6);
    if (itemId === "flavor-wheel") return Math.min(100, context.tasting.total * 10 + (context.tasting.countries > 0 ? 15 : 0));
    return Math.min(100, context.tasting.total * 10);
  }
  if (itemId === "somm-events") return Math.min(100, context.eventBlocks * 14 + context.eventSocials * 8);
  if (itemId === "tasting-groups") {
    return Math.min(100, context.cohortActivity.activeGroupCount * 22 + context.cohortActivity.totalThreads * 8 + context.cohortActivity.totalEvents * 7 + (context.eventBlocks > 0 ? 18 : 0));
  }
  if (itemId === "ai-winecast") return context.academyCompleted > 0 || context.tasting.total > 0 ? 38 : 0;
  if (itemId === "beverage-news" || itemId === "flavor-blog" || itemId === "ai-news") return context.eventSocials > 0 ? 30 : 0;
  return 0;
}

type AccountProgressSnapshotContext = {
  academyCompleted: number;
  academyTotal: number;
  academyXp: number;
  academyStreak: number;
  equipmentCompleted: number;
  equipmentTotal: number;
  quiz: QuizProgressSnapshot;
  tasting: TastingNoteSummary;
  cellar: CellarScannerSnapshot;
  cohortActivity: CohortActivityCenter;
  eventBlocks: number;
  eventSocials: number;
  teamTraining: TeamTrainingSnapshot;
};

function buildSectionProgress(context: AccountProgressSnapshotContext): AccountSectionProgress[] {
  return (["learn", "taste", "connect"] as WorkspaceSectionId[]).map((sectionId) => {
    const items = workspaceItemsForSection(sectionId);
    const subTabs = items.map<AccountSubtabProgress>((item) => {
      const progress = clampPercent(itemPercent(sectionId, item.id, context));
      return {
        id: item.id,
        label: item.label,
        progress,
        route: item.route,
        detail: item.signal
      };
    });
    const percentage = clampPercent(subTabs.reduce((sum, item) => sum + item.progress, 0) / Math.max(1, subTabs.length));
    const completed = subTabs.filter((item) => item.progress >= 70).length;
    const section = sectionId === "learn" ? "Learn" : sectionId === "taste" ? "Taste" : "Connect";
    const signal =
      sectionId === "learn"
        ? `${context.academyCompleted + context.equipmentCompleted} mission clears / ${context.quiz.attempts.length} quiz attempts`
        : sectionId === "taste"
          ? `${context.tasting.total} tasting notes / ${context.cellar.totalBottles} cellar bottles`
          : `${context.eventBlocks + context.eventSocials} link signals / ${context.cohortActivity.activeGroupCount} cohort handoffs / ${context.teamTraining.totalAssignments} team tasks`;
    const streak =
      sectionId === "learn"
        ? `${context.academyStreak}d academy streak`
        : sectionId === "taste"
          ? `${context.tasting.blind} blind tastings / ${context.cellar.records.length} scans`
          : `${context.eventSocials} channels linked / ${context.cohortActivity.totalReminders} cohort reminders / ${context.teamTraining.completionRate}% team plan`;
    const lastMilestone =
      sectionId === "learn"
        ? `${context.academyXp} XP / weak quiz topic: ${context.quiz.weakestTopic?.label ?? "none yet"}`
        : sectionId === "taste"
          ? `${context.tasting.countries} countries tasted / ${context.tasting.totalFlags} blind checks / top cellar: ${context.cellar.topRegions[0] ?? "none"}`
          : `${context.eventBlocks} event blocks / ${context.eventSocials} social channels / latest cohort: ${context.cohortActivity.latestSnapshot?.groupName ?? "none"} / next team task: ${context.teamTraining.nextAssignment?.title ?? "none"}`;
    return {
      id: sectionId,
      section,
      completed,
      total: subTabs.length,
      percentage,
      streak,
      lastMilestone,
      signal,
      subTabs
    };
  });
}

function buildAchievements(sections: AccountSectionProgress[], context: AccountProgressSnapshotContext): AccountAchievement[] {
  const learn = sections.find((section) => section.id === "learn") ?? sections[0];
  const taste = sections.find((section) => section.id === "taste") ?? sections[1];
  const connect = sections.find((section) => section.id === "connect") ?? sections[2];
  const blindAccuracy = context.tasting.totalFlags ? (context.tasting.correctFlags / context.tasting.totalFlags) * 100 : 0;
  return [
    {
      id: "realm-runner",
      title: "Realm Runner",
      section: "Learn",
      progress: learn?.percentage ?? 0,
      detail: `${context.academyCompleted}/${context.academyTotal} academy missions and ${context.equipmentCompleted}/${context.equipmentTotal} equipment nodes`,
      route: "app/sip-academy"
    },
    {
      id: "remediation-engine",
      title: "Remediation Engine",
      section: "Learn",
      progress: clampPercent(context.quiz.attempts.length * 20 + context.quiz.averageAccuracy / 2),
      detail: `${context.quiz.attempts.length} saved quiz attempts / ${context.quiz.weakestTopic?.label ?? "no weak topic yet"}`,
      route: "app/beverage-quiz"
    },
    {
      id: "blind-grid",
      title: "Blind Grid Analyst",
      section: "Taste",
      progress: clampPercent((context.tasting.blind / 12) * 100 || blindAccuracy),
      detail: `${context.tasting.blind} blind notes / ${context.tasting.correctFlags}/${context.tasting.totalFlags} checks correct`,
      route: "app/tasting-journal"
    },
    {
      id: "global-palate",
      title: "Global Palate Cartographer",
      section: "Taste",
      progress: clampPercent((context.tasting.countries / 10) * 100),
      detail: `${context.tasting.countries} countries logged from tasting notes`,
      route: "app/tasting-journal"
    },
    {
      id: "signal-builder",
      title: "Signal Builder",
      section: "Connect",
      progress: connect?.percentage ?? 0,
      detail: `${context.eventBlocks} event blocks and ${context.eventSocials} connected media channels`,
      route: "app/somm-events"
    },
    {
      id: "trinity-sync",
      title: "Learn / Taste / Connect Sync",
      section: "Connect",
      progress: clampPercent(((learn?.percentage ?? 0) + (taste?.percentage ?? 0) + (connect?.percentage ?? 0)) / 3),
      detail: "Balanced progress across all workspace lanes",
      route: "account"
    }
  ];
}

function readAccountProgressSnapshot(): AccountProgressSnapshot {
  const academy = readAcademyProgress();
  const equipment = readEquipmentMasterySnapshot();
  const quiz = readQuizProgressSnapshot();
  const tasting = readTastingNotes();
  const cellar = readCellarScannerSnapshot();
  const cohortActivity = buildCohortActivityCenter(readCohortActivitySnapshots());
  const events = readEventBuilderProgress();
  const teamTraining = readTeamTrainingSnapshot();
  const context: AccountProgressSnapshotContext = {
    academyCompleted: academy.completed,
    academyTotal: academy.total,
    academyXp: academy.xp,
    academyStreak: academy.streak,
    equipmentCompleted: equipment.completedCount,
    equipmentTotal: equipment.totalNodes || EQUIPMENT_MASTERY_TOTAL_NODES,
    quiz,
    tasting,
    cellar,
    cohortActivity,
    eventBlocks: events.enabledBlocks,
    eventSocials: events.connectedSocials,
    teamTraining
  };
  const sections = buildSectionProgress(context);
  const learningQueue = buildLearningQueue(context);
  const practicalReview = readPracticalReviewSnapshot();
  const reminders = buildLearnerReminderCenter({
    learningQueue,
    cohortActivity,
    practicalReview,
    teamTraining,
    officeHoursBookings: readOfficeHoursBookings(),
    supportRequests: readLocalSupportRequests()
  });
  const totalCompleted = sections.reduce((sum, section) => sum + section.completed, 0);
  const totalAvailable = sections.reduce((sum, section) => sum + section.total, 0);
  const overallProgress = clampPercent((sections.reduce((sum, section) => sum + section.percentage, 0) / Math.max(1, sections.length)));
  return {
    ...context,
    sections,
    achievements: buildAchievements(sections, context),
    learningQueue,
    reminders,
    totalCompleted,
    totalAvailable,
    overallProgress
  };
}

function progressPath(points: number[], width = 260, height = 92): string {
  if (!points.length) return "";
  return points
    .map((value, index) => {
      const x = points.length === 1 ? width / 2 : (index / (points.length - 1)) * width;
      const y = height - (clampPercent(value) / 100) * (height - 10) - 5;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function ringStyle(value: number) {
  return { "--account-ring-value": `${clampPercent(value) * 3.6}deg` } as React.CSSProperties;
}

function assignmentDueTime(due: string): number {
  if (!due) return Number.POSITIVE_INFINITY;
  const time = new Date(`${due}T00:00:00`).getTime();
  return Number.isFinite(time) ? time : Number.POSITIVE_INFINITY;
}

function membershipLabel(planCode: string | null | undefined): string {
  const normalized = (planCode ?? "").trim().toLowerCase();
  if (!normalized) return "No active membership";
  if (normalized.includes("found")) return "Legacy Founding Access";
  if (normalized.includes("pro")) return "$10/month Membership";
  if (normalized === "local-preview-admin") return "Local Preview";
  return planCode ?? "No active membership";
}

export function AccountDashboard({ onNavigate }: AccountDashboardProps) {
  const { user, isConfigured: isAuthConfigured } = useAuth();
  const { tier, profile, subscription, isAdmin } = useAccess();
  const ownerId = user?.id ?? user?.email ?? "guest";
  const [avatar, setAvatar] = useState<SipAvatarDesign>(() => readSipAvatar(ownerId));
  const [progressSnapshot, setProgressSnapshot] = useState<AccountProgressSnapshot>(() => readAccountProgressSnapshot());
  const [practicalReviewSnapshot, setPracticalReviewSnapshot] = useState<PracticalReviewSnapshot>(() => readPracticalReviewSnapshot());
  const [supportActionKey, setSupportActionKey] = useState<string | null>(null);
  const [supportActionNotice, setSupportActionNotice] = useState("");
  const [adminSupportRequests, setAdminSupportRequests] = useState<SupportRequestRecord[]>([]);
  const [adminSupportNotice, setAdminSupportNotice] = useState("");
  const [adminSupportLoading, setAdminSupportLoading] = useState(false);
  const [adminSupportUpdatingId, setAdminSupportUpdatingId] = useState<string | null>(null);
  const [cloudTeamPlans, setCloudTeamPlans] = useState<TeamTrainingPlan[]>([]);
  const [cloudTeamPlanNotice, setCloudTeamPlanNotice] = useState("");

  useEffect(() => {
    setAvatar(readSipAvatar(ownerId));
  }, [ownerId]);

  useEffect(() => {
    const refreshAvatar = () => setAvatar(readSipAvatar(ownerId));
    window.addEventListener(SIP_AVATAR_EVENT, refreshAvatar);
    window.addEventListener("storage", refreshAvatar);
    return () => {
      window.removeEventListener(SIP_AVATAR_EVENT, refreshAvatar);
      window.removeEventListener("storage", refreshAvatar);
    };
  }, [ownerId]);

  useEffect(() => {
    const refreshProgress = () => {
      setProgressSnapshot(readAccountProgressSnapshot());
      setPracticalReviewSnapshot(readPracticalReviewSnapshot());
    };
    const onStorage = (event: StorageEvent) => {
      const trackedKeys = [
        ACADEMY_STORAGE_KEY,
        EQUIPMENT_MASTERY_STORAGE_KEY,
        QUIZ_PROGRESS_STORAGE_KEY,
        CELLAR_SCANNER_STORAGE_KEY,
        COHORT_ACTIVITY_STORAGE_KEY,
        TEAM_PLANNER_STORAGE_KEY,
        EVENTS_STORAGE_KEY,
        SERVICE_ROLEPLAY_ATTEMPTS_STORAGE_KEY,
        COCKTAIL_TECHNIQUE_ATTEMPTS_STORAGE_KEY,
        CATEGORY_TRAINING_ARCS_STORAGE_KEY,
        OFFICE_HOURS_BOOKING_STORAGE_KEY,
        SUPPORT_REQUEST_STORAGE_KEY,
        ...LOCAL_TASTING_NOTE_STORAGE_KEYS
      ];
      if (event.key && !trackedKeys.includes(event.key)) return;
      refreshProgress();
    };
    refreshProgress();
    window.addEventListener("storage", onStorage);
    window.addEventListener(EQUIPMENT_MASTERY_EVENT, refreshProgress);
    window.addEventListener(QUIZ_PROGRESS_EVENT, refreshProgress);
    window.addEventListener(CELLAR_SCANNER_EVENT, refreshProgress);
    window.addEventListener(COHORT_ACTIVITY_EVENT, refreshProgress);
    window.addEventListener(TEAM_PLANNER_EVENT, refreshProgress);
    window.addEventListener(LOCAL_TASTING_NOTES_EVENT, refreshProgress);
    window.addEventListener(OFFICE_HOURS_BOOKING_EVENT, refreshProgress);
    window.addEventListener(SUPPORT_REQUEST_EVENT, refreshProgress);
    window.addEventListener("focus", refreshProgress);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(EQUIPMENT_MASTERY_EVENT, refreshProgress);
      window.removeEventListener(QUIZ_PROGRESS_EVENT, refreshProgress);
      window.removeEventListener(CELLAR_SCANNER_EVENT, refreshProgress);
      window.removeEventListener(COHORT_ACTIVITY_EVENT, refreshProgress);
      window.removeEventListener(TEAM_PLANNER_EVENT, refreshProgress);
      window.removeEventListener(LOCAL_TASTING_NOTES_EVENT, refreshProgress);
      window.removeEventListener(OFFICE_HOURS_BOOKING_EVENT, refreshProgress);
      window.removeEventListener(SUPPORT_REQUEST_EVENT, refreshProgress);
      window.removeEventListener("focus", refreshProgress);
    };
  }, []);

  const loadAdminSupportRequests = async () => {
    if (!isAdmin || !isAuthConfigured || !user) {
      setAdminSupportRequests([]);
      setAdminSupportNotice(isAdmin ? "Supabase configuration is required for the cloud support inbox." : "");
      return;
    }

    setAdminSupportLoading(true);
    setAdminSupportNotice("Loading support inbox...");
    try {
      const requests = await listCloudSupportRequests();
      setAdminSupportRequests(requests);
      setAdminSupportNotice(requests.length ? `${requests.length} cloud support requests loaded.` : "No cloud support requests yet.");
    } catch (error: unknown) {
      setAdminSupportNotice(`Support inbox unavailable: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setAdminSupportLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) return;
    void loadAdminSupportRequests();
  }, [isAdmin, isAuthConfigured, user?.id]);

  useEffect(() => {
    if (!isAuthConfigured || !user) {
      setCloudTeamPlans([]);
      setCloudTeamPlanNotice(isAuthConfigured ? "" : "Cloud team plans require Supabase configuration.");
      return;
    }

    let cancelled = false;
    setCloudTeamPlanNotice("Checking cloud team plans...");
    listCloudTeamTrainingPlans()
      .then((plans) => {
        if (cancelled) return;
        setCloudTeamPlans(plans);
        if (plans[0]) {
          saveTeamTrainingPlan(plans[0]);
          setProgressSnapshot(readAccountProgressSnapshot());
        }
        setCloudTeamPlanNotice(plans.length ? `${plans.length} cloud team plan${plans.length === 1 ? "" : "s"} synced.` : "No cloud team plans linked yet.");
      })
      .catch((error: unknown) => {
        if (!cancelled) setCloudTeamPlanNotice(`Cloud team plan sync paused: ${error instanceof Error ? error.message : "Unknown error"}`);
      });
    return () => {
      cancelled = true;
    };
  }, [isAuthConfigured, user?.id]);

  const highQueueCount = progressSnapshot.learningQueue.filter((item) => item.priority === "High").length;
  const hudMetrics = useMemo<HudMetric[]>(
    () => [
      { label: "Overall Sync", value: `${progressSnapshot.overallProgress}%`, detail: "Learn / Taste / Connect" },
      { label: "Next Queue", value: String(progressSnapshot.learningQueue.length), detail: `${highQueueCount} high priority` },
      { label: "XP", value: String(progressSnapshot.academyXp), detail: `${progressSnapshot.academyStreak} day streak` },
      { label: "Quiz Avg", value: `${progressSnapshot.quiz.averageAccuracy}%`, detail: `${progressSnapshot.quiz.attempts.length} saved attempts` },
      { label: "Tastings", value: String(progressSnapshot.tasting.total), detail: `${progressSnapshot.tasting.blind} blind` },
      { label: "Cellar", value: String(progressSnapshot.cellar.totalBottles), detail: `${progressSnapshot.cellar.records.length} scans` },
      { label: "Review", value: String(practicalReviewSnapshot.readyCount), detail: `${practicalReviewSnapshot.needsCoachingCount} need coaching` },
      { label: "Connect Signals", value: String(progressSnapshot.eventBlocks + progressSnapshot.eventSocials), detail: "Blocks + channels" },
      { label: "Cohorts", value: String(progressSnapshot.cohortActivity.activeGroupCount), detail: `${progressSnapshot.cohortActivity.totalThreads} threads` },
      { label: "Team Plan", value: `${progressSnapshot.teamTraining.completionRate}%`, detail: `${progressSnapshot.teamTraining.totalAssignments} assignments` }
    ],
    [highQueueCount, practicalReviewSnapshot, progressSnapshot]
  );

  const progressLine = progressPath(progressSnapshot.sections.map((section) => section.percentage));
  const practicalSignoffPlan = useMemo(() => buildPracticalSignoffPlan(practicalReviewSnapshot), [practicalReviewSnapshot]);
  const topAchievement = progressSnapshot.achievements.reduce(
    (best, achievement) => (achievement.progress > best.progress ? achievement : best),
    progressSnapshot.achievements[0]
  );
  const avatarProfession = getAvatarProfession(avatar);
  const avatarCategory = getAvatarBeverageCategory(avatar);
  const avatarSecondaryCategory = getAvatarSecondaryBeverageCategory(avatar);
  const avatarLoadout = getAvatarLoadout(avatar);
  const avatarWorkContext = getAvatarWorkContext(avatar);
  const avatarMasteryTier = getAvatarMasteryTier(avatar);
  const avatarSpecialization = getAvatarSpecialization(avatar);
  const avatarPronouns = getAvatarPronounLabel(avatar);
  const avatarPresentation = avatar.presentation.replace("-", " ");
  const adminOpenSupportRequests = adminSupportRequests.filter((request) => request.status !== "closed");
  const adminUrgentSupportRequests = adminSupportRequests.filter((request) => request.urgency === "urgent" && request.status !== "closed");
  const adminEnterpriseSupportRequests = adminSupportRequests.filter((request) => request.laneId === "team" || request.planInterest.toLowerCase().includes("team"));
  const adminSupportSlaSummary = supportSlaSummary(adminSupportRequests);
  const managerAnalyticsPlans = cloudTeamPlans.length
    ? cloudTeamPlans
    : progressSnapshot.teamTraining.plan
      ? [progressSnapshot.teamTraining.plan]
      : [];
  const managerAssignmentRows = managerAnalyticsPlans.flatMap((plan) =>
    plan.assignments.map((assignment) => ({ plan, assignment }))
  );
  const managerCompletedAssignments = managerAssignmentRows.filter((row) => row.assignment.completed).length;
  const managerOpenAssignments = managerAssignmentRows.filter((row) => !row.assignment.completed);
  const managerCompletionRate = managerAssignmentRows.length
    ? clampPercent((managerCompletedAssignments / managerAssignmentRows.length) * 100)
    : 0;
  const managerLinkedAccounts = new Set(managerAnalyticsPlans.flatMap((plan) => plan.memberEmails ?? [])).size;
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const managerOverdueAssignments = managerOpenAssignments.filter((row) => {
    const dueTime = assignmentDueTime(row.assignment.due);
    return Number.isFinite(dueTime) && dueTime < todayStart.getTime();
  });
  const managerNextAssignments = [...managerOpenAssignments]
    .sort((a, b) => {
      const dueDelta = assignmentDueTime(a.assignment.due) - assignmentDueTime(b.assignment.due);
      return dueDelta !== 0 ? dueDelta : a.assignment.week - b.assignment.week;
    })
    .slice(0, 3);

  const handleAdminSupportStatusChange = async (request: SupportRequestRecord, status: SupportRequestStatus) => {
    if (request.status === status || adminSupportUpdatingId) return;
    setAdminSupportUpdatingId(request.id);
    setAdminSupportNotice(`Updating ${request.id.slice(0, 8)}...`);
    try {
      const updated = await updateCloudSupportRequestStatus(request.id, status);
      setAdminSupportRequests((requests) =>
        requests
          .map((item) => (item.id === updated.id ? updated : item))
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      );
      setAdminSupportNotice(`Request ${updated.id.slice(0, 8)} marked ${supportStatusLabels[updated.status]}.`);
    } catch (error: unknown) {
      setAdminSupportNotice(`Status update failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setAdminSupportUpdatingId(null);
    }
  };

  const submitPracticalReviewRequest = async () => {
    if (supportActionKey) return;
    if (practicalReviewSnapshot.items.length === 0) {
      setSupportActionNotice("Complete a roleplay, cocktail technique attempt, or category arc checkpoint before requesting instructor review.");
      return;
    }

    const draft = buildPracticalReviewSupportDraft(
      practicalReviewSnapshot,
      profile?.displayName ?? "",
      user?.email ?? "",
      typeof window === "undefined" ? "account" : window.location.hash || "account"
    );

    setSupportActionKey("practical-review");
    setSupportActionNotice("Saving instructor review request...");
    try {
      const record = isAuthConfigured && draft.contactEmail
        ? await createCloudSupportRequest(draft, user?.id ?? null)
        : saveLocalSupportRequest(
          draft,
          draft.contactEmail ? "" : "Cloud save skipped because this account does not expose an email address."
        );
      setSupportActionNotice(
        isAuthConfigured && draft.contactEmail
          ? `Instructor review request ${record.id.slice(0, 8)} saved to your account.`
          : `Instructor review request ${record.id.slice(0, 8)} saved locally.`
      );
    } catch (error: unknown) {
      if (isSupportRequestRateLimitError(error)) {
        setSupportActionNotice(error instanceof Error ? error.message : "Too many support requests. Try again later.");
        return;
      }
      const record = saveLocalSupportRequest(draft, `Cloud save failed: ${error instanceof Error ? error.message : "Unknown error"}`);
      setSupportActionNotice(`Cloud save failed, so instructor review request ${record.id.slice(0, 8)} is saved locally.`);
    } finally {
      setSupportActionKey(null);
    }
  };

  const submitAccountSupportRequest = async ({
    actionKey,
    laneId,
    subject,
    message,
    planInterest = subscription?.planCode ?? tier
  }: {
    actionKey: string;
    laneId: SupportRequestLane;
    subject: string;
    message: string;
    planInterest?: string;
  }) => {
    if (supportActionKey) return;

    const contactEmail = user?.email ?? "";
    const draft: SupportRequestDraft = {
      laneId,
      contactName: profile?.displayName ?? "",
      contactEmail,
      teamName: "",
      teamSize: null,
      planInterest,
      urgency: "soon",
      subject,
      message,
      sourceRoute: typeof window === "undefined" ? "account" : window.location.hash || "account"
    };

    setSupportActionKey(actionKey);
    setSupportActionNotice("Saving support request...");
    try {
      const record = isAuthConfigured && contactEmail
        ? await createCloudSupportRequest(draft, user?.id ?? null)
        : saveLocalSupportRequest(
          draft,
          contactEmail ? "" : "Cloud save skipped because this account does not expose an email address."
        );
      setSupportActionNotice(
        isAuthConfigured && contactEmail
          ? `Support request ${record.id.slice(0, 8)} saved to your account.`
          : `Support request ${record.id.slice(0, 8)} saved locally.`
      );
    } catch (error: unknown) {
      if (isSupportRequestRateLimitError(error)) {
        setSupportActionNotice(error instanceof Error ? error.message : "Too many support requests. Try again later.");
        return;
      }
      const record = saveLocalSupportRequest(draft, `Cloud save failed: ${error instanceof Error ? error.message : "Unknown error"}`);
      setSupportActionNotice(`Cloud save failed, so request ${record.id.slice(0, 8)} is saved locally.`);
    } finally {
      setSupportActionKey(null);
    }
  };

  if (!user) {
    return (
      <section className="account-dashboard">
        <header className="section-header">
          <h1>Account Dashboard</h1>
          <p>Sign in to view progress, billing status, and data controls.</p>
        </header>
        <div className="account-dashboard-actions">
          <button className="btn btn-primary" onClick={() => onNavigate("login?next=account")}>
            Log In
          </button>
        </div>
      </section>
    );
  }

  const accountEmail = user.email ?? "Unknown";
  const supportEmail = user.email ?? "";

  return (
    <section className="account-dashboard account-dashboard-hud">
      <header className="section-header account-hud-hero">
        <div className="section-header-copy">
          <p className="nav-overline">Achievement Command Center</p>
          <h1>Account Dashboard</h1>
          <p>Live progress telemetry for every Learn, Taste, and Connect module in your Sip Studies workspace.</p>
        </div>
        <div className="account-orbital-readout" style={ringStyle(progressSnapshot.overallProgress)} aria-label={`Overall progress ${progressSnapshot.overallProgress}%`}>
          <strong>{progressSnapshot.overallProgress}%</strong>
          <span>SYNC</span>
        </div>
        <div className="section-header-action">
          <button className="btn btn-light" onClick={() => onNavigate("app/launch")}>
            Back to Launch Pad
          </button>
        </div>
      </header>

      <div className="account-hud-metrics" aria-label="Account achievement metrics">
        {hudMetrics.map((metric) => (
          <article key={metric.label} className="account-hud-metric">
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <small>{metric.detail}</small>
          </article>
        ))}
      </div>

      <div className="account-dashboard-grid">
        <article className="account-card account-profile-card">
          <div className="account-profile-copy">
            <h3>Profile</h3>
            <p><strong>Email:</strong> {accountEmail}</p>
            <p><strong>Display name:</strong> {profile?.displayName ?? "Not set"}</p>
            <p><strong>Access:</strong> {tier === "starter" ? "LAUNCH PAD PREVIEW" : tier.toUpperCase()}</p>
            <p><strong>Role:</strong> {profile?.role ?? "visitor"}</p>
            <p><strong>Character:</strong> {avatar.title}</p>
            <p><strong>Focus:</strong> {avatarProfession.label} / {avatarCategory.label} + {avatarSecondaryCategory.label}</p>
            <p><strong>Specialty:</strong> {avatarSpecialization.label}</p>
            <p><strong>Context:</strong> {avatarWorkContext.label} / {avatarMasteryTier.label}</p>
            <p><strong>Pronouns:</strong> {avatarPronouns}</p>
            <p><strong>Presentation:</strong> {avatarPresentation}</p>
            {isAdmin ? <p className="hint">Admin preview mode enabled.</p> : null}
          </div>
          <button type="button" className="account-profile-avatar" onClick={() => onNavigate("account/avatar")} aria-label="Open avatar creator">
            <SipAvatarFigure design={avatar} rotation={-18} size="small" />
            <span>
              <strong>{avatar.name}</strong>
              <small>{avatarLoadout.label}</small>
            </span>
          </button>
        </article>

        <article className="account-card account-hud-card">
          <h3>Membership</h3>
          <p><strong>Status:</strong> {subscription?.status ?? "no active subscription"}</p>
          <p><strong>Plan:</strong> {membershipLabel(subscription?.planCode)}</p>
          <p><strong>Period end:</strong> {subscription?.currentPeriodEnd ? new Date(subscription.currentPeriodEnd).toLocaleDateString() : "-"}</p>
          <div className="account-dashboard-actions">
            {!subscription ? (
              <button className="btn btn-primary" onClick={() => onNavigate(buildOnboardingRoute("pricing", { planId: "pro", source: "account-dashboard", next: "app/launch" }))}>
                Continue Enrollment
              </button>
            ) : null}
            <button
              type="button"
              className="btn btn-light"
              disabled={Boolean(supportActionKey)}
              onClick={() =>
                submitAccountSupportRequest({
                  actionKey: "billing",
                  laneId: "billing",
                  subject: "Sip Studies billing help request",
                  message: `Email: ${supportEmail}\nPlan: ${subscription?.planCode ?? "no active membership"}\nStatus: ${subscription?.status ?? "none"}\nRequest: I need help managing my payment method.`
                })
              }
            >
              {supportActionKey === "billing" ? "Saving Billing Request" : "Request Billing Help"}
            </button>
            <button
              type="button"
              className="btn btn-light"
              disabled={Boolean(supportActionKey)}
              onClick={() =>
                submitAccountSupportRequest({
                  actionKey: "cancel",
                  laneId: "billing",
                  subject: "Sip Studies cancellation request",
                  message: `Email: ${supportEmail}\nPlan: ${subscription?.planCode ?? "no active membership"}\nStatus: ${subscription?.status ?? "none"}\nRequest: I want to cancel or change my membership.`
                })
              }
            >
              {supportActionKey === "cancel" ? "Saving Cancellation Request" : "Request Cancellation"}
            </button>
          </div>
          {supportActionNotice ? <p className="hint" role="status" aria-live="polite">{supportActionNotice}</p> : null}
        </article>

        {isAdmin ? (
          <article className="account-card account-card-wide account-admin-support-card">
            <div className="account-admin-support-head">
              <div>
                <p className="nav-overline">Admin Support Inbox</p>
                <h3>Cloud requests ready for triage</h3>
                <p>Review enrollment, billing, study, team, and privacy requests captured from Support Center, Checkout, and Account Dashboard.</p>
              </div>
              <div className="account-admin-support-head-actions">
                <button type="button" className="btn btn-light" onClick={() => void loadAdminSupportRequests()} disabled={adminSupportLoading}>
                  {adminSupportLoading ? "Refreshing" : "Refresh Inbox"}
                </button>
                <button type="button" className="btn btn-light" onClick={() => downloadSupportTriageDigest(adminSupportRequests)} disabled={adminSupportRequests.length === 0}>
                  Download Triage
                </button>
              </div>
            </div>

            <div className="account-admin-support-summary" aria-label="Support inbox summary">
              <span>
                <strong>{adminOpenSupportRequests.length}</strong>
                Open
              </span>
              <span>
                <strong>{adminUrgentSupportRequests.length}</strong>
                Urgent
              </span>
              <span>
                <strong>{adminEnterpriseSupportRequests.length}</strong>
                Team
              </span>
              <span>
                <strong>{adminSupportSlaSummary.dueSoonCount}</strong>
                Due Soon
              </span>
              <span>
                <strong>{adminSupportSlaSummary.overdueCount}</strong>
                Overdue
              </span>
              <span>
                <strong>{adminSupportRequests.length}</strong>
                Total
              </span>
            </div>
            <p className="account-admin-support-sla-next">Next SLA: {adminSupportSlaSummary.nextDueLabel}</p>

            {adminSupportNotice ? <p className="account-admin-support-status" role="status" aria-live="polite">{adminSupportNotice}</p> : null}

            {adminSupportRequests.length ? (
              <div className="account-admin-support-list">
                {adminSupportRequests.slice(0, 8).map((request) => {
                  const sla = supportRequestSla(request);
                  return (
                    <article key={request.id} className={`account-admin-support-ticket status-${request.status} sla-${sla.tone}`}>
                      <div className="account-admin-support-ticket-head">
                        <span>{request.id.slice(0, 8)}</span>
                        <strong>{supportStatusLabels[request.status]}</strong>
                      </div>
                      <div className={`account-admin-support-sla-pill sla-${sla.tone}`}>
                        <strong>{sla.dueLabel}</strong>
                        <span>{sla.targetLabel} · due {sla.dueAtLabel}</span>
                      </div>
                      <h4>{request.subject}</h4>
                      <p>{request.message}</p>
                      <div className="account-admin-support-meta">
                        <span>{request.laneId}</span>
                        <span>{request.urgency}</span>
                        <span>{request.planInterest || "no plan"}</span>
                        <span>{new Date(request.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="account-admin-support-contact">
                        {request.contactName || "No name"} · {request.contactEmail}
                        {request.teamName ? ` · ${request.teamName}` : ""}
                        {request.teamSize ? ` · ${request.teamSize} learners` : ""}
                      </p>
                      <p className="account-admin-support-sla-note">{sla.laneNote}</p>
                      <div className="account-admin-support-actions" aria-label={`Update ${request.subject} status`}>
                        {(["new", "triaged", "in_progress", "closed"] as SupportRequestStatus[]).map((status) => (
                          <button
                            key={status}
                            type="button"
                            className={request.status === status ? "active" : ""}
                            disabled={adminSupportUpdatingId === request.id || request.status === status}
                            onClick={() => handleAdminSupportStatusChange(request, status)}
                          >
                            {adminSupportUpdatingId === request.id && request.status !== status ? "..." : supportStatusLabels[status]}
                          </button>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="account-admin-support-empty">
                <strong>No support requests loaded.</strong>
                <p>Requests appear here after Supabase is configured and RLS allows this admin account to read them.</p>
              </div>
            )}
          </article>
        ) : null}

        <article className="account-card account-card-wide account-achievement-command">
          <div className="account-achievement-head">
            <div>
              <p className="nav-overline">Achievements</p>
              <h3>Workspace Progress HUD</h3>
              <p>Each achievement is calculated from your Learn, Taste, and Connect module progress.</p>
            </div>
            <div className="account-achievement-prime" style={ringStyle(topAchievement?.progress ?? 0)}>
              <strong>{topAchievement?.progress ?? 0}%</strong>
              <span>{topAchievement?.title ?? "No Signal"}</span>
            </div>
          </div>

          <div className="account-hud-graph-grid">
            <figure className="account-hud-line-graph" aria-label="Progress graph across Learn, Taste, and Connect">
              <svg viewBox="0 0 260 92" role="img">
                <defs>
                  <linearGradient id="accountGraphLine" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" stopColor="#edd4a8" />
                    <stop offset="0.52" stopColor="#66c7b7" />
                    <stop offset="1" stopColor="#9fdaf5" />
                  </linearGradient>
                </defs>
                {[18, 46, 74].map((y) => (
                  <line key={y} x1="0" y1={y} x2="260" y2={y} />
                ))}
                <path d={progressLine} />
                {progressSnapshot.sections.map((section, index) => {
                  const x = progressSnapshot.sections.length === 1 ? 130 : (index / (progressSnapshot.sections.length - 1)) * 260;
                  const y = 92 - (section.percentage / 100) * 82 - 5;
                  return <circle key={section.id} cx={x} cy={y} r="4.8" />;
                })}
              </svg>
              <figcaption>
                {progressSnapshot.sections.map((section) => (
                  <span key={section.id}>{section.section}</span>
                ))}
              </figcaption>
            </figure>

            <div className="account-radar-panel" aria-label="Workspace section radar">
              {progressSnapshot.sections.map((section) => (
                <div key={section.id} className={`account-radar-ring account-radar-ring-${section.id}`} style={ringStyle(section.percentage)}>
                  <strong>{section.percentage}%</strong>
                  <span>{section.section}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="account-achievement-list">
            {progressSnapshot.sections.map((item) => (
              <div key={item.section} className={`account-achievement-item account-achievement-item-${item.id}`}>
                <div className="account-achievement-top">
                  <strong>{item.section}</strong>
                  <span>{item.completed}/{item.total} subtabs active ({item.percentage}%)</span>
                </div>
                <div
                  className="account-achievement-bar"
                  role="progressbar"
                  aria-label={`${item.section} progress`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={item.percentage}
                >
                  <span style={{ width: `${item.percentage}%` }} />
                </div>
                <p>{item.streak} · {item.lastMilestone}</p>
                <div className="account-subtab-meter-grid">
                  {item.subTabs.map((subtab) => (
                    <button key={subtab.id} type="button" className="account-subtab-meter" onClick={() => onNavigate(subtab.route.replace(/^app\//, "app/"))}>
                      <span>{subtab.label}</span>
                      <strong>{subtab.progress}%</strong>
                      <small>{subtab.detail}</small>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="account-card account-card-wide account-infographic-card">
          <div>
            <p className="nav-overline">Achievement Unlocks</p>
            <h3>Badges tied to real module signals</h3>
          </div>
          <div className="account-badge-grid">
            {progressSnapshot.achievements.map((achievement) => (
              <button key={achievement.id} type="button" className="account-badge" onClick={() => onNavigate(achievement.route)}>
                <span className="account-badge-orbit" style={ringStyle(achievement.progress)}>
                  <strong>{achievement.progress}%</strong>
                </span>
                <span>
                  <strong>{achievement.title}</strong>
                  <small>{achievement.section}</small>
                  <em>{achievement.detail}</em>
                </span>
              </button>
            ))}
          </div>
        </article>

        <article className="account-card account-card-wide account-learning-queue-card">
          <div className="account-learning-queue-head">
            <div>
              <p className="nav-overline">Unified Learning Queue</p>
              <h3>One next-action list across Learn, Taste, and Connect</h3>
              <p>Quiz misses, Academy progress, cellar scans, tasting notes, and team assignments now converge into one ranked queue.</p>
            </div>
            <div className="account-learning-queue-summary">
              <strong>{progressSnapshot.learningQueue.length}</strong>
              <span>{highQueueCount} high priority</span>
            </div>
          </div>
          <div className="account-learning-queue-list">
            {progressSnapshot.learningQueue.map((item) => (
              <button key={item.id} type="button" className={`account-learning-queue-item priority-${item.priority.toLowerCase()}`} onClick={() => onNavigate(item.route)}>
                <span className="account-learning-queue-lane">{item.lane}</span>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
                <small>
                  {item.priority} priority · {item.source} · {item.metric}
                </small>
              </button>
            ))}
          </div>
        </article>

        <article className="account-card account-card-wide account-cohort-activity-card">
          <div className="account-cohort-activity-head">
            <div>
              <p className="nav-overline">Cohort Activity Inbox</p>
              <h3>
                {progressSnapshot.cohortActivity.latestSnapshot
                  ? `Latest group: ${progressSnapshot.cohortActivity.latestSnapshot.groupName}`
                  : "Send a tasting group handoff into learner follow-up"}
              </h3>
              <p>
                Tasting Group handoffs now join dashboard progress with member goals, meetup cards, thread prompts, reminder holds, and local presence.
              </p>
            </div>
            <div className="account-cohort-activity-summary" aria-label="Cohort activity summary">
              <span>
                <strong>{progressSnapshot.cohortActivity.activeGroupCount}</strong>
                Groups
              </span>
              <span>
                <strong>{progressSnapshot.cohortActivity.totalEvents}</strong>
                Events
              </span>
              <span>
                <strong>{progressSnapshot.cohortActivity.totalThreads}</strong>
                Threads
              </span>
              <span>
                <strong>{progressSnapshot.cohortActivity.totalReminders}</strong>
                Holds
              </span>
            </div>
          </div>

          {progressSnapshot.cohortActivity.snapshots.length ? (
            <div className="account-cohort-activity-list">
              {progressSnapshot.cohortActivity.snapshots.slice(0, 4).map((snapshot) => (
                <button key={snapshot.id} type="button" className="account-cohort-activity-item" onClick={() => onNavigate(snapshot.dashboardRoute)}>
                  <span>{snapshot.focus} / {snapshot.cloudBacked ? "Cloud" : "Local"}</span>
                  <strong>{snapshot.groupName}</strong>
                  <p>{snapshot.latestPrompt ?? snapshot.recommendations[0]}</p>
                  <small>
                    {snapshot.memberCardCount} cards · {snapshot.eventCount} events · {snapshot.threadCount} threads
                  </small>
                </button>
              ))}
            </div>
          ) : (
            <p className="account-cohort-activity-empty">
              Open Tasting Groups and send a cohort handoff to place group activity beside study reminders.
            </p>
          )}

          <div className="account-dashboard-actions">
            <button type="button" className="btn btn-primary" onClick={() => onNavigate("app/tasting-groups")}>
              Open Tasting Groups
            </button>
            <button
              type="button"
              className="btn btn-light"
              disabled={progressSnapshot.cohortActivity.snapshots.length === 0}
              onClick={() => downloadCohortActivityDashboardDigest(progressSnapshot.cohortActivity)}
            >
              Download Cohort Inbox
            </button>
          </div>
        </article>

        <article className="account-card account-card-wide account-reminder-center-card">
          <div className="account-reminder-center-head">
            <div>
              <p className="nav-overline">Learner Reminder Center</p>
              <h3>{progressSnapshot.reminders.nextItem ? `Next hold: ${progressSnapshot.reminders.nextItem.title}` : "Turn next actions into dated follow-up"}</h3>
              <p>
                Quiz retakes, office-hours holds, support requests, team assignments, and practical-review packets now share one calendar-ready reminder queue.
              </p>
            </div>
            <div className="account-reminder-center-summary" aria-label="Learner reminder summary">
              <span>
                <strong>{progressSnapshot.reminders.items.length}</strong>
                Open
              </span>
              <span>
                <strong>{progressSnapshot.reminders.highPriorityCount}</strong>
                High
              </span>
              <span>
                <strong>{progressSnapshot.reminders.todayCount}</strong>
                Today
              </span>
              <span>
                <strong>{progressSnapshot.reminders.overdueCount}</strong>
                Overdue
              </span>
            </div>
          </div>

          {progressSnapshot.reminders.items.length ? (
            <div className="account-reminder-center-list">
              {progressSnapshot.reminders.items.slice(0, 6).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`account-reminder-center-item priority-${item.priority.toLowerCase()}`}
                  onClick={() => onNavigate(item.route)}
                >
                  <span>{item.lane} · {item.priority}</span>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                  <small>{item.dueLabel} · {item.source}</small>
                </button>
              ))}
            </div>
          ) : (
            <p className="account-reminder-center-empty">
              Save a quiz attempt, office-hours hold, support request, team plan, or practical-review artifact to generate dated follow-up.
            </p>
          )}

          <div className="account-dashboard-actions">
            <button
              type="button"
              className="btn btn-primary"
              disabled={progressSnapshot.reminders.items.length === 0}
              onClick={() => downloadLearnerReminderCalendar(progressSnapshot.reminders)}
            >
              Download Calendar
            </button>
            <button
              type="button"
              className="btn btn-light"
              disabled={progressSnapshot.reminders.items.length === 0}
              onClick={() => downloadLearnerReminderDigest(progressSnapshot.reminders)}
            >
              Download Digest
            </button>
            <button type="button" className="btn btn-light" onClick={() => onNavigate("support")}>
              Open Support Desk
            </button>
          </div>
        </article>

        <article className="account-card account-card-wide account-practical-review-card">
          <div className="account-practical-review-head">
            <div>
              <p className="nav-overline">Instructor Review Queue</p>
              <h3>
                {practicalReviewSnapshot.latestItem
                  ? `Latest artifact: ${practicalReviewSnapshot.latestItem.title}`
                  : "Turn saved practice into an instructor-ready packet"}
              </h3>
              <p>
                Service roleplay, Cocktail Technique Lab, and Academy category arc progress now roll into one practical-review queue for mentor packets and support handoff.
              </p>
            </div>
            <div className="account-practical-review-summary">
              <strong>{practicalReviewSnapshot.readyCount}</strong>
              <span>{practicalReviewSnapshot.averagePercent}% avg</span>
            </div>
          </div>

          <div className="account-practical-review-metrics" aria-label="Practical review metrics">
            <span>
              <strong>{practicalReviewSnapshot.laneCounts.service}</strong>
              Roleplay
            </span>
            <span>
              <strong>{practicalReviewSnapshot.laneCounts.cocktail}</strong>
              Technique
            </span>
            <span>
              <strong>{practicalReviewSnapshot.laneCounts.category}</strong>
              Arcs
            </span>
            <span>
              <strong>{practicalReviewSnapshot.needsCoachingCount}</strong>
              Coach
            </span>
          </div>

          <div className="account-practical-signoff-panel" aria-label="Formal practical sign-off readiness">
            <div className="account-practical-signoff-score">
              <span>Formal Sign-Off Readiness</span>
              <strong>{practicalSignoffPlan.readinessPercent}%</strong>
              <small>{practicalSignoffPlan.decisionLabel}</small>
            </div>
            <div className="account-practical-signoff-criteria">
              {practicalSignoffPlan.criteria.map((criterion) => (
                <div
                  key={criterion.id}
                  className={`account-practical-signoff-criterion is-${criterion.status}`}
                >
                  <span>{criterion.label}</span>
                  <strong>{criterion.status}</strong>
                  <small>{criterion.evidence}</small>
                </div>
              ))}
            </div>
            <div className="account-practical-signoff-next">
              <span>Next action</span>
              <p>{practicalSignoffPlan.nextSteps[0]}</p>
            </div>
          </div>

          {practicalReviewSnapshot.items.length ? (
            <div className="account-practical-review-list">
              {practicalReviewSnapshot.items.slice(0, 5).map((item) => (
                <button key={`${item.lane}-${item.id}`} type="button" onClick={() => onNavigate(item.route)}>
                  <span>{item.label}</span>
                  <strong>{item.title}</strong>
                  <small>{item.detail} · {item.percent}%</small>
                </button>
              ))}
            </div>
          ) : (
            <p className="account-practical-review-empty">
              Save a scored roleplay attempt, a cocktail technique attempt, or a beer/spirits/bar Academy checkpoint to unlock instructor review handoff.
            </p>
          )}

          <div className="account-dashboard-actions">
            <button
              type="button"
              className="btn btn-primary"
              disabled={Boolean(supportActionKey)}
              onClick={() => void submitPracticalReviewRequest()}
            >
              {supportActionKey === "practical-review" ? "Saving Review Request" : "Request Instructor Review"}
            </button>
            <button
              type="button"
              className="btn btn-light"
              disabled={practicalReviewSnapshot.items.length === 0}
              onClick={() => {
                downloadPracticalReviewPacket(practicalReviewSnapshot);
                setSupportActionNotice("Practical review packet downloaded.");
              }}
            >
              Download Review Packet
            </button>
            <button
              type="button"
              className="btn btn-light"
              disabled={practicalReviewSnapshot.items.length === 0}
              onClick={() => {
                downloadPracticalSignoffSheet(practicalReviewSnapshot);
                setSupportActionNotice("Practical sign-off readiness sheet downloaded.");
              }}
            >
              Download Sign-Off Sheet
            </button>
            <button type="button" className="btn btn-light" onClick={() => onNavigate("app/service-roleplay")}>
              Open Roleplay Lab
            </button>
          </div>
          {supportActionNotice ? <p className="hint" role="status" aria-live="polite">{supportActionNotice}</p> : null}
        </article>

        <article className="account-card account-card-wide account-quiz-remediation-card">
          <div>
            <p className="nav-overline">Quiz Remediation</p>
            <h3>{progressSnapshot.quiz.weakestTopic ? `Next weak topic: ${progressSnapshot.quiz.weakestTopic.label}` : "Start a saved quiz review loop"}</h3>
            <p>
              {progressSnapshot.quiz.latestAttempt
                ? `${progressSnapshot.quiz.latestAttempt.examTypeLabel} average is ${progressSnapshot.quiz.averageAccuracy}% across ${progressSnapshot.quiz.attempts.length} saved attempts.`
                : "Save a Beverage Quiz attempt to unlock weak-topic retakes and dashboard reminders."}
            </p>
          </div>
          {progressSnapshot.quiz.weakTopics.length > 0 ? (
            <div className="account-quiz-topic-row">
              {progressSnapshot.quiz.weakTopics.slice(0, 4).map((topic) => (
                <article key={topic.id}>
                  <button type="button" onClick={() => onNavigate("app/beverage-quiz")}>
                    <span>{topic.label}</span>
                    <strong>{topic.missed}/{topic.total} missed</strong>
                  </button>
                  {topic.studyLinks[0] ? (
                    <button type="button" onClick={() => onNavigate(topic.studyLinks[0].route)}>
                      <span>Study</span>
                      <strong>{topic.studyLinks[0].label}</strong>
                    </button>
                  ) : null}
                </article>
              ))}
            </div>
          ) : null}
          <button className="btn btn-primary" type="button" onClick={() => onNavigate("app/beverage-quiz")}>
            Open Quiz Review
          </button>
        </article>

        <article className="account-card account-card-wide account-cellar-scanner-card">
          <div>
            <p className="nav-overline">Cellar Scanner</p>
            <h3>{progressSnapshot.cellar.latestRecord ? `Latest scan: ${progressSnapshot.cellar.latestRecord.name || progressSnapshot.cellar.latestRecord.producer || progressSnapshot.cellar.latestRecord.grapeOrStyle}` : "Start a scan-linked cellar loop"}</h3>
            <p>
              {progressSnapshot.cellar.records.length > 0
                ? `${progressSnapshot.cellar.totalBottles} bottles across ${progressSnapshot.cellar.records.length} scan records. Top focus: ${progressSnapshot.cellar.topRegions.join(", ") || "add regions"}.`
                : "Scan or paste a label/menu item to create a local cellar record with study routes and tasting-note prompts."}
            </p>
          </div>
          {progressSnapshot.cellar.records.length > 0 ? (
            <div className="account-cellar-signal-row">
              {progressSnapshot.cellar.records.slice(0, 4).map((record) => (
                <button key={record.id} type="button" onClick={() => onNavigate(record.studyLinks[0]?.route ?? "app/cellar-scanner")}>
                  <span>{record.beverageType}</span>
                  <strong>{record.name || record.producer || record.grapeOrStyle || "Cellar scan"}</strong>
                  <small>{record.quantity}x · {record.region || record.country || "add origin"}</small>
                </button>
              ))}
            </div>
          ) : null}
          <button className="btn btn-primary" type="button" onClick={() => onNavigate("app/cellar-scanner")}>
            Open Cellar Scanner
          </button>
        </article>

        <article className="account-card account-card-wide account-team-training-card">
          <div>
            <p className="nav-overline">Team Training Plan</p>
            <h3>
              {progressSnapshot.teamTraining.plan
                ? `${progressSnapshot.teamTraining.plan.teamName}: ${progressSnapshot.teamTraining.nextAssignment?.title ?? "Plan complete"}`
                : "Create a manager assignment loop"}
            </h3>
            <p>
              {progressSnapshot.teamTraining.plan
                ? `${progressSnapshot.teamTraining.completedAssignments}/${progressSnapshot.teamTraining.totalAssignments} assignments complete for ${progressSnapshot.teamTraining.plan.sprintTitle}.`
                : "Use Support & Teams to save a weekly staff-training sprint for service, beer, spirits, or certification prep."}
            </p>
          </div>
          {managerAnalyticsPlans.length ? (
            <div className="account-team-analytics-grid" aria-label="Manager team analytics">
              <span>
                <strong>{managerCompletionRate}%</strong>
                Completion
              </span>
              <span>
                <strong>{managerOpenAssignments.length}</strong>
                Open
              </span>
              <span>
                <strong>{managerOverdueAssignments.length}</strong>
                Overdue
              </span>
              <span>
                <strong>{managerLinkedAccounts}</strong>
                Accounts
              </span>
            </div>
          ) : null}
          {progressSnapshot.teamTraining.plan ? (
            <div className="account-team-assignment-row">
              {progressSnapshot.teamTraining.plan.assignments.slice(0, 4).map((assignment) => (
                <button key={`${assignment.week}-${assignment.title}`} type="button" className={assignment.completed ? "complete" : ""} onClick={() => onNavigate(assignment.route)}>
                  <span>Week {assignment.week}</span>
                  <strong>{assignment.title}</strong>
                  <small>{assignment.completed ? "Complete" : assignment.owner}</small>
                </button>
              ))}
            </div>
          ) : null}
          {cloudTeamPlanNotice ? <p className="account-team-cloud-status" role="status" aria-live="polite">{cloudTeamPlanNotice}</p> : null}
          {managerNextAssignments.length ? (
            <div className="account-team-risk-list" aria-label="Manager next assignment risks">
              {managerNextAssignments.map(({ plan, assignment }) => (
                <article key={`${plan.id}-${assignment.week}-${assignment.title}`}>
                  <span>Week {assignment.week}</span>
                  <strong>{assignment.title}</strong>
                  <p>{plan.teamName} · {assignment.owner}{assignment.due ? ` · due ${new Date(`${assignment.due}T00:00:00`).toLocaleDateString()}` : ""}</p>
                </article>
              ))}
            </div>
          ) : null}
          {cloudTeamPlans.length > 1 ? (
            <div className="account-team-cloud-plan-row" aria-label="Cloud team plans">
              {cloudTeamPlans.slice(0, 3).map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  className={progressSnapshot.teamTraining.plan?.id === plan.id ? "active" : ""}
                  onClick={() => {
                    saveTeamTrainingPlan(plan);
                    setProgressSnapshot(readAccountProgressSnapshot());
                  }}
                >
                  <span>{plan.sprintTitle}</span>
                  <strong>{plan.teamName}</strong>
                  <small>{plan.memberEmails?.length ?? 0} accounts</small>
                </button>
              ))}
            </div>
          ) : null}
          <button className="btn btn-primary" type="button" onClick={() => onNavigate("support")}>
            Open Team Planner
          </button>
        </article>

        <article className="account-card account-card-wide account-avatar-studio-card">
          <div>
            <p className="nav-overline">Character Studio</p>
            <h3>{avatar.title}</h3>
            <p>{avatar.name} is set as a {avatarMasteryTier.label} {avatarProfession.label} for {avatarCategory.label}, specializing in {avatarSpecialization.label} with the {avatarLoadout.label} loadout.</p>
            <div className="account-avatar-signal-row">
              <span>{avatarWorkContext.label}</span>
              <span>{avatarSecondaryCategory.label}</span>
              <span>{avatarPronouns}</span>
            </div>
          </div>
          <button className="btn btn-primary" type="button" onClick={() => onNavigate("account/avatar")}>
            Open Avatar Creator
          </button>
        </article>

        <article className="account-card account-card-wide">
          <h3>Data & Privacy</h3>
          <p>Self-service data tools are being expanded. Until then, every privacy action has a working support path.</p>
          <div className="account-dashboard-actions">
            <button
              type="button"
              className="btn btn-light"
              disabled={Boolean(supportActionKey)}
              onClick={() =>
                submitAccountSupportRequest({
                  actionKey: "export",
                  laneId: "general",
                  subject: "Sip Studies data export request",
                  message: `Email: ${supportEmail}\nRequest: Please export my Sip Studies account data.`
                })
              }
            >
              {supportActionKey === "export" ? "Saving Export Request" : "Request Data Export"}
            </button>
            <button
              type="button"
              className="btn btn-light"
              disabled={Boolean(supportActionKey)}
              onClick={() =>
                submitAccountSupportRequest({
                  actionKey: "delete",
                  laneId: "general",
                  subject: "Sip Studies data deletion request",
                  message: `Email: ${supportEmail}\nRequest: Please start the account data deletion workflow.`
                })
              }
            >
              {supportActionKey === "delete" ? "Saving Deletion Request" : "Request Data Deletion"}
            </button>
          </div>
          {supportActionNotice ? <p className="hint" role="status" aria-live="polite">{supportActionNotice}</p> : null}
        </article>
      </div>
    </section>
  );
}
