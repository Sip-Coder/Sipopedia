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
