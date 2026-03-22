# Supabase Terminology Sync

## Purpose
Safely sync repository terminology files into Supabase with repo files as canonical source of truth.

## Source-of-Truth And Safety Rules
- Canonical source is `terminology/index.json` and the referenced local terminology JSON files.
- Only entries where `status === "published"` are eligible for sync.
- `review`, `review_required`, `draft`, `rejected`, and `merged` are not synced.
- No automatic deletes are performed in Supabase.
- Sync is idempotent: re-running is safe.
- Existing higher-confidence records are not overwritten by lower-confidence local records.

## Required Environment Variables
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- Optional: `SUPABASE_TERMINOLOGY_TABLE` (defaults to `terminology_library_entries`)

## Secret Handling
- Do not commit real secrets to repo files, docs, scripts, or logs.
- Store runtime secrets in ignored files like `local-secrets/.env.local`.
- Load secrets into process env at runtime before running sync commands.

## Commands
- Rebuild terminology index:
  - `npm run terminology:index`
- Dry run (no Supabase writes):
  - `npm run terminology:sync:dry`
- Live sync:
  - `npm run terminology:sync`
- Install Git hooks (recommended once per clone):
  - `npm run hooks:install`
- Run secret guard manually:
  - `npm run security:secrets`

## Dry-Run Behavior
- Rebuilds `terminology/index.json` first (unless `--skip-index-rebuild` is passed).
- Scans only `published` entries.
- Validates each entry against `schemas/terminology.schema.json`.
- Builds normalized payloads and prints sync summary counts:
  - `published_local_entries_found`
  - `prepared_for_upsert`
  - `inserted`
  - `updated`
  - `skipped`
  - `failed`
- Does not write to Supabase.
- Does not mark entries as synced in `terminology/index.json`.

## Live Sync Behavior
- Rebuilds index first.
- Reads target table columns from Supabase `information_schema.columns`.
- If that metadata lookup is blocked, falls back to local SQL definitions in:
  - `supabase/schema.sql`
  - `supabase/migrations/*.sql` (newest first)
- Adapts payload to only existing columns in the target table.
- Uses upsert conflict key:
  - `normalized_term` for `terminology_library_entries` when available
  - otherwise `term`
- Skips updates if:
  - existing record has higher `quality_score`, or
  - existing row is effectively unpublished/rejected, or
  - payload is unchanged (no-op)
- On successful insert/update/no-op match, updates index entry metadata:
  - `supabase_synced: true`
  - `supabase_id`
  - `last_synced`

## Conflict Handling
- `scripts/rebuild-terminology-index.js` computes collisions:
  - duplicate term collisions
  - normalized collisions
  - alias collisions
- Sync marks collision-linked sources as dangerous and skips them conservatively.

## Failure Recovery
1. Run dry-run and inspect failures/skips.
2. Fix schema violations or terminology collisions in local files.
3. Rebuild index and re-run dry-run until clean.
4. Run live sync.
5. If live sync partially fails, fix only failed source entries and re-run live sync.

## Table Assumptions
- Preferred destination table: `public.terminology_library_entries`.
- Existing migration to create this table:
  - `supabase/migrations/202603130002_create_terminology_library_entries.sql`
- Optional legacy-table metadata migration:
  - `supabase/migrations/202603130001_terminology_sync_metadata_columns.sql`
