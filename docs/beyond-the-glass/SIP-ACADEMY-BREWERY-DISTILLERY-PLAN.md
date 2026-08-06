# SIP Academy Brewery + Distillery Expansion Plan

Status: local planning + first Brewery milestone.

This expands Beyond the Glass from a single Wine field trip into a reusable SIP Academy ecosystem. Wine remains the quality baseline: visual-first learning, selectable field-atlas nodes, separate paper notes, calm guide presence, saved progress, reduced-motion support, and no text covering essential artwork.

## Shared architecture standard

- Keep each ecosystem as data first: chapter metadata, scene list, responsive art metadata, field-note nodes, source list, and progress key.
- Reuse the existing Beyond the Glass scene shell, field-atlas component, paper-note system, Academy Plaza map, guide sprites, and route aliases.
- Add ecosystem selection with hash query support, beginning with `/#app/btg?journey=brewery` and later `/#app/btg?journey=distillery`.
- Preserve `/#app/btg` as the Wine journey and Academy Plaza home context.
- Treat Academy Plaza as the central SIP Academy navigation hub. Wine is live, Brewery becomes the next active preview/build, Distillery follows, then Coffee and Tea remain clearly forthcoming.
- Every substantive scene should eventually have 5–9 keyboard-accessible nodes, each with an authored visual focus and a separate detail panel.
- No scene should rely on overlaying long prose on top of artwork. Art, node controls, guide notes, and study-card notes use distinct safe zones.

## Brewery curriculum map

Primary learner promise: follow beer from water, grain, hops, and yeast through brewhouse, cellar, package, cold chain, and service.

Planned primary stops:

1. Brewery Gate at SIP Academy
   - Purpose: establish a distinct brewery wing while preserving Academy continuity.
   - Nodes: water path, malt/grain, hops, brewhouse, fermentation cellar.
   - First local asset: `public/beyond-the-glass/brewery/brewery-opening-1600.webp`.

2. Brewing Water
   - Coverage: water profile, treatment, pH, hardness/minerals, chlorine/chloramine removal, style impact.
   - Visual: luminous water-canal lab feeding mash tun and kettle.

3. Malt and Grain Anatomy
   - Coverage: barley/kernel structure, malting, steeping, germination, kilning, specialty malts, adjunct context.
   - Visual: deconstructed malt kernel and malt floor/kiln.

4. Hops and Botanicals
   - Coverage: hop cones, alpha acids, essential oils, bittering/flavor/aroma timing, storage, non-hop botanical caveat.
   - Visual: hop garden with aroma-oil medallions.

5. Yeast and Fermentation Readiness
   - Coverage: ale/lager yeast, health, pitch rate concept, oxygen/nutrients at a high level, sanitation.
   - Visual: Hummin mapping yeast population and vessel temperature.

6. Mill and Grist Case
   - Coverage: roller mill, crush quality, husk preservation, grist flow.
   - Visual: safe cutaway of rollers and grist.

7. Mash Tun and Conversion
   - Coverage: mash-in, enzymatic conversion, rests, mash temperature, wort creation.
   - Visual: layered mash tun showing grain bed, water, heat, enzymes.

8. Lauter, Vorlauf, Sparge
   - Coverage: lauter tun, wort clarity, grain bed filtering, rinsing sugars without over-extraction.
   - Visual: cutaway lauter vessel and recirculation path.

9. Kettle and Whirlpool
   - Coverage: boil, sterilization, hop additions, bitterness/aroma, protein break, whirlpool trub separation.
   - Visual: copper kettle and whirlpool vortex.

10. Fermentation Hall
    - Coverage: ale/lager vessels, open vs closed context, temperature control, CO2, yeast converting sugars.
    - Visual: stainless cellar with node focus on tank, yeast, cooling jacket, blowoff/CO2.

11. Conditioning, Lagering, Clarification
    - Coverage: maturation, lagering, filtration/centrifuge/finings context, haze decisions.
    - Visual: cool cellar and clarity stations.

12. Brite Tank and Carbonation
    - Coverage: carbonation, conditioning, brite beer, dissolved CO2, package readiness.
    - Visual: brite tank with bubble/calibration nodes.

