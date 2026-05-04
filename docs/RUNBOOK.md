# Multi-Program Control Plane Runbook (Windows PowerShell)

## What This Does
- Keeps one active mission at a time.
- Active mission is set in `control/active-program.txt`.
- `control/run-program.ps1` runs bounded iterations (default `5`).

## Switch Active Program
- Website mission:
  - `powershell -NoProfile -ExecutionPolicy Bypass -File .\control\select-program.ps1 website`
- Terminology mission:
  - `powershell -NoProfile -ExecutionPolicy Bypass -File .\control\select-program.ps1 terminology`

## Run One Bounded Pass
- Default bounded loop:
  - `powershell -NoProfile -ExecutionPolicy Bypass -File .\control\run-program.ps1`
- Custom iteration count:
  - `powershell -NoProfile -ExecutionPolicy Bypass -File .\control\run-program.ps1 -MaxIterations 3`

## Review Logs
- Latest logs:
  - `Get-ChildItem .\logs\*.md | Sort-Object LastWriteTime -Descending`
- Open a specific log:
  - `notepad .\logs\iteration-01-YYYYMMDD-HHMMSS.md`

## Inspect Terminology Review Queue
- List queue files:
  - `Get-ChildItem .\review\terminology\*.md | Sort-Object LastWriteTime -Descending`
- Open latest queue:
  - `$f = Get-ChildItem .\review\terminology\*.md | Sort-Object LastWriteTime -Descending | Select-Object -First 1; if ($f) { notepad $f.FullName }`

## Repair Sipopedia RLS Recursion
- If Sipopedia shows zero terms with a recursive Supabase `profiles` policy error, use `docs/SIPOPEDIA_RLS_RECURSION_FIX.md`.
- The persistent fix is `supabase/migrations/20260421235809_fix_admin_rls_recursion.sql`.

## Create A New Program File In The Future
1. Add `programs/program.<name>.md`.
2. Add mapping in `control/select-program.ps1`.
3. Update mission detection in `control/run-program.ps1`.
4. Create validator `validators/validate-<name>.ps1`.
5. Ensure docs and policy for the new mission are clear.

## Safety Defaults
- Never run forever by default.
- Stop on severe failure.
- Do not mix objectives from different programs in one iteration.
- Keep commits small and reversible.
