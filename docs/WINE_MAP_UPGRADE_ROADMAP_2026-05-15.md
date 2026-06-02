# Wine Map Upgrade Roadmap - 2026-05-15

## Decision

Sip Studies should not try to solve high-quality country maps by adding more label nodes or decorative callouts. The map collection needs to become a source-backed educational atlas.

The current generated country SVGs should stay as Tier 1 overview plates while we build official-boundary and detail-map layers underneath them.

## What the research changed

### Previous assumption

A better generated SVG country plate could make the collection feel close to commercial wine-map quality.

### Updated conclusion

That is not enough. De Long, Wine Folly, SommGeo, ViniGeo, Wine Scholar Guild, official regional bodies, and professional atlas products are strong because they combine:

- legal or official boundary data
- terrain/topography that explains wine style
- map scale discipline
- clear hierarchy from country to region to appellation to vineyard
- source/version metadata
- search/filter layers
- print-quality exports

## Product target

Build four map products, not one.

1. Country overview maps
2. Regional study maps
3. Appellation/GI/AVA maps
4. Vineyard/detail maps

## Best borrowed standards, without copying artwork

### From De Long

Adopt:

- boundary-method transparency
- wine-law awareness
- professional editing and review
- current-data discipline

Do not copy:

- exact map compositions, palettes, type, or proprietary wall-map artwork

### From Wine Folly

Adopt:

- approachable educational design
- grape-to-region relationships
- hillshade/terrain as a learning tool
- versioned update process

Do not copy:

- proprietary illustration style or exact infographic layouts

### From SommGeo and ViniGeo

Adopt:

- official boundary layers
- terrain/elevation focus
- search and filters
- zoom from country to vineyard/parcel
- detailed data panels

Do not copy:

- proprietary app interface, styling, or paid-map layouts

### From SWE and Wine Scholar Guild

Adopt:

- exam-oriented simplification
- clean study-map variants
- region/appellation label clarity
- maps organized around student retrieval

Do not copy:

- copyrighted PDF layout, labels, or exact educational map artwork

### From official wine bodies

Adopt:

- official hierarchy
- source authority
- legal caveats
- update dates
- locator insets
- nested-boundary explanations

Do not copy:

- logos, official styling, or unlicensed map artwork

## Immediate repo changes recommended next

### 1. Add a map-source registry

Create:

```text
src/data/mapSources.ts
```

It should track:

- country
- source name
- source URL
- source method
- license
- legal caveat
- retrieved date
- layer level
- available formats
- current status

Status: implemented as an initial country-map source/status registry for the AI country-map UI. France is marked as source-backed from data.gouv.fr AOP basin geometry; USA, Australia, New Zealand, and South Africa are marked as official-boundary targets; all other countries fall back to overview-only.

### 2. Extend generated manifest fields

Add to:

```text
public/maps/Country/country-map-manifest.json
```

Fields:

- `tier`
- `status`
- `sourceName`
- `sourceUrl`
- `sourceMethod`
- `license`
- `legalCaveat`
- `retrievedAt`
- `availableLayers`
- `qaStatus`

### 3. Render source badges in the UI

Update:

```text
src/components/SipMaps.tsx
src/components/Regions.tsx
```

Show:

- Tier 1 Overview
- Official Boundaries Available
- Approximate / Editorial
- Source: TTB / Wine Australia / INAO / etc.
- Updated date

### 4. Add map-level tabs

Main maps page should support:

- Overview
- Regions
- Appellations
- Detail

The current country SVG carousel belongs under Overview.

### 5. Start official-boundary import with USA or Australia

Recommended first build:

- USA AVA layer from TTB
- Australia GI layer from Wine Australia

Reason:

- official source paths are clearer
- legal caveats are explicit
- hierarchy is useful for exams
- lower ambiguity than Italy or France-wide parcel work

## Data pipeline recommendation

Use this structure:

```text
source/raw/wine-boundaries/<dataset>/
build/wine-boundaries/
public/data/wine-boundaries/
public/maps/Country/
```

Keep raw downloads immutable. Ship only simplified web outputs.

Preferred flow:

1. Download raw official file.
2. Save checksum.
3. Inspect CRS, fields, geometry type, and feature count.
4. Normalize to GeoPackage.
5. Reproject to WGS84/RFC 7946 GeoJSON.
6. Normalize attributes to Sip Studies schema.
7. Simplify with small-region protection.
8. Generate GeoJSON/TopoJSON for web.
9. Generate static SVG/PNG exports.
10. Record all commands in source manifest.

## First country build order

1. USA: TTB AVAs
2. Australia: Wine Australia GIs
3. France: INAO AOC/AOP data, then region-specific detail maps
4. Burgundy: INAO/BIVB-informed appellation/climat hierarchy
5. Champagne: INAO geometry plus Champagne official education structure
6. New Zealand: IPONZ/NZ Winegrowers sources
7. South Africa: WCA/SAWIS/WoSA hierarchy
8. Austria/Wachau: Austrian Wine/Vinea Wachau Rieden maps
9. Italy: eAmbrosia/MASAF/disciplinari plus municipality reconstruction

## UI/UX direction

### Study mode

Use for WSET/SWE/CMS learners.

Traits:

- fewer labels
- high contrast
- region names first
- rivers/mountains/cities as anchors
- quiz/blank-map option later

### Explore mode

Use for deeper region pages.

Traits:

- terrain/hillshade
- official boundaries
- appellation filters
- grape/style overlays
- source panels
- richer detail on desktop

### Print/export mode

Use for downloadable study sheets.

Traits:

- fixed aspect
- large labels
- legend and source note
- no interactive-only information

## Design target

The target should be:

```text
Napa Valley Vintners clarity
+ SommGeo terrain precision
+ SWE study simplicity
+ Wine Folly learning accessibility
+ Sip Studios visual identity
```

## What to stop doing

- Stop drawing internal wine borders without official/source geometry.
- Stop using node callouts as the main technique for dense maps.
- Stop shrinking legends into unreadable SVG sidebars.
- Stop treating country maps as the final detail product.
- Stop relying on decorative terrain as if it were data.

## What to do instead

- Use source-aware map tiers.
- Build official data manifests.
- Separate overview/detail products.
- Use terrain and hierarchy intentionally.
- Connect every mapped region to learning content and Sipopedia terms.
- Make map quality visible to users with status/source badges.

## Success definition

The country map collection is improving when:

- every map has visible source/version metadata
- every internal border is source-backed or explicitly marked approximate
- dense countries have regional/detail child maps
- users can filter by exam program, grape, classification, and map level
- SVG downloads remain editable
- maps are readable on desktop, mobile, and print
- the collection can be updated from repeatable data-source manifests
