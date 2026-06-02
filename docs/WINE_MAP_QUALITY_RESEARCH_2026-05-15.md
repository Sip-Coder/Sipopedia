# Wine Map Quality Research - 2026-05-15

## Purpose

Research current wine-map standards across commercial cartographers, education platforms, official wine bodies, and regional/guild-style resources so Sip Studies country maps can move beyond decorative country plates into accurate, professional study maps.

## Reviewed sources

- De Long: independent wine-map publisher; emphasizes research, accuracy, clarity, current wine laws, mapping technology, and wine-industry consultation.
  Source: https://www.delongwine.com/pages/about-us
- De Long map production notes: identifies four production methods: survey-style legal specifications, satellite imagery, commune specifications, and vineyard plots.
  Source: https://www.delongwine.com/pages/making-wine-maps
- Wine Folly help: describes wine maps as educational and artistic, with major grapes tied to regions and custom hillshade built from USGS satellite data.
  Source: https://help.winefolly.com/en/articles/5225794-wine-maps
- Wine Folly map catalog: country maps connect regions to grapes, geography, political boundaries, and appellation names.
  Source: https://winefolly.com/global/download-wine-maps/
- SommGeo atlas: positions the standard as interactive GIS, 3D terrain, searchable appellations, climate/classification/detail panels, and professional study tooling.
  Source: https://sommgeo.com/
- SommGeo free maps: highlights print-ready resolution, verified appellation boundaries, terrain data, and professional classroom/trade use.
  Source: https://sommgeo.com/wine-maps/
- SommGeo Burgundy example: shows why high-quality maps need vineyard hierarchy, Grand Cru/Premier Cru/village layers, soils, aspect, rivers, and classification data.
  Source: https://sommgeo.com/launchsommgeo/sommgeo-fast-maps/burgundy-fast-map/
- ViniGeo: emphasizes official boundaries, instant search, grape/certification filters, region detail panels, weekly updates, and zoom from global view to plots.
  Source: https://vinigeo.com/
- Wine Australia: provides an interactive GI dashboard, printable maps, textual definitions, hierarchy of zones/regions/sub-regions, and GIS boundary downloads.
  Source: https://www.wineaustralia.com/labelling/register-of-protected-gis-and-other-terms/australian-wine-geographical-indications
- TTB/data.gov AVA Map Explorer: provides established/proposed AVA boundaries, containment metadata, official boundary links, address plotting, and downloadable shapefiles.
  Source: https://catalog.data.gov/dataset/ava-map-explorer
- New Zealand Winegrowers: publishes regional maps and downloadable national/regional map resources for professional printing.
  Source: https://www.nzwine.com/en/trade/learning/maps/
- Wine Institute California AVA map: stresses current AVA usage rules and a regularly updated high-resolution AVA map.
  Source: https://wineinstitute.org/our-industry/avas/
- Champagne official region page: shows the necessary depth for Champagne: legally defined production zone, villages/crus, plots, sub-regions, rivers, hillsides, soils, and grape emphasis.
  Source: https://www.champagne.fr/en/about-champagne/a-great-blended-wine/the-champagne-region
- Wine Scholar Guild maps: education-oriented map library organized by country/region and certification needs.
  Source: https://www.winescholarguild.com/wine-maps
- Wine Scholar Guild Alsace map: a focused education map can outline AOC boundaries and highlight all 51 Grand Cru vineyards.
  Source: https://www.winescholarguild.com/wine-maps/french-wine-maps/alsace-wine-map
- Vinea Wachau: vineyard-level reference with 155 Rieden, main/sub-vineyard distinctions, size, altitude, slope, and producer links.
  Source: https://www.vinea-wachau.at/en/mywachau/vineyards
- ClimaVinea: Burgundy climats and lieux-dits map product with more than 1,400 named sites, search, geolocation, surface data, producer/appellation data, and professional use cases.
  Source: https://climavinea.com/
