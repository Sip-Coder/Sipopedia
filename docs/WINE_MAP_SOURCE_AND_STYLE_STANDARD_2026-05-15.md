# Wine Map Source and Style Standard - 2026-05-15

## Bottom line

The current country maps should be treated as Tier 1 overview plates. They are not yet De Long/Wine Folly/SommGeo-grade wine maps because they do not use official wine-boundary geometry, terrain/elevation data, legal hierarchy layers, or per-layer source metadata.

The next step is not more decorative SVG polish. The next step is a source-backed map pipeline.

## Benchmark findings

### Commercial cartography benchmarks

De Long sets the transparency standard. Their map-making notes identify four boundary construction methods:

- survey-style legal boundary descriptions
- satellite imagery
- commune/municipality specifications
- vineyard plots

Sip Studies implication: each boundary layer needs a `source_method`, not just a visual path.

Wine Folly sets the approachable learning standard. Their map guidance emphasizes major grapes tied to regions, GIS-built accuracy, custom hillshade from satellite/USGS terrain data, educator review, and multi-year version updates.

Sip Studies implication: country maps need grape/style overlays and terrain that explains why the region matters.

VinMaps sets a print-art standard. Their positioning combines GIS, geography, terroir, and premium wall-map presentation.

Sip Studies implication: our visual design can stay original, but should feel like a finished cartographic product: clear hierarchy, attractive color, disciplined typography, and strong print/export layouts.

### Interactive atlas benchmarks

SommGeo sets the advanced professional standard:

- searchable appellations
- 3D terrain
- elevation/aspect/slope
- geology/climate/classification data
- professional study and educator workflows

ViniGeo sets a web-atlas standard:

- official boundaries
- global to vineyard-level zoom
- grape/color/certification filters
- region detail panels
- update cadence
- unified/reprojected web geometry

Sip Studies implication: our long-term target should be a searchable, source-aware map atlas, not only downloadable static SVGs.

### Certification and education benchmarks

Wine Scholar Guild and SWE-style maps show the value of exam-aligned coverage. They are organized around how students study, not only how cartographers classify terrain.

Sip Studies implication: every map should expose exam-relevant metadata such as WSET, SWE, CMS, WSG, Sake, Spirits, and Hospitality relevance where applicable.

## Sip Studies quality tiers

### Tier 0: Placeholder

Use only when no source layer exists yet.

Requirements:

- country or abstract outline
- visible fallback notice
- no internal borders
- no claim of official accuracy

### Tier 1: Country overview plate

Current SVG batch mostly fits this tier.

Requirements:

- accurate country outline
- readable study-region index
- source/version note
- explicit download button
- no invented internal boundaries
- link to country page

Needed improvement:

- add major rivers, mountains, seas, and climate cues
- add grape/style chips for major regions
- add exam tags

### Tier 2: Official regional boundary map

Requirements:

- official or documented source geometry for regions/sub-regions
- source URL and license
- source retrieved date
- geometry simplified for web rendering
- visible note when legal text supersedes map geometry
- legend for region/classification hierarchy

### Tier 3: Appellation/GI/AVA map

Requirements:

- official appellation/GI/AVA boundaries
- nested hierarchy, for example AVA inside AVA, GI zone/region/sub-region, AOC/AOP, DOC/DOCG, DO/DOCa
- label hierarchy by legal level
- searchable/filterable layer IDs
- link each feature to Sipopedia/country-region content

### Tier 4: Vineyard/detail map

Requirements:

- vineyard, climat, cru, Riede, lieu-dit, ward, or parcel layer
- terrain/elevation/slope/aspect where relevant
- source/license confirmation
- strong label-collision QA
- printable/exportable detail plate

## Source priority order

1. Official government/regulatory GIS or shapefile.
2. Official wine board/consortium GIS or downloadable map where reuse is allowed.
3. Official legal text plus administrative boundary reconstruction.
4. Reputable open-data or academic GIS source with documented license.
5. Manual editorial approximation, only if clearly marked approximate.

## First countries to upgrade

### USA

Recommended first because TTB provides AVA Map Explorer, AVA shapefile downloads, and links to codified CFR boundary descriptions.

Build target:

- national AVA overview
- California/Oregon/Washington state plates
- major nested AVA maps

Known caveat:

- TTB states the map explorer is informational and the CFR boundary text controls if there is a discrepancy.

### Australia

Recommended second because Wine Australia provides a GI dashboard, GI hierarchy, PDF maps, and boundary files via the Wine Australia Open Data Hub.

Build target:

- zones, regions, sub-regions
- grape/style overlays
- state map pages

Known caveat:

- textual GI descriptions take precedence over map geometry when inconsistent.

### France

High priority but bigger.

