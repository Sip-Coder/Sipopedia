# Beyond The Glass — CSW Curriculum Coverage Audit

> Historical baseline audit. The route has since expanded to 20 stops. See
> `BTG-LEARNING-JOURNEY-AUDIT-2026-07-30.md` for the current implementation and resolved gaps.

Audit date: July 29, 2026
Experience reviewed: `/#app/btg`
Journey reviewed: **From Rain to First Sip**, 13 stops

## Executive finding

The current experience is a strong introductory lifecycle story. It clearly represents viticulture, still-wine production, and service, but it does not yet provide full Certified Specialist of Wine exam depth.

The correct expansion is not to turn every scene into a textbook page. Keep the 13-stop rain-to-first-sip route as the fast narrative spine, then add four kinds of optional depth:

1. **Visual laboratories** for chemistry and faults.
2. **Explorable vineyard field routes** for grape science and viticulture.
3. **Production forks** for sparkling and fortified wine.
4. **Passport/reference routes** for regions, laws, labels, health, and formal sensory work.

No learner-facing curriculum expansion should be published until the remaining content briefing is complete and the factual review described below has passed.

## Audit evidence

- All 13 local journey states were reviewed at a 1280 × 800 landscape viewport.
- The live route was checked for the same field notebook, vineyard, laboratory, and service content.
- The scene data, narration, field notes, source list, progress storage, and route normalizer were inspected.
- Existing valid reference destinations were confirmed:
  - `grapes`
  - `grapes/grapes`
  - `grapes/grains`
  - `regions`
  - `regions/wine`
- The journey already remembers the learner’s last scene through `sipopedia:btg:wine:last-scene:v1`.

## Existing 13-stop curriculum signals

| Stop | Current purpose | Strongest curriculum connection |
| --- | --- | --- |
| 01 Academy Plaza | Journey entry and future ecosystem map | Course orientation |
| 02 Meet the Field Team | Guide roles and learning lens | Study navigation |
| 03 Rain Finds the Roots | Water, soil, roots, irrigation | Chapter 4 Viticulture |
| 04 The Vine Builds a Berry | Trellising, canopy, light, airflow, pests | Chapters 3–4 Grape Varieties and Viticulture |
| 05 Harvest Run | Ripeness, acidity, weather, fruit condition, logistics | Chapters 4–5 Viticulture and Production |
| 06 Inside the Crush House | Sorting, destemming, crushing, pressing, skin contact | Chapter 5 Still Wine Production |
| 07 The Fermentation Hall | Yeast, sugars, ethanol, carbon dioxide, heat, cap management | Chapters 1 and 5 Chemistry and Production |
| 08 The Quality Lab | Sugar, pH, TA, SO₂, acidification, sensory judgment | Chapters 1–2 and 21 |
| 09 Time in the Cellar | Vessel, oxygen, lees, oak, faults | Chapters 2 and 5 |
| 10 The Bottling Run | Oxygen, hygiene, closure, label accuracy | Chapters 5 and 8 |
| 11 Into the Market | Origin, grape, vintage, price, storage, distribution | Chapters 8–20 |
| 12 The Table Handoff | Storage, glassware, temperature, hospitality, TCA response | Chapters 2 and 23 |
| 13 The First Sip | Connected sensory conclusion | Chapters 21–22 |

## Coverage map

“Clearly represented” means the topic is visibly taught in the current journey. It does not mean that the scene is already sufficient for CSW exam mastery.

### Unit 1 — Wine Composition and Chemistry

| Chapter | Current state | Evidence today | Best expansion location |
| --- | --- | --- | --- |
| 1. Wine Composition and Chemistry | **Partial** | Stops 7–8 mention grape sugar, ethanol, carbon dioxide, heat, pH, TA, SO₂, aroma, texture, and stability. | Add an optional **Inside the Glass** deconstruction laboratory launched from Stop 8. |
| 2. Wine Faults | **Partial** | Stop 9 names cork taint, reduction, oxidation, volatile acidity, and sulfur notes. Stop 12 shows a TCA service response. | Add Roma’s **Fault Detective** layer across Stops 9 and 12, with sensory clues and compound/source verification. |

### Unit 2 — Viticulture and Enology

