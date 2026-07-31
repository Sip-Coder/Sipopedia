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
