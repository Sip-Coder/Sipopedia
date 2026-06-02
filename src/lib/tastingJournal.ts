import { supabase } from "./supabase";

export type TastingNoteRecord = {
  id: string;
  user_id: string;
  beverage_type: string;
  title: string;
  producer: string;
  country: string;
  region: string;
  vintage: string;
  blind_mode: boolean;
  guessed_country: string;
  guessed_region: string;
  guessed_variety: string;
  confidence: string;
  score: number | null;
  latitude: number | null;
  longitude: number | null;
  summary: string;
  fields_json: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type TastingNoteUpsertInput = {
  beverage_type: string;
  title: string;
  producer: string;
  country: string;
  region: string;
  vintage: string;
  blind_mode: boolean;
  guessed_country: string;
  guessed_region: string;
  guessed_variety: string;
  confidence: string;
  score: number | null;
  latitude: number | null;
  longitude: number | null;
  summary: string;
  fields_json: Record<string, unknown>;
};

export const LOCAL_TASTING_NOTES_KEY = "sipstudies:tasting-notes:guest-notes:v2";
export const LEGACY_LOCAL_TASTING_NOTES_KEYS = ["sipstudies:tasting-journal:guest-notes:v1", "sipstudies:flavors:guest-notes:v1"] as const;
export const LOCAL_TASTING_NOTE_STORAGE_KEYS = [LOCAL_TASTING_NOTES_KEY, ...LEGACY_LOCAL_TASTING_NOTES_KEYS] as const;
export const LOCAL_TASTING_NOTES_EVENT = "sipstudies:tasting-notes-changed";

export type LocalTastingNoteSaveResult = "ok" | "trimmed" | "failed";

type LocalNoteCandidate = {
  id: string;
  item: unknown;
  order: number;
  sourceIndex: number;
  time: number;
};

function safeJson(raw: string | null): unknown {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function asLocalText(value: unknown): string {
  return typeof value === "string" ? value : typeof value === "number" || typeof value === "boolean" ? String(value) : "";
}

function localNoteId(item: unknown, fallback: string): string {
  if (!isPlainObject(item)) return fallback;
  const id = asLocalText(item.id).trim();
  return id || fallback;
}

function localNoteTime(item: unknown): number {
  if (!isPlainObject(item)) return 0;
  const updatedAt = Date.parse(asLocalText(item.updatedAt));
  if (Number.isFinite(updatedAt)) return updatedAt;
  const createdAt = Date.parse(asLocalText(item.createdAt));
  return Number.isFinite(createdAt) ? createdAt : 0;
}

function mergeLocalNoteObjects(existing: unknown, current: unknown): unknown {
  if (!isPlainObject(existing) || !isPlainObject(current)) return current;

  const existingDetails = isPlainObject(existing.details) ? existing.details : {};
  const currentDetails = isPlainObject(current.details) ? current.details : {};

  return {
    ...existing,
    ...current,
    details: {
      ...existingDetails,
      ...currentDetails
    }
  };
}

function collectLocalTastingNoteItems(): { items: unknown[]; hasLegacy: boolean } {
  if (typeof window === "undefined") return { items: [], hasLegacy: false };

  const byId = new Map<string, LocalNoteCandidate>();
  let order = 0;
  let hasLegacy = false;

  LOCAL_TASTING_NOTE_STORAGE_KEYS.forEach((key, sourceIndex) => {
    const parsed = safeJson(window.localStorage.getItem(key));
    if (!Array.isArray(parsed)) return;
    if (key !== LOCAL_TASTING_NOTES_KEY && parsed.length > 0) hasLegacy = true;

    parsed.forEach((item, index) => {
      const id = localNoteId(item, `${key}:${index}`);
      const candidate: LocalNoteCandidate = {
        id,
        item,
        order: order++,
        sourceIndex,
        time: localNoteTime(item)
      };
      const existing = byId.get(id);
      if (!existing || candidate.time > existing.time || (candidate.time === existing.time && candidate.sourceIndex < existing.sourceIndex)) {
        byId.set(id, candidate);
      }
    });
  });

  return {
    items: [...byId.values()]
      .sort((a, b) => b.time - a.time || a.order - b.order)
      .map((candidate) => candidate.item),
    hasLegacy
  };
}

function dispatchLocalTastingNotesChanged(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(LOCAL_TASTING_NOTES_EVENT));
}

export function readLocalTastingNoteItems(): unknown[] {
  const collected = collectLocalTastingNoteItems();
  if (typeof window !== "undefined" && collected.hasLegacy) {
    try {
      window.localStorage.setItem(LOCAL_TASTING_NOTES_KEY, JSON.stringify(collected.items));
    } catch {
      // Ignore migration failures; callers still receive the merged in-memory list.
    }
  }
  return collected.items;
}

export function writeLocalTastingNoteItems<T>(items: T[], stripItem?: (item: T) => T): LocalTastingNoteSaveResult {
  if (typeof window === "undefined") return "failed";

  const existingById = new Map<string, unknown>();
  collectLocalTastingNoteItems().items.forEach((item, index) => {
    existingById.set(localNoteId(item, `existing:${index}`), item);
  });

  const merged = items.map((item, index) => {
    const id = localNoteId(item, `current:${index}`);
    return mergeLocalNoteObjects(existingById.get(id), item) as T;
  });

  try {
    window.localStorage.setItem(LOCAL_TASTING_NOTES_KEY, JSON.stringify(merged));
    dispatchLocalTastingNotesChanged();
    return "ok";
  } catch {
    if (!stripItem) return "failed";
    try {
      const trimmed = merged.map(stripItem);
      window.localStorage.setItem(LOCAL_TASTING_NOTES_KEY, JSON.stringify(trimmed));
      dispatchLocalTastingNotesChanged();
      return "trimmed";
    } catch {
      return "failed";
    }
  }
}

async function requireCurrentUserId(): Promise<string> {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(mapTastingError(error.message));
  }

  const userId = data.user?.id;
  if (!userId) {
    throw new Error("Sign in is required for cloud tasting notes.");
  }

  return userId;
}

