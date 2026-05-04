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

## Environment

Create `.env` from `.env.example`.

Required for Supabase-backed features:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Optional commerce/contact variables:

```bash
VITE_CHECKOUT_URL=
VITE_SALES_EMAIL=
```

Provider API keys do not belong in frontend env files. Keep OpenAI, Anthropic, Google, billing webhook, and other private keys in Supabase Edge Function secrets.

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
supabase functions deploy news-router
```

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
