# Design QA: Bev Recipes relationship map and Cocktail Family Tree

## Scope

- Product area: `#app/cocktails` / Bev Recipes
- Branch: `Improvements`
- Review date: 2026-07-24
- Requested outcome:
  - restore the relationship map as always-visible content;
  - remove the collapsed disclosure and its empty desktop grid area;
  - add a student-friendly Cocktail Family Tree directly before `03 Test Your Product Knowledge`;
  - preserve a readable mobile experience.

## Visual truth and implementation evidence

The supplied screenshot and all implementation captures were reviewed against the same local Vite preview at `http://127.0.0.1:5100`.

### Source and before-state evidence

- User-supplied screenshot: `C:\Users\TwoKn\AppData\Local\Temp\codex-clipboard-521046d1-d966-4e45-85c1-e6a6753546ab.png`
- Desktop before state: `C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\artifacts\bev-recipes-family-tree-2026-07-24\01-before-map-desktop.png`
- Mobile before state: `C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\artifacts\bev-recipes-family-tree-2026-07-24\02-before-map-mobile.png`

### Final implementation evidence

- Restored desktop map: `...\20-after-map-desktop-final.png`
- Restored mobile map: `...\21-after-map-mobile-final.png`
- Family Tree desktop: `...\12-family-tree-desktop-final.png`
- Family Tree desktop lower section and section 03 order: `...\13-family-tree-desktop-lower-final.png`
- Family Tree mobile: `...\10-family-tree-mobile.png`
- Family Tree mobile lower section and section 03 order: `...\11-family-tree-mobile-lower.png`

The abbreviated paths share this directory:

`C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\artifacts\bev-recipes-family-tree-2026-07-24`

### Paired comparison inputs

The reference and implementation were placed together in the same comparison images and inspected:

- `14-map-before-after-comparison.png`
- `15-map-mobile-before-after-comparison.png`
- `16-family-tree-style-comparison.png`
- `22-family-tree-responsive-comparison.png`

### Capture geometry

| Mode | Source pixels | Implementation pixels | CSS viewport | DPR |
| --- | --- | --- | --- | --- |
| Desktop | 1146 × 912 | 1146 × 912 | 1146 × 912 | 1 |
| Tablet | — | 768 × 900 | 768 × 900 | 1 |
| Mobile | 390 × 844 | 390 × 844 | 390 × 844 | 1 |

## Comparison findings and correction history

| Severity | Before or first iteration | Correction | Final status |
| --- | --- | --- | --- |
| P1 | A closed `<details>` element still spanned both rows of the desktop map grid, creating the large blank area shown in the supplied screenshot. | Restored the map's former always-visible semantic `<article>` structure and removed the disclosure control. | Fixed |
| P1 | Restoring the radial map exposed edge-clamped node collisions in the legacy placement solver. | Made collision resolution boundary-aware, added a nearest-clear fallback, and increased the radial stage's usable vertical area. The final desktop and tablet cocktail maps have no node overlap above the five-pixel QA threshold. | Fixed |
| P1 | The literal radial layout produced overlapping pills at a 390px viewport. | Converted the same map content to a two-column, static-position mobile grid below 620px, keeping every relationship selectable and the active recipe first. | Fixed |
| P2 | The map lacked an always-visible explanation after its disclosure summary was removed. | Added a Sipopedia-aligned heading and concise affinity/recenter instructions. | Fixed |
| P2 | Bev Recipes had no simple teaching hierarchy between individual recipes and the final knowledge test. | Added `02 Cocktail Family Tree`, covering all 24 current cocktails once across Spirit-forward, Sours, and Tall & sparkling parent families. | Fixed |
| P2 | A family tree could imply disputed historical ancestry or become another dense diagram. | Used an explicit build-template model, formula-first branches, a study caveat, and semantic lists/buttons rather than a second radial graphic. | Fixed |
| P2 | A dense tree could become difficult to scan or tap on phones. | Stacked parent families and leaves into one reading column, preserved 48px minimum controls, and kept the active cream-to-cyan state with `aria-current`. | Fixed |
| P3 | The shared development shell emits a pre-existing React `fetchPriority` casing warning for its header image. | Confirmed the warning originates in `WorkspaceShell`, not Bev Recipes, and does not cause a runtime failure or production build failure. | Follow-up; non-blocking |

No open P0, P1, or P2 issues remain in the requested scope.

## Functional, responsive, and accessibility checks

- Confirmed the relationship map is always visible and no disclosure control remains.
- Confirmed all 24 cocktail nodes render on desktop, tablet, and mobile.
- Measured the final cocktail-map node rectangles at 1146px and 768px; no collision exceeded the five-pixel QA threshold.
- Audited the desktop Wine, Beer, Cocktail, Sake, and Coffee maps after the solver update; no map had a collision above the five-pixel threshold.
- Confirmed the mobile map uses a two-column CSS grid with statically positioned buttons instead of overlapping radial coordinates.
- Confirmed the Family Tree covers all 24 current cocktails exactly once and omits nonexistent relative IDs.
- Selected `Margarita` and `French 75` from tree leaves; each selection updated the current leaf, active state, search/map center, photo, details, technique lab, and nearest relatives through the existing `selectItem` workflow.
- Confirmed the selected leaf exposes `aria-current="true"`.
- Confirmed tree controls retain visible keyboard focus and exceed the 44px minimum touch target.
- Confirmed `02 Cocktail Family Tree` appears immediately before `03 Test Your Product Knowledge` on desktop and mobile.
- Reviewed target-page console output; no Bev Recipes runtime exception or component error was present. Only the shared-shell P3 warning above remains.

## Automated verification

- `git diff --check` — passed
- `npm run typecheck` — passed
- `npm run build` — passed
- `npm run smoke:routes` — 51/51 passed
- `npm run rgrd:check` — passed, including:
  - security tests;
  - secret guard;
  - `npm audit` with 0 vulnerabilities;
  - Supabase Edge Function type checks;
  - Replit dry-run build;
  - production build;
  - Git LFS pointer guard;
  - RGRD manifest verification;
  - 51-route smoke suite.

The only build note is the repository's existing non-fatal Three.js chunk-size warning.

## Final result

passed
