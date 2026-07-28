# Sip Game Appbar, Fullscreen, and Checkpoint Modal Design QA

## Comparison Targets

### Light Sip Studies emblem (latest)

- Source visual truth: `DUMP IN/Logo/Sip Studies Logo 03 - Light.png`
- Normalized source crop: `design-qa-assets/sip-appbar-light-logo-reference-normalized.png`
- Focused implementation screenshot: `design-qa-assets/sip-appbar-light-logo-implementation-focus.png`
- Full implementation screenshot: `design-qa-assets/sip-appbar-light-logo-implementation-full.jpg`
- Combined comparison: `design-qa-assets/sip-appbar-light-logo-comparison.png` (normalized source left, rendered implementation right)
- Route: `http://127.0.0.1:5100/#app/sip-game`
- Viewport: 639 × 910 CSS px at device pixel ratio 1 for the full implementation capture.
- Pixel dimensions: original source 1728 × 1728 px; optimized runtime asset 256 × 256 px; normalized source 33 × 33 px; focused implementation 33 × 33 px; full implementation 624 × 889 px.
- Density normalization: the source was downsampled to the 33 × 33 px in-app capture size. The implementation crop accounts for the in-app capture surface scaling from the 34 × 34 CSS px mobile slot. Neither comparison image was enlarged.
- State: Sip Game page, navigation drawer closed, normal appbar.
- Comparison intent: replace only the dark round emblem with the user-supplied light mint-and-gold Sip Studies emblem while retaining the Sip Studies script wordmark, header geometry, navigation behavior, and accessible name.

### Appbar logo cleanup

- Source visual truth: `design-qa-assets/sip-appbar-logo-reference.png`
- Focused implementation screenshot: `design-qa-assets/sip-appbar-logo-implementation-focus.png`
- Full implementation screenshot: `design-qa-assets/sip-appbar-logo-implementation-full.jpg`
- Combined comparison: `design-qa-assets/sip-appbar-logo-comparison.png` (reported state left, implementation right)
- Route: `http://127.0.0.1:5100/#app/sip-game`
- Viewport: 639 × 910 CSS px for the full implementation capture; focused comparison region 270 × 81 px.
- Pixel dimensions: source 270 × 81 px; focused implementation 270 × 81 px; full implementation 624 × 889 px.
- Density normalization: source and focused implementation are equal-sized 1:1 crops with no resizing. The browser viewport used device pixel ratio 1; the in-app browser capture surface was 624 × 889 px.
- State: Sip Game page, navigation drawer closed, normal appbar.
- Comparison intent: the source is the reported pre-change state. The implementation intentionally removes the `Sipopedia` subtitle while retaining the existing round Sip Studies emblem and Sip Studies script wordmark.

### Recall-entry removal

- Source visual truth: `design-qa-assets/sip-game-no-recall-field-reference.png`
- Focused implementation screenshot: `design-qa-assets/sip-game-no-recall-field-implementation.jpg`
- Full implementation screenshot: `design-qa-assets/sip-game-no-recall-field-full.jpg`
- Combined comparison: `design-qa-assets/sip-game-no-recall-field-comparison.jpg` (reported state left, implementation right)
- Route: `http://127.0.0.1:5100/#app/sip-game`
- Viewport: 1920 × 1080 CSS px for the expanded full view; focused comparison region 608 × 357 px.
- Pixel dimensions: source 608 × 357 px; focused implementation 608 × 357 px; full implementation 1920 × 1080 px.
- Density normalization: source and focused implementation are equal-sized 1:1 crops; no resizing was used.
- State: Level 1, Winery, `Vine Training` checkpoint briefing open in expanded play.
- Comparison intent: the source is the reported pre-change state. The implementation intentionally removes the Recall check copy, textarea, and validation notice while preserving the teaching notes and mastery action.

### Checkpoint modal

- Source visual truth: `design-qa-assets/sip-game-modal-reference.png`
- Implementation screenshot: `design-qa-assets/sip-game-modal-implementation.jpg`
- Combined comparison: `design-qa-assets/sip-game-modal-comparison.jpg` (source left, implementation right)
- Route: `http://127.0.0.1:5100/#app/sip-game`
- Viewport: 602 × 884 CSS px, portrait
- Pixel dimensions: source 602 × 884 px; implementation 602 × 884 px
- Density normalization: both artifacts are 1:1 captures at the same pixel dimensions; no resizing was used.
- State: Level 1, Distillery, `Corn Crop` checkpoint briefing open, modal body at its initial scroll position.
- Comparison intent: the source is the reported pre-fix state. The implementation intentionally makes the image shorter, keeps it fully contained, and exposes more lesson content while preserving the same artwork, content order, colors, typography, and modal structure.

### Game-only fullscreen

- Source visual truth: `design-qa-assets/sip-game-fullscreen-reference.png`
- Implementation screenshot: `design-qa-assets/sip-game-fullscreen-implementation.jpg`
- Combined comparison: `design-qa-assets/sip-game-fullscreen-comparison.jpg` (source left, implementation right)
- Viewport: 593 × 725 CSS px, portrait
- Pixel dimensions: source 593 × 725 px; implementation 593 × 725 px
- Density normalization: both artifacts are 1:1 captures at the same pixel dimensions.
- State: Level 1, Distillery, no lesson modal open, game stage expanded.

## Findings

