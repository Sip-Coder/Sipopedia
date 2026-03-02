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
- Expanded `src/components/SipAcademyWineLessons.tsx` from 3 lessons to 20 missions (5 realms x 4 missions) with mission metadata: `realm`, `mission`, `difficulty`, and mentor ownership.
- Added new campaign systems to Sip Academy UI: Next Quest spotlight, 5-realm map cards with boss status, quest log panel, mission badges, difficulty chips, rank in lesson summary, and recommended next mission block.
- Updated mentor guidance flow so Sippy/Roma lead based on each lesson's assigned mentor (including summary states).
- Added and tuned styles in `src/styles.css` for new campaign UI blocks: realm cards, spotlight panel, quest log, mission badges, and updated responsive behavior for 20-node path readability.
- Validation: `npx.cmd vite build` passed (production bundle successful).
- Validation note: `npx.cmd tsc -p tsconfig.app.json --noEmit --pretty false` still fails on pre-existing issue in `src/App.tsx` (`Flavors` export mismatch), unrelated to Sip Academy changes.
- Added active realm cinematic preview in Sip Academy using local Sippy/Roma variant assets (animated poster pan + guide overlays) for stronger game-like UX before external media generation.
- Added lesson-node mentor thumbnails and mission metadata presentation improvements in `SipAcademyWineLessons.tsx`.
- Added media generation documentation: `docs/sip_academy_media_generation.md` with direct ImageGen/Sora command workflows.
- Added batch prompt packs:
  - `tools/sip_academy_image_batch.jsonl`
  - `tools/sip_academy_sora_batch.jsonl`
- Ran dry-run validation for both skills (no API key required):
  - `image_gen.py generate-batch ... --dry-run`
  - `sora.py create-batch ... --dry-run`
  Both parsed successfully and produced expected request previews.
- Current blocker for live media generation remains environment auth: `OPENAI_API_KEY` is not set in this shell.
- Verification passed after UI/media wiring:
  - `npx.cmd tsc -p tsconfig.app.json --noEmit --pretty false`
  - `npx.cmd vite build`
