# Architecture

## Stack

- React 18
- TypeScript
- Vite
- Supabase client for auth, profile, subscription, terminology, and data-backed features
- Three.js for globe/map rendering
- PowerShell validators for repo-level validation workflows

## Runtime Shape

The frontend is a Vite single page application. `src/main.tsx` mounts the React app. `src/App.tsx` owns the route shell, lazy-loaded workspace pages, brand room navigation, access gates, and hash-route normalization.

Routes are hash-based:

```text
#app/sip-academy
#app/grapes
#app/grapes/hops
#app/grapes/hops/citra
#app/cocktails
#app/resources
```

Legacy hash aliases are normalized in `normalizeWorkspacePage`.

## Main Application Layers

```text
src/App.tsx
  route parsing
  lazy imports
  workspace nav
  access decisions

src/context/
  AuthContext.tsx
  AccessContext.tsx

src/components/
  feature pages and feature-local UI

src/data/
  static catalogs for grapes, regions, lessons, commodity studies, news references

src/lib/
  Supabase client
  journal helpers
  news/AI router clients
  analytics and URL safety helpers
```

## Routing Contract

- New workspace pages must be represented in the `WorkspacePage` type.
- New nav tiles must be added to `workspaceNavItems`.
- Hash aliases belong in `normalizeWorkspacePage`.
- Deep routes that share a top-level nav tile should normalize to a typed route family, as `regions/*` and `grapes/*` do.

## Access Contract

Auth state is owned by `AuthContext`.

Access state is owned by `AccessContext`:

- `tier`
- `isPaid`
- `isAdmin`
- `profile`
- `subscription`
- `refreshProfile`

Paid access can come from:

- admin role
- mentor role
- active/trialing/past-due subscription that has not expired
- founding/pro plan code

## Supabase Contract

Frontend env:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

Server-only secrets:

```text
OPENAI_API_KEY
ANTHROPIC_API_KEY
GOOGLE_AI_API_KEY
BILLING_WEBHOOK_SECRET
SUPABASE_SERVICE_ROLE_KEY
```

Supabase Edge Functions should own provider key usage. Frontend code should call Edge Functions or public-safe Supabase APIs only.

## Feature Boundaries

### Grapes & Grains

Primary component: `src/components/Grapes.tsx`

Data sources:

- `src/data/grapes.ts`
- `src/data/commodityStudies.ts`

Responsibilities:

- Commodity selection
- Ingredient reference lists
- Relationship chart
- Detail pages for grapes, hops, grains, coffee, tea, and fruit
- Keyboard/swipe navigation

### Bev Recipes

Primary component: `src/components/Cocktails.tsx`

Current responsibilities:

- Cocktails subtab
- Wine subtab
- Beer subtab
- Search, relationship scoring, chart layout, hover modal, selected panel, nearest relatives

Refactor target:

- Move recipe/style data to `src/data/bevRecipes.ts`
- Move relationship scoring to `src/lib/relationshipMap.ts`
- Split chart, search, details, and photo components into a feature folder

### Resources

Primary component: `src/components/WineResources.tsx`

Responsibilities:

- Reference Library tabs
- Wine classifications
- Spirits practice prompts
- Downloadable spirits worksheets and answer sheets
- CTA routing to Bev Recipes
- Local persistence of selected beverage/resource view

### Tasting Journal

Primary components:

- `src/components/Flavors.tsx`
- `src/components/TastingJournal.tsx`

Responsibilities:

- Structured tasting form
- Journal archive
- Local and cloud-aware note storage
- Legibility and contrast-sensitive form UI

## Styling

Global styles currently live in `src/styles.css`. The file is large and contains feature-specific blocks. Until styles are split, new CSS should:

- use feature-prefixed class names
- avoid changing global typography or color tokens without checking major pages
- preserve high-contrast text/background combinations
- avoid broad selectors that affect all buttons/cards/forms

## Asset Strategy

Bundled imports belong in `src/assets`.

Runtime URL-loaded files belong in `public`, for example:

```text
public/cocktails/
public/grapes/
public/commodities/
public/resources/
```

Current Bev Recipes behavior expects:

```text
public/cocktails/{id}.png
public/beers/{id}.png
public/wines/{id}.png
```

`public/cocktails` exists. `public/beers` and `public/wines` do not exist yet, so the UI falls back to placeholder panels.

## Validation

Baseline:

```bash
npm.cmd run build
```

Full website validator:

```powershell
powershell -File .\validators\validate-website.ps1 -SkipInstall
```

Terminology:

```powershell
powershell -File .\validators\validate-terminology.ps1
```
