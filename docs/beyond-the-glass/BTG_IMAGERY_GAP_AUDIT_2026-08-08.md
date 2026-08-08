# BTG Imagery Gap Audit - 2026-08-08

## Status

Wine, Brewery, and Coffee currently pass the unique-scene-art audit. The remaining BTG academy journeys have no missing referenced files, but they still contain reused scene artwork that should be replaced with unique academy-specific imagery before the next large media publish.

Run the audit with:

```powershell
npm run qa:btg:imagery
```

The audit must pass before a full media-heavy RGRD push. As of the Coffee cleanup pass, the audit reports 75 remaining duplicate scene assignments outside Wine, Brewery, and Coffee.

## Publish Guardrails

- Keep generated scene files inside nested academy folders such as `public/beyond-the-glass/coffee/`.
- Avoid top-level `public/beyond-the-glass/*.webp`, which is LFS-filtered.
- Verify new files with `git check-attr filter -- <path>` before staging.
- Prefer optimized JPG/WebP-sized derivatives over raw generated PNGs.
- Batch media commits by academy so GitHub/Replit pulls do not repeatedly transfer revised binaries.
- Do not publish until `npm run qa:btg:imagery`, `npm run build`, `npm run security:secrets`, and focused `npm run qa:btg:responsive` checks pass.

## Remaining Unique-Image Worklist

### Coffee

Complete and verified on 2026-08-08.

- `coffee-system-map`
- `coffee-farm-ecology`
- `coffee-flower-cherry`
- `coffee-farm-resilience`
- `coffee-processing-crossroads`
- `coffee-dry-mill`
- `coffee-logistics`
- `coffee-roaster-anatomy`
- `coffee-brewing`

Verification:

- `npm run qa:btg:imagery` reports Coffee with 0 missing files, 0 LFS-filtered referenced files, and 0 duplicate art groups.
- `git check-attr filter -- public/beyond-the-glass/coffee/*.jpg` reports the new Coffee JPG derivatives as `filter: unspecified`.
- New Coffee JPG derivatives total about 9 MB across 36 responsive files.
- Landscape and portrait contact sheets were reviewed locally for scene distinction, crop quality, and accidental text.
- `BTG_QA_JOURNEY=coffee; BTG_QA_BASE_URL=http://127.0.0.1:5110; npm run qa:btg:responsive` passed 330 states and 655 node interactions.
- `npm run build` passed.
- `npm run security:secrets` passed.

### Distillery

- `distillery-material-crossroads`
- `distillery-protected-paths`
- `distillery-proofing-lab`
- `distillery-mill-mash`
- `distillery-pot-still`
- `distillery-column-still`
- `distillery-vapor-path`
- `distillery-fractions`
- `distillery-assembly`
- `distillery-bottle-passport`
- `distillery-warehouse`

### Energy Drinks

- `energy-quality-release`
- `energy-labels-regulation`
- `energy-caffeine-extraction`
- `energy-timing-sensitivity`
- `energy-acid-flavor-color`
- `energy-functional-ingredients`
- `energy-retail-service`
- `energy-informed-choice-circularity`

### Health & Supplements

- `health-system-map`
- `health-label-frameworks`
- `health-qa-label-allergen`
- `health-electrolyte-context`
- `health-acid-flavor-mask`
- `health-sensitive-context`
- `health-stability-shelf-life`
- `health-sensory-informed-choice`

### Juice

- `juice-orchard-system-map`
- `juice-fruit-anatomy-ripeness`
- `juice-harvest-condition`
- `juice-press-systems-atlas`
- `juice-brix-acid-balance`
- `juice-nonthermal-options`
- `juice-reconstitution-fortification`
- `juice-service-menu-context`

### Kombucha

- `kombucha-system-map`
- `kombucha-sweet-tea-lab`
- `kombucha-quality-safety-lab`
- `kombucha-stabilization-crossroads`
- `kombucha-carbonation-chamber`
- `kombucha-market-passport`

### Milk

- `milk-system-map`
- `milk-lactation-welfare`
- `milk-composition-drop`
- `milk-tanker-custody`
- `milk-homogenization`
- `milk-packaging-traceability`
- `milk-sensory-service`

### Sodas

- `sodas-route-atlas`
- `sodas-flavor-library`
- `sodas-color-cloud-emulsion`
- `sodas-pressure-balance`
- `sodas-warehouse-route`
- `sodas-label-literacy`
- `sodas-shared-sparkle`

### Tea

- `tea-garden-terroir`
- `tea-plucking-run`
- `tea-garden-resilience`
- `tea-oxidation-clock`
- `tea-fixation-station`
- `tea-sorting-room`
- `tea-trade-custody`
- `tea-package-passport`
- `tea-table-service`

### Water

- `water-cycle-atlas`
- `water-groundwater-archive`
- `water-screening-balance`
- `water-sedimentation-gallery`
- `water-disinfection-boundary`
- `water-safety-plan`
- `water-quality-lab`
- `water-beverage-operations`
- `water-carbonation-blending`
- `water-shared-glass`
- `water-sensory-service`
