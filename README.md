# Sip Studies

Sip Studies is a React and TypeScript beverage education workspace for wine, beer, spirits, cocktails, maps, terminology, tasting notes, and study resources. The app is built as a Vite single page application with hash-based routing, Supabase-backed auth/content features, and local-first study interactions where cloud sync is not required.

## Current Product Areas

- **Learn**: Sip Academy, Sipopedia, Beverage Quiz, Regions, Maps, Grapes & Grains, Bev Recipes, Resources.
- **Taste**: Flavor Wheel, Journal Archive, Tasting Journal.
- **Connect**: Beverage News, Tasting Groups, AI News, Somm Events.
- **Admin**: Admin console and Terminology Admin for privileged users.

## Quick Start

```bash
npm.cmd ci
npm.cmd run hooks:install
npm.cmd run dev
```

Local host helper:

```bash
npm.cmd run localhost
```

Production build:

```bash
npm.cmd run build
```

Website validation:

```powershell
powershell -File .\validators\validate-website.ps1 -SkipInstall
```

Full release gate:

```bash
npm.cmd run rgrd:check
```

This runs the secret-guard regressions, repository secret scan, dependency audit,
Deno checks for every Supabase Edge Function, the Replit prune preview, the
production build, critical-asset validation, release-manifest verification, and
the browser route smoke suite.

## Fresh Windows Backup Mirror

GitHub is the working copy. Keep the Windows checkout as a recoverable mirror at
`C:\Codebase\actual\Sipopedia`; do not use a separately initialized folder as a
second source of truth.

```powershell
New-Item -ItemType Directory -Force C:\Codebase\actual | Out-Null
Set-Location C:\Codebase\actual
git lfs install
git clone https://github.com/Sip-Coder/Sipopedia.git
Set-Location .\Sipopedia
git lfs pull
npm.cmd ci
npm.cmd run hooks:install
git remote -v
git status --short --branch
```

To refresh the backup after work performed from a phone or Codex Cloud:

```powershell
Set-Location C:\Codebase\actual\Sipopedia
git fetch --prune origin
git switch main
git pull --ff-only origin main
git lfs pull
git status --short --branch
```

The final status should be clean and `main` should match `origin/main`. Make
normal changes on a GitHub branch and merge them through a pull request; the
local mirror is the backup, not an independent release branch.

## Distribution and Replit Deployment

The canonical release path is:

```text
backup/local mirror -> GitHub main -> Replit project sync -> Publish -> sipopedia.com
```

Hydrate a fresh local mirror before validation:

```bash
git lfs pull
npm ci
npm run build
```

Replit uses Node 22 and the `build:replit` command configured in `.replit`. That command runs only in a disposable deployment snapshot: it removes source dumps, generated review/output folders, archived infographics, superseded checkpoint art, source map-design files, original map exports, a character-art reference video, and any stale in-project LFS cache; hydrates every remaining `public` Git LFS asset through temporary build storage; creates `dist`; and refuses to deploy if any pointer file reaches the output. After a successful build it removes the duplicate hydrated source copy, temporary LFS objects, and development-only packages. Replit serves the SPA with `sirv`; Vite preview remains a local-only command. The local mirror and GitHub history retain the complete asset archive. Use `npm run build` for normal local builds; `npm run build:replit -- --dry-run` only previews the deployment-prune and cleanup plan.

Add `SIPOPEDIA_GITHUB_LFS_TOKEN` through Replit Secrets and make it available to production deployments. Use a dedicated fine-grained GitHub personal access token restricted to the `Sip-Coder/Sipopedia` repository with read-only Contents permission and a short expiration; rotate or revoke it when it is no longer needed. The deployment build supplies the token only through an environment-backed temporary askpass helper, disables Git credential persistence and interactive fallback, and removes the helper with the temporary LFS storage. Do not put the token in a Git remote URL, repository configuration, or checked-in file.

Replit must deploy the GitHub `main` branch. After each merge, sync the Replit
workspace with `origin/main`, confirm the workspace has no local source changes,
and publish. Every build writes `/rgrd.json`; its `repository` and full `commit`
must match `Sip-Coder/Sipopedia` and the deployed `origin/main` SHA.

```powershell
$expected = git rev-parse origin/main
$release = Invoke-RestMethod https://sipopedia.com/rgrd.json
$release.repository
$release.commit -eq $expected
```

Verify the same commit at `https://www.sipopedia.com/rgrd.json` and
`https://sipopedia-02.replit.app/rgrd.json` before considering a release done.

## Environment

Create `.env` from `.env.example`.

Required for Supabase-backed features:

```bash
VITE_APP_URL=
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Optional commerce/contact variables:

```bash
VITE_SALES_EMAIL=
```

Checkout is created server-side by the `create-checkout-session` Supabase Edge Function. Configure these as Supabase secrets, not frontend variables:

```bash
STRIPE_SECRET_KEY=
STRIPE_PRICE_ID_PRO=
STRIPE_PRICE_ID_FOUNDING=
STRIPE_WEBHOOK_SECRET=
APP_URL=
ALLOWED_ORIGINS=
```

For production, set `APP_URL=https://sipopedia.com`. `ALLOWED_ORIGINS` is a
comma-separated list of any additional trusted origins; the canonical domain,
`www`, the Replit deployment domain, and the documented localhost origins are
already allowlisted in the checkout and AI router functions. Wildcards are not
accepted by those functions.

Use Stripe Price IDs so the selected plan cannot open the wrong billing product. Pro uses Stripe Checkout in subscription mode; Founding Cohort uses Checkout in payment mode. The function attaches the signed-in Supabase user ID, selected plan, source, and next route to Checkout metadata.

