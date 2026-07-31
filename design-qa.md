# Beyond the Glass Design QA

Status: Passed

Final result: passed

## Visual target

- Reference: `C:\Users\TwoKn\Desktop\Sip Academy 02.png`
- Implementation capture: `C:\Users\TwoKn\Documents\Codex\btg-academy-plaza-desktop.png`
- Side-by-side comparison: `C:\Users\TwoKn\Documents\Codex\btg-design-qa-comparison.png`

## Findings

- The complete SIP Academy composition remains centered and visible; no academy landmark is cropped from the plaza view.
- The active Wine journey is visually dominant without changing the source artwork’s circular plaza, waterways, or architectural hierarchy.
- Brewery, Distillery, Coffee ecosystem, Tea ecosystem, and future journeys remain visible and are explicitly marked as forthcoming.
- The sunrise introduction uses approved adult Sippy and Roma references and the approved Hummin robot language.
- Scene art uses landscape-first `contain` framing so important edges remain visible rather than being cover-cropped.
- Guide dialogue uses high-contrast paper notes with dark handwriting-style display text and readable supporting copy.
- Longer production details remain in expandable field notes and the field notebook instead of covering the main visual.
- Desktop, portrait mobile, and short landscape layouts have no document-level horizontal overflow.

## Adjustments made during QA

- Replaced the youthful opening artwork with clearly adult Sippy and Roma character treatment.
- Moved portrait scene framing upward so the full landscape image sits below the compact header rather than behind the lower note stack.
- Reduced overlays in short landscape mode to one guide note plus concise scene copy.
- Kept the active academy landmark glow motion while disabling it for reduced-motion users.

## July 29 mobile and crush-house correction

- User reference: `C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\.codex-remote-attachments\019f825f-f49a-7c40-adb0-1dc18d096e82\0d147890-c434-48c0-bcc7-a1da50bbc0e7\1-Photo-1.jpg`
- Updated implementation capture: `C:\Users\TwoKn\AppData\Local\Temp\sipopedia-btg-visual-qa\crush-house-mobile-after.png`
- Direct comparison: `C:\Users\TwoKn\AppData\Local\Temp\sipopedia-btg-visual-qa\crush-house-before-after.png`
- The unrelated portrait-style crush-house artwork was replaced with a complete SIP Academy production-floor illustration showing grape intake, sorting, destemming, separated stems, must, pressing, pumps, adult workers, and Hummin.
- At 390 × 844, the scene artwork is now fully visible above compact two-column story overlays. The old stacked text treatment occupied most of the screen; the revised overlay occupies less than 36% of stage height.
- Guide narration remains readable on a paper layer, while the first field-note title remains visible and its longer detail stays available in the field notebook below the cinematic stage.
- The same compact treatment was visually checked on “Rain Finds the Roots,” “Harvest Run,” and “Inside the Crush House.”
- Automated mobile QA passed all 104 viewport-and-scene states, including the new maximum-overlay-height regression guard.

## July 29 composition-blending refinement

- Before capture: `C:\Users\TwoKn\AppData\Local\Temp\sipopedia-btg-blend-qa\crush-house-before-blend.png`
- Final capture: `C:\Users\TwoKn\AppData\Local\Temp\sipopedia-btg-blend-qa\crush-house-after-blend-final-v2.png`
- Direct comparison: `C:\Users\TwoKn\AppData\Local\Temp\sipopedia-btg-blend-qa\crush-house-before-after-blend.png`
- The former mobile layout split the title, guide dialogue, and field note into three independent rectangles. The revised layout uses one cinematic story panel with the parchment dialogue and field-note label joined into a single overlapping strip.
- Landscape artwork now fades into the dark stage instead of ending as a hard isolated block. The water-drop protagonist visually bridges the artwork and the story panel.
- The title and guide strip no longer overlap at 360 × 800. “Rain Finds the Roots,” “Inside the Crush House,” and “Time in the Cellar” were included in the automated regression pass.
- Automated mobile QA passed all 104 viewport-and-scene states after the refinement.

