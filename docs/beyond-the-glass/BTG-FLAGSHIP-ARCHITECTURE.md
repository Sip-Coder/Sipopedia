# Beyond the Glass Flagship Architecture

Date: July 30, 2026  
Pilot ecosystem: Wine — From Rain to First Sip  
Reusable destination: future SIP Academy beverage field trips

## Product promise

Beyond the Glass is a visual field trip, not a page of lessons. A student follows one persistent water drop through a complete working system, sees the physical choices that transform it, and sifts concise sommelier notes without losing the artwork.

The wine pilot establishes a reusable system for later brewery, distillery, coffee, and tea journeys without requiring those ecosystems to reuse the same pictures, pacing, or scene mechanics.

## Scene framework

Every primary stop uses four coordinated regions:

1. **Journey header** — stop number, checkpoint, and progress only.
2. **Cinematic canvas** — one contained, composition-safe visual with the water-drop protagonist and scene-specific motion.
3. **Study surface** — title, concise orientation copy, one active guide card or one active study card.
4. **Journey dock** — Back, Continue, progress, and secondary accessibility controls.

These regions occupy separate grid areas. Artwork, study cards, characters, and controls may visually relate to one another, but essential content never shares the same safe zone.

The Academy Plaza uses a separate hub composition. Wine is active; Brewery, Distillery, Coffee, Tea, and future journeys remain visibly forthcoming and non-interactive.

## Guide-note system

Sippy, Roma, and Hummin keep distinct roles:

- **Sippy** leads the route and connects each stop to the larger beverage system.
- **Roma** acts as a flavor detective and translates production evidence into sensory understanding.
- **Hummin** protects process memory, measurements, traceability, and system relationships.

Guide messages render as high-contrast paper field cards. The character sprite has its own column and never covers body copy. Short handwriting-inspired accents are paired with a highly readable instructional face.

Only one guide card and one study card are active at a time. Scroll progress can sift the deck; students can deliberately switch between Guide note and Study card. All essential messages wrap in full—no ellipses, clipping, or hidden endings.

## Responsive art variants

### Wide desktop

- Cinematic canvas and study surface sit side by side.
- Both guide and study material can remain visible when height allows.
- Persistent application navigation remains outside the BTG stage.

### Standard laptop

- Canvas and study surface remain side by side.
- The note switcher limits the study surface to one deck.
- Compact copy and vine-specific density rules protect the journey dock.

### Phone portrait

- Header, 16:9 artwork, study surface, and dock form a vertical sequence.
- Artwork uses a contained landscape frame instead of a cover crop.
- The note switcher shows one complete card at a time.
- The dock spans the stage width and uses short icon-plus-label accessibility controls.

### Phone landscape

- Canvas and study surface return to a two-column composition.
- Descriptive summary and nonessential card metadata collapse.
- Full guide messages remain visible; the dock stays below both columns.

Resizing preserves the current scene instead of recalculating the learner into a different stop.

## Motion vocabulary

Motion is selected by learning purpose:

- **Glide** for travel and commercial handoffs.
- **Push-in** for macro inspection and final sensory moments.
- **Orbit** for systems that benefit from spatial inspection, including the vine, barrel room, and restaurant planning.
- **Cutaway** for machinery, fermentation, chemistry, and anatomy.
- **Selective deconstruction/reassembly** only when component relationships are the lesson.
- **Card sift** for guide and study notes.

All motion is driven by normalized reversible progress. The reduced-motion path presents the same sequence and transcript without relying on transforms or animation.

## Curriculum modules

The main route remains a fast 22-stop story:

- Academy and regional context
- Water, roots, vine anatomy, and annual growth
- Harvest, crush, fermentation, and production divergence
- Lab work, maturation, barrel work, finishing, and sustainability
- Bottling, labeling, tasting, logistics, retail, restaurant buying, service, and the first sip

Specialist density belongs in reusable visual labs and field-note decks, including wine composition, faults, grape families and rootstocks, vineyard systems, and equipment. A future ecosystem can attach different labs to the same scene contract.

## Performance budget

- Opening and current-scene imagery are prioritized.
- The next scene is preloaded; below-the-fold and future-scene assets remain lazy.
- Production images use responsive WebP source sets, typically 960 px and 1600 px.
- Scene artwork uses `object-fit: contain` and composition-aware positions.
- Primary motion relies on transforms and opacity.
- No additional heavy animation runtime is required.
- New commercial-chain images remain below 200 KB at 1600 px and below 100 KB at 960 px.

## Quality gates

Before publication:

- No horizontal document overflow at phone portrait, phone landscape, laptop, or wide desktop.
- No guide card, study card, sprite, scene title, or dock collision.
- Every essential guide sentence is visible.
- Back, Continue, deck switching, saved progress, restart, captions, transcript, and reduced-motion paths remain operable.
- Every scene image resolves and has meaningful alternative text.
- Type checks, navigation policy, BTG voice tests, mobile QA, production build, asset checks, RGRD manifest verification, and route smoke tests pass.
