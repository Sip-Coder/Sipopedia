# Living Palate Intro — Design QA

## Comparison target

- Source visual truth: `C:\Users\TwoKn\.codex\generated_images\019f825f-f49a-7c40-adb0-1dc18d096e82\exec-8f81e824-9149-4b33-b981-73596d4396ff.png`
- Source pixels: 1487 × 1058 at 1× density.
- Local implementation: `http://127.0.0.1:5100/#app/living-palate`
- Desktop implementation evidence: `C:\Users\TwoKn\AppData\Local\Temp\living-palate-tight-1487-content.png`
- Desktop viewport: 1487 × 1058 CSS pixels at 1× density; the app-content crop is 1207 × 777 pixels because Sipopedia's persistent global navigation and header remain outside the feature.
- Full comparison board: `C:\Users\TwoKn\AppData\Local\Temp\living-palate-design-compare-pass3.png`
- Focused guide/mastery comparison: `C:\Users\TwoKn\AppData\Local\Temp\living-palate-detail-compare-final.png`
- Responsive evidence:
  - 390 × 844: `C:\Users\TwoKn\AppData\Local\Temp\living-palate-final-pass-390x844-painted.png`
  - 700 × 900: `C:\Users\TwoKn\AppData\Local\Temp\living-palate-final-700-map-zero-collision.png`
  - 844 × 390: `C:\Users\TwoKn\AppData\Local\Temp\living-palate-tight-844x390-settled.png`
  - 1440 × 900: `C:\Users\TwoKn\AppData\Local\Temp\living-palate-fixed-1440x900-true.png`
- State: campus intro, dry-lab mode, no completed phases. The implementation preserves the product's global navigation rather than duplicating the source mock's standalone top bar.

## Full-view comparison

The implementation preserves the approved hierarchy: immersive brass-and-glass campus, selectable numbered districts, central Worldglass action, parchment route, three-guide bench, and mastery constellation. It adapts the reference to Sipopedia's existing application shell and keeps all reference text and controls as semantic HTML rather than flattening them into the artwork.

At the matched desktop viewport the art and parchment form the primary split, with the mastery rail and guide bench completing both columns. At narrow widths the composition intentionally reflows to campus art, safe CTA/district controls, parchment, guide bench, mastery, and participation principles.

## Focused comparison

The guide bench uses a dedicated original 3:1 image with adult Sippy and Roma plus Hummin, followed by real text labels for names and roles. The mastery constellation remains a semantic six-step list. The focused comparison confirms the same brass, cream, cyan, and midnight palette, a clear three-character rhythm, and readable constellation labels without relying on baked-in UI text.

## Fidelity surfaces

- Fonts and typography: Georgia supplies the reference's editorial serif character; the existing Sipopedia sans family remains on controls and instructional text. No important intro copy truncates. Guide roles, mastery labels, short-landscape copy, and map labels were raised to practical minimums.
- Spacing and layout rhythm: the campus/sidebar ratio, parchment height, guide placement, and mastery rail were rebalanced. No essential control overlaps the artwork at the tested desktop, laptop, portrait, tablet, or phone-landscape sizes.
- Colors and tokens: existing midnight, parchment, brass, muted teal, and luminous cyan tokens map closely to the target. Selected nodes and the active route step use a consistent cyan/teal state.
- Image quality and asset fidelity: five original optimized WebP assets are used. The opening art selects 16:9 wide or 4:5 portrait imagery with `object-fit: contain`; no crop, blank gutters, generated text, logos, or placeholder artwork appear. The guide bench reserves a 3:1 intrinsic slot.
- Copy and content: the approved Compare → Serve → Reflect route is preserved. The central action accurately resumes the current flight phase; each route step opens its corresponding phase. Dry-lab language remains explicit.
- Icons and controls: existing Phosphor icons are used consistently. Districts, routes, modes, utility actions, and source notebook are native labeled controls with visible selected states.
- Accessibility and responsiveness: native buttons, descriptive H1 and image alt text, `aria-pressed`, `aria-current`, dialog semantics, text scaling, reduced motion, 44px targets, and keyboard operation were verified. There is no horizontal overflow or console error in the final matrix.

## Comparison history

### Pass 1 — blocked

- P1: campus area left a large empty gap under the image and mastery labels collided at desktop widths.
- P2: Living Palate branding truncated in the utility rail.
- Fixes: moved mastery into the campus column, stacked its heading and nodes at constrained widths, balanced the map/sidebar ratio, and removed redundant utility branding where the app shell already identifies Sip Studies.

### Pass 2 — blocked

- P1: the 844 × 390 CTA overlapped Source and Service nodes.
- P1: short-landscape parchment and node text fell below practical reading size.
- P2: React logged a repeated `fetchPriority` warning and responsive intrinsic dimensions disagreed with the portrait source.
- Fixes: moved the landscape CTA into a dedicated safe rail, raised text minimums, used eager loading inside a CSS-reserved responsive canvas, and removed incompatible/mismatched image attributes.

### Pass 3 — blocked

- P1: selected district and Worldglass resume behavior communicated conflicting destinations.
- P2: route buttons behaved inconsistently; 621–760px nodes lacked labels; guide/mastery text was undersized; guide art lacked intrinsic reservation.
- Fixes: made the Worldglass consistently resume the saved flight, made all three route steps launch their correct phases, tied route highlight to the active phase, restored tablet labels, raised guide/mastery sizes, and reserved the guide bench's 3:1 slot.

### Pass 4 — passed

- One final 700px Sources/CTA border contact remained after increasing labels to 12px.
- Fix: moved only the Sources node left by 1.5% at the 621–760px breakpoint.
- Post-fix evidence: all six labels remain visible; Sources has a measured 7.3px CTA safety gap; node/node and node/CTA collisions are zero; horizontal overflow is zero; console reports 0 errors and 0 warnings.

## Primary interactions tested

- Select every campus district and confirm its pressed state.
- Launch the saved phase from the Worldglass CTA.
- Launch Compare, Serve, and Reflect from the parchment route.
- Open and close the source notebook dialog.
- Return from the learning flight to the campus.
- Toggle dry-lab/sample mode, text size, and reduced motion.
- Verify responsive asset choice, controls, and collision bounds across the four required viewports plus 700px tablet width.

## Remaining differences

- The source is a standalone concept board; the implementation retains Sipopedia's real global header/navigation. This is an intentional product constraint, not design drift.
- Motion was not added to the opening illustration because the approved image was selected as the visual composition target and the existing reduced-motion contract takes priority.

final result: passed

# SIP Academy Map — Clear-to-World Interaction Design QA

## Interaction intent

- A selected guild or academy now clears when the learner taps or clicks open globe space, returning the map to a neutral world overview rather than forcing another trip through the top guild controls.
- The neutral state uses the canonical `#app/sip-academy-map` address and presents the field note “All guilds in view.”
- Dragging, swiping, pinching, cancelled gestures, and non-primary clicks do not clear the current selection. This preserves intentional globe exploration while making a short open-space tap the predictable exit gesture.

## World overview

- The world overview exposes all front-facing guild landmarks so another territory can be selected directly on the globe.
- On compact screens, overview guild landmarks collapse to touch-safe circular image medallions to reduce crowding without hiding their accessible names.
- Existing selected-guild and selected-academy focus, borders, campus detail models, and URL deep links remain intact.

## Accessibility and verification

