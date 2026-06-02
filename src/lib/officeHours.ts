import type { SupportRequestDraft, SupportRequestUrgency } from "./supportRequests";

export const OFFICE_HOURS_BOOKING_STORAGE_KEY = "sipstudies:office-hours-bookings:v1";
export const OFFICE_HOURS_BOOKING_EVENT = "sipstudies:office-hours-booking-created";

export type OfficeHoursFocus = "practical-review" | "credential-prep" | "tasting-feedback" | "team-training";

export type OfficeHoursBookingDraft = {
  focus: OfficeHoursFocus;
  contactName: string;
  contactEmail: string;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  urgency: SupportRequestUrgency;
  goals: string;
  artifacts: string[];
};

export type OfficeHoursBooking = OfficeHoursBookingDraft & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export const officeHoursFocusOptions: Array<{
  id: OfficeHoursFocus;
  label: string;
  outcome: string;
  lane: SupportRequestDraft["laneId"];
  route: string;
}> = [
  {
    id: "practical-review",
    label: "Practical Review",
    outcome: "Roleplay, cocktail technique, or category-arc feedback with one next coached rep.",
    lane: "study",
    route: "app/service-roleplay"
  },
  {
    id: "credential-prep",
    label: "Credential Prep",
    outcome: "A focused exam-prep loop with weak-topic repair and official-provider handoffs.",
    lane: "study",
    route: "study-paths"
  },
  {
    id: "tasting-feedback",
    label: "Tasting Feedback",
    outcome: "Blind-note calibration, vocabulary repair, and a next-bottle practice plan.",
    lane: "study",
    route: "app/tasting-journal"
  },
  {
    id: "team-training",
    label: "Team Training",
    outcome: "Manager-ready pre-shift coaching priorities and owner assignments.",
    lane: "team",
    route: "support"
  }
];

export const officeHoursArtifactOptions = [
  "Practical review packet",
  "Weak quiz topic",
  "Tasting note",
  "Credential target",
  "Team assignment plan",
  "Checkout or access issue"
];

function safeJson(raw: string | null): unknown {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
}

function asText(value: unknown): string {
  return typeof value === "string" ? value : typeof value === "number" ? String(value) : "";
}

