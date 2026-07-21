# Sip Studies

Sip Studies is a React and TypeScript beverage education workspace for wine, beer, spirits, cocktails, maps, terminology, tasting notes, and study resources. The app is built as a Vite single page application with hash-based routing, Supabase-backed auth/content features, and local-first study interactions where cloud sync is not required.

## Current Product Areas

- **Learn**: Sip Academy, Sipopedia, Beverage Quiz, Regions, Maps, Grapes & Grains, Bev Recipes, Resources.
- **Taste**: Flavor Wheel, Journal Archive, Tasting Journal.
- **Connect**: Beverage News, Tasting Groups, AI News, Somm Events.
- **Admin**: Admin console and Terminology Admin for privileged users.

## Quick Start

```bash
npm.cmd install
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

Replit uses the `build:replit` command configured in `.replit`. That command runs only in a disposable deployment snapshot: it removes source dumps, generated review/output folders, and archived infographics that are not referenced by the website, then creates `dist` with every live asset still under `public`. The local mirror and GitHub history retain the complete asset archive. Use `npm run build` for normal local builds; `npm run build:replit -- --dry-run` only previews the deployment-prune list.

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
ALLOWED_ORIGIN=
```

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
supabase functions deploy ai-router
supabase functions deploy billing-webhook
supabase functions deploy create-checkout-session
supabase functions deploy news-router
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

Apply migrations with the Supabase CLI:

```bash
npx supabase db push
```

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