- The globe continues to provide native, screen-reader-labelled guild and academy buttons with pressed states and roving keyboard focus.
- Focused globe users can use Escape to clear the selection; pointer users receive the same state through an open-space tap.
- Typecheck and production build passed.
- Focused SIP Academy Map suites passed 16/16 tests, including tap-versus-drag safety, world URL serialization, and deep-link round trips.
- In-app browser verification confirmed: academy/guild selection, drag retention, open-space deselection, clean world URL, neutral field note, and no horizontal overflow at the active narrow desktop viewport.
- Work remains local only; no commit, push, merge, RGRD run, or deployment was performed.

final result: passed

# SIP Academy Globe - Campus Focus and Architecture Rebuild Design QA

## Intent and source comparison

- Reference: `Sip Academy 01.jpeg`, specifically its readable civic hierarchy, brass-and-stone material language, illuminated glass volumes, terraces, stairs, observatory forms, process halls, water links, and distinct building purposes.
- Corrected the selected-campus camera so every academy rotates to the same centered upper-front inspection zone. The camera now looks at the globe center instead of tracking an offset surface tangent, which removes the diagonal edge-on presentation seen in the reported screenshots.
- Default selection framing preserves the whole sphere. Close architectural inspection remains user-controlled through zoom and orbit rather than being forced on every selection.
- Same-input visual comparison saved at `sam-globe-architecture-rebuild/qa/architecture-reference-vs-implementation.png`.

## Architectural system

- Replaced the repeated campus kit with fifteen data-driven architectural identities and nine site plans: radial, terraced, axial, linear, courtyard, cloister, industrial, village, and forum.
- Added campus-specific signature complexes for Wine, Beer, Spirits, Coffee, Tea, Kombucha, Water, Juice, Milk, Health & Supplements, Protein, Energy, Carbonated, Fermented, and Regional Drinks.
- Added architectural hierarchy and readable silhouettes through podium/body/cornice/roof layers, bays, illuminated windows, colonnades, ribs, vaults, sawtooth production roofs, lanterns, chimneys, terraces, stairs, planting foundations, courtyard lamps, and restrained water/bridge links.
- The overview globe renders a lightweight campus model; only the selected academy swaps to its high-detail architectural model. This retains visual depth without making all fifteen full-detail campuses compete for phone GPU resources.

## Responsive and interaction QA

- 1440 x 900 desktop: full sphere remains visible; the selected campus is centered on the upper face; globe controls, nameplate, and field note occupy separate safe zones.
- 1024 x 768 laptop: verified distinct Spirits, Coffee, Water, Health & Supplements, and Fermented campuses with no horizontal overflow or field-note collision.
- 390 x 844 phone portrait: duplicate active-guild rail removed; controls use a compact vertical edge rail; selected academy nameplate remains fully visible; instructions occupy a separate bottom reading rail.
- 844 x 390 phone landscape: dedicated 20rem globe frame and bottom instruction rail prevent the desktop globe from being squeezed into a tall, clipped card.
- Dragging the globe moves the selected campus away; Refocus reliably returns it to the centered upper-front inspection position.
- Zoom, orbit, Refocus, selected-campus button, screen-reader label, focus ring, pressed state, and reduced-motion behavior remain intact.

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed.
- Focused SIP Academy geometry/camera suite: 10/10 passed across all five guilds and fifteen academies.
- Browser console at the final local route: zero errors and zero warnings.
- Responsive proof captures saved for desktop, laptop, phone portrait, and phone landscape.
- Work remains local only; no commit, push, merge, RGRD, or deployment was performed.

final result: passed

# Sip Academy Map — BTG Field-Atlas Button Upgrade

## Source of truth

- Visual reference: `C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\.codex-remote-attachments\019f825f-f49a-7c40-adb0-1dc18d096e82\4e64f824-fe40-42f9-8774-9093b60177fa\1-Photo-1.jpg`.
- Reference language retained: circular image medallions, illuminated selected states, concise category rails, and a separate paper detail panel that never obscures its source image.
- Implementation evidence: `sam-button-redesign/qa/sam-spirits-desktop.png`, `sam-button-redesign/qa/sam-spirits-phone-portrait.png`, `sam-button-redesign/qa/sam-spirits-phone-detail.png`, and `sam-button-redesign/qa/sam-spirits-phone-landscape.png`.

## Before / after

- Before: guild affiliations were plain text pills; Terroir, Architecture, and Facilities were flat bordered text blocks; adventure navigation did not visually connect to the globe's academy art.
- After: guild affiliations, the three campus studies, Enter Adventure, and Return to Guild use real campus and guild imagery inside BTG-style medallions with distinct hover, focus, and selected states.
- The selected study opens in a reserved parchment panel with its own image, heading, and complete copy. No explanation overlays the globe or competes with its controls.

## Visual quality

- Reused the project's original optimized Academy and adventure artwork rather than generating placeholder assets or CSS illustrations.
- Spirits-specific imagery was remapped so Terroir shows the academy landscape, Architecture shows the stillhouse, and Facilities shows production systems.
- Kept the existing Sip Academy serif/display and geometric body typography, cream parchment, deep teal, brass, and campus-specific accent system.
- Small labels use a fixed light foreground for reliable contrast while guild/campus colors remain in borders, halos, and imagery.

## Interaction and accessibility

- Field-study controls expose `tablist`, `tab`, and `tabpanel` semantics.
- Arrow-key navigation was verified from Terroir to Architecture; selected and focused states update together.
- Guild medallions remain buttons; adventure destinations remain links with their established valid routes.
- Focus indicators are visible on dark controls and parchment panels; reduced-motion mode disables decorative medallion animation.

## Responsive verification

- Desktop: 1280px viewport; field note, globe, guild controls, study rail, and paper detail remain distinct with no horizontal overflow.
- Phone portrait: 375px content viewport; two guild controls and three compact study lenses remain readable and touchable, while the detail panel and navigation stack cleanly.
- Phone landscape: 829px content viewport; guild controls, study rail, detail panel, and Enter Adventure CTA use the full width without clipping.
- Measured horizontal overflow: false at desktop, phone portrait, and phone landscape.
- Browser console: zero application errors during the final Spirits-campus pass.

## Automated verification

- Sip Academy Map regression suite: 7/7 passed.
- Production typecheck and build: passed.
- The existing non-blocking large-chunk warning remains unrelated to this scoped redesign.
- Work remains local only; no commit, push, merge, RGRD run, or deployment was performed.

final result: passed

# SIP Academy Map - BTG Image-Node Design QA

## Comparison target

- User-reported plain-row state: `C:\Users\TwoKn\AppData\Local\Temp\codex-clipboard-e4bac5a6-de1a-43d0-b07b-eed037705fd6.png`
- Source visual truth: `http://127.0.0.1:5100/#app/btg`, Academy Plaza landmark nodes.
- Updated local route: `http://127.0.0.1:5100/#app/sip-academy-map?guild=cask`
- Same-input comparison: the BTG Academy Plaza and SIP Academy guild controls were rendered side-by-side at matched 720px source viewports in `sip-academy-button-compare.html` during QA.

## Corrected design relationship

The map's flat icon rows and text-only globe pills now use a shared image-led landmark lens system. Every guild and academy control reuses approved opening artwork from its own adventure, surrounded by the campus accent ring, a restrained halo, a small semantic glyph, an eyebrow, a clear destination name, and a separate Enter action. The system carries the BTG node language into the map without copying its layout: the map retains its globe, field-note paper, guild hierarchy, country borders, and inspect-versus-enter distinction.