- Jancis Robinson / World Atlas of Wine maps: searchable maps from the World Atlas of Wine, with broad world-region coverage and a mature atlas taxonomy.
  Source: https://www.jancisrobinson.com/wine-maps
- Vineyards.com: interactive wine maps with appellations, terroirs, vineyard exploration, and a multi-disciplinary team including wine, geology, map design, and web development.
  Sources: https://vineyards.com/about and https://vineyards.com/wine-map/united-states

## Competitive map-maker review

### De Long

Position: serious printed cartography for educators, tasting rooms, wineries, collectors, and wine shops.

What they do well:

- They emphasize source transparency, current wine laws, professional consultation, and mapping technology.
- Their France product is positioned as a national reference map, not only a poster. It includes all AOP regions, detail insets for Bordeaux, Beaujolais, and Cote-d'Or, and cites INAO as the data source.
- Their map-making article is unusually useful because it separates boundary construction into survey-style legal descriptions, satellite imagery, commune specifications, and vineyard plots.
- Their self-comparison with Wine Folly highlights practical quality details: referenced sources, larger print size, vector text, and higher-resolution output.

Sip Studies takeaway:

- Every AI country map needs an explicit boundary method and source status.
- Dense countries need insets or child maps; France cannot be solved as one all-purpose country SVG.
- Text should stay vector/editable and export-safe.

Risk to avoid:

- Do not imitate their wall-map composition or direct label layout. Adopt their transparency discipline, not their artwork.

### Wine Folly

Position: approachable educational maps with strong visual accessibility and beginner/intermediate learning hooks.

What they do well:

- Maps pair regions with major grapes, styles, and approachable learning context.
- Their help page says the maps are built in GIS, use custom hillshade from USGS satellite/elevation data, and receive expert/educator review.
- Their shop copy for France says the second-edition map covers 300-plus appellations while staying readable.
- Their new map book emphasizes freshness of data, hill-shaded landscapes, recent appellation changes, and portability.

Sip Studies takeaway:

- Our maps should explain why regions matter, not only where they are.
- Add grape/style chips and climate drivers to overview maps.
- Terrain must become data-derived hillshade/elevation, not decorative texture.

Risk to avoid:

- Do not copy their infographic palette, icons, product layout, or beginner-friendly wording style too closely.

### Wine Scholar Guild, SWE, and GuildSomm

Position: certification-driven study maps and professional reference resources.

What they do well:

- Wine Scholar Guild organizes map libraries by country and study need: French, Italian, Spanish, and German map sets.
- SWE-style blank maps reinforce active recall and exam preparation.
- GuildSomm includes Maps as a professional member resource alongside study guides, law compendia, quizzes, and regional education.

Sip Studies takeaway:

- Add study modes: labeled, blank/quiz, and exam-relevance layers.
- Build map hierarchy around how students retrieve information: country, region, appellation, vineyard/site.
- Keep a simpler study view separate from a high-detail reference view.

Risk to avoid:

- Do not recreate copyrighted study PDFs or member-only layouts. Use the study workflow pattern.

### SommGeo and ViniGeo

Position: modern GIS-first interactive atlases.

What they do well:

- SommGeo emphasizes reference-grade GIS, 3D terrain, high-resolution downloads, official appellation boundaries, map-maker tools, tours, and professional/educator workflows.
- Its free-map pages highlight verified appellation boundaries, terrain data, print-ready resolution, classroom projection, and trade-presentation use.
- ViniGeo emphasizes 1,600-plus wine regions, official boundaries, weekly updates, search, grape/color/certification filters, region detail panels, and zoom from global view to vineyard plots.

Sip Studies takeaway:

- Static SVGs should be a product of a source-backed data pipeline, not the primary data store.
- Add layer metadata now so search/filter/tabs can follow later.
- Long term: Overview, Regions, Appellations, Detail tabs should replace a single carousel of unrelated country plates.

Risk to avoid:

- Do not promise "official boundaries" unless the geometry is actually sourced, versioned, and traced.

### Vinous and VinMaps

