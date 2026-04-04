# Supabase Start Terms Sync

## Purpose
Run conversation-driven terminology automation directly against `public.terminology_entries` with explicit legal source policy controls.

## Core Rules
- Do not use encyclopedia or dictionary domains.
- Keep all term definitions original (no verbatim source text).
- Preserve Sipopedia schema fields:
  - term
  - updated date
  - meaning
  - how to apply
  - examples
  - authors
  - infographic
  - references
  - MLA citations
  - editorial policy marker

## Required Environment Variables
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Commands
1. Audit current terms:
   - `npm run terms:audit -- --limit 535`
2. Generate candidate terms (dry run):
   - `npm run terms:start -- --dry-run`
3. Persist candidate terms:
   - `npm run terms:start`
4. Ralph-style iterative loop:
   - `npm run terms:loop -- -Iterations 3 -Letters ABC -BatchPerLetter 2 -Target 12 -DryRun`

## Reports
- Every run writes a markdown report under `review/terminology/`.
- Use those reports as continuity checkpoints between conversations.

## Legacy Pipeline Status
- Legacy index/sync scripts and cron harvester are deprecated for active generation.
- `supabase/functions/terminology-harvester` now returns HTTP 410 and points to this workflow.