## Visual and responsive QA

- Source and implementation were reviewed together in one comparison view. Both now share dark dimensional destination plates, illuminated borders, concise hierarchy, serif destination titles, cyan/gold state language, and restrained selected-node glow.
- Desktop: five guild buttons retain their complete label and signal; the globe uses image medallion nameplates; the field-note destination cards clearly separate Locate and Enter; the directory uses three readable columns rather than five cramped columns.
- Laptop: the same system reflows to two directory columns with no text collision or horizontal overflow.
- Phone portrait (390 x 844): guild buttons use a two-column image-node grid; unselected globe campuses collapse to compact circular lenses; the selected campus expands to a named plate; the active guild occupies a fixed safe rail; zoom controls sit on a separate row; no label or control collision remains.
- Phone landscape (844 x 390): the globe retains the full desktop nameplate treatment and all native controls remain reachable in their own corner safe zone.
- Images remain decorative inside already named native buttons and links. Text labels, pressed states, focus rings, and the separate Enter actions remain the accessible source of truth.

## Interaction and accessibility QA

- Selecting Beer from the Cask field note updates the URL to `?campus=beer`, focuses Beer on the globe, and keeps Cask Guild visibly and semantically active.
- Visible globe nodes use a true roving tab stop. Hidden nodes are both hidden and disabled with `tabIndex=-1`; Arrow keys move among currently visible nodes only.
- Globe labels now say Inspect rather than Open because the control focuses the campus; entering the adventure remains a separate link.
- The former whole-panel live region was replaced by a concise status announcement, avoiding repeated narration of every interactive element.
- Only the selected globe node breathes; idle nodes remain still. All animation is removed under reduced-motion preferences.
- Action text uses cream for reliable small-text contrast; campus color is reserved for borders, halos, and medallion rings.
- Browser console review: zero errors and zero warnings; only Vite connection and React development informational messages were present.

## Verification

- `npm run typecheck`: passed.
- `node scripts/sip-academy-map.test.mjs`: 7/7 passed.
- All fifteen referenced image-lens assets exist at their production paths.
- URL-backed guild/campus selection, separate Locate/Enter actions, hidden-node semantics, and selected parent-guild state were exercised in the local browser.
- Work remains local only; no commit, push, merge, or deployment was performed.

final result: passed

# SIP Academy Map — Living Topographical Globe Design QA

## Visual target and implementation

- User reference: `C:\Users\TwoKn\Desktop\Sip Academy 01.jpeg`.
- Generated terrain source: `C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\sip-academy-map-trailer\sip-academy-terrain-equirectangular-v4.png`.
- Final local prototype: `http://127.0.0.1:5100/#app/sip-academy-map`.
- Same-input comparison evidence: `C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\globe-rebuild-stage\sip-academy-map-compare.html`.
- Final focused-campus evidence: `C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\globe-rebuild-stage\sip-academy-final-water.png`.

The reference's warm limestone, aged brass, dark-teal roofs, illuminated glass, civic courtyards, conservatories, observatories, production halls, gardens, and cyan waterways were translated into a performant globe-scale architectural kit. The result deliberately remains real-time Three.js geometry rather than a photorealistic still, so users can orbit, zoom, select, and inspect the world. Fifteen campus programs use distinct silhouettes and purpose-led iconology without novelty bottle- or still-shaped buildings.

## Geographic and interaction QA

- Five winding guild-continent polygons and fifteen academy-country polygons are driven by the same spherical coordinate system as their campus meshes, labels, region fills, region outlines, and camera targets.
- Source Guild selection shows Water, Juice, and Milk inside one continuous terrain continent with a restrained ocean and connected rivers; academy selection highlights the complete country boundary and moves to an oblique 3D campus view.
- Guild focus reveals exactly three academy buttons. Focused academy mode shows only the selected academy button, preventing sibling and guild-label collisions.
- Drag/swipe orbit, wheel/pinch zoom, visible zoom buttons, refocus, native academy buttons, URL state, keyboard rotation, front-hemisphere culling, and reduced-motion behavior are preserved.
- Water, Wine, and Tea were visually spot-checked as distinct campus programs. Water's aqueduct and stepped filtration court, Wine's conservatory/cellar campus, and Tea's garden/manufacturing campus remain grounded on the world terrain.
- A fresh in-app-browser session produced zero runtime errors or warnings after the final render settings.

## Responsive QA

- 1440 × 900 desktop: persistent site rail, full guild globe, all three academy nodes, controls, and paper field note remain visible without overlap.
- 1024 × 768 laptop: globe and paper field note use a balanced side-by-side composition; all active guild nodes are fully visible and touchable.
- 390 × 844 phone portrait: heading, controls, full selected-campus composition, academy button, globe guidance, and field note reflow vertically with no horizontal overflow or clipped controls.
- 844 × 390 phone landscape: the page scrolls naturally; globe, selected-campus button, controls, and note remain in separate safe zones.

## Technical verification

- `node scripts/sip-academy-map.test.mjs`: 7/7 passed, including five guilds, fifteen academies, valid winding polygons, finite region geometry, campus coordinate containment, Culture affiliations, terrain assets, and Three.js helper integration.
- `npm run typecheck`: passed.
- `npm run build`: passed; the existing non-blocking chunk-size warning remains for large application and Three.js bundles.
- Local preview root returned HTTP 200.
- No commit, push, merge, deployment, or remote service change was performed.

final result: passed

---

# SIP Academy Globe v3 — Design QA

## Comparison target

- Source visual truth: `C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\sip-academy-map-trailer\sip-academy-globe-equirectangular-v3.png`
- Source pixels: 1774 × 887 at 1× density; exact 2:1 equirectangular master.
- Local implementation: `http://127.0.0.1:5100/#app/sip-academy-map`
- Desktop implementation evidence: `C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\sip-academy-map-trailer\qa\sip-academy-globe-desktop-1280x900-final.png`
- Mobile implementation evidence: `C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\sip-academy-map-trailer\qa\sip-academy-globe-mobile-390x844.png`
- Combined full-view comparison: `C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\sip-academy-map-trailer\qa\sip-academy-globe-comparison.png`
- Viewports: 1280 × 900 desktop and 390 × 844 phone portrait, both at browser density 1×.
- State: Cask Guild selected for matched desktop comparison; Energy campus state used to verify the densest mobile node group.

## Full-view comparison evidence

The source art and browser-rendered globe were placed in one comparison board. The implementation preserves all five island territories, all fifteen visibly dimensional academy buildings, the midnight-ocean/brass/cyan palette, and the radial campus-waterway language. The generated world is no longer stretched from a flat campus plan: it uses an exact 2:1 master on a Three.js sphere with a matching relief map, spherical atmosphere, lighting, and true drag/swipe rotation.

## Focused comparison evidence

No additional crop was required because the globe and its labels remain readable at the captured implementation scale. A separate 390 × 844 pass inspected the densest guild: Health, Protein, Energy, and the Energy Guild label are all visible, distinct, and within the circular frame. The paper field note remains outside the artwork and does not obscure the globe.

## Fidelity surfaces