- No actionable P0, P1, or P2 issue remains.
- The appbar and navigation drawer now use the supplied light Sip Studies emblem. Its pale mint ring and gold central glass remain visibly distinct against the dark navy surfaces at the production 34 px mobile and 38 px desktop slots.
- The runtime emblem is a 256 × 256 lossless WebP derived directly from the 1728 × 1728 transparent source. It preserves transparency and the circular crop without stretching, replacement artwork, or visible edge halos.
- The appbar brand lockup contains exactly two visible image assets: the round Sip Studies emblem and the Sip Studies script wordmark. Its rendered text content is empty, so no `Sipopedia` subtitle or synthetic mobile replacement remains.
- The logo lockup stays inside the appbar without colliding with the Menu control and creates no horizontal document overflow at 390 × 844, 639 × 910, or 1280 × 900 CSS px.
- The checkpoint image uses its full aspect ratio with `object-fit: contain`; no part of the source art is cropped.
- The shared checkpoint renderer no longer includes the written Recall check, textarea, or response validation in any level or facility.
- `Mark Checkpoint Mastered` remains the clear primary action and now records mastery immediately without requiring typed text.
- The modal is bounded by the visual viewport in normal and expanded play. Its lesson body is the only scroll owner, so the image, teaching notes, and mastery action remain reachable without horizontal overflow.
- The 44 × 44 px Close control is outside the scrolling body, stays visible at the top-right at every scroll position, and remains the hit-tested foreground control when the fullscreen Exit control occupies the same corner behind the dialog.
- The underlying page is scroll-locked while a checkpoint, room-complete, or finale modal is open, eliminating the second page scrollbar and restoring the prior body styles when the modal closes.
- The expanded view still contains only the requested game stage. Page navigation, titles, level controls, facility controls, and the fullscreen entry button remain outside that view.

## Required Fidelity Surfaces

- Fonts and typography: the authentic Sip Studies script wordmark image is preserved at 94 × 21 CSS px. The added all-caps `Sipopedia` text is intentionally removed rather than replaced by another text treatment. Existing Sip Game families, weights, sizes, line heights, letter spacing, and hierarchy remain unchanged.
- Spacing and layout rhythm: the emblem and wordmark remain a single horizontal lockup with the existing gap. Desktop uses a 38 × 38 px emblem and mobile uses 34 × 34 px; neither overlaps the Menu control. The modal retains the existing card, radius, borders, and padding. Narrow screens use one content column; short landscapes use two compact columns.
- Colors and visual tokens: the supplied emblem's pale mint and gold palette now creates clear foreground contrast against the navy appbar and sidebar while leaving the surrounding production tokens unchanged. The cream modal surface, deep teal lesson card, gold focus ring, borders, and gradients remain mapped to the existing Sipopedia/Sip Game design system.
- Image quality and asset fidelity: the authentic supplied light emblem is used directly through an optimized transparent WebP derivative; it is not recreated with HTML, CSS, SVG, emoji, or placeholder art. The Sip Studies script wordmark remains unchanged and sharp. The same high-resolution `Corn Crop` asset is used in the checkpoint modal and is neither substituted nor stretched.
- Copy and content: the `Sipopedia` subtitle is intentionally removed only from the appbar brand lockup. Checkpoint teaching notes and the mastery action remain unchanged. Recall-entry instructions, placeholder copy, and validation notice remain intentionally removed.
- Icons and controls: the existing text Close control remains visually consistent with the game. Its minimum target is 44 × 44 px and it retains the gold focus treatment.
- Accessibility and interaction states: the appbar brand retains the explicit `Open Sip Studies home` accessible name; the decorative seal stays silent and the wordmark supplies image alt text. The checkpoint dialog retains semantic `role="dialog"` and `aria-modal`; focus enters on Close, Escape dismisses it, and background scrolling is disabled while any game modal is open.

## Focused Region Comparison

- `design-qa-assets/sip-appbar-light-logo-comparison.png` compares the supplied light emblem and its browser-rendered appbar crop at the same 33 × 33 px density. The circular artwork, mint outer ring, gold center, transparency, and crop align; the small JPEG color shift in the browser capture is expected compression, not asset drift.
- `design-qa-assets/sip-appbar-light-logo-implementation-full.jpg` confirms that the lighter emblem has stronger contrast than the previous dark asset while retaining the original appbar alignment and wordmark pairing.
- `design-qa-assets/sip-appbar-logo-comparison.png` compares the exact 270 × 81 px appbar crop. It shows the round emblem and script wordmark preserved while the former `SIPOPEDIA` line is removed; spacing remains balanced and no replacement label is introduced.
- `design-qa-assets/sip-appbar-logo-implementation-full.jpg` confirms the compact lockup remains aligned inside the complete Sip Game appbar.
- `design-qa-assets/sip-game-no-recall-field-comparison.jpg` compares the exact lower modal region at 608 × 357 px. It clearly shows the removed Recall check, textarea, and resulting whitespace, with the mastery action moving directly beneath the teaching notes.
- The 1920 × 1080 full implementation capture confirms that the compacted lower region still balances correctly with the checkpoint image and surrounding expanded-game backdrop.

## Comparison History

