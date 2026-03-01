Original prompt: all of the above, please you are free to recreate their images to create scenario specific images of Sippy and Roma to match the game

## Progress Log
- Initialized progress tracking for Sip Academy wine lesson game iteration.
- Confirmed scenario-specific Sippy/Roma variants exist in `src/assets/brand/characters/variants` and are already imported in the lesson component.
- Added unlock ceremony behavior to `SipAcademyWineLessons.tsx` with auto-dismiss and click-to-close controls.
- Added unlock ceremony overlay UI with celebration portraits, unit/title copy, and continue button.
- Added missing academy styles in `src/styles.css` for voice mode controls, unlocked lesson node flash/shimmer, and ceremony card visuals.
- Build verification passed: `npm.cmd run build` (TypeScript + Vite production build successful).

## TODO
- Optional visual QA pass in browser for animation timing polish on low-end devices.
- Optional image optimization pass for large source portraits (`roma-guide`, `sippy-guide`) if bundle size is a priority.
- Verified variant image dimensions: all 8 scenario portraits are 640x640 (square crop for centered avatar framing).
- Fixed descriptor mapping in src/lib/flavorImageResolver.ts: elderflower now resolves to elderflower.png instead of the old proxy mapping.
- Re-ran 
pm.cmd run build after elderflower mapping fix: successful.