- Fonts and typography: existing Sip Academy display/body hierarchy is preserved; desktop academy names remain complete and mobile nodes use concise visible names with full accessible labels.
- Spacing and layout: camera distance is calculated from the limiting horizontal/vertical field of view, so the full atmosphere remains inside the frame. Mobile uses a square globe canvas instead of a tall stretched stage.
- Colors and tokens: existing cream, brass, midnight, cyan, and guild accent tokens remain consistent with the campus references.
- Image quality: responsive 2048px and 1024px WebP textures plus matching relief maps replace the earlier low-resolution/stretched artwork. No cover crop or aspect distortion is used.
- Copy and content: five guilds and fifteen academies match the approved information architecture; Culture remains three academies, not a sixteenth catch-all campus.
- Interaction and accessibility: pointer drag, touch swipe, zoom controls, Reset, keyboard rotation, semantic academy buttons, pressed state, and full accessible labels remain available. Reduced motion retains a complete static study view.

## Comparison history

- Earlier P1: old flat-plan artwork looked stretched and could not read as a spherical world. Fixed with the exact 2:1 five-territory master, responsive textures, and relief material.
- Earlier P2: default camera filled or clipped the circumference, especially on narrow screens. Fixed with aspect-aware fit distance and a square mobile frame.
- Earlier P2: full academy names and guild labels collided on phone. Fixed with concise mobile labels, increased label radius, and guild anchors moved to protected territory edges.
- Post-fix evidence: the 1280 × 900 and 390 × 844 captures show a complete circumference, no essential node overlap, no crop, and separate field-note space.

## Verification

- Focused map tests: 4/4 passed.
- Typecheck: passed.
- Local production build: passed.
- Pointer 360° rotation and guild selection: passed in the browser.
- Final reload produced no new runtime errors or warnings; earlier development-log entries predated the final fixes.

final result: passed

# Sip Academy Map — 360° Guild World Design QA

## Comparison target

- Campus visual references:
  - `C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\.codex-remote-attachments\019f825f-f49a-7c40-adb0-1dc18d096e82\af6a3480-967a-4907-9928-02c5fb070cc2\1-Photo-1.jpg`
  - `C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\.codex-remote-attachments\019f825f-f49a-7c40-adb0-1dc18d096e82\af6a3480-967a-4907-9928-02c5fb070cc2\2-Photo-2.jpg`
  - `C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\.codex-remote-attachments\019f825f-f49a-7c40-adb0-1dc18d096e82\af6a3480-967a-4907-9928-02c5fb070cc2\3-Photo-3.jpg`
  - `C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\.codex-remote-attachments\019f825f-f49a-7c40-adb0-1dc18d096e82\af6a3480-967a-4907-9928-02c5fb070cc2\4-Photo-4.jpg`
- Local implementation: `http://127.0.0.1:5100/#app/sip-academy-map`
- Desktop overview: `C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\sip-academy-map-qa\desktop-overview.png`
- Desktop Culture state: `C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\sip-academy-map-qa\desktop-culture.png`
- Phone portrait overview: `C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\sip-academy-map-qa\responsive-overview.png`
- Phone portrait globe: `C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\sip-academy-map-qa\phone-globe.png`
- Phone portrait field note: `C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\sip-academy-map-qa\phone-note.png`
- Phone landscape globe: `C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\sip-academy-map-qa\phone-landscape-globe.png`

## Visual system and fidelity

The implementation carries the supplied SIP Academy language into a new planetary scale: densely modeled brass-and-glass learning facilities, planted terrain, cyan waterways, warm illuminated routes, and a dark celestial surround. The complete world is a real textured WebGL sphere rather than a flat poster. Generated words and logos are absent; every guild and academy name is rendered as selectable HTML UI.

The five approved guilds are visually distinct without becoming isolated products. Guild selectors and globe anchors use gold, while academy nodes retain the cyan-ring pulse established by Beyond the Glass. Golden borders delineate the four primary territories, and Culture adds a gold filament network to its fermented and cultured affiliates across the world. The selected field note remains beside the globe on desktop and below it on narrow screens, never on top of the map.

## Interaction and accessibility QA

- Drag/swipe orbit, two-pointer pinch, focused-wheel zoom, Plus/Minus zoom, Home reset, and Arrow-key rotation are implemented.
- Globe labels are native buttons with useful accessible names, pressed state, visible focus, and hidden-back-hemisphere removal from the tab order.
- Only the active guild's academy nodes are shown with the always-available guild anchors, reducing label collisions on small screens.
- Pointer and keyboard rotation were exercised in the in-app browser. Cask → Beer and Culture selection updated the URL and field note without a reload.
- Every campus remains available in a semantic directory even if WebGL is unavailable; responsive poster fallbacks preserve the complete world image.
- Reduced motion stops auto-rotation and pulse loops while retaining the full study surface and all navigation.

## Responsive QA

- Desktop 1280 × 720: the guild compass remains one row, globe and parchment note occupy separate columns, and all globe controls remain inside the scene frame.
- Phone portrait 390 × 844: app header, title, statistics, two-column guild selector, full-width globe, parchment note, and directory form distinct vertical regions. No card or control overlaps another; the selected Water note and its action remain fully visible.
- Phone landscape 844 × 390: title and globe use the available width, controls remain in the globe safe corner, and the field note follows below instead of covering the art.
- Node edge visibility was tightened after the first desktop pass by reducing label radius and hiding limb-edge labels sooner. The final globe state has no partially clipped node labels.

## Assets and performance

- Six responsive WebPs total 2.21 MB; mobile receives the 1024 × 512 spherical texture instead of the 2048 × 1024 desktop texture.
- WebGL pixel ratio is capped at 1.7. Geometry, materials, textures, renderers, observers, and animation frames are disposed on unmount.
- The route lazy-loads through the existing application shell. All original masters stay outside the public runtime bundle and are documented in `artifacts/sip-academy-map/ASSET-MANIFEST.md`.

## Validation

- TypeScript project check: passed.
- Navigation policy suite: passed, 12/12.
- Sip Academy Map data/asset suite: passed, 4/4.
- Desktop and responsive visual comparison: passed after the node safe-zone adjustment.
- No Git commit, push, merge, deployment, or remote mutation was performed.

final result: passed

# Beyond the Glass - Five Standalone Beverage Adventures Design QA

## Scope and visual source of truth

- Existing Winery field-atlas reference: `C:\Users\TwoKn\Documents\Codex\artifacts\btg-five-standalone-2026-08-04\wine-field-atlas-desktop.png`
- Final same-viewport comparison board: `C:\Users\TwoKn\Documents\Codex\artifacts\btg-five-standalone-2026-08-04\wine-vs-five-final-desktop.png`
- Implementations: Juice, Milk, Health Drinks, Energy Drinks, and Sodas at the standalone `/#app/btg?journey=...` routes.
- Sodas phone portrait evidence: `C:\Users\TwoKn\Documents\Codex\artifacts\btg-five-standalone-2026-08-04\sodas-opening-evidence\screenshots\phone-portrait-390x844-scene-01-mid-sodas-academy-gate.webp`
- Sodas phone landscape evidence: `C:\Users\TwoKn\Documents\Codex\artifacts\btg-five-standalone-2026-08-04\sodas-opening-evidence\screenshots\phone-landscape-844x390-scene-01-mid-sodas-academy-gate.webp`

The Winery adventure was treated as the source for interaction hierarchy and visual density: a safe title rail, complete responsive scene art, selectable concept medallions, a separate paper field note, protected node controls, calm guide participation, compact journey navigation, and scroll/reduced-motion compatibility. The five new adventures deliberately retain this grammar while using category-specific campuses, materials, equipment, process rooms, sensory conclusions, and source notebooks.