| Chapter | Current state | Evidence today | Best expansion location |
| --- | --- | --- | --- |
| 3. Grape Varieties | **Partial** | Stop 4 uses a generic grapevine and berry but does not teach species, varieties, clones, mutations, crossings, hybrids, or rootstocks. | Add a **Vine Family Tree** field route at Stop 4, with a valid deep dive to `grapes/grapes`. |
| 4. Viticulture | **Clearly represented; not exam-complete** | Stops 3–5 cover water, roots, trellising, canopy, light, airflow, pests, ripeness, weather, fruit condition, and harvest decisions. | Expand Stops 3–5 into an optional **Explorable Vineyard** route rather than adding more main stops. |
| 5. Fermentation and Still Wine Production | **Clearly represented; not exam-complete** | Stops 5–10 form a coherent harvest-to-bottle still-wine sequence. | Add concise field notes for white/red/rosé paths, malolactic conversion, clarification, stabilization, filtration, blending, maturation, and final adjustments. |
| 6. Sparkling Wine Production | **Absent** | No pressure-retention or secondary-fermentation path exists. | Add an optional **Pressure Path** fork from Stop 7 that returns before Stop 10. |
| 7. Fortified Wine Production | **Absent** | No fortification timing or style path exists. | Add an optional **Fortification Fork** from Stops 7–9, then return to the core bottle route. |

### Unit 3 — Wine Labels, Laws, and Regions

| Chapter | Current state | Evidence today | Best expansion location |
| --- | --- | --- | --- |
| 8. Introduction to the World Wine Industry | **Partial** | Stop 11 mentions distribution, storage, price, language, trust, and choice. | Add a producer → importer → distributor → retailer/restaurant supply-chain field note at Stop 11. |
| 9. France | **Absent** | No country curriculum. | Add to a **World Wine Passport** launched from Stop 11 and linked to `regions/wine`. |
| 10. Italy | **Absent** | No country curriculum. | World Wine Passport. |
| 11. Spain | **Absent** | No country curriculum. | World Wine Passport. |
| 12. Portugal | **Absent** | No country curriculum. | World Wine Passport; cross-link fortified production where relevant. |
| 13. Germany | **Absent** | No country curriculum. | World Wine Passport; connect verified must-weight terminology where relevant. |
| 14. Central and Eastern Europe | **Absent** | No regional curriculum. | World Wine Passport. |
| 15. Eastern Mediterranean | **Absent** | No regional curriculum. | World Wine Passport. |
| 16. United States and North America | **Absent** | The journey’s visual setting is not a regional lesson. | World Wine Passport; introduce AVA only as a forward link from the vineyard/market. |
| 17. South America | **Absent** | No regional curriculum. | World Wine Passport. |
| 18. Australia and New Zealand | **Absent** | No regional curriculum. | World Wine Passport. |
| 19. Africa | **Absent** | No regional curriculum. | World Wine Passport. |
| 20. Asia | **Absent** | No regional curriculum. | World Wine Passport. |

Do not add twelve country lectures to the lifecycle scroll. Stop 11 should act as the narrative handoff to the existing wine-region system.

### Unit 4 — Wine Consumption and Service

| Chapter | Current state | Evidence today | Best expansion location |
| --- | --- | --- | --- |
| 21. Sensory Evaluation of Wine | **Partial** | Stops 8 and 13 reference sensory judgment, aroma, texture, and the first sip, but no repeatable tasting sequence exists. | Add Roma’s optional **Read the Glass** overlay at Stop 13 using the official SWE tasting-grid order. |
| 22. Impact of Alcohol on Health | **Absent** | The current journey does not address alcohol and health. | Add a concise, sourced **Responsible Enjoyment** field note at Stop 12 or 13; keep it separate from tasting promotion. |
| 23. Wine Etiquette and Service | **Clearly represented; not exam-complete** | Stop 12 covers storage, temperature, glassware, opening, presentation, language, and guest response. | Add service order, decanting rationale, sparkling service, bottle/closure contingencies, and responsible beverage service as compact optional notes. |

## Curriculum visual plan already authorized

### Chapter 1 — Inside the Glass

Anchor: **Stop 8, The Quality Lab**

Use one glass of wine as a reversible deconstruction:

1. Macro view from within the wine.
2. Pull outward to the complete glass.
3. Separate water, ethanol, acids, sugars, phenolics, and other volatile/nonvolatile constituents.
4. Let each component affect the perceived structure of the whole.
5. Reassemble into the glass and return to the laboratory scene.

Required field-note groups:

- **Acids:** tartaric, malic, citric, lactic, acetic, and succinic; pH must be distinguished from titratable acidity.
- **Sugars:** glucose and fructose first; sucrose only with correct grape/wine context; sweetness must not be treated as a synonym for body.
- **Phenolics:** anthocyanins, flavanols, tannins, vanillin, and resveratrol, with their categories and origins stated accurately.
- **Other constituents:** aldehydes, esters, dissolved gases, and sulfites, without implying that all belong to one chemical class.

Accuracy cautions:

- Residual sugar can contribute weight and viscosity, but body also depends on alcohol, glycerol, extract, acidity, tannin, carbon dioxide, and style.
- Vanillin is a phenolic aldehyde often associated with oak influence; it should not be presented as equivalent to grape anthocyanins or tannins.
- Sulfites require a clear distinction between sulfur dioxide forms, protective use, legal limits, and possible sensory effects.

