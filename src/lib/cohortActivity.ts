import type {
  GroupFocus,
  TastingGroup,
  TastingGroupEvent,
  TastingGroupEventReminder,
  TastingGroupMemberProfile
} from "./tastingGroups";
import type { TastingGroupDigestPost, TastingGroupPresenceSignal } from "./tastingGroupHandoffs";

export const COHORT_ACTIVITY_STORAGE_KEY = "sip-studies:cohort-activity:v1";
export const COHORT_ACTIVITY_EVENT = "sip-studies:cohort-activity-updated";

export type CohortActivitySnapshot = {
  id: string;
  groupId: string;
  groupName: string;
  focus: GroupFocus;
  city: string;
  cloudBacked: boolean;
  capturedAt: string;
  eventCount: number;
  nextEventTitle: string | null;
  nextEventDate: string | null;
  memberCardCount: number;
  threadCount: number;
  reminderCount: number;
  activePresenceCount: number;
  latestPrompt: string | null;
  dashboardRoute: string;
  recommendations: string[];
};

export type CohortActivityCenter = {
  snapshots: CohortActivitySnapshot[];
  latestSnapshot: CohortActivitySnapshot | null;
  nextEventSnapshot: CohortActivitySnapshot | null;
  activeGroupCount: number;
  totalEvents: number;
  totalThreads: number;
  totalReminders: number;
  totalPresence: number;
};