function localId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `office-hours-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeFocus(value: string): OfficeHoursFocus {
  return value === "credential-prep" || value === "tasting-feedback" || value === "team-training" ? value : "practical-review";
}

function normalizeUrgency(value: string): SupportRequestUrgency {
  return value === "soon" || value === "urgent" ? value : "normal";
}

function normalizeArtifacts(value: unknown): string[] {
  return Array.isArray(value)
    ? value.map((item) => asText(item).trim()).filter(Boolean).slice(0, 8)
    : [];
}

function normalizeBooking(value: unknown): OfficeHoursBooking | null {
  const row = asRecord(value);
  if (!row) return null;
  return {
    id: asText(row.id) || localId(),
    focus: normalizeFocus(asText(row.focus)),
    contactName: asText(row.contactName),
    contactEmail: asText(row.contactEmail),
    preferredDate: asText(row.preferredDate),
    preferredTime: asText(row.preferredTime) || "10:00",
    timezone: asText(row.timezone) || "Local time",
    urgency: normalizeUrgency(asText(row.urgency)),
    goals: asText(row.goals),
    artifacts: normalizeArtifacts(row.artifacts),
    createdAt: asText(row.createdAt) || new Date().toISOString(),
    updatedAt: asText(row.updatedAt) || new Date().toISOString()
  };
}

function selectedFocus(booking: OfficeHoursBooking | OfficeHoursBookingDraft) {
  return officeHoursFocusOptions.find((option) => option.id === booking.focus) ?? officeHoursFocusOptions[0];
}

function escapeCalendarText(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function compactDateTime(date: string, time: string): string {
  const [year = "1970", month = "01", day = "01"] = date.split("-");
  const [hour = "10", minute = "00"] = time.split(":");
  return `${year}${month}${day}T${hour.padStart(2, "0")}${minute.padStart(2, "0")}00`;
}

function calendarEndDateTime(date: string, time: string): string {
  const parsed = new Date(`${date}T${time || "10:00"}:00`);
  if (Number.isNaN(parsed.getTime())) return compactDateTime(date, time);
  parsed.setMinutes(parsed.getMinutes() + 45);
  const year = String(parsed.getFullYear());
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  const hour = String(parsed.getHours()).padStart(2, "0");
  const minute = String(parsed.getMinutes()).padStart(2, "0");
  return `${year}${month}${day}T${hour}${minute}00`;
}

function calendarTimestamp(value = new Date()): string {
  return value.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function safeFileSlug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 64) || "office-hours";
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

export function readOfficeHoursBookings(): OfficeHoursBooking[] {
  if (typeof window === "undefined") return [];
  const parsed = safeJson(window.localStorage.getItem(OFFICE_HOURS_BOOKING_STORAGE_KEY));
  return Array.isArray(parsed)
    ? parsed.map(normalizeBooking).filter((booking): booking is OfficeHoursBooking => Boolean(booking))
    : [];
}

export function writeOfficeHoursBookings(bookings: OfficeHoursBooking[]): OfficeHoursBooking[] {
  if (typeof window === "undefined") return [];
  const next = bookings.slice(0, 12);
  window.localStorage.setItem(OFFICE_HOURS_BOOKING_STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(OFFICE_HOURS_BOOKING_EVENT, { detail: next }));
  return next;
}

export function saveOfficeHoursBooking(draft: OfficeHoursBookingDraft): OfficeHoursBooking {
  const now = new Date().toISOString();
  const booking: OfficeHoursBooking = {
    ...draft,
    id: localId(),
    contactName: draft.contactName.trim(),
    contactEmail: draft.contactEmail.trim().toLowerCase(),
    goals: draft.goals.trim(),
    artifacts: draft.artifacts.map((item) => item.trim()).filter(Boolean),
    createdAt: now,
    updatedAt: now
  };
  writeOfficeHoursBookings([booking, ...readOfficeHoursBookings()]);
  return booking;
}

export function buildOfficeHoursAgenda(booking: OfficeHoursBooking, supportSignals = ""): string {
  const focus = selectedFocus(booking);
  return [
    "Sip Studies Office Hours Agenda",
    "",
    `Focus: ${focus.label}`,
    `Preferred time: ${booking.preferredDate || "Not selected"} ${booking.preferredTime || ""} ${booking.timezone}`.trim(),
    `Urgency: ${booking.urgency}`,
    `Contact: ${booking.contactName || "Learner"} <${booking.contactEmail}>`,
    "",
    "Session outcome",
    focus.outcome,
    "",
    "Learner goals",
    booking.goals || "Needs review.",
    "",
    "Artifacts to inspect",
    ...(booking.artifacts.length ? booking.artifacts.map((artifact) => `- ${artifact}`) : ["- No artifact selected"]),
    supportSignals ? "" : null,
    supportSignals || null,
    "",
    "Review rubric",
    "- Identify the one correction that changes learner behavior fastest.",
    "- Assign one module, one drill, and one measurable retake.",
    "- Mark the follow-up as floor-ready, exam-drill-ready, or needs another coached rep."
  ].filter((line): line is string => line !== null).join("\n");
}

export function buildOfficeHoursCalendarHold(booking: OfficeHoursBooking): string {
  const focus = selectedFocus(booking);
  const description = buildOfficeHoursAgenda(booking);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sip Studies//Office Hours//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${escapeCalendarText(booking.id)}@sipstudies-office-hours`,
    `DTSTAMP:${calendarTimestamp()}`,
    `DTSTART:${compactDateTime(booking.preferredDate, booking.preferredTime)}`,
    `DTEND:${calendarEndDateTime(booking.preferredDate, booking.preferredTime)}`,
    `SUMMARY:${escapeCalendarText(`Sip Studies Office Hours: ${focus.label}`)}`,
    "LOCATION:Sip Studies support desk",
    `DESCRIPTION:${escapeCalendarText(description)}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeCalendarText(`Prepare agenda for ${focus.label}`)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");
}

export function downloadOfficeHoursAgenda(booking: OfficeHoursBooking, supportSignals = ""): void {
  const focus = selectedFocus(booking);
  downloadTextFile(
    `sip-studies-office-hours-${safeFileSlug(focus.label)}.md`,
    buildOfficeHoursAgenda(booking, supportSignals),
    "text/markdown;charset=utf-8"
  );
}

export function downloadOfficeHoursCalendarHold(booking: OfficeHoursBooking): void {
  const focus = selectedFocus(booking);
  downloadTextFile(
    `sip-studies-office-hours-${safeFileSlug(focus.label)}.ics`,
    buildOfficeHoursCalendarHold(booking),
    "text/calendar;charset=utf-8"
  );
}

export function buildOfficeHoursSupportDraft(booking: OfficeHoursBooking, supportSignals = ""): SupportRequestDraft {
  const focus = selectedFocus(booking);
  return {
    laneId: focus.lane,
    contactName: booking.contactName,
    contactEmail: booking.contactEmail,
    teamName: "",
    teamSize: null,
    planInterest: focus.label,
    urgency: booking.urgency,
    subject: `Office hours request - ${focus.label}`,
    message: buildOfficeHoursAgenda(booking, supportSignals),
    sourceRoute: "support#office-hours"
  };
}