### Chapter 2 — Roma’s Fault Detective

Anchors: **Stop 9, Time in the Cellar** and **Stop 12, The Table Handoff**

Use a sensory-diagnosis layer, not a “bad smell equals one compound” quiz. Each clue should show:

1. Sensory description.
2. Likely compound or process.
3. Common confusion or alternate cause.
4. Prevention/response context.
5. Whether the character is always a fault, concentration-dependent, or intentional in a specific style.

Required verified coverage:

- 2,4,6-trichloroanisole (TCA)
- sulfur dioxide
- hydrogen sulfide
- thiols/mercaptans and related disulfides
- acetic acid and volatile acidity
- butyric acid
- lactic acid and lactic spoilage context
- ethyl acetate
- Brettanomyces/Dekkera-associated compounds
- leafy or under-ripe green characters
- oxidation
- maderization
- moldy, rubbery, wet-cardboard, yeasty, and reductive descriptors

Accuracy cautions:

- Sulfur dioxide is not automatically a fault.
- Acetic and lactic acids are normal wine constituents; fault status depends on concentration, context, and microbial/process origin.
- “Green” or leafy character may be varietal or ripeness-related rather than a defect.
- “Yeasty” can be desirable in lees-aged or sparkling styles.
- Maderization is an intentional oxidative/heating character in Madeira but a defect when unintended in other styles.

### Chapter 3 — Vine Family Tree

Anchor: **Stop 4, The Vine Builds a Berry**

Build an explorable family-tree/cutaway sequence:

- `Vitis vinifera` as the primary wine-grape species.
- `Vitis labrusca`, `Vitis riparia`, `Vitis aestivalis`, and `Vitis rupestris` in correct species/rootstock context.
- Varieties/cultivars, subspecies where curriculum-relevant, clones, bud mutations/sports, crossings, and interspecific hybrids.
- Scion and rootstock shown as one grafted vine.
- Phylloxera pressure shown at the root zone without implying that every American species or rootstock has identical resistance.

The accepted spellings above are confirmed by the Royal Botanic Gardens, Kew taxonomic backbone. Rootstock resistance and site matching still require viticulture-specific sourcing.

#### Context-sensitive reference detours

- A grape-species, variety, clone, crossing, hybrid, rootstock, or vineyard note may offer **Explore Grapes & Grains: Grapes**, navigating to `grapes/grapes`.
- A future cereal/grain agricultural note may offer **Explore Grapes & Grains: Grains**, navigating to `grapes/grains`.
- Do not show the grains detour in a grape-only wine field note merely because the destination exists.
- Before leaving the adventure, save `{ route: "beyond-the-glass", sceneId }` in a dedicated session handoff key.
- The destination page should show one clear **Return to Beyond the Glass** control only when that handoff exists.
- Returning should restore the stored scene through the existing BTG progress system and clear the temporary handoff.
- Use the existing `onNavigate` flow. Do not create query-only pseudo-routes or buttons to unverified detail slugs.

### Chapter 4 — Explorable Vineyard

Anchors: **Stops 3–5**

Keep the main route energetic. Add a side route with layered, deconstructed vine and canopy scenes.

#### Vine anatomy and annual cycle

- Trunk, arms/branches, cordons, spurs, canes, shoots, leaves, tendrils, inflorescences, and clusters.
- Bud break, flowering/bloom, fruit set/berry set, veraison, ripening, and harvest.
- Photosynthesis, chlorophyll, respiration, transpiration, and translocation.
- Sugar, acid, flavor/aroma precursor, and phenolic development during ripening.
- Temperature effects on development, respiration, fruit set, and heat/frost injury.

#### Site, climate, and terroir

- Macroclimate, mesoclimate, and microclimate with edition-specific definitions.
- Weather versus climate.
- Temperature, precipitation, humidity, fog, and wind.
- Clay, silt, sand, and gravel as texture/physical components, avoiding unsupported “soil equals flavor” claims.
- Latitude, elevation, topography, aspect, proximity to water, and diurnal temperature patterns.
- Maritime, Mediterranean, and continental climate patterns.
- AVA, DOC, and related boundaries only as an introductory bridge to the law/region route.

#### Diseases, pests, and physical pressure

- Bacterial versus fungal disease context.
- `Botrytis cinerea`, including harmful bunch rot and style-specific noble-rot context.
- Phylloxera and grafted resistant rootstocks.
- High-value pest examples selected from regionally appropriate extension sources, such as leafhoppers, mealybugs, grape berry moth/leafrollers, mites, sharpshooters, and grapevine moths where relevant.
- Wildlife pressure from birds, deer, and wild pigs.
- Frost, hail, heat/sunburn, smoke, and water stress.
- Prevention and integrated management principles rather than pesticide prescriptions.

