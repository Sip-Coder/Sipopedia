import type { LearningQueueItem } from "./learningQueue";
import type { CohortActivityCenter, CohortActivitySnapshot } from "./cohortActivity";
import type { OfficeHoursBooking, OfficeHoursFocus } from "./officeHours";
import { officeHoursFocusOptions } from "./officeHours";
import type { PracticalReviewSnapshot } from "./practicalReview";
import type { SupportRequestRecord, SupportRequestUrgency } from "./supportRequests";
import type { TeamTrainingSnapshot } from "./teamPlanner";

export type LearnerReminderLane = "Learn" | "Taste" | "Connect" | "Support";

export type LearnerReminderItem = {
  id: string;
  lane: LearnerReminderLane;
  priority: "High" | "Medium" | "Low";
  title: string;
  detail: string;
  route: string;
  source: string;
  dueAt: string;
  dueLabel: string;
  actionLabel: string;
};

export type LearnerReminderCenter = {
  items: LearnerReminderItem[];
  overdueCount: number;
  todayCount: number;
  highPriorityCount: number;
  nextItem: LearnerReminderItem | null;
};

type LearnerReminderInput = {
  learningQueue: LearningQueueItem[];
  cohortActivity: CohortActivityCenter;
  practicalReview: PracticalReviewSnapshot;
  teamTraining: TeamTrainingSnapshot;
  officeHoursBookings: OfficeHoursBooking[];
  supportRequests: SupportRequestRecord[];
};

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function parseDate(value: string): Date | null {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function startOfDay(value: Date): Date {
  const next = new Date(value);
  next.setHours(0, 0, 0, 0);
  return next;
}

function priorityRank(priority: LearnerReminderItem["priority"]): number {
  if (priority === "High") return 3;
  if (priority === "Medium") return 2;
  return 1;
}

function urgencyPriority(urgency: SupportRequestUrgency): LearnerReminderItem["priority"] {
  if (urgency === "urgent") return "High";
  if (urgency === "soon") return "Medium";
  return "Low";
}

function focusLabel(focus: OfficeHoursFocus): string {
  return officeHoursFocusOptions.find((option) => option.id === focus)?.label ?? "Office Hours";
}

function dueLabel(dueAt: string, now = new Date()): string {
  const due = parseDate(dueAt);
  if (!due) return "No due date";
  const dueDay = startOfDay(due);
  const today = startOfDay(now);
  const deltaDays = Math.round((dueDay.getTime() - today.getTime()) / 86_400_000);
  const timeLabel = due.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  if (deltaDays < 0) return `Overdue by ${Math.abs(deltaDays)}d`;
  if (deltaDays === 0) return `Today ${timeLabel}`;
  if (deltaDays === 1) return `Tomorrow ${timeLabel}`;
  return `${due.toLocaleDateString()} ${timeLabel}`;
}

function dateStamp(value: Date): string {
  const year = String(value.getFullYear());
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  const hour = String(value.getHours()).padStart(2, "0");
  const minute = String(value.getMinutes()).padStart(2, "0");
  return `${year}${month}${day}T${hour}${minute}00`;
}

function escapeCalendarText(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function safeFileSlug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 64) || "learner-reminders";
}

