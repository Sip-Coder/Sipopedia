# Implementation Spec

## Coding Standards

- TypeScript and React.
- 2-space indentation.
- Double quotes.
- Semicolons.
- Keep changes scoped to the feature being changed.
- Prefer typed data modules over untyped inline objects.
- Preserve existing visual language unless a specific redesign is requested.

## Component Standards

Route-level components should:

- own page-level state
- call feature hooks
- compose smaller components
- avoid large inline data arrays
- avoid embedding unrelated feature behavior

Presentational components should:

- receive typed props
- avoid direct route mutation unless explicitly responsible for navigation
- avoid local storage side effects

Feature components should live close together once extracted:

```text
src/features/{feature-name}/
```

Until a feature folder migration occurs, use `src/components` and `src/data` consistently.

## Data Standards

Static catalogs should live in `src/data`.

Every new catalog should export:

- a typed item shape
- a typed item array
- any useful lookup maps when needed

Avoid data duplication between UI lists, maps, and detail pages. If the same item appears in multiple places, derive all views from one source record.

## Navigation Standards

Use `onNavigate` callbacks inside feature pages when the route shell provides them.

Use `window.location.hash` only for cross-feature jumps when the component does not receive a route helper.

New deep routes need:

- route type update
- route normalization update
- active nav matching check
- docs update in `docs/UX_NAVIGATION_SPEC.md`

## Local Storage Standards

Keys should be namespaced.

Preferred pattern:

```text
sipstudies:{feature}:{purpose}:v1
```

Store only non-sensitive preferences, local notes, progress, cache, or UI state.

Do not store:

- service-role keys
- provider API keys
- billing secrets
- auth tokens manually

## Image Standards

Use `src/assets` for bundled imports and `public` for runtime URL paths.

Generated study images should:

- match item ids
- use lowercase kebab-case filenames
- have alt text in the component
- have a fallback state

Recipe maps currently expect:

```text
public/cocktails/{id}.png
public/beers/{id}.png
public/wines/{id}.png
```

## Accessibility Standards

Required:

- visible focus state
- keyboard access for primary interactions
- focus parity for hover cards
- labels for inputs
- readable contrast on all form panels
- no broken image icons

Expected keyboard behavior should be documented in `docs/UX_NAVIGATION_SPEC.md`.

## Validation Standards

Every code change should run:

```bash
npm.cmd run build
```

Before PR or release:

```powershell
powershell -File .\validators\validate-website.ps1 -SkipInstall
```

For terminology:

```powershell
powershell -File .\validators\validate-terminology.ps1
```

## Documentation Standards

Update docs when changing:

- nav labels
- routes
- access behavior
- Supabase schema/function expectations
- content source policy
- generated asset paths
- keyboard or swipe behavior
- major feature scope

Use these docs as the primary source:

- `docs/WEBSITE_SPEC.md` for product behavior
- `docs/ARCHITECTURE.md` for technical shape
- `docs/CONTENT_DATA_SPEC.md` for data/content rules
- `docs/UX_NAVIGATION_SPEC.md` for interaction contracts
- `docs/QA_RELEASE_CHECKLIST.md` for validation
- `docs/REPO_REVIEW.md` for current refactor priorities