## Delivered system

- Five independent 22-stop journeys, for 110 substantive learning scenes total.
- Juice: 110 field notes, 14 original art families, 56 responsive WebPs, and 14 authoritative sources.
- Milk: 123 field notes, 15 original art families, 60 responsive WebPs, and 15 authoritative sources.
- Health Drinks: 113 field notes, 14 original art families, 56 responsive WebPs, and 16 authoritative sources.
- Energy Drinks: 116 field notes, 14 original art families, 56 responsive WebPs, and 18 authoritative sources.
- Sodas: 136 field notes, 15 original art families, 60 responsive WebPs, and 18 authoritative sources.
- Every primary node is a native button with an accessible name, pressed state, roving focus behavior, keyboard traversal, protected detail relationship, and 44px minimum target.
- Every route keeps progress/resume and reduced-motion study behavior while exiting to Launchpad instead of Academy Plaza.
- Academy Plaza remains unchanged: its original seven adventures are still the only visible landmarks, and the five new routes have no Academy href, control, or visible label.

## Responsive and interaction verification

Canonical viewports: desktop 1440x900, laptop 1024x768, phone portrait 390x844, and phone landscape 844x390. Each scene was checked at entry, midpoint, and late scroll positions and every node was exercised by pointer and keyboard.

- Juice: 264/264 states, 440/440 node interactions, zero failures.
- Milk: 264/264 states, 492/492 node interactions, zero failures.
- Health Drinks: 264/264 states, 452/452 node interactions, zero failures.
- Energy Drinks: 264/264 states, 464/464 node interactions, zero failures.
- Sodas: 264/264 states, 544/544 node interactions, zero failures.
- Combined: 1,320 responsive states and 2,392 node interactions; zero remaining layout, accessibility, runtime, network, or console issues.

Reports:

- Juice: `C:\Users\TwoKn\AppData\Local\Temp\sipopedia-btg-responsive-qa\post-shell-juice\report.json`
- Milk: `C:\Users\TwoKn\AppData\Local\Temp\sipopedia-btg-responsive-qa\post-shell-milk\report.json`
- Health phone-landscape completion: `C:\Codebase\actual\Sipopedia\artifacts\design-qa\health-post-fix2-phone-landscape-2026-08-04\report.json`
- Energy phone-landscape completion: `C:\Codebase\actual\Sipopedia\artifacts\design-qa\energy-post-fix2-phone-landscape-2026-08-04\report.json`
- Sodas final full matrix: `C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\artifacts\sodas-responsive-qa-2026-08-04-final\report.json`
- Sodas standalone-route contract: `C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\artifacts\sodas-responsive-qa-2026-08-04\route-contract.json`

## Comparison and iteration history

### Pass 1 - desktop consistency findings

- The right lesson rail forced compact taxonomy labels to break mid-word.
- Scene art was vertically centered and left an unnecessary black gap below the title rail.
- Health's route node crossed Hummin in the opening art.

Fixes: the desktop lesson rail now uses a readable three-column rhythm without mid-word breaking; the art begins directly below the title safe rail; and Health has an authored five-node layout that protects all three guides.

### Pass 2 - short landscape regression

- The new desktop rail rule initially overrode the established 844x390 layout, placing canvas/detail controls under the journey dock.
- Sodas exposed a second edge case because four scenes use seven nodes rather than five or six.

Fixes: desktop rail behavior is now height-scoped so the compact short-landscape shell owns 844x390; short-landscape medallions use a 44px target and 1.375rem safe perimeter, preventing seven-node clamping and collisions. Focused reruns and the final full Sodas matrix passed.

## Build and asset integrity

- Final production typecheck and Vite build passed.
- All production WebPs decode and match their authored wide/portrait dimensions; no LFS pointers, placeholder art, generated text, logos, or watermarks were found.
- Original high-resolution masters remain outside the public runtime asset paths; scene art is responsive and lazy-loaded below the opening stop.
- The existing non-blocking Vite size warning remains for the pre-existing large application/Three.js chunks. The new scene art is not bundled into those JavaScript chunks.

final result: passed

# Beyond the Glass — Brewery and Distillery Field Trips Design QA

## Comparison target