1. Light Sip Studies emblem
   - Finding: [P1] The prior dark emblem lost most of its internal detail against the navy appbar and sidebar.
   - Fix: added a 256 × 256 lossless transparent WebP derivative of the supplied light logo and changed the shared compact-navigation emblem import. The same asset now feeds both the appbar and drawer brand marks.
   - Post-fix evidence: `design-qa-assets/sip-appbar-light-logo-implementation-focus.png`, `design-qa-assets/sip-appbar-light-logo-implementation-full.jpg`, and `design-qa-assets/sip-appbar-light-logo-comparison.png`.
   - Result: the mint ring and gold center remain legible in both 34 px mobile and 38 px desktop slots without changing layout or navigation behavior.

2. Appbar logo cleanup
   - Finding: [P1] The brand lockup displayed an extra `Sipopedia` subtitle beneath the authentic Sip Studies wordmark, and mobile CSS recreated the same unwanted label with a pseudo-element.
   - Fix: removed the subtitle markup, its desktop styling, and the mobile pseudo-element; retained the original emblem and wordmark images as the only two brand children.
   - Post-fix evidence: `design-qa-assets/sip-appbar-logo-implementation-focus.png`, `design-qa-assets/sip-appbar-logo-implementation-full.jpg`, and `design-qa-assets/sip-appbar-logo-comparison.png`.
   - Result: desktop and mobile render only the requested Sip Studies emblem plus Sip Studies text logo, with no overlap or horizontal overflow.

3. Recall-entry removal
   - Finding: [P1] The requested removal would have left every mastery button permanently blocked if the former 24-character response validation remained.
   - Fix: removed the shared textarea, label, response/notice state, reset effect, validation branch, and dedicated textarea CSS together. Preserved the keyed mastery update and `closeCheckpointModal(checkpointId)` progression path.
   - Post-fix evidence: `design-qa-assets/sip-game-no-recall-field-implementation.jpg`, `design-qa-assets/sip-game-no-recall-field-full.jpg`, and `design-qa-assets/sip-game-no-recall-field-comparison.jpg`.
   - Result: the button immediately records mastery and closes the dialog; all checkpoint popouts inherit the same simplified UI.

4. Reported source state
   - Finding: [P1] Modal content and persistent controls could be cut off or lost on constrained viewports because the dialog itself owned overflow, the Close control could move with it, and short landscapes retained an oversized image minimum.
   - Fix: introduced a dedicated modal body scroll owner; kept Close outside that body; bounded the modal with dynamic viewport and safe-area units; capped imagery by viewport; added short-landscape and narrow-screen layouts.
   - Post-fix evidence: `design-qa-assets/sip-game-modal-implementation.jpg`.

5. First responsive implementation pass
   - Finding: [P2] The narrow one-column grid allowed the lesson card to shrink while its copy overflowed its border, and a later row-sizing adjustment briefly allowed the image row to shrink.
   - Fix: made the lesson card `height: max-content`, set modal grid rows to `max-content`, and aligned grid content to the start so the single body scroller accounts for the complete image and lesson-card heights.
   - Post-fix evidence: `design-qa-assets/sip-game-modal-comparison.jpg`; the complete image and lesson card remain intact while the modal body scrolls.

6. Final browser pass
   - Finding: [P2] Normal-page modal previews still exposed both the internal modal scrollbar and the underlying page scrollbar.
   - Fix: added lifecycle-safe body overflow and overscroll locking for every Sip Game modal and fullscreen fallback state.
   - Post-fix evidence: the final implementation and combined comparison show one modal scrollbar; runtime checks confirmed body styles restore after Close and Escape.

7. Earlier fullscreen pass
   - Finding: [P2] The in-stage Exit control obscured the left side of the full-width mobile mastery HUD.
   - Fix: moved Exit to the portrait safe-area top-right and reserved right-side HUD padding.
   - Post-fix evidence: `design-qa-assets/sip-game-fullscreen-implementation.jpg` and `design-qa-assets/sip-game-fullscreen-comparison.jpg`.

## Interaction and Responsive Evidence

- Light emblem asset: browser `currentSrc` resolved to `sip-studies-logo-03-light-opt.webp`; intrinsic size was 256 × 256 px and the image completed successfully.
- Light emblem responsive sizing: 34 × 34 CSS px at 390 × 844 and 639 × 910; 38 × 38 CSS px at 1280 × 900. It remained inside the appbar with zero horizontal overflow and no Menu overlap.
- Appbar brand: two visible `IMG` children, zero rendered label text, and no `small` or generated-label child at the 390 × 844 mobile and 1280 × 900 desktop test sizes.
- Appbar geometry: the logo lockup remained within the appbar; Menu and emblem bounds did not overlap; document horizontal overflow was 0 at every tested width.
- Appbar interaction: the single `Open Sip Studies home` brand button remained enabled with its accessible name intact; closing the navigation drawer left the appbar and Sip Game preview usable.
- Normal portrait: 390 × 844 and 602 × 884.
- Normal tablet/tall portrait: 700 × 900.
- Normal compact landscape: 720 × 540 and 844 × 390.
- Expanded portrait: 390 × 844.
- Expanded landscape: 844 × 390.
- Modal geometry: backdrop and modal remained within the viewport; document horizontal overflow was 0 at every tested size.
- Scroll behavior: only `.sip-game-equipment-modal-body` scrolls; `Mark Checkpoint Mastered` is fully visible at maximum scroll.
- Close behavior: 44 × 44 px target remained visible and hit-testable at the top and bottom of the modal; pointer Close and Escape both dismissed the dialog.
- Mastery behavior: `Vine Training` advanced from 0/3 to 1/3 and closed its dialog immediately without a written response.
- Removal scope: browser DOM checks confirmed no Recall check copy, textarea, placeholder, or validation notice in normal, portrait, landscape, or expanded modal states.
- Fullscreen containment: checkpoint dialog remained inside the game-stage subtree; its z-index placed it above the fullscreen Exit control.
- Scroll-lock cleanup: body overflow and overscroll styles were restored after the modal closed.
- Browser console: no warnings or errors found during the final browser pass.
- Validation: `npm run typecheck`, `npm run build`, and `git diff --check` passed. Vite retained its existing non-blocking Three.js chunk-size warning.

