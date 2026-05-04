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