## July 29 continuous-scene refinement

- Previous capture: `C:\Users\TwoKn\AppData\Local\Temp\sipopedia-btg-blend-qa\crush-house-after-blend-final-v2.png`
- Final capture: `C:\Users\TwoKn\AppData\Local\Temp\sipopedia-btg-blend-qa-2\crush-house-continuous-after.png`
- Direct comparison: `C:\Users\TwoKn\AppData\Local\Temp\sipopedia-btg-blend-qa-2\crush-house-before-after-continuity.png`
- The contained landscape artwork now supplies a softly blurred, dimmed continuation behind the water drop, title, and joined paper note. The full production-floor composition remains visible while the letterboxed area inherits the same color and architectural detail instead of becoming a separate black block.
- The primary artwork and the background continuation crossfade together between scenes. Active scene images load eagerly once their chapter becomes current, preventing a fast scroll from briefly showing the preceding scene.
- At 390 × 844, “Inside the Crush House” reads as one visual composition from artwork through field notes, while the educational overlay remains compact and legible.
- Automated mobile QA passed all 104 viewport-and-scene states after the continuous-scene refinement.

## July 31 interactive field-atlas release pass

- User mobile reference: `C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\.codex-remote-attachments\019f825f-f49a-7c40-adb0-1dc18d096e82\0d147890-c434-48c0-bcc7-a1da50bbc0e7\2-Photo-2.jpg`
- Final mobile rain-and-roots capture: `C:\Users\TwoKn\Documents\Codex\btg-field-atlas-qa\rain-phone-390x844-final.png`
- Direct mobile comparison: `C:\Users\TwoKn\Documents\Codex\btg-field-atlas-qa\rain-mobile-before-after.png`
- Final desktop vine-anatomy capture: `C:\Users\TwoKn\Documents\Codex\btg-field-atlas-qa\vine-desktop-1440x900.png`
- Final mobile vine-anatomy capture: `C:\Users\TwoKn\Documents\Codex\btg-field-atlas-qa\vine-phone-390x844.png`
- Final laptop field-atlas capture: `C:\Users\TwoKn\Documents\Codex\btg-field-atlas-qa\harvest-laptop-full-1024x768.png`
- Final phone-landscape guide capture: `C:\Users\TwoKn\Documents\Codex\btg-field-atlas-qa\two-regions-phone-landscape-844x390.png`
- All substantive main-path stops now expose their visual clues as keyboard-accessible field-atlas buttons. A selected clue receives visual focus while its explanation appears in a reserved study panel outside the art.
- The vine-anatomy stop uses the complete landscape composition on desktop and a dedicated portrait reflow on phones. Roots, canopy, title rail, selector, selected detail, and journey dock remain visible without the former black side gutters or clipped labels.
- Mobile “Rain Finds the Roots” now uses the complete landscape study plate instead of constraining a portrait asset inside a shallow landscape slot. This keeps the full vine/root composition visible and removes the empty side bars.
- Selected study notes and guide cards are mutually exclusive on compact layouts, preventing narration, content, sprites, and the journey dock from obscuring one another.
- Sippy, Roma, and Hummin use a calm pet-like idle cadence with brief occasional gestures; the jump loop was removed. Reduced-motion users retain still guide art.
- Full 22-stop in-app traversal passed at 1440 × 900 desktop, 1024 × 768 laptop, 390 × 844 phone portrait, and 844 × 390 phone landscape.
- The traversal found zero document overflow, off-canvas nodes, node collisions, guide/dock collisions, broken images, or clipped essential text at all four target viewports.
- Pointer selection, explicit Enter activation, selected-state announcement, previous/next node controls, and Overview reset were checked on both the generic field atlas and the custom vine anatomy study.
- Browser console error check returned no errors on the final local preview.

## July 31 production phone-node correction