## Open Questions

- None.

## Implementation Checklist

- [x] Replace the dark compact-navigation emblem with the supplied light Sip Studies logo.
- [x] Preserve transparency and source fidelity in a right-sized production asset.
- [x] Show only the Sip Studies emblem and Sip Studies script wordmark in the appbar on desktop and mobile.
- [x] Remove both the rendered and pseudo-element `Sipopedia` subtitle without changing brand navigation.
- [x] Keep every modal edge within normal and expanded visual viewports.
- [x] Preserve the full checkpoint image without cropping.
- [x] Use one internal vertical scroll owner and prevent horizontal overflow.
- [x] Keep Close pinned, keyboard reachable, and at least 44 × 44 px.
- [x] Remove the written recall input and validation from the shared checkpoint modal.
- [x] Keep teaching notes and the mastery action reachable.
- [x] Preserve checkpoint, room, and level progression without typed text.
- [x] Prevent the fullscreen Exit control from overlapping the active modal.
- [x] Lock the background page and restore it cleanly after dismissal.
- [x] Support portrait, landscape, tablet, desktop, safe-area, and dynamic viewport sizing.

## Follow-up Polish

- No P3 visual changes are required for this request.

---

## Sip Maps Interactive Country Atlas QA

### Comparison Target

- Source visual truth: `design-qa-assets/maps-country-atlas-reference.png`
- Implementation screenshot: `design-qa-assets/maps-country-atlas-implementation.jpg`
- Combined comparison: `design-qa-assets/maps-country-atlas-comparison.png` (reported state left, rebuilt atlas right)
- Route: `http://127.0.0.1:5100/#app/maps`
- Reference pixels: 624 × 921 px.
- Implementation capture: 609 × 921 px inside a 624 × 921 CSS px browser viewport; the 15 px difference is the browser scrollbar gutter.
- Combined comparison: 1233 × 977 px, including the comparison labels.
- State: Oceania selected, Australia selected, country atlas at its initial scroll position.
- Comparison intent: replace the compressed, static country plate and administration-heavy side panel with a map-first, interactive regional study experience that uses the existing Sip Studies atlas assets and visual system.

### Findings

- No actionable P0, P1, or P2 issue remains.
- The former country map stayed in a two-column desktop grid on narrow screens, shrinking the Australia plate into an unreadable thumbnail. The rebuilt country atlas becomes a full-width, single-column map on tablet and mobile while retaining a balanced map-and-focus layout on desktop.
- Country choice now appears before the map in a horizontally scrollable, touch-friendly row. The selected country is identified by both its pressed state and the text status, such as `Australia · country 1 of 3`.
- Every wine region listed for the selected country is now an actual button. Selecting one updates the focused region name, study image, production/site cue, and three-step learning sequence without navigating away.
- The large continent atlas now exposes its authored region coordinates as 44 × 44 px interactive targets. Selecting a marker updates the adjacent focused-region panel; no inferred or fabricated country/subregion destination is attached to those markers.
- The map imagery remains the authentic existing PNG/SVG atlas material. No replacement CSS art, inline SVG, emoji, or approximate geography was introduced.
- Source provenance is retained as a compact credit instead of dominating the student workflow. Download and country-guide actions remain available after the learning interaction.
- Mobile scrolling no longer changes continents. The former root-level swipe and global arrow-key handlers were removed, so horizontal country selection and normal page scrolling cannot conflict with continent state.

### Required Fidelity Surfaces

- Fonts and typography: existing Sip Studies display/body families, cream headings, cyan kickers, line heights, and uppercase tracking are preserved. The new hierarchy prioritizes `Interactive Country Atlas`, the active country, and the selected region.
- Spacing and layout: the 3:2 atlas now owns the dominant visual width. Country selection precedes the map; region selection follows it; the focused study card follows the region list on mobile. Cards retain the product's established radii, thin cyan borders, navy surfaces, and restrained gold accents.
- Colors and tokens: existing navy, teal, cream, gold, and cyan tokens are reused. Active countries, regions, and map markers add a gold border/fill state without introducing a competing palette.
- Image quality and asset fidelity: country maps use the existing 2100 × 1400 SVG plates with `object-fit: contain`. Focus cards prefer reviewed local region assets and fall back to the existing country landscape or map asset.
- Copy and content: operational phrases such as `first-batch`, `wired`, and missing-file instructions were removed from the student surface. The replacement copy explains the learning sequence in plain language.
- Accessibility and interaction: continent and country/region controls use real buttons, `aria-pressed`, visible focus rings, descriptive labels, and practical touch targets. The adjacent region list remains the text equivalent for external SVG content.
- Responsiveness: at 390 × 844 CSS px, document width remains within the viewport, the atlas stays centered, country chips remain horizontally reachable, region buttons become one column, and the study card follows the selector without clipping.