function downloadTextFile(filename: string, content: string, type: string): void {
  if (typeof document === "undefined") return;
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function queueDueDate(priority: LearningQueueItem["priority"], index: number, now: Date): Date {
  if (priority === "High") return addDays(now, Math.min(index + 1, 3));
  if (priority === "Medium") return addDays(now, index + 4);
  return addDays(now, index + 8);
}

function cohortDueDate(snapshot: CohortActivitySnapshot, now: Date): Date {
  const eventDate = parseDate(snapshot.nextEventDate ?? "");
  if (eventDate) return eventDate;
  return parseDate(snapshot.capturedAt) ?? addDays(now, 2);
}

function reminderItem(item: Omit<LearnerReminderItem, "dueLabel">, now: Date): LearnerReminderItem {
  return {
    ...item,
    dueLabel: dueLabel(item.dueAt, now)
  };
}

export function buildLearnerReminderCenter(input: LearnerReminderInput, now = new Date()): LearnerReminderCenter {
  const reminders: LearnerReminderItem[] = [];

  input.learningQueue.slice(0, 6).forEach((item, index) => {
    const dueAt = queueDueDate(item.priority, index, now).toISOString();
    reminders.push(reminderItem({
      id: `queue-${item.id}`,
      lane: item.lane,
      priority: item.priority,
      title: item.title,
      detail: item.detail,
      route: item.route,
      source: item.source,
      dueAt,
      actionLabel: "Open action"
    }, now));
  });

  input.officeHoursBookings.slice(0, 4).forEach((booking) => {
    const due = parseDate(`${booking.preferredDate}T${booking.preferredTime || "10:00"}:00`) ?? parseDate(booking.createdAt) ?? now;
    reminders.push(reminderItem({
      id: `office-${booking.id}`,
      lane: "Support",
      priority: urgencyPriority(booking.urgency),
      title: `Office hours: ${focusLabel(booking.focus)}`,
      detail: booking.goals || "Prepare the review agenda and artifacts.",
      route: "support",
      source: "Support Office Hours",
      dueAt: due.toISOString(),
      actionLabel: "Open support"
    }, now));
  });

  input.supportRequests
    .filter((request) => request.status !== "closed")
    .slice(0, 4)
    .forEach((request) => {
      const base = parseDate(request.createdAt) ?? now;
      const due = addDays(base, request.urgency === "urgent" ? 0 : request.urgency === "soon" ? 2 : 5);
      reminders.push(reminderItem({
        id: `support-${request.id}`,
        lane: "Support",
        priority: urgencyPriority(request.urgency),
        title: `Follow up: ${request.subject}`,
        detail: `${request.status.replace("_", " ")} request from ${request.contactEmail || "learner"}.`,
        route: request.sourceRoute.replace(/^#/, "") || "support",
        source: "Support request",
        dueAt: due.toISOString(),
        actionLabel: "Review request"
      }, now));
    });

  const teamPlan = input.teamTraining.plan;
  if (teamPlan) {
    teamPlan.assignments
      .filter((assignment) => !assignment.completed)
      .slice(0, 4)
      .forEach((assignment) => {
        const due = parseDate(`${assignment.due || teamPlan.startDate || ""}T17:00:00`) ?? addDays(now, assignment.week * 7);
        reminders.push(reminderItem({
          id: `team-${teamPlan.id}-${assignment.week}`,
          lane: "Connect",
          priority: due.getTime() < now.getTime() ? "High" : "Medium",
          title: assignment.title,
          detail: `${assignment.owner}: ${assignment.outcome}`,
          route: assignment.route || "support",
          source: teamPlan.teamName,
          dueAt: due.toISOString(),
          actionLabel: "Open route"
        }, now));
      });
  }

  input.cohortActivity.snapshots.slice(0, 3).forEach((snapshot) => {
    const due = cohortDueDate(snapshot, now);
    reminders.push(reminderItem({
      id: `cohort-${snapshot.groupId}`,
      lane: "Connect",
      priority: due.getTime() < now.getTime() || snapshot.reminderCount > 0 ? "High" : "Medium",
      title: `Cohort follow-up: ${snapshot.groupName}`,
      detail: `${snapshot.memberCardCount} cards, ${snapshot.threadCount} threads, ${snapshot.eventCount} events. ${snapshot.latestPrompt ?? "Refresh the host prompt before the next meetup."}`,
      route: snapshot.dashboardRoute,
      source: "Tasting Groups cohort activity",
      dueAt: due.toISOString(),
      actionLabel: "Open group"
    }, now));
  });

  if (input.practicalReview.readyCount > 0) {
    reminders.push(reminderItem({
      id: "practical-review-packet",
      lane: "Support",
      priority: input.practicalReview.needsCoachingCount > 0 ? "High" : "Medium",
      title: "Send practical review packet",
      detail: `${input.practicalReview.readyCount} artifacts ready, ${input.practicalReview.needsCoachingCount} need coaching.`,
      route: "account",
      source: "Instructor Review Queue",
      dueAt: addDays(now, input.practicalReview.needsCoachingCount > 0 ? 1 : 3).toISOString(),
      actionLabel: "Open dashboard"
    }, now));
  }

  const items = reminders
    .sort((left, right) => {
      const leftTime = parseDate(left.dueAt)?.getTime() ?? Number.POSITIVE_INFINITY;
      const rightTime = parseDate(right.dueAt)?.getTime() ?? Number.POSITIVE_INFINITY;
      return leftTime - rightTime || priorityRank(right.priority) - priorityRank(left.priority) || left.title.localeCompare(right.title);
    })
    .slice(0, 12);

  const today = startOfDay(now).getTime();
  const tomorrow = addDays(startOfDay(now), 1).getTime();
  return {
    items,
    overdueCount: items.filter((item) => (parseDate(item.dueAt)?.getTime() ?? Number.POSITIVE_INFINITY) < today).length,
    todayCount: items.filter((item) => {
      const due = parseDate(item.dueAt)?.getTime() ?? Number.POSITIVE_INFINITY;
      return due >= today && due < tomorrow;
    }).length,
    highPriorityCount: items.filter((item) => item.priority === "High").length,
    nextItem: items[0] ?? null
  };
}

export function buildLearnerReminderDigest(center: LearnerReminderCenter): string {
  return [
    "Sip Studies Learner Reminder Digest",
    "",
    `Open reminders: ${center.items.length}`,
    `High priority: ${center.highPriorityCount}`,
    `Due today: ${center.todayCount}`,
    `Overdue: ${center.overdueCount}`,
    "",
    "Reminder queue",
    ...center.items.flatMap((item, index) => [
      "",
      `${index + 1}. ${item.title}`,
      `Lane: ${item.lane}`,
      `Priority: ${item.priority}`,
      `Due: ${item.dueLabel}`,
      `Source: ${item.source}`,
      `Route: ${item.route}`,
      `Detail: ${item.detail}`
    ])
  ].join("\n");
}

export function buildLearnerReminderCalendar(center: LearnerReminderCenter): string {
  const events = center.items.flatMap((item) => {
    const due = parseDate(item.dueAt);
    if (!due) return [];
    const end = new Date(due);
    end.setMinutes(end.getMinutes() + 30);
    return [
      "BEGIN:VEVENT",
      `UID:${escapeCalendarText(item.id)}@sipstudies-reminders`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z")}`,
      `DTSTART:${dateStamp(due)}`,
      `DTEND:${dateStamp(end)}`,
      `SUMMARY:${escapeCalendarText(item.title)}`,
      `DESCRIPTION:${escapeCalendarText(`${item.detail}\nRoute: ${item.route}\nSource: ${item.source}`)}`,
      "BEGIN:VALARM",
      "TRIGGER:-PT30M",
      "ACTION:DISPLAY",
      `DESCRIPTION:${escapeCalendarText(item.title)}`,
      "END:VALARM",
      "END:VEVENT"
    ];
  });

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sip Studies//Learner Reminders//EN",
    "CALSCALE:GREGORIAN",
    ...events,
    "END:VCALENDAR"
  ].join("\r\n");
}

export function downloadLearnerReminderDigest(center: LearnerReminderCenter): void {
  downloadTextFile("sip-studies-learner-reminders.md", buildLearnerReminderDigest(center), "text/markdown;charset=utf-8");
}

export function downloadLearnerReminderCalendar(center: LearnerReminderCenter): void {
  const label = center.nextItem ? safeFileSlug(center.nextItem.title) : "learner-reminders";
  downloadTextFile(`sip-studies-${label}-calendar.ics`, buildLearnerReminderCalendar(center), "text/calendar;charset=utf-8");
}
