# Design QA: Compact Sipopedia navigation

## Scope

- Product area: public header and all Sipopedia workspace routes
- Branch: `Improvements`
- Review date: 2026-07-24
- Reference visual truth: `https://sipopedia-reference.sipstudies.chatgpt.site/`
- Requested outcome:
  - retain the reference experiment's slim app bar, grouped destinations, search, and keyboard efficiency;
  - reduce visual and decision complexity;
  - make the menu compact and dependable on phones;
  - keep route visibility and counts synchronized with Boss Room publication settings.

## Source and implementation evidence

All captures are stored in:

`C:\Users\TwoKn\Documents\Codex\2026-07-20\prior-conversation-with-codex-conversation-role\artifacts\menu-redesign-2026-07-24`

### Source captures

- `02-reference-menu-desktop.png` — reference desktop menu
- `03-reference-menu-mobile-closed.png` — reference mobile app bar
- `04-reference-menu-mobile-open.png` — reference mobile drawer
- `07-current-menu-desktop-closed.png` — production menu before this change
- `08-current-menu-desktop-expanded.png` — production menu before this change, expanded

### Final implementation captures

- `25-after-public-desktop-open-final-compact.png` — compact desktop overlay drawer
- `13b-after-public-mobile-closed.png` — compact mobile app bar
- `14-after-public-mobile-open.png` — mobile drawer
- `15-after-workspace-mobile-closed.png` — mobile workspace with no oversized welcome hero
- `18-after-workspace-tablet-closed.png` — tablet workspace
- `19b-after-workspace-1440-final.png` — wide workspace with persistent sidebar

### Paired comparison inputs inspected

- `26-desktop-reference-implementation-final.png` — final desktop full-view comparison
- `23-mobile-closed-reference-implementation.png` — mobile app-bar comparison
- `24-mobile-open-reference-implementation.png` — mobile drawer comparison
- `27-desktop-drawer-focused.png` — focused typography, spacing, grouping, and active-state comparison

The focused crop was required because the full desktop comparison made small route labels difficult to judge precisely.

## Capture geometry and normalization

| Mode | CSS viewport | Source pixels | Implementation pixels | Normalization | DPR |
| --- | --- | --- | --- | --- | --- |
| Desktop overlay, open | 1146 × 912 | 1131 × 900 | 1146 × 912 | Implementation normalized to 1131 × 900 for paired comparison | 1 |
| Mobile, closed | 390 × 844 | 375 × 812 | 375 × 812 | None | 1 |
| Mobile, open | 390 × 844 | 375 × 812 | 390 × 844 | Implementation normalized to 375 × 812 for paired comparison | 1 |
| Tablet workspace | 1024 × 768 | — | 1009 × 757 | Browser scrollbar excluded | 1 |
| Wide workspace | 1440 × 900 | — | 1425 × 891 | Browser scrollbar excluded | 1 |

The source and implementation use the same dark theme and menu state in each paired comparison. Production page content intentionally differs from the experiment; the comparison target is navigation composition, density, typography, states, and responsiveness.

## Comparison history and corrections

| Severity | Earlier finding | Correction | Post-fix evidence |
| --- | --- | --- | --- |
| P1 | The original production workspace used a second, competing navigation system: status card, three lane cards, four action controls, lobby pills, and a horizontal module rail. It occupied multiple stacked rows on phones. | Replaced both public and workspace navigation with one shared compact component driven by canonical route data. | `25-after-public-desktop-open-final-compact.png`, `14-after-public-mobile-open.png`, `19b-after-workspace-1440-final.png` |
| P1 | A closed off-canvas drawer could remain keyboard-reachable, and Escape could fall through to the workspace shortcut that navigates to Launch Pad. | Closed overlay drawers now receive `aria-hidden` and `inert`; open drawers trap focus, lock body scroll, stop Escape propagation, restore focus, and gate global workspace shortcuts. | Browser checks confirmed `inert`, `aria-hidden="true"`, cleared body overflow, restored Menu focus, and an unchanged route after Escape. |
| P2 | The first direct workspace capture still expanded the large Welcome hero above the current module, recreating above-the-fold clutter. | Limited the expanded hero to the Launch Pad only; direct module routes now start with the app bar and module content. | Before: `11-after-workspace-1146-closed.png`; after: `15-after-workspace-mobile-closed.png`, `18-after-workspace-tablet-closed.png`, `19b-after-workspace-1440-final.png` |
| P2 | The first overlay implementation used a 296px desktop/tablet drawer, slightly wider than the reference and less compact than requested. | Tightened the medium-screen drawer to 280px while retaining the 318px mobile maximum for readable text and touch targets. | First comparison: `22-desktop-reference-implementation.png`; final comparison: `26-desktop-reference-implementation-final.png` |