### Comparison History

1. Reported source state
   - Finding: [P1] The fixed two-column country layout reduced the map to a small thumbnail on mobile and placed a dense metadata panel beside it.
   - Fix: changed the country experience to a map-first atlas with an explicit country selector, full-width responsive frame, compact source credit, and focused region card.
   - Post-fix evidence: `design-qa-assets/maps-country-atlas-comparison.png`.

2. First interaction pass
   - Finding: [P1] Region names were passive list rows, so the country plate offered no student interaction despite presenting a region index.
   - Fix: converted every listed region into a selected-state button and connected it to a focused lesson card with a vineyard cue and study sequence.
   - Post-fix evidence: browser checks confirmed `McLaren Vale` updates the focused heading and pressed state; switching to New Zealand resets the selector to `Marlborough`.

3. Mobile input pass
   - Finding: [P2] The page-level swipe handler could compete with the new horizontally scrollable country selector and ordinary vertical scrolling.
   - Fix: removed page-wide continent swipe and global arrow interception; continent choice now happens only through the explicit continent controls.
   - Post-fix evidence: a 620 px mobile scroll preserved `Oceania` as the active continent.

4. Touch-target pass
   - Finding: [P2] Initial continent marker visuals were 25–28 px and duplicated labels already printed inside the map artwork.
   - Fix: retained the small visual marker inside a 44 × 44 px semantic button, removed duplicate overlay labels, and kept the selected region name in the adjacent focus card.
   - Post-fix evidence: `Focus Tasmania` changed the focus panel to `Tasmania` and reported `aria-pressed="true"`.

### Interaction and Responsive Evidence

- Continent interaction: `Oceania` selected correctly; `Focus Tasmania` updated the focused-region panel to marker 10.
- Country interaction: `New Zealand` changed to pressed state and loaded its five-region selector.
- Region interaction: `McLaren Vale` changed to pressed state and became the single selected-region heading.
- Scroll stability: after vertical mobile scrolling, `Oceania` remained active.
- Mobile overflow: document width was 375 px inside a 390 px viewport; no horizontal page overflow was present.
- Image loading: the local Marlborough panorama completed at 1774 × 887 intrinsic pixels and rendered at the selected-region card's 16:9 crop.
- Browser console: no warnings or errors were recorded during the final desktop and mobile passes.
- Validation: `npm run build`, `git diff --check`, and `npm run smoke:routes` passed; the route smoke check reported 52/52 routes. Vite retained its existing non-blocking Three.js chunk-size warning.

### Open Questions

- None for this implementation. Internal wine-region boundary polygons remain limited to countries with authoritative imported geometry; the interface intentionally uses an honest selectable region index rather than drawing invented boundaries.

---

## Terminology Infographic Download Contrast QA

### Comparison Target

- Source visual truth: `design-qa-assets/terminology-infographic-download-reference.png`
- Implementation screenshot: `design-qa-assets/terminology-infographic-download-implementation.jpg`
- Combined comparison: `design-qa-assets/terminology-infographic-download-comparison.png`
- Route: `http://127.0.0.1:5100/#app/sipopedia?term=b23f394e-32f4-4fd9-9a1e-d63eecd8b4dd&q=Junmai`
- Source pixels: 272 × 153 px.
- Implementation pixels: 272 × 153 px, cropped from a 390 × 844 CSS px browser viewport at 1× density.
- Combined comparison: 544 × 181 px, including comparison labels.
- State: Junmai terminology detail open, `Learning Graphic` visible, normal download-link state.
- Comparison intent: correct the shared infographic download control's pale-on-pale text while preserving the existing Sip Studies terminology modal, typography, image, spacing, and content.

### Findings

- No actionable P0, P1, or P2 issue remains in the affected control.
- The reported state rendered `#fff3cc` text over the button's `#f2e8d2` surface, approximately 1.10:1 contrast. A more specific modal-link selector had unintentionally overridden the reusable light-button text color.
- The corrected shared selector renders `#071822` text over the existing cream-to-gold surface. Contrast against the darkest gradient stop is approximately 12.54:1, exceeding WCAG AA and AAA requirements for this 16 px bold label.
- The implementation keeps the full `Download Infographic` label visible at 390 px mobile width and at the normal desktop preview width. The 196.5 × 47.9 CSS px control remains comfortably usable without wrapping.
- All terminology entries with an available infographic use the same `term-infographic-download` class in the single shared detail template. Terms without an infographic omit the link, so no per-term contrast variants remain.

### Required Fidelity Surfaces

- Fonts and typography: the existing Outfit-family control typography, 16 px size, 700 weight, line height, and label copy are unchanged. Only the foreground color was corrected.
- Spacing and layout: button width, height, padding, border radius, placement beneath the learning graphic, and gap before purchase links are unchanged.
- Colors and visual tokens: the existing cream/gold surface is retained; the label now uses the terminology modal's dark navy ink. Hover keeps the dark label on a lighter cream surface, and focus adds a 3 px cyan outline with strong contrast against the dark modal.
- Image quality and asset fidelity: the Junmai infographic, crop, scaling, border, and surrounding surface are unchanged.
- Copy and content: `Download Infographic`, `Purchase links`, and all term-specific content remain unchanged.
- Accessibility and interaction: normal contrast improves from approximately 1.10:1 to at least 12.54:1. The shared link remains semantic, keyboard reachable, downloadable, and gains an explicit high-contrast `:focus-visible` treatment.
- Responsiveness: browser verification at 390 × 844 and the normal preview width showed the complete label with no wrapping or control-level overflow.