Stripe should send these events to the deployed `billing-webhook` function:

```text
checkout.session.completed
checkout.session.async_payment_succeeded
customer.subscription.created
customer.subscription.updated
customer.subscription.deleted
```

The webhook accepts Stripe's `Stripe-Signature` header with `STRIPE_WEBHOOK_SECRET`, keeps the older internal `x-billing-webhook-*` HMAC path, and writes paid access state to `customer_subscriptions`.

Provider API keys do not belong in frontend env files. Keep OpenAI, Anthropic, Google, billing webhook, and other private keys in Supabase Edge Function secrets.

For production publish targets, set `VITE_APP_URL` to the canonical site URL,
such as `https://sipopedia.com`, so OAuth callbacks return to the deployed
domain. Leave it blank for local development unless you intentionally want local
login to return to production.

Supabase Auth redirect URLs should include:

```text
https://sipopedia.com
https://www.sipopedia.com
http://localhost:3000
http://127.0.0.1:5173
```

If testing login on a temporary Replit URL before the custom domain is active,
add that exact Replit URL to Supabase Auth redirect URLs too. Do not set
`VITE_APP_URL` to a localhost URL in Replit.

## Documentation Index

- [Website Product Spec](docs/WEBSITE_SPEC.md): product scope, information architecture, page responsibilities, and user workflows.
- [Architecture](docs/ARCHITECTURE.md): runtime architecture, routing, access model, data sources, and module boundaries.
- [Content and Data Spec](docs/CONTENT_DATA_SPEC.md): content ownership, beverage data rules, image assets, storage, and terminology policy.
- [UX and Navigation Spec](docs/UX_NAVIGATION_SPEC.md): keyboard/swipe behavior, major interaction contracts, and accessibility expectations.
- [QA and Release Checklist](docs/QA_RELEASE_CHECKLIST.md): baseline validation and manual smoke checks.
- [Implementation Spec](docs/IMPLEMENTATION_SPEC.md): coding, routing, local storage, asset, and documentation standards.
- [Repo Review and Refactor Notes](docs/REPO_REVIEW.md): current findings, refactor candidates, and open product questions.
- [Terms Automation Playbook](docs/TERMS_AUTOMATION_PLAYBOOK.md): Sipopedia terminology automation workflow.
- [Supabase Sync Notes](docs/SUPABASE_SYNC.md): Supabase operational notes.

## Repository Layout

```text
src/
  App.tsx                 Main route shell and workspace navigation
  components/             Feature pages and shared UI surfaces
  context/                Auth and access providers
  data/                   Static study data and reference catalogs
  lib/                    Supabase, analytics, journal, news, and utility modules
  assets/                 Bundled brand and curriculum assets
public/                   Runtime static assets loaded by URL
supabase/                 Migrations, schema, and Edge Functions
scripts/                  Operational scripts and terminology automation
validators/               PowerShell validation entrypoints
docs/                     Product, technical, runbook, and workflow docs
```

## Supabase

The app runs without Supabase for public/local study surfaces, but auth, profiles, subscriptions, terminology, admin workflows, and some data-backed features require Supabase.

Deploy Edge Functions as needed:

```bash
npx supabase link --project-ref ubcsjifoizloilefqgem
npm run edge:check
npx supabase functions deploy ai-router
npx supabase functions deploy billing-webhook
npx supabase functions deploy create-checkout-session
npx supabase functions deploy news-router
npx supabase functions deploy terminology-harvester
```

After deploying `billing-webhook`, add the deployed function URL as a Stripe Dashboard webhook endpoint and select:

```text
checkout.session.completed
checkout.session.async_payment_succeeded
customer.subscription.created
customer.subscription.updated
customer.subscription.deleted
```

`billing-webhook` intentionally uses `verify_jwt = false` because Stripe cannot send a Supabase JWT. The endpoint is protected by Stripe's `Stripe-Signature` verification with `STRIPE_WEBHOOK_SECRET`; the older internal `x-billing-webhook-*` HMAC path remains available for trusted server-to-server billing updates.

Check local and linked migration history before applying migrations:

```bash
npx supabase migration list --linked
npx supabase db push
```

Do not run `db push` when the local and remote version columns disagree. Repair
or rebaseline the history first, review the SQL, then apply forward-only
migrations. Database migrations and Edge Functions are part of the release even
though the static site itself is hosted by Replit.

## Terminology Automation

Default workflow:

```bash
npm run terms:audit -- --limit 535
npm run terms:start -- --dry-run
npm run terms:start
```

Policy:

- Do not use encyclopedia or dictionary domains as terminology sources.
- Do not insert duplicate terms.
- Enrich existing terms only with additive, non-redundant updates.
- Review generated files under `review/terminology/` before applying live changes.

## Current Validation Baseline

Required before merging UI or data changes:

```bash
npm.cmd run build
powershell -File .\validators\validate-website.ps1 -SkipInstall
```

For terminology changes:

```bash
powershell -File .\validators\validate-terminology.ps1
```

## Known Engineering Priorities

- Extract large page components into feature folders with data, hooks, and presentational components split apart.
- Move Bev Recipes data out of `Cocktails.tsx` into typed data modules.
- Split `src/styles.css` into feature-scoped styles or a documented layer system.
- Add at least smoke-level browser tests for routing, keyboard navigation, contrast-sensitive forms, and chart interactions.
- Generate or add beer and wine recipe images under `public/beers/` and `public/wines/`, or intentionally keep the current fallback state documented.
