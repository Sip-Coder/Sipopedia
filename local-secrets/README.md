# Local Secrets

Keep only local configuration in this folder. Do not store downloaded OAuth
client files, exports, or notes here.

## Files to keep

- `local-secrets/.env.example`: template for the variables below.
- `local-secrets/.env`: your private local copy, ignored by git.

## Required variables

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GOOGLE_AI_API_KEY`
- `GOOGLE_MODEL`

## Optional variables

- `VITE_CHECKOUT_URL`
- `VITE_SALES_EMAIL`

## What not to keep here

- OAuth downloaded JSON client files
- service account exports
- plaintext notes with tokens, IDs, or credentials
- screenshots or docs containing secret material

## Quick load in PowerShell

```powershell
Get-Content .\local-secrets\.env | ForEach-Object {
  if ($_ -match '^\s*#' -or $_ -match '^\s*$') { return }
  $name, $value = $_ -split '=', 2
  Set-Item -Path "Env:$name" -Value $value
}
```