### Comparison History

1. Reported source state
   - Finding: [P1] The download label was nearly indistinguishable from its pale background.
   - Cause: `.term-modal-grid a` had greater specificity than `.btn-light`, changing only the text to pale cream.
   - Fix: added a narrowly scoped `.term-modal-grid a.term-infographic-download` treatment with dark navy text, the existing cream/gold visual language, a clear hover surface, and a cyan focus ring.
   - Post-fix evidence: `design-qa-assets/terminology-infographic-download-comparison.png`.

2. Shared-template verification
   - Finding: no per-term button component or style variant exists.
   - Fix impact: the single selector covers every terminology entry that renders an infographic download.
   - Post-fix evidence: the Junmai browser state computed `rgb(7, 24, 34)` text on the cream/gold gradient; the shared template uses the same class for all other terms.

### Interaction and Validation Evidence

- Normal state: computed text color `rgb(7, 24, 34)` with the cream-to-gold background gradient.
- Hover state: authored rule preserves the same dark text while lightening the surface and strengthening the cyan border.
- Focus state: authored rule preserves the dark text and adds a 3 px cyan outline with 3 px offset.
- Browser console: no warnings or errors were recorded during the final terminology pass.
- Validation: `npm run build`, `git diff --check`, and `npm run smoke:routes` passed; route smoke reported 52/52 routes. Vite retained its existing non-blocking Three.js chunk-size warning.

### Open Questions

- None.

---

## Terminology Detail Complete Contrast QA

### Comparison Target

- Source visual truth: `design-qa-assets/terminology-full-contrast-reference.png`
- Implementation screenshot: `design-qa-assets/terminology-full-contrast-implementation.jpg`
- Combined comparison: `design-qa-assets/terminology-full-contrast-comparison.png`
- Additional error-state evidence: `design-qa-assets/terminology-error-contrast-implementation.jpg`
- Route: `http://127.0.0.1:5100/#app/sipopedia?term=b23f394e-32f4-4fd9-9a1e-d63eecd8b4dd&q=Junmai`
- Source pixels: 603 × 585 px.
- Implementation pixels: 603 × 585 px from a matching 603 × 585 CSS px browser viewport at 1× density.
- Combined comparison: 1206 × 613 px, including comparison labels.
- State: Junmai detail open in recall mode with the shared `Recall Check` badge and recall field visible.
- State note: the implementation capture intentionally shows the new keyboard focus ring on `Return to Definition`; the source did not include a focus indicator. Content, mode, term, viewport, and theme otherwise match.
- Comparison intent: expand the initial download-control fix into a complete terminology-detail contrast pass covering non-button labels, errors, links, form text, placeholders, and focus states.

### Findings

- No actionable P0, P1, or P2 contrast issue remains in the terminology detail view.
- The reported `Recall Check` badge rendered pale cream text over pale cyan at approximately 1.02:1 contrast. The shared modal chip rule now renders dark navy text over the existing cream-to-blue gradient at approximately 11.89:1–16.29:1.
- The same shared selector protects the term badge, recall badge, editorial badge, and future terminology modal chips from broad paragraph-color rules.
- A second hidden failure was found in the detail-load error state. Brown error text previously rendered at approximately 1.70:1–2.39:1 on the dark modal. It now uses a warm alert color at approximately 7.11:1–9.96:1; the rendered invalid-term state confirms the new computed color.
- The recall textarea now uses explicit dark text over a warm cream field at approximately 16.86:1. Its placeholder is explicitly set to approximately 6.65:1, preventing browser-default variations.
- Purchase and reference links retain their high-contrast cream color and are now underlined by default, so they do not rely on color alone. Links, buttons, and inline terminology links have explicit cyan focus outlines.
- Existing primary buttons pass at approximately 4.93:1–5.93:1, light buttons pass at approximately 5.83:1, and the corrected infographic download passes at approximately 12.54:1 or better.

### Required Fidelity Surfaces

- Fonts and typography: the existing Outfit-family sizes, weights, line heights, wrapping, and information hierarchy remain unchanged. Foreground colors were corrected without altering copy or scale.
- Spacing and layout: modal dimensions, header actions, recall-field size, section order, gaps, radii, and card boundaries are unchanged from the reported view.
- Colors and visual tokens: every light surface in the terminology detail now uses dark navy text. Dark surfaces retain cream, cyan, or warm-alert text with AA-or-better measured contrast. The change stays within the existing Sip Studies navy, teal, cream, gold, and cyan palette.
- Image quality and asset fidelity: the Junmai infographic and all terminology imagery remain untouched.
- Copy and content: `Recall Check`, instructions, button labels, field placeholder, evidence headings, purchase links, and references remain unchanged.
- Accessibility and interaction: all affected text/background pairs pass WCAG AA; key pairs exceed AAA. Links have non-color differentiation, and buttons, links, inline term references, the recall field, and the download control have explicit visible focus states.
- Responsiveness: browser checks at 390 × 844, 603 × 585, and 1280 × 900 confirmed the corrected badge, field, buttons, and evidence content remain visible without new control-level overflow.