- A final production measurement found four vine-anatomy touch targets sharing a few pixels at the narrowest portrait breakpoint even though their labels remained hidden.
- The phone composition now gives all fourteen anatomy nodes deliberate, evenly spaced perimeter positions around the intact vine rather than compressing the desktop exploded coordinates.
- The focused node uses a restrained scale on phones, keeping its touch target prominent without colliding with neighboring layers.
- Re-checking the portrait atlas found all fourteen buttons inside the viewport with zero target overlap, zero broken images, and no horizontal document overflow.

## July 31 mobile three-zone navigation correction

- Source visual truth: `C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\.codex-remote-attachments\019f825f-f49a-7c40-adb0-1dc18d096e82\d7f816ab-88a6-4ea9-9622-550b37a7885b\1-Photo-1.jpg` (596 × 1280 source pixels, live phone state).
- Browser-rendered implementation: `C:\Codebase\actual\Sipopedia\qa\btg-mobile-after-390x700.png` (390 × 700 pixels, 390 × 700 CSS viewport, DPR 1, local Tasting Room Flight guide-note state).
- Normalized full-view comparison: `C:\Codebase\actual\Sipopedia\qa\btg-mobile-before-after.png`. The source application region was cropped to 533 × 996 and normalized to 375 × 700 beside the 390 × 700 implementation.
- Focused card/navigation comparison: `C:\Codebase\actual\Sipopedia\qa\btg-mobile-dock-before-after.png`.

### Comparison history

- Earlier P0: the two-row journey dock occupied the active note-card area on short phone viewports, masking essential copy and intercepting taps.
- Earlier P1: scene art, heading, and notes were visually stacked but did not have protected grid space; long guide notes overflowed the story panel and collided with navigation.
- Fix: mobile portrait now reserves three uninterrupted content zones—scene art, scene heading, and note deck—plus a separate 3.35rem route rail. Compact Back and Next controls, the current-stop label, and Field Kit each receive their own grid track.
- Fix: optional Listen, Captions, and Notebook controls replace the route rail only when Field Kit is deliberately opened; they no longer float over the active card. Changing scenes closes Field Kit automatically.
- Fix: short-phone headings use a two-line description limit while preserving the full title, and guide/study cards use their reserved note area with readable internal overflow only when content genuinely exceeds it.
- Post-fix evidence: at 390 × 700, the active guide card ends at 609.6px and the dock begins at 624.3px. Back, Next, and Field Kit are unobstructed 45.2px-high touch targets. Their center-point hit tests resolve to the intended button.

### Required fidelity surfaces

- Fonts and typography: the existing SIP display and body faces are preserved. The scene heading remains the primary mobile title; dock typography is deliberately secondary and the redundant dock title may truncate only after the full title has already appeared above.
- Spacing and layout rhythm: art, heading, notes, and navigation have independent rows with visible separation. No content or controls overlap at 360 × 640, 390 × 700, 390 × 844, 844 × 390, 1024 × 768, or 1440 × 900.
- Colors and tokens: the existing forest, water-blue, cream-paper, and brass states are unchanged; the compact Field Kit uses the same dock tokens and focus treatment.
- Image quality and asset fidelity: scene artwork and character assets are unchanged, fully visible in their existing responsive art direction, and no generated or placeholder assets were introduced.
- Copy and content: full guide-note copy remains visible in the tested Tasting Room Flight state. Study-card copy remains readable in the Bottle Passport and Protected Journey states.

### Interaction and accessibility checks

- Back, Next, and Field Kit were exercised in the in-app browser. Next advanced from Tasting Room Flight to The Protected Journey, and Field Kit opened and closed without covering the note card.
- Field Kit exposes `aria-expanded` and `aria-controls`; the full Back/Next accessible names continue to announce their destination even though the visible mobile labels are compact.
- Document-level horizontal overflow: none at every tested breakpoint.
- Broken scene images: zero in the tested phone, landscape, laptop, and desktop states.
- Browser console errors: zero on the final local preview.
- Reduced-motion behavior remains unchanged; this correction does not introduce new motion.

