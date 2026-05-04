# Repo Review and Refactor Notes

## Review Date

2026-04-29

## Summary

The site has become a broad, working beverage education product. The main engineering risk is no longer whether features can be built; it is whether future changes can be made safely without large component churn. The repo would benefit most from extracting feature data, relationship-map logic, and style blocks into clearer ownership boundaries.

## Findings

### High: Beer and wine recipe images point to missing folders

`src/components/Cocktails.tsx` builds image paths for `public/beers/{id}.png` and `public/wines/{id}.png`, but those directories do not exist yet. The UI has a fallback panel, so this is not a runtime crash, but it means the Beer and Wine subtabs are visually incomplete until assets are generated or paths are changed.

Recommended action:

- Create `public/beers/` and `public/wines/`.
- Add generated images matching the data ids.
- Keep fallback behavior for future missing assets.

### Medium: Large feature components are carrying too many responsibilities

Largest components by line count include:

- `SipAcademyWineLessons.tsx`
- `Flavors.tsx`
- `Grapes.tsx`
- `BeverageNews.tsx`
- `TastingJournal.tsx`
- `FlavorWheel.tsx`
- `WineResources.tsx`

These files mix data shaping, state, UI, navigation, and feature copy. They work, but they are costly to review and easy to regress.

Recommended action:

- Move static data into `src/data`.
- Move reusable hooks into feature folders.
- Split large pages into container + presentational components.
- Keep route-level components small.

### Medium: Bev Recipes data is embedded in UI code

`src/components/Cocktails.tsx` currently contains cocktail, beer, and wine data plus relationship scoring and rendering. This was pragmatic during iteration, but it should be extracted before the dataset grows.

Recommended action:

- Create `src/data/bevRecipes.ts`.
- Create a shared `src/lib/relationshipMap.ts`.
- Keep `Cocktails.tsx` as the page shell only.

### Medium: Global stylesheet is too large for continued feature work

`src/styles.css` is over 12,000 lines and contains many feature-specific blocks. Global edits can unintentionally affect unrelated pages.

Recommended action:

- Split styles by feature or introduce a documented section/layer convention.
- Keep shared tokens at the top.
- Move feature-only styles near the feature when the build setup supports it.

### Medium: Automated testing coverage is thin

`package.json` has a build script but no lint, test, or browser smoke scripts. The validator skips missing test/lint stages.

Recommended action:

- Add ESLint or equivalent linting.
- Add a minimal test runner for pure logic.
- Add Playwright smoke tests for the main user workflows.

### Low: Route names and user-facing labels have drifted

The user-facing tab is **Bev Recipes**, but the technical route is still `cocktails`. That is acceptable for backward compatibility, but new docs and future code should consistently note that `#app/cocktails` is the Bev Recipes route.

Recommended action:

- Keep the route alias for compatibility.
- Optionally add `#app/bev-recipes` as a normalized alias.

## What I Would Have Done Differently

- I would have created a shared relationship-map component earlier, then used it for cocktails, beer, wine, grapes, hops, fruit, and future maps.
- I would have separated data from UI sooner for Bev Recipes, Resources prompts, and large study catalogs.
- I would have introduced browser smoke tests once keyboard/swipe navigation became a repeated interaction pattern.
- I would have documented image asset contracts before adding generated image paths.
- I would have split `styles.css` as soon as multiple pages adopted the same dark glass/grid visual language.

## Refactor Candidates

### 1. Shared relationship map

Applies to:

- Bev Recipes
- Grapes & Grains
- future maps and taste relationship tools

Target API:

```ts
type RelationshipItem = {
  id: string;
  name: string;
  family: string;
  tags: string[];
  relatives: string[];
};
```

### 2. Feature folders

Suggested structure:

```text
src/features/bev-recipes/
  BevRecipesPage.tsx
  RecipeMap.tsx
  RecipeDetails.tsx
  recipeScoring.ts

src/features/grapes-grains/
  GrapesGrainsPage.tsx
  CommoditySelector.tsx
  CommodityDetail.tsx
  IngredientRelationshipChart.tsx
```

### 3. Data extraction

Move inline data from components to:

```text
src/data/bevRecipes.ts
src/data/resourcePrompts.ts
src/data/navigation.ts
```

### 4. Testable route helpers

Move route normalization and hash helpers out of `App.tsx` into:

```text
src/lib/routes.ts
```

Then unit test route aliases and deep-link normalization.

## Questions for Product Direction

- Should Bev Recipes eventually include coffee, tea, juice, and non-alcoholic recipes, or stay focused on cocktail/wine/beer?
- Should wine recipe maps model regions/styles only, or also appellation law and grape blending rules?
- Should tasting notes be primarily local-first, cloud-first, or explicitly user-selectable per note?
- Should generated images be treated as required study assets, or decorative enhancements that can remain optional?
- Which certification/exam standard is the source of truth when different bodies disagree?

## Questions the Code Already Answers

- The app is currently organized as a single Vite SPA with hash routes.
- Supabase is optional for public/local study views but required for auth/admin/subscription/terminology workflows.
- Grapes & Grains commodity order is Grapes, Grains, Hops, Coffee Beans, Tea, Other Fruit.
- Bev Recipes subtab order is Cocktails, Wine, Beer.
- Resources currently has active Wine and Spirits views.
- Build is the main automated validation signal today.

## Recommended Refactor Order

1. Extract Bev Recipes data and relationship scoring.
2. Add Playwright smoke tests around navigation and route restoration.
3. Split Grapes & Grains into feature components.
4. Split resource prompt data from `WineResources.tsx`.
5. Begin CSS section extraction after tests protect the visual flows.
