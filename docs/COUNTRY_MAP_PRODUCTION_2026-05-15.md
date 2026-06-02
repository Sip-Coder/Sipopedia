# Country Map Production Batch - 2026-05-15

## What changed

- Added deterministic country-map generation with `npm run maps:generate-country`.
- Generated one SVG country wine map for every enabled wine country page.
- Added `A.I. Country Maps` after the existing `A.I. Regional Maps` block on the main Maps page.
- Added an `A.I. Country Map` block as the final content block on each country page.
- Replaced fragile node-and-leader-line labels with a large readable study-region index.
- Changed the main maps page preview so the SVG image is no longer a download link; downloads now use the explicit `Download SVG` button.
- Changed country fitting to use the primary atlas landmass group so countries like France are not compressed by far-away overseas territory extents.

## Output paths

- Generator: `scripts/generate-country-map-assets.js`
- Shared URL helper: `src/lib/countryMaps.ts`
- Main maps carousel: `src/components/SipMaps.tsx`
- Country page block: `src/components/Regions.tsx`
- Styles: `src/styles.css`
- Generated assets: `public/maps/Country/<continent>/<country-slug>-wine-map.svg`
- Manifest: `public/maps/Country/country-map-manifest.json`

## Production method

The generator reads:

- `src/data/regions.ts` for enabled wine countries and continent groupings.
- `src/data/regionsExact.json` for exact major-region lists when available.
- `public/world-topo.json` for country outlines.

Each SVG uses the Sip Studios atlas aesthetic from the current main Maps page:

- dark teal atlas background
- gold/cyan glow system
- framed cartography plate
- highlighted country silhouette
- numbered study-region index
- editable SVG text for later Affinity Designer polish
- no inferred internal wine-region borders unless an authoritative GIS/source layer is added

## First batch result

- Generated assets: `45`
- Exact/shared TopoJSON outlines: `43`
- Abstract fallback outlines: `tahiti`, `cape-verde`

Those fallback files are intentional first-batch placeholders because the current shared TopoJSON does not include exact outlines for those locations.

## How to update the batch

1. Update country/region data in `src/data/regions.ts` or `src/data/regionsExact.json`.
2. Run:

```powershell
npm run maps:generate-country
```

3. Review `public/maps/Country/country-map-manifest.json`.
4. Run `npm run build` before publishing.

## How to undo

1. Remove the generated country map assets:

```powershell
Remove-Item -Recurse -Force public/maps/Country
```

2. Remove `maps:generate-country` from `package.json`.
3. Remove `scripts/generate-country-map-assets.js`.
4. Remove `src/lib/countryMaps.ts`.
5. Revert the `SipMaps.tsx`, `Regions.tsx`, and `styles.css` country-map additions.

## Notes for future Affinity Designer polish

- SVG text is intentionally real text, not rasterized.
- The route path should remain stable even if Affinity exports a polished replacement.
- If a polished PNG is preferred later, keep the same slug convention and update `countryMapAssetPath` in `src/lib/countryMaps.ts`.
- The generator is intentionally not using image-generation APIs. Raster generation would make labels and boundaries harder to correct; these maps remain editable SVGs.