Final result: passed

## July 31 sommelier book-page card restoration

- Source visual truth: `C:\Codebase\actual\Sipopedia\qa\btg-mobile-after-390x700.png` (375 × 673 captured pixels from the previously accepted 390 × 700 Tasting Room Flight guide-card state) plus the user's explicit requirement that guide notes and study cards turn like pages while scrolling forward and backward.
- Browser-rendered settled implementation: `C:\Codebase\actual\Sipopedia\qa\btg-card-turn-mobile-settled.png` (375 × 679 captured pixels at a 390 × 700 CSS viewport, DPR 1).
- Density-normalized implementation: `C:\Codebase\actual\Sipopedia\qa\btg-card-turn-mobile-settled-375x673.png` (375 × 673 pixels).
- Full-view comparison evidence: `C:\Codebase\actual\Sipopedia\qa\btg-card-turn-before-after.png` (750 × 673 pixels, source and normalized implementation shown together).
- Motion-state evidence: `C:\Codebase\actual\Sipopedia\qa\btg-card-turn-mobile-mid.png`, `C:\Codebase\actual\Sipopedia\qa\btg-card-turn-desktop-mid.png`, `C:\Codebase\actual\Sipopedia\qa\btg-card-turn-phone-landscape.png`, and `C:\Codebase\actual\Sipopedia\qa\btg-card-turn-manual-mid.png`.
- State: Tasting Room Flight, settled Roma guide card and guide-to-study/page-sifting transitions.

### Comparison history

- Earlier P1: the responsive scene split preserved the paper styling but later cascade rules hid inactive cards and converted the deck to one flat relative card, removing the visible stacked-page and page-turn behavior.
- Fix: inactive but non-interactive cards remain visually present beneath the active card, with screen-reader-hidden content and pointer events disabled. Their scroll-bound transforms now pivot around the left edge with perspective, depth, paper shadows, and reversible forward/backward motion.
- Fix: guide and study decks alternate throughout each scene using opposing page-turn transforms. Manual Guide note and Study card controls retain a slower authored turn, while reduced-motion users receive a complete static card.
- Fix: the page faces are absolutely sized by the reserved note region. Portrait and short-landscape containers clip decorative page overhang inside that region, preventing the animation from covering the lesson header or journey dock.
- Post-fix evidence: forward scrolling changed the Tasting Room Flight deck from guide at local progress 0.5663 to study at 0.6979; reverse scrolling restored guide. Manual deck selection also reached the requested destination without overlap.

### Required fidelity surfaces

- Fonts and typography: existing SIP Academy display, handwriting accent, and highly readable body faces remain unchanged. Settled card text is fully legible; partial occlusion occurs only during the purposeful page-turn transition.
- Spacing and layout rhythm: the accepted photo, header, note-card, and compact navigation zones remain intact. Note/deck collision checks passed at 360 × 640 portrait, 844 × 390 phone landscape, 1024 × 768 laptop, and 1440 × 900 desktop.
- Colors and tokens: the existing cream paper, botanical green, brass, ruled-line, and water-blue focus treatments are preserved.
- Image quality and asset fidelity: all existing winery artwork and guide sprites remain unchanged; the restoration uses the authored card assets already present in the interface and introduces no placeholders.
- Copy and content: full Roma guide copy and all Tasting Room Flight study-card content remain available. Hidden cards are removed from the accessibility tree until active.

### Interaction and accessibility checks

- Scroll forward and backward both update the deck and reverse the same page-turn sequence.
- Guide note and Study card controls were activated in the in-app browser; the selected deck remained keyboard-accessible and did not collide with navigation.
- Reduced-motion rules remove card/deck transitions and hide inactive visual pages.
- Document-level horizontal overflow: none at the four tested responsive targets.
- Broken images: zero in the tested states.
- Focused crop was not required because the full comparison presents the complete native-width card and dock at readable scale; separate mid-turn captures document the interaction state.

