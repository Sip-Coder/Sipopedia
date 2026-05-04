# Website Product Spec

## Purpose

Sip Studies is a beverage education workspace for students, service professionals, and beverage teams. It combines study content, sensory practice, maps, relationship charts, reference drills, tasting notes, and industry feeds into one training surface.

## Audience

- Beverage students preparing for theory, service, and tasting exams.
- Hospitality teams training staff on wine, beer, spirits, cocktails, coffee, tea, and fruit-based beverage foundations.
- Operators who need repeatable reference materials, product recall prompts, and structured tasting workflows.

## Product Goals

- Make beverage study visual and navigable instead of a flat list of facts.
- Help users understand relationships between beverages, ingredients, regions, styles, and sensory markers.
- Keep tasting records and reference drills close to the learning surfaces that generate them.
- Support expansion across wine, beer, spirits, coffee, tea, fruit, and AI-assisted research.

## Information Architecture

The workspace is organized into three top-level sections.

### Learn

- **Sip Academy**: guided wine lessons and equipment/product study.
- **Sipopedia**: terminology and citation-backed concept lookup.
- **Beverage Quiz**: fast recall checks.
- **Regions**: global wine map atlas and regional study pages.
- **Maps**: AI wine cartography and regional callouts.
- **Grapes & Grains**: base beverage ingredient study for grapes, grains, hops, coffee beans, tea, and fruit.
- **Bev Recipes**: relationship maps for cocktails, wine styles/blends, and beer families/styles.
- **Resources**: reference library, wine classifications, spirits prompts, and downloadable practice PDFs.

### Taste

- **Flavor Wheel**: sensory vocabulary and fruit/category relationships.
- **Journal Archive**: saved tasting records.
- **Tasting Journal**: structured tasting note capture.

### Connect

- **Beverage News**: beverage industry feeds and curated source categories.
- **Tasting Groups**: cohort discovery and community ops.
- **AI News**: AI research and operations feed.
- **Somm Events**: event link studio.

## Key Workflows

### Ingredient Study

1. User opens `Grapes & Grains`.
2. User selects a commodity: Grapes, Grains, Hops, Coffee Beans, Tea, or Other Fruit.
3. User scans reference lists and relationship chart.
4. User opens a full detail page for the selected ingredient.
5. User uses arrows, swipe, Escape, or Ctrl+Arrow navigation to move through the study path.

### Recipe Relationship Study

1. User opens `Bev Recipes`.
2. User selects Cocktails, Wine, or Beer.
3. User searches or selects a recipe/style from the map.
4. User reviews selected panel details and nearest relatives.
5. User uses keyboard or swipe navigation to move through related items.

### Tasting Capture

1. User opens `Tasting Journal`.
2. User completes structured fields for beverage type, labels/photos, appearance, nose, palate, structure, and conclusions.
3. User saves locally or to cloud where configured.
4. User returns through `Journal Archive`.

### Reference Drill

1. User opens `Resources`.
2. User chooses beverage type, currently Wine or Spirits.
3. User runs wine reference review or spirits practice prompts.
4. User downloads worksheets or answer sheets where available.
5. User follows CTA links into Bev Recipes for applied cocktail learning.

## Access Model

- Public and starter users can browse public/starter surfaces.
- Paid access is derived from subscription state and profile role.
- Admin access is derived from profile role and privileged email checks.
- Supabase is optional for local visual study surfaces but required for authenticated, admin, subscription, and cloud-backed data.

## Non-Goals

- This app is not a regulated exam authority.
- Beverage facts, style origins, and regional data should be treated as study references and reviewed before high-stakes publication.
- The app should not expose provider API keys or service-role credentials in frontend code.

## Current Gaps

- No unit or browser test framework is configured yet.
- Beer and wine recipe image folders are not present, so Bev Recipes falls back to generated placeholder panels for those subtabs.
- Several feature pages are large enough to slow future changes unless split into feature folders.
