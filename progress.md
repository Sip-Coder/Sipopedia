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
- Live Image API generation attempt executed after key load, but all jobs failed with OpenAI error: `billing_hard_limit_reached`.
- Because billing hard limit is reached, both ImageGen and likely Sora live generation are blocked until billing/payment limits are adjusted.
- Security note: API key was pasted in chat and used in terminal command context; key should be revoked/rotated immediately.
- Analyzed newly added `DUMP IN` content and inventoried major buckets: maps/docs (`CWE Maps 2025`), logos/flavor assets, and new character/art drop in `Sippy & Roma`.
- Selected and integrated existing local artwork into Sip Academy realm cinematics (no API generation):
  - `/academy/realms/realm-1-crystal-atrium.jpg` (from `image (20).jpg`)
  - `/academy/realms/realm-2-varietal-wilds.jpg` (from `image (24).jpg`)
  - `/academy/realms/realm-3-terroir-peaks.jpg` (from `image (27).jpg`)
  - `/academy/realms/realm-4-cellar-citadel.jpg` (from `image (23).jpg`)
  - `/academy/realms/realm-5-grand-sommelier-arena.jpg` (from `image (22).jpg`)
  - Guide portraits: `/academy/guides/sippy-guide.jpg`, `/academy/guides/roma-guide.jpg`
- Wired `REALM_MEDIA` in `src/components/SipAcademyWineLessons.tsx` to these local files.
- Integrated `DUMP IN/BG` assets into Sip Academy shell for stronger game feel:
  - `/academy/ui/bg-stars.png`
  - `/academy/ui/bg-grid.png`
  via layered CSS backgrounds in `src/styles.css`.
- Validation: `npm.cmd run build` passed after local DUMP IN artwork integration (TypeScript + Vite build successful).
- Localhost startup troubleshooting resolved: successful launch depends on Vite running cleanly on `127.0.0.1:5173`; stale port-holding processes can block startup.
- Added a new `Sip Academy` Story-mode experience backed by Regions data:
  - New globe-driven country selector (same globe interaction style as Tasting Groups/Tasting Map).
  - Per-country, per-region chapter view with Hummin-perspective narrative sections.
  - Story audio controls at the top (play/pause/resume/stop using browser speech synthesis).
  - Story mode now renders dedicated content while Classic/Tactical retain campaign gameplay.
- Refined Story mode based on UX feedback:
  - Converted split section cards into one long-form Hummin travel-tale chapter per country (storybook style with factual teaching points).
  - Audio narration now reads the full long-form country tale.
  - Added resilient region-image fallbacks: region image -> country image -> Unsplash query -> inline SVG fallback.
- Story audio + UX controls upgrade:
  - Preserved the successful preferred voice matching strategy (UK male priority list with stable fallbacks).
  - Added fixed floating mini audio controls in top-right while scrolling.
  - Added playback speed controls (`1x`, `1.5x`, `1.8x`, `2x`, `2.5x`) in both primary and floating audio controls.
  - Speed changes now restart narration from the current tracked listening position rather than from the beginning.
  - Expanded country-story generator with seeded variation for unique intro/adventure/closing flavor per country while keeping Hummin -> Sippy/Roma perspective.