### Comparison History

1. Reported non-button failure
   - Finding: [P1] `Recall Check` was nearly invisible because `.term-modal-grid p` overrode only the shared chip's foreground color.
   - Fix: added a more-specific shared `.term-modal .lesson-chip` rule using dark navy text and the established cream-to-blue chip surface.
   - Post-fix evidence: `design-qa-assets/terminology-full-contrast-comparison.png`.

2. Full modal contrast audit
   - Finding: [P1] detail-load error text failed on the dark modal; focus indicators and inline link differentiation were inconsistent; the recall field depended on browser-default colors.
   - Fix: added a high-contrast error color, explicit field/placeholder colors, persistent link underlines, and shared cyan focus outlines.
   - Post-fix evidence: `design-qa-assets/terminology-error-contrast-implementation.jpg`, browser-computed style checks, and the focused control visible in the combined comparison.

3. Shared-template coverage
   - Finding: the detail modal is one shared render path for every selected terminology entry.
   - Fix impact: the scoped rules cover all terms and data-dependent detail states without per-term variants.
   - Post-fix evidence: Junmai recall mode, invalid-term error mode, normal evidence links, and infographic download state all passed in the same shared component.

### Interaction and Validation Evidence

- Recall mode: `Test This Term` opened the corrected badge, field, and `Reveal and Compare` action.
- Definition mode: `Return to Definition` restored the definition without altering the shared modal styling.
- Error mode: a valid-but-missing term identifier rendered the detail error in `rgb(255, 180, 168)` on the dark modal, then the Junmai state was restored.
- Keyboard state: the shared 3 px cyan focus ring rendered on the modal action control; authored rules also cover fields, links, inline terminology links, and the download action.
- Browser console: no warnings or errors were recorded during the final normal, recall, responsive, and restored-valid-term passes.
- Validation: `npm run build`, `git diff --check`, and `npm run smoke:routes` passed; route smoke reported 52/52 routes. Vite retained its existing non-blocking Three.js chunk-size warning.

### Open Questions

- None.

final result: passed

---

## Beyond The Glass — Cinematic Chapter QA

### Comparison Target

- Source visual truth: `https://ai-edu.sipstudies.chatgpt.site/ai-unpacked`
- Source capture: `design-qa-assets/beyond-the-glass/reference-desktop.png`
- Browser-rendered implementation: `http://127.0.0.1:5100/#app/beyond-the-glass`
- Implementation capture: `design-qa-assets/beyond-the-glass/prototype-desktop-opening.png`
- Full-view combined comparison: `design-qa-assets/beyond-the-glass/desktop-comparison.png`
- Focused hero comparison: `design-qa-assets/beyond-the-glass/focused-comparison.png`
- Desktop viewport: 1280 × 720 CSS px, device pixel ratio 1; both captures are 1280 × 720 source pixels, so no density normalization was required.
- Mobile portrait viewport: 390 × 844 CSS px, device pixel ratio 1.
- Short landscape viewport: 844 × 390 CSS px, device pixel ratio 1.
- Compared state: opening editorial hero and first scroll-story scene. The reference supplies the desired editorial/parallax storytelling language rather than identical beverage content, so the comparison evaluates composition, hierarchy, palette, typography, image treatment, and scroll-stage clarity instead of literal copy fidelity.

### Findings

- No actionable P0, P1, or P2 visual difference remains.
- The implementation preserves the reference’s large editorial serif hierarchy, deep green museum-like field, tactile cinematic artwork, restrained brass accent, bordered exhibit frame, and asymmetric subject/text composition.
- The implementation intentionally increases above-the-fold usefulness: the chapter title, learning invitation, visible journey progress, optional narration controls, captions, and landscape focal point are all present without the source reference’s large empty upper field.
- The new work remains visibly part of Sipopedia through the existing app bar, sidebar, logos, fonts, colors, focus treatment, and workspace routing.

### Required Fidelity Surfaces

- Fonts and typography: display copy uses the existing Sipopedia editorial serif stack with high-contrast cream, compact optical line heights, negative display tracking, and clear scene/eyebrow/body hierarchy. Mobile copy reflows without truncation; the measured `Deconstruction` title was reduced until it fit beside the layer panel.
- Spacing and layout rhythm: the sticky stage fills the usable viewport beneath the persistent app bar. Copy, layer detail, character guides, controls, and captions have separate non-overlapping zones on desktop, 390 × 844 portrait, and 844 × 390 landscape. No page-level horizontal overflow was measured.
- Colors and visual tokens: forest, espresso, cream, muted teal, brass, terracotta, and water-blue map to the approved Sipopedia palette. Copy and controls remain high contrast over the cinematic imagery; focus uses the established water-blue outline.
- Image quality and asset fidelity: ten generated WebP assets use one coherent editorial-naturalism and tech-nouveau art direction. Desktop and mobile crops remain sharp, the central-drop and Noise overlays preserve transparency, and no generated text, logos, watermarks, or broken images were found.
- Copy and content: all eight scenes, ten knowledge layers, Sippy/Roma/Hummin narration, prompts, citations, transcript, chapter lobby, AI-art disclosure, and final calls to action are coherent and complete.
- Icons and character imagery: existing Sippy, Roma, Hummin, and Sip Studies assets are reused rather than approximated. No placeholder illustration, custom CSS art, emoji, or improvised SVG substitute appears.
- States and interactions: Previous/Next reversibility, optional narration, pause, stop, mute/resume, captions, transcript navigation, skip navigation, final archive navigation, and route-preserving in-page focus were reviewed. The final mobile control order keeps Previous and Next visible before optional audio settings.
- Accessibility: narration never autoplays; captions and a full transcript remain available; focus targets are explicit; source links announce new tabs; reduced-motion users receive the complete static story plus narration controls; passive scroll changes do not use an `aria-live` region.
- Responsiveness: portrait and short-landscape captures show readable copy, 44 px controls, usable horizontal control scrolling, stable app-header positioning, non-overlapping panels, and no horizontal page overflow.