- Source visual truth: the existing Wine Academy Plaza and shared field-atlas system, captured at `C:\Codebase\actual\Sipopedia\artifacts\design-qa\wine-reference\screenshots\desktop-1440x900-scene-01-entry-academy-plaza.webp` and `C:\Codebase\actual\Sipopedia\artifacts\design-qa\wine-reference\screenshots\phone-portrait-390x844-scene-01-entry-academy-plaza.webp`.
- Implementation routes: `http://127.0.0.1:5100/#app/btg?journey=brewery` and `http://127.0.0.1:5100/#app/btg?journey=distillery`.
- Desktop implementation evidence: `C:\Codebase\actual\Sipopedia\artifacts\design-qa\btg-brewery-desktop.jpg` and `C:\Codebase\actual\Sipopedia\artifacts\design-qa\btg-distillery-desktop.jpg`.
- Full desktop comparison board: `C:\Codebase\actual\Sipopedia\artifacts\design-qa\btg-desktop-comparison.jpg`.
- Full phone comparison board: `C:\Codebase\actual\Sipopedia\artifacts\design-qa\btg-phone-comparison.jpg`.
- Focused responsive evidence: `C:\Codebase\actual\Sipopedia\artifacts\design-qa\brewery-opening\screenshots\` and `C:\Codebase\actual\Sipopedia\artifacts\design-qa\distillery-opening-final\screenshots\`.
- Source and implementation desktop pixels/CSS size: 1440 × 900, device scale factor 1. Phone portrait pixels/CSS size: 390 × 844, device scale factor 1. Phone landscape: 844 × 390 at 1×. Laptop: 1024 × 768 at 1×. No density normalization was required.
- State: Academy map reference compared with the opening Brewery and Distillery field-atlas scenes, plus every authored stop at entry, midpoint, and late scroll progress.

## Full-view comparison

The two new journeys preserve Wine's visual hierarchy—protected chapter rail, full-composition original artwork, selectable medallion nodes, separate parchment field note, compact node controls, and a navigation-only journey dock—while changing the world, equipment, curriculum, and imagery. Brewery reads as a luminous hop garden and copper brewhouse; Distillery reads as an agricultural stillhouse campus and barrel-led spirits archive. Both retain the same warm brass, midnight, parchment, and water-blue SIP Academy language without becoming copies of the Wine scenes.

On phone portrait, artwork remains the first dominant region and the note/control regions reflow below it. The full illustrations, all nodes, paper explanations, Academy return, and Next controls remain visible without stacking over one another. Phone landscape uses the intended art/detail split rather than squeezing the desktop canvas into a tall column.

## Focused comparison

Focused review covered the artwork/node canvas, selected-node focus, paper-note contrast, layer rail, previous/overview/next controls, header progress, Academy return, Continue action, and saved-progress restart. The Brewery system-map overlap found during the first automated pass was corrected by authoring five complete, scene-specific node positions rather than relying on a partial three-node map. Post-fix evidence verifies all five remain separate at every required viewport.

## Fidelity surfaces

- Fonts and typography: the existing editorial serif/sans hierarchy is retained. Titles, rail labels, paper-note headings, details, and small progress text wrap without truncation at all four required viewports.
- Spacing and layout rhythm: scene artwork, node rail, note panel, and journey dock occupy distinct safe zones. No essential control overlaps art, nodes, notes, or another control.
- Colors and visual tokens: both ecosystems use the established SIP Academy brass, cream, cyan, teal, and midnight palette. Selected nodes, focus rings, and progress states retain consistent semantic contrast.
- Image quality and asset fidelity: 52 responsive Brewery/Distillery WebPs are present across wide and portrait variants, about 13.12 MB total. All assets decode, preserve full composition, and lazy-load below the opening scene. No placeholder, broken path, generated text, or logo appears in the commissioned art.
- Copy and content: Brewery contains 15 source-backed stops and Distillery contains 16 source-backed stops. Each stop uses 5–6 concise visual nodes and distinct Sippy, Roma, and Hummin guidance. Distillery production copy remains high-level and safety-conscious.
- Icons and controls: maintained Phosphor icons and original commissioned medallions are used. Art nodes are native buttons with descriptive names, pressed states, roving focus, arrow-key movement, and 44px minimum targets.
- Accessibility and responsiveness: semantic controls, visible focus, descriptive image alternatives, full static reduced-motion content, non-overlapping notes, and persistent resume/restart behavior were verified. The 132-state mobile regression suite also passes after increasing the compact Notes control to a true 44 × 44 target.

## Comparison history

### Pass 1 — blocked

- P1: the compact mobile Notes control measured 40 × 44, below the required touch width.
- P2: the active Academy node measured 42–43px high at one phone width.
- P2: Brewery `From Grain to Tap` authored only three visual placements for five teaching nodes, causing two nodes to overlap at desktop and laptop sizes.
- Fixes: set Notes to a minimum 44px width, set the active Academy node to a 44px minimum height, and authored five semantically matched positions/icons for Ingredients, Hot side, Cold side, Package, and Guest.

### Pass 2 — passed

- Mobile regression: 132/132 states passed.
- Brewery: the first full sweep passed 174 unaffected states and reported only the six system-map states above; the post-fix system-map sweep passed all 12 responsive states and 20 node interactions with zero overlap, crop, overflow, runtime error, or runtime warning.
- Distillery: 192/192 states and 332 node interactions passed with zero crop, overflow, collision, runtime error, or runtime warning.
- Opening evidence: Brewery and Distillery each passed 12/12 matched opening states across desktop, laptop, phone portrait, and phone landscape.

## Primary interactions tested

- Launch Brewery and Distillery from Academy Plaza.
- Select every visual node using pointer controls and advance with Arrow keys.
- Use Previous, Overview, and Next node controls.
- Open and close guide notes without obscuring the atlas.
- Move Back from the first stop to Academy Plaza.
- Resume a saved Brewery stop from the Academy map and use Start to replay from stop one.
- Verify descriptive button names and pressed state in the rendered DOM.
- Verify the browser console contains no application errors or warnings.

## Remaining differences

- Brewery and Distillery intentionally use their own imagery, scene counts, node labels, and process cadence rather than duplicating Wine art or curriculum.
- The production build retains the existing non-blocking warning for the pre-existing Three.js/index chunks over 500 KB. The new responsive imagery remains outside those JavaScript chunks.
- Reduced motion was verified through the complete static-study implementation and CSS media rules; the in-app browser surface did not expose live OS motion emulation.

final result: passed

# Account Avatar Roster — Curated Character Selection Design QA

## Comparison target

- User-reported customization screen: `C:\Users\TwoKn\AppData\Local\Temp\codex-clipboard-d1b406a7-664c-483f-a11b-a3e43875cd20.png`
- Updated local route: `http://127.0.0.1:5100/#account/avatar`
- Desktop evidence: `C:\Users\TwoKn\Documents\Codex\artifacts\avatar-roster-2026-08-02\avatar-roster-desktop-1038x656.png`
- Phone evidence: `C:\Users\TwoKn\Documents\Codex\artifacts\avatar-roster-2026-08-02\avatar-roster-mobile-final-390x844.png`
- Saved dashboard evidence: `C:\Users\TwoKn\Documents\Codex\artifacts\avatar-roster-2026-08-02\avatar-dashboard-mobile-final-390x844.png`
- Side-by-side comparison board: `C:\Users\TwoKn\Documents\Codex\artifacts\avatar-roster-2026-08-02\avatar-roster-comparison.png`

## Corrected product model

The former layered body, hair, wardrobe, gear, sensory, and presentation builder has been replaced by a curated character roster. The new experience presents 12 beverage worlds with exactly one adult woman and one adult man in each: Wine, Beer, Spirits, Coffee, Tea, Kombucha, Juice, Milk, Water, Energy Drinks, Protein Drinks, and Soda. The art uses a single original Sip Studies animated-adventure language grounded in the approved Sippy, Roma, and Hummin ecosystem.

Legacy avatar data is preserved. Existing profiles receive a non-destructive curated visual fallback, while a deliberate Save stores the chosen stable roster ID in the same owner-scoped v1 profile record. The Account Dashboard now describes the selected character, beverage world, and role instead of exposing obsolete customization metadata.

## Responsive and interaction QA

- 1038 × 656 desktop/laptop: no horizontal overflow; preview, world controls, progress rail, and active pair use the available width without cropping or collision.
- 390 × 844 phone portrait: all three progress steps fit in one row, the full selected artwork remains visible, world buttons are 52px tall, action buttons are 46px tall, the character pair reflows cleanly, and document horizontal overflow is zero.
- Mobile dashboard: the saved character renders at a readable size and the character/world/role copy matches the selection.
- World switching: Energy Drinks replaced the active Wine pair and loaded the correct two characters.
- Character switching: Dante Cross updated the preview, pressed state, and save label.
- Save flow: the selected roster ID persisted, navigation returned to Account Dashboard, and the new character immediately rendered there.
- Keyboard and assistive semantics: native buttons expose unique names and `aria-pressed`; headings, regions, image alternative text, focus rings, and reduced-motion rules are present. The invalid decorative list role was removed from the world grid.

## Assets and performance

- 24 production WebPs decode successfully at 768 × 768 RGB.
- Combined production weight: 1,410,352 bytes (approximately 1.35 MB).
- The active view mounts the selected preview and current category pair only; it does not eagerly mount all 24 assets.
- The assets are stored at `public/avatar-roster/v2/`, outside this repository's Git LFS-tracked paths.
- The complete generation and provenance record is at `docs/avatar-roster/ASSET-MANIFEST.md`.

## Verification

- `node scripts/avatar-roster.test.mjs`: passed; 24 presets, 12 woman/man pairs, stable paths, useful adult alt text, and all files validated.
- Production typecheck and build: passed.
- Built output contains all 24 WebPs at the expected public paths.
- Clean in-app browser tab: 0 console errors and 0 warnings.
- Known limitation: avatar persistence remains owner-isolated local device storage, matching the pre-existing account behavior; cloud synchronization was not added in this scoped redesign.

final result: passed

# Beyond the Glass — Shared Aged-Paper Notes Design QA

## Comparison target

- User paper reference: `C:\Users\TwoKn\AppData\Local\Temp\codex-clipboard-e0134964-eb48-4e01-836a-a2d0a7877f8e.png`
- Previous flat-note reference: `C:\Users\TwoKn\AppData\Local\Temp\codex-clipboard-b30d1eff-4b26-454a-b9b9-3d65231ac849.png`
- Updated local route: `http://127.0.0.1:5100/#app/btg`
- Phone implementation evidence: `C:\Users\TwoKn\AppData\Local\Temp\btg-parchment-phone-final.png`
- Shared production asset: `public/beyond-the-glass/ui/note-paper-aged-v1.webp` (94,844 bytes).

