import { supabase } from "./supabase";

export const SUPPORT_REQUEST_STORAGE_KEY = "sipstudies:support-requests:v1";
export const SUPPORT_REQUEST_EVENT = "sipstudies:support-request-created";
export const SUPPORT_REQUEST_COOLDOWN_KEY = "sipstudies:support-request-last-submit:v1";

export type SupportRequestLane = "enrollment" | "billing" | "study" | "team" | "general";
export type SupportRequestUrgency = "normal" | "soon" | "urgent";

export type SupportRequestDraft = {
  laneId: SupportRequestLane;
  contactName: string;
  contactEmail: string;
  teamName: string;
  teamSize: number | null;
  planInterest: string;
  urgency: SupportRequestUrgency;
  subject: string;
  message: string;
  sourceRoute: string;
};

export type SupportRequestRecord = SupportRequestDraft & {
  id: string;
  status: "new" | "triaged" | "in_progress" | "closed";
  createdAt: string;
  updatedAt: string;
  cloudBacked?: boolean;
};

export type SupportRequestStatus = SupportRequestRecord["status"];

type CloudSupportRequestRow = {
  id: string;
  lane_id: SupportRequestLane;
  contact_name: string;
  contact_email: string;
  team_name: string;
  team_size: number | null;
  plan_interest: string;
  urgency: SupportRequestUrgency;
  subject: string;
  message: string;
  source_route: string;
  status: "new" | "triaged" | "in_progress" | "closed";
  created_at: string;
  updated_at: string;
};

const SUPPORT_REQUEST_COLUMNS =
  "id,lane_id,contact_name,contact_email,team_name,team_size,plan_interest,urgency,subject,message,source_route,status,created_at,updated_at";
const LOCAL_SUPPORT_REQUEST_COOLDOWN_MS = 15_000;

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

function clampText(value: string, maxLength: number): string {
  const trimmed = value.replace(/\s+/g, " ").trim();
  return trimmed.length <= maxLength ? trimmed : trimmed.slice(0, maxLength);
}