### Full-View Comparison Evidence

- `design-qa-assets/beyond-the-glass/desktop-comparison.png` places the 1280 × 720 source on the left and the 1280 × 720 implementation on the right in one image.
- The comparison confirms shared editorial typography, dark museum palette, tactile central imagery, fine border treatment, and intentional asymmetry.
- The implementation’s denser learning controls are an intentional product requirement, not design drift: unlike the inspirational source, Beyond The Glass must remain playable, narrated, reversible, and connected to the Sipopedia workspace.

### Focused Comparison Evidence

- `design-qa-assets/beyond-the-glass/focused-comparison.png` places equal 1000 × 500 crops together.
- The focused pass confirms display-font weight, cream-on-forest contrast, brass accent balance, image sharpness, and the relationship between the oversized headline and tactile subject.

### Comparison History

1. Sticky-stage and layer-order pass
   - Earlier finding: [P1] the stage initially scrolled out of view because `#root` was the nearest non-scrolling overflow container; later image layers could also intercept the visible opening.
   - Fix: route-scoped root overflow correction, explicit layer z-order, pointer-safe Noise overlay, and a sticky route-scoped app header.
   - Post-fix evidence: desktop opening, Signal, Deconstruction, System in Motion, and Invitation all remained pinned beneath the app bar.

2. Narration and reduced-motion pass
   - Earlier finding: [P1] Scene 5 speech timing could drift from the visible layer, stale speech callbacks could cancel a new run, and the reduced-motion return target was missing.
   - Fix: narration run tokens, speech error filtering, active-line-to-layer synchronization, preserved mute/resume state, synchronous reduced-motion initialization, a valid story target, and static-mode narration controls.
   - Post-fix evidence: spoken/captioned Origin and Ingredients each matched the visible layer; mute changed to paused state, unmute resumed the same line, and Stop returned cleanly to the scene introduction.

3. Responsive composition pass
   - Earlier finding: [P1] short landscape viewports could clip absolute story regions; [P2] desktop layer panels overlapped long scene titles; essential mobile control text was too small.
   - Fix: a dedicated `max-height: 620px` two-column compact stage, measured non-overlapping desktop widths, scene-specific display sizing, larger mobile caption/control text, and mobile Previous/Next priority ordering.
   - Post-fix evidence: `prototype-mobile-deconstruction.png`, `prototype-mobile-invitation.png`, `prototype-landscape-opening.png`, and `prototype-landscape-deconstruction.png`.

4. Hash-router navigation pass
   - Earlier finding: [P1] conventional `#section` links replaced Sipopedia’s hash route and left the Beyond The Glass page.
   - Fix: route-preserving `scrollIntoView` and explicit focus management for skip, transcript, and archive links, plus sticky-header scroll margins.
   - Post-fix evidence: the final archive CTA retained `#app/beyond-the-glass`, focused `btg-archive-title`, loaded all imagery, and positioned the heading below the sticky mobile header.

5. Console and asset pass
   - Earlier finding: [P2] React 18 warned about the unsupported `fetchPriority` prop.
   - Fix: removed the prop while retaining eager loading and explicit preload behavior for opening assets.
   - Post-fix evidence: a fresh final local tab reported zero browser warnings or errors.

### Primary Interactions Tested

- Traversed all eight scenes forward and backward with the visible scene controls.
- Verified the story remains pinned while scene progress updates.
- Verified Scene 5 narration/caption/layer synchronization.
- Verified pause, mute, unmute/resume, Stop, caption visibility, and transcript controls.
- Verified final `Explore future chapters` navigation preserves the application route and focuses the archive heading.
- Verified mobile menu did not auto-focus Search or summon the keyboard.
- Verified all required non-lazy story images load and the archive lazy image loads when reached.
- Verified desktop, portrait mobile, and short landscape have zero page-level horizontal overflow.
- Fresh final browser console: zero warnings and zero errors.

### Residual Test Gaps

- The operating-system `prefers-reduced-motion` branch was verified through code and build validation; the in-app browser did not expose a media-emulation control for a separate visual capture.
- Speech synthesis voice timbre varies by operating system, so QA verifies controls, timing progression, captions, and synchronization rather than a fixed voice recording.

### Follow-up Polish

- [P3] Move the hardcoded “Chapter 01” display label into the reusable chapter schema before authoring Chapter 02.
- [P3] Add visible “opens in a new tab” wording for sighted users if future usability testing shows the current accessible-only notice is insufficient.

### Open Questions

- None.

final result: passed