Build target:

- use INAO AOC viticole parcel data for official geometry where available
- separate France overview from Champagne, Burgundy, Bordeaux, Loire, Rhône, Alsace, Languedoc-Roussillon, Provence detail maps
- never try to show all meaningful France detail on one country plate

Known caveat:

- INAO/data.gouv.fr parcel data is informational; official deposited plans control.

### Burgundy and Champagne

High-impact detail-map targets.

Build target:

- Burgundy: appellation/commune/climat hierarchy
- Champagne: Montagne de Reims, Vallée de la Marne, Côte des Blancs, Côte de Sézanne, Côte des Bar plus village/cru/plot context

Known caveat:

- official/consortium maps are useful references, but styling and direct data reuse need license review.

### New Zealand

Good education target.

Build target:

- GI register-aligned regions
- NZ Winegrowers regional map comparison

Known caveat:

- official register/maps are clear, but public GIS/shapefile access still needs investigation.

### South Africa

Good hierarchy target.

Build target:

- Wine of Origin hierarchy: geographical units, regions, districts, wards, single vineyards

Known caveat:

- authoritative maps/lists exist, but public GIS licensing needs confirmation.

### Austria and Wachau

Strong detail-map target.

Build target:

- DAC, Rieden, Wachau Rieden maps

Known caveat:

- official maps are excellent, but direct GIS reuse needs confirmation.

### Italy

Very high value, but should not be the first GIS build.

Build target:

- DOC/DOCG by municipality where possible
- EU eAmbrosia and official disciplinari records
- ISTAT municipality reconstruction for legal areas

Known caveat:

- no simple single national open DOC/DOCG shapefile was identified. This is a dedicated pipeline, not a quick map polish task.

## Required map metadata

Each generated map asset should have:

- `map_id`
- `country`
- `level`: `country`, `region`, `appellation`, `detail`
- `tier`: `0`, `1`, `2`, `3`, or `4`
- `status`: `placeholder`, `overview`, `official-boundary`, `official-boundary-with-caveat`, `editorial-approximation`
- `source_name`
- `source_url`
- `source_method`
- `license`
- `retrieved_at`
- `source_updated_at`
- `legal_caveat`
- `geometry_file`
- `simplification_level`
- `projection`
- `qa_status`
- `exam_tags`
- `related_terms`

## Required UI changes

Main map page:

- replace one-dimensional country carousel with map-level tabs: `Overview`, `Regions`, `Appellations`, `Detail`
- add source/tier/status badges
- add filters for country, grape, classification, exam program, and map detail level
- keep explicit `Download SVG` action
- never make the preview itself a download link

Country pages:

- replace final single map card with a source-aware map module
- show available child maps
- show data quality status
- show source/version metadata
- connect map regions to page content and Sipopedia terms

Sipopedia connection:

- map features should link to related terms such as `AVA`, `AOC`, `GI`, `DOCG`, `climat`, `lieu-dit`, `Riede`, `ward`, `district`, `sub-region`, `terroir`, `aspect`, `elevation`, and `alluvial fan`

## Required generator changes

Short-term:

- keep `scripts/generate-country-map-assets.js` as a Tier 1 overview generator
- add source/version metadata to SVGs and manifest
- add grape/style/exam chips
- add `tier` and `status` fields to manifest

Medium-term:

- introduce `src/data/mapSources.ts` or `src/data/mapSources.json`
- store GIS layers under `public/maps/sources/<country>/<layer>.geojson`
- generate separate outputs for country, region, appellation, and detail maps
- use per-country projection/fitting instead of one global equirectangular fit

Long-term:

- build an interactive map layer viewer
- add search and filters
- support official geometry updates
- support print/export variants

## Design rules

- Do not copy De Long, Wine Folly, SommGeo, ViniGeo, WSG, VinMaps, or official-body artwork.
- Adopt standards, not artwork.
- Use original Sip Studies visual identity: dark teal academy base, restrained gold/cyan cartography, editorial typography, and exam-first information design.
- Use large labels and source-aware legends.
- Use terrain to explain wine, not as decoration.
- Use separate maps rather than shrinking detail until unreadable.
- Do not draw internal borders without source geometry.

## Practical next milestone

Build a `mapSources` manifest and upgrade the USA or Australia first.

Recommended first milestone:

1. Create `src/data/mapSources.ts`.
2. Add USA AVA and Australia GI source entries.
3. Add `tier`, `status`, `sourceName`, `sourceUrl`, `sourceUpdatedAt`, and `legalCaveat` to `country-map-manifest.json`.
4. Render source/status badges on `SipMaps.tsx` and `Regions.tsx`.
5. Keep the current SVGs as Tier 1 overview maps while official boundary layers are added.
