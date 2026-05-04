# Sipopedia RLS Recursion Fix

## Purpose
Use this runbook when the Sipopedia / Terminology page shows zero terms and this message:

```text
Terminology access is blocked by a recursive Supabase profile policy.
Apply the latest RLS migration, then refresh Sipopedia.
```

The failure is in Supabase RLS, not the React UI.

## Confirmed Symptom
The frontend query uses the public Supabase anon key against:

```text
/rest/v1/terminology_entries?select=id,term&is_published=eq.true&limit=...
```

When broken, Supabase returns:

```json
{
  "code": "42P17",
  "message": "infinite recursion detected in policy for relation \"profiles\""
}
```

## Root Cause
Older admin policies checked admin status by querying `public.profiles` from inside policies on `public.profiles`.

That can recurse when exposed tables, including `public.terminology_entries`, also call the admin profile check through RLS.

## Persistent Fix
The fix is already stored in the repo:

```text
supabase/migrations/20260421235809_fix_admin_rls_recursion.sql
```

It moves admin lookup into a private `security definer` helper and updates affected policies so public published terminology reads work again.

## What Was Applied
On 2026-04-30, the SQL in this migration was executed against:

```text
https://ubcsjifoizloilefqgem.supabase.co
```

Execution was done through the authenticated Supabase MCP server with the raw SQL execution tool. It was not dependent on frontend code changes.

Verification after execution:

```text
published_count: 744
```

Public REST verification:

```text
status=206
content-range=0-2/744
```

Sample returned terms:

```text
Wormtub
Tempranillo
Priming
```

## MCP Recovery Path
If a future Codex session needs Supabase database access, authenticate MCP first:

```powershell
codex mcp add supabase --url "https://mcp.supabase.com/mcp?project_ref=ubcsjifoizloilefqgem"
codex mcp login supabase
codex mcp list
```

Expected status:

```text
supabase ... enabled OAuth
```

Important: a Codex session that was already running before MCP auth may not see the newly added Supabase tools. Restart the session or use a fresh `codex exec` process.

## CLI Fallback Path
Supabase MCP OAuth and Supabase CLI auth are separate. The CLI still needs its own token.

Interactive login:

```powershell
npx supabase login
```

Then execute the fix:

```powershell
npx supabase db query --linked --file ".\supabase\migrations\20260421235809_fix_admin_rls_recursion.sql" --output json
```

Non-interactive token option:

```env
SUPABASE_ACCESS_TOKEN=sbp_your_token_here
```

Store that only in ignored local secrets, such as `local-secrets/.env`. Do not commit it.

## Verification Commands
Public REST check from PowerShell:

```powershell
function Read-DotEnvValue($path, $key) {
  if (!(Test-Path $path)) { return $null }
  foreach ($line in Get-Content $path) {
    if ($line -match "^\s*$([regex]::Escape($key))\s*=\s*(.+?)\s*$") {
      return $matches[1].Trim('"').Trim("'")
    }
  }
  return $null
}

$url = Read-DotEnvValue ".env" "VITE_SUPABASE_URL"
$key = Read-DotEnvValue ".env" "VITE_SUPABASE_ANON_KEY"
$endpoint = "$url/rest/v1/terminology_entries?select=id,term&is_published=eq.true&limit=3"
$response = Invoke-WebRequest -Uri $endpoint -Headers @{
  apikey = $key
  Authorization = "Bearer $key"
  Prefer = "count=exact"
} -UseBasicParsing -TimeoutSec 20

"status=$($response.StatusCode)"
"content-range=$($response.Headers['Content-Range'])"
"body=$($response.Content)"
```

Expected success:

```text
status=206
content-range=0-2/<published total>
```

## Notes
- The remote database fix is persistent.
- The migration file remains the source of truth for rebuilding or repairing another environment.
- If the browser still shows the old error after verification passes, hard refresh the Sipopedia tab.
- If future migration tooling tries to run this file again, the SQL is intentionally idempotent for the affected functions and policies.