## System coverage

The generated text-free parchment is now the canonical surface for all eight active BTG instructional-note families: guide cards, study cards, interactive-atlas explanations, reduced-motion scene notes, the reduced-motion Vine study list, visual-lab letters, visual-lab explainers, and copied Field Notebook entries. One cached asset supplies the tactile paper; guide identity remains visible through the character, pin, label, and ink accents.

## Visual comparison

The reference and phone implementation were reviewed together in the same comparison input. The implementation preserves the reference's layered worn perimeter, warm ochre/cream surface, subtle fibers, generous quiet writing area, dark serif heading, and strong readable body ink. The wide source asset deliberately stretches only as a UI paper surface so each responsive card can preserve the same deckled material without introducing a separate crop or large image per note.

## Responsive, contrast, and interaction QA

- 390 × 844 phone portrait: guide and study cards remain fully inside the scene, sprites remain completely inside the guide card, atlas note stays inside its reserved detail panel, and document horizontal overflow is zero.
- 844 × 390 phone landscape: the atlas note remains fully inside its distinct study panel; document horizontal overflow is zero.
- 1024 × 768 laptop: the atlas note remains fully inside the viewport and uses the complete shared texture.
- Guide note ↔ study card switching still works and preserves the existing page-turn deck states.
- Atlas overview, guide-note return, and optional visual-lab entry/return remain operable.
- The visual-lab letter and explainer, plus Field Notebook entries, all resolve to the same production texture.
- Computed fallback contrast ratios are 9.41:1 for body copy, 8.71:1 for headings, and 5.04:1 for metadata.
- Browser console: 0 errors and 0 warnings during the checked journey, note-deck, atlas, and lab states.

## Verification

- Production typecheck and build: passed.
- Navigation regression suite: 9/9 passed.
- Built asset confirmed at `dist/beyond-the-glass/ui/note-paper-aged-v1.webp`.
- Existing non-blocking Vite warning remains limited to the pre-existing Three.js vendor chunk over 500 KB.

final result: passed

# Beyond the Glass Stop 05 — Shared Field Atlas Design QA

## Comparison target

- User-reported mismatch: `C:\Users\TwoKn\AppData\Local\Temp\codex-clipboard-a9473eb4-f567-4116-8211-9d175b81f56f.png`
- Updated local route: `http://127.0.0.1:5100/#app/btg`
- Side-by-side review board: `C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\stop05-qa\comparison.png`
- Shared-shell comparison scene: Stop 06, Harvest Run.

## Corrected design relationship

Stop 05 previously bypassed the common field-atlas component and carried an independent image frame, tilted active label, anatomy timeline, detail layout, state model, and responsive CSS. The result visibly drifted from the other stops even though its visual language originally inspired them.

The updated scene now uses the same cinematic 16:9 frame, right-side desktop study rail, protected paper detail card, Previous/Overview/Next controls, and compact journey dock as the surrounding field atlases. Its authored three-angle artwork, five learning groups, and fourteen anatomy nodes remain intact.

## Responsive and interaction QA

- 1440 × 900 desktop: full illustration, all fourteen nodes, rail, and detail card remain inside the shared frame.
- 1024 × 768 laptop: shared image/detail split matches Stop 06 and every node meets the 44px minimum target.
- 390 × 844 phone portrait: full 16:9 artwork is visible; fourteen 44px nodes use two collision-free perimeter rows; rail, note, controls, and compact dock reflow below the image with zero horizontal overflow.
- 844 × 390 phone landscape: art and study panel use separate safe zones; no node crosses into the detail panel.
- Pointer: every node updates the paper field note and selected state.
- Keyboard: roving focus supports Arrow keys, Home, End, and Escape; exactly one node is tabbable at a time.
- Accessibility: native buttons expose names, pressed state, and a valid detail relationship; the primary study plate now has a descriptive alternative; reduced motion keeps the complete static study.
- Performance: the front study plate loads first; alternate orbit angles are deferred until the learner selects a node.

## Verification

- Production typecheck and build: passed.
- Navigation regression suite: 9/9 passed.
- Focused responsive suite: 12/12 states passed, 56 node interactions, zero runtime errors or warnings.
- Focused mobile suite: 6/6 states passed.
- Artwork: zero crop and zero aspect distortion at all required viewports.

final result: passed

# SIP Academy Map - BTG Image-Node Final Design QA

## Comparison target

- User-reported plain-row state: `C:\Users\TwoKn\AppData\Local\Temp\codex-clipboard-e4bac5a6-de1a-43d0-b07b-eed037705fd6.png`
- Source visual truth: `http://127.0.0.1:5100/#app/btg`, Academy Plaza landmark nodes.
- Updated local route: `http://127.0.0.1:5100/#app/sip-academy-map?guild=cask`
- Same-input comparison: BTG Academy Plaza and SIP Academy controls were rendered side-by-side at matched 720px source viewports during QA.

## Corrected design relationship

The map's flat icon rows and text-only globe pills now use a shared image-led landmark lens system. Every guild and academy control reuses approved opening artwork from its own adventure, surrounded by the campus accent ring, a restrained halo, a small semantic glyph, an eyebrow, a clear destination name, and a separate Enter action. The map retains its own globe, field-note paper, guild hierarchy, country borders, and inspect-versus-enter distinction.

## Visual and responsive QA

- Source and implementation now share dark dimensional destination plates, illuminated borders, concise hierarchy, serif destination titles, cyan/gold state language, and restrained selected-node glow.
- Desktop: complete guild labels, image-medallion globe nameplates, clear Locate/Enter field-note cards, and three readable directory columns.
- Laptop: two directory columns with no text collision or horizontal overflow.
- Phone portrait (390 x 844): two-column guild nodes; compact unselected globe lenses; one expanded selected campus; a fixed active-guild safe rail; controls on a separate row; no collision.
- Phone landscape (844 x 390): full nameplates and reachable globe controls remain in separate safe zones.
- Native button/link labels, pressed states, focus rings, and separate Enter actions remain the accessible source of truth.

## Interaction and accessibility QA

- Selecting Beer updates the URL to `?campus=beer`, focuses Beer on the globe, and keeps Cask Guild active.
- Visible globe nodes use a roving tab stop; hidden nodes are hidden, disabled, and `tabIndex=-1`.
- Globe labels say Inspect rather than Open; entering an adventure remains a separate link.
- A concise live status replaces the former whole-panel announcement.
- Only the selected globe node breathes; reduced motion removes all animation.
- Cream action text preserves small-text contrast; campus color is reserved for rings and halos.
- Browser console: zero errors and zero warnings.

## Verification

- `npm run typecheck`: passed.
- `node scripts/sip-academy-map.test.mjs`: 7/7 passed.
- All fifteen image-lens assets exist at their production paths.
- Work remains local only; no commit, push, merge, or deployment was performed.

final result: passed

# Beyond the Glass - Academy Return Shortcut Design QA

## Intent and placement

- Added one native button labeled `Academy` to the protected top journey rail on every non-Plaza BTG stop.
- The shortcut sits beside the existing stop actions, outside the artwork, interactive nodes, study notes, and journey dock.
- Academy Plaza does not show a redundant Academy button.
- The reduced-motion study view receives the same shortcut at the top of its content.

