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
- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_ID_PRO`
- `STRIPE_PRICE_ID_FOUNDING`
- `STRIPE_WEBHOOK_SECRET`

## Optional variables

- `VITE_SALES_EMAIL`
- `APP_URL`
- `ALLOWED_ORIGIN`

Checkout is not configured with a frontend checkout URL. The browser calls the
`create-checkout-session` Supabase Edge Function, which uses Stripe secrets and
price IDs from the server environment. Stripe webhook delivery should target
`billing-webhook` with `STRIPE_WEBHOOK_SECRET`.

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
