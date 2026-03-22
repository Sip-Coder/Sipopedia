# Terminology Sync Follow-Up Notes (2026-03-13)

## Current State
- Multi-program control plane is in place.
- Terminology index system exists and rebuilds successfully.
- Terminology validator rebuilds index and passes current dataset.
- Supabase sync script exists with dry-run + live modes.
- Default sync target changed to `public.terminology_library_entries` (conflict-safe table).

## What Passed
1. `npm.cmd run terminology:index`
2. `powershell -NoProfile -ExecutionPolicy Bypass -File .\\validators\\validate-terminology.ps1`
3. `npm.cmd run terminology:sync:dry`

Dry-run summary:
- published_local_entries_found: 2
- prepared_for_upsert: 2
- failed: 0

## Current Blocker
Live sync failed because Supabase connection/table introspection did not succeed with placeholder credentials:
- `sync-terminology-to-supabase failed: Failed to inspect table columns: TypeError: fetch failed`

## Migration To Review/Apply First
- `supabase/migrations/202603130002_create_terminology_library_entries.sql`

(Older optional migration for legacy table exists but is not the preferred path.)

## Resume Checklist
1. Apply migration `202603130002_create_terminology_library_entries.sql` in Supabase.
2. Set real env vars from an ignored local file:
   - Create `local-secrets\.env.local` with:
     - `SUPABASE_URL=https://<real-project-ref>.supabase.co`
     - `SUPABASE_SERVICE_ROLE_KEY=<real-service-role-key>`
   - Load for current session:
     - `Get-Content "local-secrets\.env.local" | Where-Object { $_ -match '=' -and -not $_.Trim().StartsWith('#') } | ForEach-Object { $n, $v = $_.Split('=', 2); [Environment]::SetEnvironmentVariable($n.Trim(), $v.Trim(), "Process") }`
3. Re-run:
   - `npm.cmd run terminology:index`
   - `powershell -NoProfile -ExecutionPolicy Bypass -File .\\validators\\validate-terminology.ps1`
   - `npm.cmd run terminology:sync:dry`
   - `npm.cmd run terminology:sync`

## Useful Files
- `scripts/rebuild-terminology-index.js`
- `validators/validate-terminology.ps1`
- `scripts/sync-terminology-to-supabase.js`
- `terminology/index.json`
- `docs/SUPABASE_SYNC.md`
- `supabase/migrations/202603130002_create_terminology_library_entries.sql`