type CohortActivityInput = {
  group: TastingGroup;
  events: TastingGroupEvent[];
  memberProfiles: TastingGroupMemberProfile[];
  posts: TastingGroupDigestPost[];
  reminders: TastingGroupEventReminder[];
  presence: TastingGroupPresenceSignal[];
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

function cleanText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function formatDate(value: string | null): string {
  if (!value) return "No event date";
  const parsed = new Date(value.includes("T") ? value : `${value}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function parseDate(value: string | null): Date | null {
  if (!value) return null;
  const parsed = new Date(value.includes("T") ? value : `${value}T12:00:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function sortByTimeDesc(left: CohortActivitySnapshot, right: CohortActivitySnapshot): number {
  return new Date(right.capturedAt).getTime() - new Date(left.capturedAt).getTime();
}

function topLevelThreadPosts(posts: TastingGroupDigestPost[]): TastingGroupDigestPost[] {
  return posts
    .filter((post) => !post.parentPostId && post.moderationStatus !== "hidden")
    .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime());
}

function upcomingEventRows(events: TastingGroupEvent[]): TastingGroupEvent[] {
  return [...events].sort((left, right) => new Date(left.date).getTime() - new Date(right.date).getTime());
}

function snapshotFromRecord(value: unknown): CohortActivitySnapshot | null {
  const record = asObject(value);
  if (!record) return null;
  const groupId = typeof record.groupId === "string" ? record.groupId : "";
  const groupName = typeof record.groupName === "string" ? record.groupName : "";
  const capturedAt = typeof record.capturedAt === "string" ? record.capturedAt : "";
  if (!groupId || !groupName || !capturedAt) return null;
  return {
    id: typeof record.id === "string" ? record.id : `${groupId}-${capturedAt}`,
    groupId,
    groupName,
    focus: typeof record.focus === "string" ? (record.focus as GroupFocus) : "Wine",
    city: typeof record.city === "string" ? record.city : "",
    cloudBacked: record.cloudBacked === true,
    capturedAt,
    eventCount: Math.max(0, Number(record.eventCount) || 0),
    nextEventTitle: typeof record.nextEventTitle === "string" ? record.nextEventTitle : null,
    nextEventDate: typeof record.nextEventDate === "string" ? record.nextEventDate : null,
    memberCardCount: Math.max(0, Number(record.memberCardCount) || 0),
    threadCount: Math.max(0, Number(record.threadCount) || 0),
    reminderCount: Math.max(0, Number(record.reminderCount) || 0),
    activePresenceCount: Math.max(0, Number(record.activePresenceCount) || 0),
    latestPrompt: typeof record.latestPrompt === "string" ? record.latestPrompt : null,
    dashboardRoute: typeof record.dashboardRoute === "string" ? record.dashboardRoute : "app/tasting-groups",
    recommendations: Array.isArray(record.recommendations)
      ? record.recommendations.filter((item): item is string => typeof item === "string")
      : []
  };
}

export function buildCohortActivitySnapshot({
  group,
  events,
  memberProfiles,
  posts,
  reminders,
  presence
}: CohortActivityInput): CohortActivitySnapshot {
  const eventRows = upcomingEventRows(events);
  const threadRows = topLevelThreadPosts(posts);
  const nextEvent = eventRows[0] ?? null;
  const latestPrompt = threadRows[0] ? cleanText(threadRows[0].message).slice(0, 180) : null;
  const recommendations = [
    nextEvent
      ? `Confirm attendance and prep notes for ${nextEvent.title} on ${formatDate(nextEvent.date)}.`
      : "Publish the next meetup card with date, venue, capacity, and prep notes.",
    memberProfiles.length
      ? `Use ${memberProfiles.length} member cards to pair tasting goals with the next flight.`
      : "Ask members to add tasting goals, availability, and beverage focus.",
    threadRows.length
      ? `Turn the latest thread prompt into a pre-meetup tasting assignment.`
      : "Start one discussion prompt so the cohort has a visible study thread.",
    reminders.length
      ? `Review ${reminders.length} reminder holds before the next event.`
      : "Create reminder holds for host follow-up."
  ];

  const capturedAt = new Date().toISOString();
  return {
    id: `${group.id}-${capturedAt}`,
    groupId: group.id,
    groupName: group.name,
    focus: group.focus,
    city: group.city,
    cloudBacked: group.cloudBacked === true,
    capturedAt,
    eventCount: eventRows.length,
    nextEventTitle: nextEvent?.title ?? null,
    nextEventDate: nextEvent?.date ?? null,
    memberCardCount: memberProfiles.length,
    threadCount: threadRows.length,
    reminderCount: reminders.length,
    activePresenceCount: presence.length,
    latestPrompt,
    dashboardRoute: "app/tasting-groups",
    recommendations
  };
}

export function readCohortActivitySnapshots(): CohortActivitySnapshot[] {
  if (typeof window === "undefined") return [];
  const parsed = safeJson(window.localStorage.getItem(COHORT_ACTIVITY_STORAGE_KEY));
  const rows = Array.isArray(parsed) ? parsed : [];
  return rows
    .map(snapshotFromRecord)
    .filter((item): item is CohortActivitySnapshot => Boolean(item))
    .sort(sortByTimeDesc)
    .slice(0, 8);
}

export function buildCohortActivityCenter(snapshots = readCohortActivitySnapshots()): CohortActivityCenter {
  const sorted = [...snapshots].sort(sortByTimeDesc);
  const datedSnapshots = sorted
    .filter((snapshot) => parseDate(snapshot.nextEventDate))
    .sort((left, right) => {
      const leftTime = parseDate(left.nextEventDate)?.getTime() ?? Number.POSITIVE_INFINITY;
      const rightTime = parseDate(right.nextEventDate)?.getTime() ?? Number.POSITIVE_INFINITY;
      return leftTime - rightTime;
    });

  return {
    snapshots: sorted,
    latestSnapshot: sorted[0] ?? null,
    nextEventSnapshot: datedSnapshots[0] ?? null,
    activeGroupCount: new Set(sorted.map((snapshot) => snapshot.groupId)).size,
    totalEvents: sorted.reduce((sum, snapshot) => sum + snapshot.eventCount, 0),
    totalThreads: sorted.reduce((sum, snapshot) => sum + snapshot.threadCount, 0),
    totalReminders: sorted.reduce((sum, snapshot) => sum + snapshot.reminderCount, 0),
    totalPresence: sorted.reduce((sum, snapshot) => sum + snapshot.activePresenceCount, 0)
  };
}

export function saveCohortActivitySnapshot(input: CohortActivityInput): CohortActivitySnapshot {
  const snapshot = buildCohortActivitySnapshot(input);
  if (typeof window === "undefined") return snapshot;
  const existing = readCohortActivitySnapshots().filter((item) => item.groupId !== snapshot.groupId);
  const next = [snapshot, ...existing].sort(sortByTimeDesc).slice(0, 8);
  window.localStorage.setItem(COHORT_ACTIVITY_STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(COHORT_ACTIVITY_EVENT, { detail: snapshot }));
  return snapshot;
}

export function buildCohortActivityDashboardDigest(center: CohortActivityCenter): string {
  return [
    "# Sip Studies Cohort Activity Inbox",
    "",
    `Generated: ${new Date().toLocaleString()}`,
    `Groups: ${center.activeGroupCount}`,
    `Events: ${center.totalEvents}`,
    `Threads: ${center.totalThreads}`,
    `Reminder holds: ${center.totalReminders}`,
    "",
    "## Saved Cohorts",
    ...(center.snapshots.length
      ? center.snapshots.map((snapshot) => [
        `### ${snapshot.groupName}`,
        `Captured: ${new Date(snapshot.capturedAt).toLocaleString()}`,
        `Focus: ${snapshot.focus} / ${snapshot.city}`,
        `Cloud status: ${snapshot.cloudBacked ? "Cloud-backed" : "Preview/local"}`,
        `Next event: ${snapshot.nextEventTitle ?? "No meetup card"} (${formatDate(snapshot.nextEventDate)})`,
        `Signals: ${snapshot.memberCardCount} member cards / ${snapshot.threadCount} threads / ${snapshot.reminderCount} reminders / ${snapshot.activePresenceCount} active now`,
        snapshot.latestPrompt ? `Latest prompt: ${snapshot.latestPrompt}` : "Latest prompt: none",
        "Recommended follow-up:",
        ...snapshot.recommendations.map((item) => `- ${item}`)
      ].join("\n"))
      : ["No cohort activity has been sent to the dashboard yet."])
  ].join("\n\n");
}

export function downloadCohortActivityDashboardDigest(center: CohortActivityCenter): void {
  if (typeof document === "undefined") return;
  const blob = new Blob([buildCohortActivityDashboardDigest(center)], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "sip-studies-cohort-activity-inbox.md";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
