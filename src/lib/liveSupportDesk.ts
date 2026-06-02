import type { SupportRequestDraft, SupportRequestLane, SupportRequestUrgency } from "./supportRequests";

export type LiveSupportChannel = "chat" | "callback" | "email";

export type LiveSupportHandoffInput = {
  channel: LiveSupportChannel;
  laneId: SupportRequestLane;
  laneLabel: string;
  contactName: string;
  contactEmail: string;
  phone: string;
  availability: string;
  urgency: SupportRequestUrgency;
  issueSummary: string;
  transcript: string;
  teamName: string;
  teamSize: number | null;
  planInterest: string;
  sourceRoute: string;
  responseTarget: string;
};

export type LiveSupportReadiness = {
  score: number;
  missing: string[];
  summary: string;
};

export const liveSupportChannelOptions: Array<{ value: LiveSupportChannel; label: string; detail: string }> = [
  { value: "chat", label: "Chat", detail: "Best for access, navigation, and quick study triage." },
  { value: "callback", label: "Callback", detail: "Best for teams, billing, and practical-review handoffs." },
  { value: "email", label: "Email", detail: "Best for detailed packets, attachments, and slower follow-up." }
];

function cleanText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function channelLabel(channel: LiveSupportChannel): string {
  return liveSupportChannelOptions.find((option) => option.value === channel)?.label ?? "Support";
}

export function liveSupportReadiness(input: LiveSupportHandoffInput): LiveSupportReadiness {
  const missing = [
    input.contactEmail.trim() && input.contactEmail.includes("@") ? "" : "valid contact email",
    input.issueSummary.trim() ? "" : "issue summary",
    input.transcript.trim() ? "" : "chat notes or transcript",
    input.channel === "callback" && !input.phone.trim() ? "callback phone" : "",
    input.channel === "callback" && !input.availability.trim() ? "callback availability" : ""
  ].filter(Boolean);
  const total = input.channel === "callback" ? 5 : 3;
  const score = Math.round(((total - missing.length) / total) * 100);
  return {
    score,
    missing,
    summary: missing.length ? `Missing: ${missing.join(", ")}.` : "Ready to save as a support handoff."
  };
}

export function buildLiveSupportHandoff(input: LiveSupportHandoffInput): string {
  const readiness = liveSupportReadiness(input);
  return [
    `# Sip Studies ${channelLabel(input.channel)} Handoff`,
    "",
    `Generated: ${new Date().toLocaleString()}`,
    `Lane: ${input.laneLabel}`,
    `Channel: ${channelLabel(input.channel)}`,
    `Urgency: ${input.urgency}`,
    `Response target: ${input.responseTarget}`,
    `Readiness: ${readiness.score}%`,
    "",
    "## Contact",
    `Name: ${input.contactName || "Not provided"}`,
    `Email: ${input.contactEmail || "Not provided"}`,
    `Phone: ${input.phone || "Not provided"}`,
    `Availability: ${input.availability || "Not provided"}`,
    "",
    "## Account / Team Context",
    `Team: ${input.teamName || "Not provided"}`,
    `Team size: ${input.teamSize ?? "Not provided"}`,
    `Plan interest: ${input.planInterest || "Not sure"}`,
    `Source route: ${input.sourceRoute || "support"}`,
    "",
    "## Issue Summary",
    cleanText(input.issueSummary) || "No issue summary provided.",
    "",
    "## Chat / Call Notes",
    input.transcript.trim() || "No transcript provided.",
    "",
    "## Intake Checklist",
    "- Confirm the learner can access the destination route.",
    "- Confirm account email, plan interest, and support lane.",
    "- Convert any study issue into a quiz, Academy, Sipopedia, tasting, or office-hours next action.",
    "- If this is a team request, identify manager, staff count, training window, and beverage focus.",
    "- If this requires a staffed expert, mark that this is a handoff packet, not an instant staffed reply.",
    "",
    "## Readiness",
    readiness.summary
  ].join("\n");
}

export function buildLiveSupportRequestDraft(input: LiveSupportHandoffInput): SupportRequestDraft {
  return {
    laneId: input.laneId,
    contactName: input.contactName,
    contactEmail: input.contactEmail,
    teamName: input.teamName,
    teamSize: input.teamSize,
    planInterest: input.planInterest,
    urgency: input.urgency,
    subject: `${channelLabel(input.channel)} handoff: ${cleanText(input.issueSummary).slice(0, 96) || input.laneLabel}`,
    message: buildLiveSupportHandoff(input),
    sourceRoute: input.sourceRoute || "support#live-handoff"
  };
}

export function downloadLiveSupportHandoff(input: LiveSupportHandoffInput): void {
  if (typeof document === "undefined") return;
  const blob = new Blob([buildLiveSupportHandoff(input)], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `sip-studies-${input.channel}-support-handoff.md`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
