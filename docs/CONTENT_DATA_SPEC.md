# Content and Data Spec

## Content Principles

- Prefer study-useful clarity over exhaustive encyclopedia-style text.
- Keep beverage descriptions concise, defensible, and aligned with certification study needs.
- Separate user-facing educational claims from implementation notes.
- Review origin dates, regional rules, and legally protected wine/spirits terms before production publication.

## Static Data

Core static data lives under `src/data`.

```text
src/data/grapes.ts
src/data/commodityStudies.ts
src/data/regions.ts
src/data/regionsExact.json
src/data/lessonPath.ts
src/data/tracks.ts
src/data/magazineNewsReferences.ts
src/data/guildExtractedQuestions.ts
```

Static data should be typed, exported from data modules, and consumed by components. New large data sets should not be embedded directly in component files.

## Grapes & Grains Data

### Grapes

Source: `src/data/grapes.ts`

Required fields include:

- slug
- name
- color
- headline
- origin
- structure
- beginner/advanced/pro copy
- classic regions
- benchmark styles
- sensory markers
- exam keys
- image references where available

### Commodities

Source: `src/data/commodityStudies.ts`

Commodity ids:

```text
grains
hops
coffee
tea
fruit
```

Required fields include:

- commodity
- id
- name
- headline
- origin
- family
- structure line
- tasting notes
- styles
- beginner/advanced/pro copy
- optional image references

## Bev Recipes Data

Current location: `src/components/Cocktails.tsx`

Target location:

```text
src/data/bevRecipes.ts
```

Shared item shape:

- id
- name
- family/style
- base
- method
- ingredients
- detail lines
- glassware
- origin/invented
- profile markers
- relative ids

Wine-specific additions:

- wineColor: `red` or `white`
- terroir
- continent/region and origin

Beer-specific detail lines must include:

- hops
- barley/grain bill
- yeast
- water profile/source logic

Cocktail-specific detail lines must include one ingredient per line with quantity and options.

## Recipe Image Assets

Cocktail images:

```text
public/cocktails/{id}.png
```

Beer images:

```text
public/beers/{id}.png
```

Wine images:

```text
public/wines/{id}.png
```

Image ids must match recipe/style ids. If no image exists, the app should display a fallback panel.

## Resources and PDFs

Resources assets belong under:

```text
public/resources/
```

Generated spirits worksheets currently come from:

```text
scripts/generate-spirits-pdfs.mjs
scripts/generate-simple-pdf.js
```

Worksheet rules:

- student worksheets leave answer lines blank
- answer sheets include categories and example brands
- prompt text should match visible in-app wording

## Terminology Policy

Terminology content must follow the automation playbook:

- no encyclopedia domains
- no dictionary domains
- no duplicate term insertion
- no placeholder citations
- verified source URLs only
- MLA citations must match the source URL

Operational docs:

- `docs/TERMS_AUTOMATION_PLAYBOOK.md`
- `docs/TERMINOLOGY_SINGLE_SOURCE_OF_TRUTH.md`
- `docs/terminology_how_to_apply_sources.md`

## Local Storage Keys

Local storage is used for lightweight user progress and view state. Keys should be namespaced with `sipstudies:` or a similarly clear prefix.

Examples:

- resources selected view
- tasting journal local notes
- academy progress
- maps active selection
- event/news cache

Do not store secrets or sensitive provider tokens in local storage.

## Source Review Requirements

Use current primary or authoritative sources when adding:

- legal/regulatory claims
- appellation rules
- spirit category rules
- vintage/current producer data
- subscription/billing behavior
- external feeds

When exactness matters, cite the source in docs or comments close to the data workflow, not inside broad UI code.