Final result: passed

## July 31 guide-card centering and spacing correction

- Source visual truth: `C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\.codex-remote-attachments\019f825f-f49a-7c40-adb0-1dc18d096e82\d7f816ab-88a6-4ea9-9622-550b37a7885b\3-Photo-3.jpg` (1200 × 1200 source photograph; focused crop uses the narrow BTG browser preview and its hovering Roma field-note card).
- Browser-rendered implementations: `C:\Codebase\actual\Sipopedia\qa\btg-guide-card-spacing\after-phone-320x568.png`, `after-phone-390x700.png`, `after-phone-landscape-844x390.png`, `after-laptop-1024x768.png`, and `after-desktop-1440x900.png` (matching CSS viewports, DPR 1).
- Full-view normalized comparison: `C:\Codebase\actual\Sipopedia\qa\btg-guide-card-spacing\source-vs-after.png` (focused source crop and the 390 × 700 browser implementation normalized side by side).
- Motion-state evidence: `C:\Codebase\actual\Sipopedia\qa\btg-guide-card-spacing\page-turn-phone-390x700.png` and `study-card-phone-390x700.png`.
- State: representative Hummin and Roma guide notes, study-card view, and guide-to-study page turn across Crush House, Quality Lab, and Barrel Room scenes.

### Comparison history

- Earlier P1: the negative character offset placed the guide image 12.4px above the active paper card at 390 × 700. The page-turn safety clipping therefore removed part of the sprite instead of letting the full character hover on the paper.
- Earlier P2: guide copy occupied the top of a stretched ruled card while a large unused region remained below it; laptop cards also left the note counter stranded above a large unstructured gap.
- Fix: each guide now occupies a vertically centered, reserved character rail inside the paper boundary. Sippy, Roma, and Hummin retain their calm hover animation, but their full image remains inside the turning page at every checked viewport.
- Fix: the guide body and study card now use the complete paper height intentionally. Mobile copy is vertically balanced; laptop/desktop note counters and card controls anchor to the bottom rule rather than floating above unused space.
- Fix: compact phones use a shorter scene rail, one-line visual-lab label, tighter paper header, and a proportionate character rail. This increased the 320 × 568 active paper area from 88.8px to 160.1px while keeping the sprite and full message visible.
- Post-fix evidence: sprite containment passed at 320 × 568, 360 × 640, 390 × 700, 844 × 390, 1024 × 768, and 1440 × 900. The guide paragraph no longer requires internal scrolling in the checked states, and the page turn remains visible in both directions.

### Required fidelity surfaces

- Fonts and typography: the established handwriting accent, SIP display face, and readable companion body type are unchanged. Essential guide messages wrap without ellipsis; the smallest phone uses the compact speaker heading only where vertical space is genuinely constrained.
- Spacing and layout rhythm: image, heading, note deck, and journey dock retain separate safe zones. The character rail, copy, counter, and controls now use the ruled-paper area as one composed card rather than unrelated top-aligned fragments.
- Colors and tokens: cream paper, ruled blue lines, botanical/brass accents, shadows, pin, and focus states remain consistent with the accepted sommelier note-card direction.
- Image quality and asset fidelity: the approved animated character assets are reused at their natural proportions. No sprite is cropped, stretched, substituted, or replaced.
- Copy and content: the complete Roma and Hummin messages are visible in the tested guide states; the study card retains its full title, detail, card count, and previous/next controls.

### Interaction and accessibility checks

- Guide note and Study card controls were activated in the in-app browser. The 520ms manual page turn and settled study-card state both remained inside the protected note region.
- The guide image stays `aria-hidden`, while authored message copy and card navigation remain available to assistive technology.
- Reduced-motion behavior is preserved: motion rules still disable transitions and hide inactive visual pages.
- Document-level horizontal overflow: none at all six checked responsive sizes.
- Browser console warnings/errors: zero on the final local preview.
- Production build, navigation policy tests, accent-specific voice tests, and security guard tests passed.