Position: premium vineyard/site maps and high-end regional print references.

What they do well:

- Vinous emphasizes proprietary field research, vineyard-site boundaries, historical context, and 3D perspective.
- VinMaps has a deep catalog of detailed regional print products and sits closer to art-quality wall cartography.

Sip Studies takeaway:

- Vineyard/detail maps need a separate tier, source audit, and label QA budget.
- Advanced regions like Burgundy, Champagne, Napa, Sonoma, Mosel, Wachau, and Barolo need vineyard/site map products, not cramped country overviews.

Risk to avoid:

- Vineyard ownership, parcel borders, and producer information can have licensing and maintenance issues. Treat this as a later professional tier.

### Official bodies and regulatory sources

Position: legal/source authority, not always polished learning design.

What they do well:

- TTB provides public AVA Map Explorer metadata and downloadable geospatial source paths for US AVAs.
- Wine Australia publishes GI hierarchy, textual descriptions, dashboard maps, PDF maps, and GIS boundary availability through its Open Data Hub.
- INAO/data.gouv.fr provides France AOC/AOP geographic data; official plans and legal texts still control.
- New Zealand Winegrowers publishes regional and national map resources for trade learning and professional printing requests.
- WOSA/SAWIS expose South Africa's Wine of Origin hierarchy: geographical units, regions, districts, and wards.
- The European Commission's eAmbrosia/GIview ecosystem is the legal registry layer for EU protected names.

Sip Studies takeaway:

- Official/legal sources should drive geometry and hierarchy.
- Commercial map makers are benchmarks for presentation, but official bodies are the source of truth.
- Each generated map should display source, method, retrieved date, license/reuse note, and legal caveat.

## What high-quality wine maps consistently do

1. Separate accuracy from decoration.
   Serious maps are grounded in legal/GIS/cadastral/official-region sources first. Style comes after source data.

2. Use different scales for different jobs.
   A country overview should not try to show every vineyard. It should show macro-regions, climate/geography drivers, and navigation to detailed regional plates. A region plate should show appellation/sub-region boundaries. A vineyard plate can show parcels, climats, Rieden, crus, or named vineyards.

3. Show why the wine tastes different.
   The best maps show mountains, rivers, valleys, coastlines, slope/aspect, elevation, soil/geology, and climate corridors, not only names.

4. Make labels legible at the intended display size.
   Print-ready maps use large, consistent hierarchy: country, macro-region, sub-region, appellation, vineyard, town/river/mountain. Dense detail belongs in zoomable/detail maps, not tiny labels on one country plate.

5. Preserve legal hierarchy.
   The map must distinguish protected term levels: AVA, GI zone/region/sub-region, AOC/AOP, DOC/DOCG, DO/DOCa, PDO/PGI, Grand Cru/Premier Cru, commune, climat, lieu-dit, Riede, ward/district, etc.

6. Include source and version metadata.
   Good maps state what data they are based on, when they were updated, and whether a boundary is official, approximate, pending, or editorial.

7. Use professional cartographic furniture.
   North arrow, scale, inset locator, legend, source note, projection/fit note, color legend, and visual layer keys make maps feel trustworthy.

8. Use terrain and boundary layers instead of leader-line pins.
   Node callouts are fragile at country scale. Region polygons, shaded terrain, inset boxes, or an adjacent readable index work better.

9. Support study and exam retrieval.
   Education maps pair geography with what students must remember: grapes, wine styles, climate drivers, law/classification, famous subregions, and exam-relevant comparisons.

10. Avoid false precision.
   If exact internal borders are not available, the map should say so. Drawing invented borders is worse than using an index.

## Current Sip Studies gap

The current generated country SVGs are useful as first-pass navigational plates, but they are not yet high-quality wine maps by commercial or educational standards.

Current strengths:

- Editable SVG output.
- Stable country map routes and download buttons.
- Consistent visual system with the Sip Academy/Sip Studios aesthetic.
- Region index and country-page wiring.
- No image API dependency.