function mapTastingError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("relation") && lower.includes("tasting_notes")) {
    return "Tasting notes table is missing. Run Supabase migration or apply schema.sql.";
  }
  if (lower.includes("permission denied")) {
    return "Permission denied for tasting notes. Check RLS policies.";
  }
  if (lower.includes("invalid api key")) {
    return "Invalid Supabase API key. Update VITE_SUPABASE_ANON_KEY in .env and restart dev server.";
  }
  return message;
}

function ensureFields(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object") {
    return {};
  }
  return value as Record<string, unknown>;
}

function normalizeRow(row: TastingNoteRecord): TastingNoteRecord {
  return {
    ...row,
    fields_json: ensureFields(row.fields_json)
  };
}

export async function listTastingNotes(): Promise<TastingNoteRecord[]> {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const userId = await requireCurrentUserId();

  const { data, error } = await supabase
    .from("tasting_notes")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(mapTastingError(error.message));
  }

  return (data ?? []).map((row) => normalizeRow(row as TastingNoteRecord));
}

export async function createTastingNote(input: TastingNoteUpsertInput): Promise<TastingNoteRecord> {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const userId = await requireCurrentUserId();

  const { data, error } = await supabase
    .from("tasting_notes")
    .insert({
      user_id: userId,
      ...input
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(mapTastingError(error.message));
  }

  return normalizeRow(data as TastingNoteRecord);
}

export async function updateTastingNote(noteId: string, input: TastingNoteUpsertInput): Promise<TastingNoteRecord> {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const userId = await requireCurrentUserId();

  const { data, error } = await supabase
    .from("tasting_notes")
    .update(input)
    .eq("id", noteId)
    .eq("user_id", userId)
    .select("*")
    .single();

  if (error) {
    throw new Error(mapTastingError(error.message));
  }

  return normalizeRow(data as TastingNoteRecord);
}

export async function deleteTastingNote(noteId: string): Promise<void> {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const userId = await requireCurrentUserId();

  const { error } = await supabase.from("tasting_notes").delete().eq("id", noteId).eq("user_id", userId);
  if (error) {
    throw new Error(mapTastingError(error.message));
  }
}