## Responsive and visual QA

- 1280 x 720 desktop: the 44px-high button remains fully visible in the top rail beside Guide Notes and does not reduce or cover the atlas canvas.
- 390 x 844 phone portrait: Academy, Start, and Notes remain a single compact touch-safe row; the title can wrap independently and the scene, nodes, study card, and bottom navigation remain unobstructed.
- Short phone landscape receives the same compact action spacing and 44px target size.
- Focus uses the established high-contrast water-blue outline; hover uses the existing brass and teal BTG state language.

## Navigation and progress QA

- Wine stop to Academy: jumps directly to Stop 01 without traversing intermediate scroll ranges.
- Brewery stop to Academy: changes to canonical `#app/btg` and presents Academy Plaza.
- The active stop is persisted immediately before leaving, so the Plaza's Continue action retains the learner's exact prior location.
- Open guide notes, labs, and temporary atlas focus close before the route changes; saved atlas choices remain untouched.
- Direct route console: zero application errors and zero warnings.

## Verification

- Production typecheck and build: passed.
- Navigation regression suite: 16/16 passed.
- Existing non-blocking build warning remains limited to pre-existing chunks over 500 KB.
- Work remains local only; no commit, push, merge, or deployment was performed.

final result: passed

# SIP Academy Map — Terrain Reconstruction v2 4K Design QA (2026-08-05)

## Scope and current status

This section tracks the staged v2 terrain reconstruction only. It does not revise or invalidate earlier QA records. The new AI-assisted 4096 × 2048 master, its responsive derivatives, adaptive loader behavior, spherical projection, and device performance have not yet completed final visual and runtime QA.

QA status: **pending**. This section must not be treated as a passed release gate.

## Provenance under review

- Built-in ImageGen was used on 2026-08-05 to enrich the existing terrain while preserving its geography; the result was blended with the authored source and reconstructed into a seamless 2:1 4096 × 2048 SIP Academy terrain master.
- Generation brief summary: one connected, land-dominant world; natural topography and waterways; five distinct but blended guild terroirs; polar and longitude continuity; no floating-island composition; no baked-in buildings, borders, labels, text, logos, or UI.
- Working 4K source master: `sip-academy-terrain-albedo-v2-4096x2048.png`, 4096 × 2048, 15,545,389 bytes. This is an AI-assisted reconstruction/upscale, not a claim of natively captured 4K imagery.
- Responsive production outputs:
  - 1024 × 512 WebP — 287,340 bytes.
  - 2048 × 1024 WebP — 1,113,130 bytes.
  - 4096 × 2048 WebP — 2,526,932 bytes.
- Exact production paths and the full provenance note are recorded in `artifacts/sip-academy-map/ASSET-MANIFEST.md`.

## Staged performance decision

- Compact/mobile, save-data, low-memory, low projected-pixel-width, or limited WebGL capability should select the 1024 × 512 albedo tier.
- Standard capable devices should select 2048 × 1024.
- A capable desktop with sufficient rendered pixel width, device memory, and `MAX_TEXTURE_SIZE >= 4096` may select the 4096 × 2048 albedo.
- Height/displacement remains capped at 2048 × 1024 even when the albedo uses 4K. The 4K-albedo/2K-height pair is estimated at 53.3 MiB of uncompressed RGBA8 texture memory including mipmaps, versus about 85.3 MiB for two 4K maps; this avoids roughly 32 MiB of additional GPU pressure.
- Every requested tier must retain an ordered smaller-file fallback, update diagnostics without exposing them as user-facing content, and dispose superseded textures.

## Pending visual QA matrix

- [ ] 390 × 844 phone portrait: 1K tier; complete world composition; no seam, pole distortion, illegible borders, clipped labels, or navigation collision.
- [ ] 844 × 390 phone landscape: 1K tier; stable orbit and touch controls; no canvas overflow or interaction obstruction.
- [ ] 1024 × 768 laptop: expected 2K tier unless capability/save-data rules lower it; terrain and campus layers remain crisp and aligned.
- [ ] 1440 × 900 desktop: expected 4K only when device-memory and WebGL limits allow it; no delayed interaction or texture pop regression.
- [ ] High-density/4K desktop: verify native-detail benefit at inspection zoom, stable frame pacing, and correct 4K-to-2K pairing.
- [ ] Reduced motion: complete static study remains available without automatic globe movement.

## Pending projection and art checks

- [ ] Compare source master and all WebPs for color, detail retention, aspect ratio, and accidental sharpening/compression artifacts.
- [ ] Inspect the left/right longitude seam at multiple orbit angles and close zoom.
- [ ] Inspect north and south polar joins for pinching, mirrored mountains, or visible bands.
- [ ] Confirm major rivers, lakes, coastlines, terraces, mountain chains, and biome transitions read naturally when curved onto the sphere.
- [ ] Confirm guild/campus overlays, golden borders, 3D architecture, nodes, and CSS2D labels remain registered to their intended terrain coordinates.
- [ ] Confirm albedo contains no generated text, labels, borders, buildings, logos, or interface artifacts.

## Pending technical and accessibility checks

- [ ] Build and typecheck pass with the staged terrain selector and globe integration.
- [ ] Automated tier-selection tests cover compact layout, DPR-projected width, save-data, device memory, `MAX_TEXTURE_SIZE`, and all fallback sequences.
- [ ] Asset-integrity checks verify every production path, byte size, dimensions, and decodability.
- [ ] Browser-console checks show no texture load, WebGL, memory, or disposal errors at any required viewport.
- [ ] Pointer, touch, keyboard, focus, screen-reader labeling, and refocus behavior remain intact while each texture tier is active.
- [ ] Representative hardware measurements cover transfer size, decode/upload time, time to interactive, orbit frame pacing, and memory stability over repeated mount/unmount cycles.

## Completed local verification — 2026-08-05

- [x] The supplied pre-update globe screenshot and the refreshed runtime globe were reviewed together at the same product state. Coastlines, river valleys, forests, beaches, ocean shelves, and mountain chains are materially sharper without changing the existing guild geography.
- [x] Browser runtime at 1280 × 720 selected the 2048 × 1024 albedo and 2048 × 1024 height tiers, reported `terrain-3d`, and remained crisp at default and close zoom.
- [x] Keyboard rotation exposed the opposite hemisphere without a visible longitude seam, broken coast, missing texture, or campus-coordinate drift.
- [x] The 4096 × 2048 WebP is served by the local preview with HTTP 200 and the exact authored 2,526,932-byte payload.
- [x] Adaptive selector, fallback order, anisotropy, WebP dimensions, transfer budgets, LFS-pointer guard, and world-overview navigation: 16/16 targeted tests passed.
- [x] Production typecheck and build passed. The only build advisory is the existing large-chunk warning; no new terrain warning or application error was emitted.
- [x] Browser console contained no application errors or texture/WebGL warnings.
- [x] Compact, save-data, low-memory, standard, and 4K-capable decisions are covered by the pure device matrix. The phone path stays at 1024 × 512; standard laptop rendering uses 2048 × 1024; sufficiently capable large desktops receive 4096 × 2048.

The changes remain local only. No commit, push, merge, RGRD release run, deployment, or production publish was performed.

Release verdict for this local terrain-resolution scope: **passed**. A physical-device production stress matrix remains appropriate before a future deployment.

final result: passed
