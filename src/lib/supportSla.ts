import type { SupportRequestLane, SupportRequestRecord, SupportRequestUrgency } from "./supportRequests";

export type SupportSlaTone = "ontrack" | "watch" | "overdue" | "closed";

export type SupportRequestSla = {
  targetHours: number;
  targetLabel: string;
  laneNote: string;
  dueAt: string;
  dueAtLabel: string;
  dueLabel: string;
  tone: SupportSlaTone;
  overdue: boolean;
  remainingHours: number;
};

export type SupportSlaSummary = {
  openCount: number;
  dueSoonCount: number;
  overdueCount: number;
  urgentCount: number;
  nextDueLabel: string;
};

export const supportResponseTargets: Record<SupportRequestUrgency, string> = {
  normal: "First reply target: 2 business days",
  soon: "First reply target: 1 business day",
  urgent: "Same-day access triage target"
};

const targetHoursByUrgency: Record<SupportRequestUrgency, number> = {
  normal: 48,
  soon: 24,
  urgent: 4
};

const laneNotes: Record<SupportRequestLane, string> = {
  enrollment: "Enrollment issues should confirm plan, destination route, and checkout recovery path.",
  billing: "Billing issues should confirm account email, plan state, and next account action.",
  study: "Study help should return one specific weak-topic route, drill, or review artifact.",
  team: "Team requests should identify owner, team size, training window, and first sprint decision.",
  general: "General requests should be triaged into a specific lane before follow-up."
};

function parseDate(value: string): Date {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

function formatDateTime(date: Date): string {
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

function formatRelativeHours(hours: number, overdue: boolean): string {
  const absolute = Math.abs(hours);
  if (absolute <= 0) return overdue ? "Due now" : "Due within 1h";
  if (absolute < 24) return overdue ? `${absolute}h overdue` : `${absolute}h left`;
  const days = Math.ceil(absolute / 24);
  return overdue ? `${days}d overdue` : `${days}d left`;
}

function priorityForTone(tone: SupportSlaTone): number {
  if (tone === "overdue") return 0;
  if (tone === "watch") return 1;
  if (tone === "ontrack") return 2;
  return 3;
}

export function supportRequestSla(request: SupportRequestRecord, now = new Date()): SupportRequestSla {
  const targetHours = targetHoursByUrgency[request.urgency] ?? targetHoursByUrgency.normal;
  const createdAt = parseDate(request.createdAt);
  const dueDate = new Date(createdAt.getTime() + targetHours * 60 * 60 * 1000);
  const remainingHours = Math.ceil((dueDate.getTime() - now.getTime()) / (60 * 60 * 1000));
  const overdue = request.status !== "closed" && remainingHours < 0;
  const tone: SupportSlaTone =
    request.status === "closed"
      ? "closed"
      : overdue
        ? "overdue"
        : remainingHours <= 6
          ? "watch"
          : "ontrack";

  return {
    targetHours,
    targetLabel: supportResponseTargets[request.urgency] ?? supportResponseTargets.normal,
    laneNote: laneNotes[request.laneId] ?? laneNotes.general,
    dueAt: dueDate.toISOString(),
    dueAtLabel: formatDateTime(dueDate),
    dueLabel: request.status === "closed" ? "Closed" : formatRelativeHours(remainingHours, overdue),
    tone,
    overdue,
    remainingHours
  };
}

export function supportSlaSummary(records: SupportRequestRecord[], now = new Date()): SupportSlaSummary {
  const openRecords = records.filter((record) => record.status !== "closed");
  const openSlas = openRecords.map((record) => supportRequestSla(record, now));
  const nextDue = openSlas
    .filter((sla) => sla.tone !== "closed")
    .sort((a, b) => priorityForTone(a.tone) - priorityForTone(b.tone) || new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime())[0];

  return {
    openCount: openRecords.length,
    dueSoonCount: openSlas.filter((sla) => sla.tone === "watch").length,
    overdueCount: openSlas.filter((sla) => sla.tone === "overdue").length,
    urgentCount: openRecords.filter((record) => record.urgency === "urgent").length,
    nextDueLabel: nextDue ? `${nextDue.dueLabel} (${nextDue.dueAtLabel})` : "No open SLA"
  };
}

export function buildSupportTriageDigest(records: SupportRequestRecord[], now = new Date()): string {
  const openRecords = records
    .filter((record) => record.status !== "closed")
    .sort((a, b) => {
      const aSla = supportRequestSla(a, now);
      const bSla = supportRequestSla(b, now);
      return (
        priorityForTone(aSla.tone) - priorityForTone(bSla.tone) ||
        new Date(aSla.dueAt).getTime() - new Date(bSla.dueAt).getTime()
      );
    });
  const summary = supportSlaSummary(records, now);

  return [
    "Sip Studies Support SLA Triage Digest",
    `Generated: ${now.toLocaleString()}`,
    "",
    `Open: ${summary.openCount}`,
    `Overdue: ${summary.overdueCount}`,
    `Due soon: ${summary.dueSoonCount}`,
    `Urgent: ${summary.urgentCount}`,
    `Next due: ${summary.nextDueLabel}`,
    "",
    "Open tickets",
    ...openRecords.flatMap((record) => {
      const sla = supportRequestSla(record, now);
      return [
        "",
        `## ${record.id.slice(0, 8)} - ${record.subject}`,
        `Status: ${record.status.replace("_", " ")}`,
        `Lane: ${record.laneId}`,
        `Urgency: ${record.urgency}`,
        `SLA: ${sla.dueLabel} / due ${sla.dueAtLabel}`,
        `Target: ${sla.targetLabel}`,
        `Contact: ${record.contactName || "No name"} <${record.contactEmail || "No email"}>`,
        `Team: ${record.teamName || "None"}${record.teamSize ? ` (${record.teamSize} learners)` : ""}`,
        `Plan: ${record.planInterest || "Not provided"}`,
        `Created: ${new Date(record.createdAt).toLocaleString()}`,
        `Triage note: ${sla.laneNote}`,
        "",
        record.message
      ];
    }),
    openRecords.length ? "" : "No open tickets.",
    "",
    "Operating checklist",
    "- Reply first to overdue urgent access or billing blockers.",
    "- Move every new ticket to triaged after owner, lane, and next action are clear.",
    "- Convert study-help tickets into one route, one drill, and one review artifact.",
    "- Convert team tickets into owner, roster, sprint, and first due date."
  ].join("\n");
}

export function downloadSupportTriageDigest(records: SupportRequestRecord[]): void {
  if (typeof document === "undefined") return;
  const body = buildSupportTriageDigest(records);
  const blob = new Blob([body], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `sip-studies-support-triage-${new Date().toISOString().slice(0, 10)}.md`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