#### Grower practice and canopy architecture

- Dormant pruning and canopy management.
- Cane versus spur pruning.
- Bush/head training, Guyot, cordon, pergola, and vertical shoot positioning (VSP).
- Grafting/rootstock selection, irrigation/water stress, shoot positioning, leaf removal, crop thinning/green harvest, and yield balance.
- A deconstructed parallax vine should make each training system visually distinct instead of relying on labels alone.

#### Ripeness and measurement conclusion

- Brix/soluble solids, pH, titratable acidity, flavor development, seed/skin maturity, and phenolic ripeness.
- Oechsle and Klosterneuburger Mostwaage (KMW), with definitions and conversion caveats verified before display.
- Harvest remains a multi-factor decision; no single reading should be presented as “the” definition of ripeness.

## Factual review gates

The following claims need explicit source-level review before learner-facing publication:

1. The exact 2026 CSW chapter scope and terminology. The exam draws exclusively from the applicable CSW Study Guide edition.
2. Acid roles, concentration ranges, pH versus TA, and acidification/deacidification rules.
3. Sugar classification, sucrose context, sweetness categories, and body wording.
4. Phenolic taxonomy and the source/role of vanillin and resveratrol.
5. Free, bound, molecular, and total SO₂ distinctions and jurisdiction-specific limits.
6. Fault descriptors and thresholds. Avoid one-to-one aroma diagnoses where multiple causes exist.
7. Taxonomy and pedagogical relevance of each `Vitis` species, subspecies, clone, mutation, crossing, and hybrid.
8. Rootstock resistance, parentage, soil/site suitability, and phylloxera terminology.
9. Macro-, meso-, and microclimate definitions used by the selected CSW edition.
10. Regional disease/pest examples and management recommendations.
11. Brix, Oechsle, and KMW definitions, units, and approximate conversions.
12. AVA, DOC, and other wine-law definitions, which are jurisdiction- and edition-sensitive.
13. Current alcohol-and-health guidance, standard-drink definitions, and responsible-service language.

## Primary source set for factual development

- [Society of Wine Educators — Certified Specialist of Wine](https://societyofwineeducators.org/education-certifications/certified-specialist-of-wine/)
- [Society of Wine Educators — Wine Tasting Grid](https://societyofwineeducators.org/wp-content/uploads/SWE%E2%80%94Wine-Tasting-Grid-to-Accompany-the-CSW.pdf)
- [OIV — Compendium of International Methods of Wine and Must Analysis](https://oiv.int/standards/compendium-of-international-methods-of-wine-and-must-analysis)
- [OIV — Definitions and sugar categories for wine](https://www.oiv.int/de/node/146)
- [Australian Wine Research Institute — Wine flavours, faults and taints](https://www.awri.com.au/industry_support/winemaking_resources/sensory_assessment/recognition-of-wine-faults-and-taints/wine_faults/)
- [UC Davis — Viticulture and grape growing information](https://wine.ucdavis.edu/viticulture-grape-growing-information)
- [UC IPM — Grape phylloxera](https://ipm.ucanr.edu/agriculture/grape/grape-phylloxera/)
- [UC IPM — Botrytis bunch rot](https://ipm.ucanr.edu/agriculture/grape/botrytis-bunch-rot/)
- [Oregon State University Extension — Establishing a vineyard](https://extension.oregonstate.edu/catalog/em-8973-establishing-vineyard-oregon-quick-start-resource-guide)
- [Royal Botanic Gardens, Kew — Accepted Vitis species](https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A325876-2)
- [Austrian Wine — KMW reference](https://www.austrianwine.com/fileadmin/user_upload/PDF/Broschueren/7_Elemente_DE_202405_web.pdf)
- [NIAAA — Alcohol and the Human Body](https://www.niaaa.nih.gov/alcohols-effects-health/alcohol-topics-z/alcohol-facts-and-statistics/alcohol-and-human-body)

## Recommended build order

1. Finish collecting and reconciling the user’s CSW content briefing.
2. Lock the edition-specific source matrix.
3. Build Chapter 4’s Explorable Vineyard first because it strengthens existing Stops 3–5 without disrupting the story.
4. Add Chapter 3’s Vine Family Tree and tested Grapes/Grains detour/return pattern.
5. Add Chapter 1’s Inside the Glass laboratory.
6. Add Chapter 2’s Fault Detective layer.
7. Add remaining production, world-passport, sensory, health, and service side routes.
8. Test landscape, mobile, reduced motion, keyboard navigation, return context, source links, and performance.
9. Run factual/editorial review.
10. Publish only after the curriculum briefing and factual review are complete.