Current weaknesses:

- Country outlines come from a shared world topology, not wine-specific boundary datasets.
- Internal region/appellation borders are not drawn.
- Terrain/hillshade is decorative, not derived from elevation data.
- No grape/style/classification layer.
- No official-source versioning per country.
- Country overview and detailed regional maps are not yet separated as distinct products.
- Dense countries such as France, Italy, Spain, Germany, Portugal, and the USA require many subordinate maps, not a single country plate.

## Recommended Sip Studies map standard

### Tier 1: Country overview plate

Purpose: orientation and navigation.

Required layers:

- accurate country outline
- macro wine regions
- major rivers, mountains, seas/coastlines
- inset locator
- top 8-14 exam-critical regions
- grapes/style badges per region
- source/version note
- Download SVG button only, no accidental preview downloads

### Tier 2: Region/appellation plate

Purpose: study detail.

Required layers:

- official appellation/sub-region boundaries
- towns, rivers, roads only when educationally useful
- elevation/terrain or slope/aspect cue
- classification hierarchy
- grape/style/law notes
- exam-program tags: WSET, SWE, CMS, WSG, etc.
- links back to country overview and onward to term pages

### Tier 3: Vineyard/parcel plate

Purpose: advanced/professional reference.

Required layers:

- named vineyards, climats, crus, Rieden, lieux-dits, wards, or parcels
- classification color key
- elevation, aspect, slope, soil/geology where available
- producer/ownership only when licensed or officially available
- source traceability and update date

## Priority data-source strategy

Start with countries where authoritative GIS/open data exists:

- USA: TTB AVA Map Explorer and shapefiles.
- Australia: Wine Australia GI dashboard and Open Data Hub.
- New Zealand: New Zealand Winegrowers official maps and GI resources.
- California: Wine Institute AVA map as a secondary check against TTB.
- Burgundy: Bourgogne Maps, ClimaVinea/Sylvain Pitiot style as benchmark; only use licensed/official data where available.
- Champagne: official Champagne sub-region/cru/plot structure as reference; do not simplify Champagne to four blobs.
- Wachau/Austria: Vinea Wachau Rieden model is a benchmark for vineyard-level maps.
- France broadly: INAO/AOC/cadastral sources should be the target source layer before drawing internal borders.
- Italy: needs DOC/DOCG municipality or government-boundary mapping before drawing appellation polygons.

## Immediate implementation direction

1. Keep the current country SVGs as "overview plates", not final detailed wine maps.
2. Add a `map_data_status` concept per country:
   `overview-only`, `official-boundaries-ready`, `terrain-ready`, `vineyard-ready`.
3. Build country-specific data manifests before drawing internal borders.
4. Add source/version blocks into every generated SVG.
5. Add exam-focused grape/style chips to country overview maps.
6. Create a second generator for region/appellation maps instead of overloading the country generator.
7. For France and Italy, prioritize regional plates first because a single country map cannot honestly show the necessary detail.

## Design standards to adopt without copying protected artwork

- Use De Long's transparency standard: state how a boundary was made.
- Use Wine Folly's learning standard: pair region names with grapes and geography drivers.
- Use SommGeo/ViniGeo's GIS standard: official boundaries, terrain, searchable/zoomable layers.
- Use Wine Scholar Guild's certification standard: maps should match how students study regions.
- Use official bodies' legal standard: protected-region hierarchy and update dates matter.
- Use atlas publishing standards: scale, inset, legend, source, version, and label hierarchy.

## Next build recommendation

The next technical step should not be more decorative SVG tuning. It should be a map-data pipeline:

1. Add `src/data/mapSources.ts` or JSON manifest for each country.
2. Store each country's authoritative source URLs, source type, date checked, license notes, and available layers.
3. Add generator support for source/version metadata.
4. Add per-country `detailLevel` to control whether the map draws overview labels only or official internal boundaries.
5. Start with USA and Australia because official GIS download paths are clearly available.

This is the path from attractive placeholders to serious wine maps.