13. Packaging Line
    - Coverage: bottles/cans/kegs, oxygen pickup risk, sanitation, date coding, package choices.
    - Visual: packaging line with canning, kegging, bottle fill.

14. QA Lab and Sensory Field Kit
    - Coverage: gravity/ABV checks at a safe conceptual level, dissolved oxygen, microbiology checks, common beer faults.
    - Visual: lab bench and optional fault/aroma kit, not on top of main art.

15. Cold Chain to Taproom
    - Coverage: temperature, freshness, distribution, draught handling, glassware/service, responsible consumption.
    - Visual: cold room, delivery, taproom, restaurant handoff.

## Distillery curriculum map

Primary learner promise: follow spirits from raw material and fermentation through distillation choices, maturation, proofing, package, cocktail/service, and responsible context.

Planned primary stops:

1. Distillery Gate at SIP Academy
   - Purpose: establish a distinct spirits wing with safe/legal framing.
   - Nodes: raw material paths, fermentation, pot still, column still, barrel house.

2. Raw Material Families
   - Coverage: grain, fruit, cane/molasses, agave, botanicals, neutral base context. Avoid false universal claims.

3. Mash, Wash, and Fermentation
   - Coverage: milling/mashing where applicable, sugar availability, yeast, wash/beer/wine/base.

4. Pot Still Anatomy
   - Coverage: boiler, head, lyne arm, condenser, copper interaction, batch distillation.

5. Column/Continuous Still Anatomy
   - Coverage: plates/trays, reflux, rectification, continuous operation, category caveats.

6. Fraction Selection
   - Coverage: heads/hearts/tails as educational sensory/process concepts; do not teach unsafe home production.

7. Proof, ABV, and Legal Framing
   - Coverage: proofing, ABV, permitted category language, labeling/identity caveats.

8. Oak, Wood, and Warehouse
   - Coverage: new charred oak where applicable, used barrels, staves, toast/char, climate, oxygen, time.

9. Blending, Filtration, Color, and Final Adjustment
   - Coverage: blending for consistency/style, filtration context, color/caramel where legally/category appropriate.

10. Category Detours
    - Coverage: whiskey, rum, brandy, gin, tequila/agave spirits, vodka; map-driven caveats by category/jurisdiction.

11. Bottling, Distribution, Retail, and Cocktail/Service
    - Coverage: packaging, route to market, bar use, responsible service.

## Source-verification spine

Use these as first-pass factual guardrails; add scene-specific sources as content deepens.

- Cicerone Certification Program: beer styles, ingredients, brewing process, keeping/service, flavor/off-flavor study framing.
- Brewers Association Draught Beer Quality Manual and brewer education materials: draught service, cold chain, package freshness, carbonation and quality concerns.
- eCFR / TTB distilled spirits standards of identity: legal category language, labeling, proof/ABV, whiskey/rum/brandy/gin/vodka/other category boundaries.
- TTB labeling guidance: U.S. compliance framing and avoid overclaiming category rules.
- Industry technical references should supplement but not replace primary standards where user-facing claims touch law, safety, or certification.

## Asset plan

Asset rules:

- Original SIP Academy art only; no brand imitation, no logos, no generated text.
- Wide landscape art first for desktop/laptop; dedicated portrait variants for final mobile QA where composition needs them.
- All production images saved under `public/beyond-the-glass/<ecosystem>/`.
- WebP derivatives at 1600 and 960 widths initially; add 600/portrait variants when each scene is finalized.
- Node medallions live under `public/beyond-the-glass/<ecosystem>/nodes/`.
- Use clear safe zones for title rail, field nodes, and bottom navigation.

Initial Brewery asset:

- `brewery/brewery-opening-1600.webp`
- `brewery/brewery-opening-960.webp`

## QA standard before release

- Build and route smoke pass.
- Asset integrity: no LFS pointers, no broken public paths.
- Desktop/laptop visual QA: 1440×900 and 1024×768.
- Phone portrait and phone landscape visual QA: 390×844 and 844×390.
- Node controls: pointer, keyboard, focus, aria labels, previous/next/reset.
- Reduced motion: complete static study plates.
- Local preview first; production only after green release QA.