No open P0, P1, or P2 findings remain.

## Required fidelity review

### Fonts and typography

- Reused Sipopedia's existing `Space Grotesk` and body-font stack.
- Route titles use stronger optical weight than metadata; detail text remains secondary without dropping below the established mobile type scale.
- The implementation intentionally uses larger route text than the reference on mobile so destination labels remain readable.
- Long current-route and row labels truncate without shifting controls.

### Spacing and layout rhythm

- App bar is 62px on desktop/tablet and 58px on mobile.
- Wide workspaces use a 232px persistent sidebar from 1280px upward.
- Compact desktop/tablet uses a 280px overlay drawer to avoid shrinking route content before its viewport media queries activate.
- Mobile uses an off-canvas drawer up to 318px wide, 50px route rows, safe-area padding, and a visible backdrop target.
- No horizontal overflow was present at 1440px, 1024px, or 390px.

### Colors and visual tokens

- Reused the production navy, cyan, teal, cream, and chestnut tokens.
- Active destinations use border, background, left indicator, and font weight so state does not depend on color alone.
- Focus rings use the existing cream highlight at accessible visual prominence.

### Image quality and asset fidelity

- Reused the repository's real optimized Sip Studies seal and wordmark.
- No placeholder imagery, emoji, custom SVG, inline SVG, CSS illustration, or simulated brand asset was introduced.
- The compact header swaps from seal plus wordmark to seal plus `Sipopedia` text on narrow screens to prevent the prior oversized lockup.

### Copy and content

- Menu copy comes from the current workspace registry and curated production essentials.
- Retired experimental utility routes—checkout outcomes, policies, signed-out landing, Avatar Creator, and old cohort/enrollment pages—were not copied into the primary student menu.
- `Favorites`, current Learn/Taste/Connect modules, account actions, and admin-only Boss routes remain accurate to the production app.

## Functional, responsive, and accessibility checks

- Confirmed route groups and counts derive after `shouldShowInPublicNav(...)` filtering, so Boss Room `public`/`edit`/`off` updates immediately change navigation and counts.
- Confirmed nested Regions, Grapes, and AI Winecast routes highlight their parent destination.
- Confirmed persistent sidebar at 1440px, overlay drawer at 1024px and 1146px, and mobile drawer at 390px.
- Confirmed active route auto-scrolls into view when a long group opens.
- Confirmed drawer search filters across all visible groups.
- Confirmed Arrow Up/Down, Home/End, and Enter select filtered destinations.
- Confirmed `Ctrl/Cmd + K` opens public drawer search and workspace global search.
- Confirmed workspace `Shift + Left/Right`, `Ctrl + Left/Right`, and `Ctrl + Shift + Left/Right` handlers remain in place and are gated while a drawer or search layer is open.
- Confirmed overlay click, Escape, and route selection close the drawer.
- Confirmed body scroll locking and cleanup.
- Confirmed focus trapping and focus return.
- Confirmed closed overlay drawers are `aria-hidden` and `inert`.
- Confirmed mobile route controls are at least 50px high.
- Confirmed no new console errors after fresh navigation through Home and Flavor Blog.

## Automated verification

- `git diff --check` — passed
- `npm run typecheck` — passed
- `npm run rgrd:check` — passed, including:
  - 4/4 security tests;
  - secret guard;
  - `npm audit` with 0 vulnerabilities;
  - all Supabase Edge Function type checks;
  - Replit dry-run build;
  - production build;
  - Git LFS pointer guard;
  - RGRD manifest verification;
  - 51/51 route smoke checks.

The build retains the repository's existing non-fatal Three.js chunk-size warning.

## Final result

passed
