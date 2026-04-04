# Terminology Single Source Of Truth

## Canonical Status (as of 2026-04-02 22:35 UTC)
- Supabase project: `https://ubcsjifoizloilefqgem.supabase.co`
- Table: `public.terminology_entries`
- Total terms: `828`
- Published terms: `828`
- Unpublished terms: `0`
- Latest DB update seen: `2026-04-02T22:35:30.204607+00:00`

## Where Terms Are Stored
- Canonical source of truth:
  - Supabase DB table `terminology_entries`
- Local operational artifacts (not canonical term storage):
  - `review/terminology/start-terms-run-*.md` (run reports)
  - `review/terminology/start-terms-state.json` (rotation state)
  - scripts under `scripts/` that collect/process terms

## How Terms Are Collected
1. `start terms` runs `scripts/start-terms.js`.
2. Pipeline scans approved sources by rotated letter windows and rotated source mix.
3. Candidates are scored; banned domains are hard-blocked.
4. New non-duplicate terms are inserted; existing terms are enriched only when additive.
5. Approved terms are auto-published (`TERMS_AUTO_PUBLISH_APPROVED=true`).

## Why Another Terminal Might Show ~500
- Different Supabase project URL loaded in that terminal.
- Missing env load, causing fallback behavior or failed DB calls.
- Running against stale branch/state without recent script/doc updates.
- Using older assumptions from previous audit baselines (`535` era).

## Terminal Alignment Checklist
1. Confirm same project URL:
   - `SUPABASE_URL` or `VITE_SUPABASE_URL` must resolve to `ubcsjifoizloilefqgem.supabase.co`.
2. Load secrets before running terms scripts:
   - `local-secrets/.env`
   - `local-secrets/.env.example`
3. Re-run live verification count (below).

## Count Verification Command (PowerShell)
```powershell
$envFiles = @('local-secrets/.env','local-secrets/.env.example','.env')
foreach ($file in $envFiles) {
  if (Test-Path $file) {
    Get-Content $file | ForEach-Object {
      $line = $_.Trim()
      if (-not $line -or $line.StartsWith('#')) { return }
      $m = [regex]::Match($line, '^(?:\$env:)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*"?(.+?)"?$')
      if ($m.Success) { [Environment]::SetEnvironmentVariable($m.Groups[1].Value, $m.Groups[2].Value, 'Process') }
    }
  }
}
@'
import { createClient } from "@supabase/supabase-js";
const s = createClient(process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY, { auth:{ persistSession:false, autoRefreshToken:false } });
const total = await s.from("terminology_entries").select("id", { count:"exact", head:true });
const pub = await s.from("terminology_entries").select("id", { count:"exact", head:true }).eq("is_published", true);
const unpub = await s.from("terminology_entries").select("id", { count:"exact", head:true }).eq("is_published", false);
console.log(JSON.stringify({ total: total.count ?? null, published: pub.count ?? null, unpublished: unpub.count ?? null }, null, 2));
'@ | node -
```

## Rotation Continuity
- Current rotation state file:
  - `review/terminology/start-terms-state.json`
- Last recorded run index: `16`
