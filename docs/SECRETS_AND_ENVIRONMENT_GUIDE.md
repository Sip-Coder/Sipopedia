# Secrets and Environment Guide

This repository uses two different kinds of configuration:

1. Public frontend configuration that the browser must read.
2. Private secrets that must never be committed to git.

The rule is simple: if a value can grant server access, admin access, billing access, or third-party API access, keep it out of the repo and out of the browser bundle.

## What Can Be Public

These values are safe to expose to the frontend because they are already visible to the browser at runtime:

- `VITE_APP_URL`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SALES_EMAIL`

The Supabase anon key is not a secret by itself. It is meant to be public, but it must still be paired with correct RLS policies on the database.

## What Must Stay Private

These values must never be committed to git:

- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_URL` when used for private server-side access
- `SUPABASE_ANON_KEY` when used by server-side tools that should not depend on frontend env files
- `GOOGLE_AI_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_ID_PRO`
- `STRIPE_WEBHOOK_SECRET`
- OAuth client secrets
- Stripe or billing secrets
- Any downloaded JSON credential file

If a file contains one of those values, treat the whole file as sensitive.

## Recommended Setup

### 1. Keep a local-only secrets folder outside the repo

Best practice is to store a personal copy of secrets in a folder outside the repository, such as:

- `C:\Users\YourName\.secrets\sip-studies\`
- another private directory not tracked by git

Use that for backups or personal notes only if the content is secret-safe. Do not store raw downloaded credential JSON there unless it is excluded from git and never copied into the repo.

### 2. Keep repo templates only

Inside the repo, keep:

- `local-secrets/.env.example`
- `local-secrets/README.md`
- `.env.example`

Those files should describe the required keys, but never contain real values.

### 3. Put real secrets in deployment env vars

For Replit, Supabase Edge Functions, CI, or any hosted environment, add the secret values directly in the host’s environment variable manager.

The host should provide:

- `VITE_APP_URL`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GOOGLE_AI_API_KEY`
- `GOOGLE_MODEL`
- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_ID_PRO`
- `STRIPE_WEBHOOK_SECRET`
- `APP_URL`
- `ALLOWED_ORIGIN`

For hosted frontend publishing, make sure the frontend has only the public `VITE_*` variables and that server-side secrets stay in the backend or host secret store.

`STRIPE_PRICE_ID_PRO` backs the single active $10/month Sip Studies membership.
There is no Founding checkout price to configure. Legacy Founding entitlements
remain a billing and access compatibility concern, not a new-purchase secret.

## Safe Workflow

1. Copy `local-secrets/.env.example` to `local-secrets/.env` locally.
2. Fill in the values on your own machine.
3. Keep `local-secrets/.env` untracked.
4. Add the same values to the deployed environment secret store.
5. Never paste secret values into browser code, screenshots, or docs.

## OAuth Notes

For Supabase OAuth sign-in to work:

- the frontend needs the correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- production should set `VITE_APP_URL=https://sipopedia.com`
- the Supabase Auth provider must be configured with the right redirect URLs
- deployed environments must allow the same callback and redirect flow

Do not commit Google OAuth client secrets or downloaded client JSON files into the repo.

Recommended Supabase Auth redirect URLs:

```text
https://sipopedia.com
https://www.sipopedia.com
http://localhost:3000
http://127.0.0.1:5173
```

If Replit is using a temporary deployment URL before `sipopedia.com` is active,
add that exact Replit URL to Supabase Auth redirect URLs while testing. Replit
must not use a `VITE_APP_URL` value that points to `localhost`.

## Database And Access Control

User access is controlled by Supabase auth plus RLS policies.

That means:

- frontend keys can exist in the browser only if the database is locked down properly
- admin or service-role access must stay server-side
- access to protected rows should never depend on hiding a secret in the client

## If You Need To Rotate Secrets

1. Update the secret in the host environment first.
2. Update the local private copy if you keep one.
3. Remove any old secret-bearing files from the repo.
4. Verify the app still signs in and loads account data.

## Final Rule

If there is any doubt, keep the secret out of git and out of the frontend bundle.