Final result: passed

## July 31 continuous note-deck spacing correction

- Source visual truth: `C:\Users\TwoKn\AppData\Local\Temp\codex-clipboard-58814b4c-36a1-43a4-b32c-c87f5372e7bf.png` (450 × 374 pixels), showing the unintended empty band between the Guide note / Study card selector and Hummin's paper card.
- Browser-rendered implementation: `C:\Codebase\actual\Sipopedia\qa\btg-guide-card-spacing\after-gap-settled-390x700.png` (375 × 673 captured pixels at a 390 × 700 CSS viewport, DPR 1).
- Focused normalized comparison: `C:\Codebase\actual\Sipopedia\qa\btg-guide-card-spacing\gap-before-after.png`. The implementation's selector-and-card region was cropped from the full browser capture and scaled to the source height for a direct vertical-rhythm comparison.
- Additional responsive evidence: `after-gap-390x700.png`, `after-gap-844x390.png`, and `after-gap-1440x900.png` in the same QA folder.
- State: The Finishing Bench and adjacent cellar scenes, with manual settled guide/study cards plus reversible scroll-driven page turns.

### Comparison history

- Earlier P1: the reference showed roughly 149 pixels of empty dark space after the deck selector before the authored paper began, making the card feel disconnected and wasting most of the study area.
- Root cause: the story panel's flexible remainder could behave as an unstructured vertical region, and selecting a deck retained fractional scroll progress that could leave an individual page visibly half-turned.
- Fix: the story panel now owns three explicit rows—lesson heading, deck selector, and a `minmax(0, 1fr)` paper deck. The guide and study pages fill the immediately adjacent third row from top to bottom.
- Fix: manually selecting Guide note or Study card now snaps the visible page to its nearest complete card. Scroll-driven turns remain continuous and reversible, but an intentional tap never strands the reader on a fractional page.
- Post-fix evidence: the settled selector-to-paper separation is 3.52 pixels at 390 × 700, with no document-level horizontal overflow. Scroll sampling found no positive empty-band regression during forward or reverse page turns.

### Required fidelity surfaces

- Fonts and typography: no type family, weight, line-height, or hierarchy changed. Guide handwriting accents and readable instructional copy remain intact.
- Spacing and layout rhythm: the paper begins immediately below the two deck controls. Heading, selector, paper, and compact journey rail retain distinct safe zones without an artificial blank panel.
- Colors and tokens: the existing cream paper, ruled lines, botanical/brass selection state, and water-blue focus outline are unchanged.
- Image quality and asset fidelity: approved Roma and Hummin assets remain at their authored proportions and fully contained on the paper.
- Copy and content: complete guide messages and study-card content remain visible; manual deck selection now resolves to a complete page rather than a partial transition state.

### Interaction and accessibility checks

- Guide note and Study card were activated at 390 × 700. Both settled with an identity transform and a 3.52-pixel selector-to-paper rhythm.
- Responsive checks covered 320 × 568 portrait, 390 × 700 portrait, 844 × 390 phone landscape, 1024 × 768 laptop, and 1440 × 900 desktop. Sprite containment and zero horizontal overflow passed in all five states.
- The scrolling page-turn sequence still alternates guide and study decks and reverses with reverse scrolling. Reduced-motion behavior is unchanged.

Final result: passed

## July 31 guide-motion timing correction

- User timing decision: Sippy, Roma, and Hummin should change between idle and authored reaction states every 0.5 seconds.
- Implementation: every guide now uses a 500-millisecond idle pause followed by a 500-millisecond reaction window. The reaction wrapper also completes in 500 milliseconds, keeping the state timing synchronized.
- Idle frames continue to use the approved still artwork between reactions, avoiding a second uncontrolled animation beneath the requested half-second cadence.
- Accessibility: the existing reduced-motion path still selects the still asset and collapses animation/transition duration to a single effectively static frame.

Final result: passed