function localId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `support-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeLane(value: string): SupportRequestLane {
  return value === "enrollment" || value === "billing" || value === "study" || value === "team" ? value : "general";
}

function normalizeUrgency(value: string): SupportRequestUrgency {
  return value === "soon" || value === "urgent" ? value : "normal";
}

function normalizeLocalSupportRequest(value: unknown): SupportRequestRecord | null {
  const row = asRecord(value);
  if (!row) return null;
  const status = asText(row.status);
  return {
    id: asText(row.id) || localId(),
    laneId: normalizeLane(asText(row.laneId)),
    contactName: asText(row.contactName),
    contactEmail: asText(row.contactEmail),
    teamName: asText(row.teamName),
    teamSize: typeof row.teamSize === "number" ? row.teamSize : null,
    planInterest: asText(row.planInterest),
    urgency: normalizeUrgency(asText(row.urgency)),
    subject: asText(row.subject),
    message: asText(row.message),
    sourceRoute: asText(row.sourceRoute) || "support",
    status: status === "triaged" || status === "in_progress" || status === "closed" ? status : "new",
    createdAt: asText(row.createdAt) || new Date().toISOString(),
    updatedAt: asText(row.updatedAt) || new Date().toISOString(),
    cloudBacked: row.cloudBacked === true
  };
}

function mapCloudSupportRequest(row: CloudSupportRequestRow): SupportRequestRecord {
  return {
    id: row.id,
    laneId: row.lane_id,
    contactName: row.contact_name,
    contactEmail: row.contact_email,
    teamName: row.team_name,
    teamSize: row.team_size,
    planInterest: row.plan_interest,
    urgency: row.urgency,
    subject: row.subject,
    message: row.message,
    sourceRoute: row.source_route,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    cloudBacked: true
  };
}

function supportRequestPayload(draft: SupportRequestDraft, userId: string | null) {
  return {
    p_user_id: userId,
    p_lane_id: draft.laneId,
    p_contact_name: clampText(draft.contactName, 120),
    p_contact_email: clampText(draft.contactEmail, 254).toLowerCase(),
    p_team_name: clampText(draft.teamName, 160),
    p_team_size: draft.teamSize,
    p_plan_interest: clampText(draft.planInterest, 80),
    p_urgency: draft.urgency,
    p_subject: clampText(draft.subject, 160),
    p_message: clampText(draft.message, 2000),
    p_source_route: clampText(draft.sourceRoute || "support", 160)
  };
}

function readLastSupportSubmitAt(): number {
  if (typeof window === "undefined") return 0;
  const value = Number(window.localStorage.getItem(SUPPORT_REQUEST_COOLDOWN_KEY));
  return Number.isFinite(value) ? value : 0;
}

export function getSupportRequestCooldownSeconds(): number {
  const remaining = LOCAL_SUPPORT_REQUEST_COOLDOWN_MS - (Date.now() - readLastSupportSubmitAt());
  return remaining > 0 ? Math.ceil(remaining / 1000) : 0;
}

export function markSupportRequestSubmitted(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SUPPORT_REQUEST_COOLDOWN_KEY, String(Date.now()));
}

export function isSupportRequestRateLimitError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error ?? "");
  return message.includes("before submitting another support request") || message.includes("Too many support requests");
}

export function readLocalSupportRequests(): SupportRequestRecord[] {
  if (typeof window === "undefined") return [];
  const parsed = safeJson(window.localStorage.getItem(SUPPORT_REQUEST_STORAGE_KEY));
  return Array.isArray(parsed)
    ? parsed.map(normalizeLocalSupportRequest).filter((record): record is SupportRequestRecord => Boolean(record))
    : [];
}

export function writeLocalSupportRequests(records: SupportRequestRecord[]): SupportRequestRecord[] {
  if (typeof window === "undefined") return [];
  window.localStorage.setItem(SUPPORT_REQUEST_STORAGE_KEY, JSON.stringify(records.slice(0, 20)));
  window.dispatchEvent(new CustomEvent(SUPPORT_REQUEST_EVENT, { detail: records }));
  return records;
}

export function saveLocalSupportRequest(draft: SupportRequestDraft, messageSuffix = ""): SupportRequestRecord {
  const now = new Date().toISOString();
  const record: SupportRequestRecord = {
    ...draft,
    id: localId(),
    status: "new",
    createdAt: now,
    updatedAt: now,
    message: messageSuffix ? `${draft.message}\n\n${messageSuffix}` : draft.message
  };
  writeLocalSupportRequests([record, ...readLocalSupportRequests()]);
  return record;
}

export async function createCloudSupportRequest(draft: SupportRequestDraft, userId: string | null): Promise<SupportRequestRecord> {
  if (!supabase) throw new Error("Supabase is not configured.");
  const cooldownSeconds = getSupportRequestCooldownSeconds();
  if (cooldownSeconds > 0) throw new Error(`Wait ${cooldownSeconds} seconds before submitting another support request.`);

  const { data, error } = await supabase.rpc("create_support_request", supportRequestPayload(draft, userId));

  if (error) throw new Error(error.message);
  markSupportRequestSubmitted();
  return mapCloudSupportRequest(data as CloudSupportRequestRow);
}

export async function listCloudSupportRequests(): Promise<SupportRequestRecord[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("support_requests")
    .select(SUPPORT_REQUEST_COLUMNS)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) throw new Error(error.message);
  return ((data ?? []) as CloudSupportRequestRow[]).map(mapCloudSupportRequest);
}

export async function updateCloudSupportRequestStatus(id: string, status: SupportRequestStatus): Promise<SupportRequestRecord> {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase
    .from("support_requests")
    .update({ status })
    .eq("id", id)
    .select(SUPPORT_REQUEST_COLUMNS)
    .single();

  if (error) throw new Error(error.message);
  return mapCloudSupportRequest(data as CloudSupportRequestRow);
}
