# Photo Generation Workflow

This file documents the repeatable image-generation process for Sip Studies project assets.

## Current Findings

- Cocktail photos are consumed by `src/components/Cocktails.tsx`.
- Cocktail image paths follow `public/cocktails/{id}.png`.
- Beer recipe image paths follow `public/beers/{id}.png`.
- No dedicated cocktail prompt JSONL or cocktail generation runbook was found during repository review.
- Existing generation workflows use the Codex imagegen CLI:
  `C:\Users\TwoKn\.codex\skills\.system\imagegen\scripts\image_gen.py`
- Existing prompt batches live in `tmp/imagegen/` or `tools/`.
- Final project assets should live under `public/` when referenced by the website.

## Commodity Photo Convention

For `Grapes & Grains`, generated non-grape commodity photos use:

```text
public/commodities/{commodity}/{id}.png
```

Examples:

```text
public/commodities/grains/barley.png
public/commodities/hops/citra.png
public/commodities/coffee/arabica.png
public/commodities/tea/oolong.png
public/commodities/fruit/apple.png
```

The data source is `src/data/commodityStudies.ts`.

Current generated set:

- `grains`: 12 images
- `hops`: 19 images
- `coffee`: 10 images
- `tea`: 11 images
- `fruit`: 10 images

Total: 62 generated commodity images.

## Prompt Rules

Use one static educational reference image per commodity variety.

Recommended shared visual language:

- Photorealistic studio macro or tabletop educational reference photo.
- Single primary subject, centered, fully visible, generous margin.
- Dark teal educational studio background compatible with Sip Studies UI.
- Natural texture and realistic morphology.
- No text, no labels, no watermark, no hands, no logos, no packaging.
- Avoid glassware unless the subject itself requires showing a finished beverage.
- Avoid cluttered lifestyle scenes; these are study reference photos.

## CLI Batch Shape

Use JSONL where each line is one image job:

```json
{"model":"gpt-image-2","prompt":"...","use_case":"photorealistic-natural","style":"macro educational product photography","composition":"centered single subject with generous margin","constraints":"no text, no watermark, no logos, no hands","size":"1024x1024","quality":"medium","out":"grains/barley.png"}
```

Run with:

```powershell
python "C:\Users\TwoKn\.codex\skills\.system\imagegen\scripts\image_gen.py" generate-batch `
  --input "tmp\imagegen\commodity-photos.jsonl" `
  --out-dir "public\commodities" `
  --concurrency 2 `
  --max-attempts 2 `
  --force
```

Load `OPENAI_API_KEY` from an ignored local secret file before running. Do not paste or hardcode API keys in tracked files.

## Verification

After generation:

1. Confirm every referenced image exists under `public/commodities/...`.
2. Open a few representative images with the local image viewer.
3. Run `npm run build`.
4. Visually inspect `Grapes & Grains` index and detail pages.

## Current API Access Note

The first `gpt-image-2` smoke test reached the OpenAI API, but the organization was blocked by verification requirements for `gpt-image-2`.

Resolution options:

- Verify the OpenAI organization, then rerun `tmp/imagegen/commodity-photos.jsonl`.
- Use the same JSONL with an approved fallback image model after explicit approval.

## Successful Commodity Batch - 2026-04-29

`gpt-image-2` was blocked by OpenAI organization verification, so the commodity batch was generated after explicit approval with the `gpt-image-1.5` fallback.

Fallback batch file:

```text
tmp/imagegen/commodity-photos-gpt-image-1.5.jsonl
```

Fallback command pattern:

```powershell
python "C:\Users\TwoKn\.codex\skills\.system\imagegen\scripts\image_gen.py" generate-batch `
  --model gpt-image-1.5 `
  --input "tmp\imagegen\commodity-photos-gpt-image-1.5.jsonl" `
  --out-dir "public\commodities" `
  --concurrency 2 `
  --max-attempts 2 `
  --force
```

Important CLI behavior discovered:

- Passing `--model gpt-image-1.5` on the command is safer than relying only on per-job `"model"` fields.
- The CLI can flatten outputs under `public/commodities` depending on command/model handling. If files are written flat, move them into the nested paths defined by each job's `"out"` value.
- A one-job fallback retry should also pass `--model gpt-image-1.5`; otherwise the CLI may default back to `gpt-image-2`.
- After moving files, verify expected paths from the JSONL rather than only counting files.

PowerShell move/verification pattern used:

```powershell
$batch = Get-Content tmp\imagegen\commodity-photos-gpt-image-1.5.jsonl | ForEach-Object { $_ | ConvertFrom-Json }
foreach ($job in $batch) {
  $flatPath = Join-Path "public\commodities" ([System.IO.Path]::GetFileName($job.out))
  $targetPath = Join-Path "public\commodities" $job.out
  $targetDir = Split-Path $targetPath -Parent
  if (-not (Test-Path $targetDir)) { New-Item -ItemType Directory -Path $targetDir | Out-Null }
  if ((Test-Path $flatPath) -and ($flatPath -ne $targetPath)) {
    Move-Item -LiteralPath $flatPath -Destination $targetPath -Force
  }
}

$expected = $batch | ForEach-Object { Join-Path "public\commodities" $_.out }
$missing = $expected | Where-Object { -not (Test-Path $_) }
"expected: $($expected.Count)"
"missing: $($missing.Count)"
```

Final verification:

- Expected commodity images: 62
- Missing commodity images: 0
- Nested files present: 62
- Representative images opened and checked:
  - `public/commodities/grains/barley.png`
  - `public/commodities/hops/citra.png`
  - `public/commodities/coffee/arabica.png`
  - `public/commodities/tea/oolong.png`
  - `public/commodities/fruit/apple.png`
- `npm run build` passed.

## Commodity Three-View Rotation Batch - 2026-04-29

The grape pages already had complete turntable frame sets, so the missing three-view work applied to non-grape `Grapes & Grains` commodities.

Frame convention:

```text
public/commodities/{commodity}/{id}.png
public/commodities/{commodity}/{id}-side.png
public/commodities/{commodity}/{id}-back.png
```

The existing front-view image is frame 1. The generated `side` and `back` edits are frames 2 and 3.

UI/data wiring:

- `src/data/commodityStudies.ts` assigns `turntableFrameUrls` for every commodity profile.
- `src/components/Grapes.tsx` uses the same turntable viewer controls for grapes and commodities.
- Commodity detail pages now render the three-view viewer in the hero.
- Viewer behavior supports left/right rotation buttons, drag rotation, zoom buttons, reset, and two-finger panning on mobile.
- Viewer touch gestures are excluded from page-level swipe navigation.

Generation approach:

- Use the existing front image as the edit reference.
- Generate only missing `*-side.png` and `*-back.png` files.
- Use explicit fallback model selection:

```powershell
python "C:\Users\TwoKn\.codex\skills\.system\imagegen\scripts\image_gen.py" edit `
  --model gpt-image-1.5 `
  --image "public\commodities\hops\citra.png" `
  --prompt-file "tmp\imagegen\commodity-turntable-prompts\hops-citra-side.txt" `
  --out "public\commodities\hops\citra-side.png" `
  --size 1024x1024 `
  --quality medium `
  --output-format png `
  --force
```

Batch result:

- Front frames: 62
- Side frames: 62
- Back frames: 62
- Total commodity rotation assets: 186
- `npm run build` passed after wiring and generation.

## Fruit-Specific Photo Expansion - 2026-04-29

The `Other Fruit` subtab originally grouped many visible fruits into broad profiles such as `berries`, `citrus`, `stone-fruit`, and `tropical-fruit`. The UI now points each visible fruit entry to its own profile and image set.

Visible fruit entries covered:

```text
cherry
pomegranate
raspberry
strawberry
cranberry
blueberry
huckleberry
bilberry
blueberry-jam
blue-purple-berry-notes
blackberry
black-cherry
blackcurrant
black-plum
blackcurrant-style-berry
lemon
lime
grapefruit
orange
mandarin
yuzu
apple
pear
quince
asian-pear
baked-apple
peach
apricot
plum
nectarine
white-peach
mango
pineapple
passion-fruit
guava
papaya
ripe-banana
```

Generated batch:

- New fruit-specific IDs: 31
- Frames generated per new ID: 3
- New images generated: 93
- Existing fruit-specific IDs reused: apple, pear, quince, cherry, pomegranate, pineapple
- Visible fruit entries now covered: 37
- Missing visible fruit frames after verification: 0

Batch file:

```text
tmp/imagegen/fruit-specific-photos-gpt-image-1.5.jsonl
```

Command pattern:

```powershell
python "C:\Users\TwoKn\.codex\skills\.system\imagegen\scripts\image_gen.py" generate-batch `
  --model gpt-image-1.5 `
  --input "tmp\imagegen\fruit-specific-photos-gpt-image-1.5.jsonl" `
  --out-dir "public\commodities" `
  --concurrency 2 `
  --max-attempts 2 `
  --force
```

CLI note:

- The CLI flattened this batch under `public/commodities`, so outputs were moved into `public/commodities/fruit`.
- The first job again received an auto filename and was manually renamed to `public/commodities/fruit/raspberry.png`.
- After cleanup, flat PNG leftovers under `public/commodities` were verified as `0`.

Validation:

- `public/commodities/fruit` has 41 front frames, 41 side frames, and 41 back frames. This includes broad family profiles plus the visible fruit-specific entries.
- The 37 fruit entries visible in the UI all have front, side, and back images.
- Representative images opened and checked: raspberry, lemon, mango.
- `npm run build` passed.

## Bev Recipes Wine And Beer Photos - 2026-04-29

Wine and beer under `Bev Recipes` now follow the cocktail photo convention with generated primary photos and an additional color-study image.

Asset conventions:

```text
public/wines/{id}.png
public/wines/{id}-color.png
public/beers/{id}.png
public/beers/{id}-color.png
```

Generated set:

- Wine styles: 20
- Beer styles: 12
- Primary scene photos: 32
- Tilted color-study photos: 32
- Total images generated: 64

UI wiring:

- `src/components/Cocktails.tsx` consumes primary photos through the existing `BevPhoto` component.
- A new color-study panel displays for `wine` and `beer` only.
- The color-study panel appears beside `Nearest relatives` on desktop and stacks below it on mobile.
- Cocktail pages remain unchanged and do not render the color-study panel.

Prompt approach:

- Wine primary photos use a wine glass and regional bottle style on an elegant table in the relevant vineyard region.
- Wine prompts include terroir, regional architecture, vineyard setting, and likely vine-training cues based on origin.
- Beer primary photos use the appropriate beer glass and regional bottle style on a tasting-room or beer-hall counter.
- Beer prompts include brewing equipment, regional ambiance, beer style, glassware, ingredients, and foam/color expectations.
- Color-study photos use one tilted glass, no bottle, and a clean dark teal studio background to show hue, clarity, concentration, rim/core, foam, or viscosity.
- All prompts prohibit readable labels, logos, people, hands, text overlays, and watermarks.

Batch file:

```text
tmp/imagegen/bev-recipes-wine-beer-photos-gpt-image-1.5.jsonl
```

Command pattern:

```powershell
python "C:\Users\TwoKn\.codex\skills\.system\imagegen\scripts\image_gen.py" generate-batch `
  --model gpt-image-1.5 `
  --input "tmp\imagegen\bev-recipes-wine-beer-photos-gpt-image-1.5.jsonl" `
  --out-dir "public" `
  --concurrency 2 `
  --max-attempts 2 `
  --force
```

CLI note:

- The CLI flattened outputs under `public`.
- Outputs were moved into `public/wines` and `public/beers` according to each JSONL job's `out` value.
- After cleanup, no matching flat PNG leftovers remained in `public`.

Validation:

- `public/wines`: 20 primary images and 20 color-study images.
- `public/beers`: 12 primary images and 12 color-study images.
- Representative images opened and checked: Left Bank Bordeaux, Riesling color study, Pilsner, Stout color study.
- `npm run build` passed.

## Bev Recipes Color Study V2 - 2026-04-29

Regenerated only the wine and beer color-study assets, leaving primary scene photos unchanged.

Asset paths overwritten:

```text
public/wines/{id}-color.png
public/beers/{id}-color.png
```

Generated set:

- Wine color studies: 20
- Beer color studies: 12
- Total replacement images: 32

Prompt changes from V1:

- White examination background instead of dark teal studio background.
- One tilted glass angled roughly 35 to 45 degrees, as if pointed away from the viewer.
- Full rim and bowl visible with generous white margin.
- Beverage pools on one side to show hue, rim, core, concentration, foam, haze, or clarity.
- Per-style color cues were added so wine varieties and beer styles show distinct visual differences.
- No bottles, labels, hands, people, chart text, logos, or watermarks.

Batch file:

```text
tmp/imagegen/bev-recipes-color-study-v2-gpt-image-1.5.jsonl
```

Command pattern:

```powershell
$raw = Get-Content -LiteralPath "local-secrets\api for supabase.rtf" -Raw
$env:OPENAI_API_KEY = ([regex]::Match($raw, 'sk-proj-[A-Za-z0-9_\-]+')).Value
python "C:\Users\TwoKn\.codex\skills\.system\imagegen\scripts\image_gen.py" generate-batch `
  --model gpt-image-1.5 `
  --input "tmp\imagegen\bev-recipes-color-study-v2-gpt-image-1.5.jsonl" `
  --out-dir "public" `
  --concurrency 2 `
  --max-attempts 2 `
  --force
```

CLI note:

- The CLI again flattened outputs under `public`.
- Outputs were moved into `public/wines` and `public/beers` according to each JSONL job's `out` value.
- After cleanup, flat `*-color.png` leftovers under `public` were verified as `0`.

Validation:

- `public/wines`: 20 color-study images.
- `public/beers`: 12 color-study images.
- Representative images opened and checked: Albarino, Cabernet Sauvignon, Pilsner, Stout.

## Bev Recipes Color Study V3 - 2026-04-29

Regenerated wine and beer color-study assets again after V2 tilted the entire glass too much.

Asset paths overwritten:

```text
public/wines/{id}-color.png
public/beers/{id}-color.png
```

Generated set:

- Wine color studies: 20
- Beer color studies: 12
- Total replacement images: 32

Prompt correction from V2:

- The glass itself must stand upright and vertical.
- The beverage surface inside the glass should appear diagonally sloped from swirling or recent movement.
- This better matches color-study/exam references where the liquid is angled but the glass is not leaning at 45 degrees.
- White examination background retained.
- Per-style color cues retained for distinct visual differences between wine varieties and beer styles.

Batch file:

```text
tmp/imagegen/bev-recipes-color-study-v3-upright-liquid-angle-gpt-image-1.5.jsonl
```

Validation:

- `public/wines`: 20 color-study images.
- `public/beers`: 12 color-study images.
- Flat generated leftovers under `public`: 0.
- Representative images opened and checked: Albarino, Cabernet Sauvignon, Pilsner, Stout.

## Grape Main And 360 Photo Consistency V1 - 2026-04-29

Regenerated the grape photo system for better design consistency across all grape pages.

Asset paths overwritten/created:

```text
public/grapes/{slug}-static.png
public/grapes/{slug}-turntable-margin-01.png
...
public/grapes/{slug}-turntable-margin-12.png
```

Generated set:

- Grape profiles: 24
- Static main reference photos: 24
- 360 turntable frames per grape: 12
- Total generated images: 312

Prompt direction:

- Premium macro studio grape cluster photography.
- Deep teal background matching the Sip Studies UI.
- One intact grape cluster per image.
- Generous margin around the cluster for pan/zoom.
- Full stem and bottom visible, no cropped edges.
- Consistent camera distance, lighting, and square framing.
- Variety-specific berry color and cluster morphology cues were included.
- Avoided text, logos, hands, bottles, glassware, multiple clusters, hard platform lines, and cropped berries.

Batch file:

```text
tmp/imagegen/grape-main-and-turntable-consistency-v1-gpt-image-1.5.jsonl
```

Code wiring:

- `src/data/grapes.ts` now defaults each profile's main/static image to `/grapes/{slug}-static.png`.
- Explicit media paths, such as Cabernet Franc, remain supported.
- 360 frames continue to use `/grapes/{slug}-turntable-margin-01..12.png`.

CLI note:

- The CLI flattened outputs under `public`.
- Outputs were moved into `public/grapes` according to each JSONL job's `out` value.
- After cleanup, flat generated leftovers under `public` were verified as `0`.

Validation:

- `public/grapes`: 24 `*-static.png` images.
- `public/grapes`: 288 `*-turntable-margin-*.png` images.
- Missing generated paths: 0.
- Representative images opened and checked: Cabernet Sauvignon static, Pinot Noir turntable frame 06, Chardonnay static, Riesling turntable frame 06.

## Bev Recipes Coffee Photos - 2026-04-30

Generated selected coffee recipe photos for the `Bev Recipes > Coffee` tab.

Asset convention:

```text
public/coffee/{id}.png
```

Generated set:

- Coffee recipes: 15
- Total images generated: 15

Covered recipes:

```text
espresso
ristretto
lungo
americano
long-black
macchiato
cortado
cappuccino
latte
flat-white
mocha
affogato
irish-coffee
cafe-au-lait
cold-brew
```

Prompt direction:

- Premium editorial coffee photography.
- Correct coffee drink and correct glassware/cup for each recipe.
- Unique but classic coffee shop background.
- Cup or glass placed on a coffee table.
- Latte art only where appropriate: cappuccino, latte, flat white, cortado, mocha, etc.
- Black coffee, cold brew, affogato, and Irish coffee avoid latte art and emphasize crema, ice, gelato, or cream cap instead.
- No readable text, logos, hands, visible brand labels, or people in focus.

Batch file:

```text
tmp/imagegen/bev-recipes-coffee-photos-gpt-image-1.5.jsonl
```

CLI note:

- The CLI flattened outputs under `public`.
- Outputs were moved into `public/coffee` according to each JSONL job's `out` value.
- After cleanup, flat coffee PNG leftovers under `public` were verified as `0`.

Validation:

- `public/coffee`: 15 images.
- Missing generated paths: 0.
- Representative images opened and checked: Espresso, Cappuccino, Flat White, Cold Brew.

## Bev Recipes Coffee Ratio Diagrams - 2026-04-30

Generated secondary coffee study images for the `Bev Recipes > Coffee` tab.

Asset convention:

```text
public/coffee/{id}-ratio.png
```

Generated set:

- Coffee recipes: 15
- Ratio diagrams: 15

UI wiring:

- `src/components/Cocktails.tsx` now renders a coffee-only secondary panel through `BevColorStudyPhoto` when `kind === "coffee"`.
- Coffee secondary images load from `/coffee/{id}-ratio.png`.
- The same `Nearest relatives` side-panel layout used by wine and beer is now used for coffee.
- `src/styles.css` adds coffee-specific ratio frame styling for the secondary panel.

Prompt direction:

- Sectional coffee ratio diagram inspired by coffee-drink type charts.
- One cup or glass per recipe.
- Appropriate cup type and visible ingredient layers.
- Latte art shown only where appropriate.
- No generated text, labels, numbers, arrows, logos, people, or hands inside the image.

Batch file:

```text
tmp/imagegen/bev-recipes-coffee-ratio-diagrams-gpt-image-1.5.jsonl
```

Validation:

- `public/coffee`: 15 `*-ratio.png` images.
- Missing generated paths: 0.
- Flat generated leftovers under `public`: 0.
- Representative images opened and checked: Espresso Ratio, Cappuccino Ratio, Affogato Ratio, Cold Brew Ratio.

## Current Photo Generation Process and Permissions - 2026-04-30

Purpose:

- Keep a repeatable record for generating Sip Studies image assets with the same visual language and file conventions.
- Use this section before starting future batches for grapes, grains, hops, coffee, tea, fruit, wine, beer, and beverage recipe images.

## Checkpoint Image Generation Policy - 2026-05-08

Sip Studios / Learn / Sip Game / Sip by Bit checkpoint images must default to the built-in Codex `image_gen` workflow, not local scripts that call the OpenAI API with `OPENAI_API_KEY`.

Cost and permission rules:

- Built-in `image_gen` is the default for checkpoint photos and game checkpoint scene batches.
- Do not run `scripts/regenerate-checkpoint-scenes.js`, `scripts/regenerate-checkpoint-scenes.mjs`, or any other OpenAI SDK/API image script for checkpoints unless the user explicitly approves paid API usage in that turn.
- Before starting any image generation batch, state clearly whether the run uses built-in image generation or the paid API/CLI path.
- Do not ask the user to paste API keys in chat. If a key is exposed in chat, screenshots, logs, or committed files, stop using it and rotate it before any further API use.
- Keep generated checkpoint drafts under `Checkpoint_Img/<batch-name>/`, then copy approved images into `public/game/checkpoint-scenes/`.
- Preserve the lead-character rule from `docs/CHECKPOINTS_IMAGE_PLAN.md`: Sippy, Roma, and Hummin are the only checkpoint lead characters. Ari, Bruno, and Sol can appear only as supporting/background NPCs.

Primary generation path:

1. Build a JSONL batch file under `tmp/imagegen/`.
2. Use the local Codex image generation script with `gpt-image-1.5`.
3. Save or move final assets into the correct `public/` subfolder using deterministic file names.
4. Verify asset counts and missing paths with PowerShell.
5. Open representative images for visual QA.
6. Wire the assets into React data/components only after the file paths are confirmed.
7. Run `npm.cmd run build` after UI/data changes.

Image generation command pattern:

```powershell
python C:\Users\TwoKn\.codex\skills\.system\imagegen\scripts\image_gen.py generate-batch --model gpt-image-1.5 --jsonl tmp\imagegen\{batch-name}.jsonl
```

API key handling:

- Do not paste or print the OpenAI API key in terminal output, logs, commits, or documentation.
- Read the key from `local-secrets\api for supabase.rtf` when generation requires it.
- Use a regex extraction into `$env:OPENAI_API_KEY` without echoing the value.
- Keep all generated images in `public/` and all temporary JSONL/request files in `tmp/imagegen/`.

Approved / recurring permission patterns:

- `python C:\Users\TwoKn\.codex\skills\.system\imagegen\scripts\image_gen.py generate-batch --help` has been approved previously.
- Image batch generation with the same local script may require escalation because it uses network access to OpenAI image generation.
- `npm.cmd run build` has an approved elevated prefix and should be rerun elevated if the sandbox returns Windows `spawn EPERM`.
- Python package installs already approved when needed: `python -m pip install openai` and `python -m pip install pillow`.
- Do not request broad approvals such as plain `python`; keep escalation scoped to the specific imagegen script or specific build command.

Batch file conventions:

```text
tmp/imagegen/{feature-or-asset-family}-gpt-image-1.5.jsonl
```

Asset folder conventions currently in use:

```text
public/grapes/{slug}-static.png
public/grapes/{slug}-turntable-margin-01.png through {slug}-turntable-margin-12.png
public/coffee/{id}.png
public/coffee/{id}-ratio.png
public/wines/{id}.png
public/wines/{id}-color.png
public/beers/{id}.png
public/beers/{id}-color.png
public/{commodity-folder}/{id}.png
public/{commodity-folder}/{id}-turntable-01.png etc. when turntable views exist
```

Quality requirements:

- Match the Sip Studies dark teal / premium educational visual language unless the image is intentionally an exam-style study image.
- Avoid generated text inside images unless explicitly required; generated text is unreliable.
- Avoid logos, readable labels, people, hands, watermarks, and branded packaging.
- For static ingredient photos, keep generous margins so zoom/pan UI does not clip the subject.
- For 360/turntable images, maintain consistent lighting, scale, crop, background, and subject position across frames.
- For wine and beer color studies, use a clean white exam background and an upright glass with the liquid surface visibly angled inside the glass.
- For coffee ratio studies, use a sectional cup/glass diagram with visible layers and correct cup type; no embedded labels.

Validation commands:

```powershell
Get-ChildItem -Path public\grapes -Filter '*-static.png' | Measure-Object | Select-Object -ExpandProperty Count
Get-ChildItem -Path public\grapes -Filter '*-turntable-margin-*.png' | Measure-Object | Select-Object -ExpandProperty Count
Get-ChildItem -Path public\coffee -Filter '*-ratio.png' | Measure-Object | Select-Object -ExpandProperty Count
npm.cmd run build
```

Operational notes:

- The imagegen CLI may flatten outputs into `public`; move files into their intended folders after generation and verify no flat leftovers remain.
- Keep JSONL prompts concise but specific: subject, composition, lighting, background, exclusions, and file intent.
- Spot-check at least 3-4 representative images per batch before considering the batch complete.
- If images show cut-off edges, repeated background seams, odd white lines, or hallucinated forms, regenerate with stronger margin/background/subject-isolation instructions.
- Update this file after each successful new asset family so future batches reuse the proven process.

## Sip Studios Adventure Game Assets - 2026-05-06

Generated a local-first V1 visual pass for `#app/sip-game` using the built-in Codex image generation path, then copied final assets into `public/game/`.

Final asset paths:

```text
public/game/backgrounds/winery-hub-v1.png
public/game/backgrounds/brewery-hub-v1.png
public/game/backgrounds/distillery-hub-v1.png
public/game/sprites/sippy-sheet-v1.png
public/game/sprites/sippy-sheet-v1-alpha.png
public/game/sprites/mentors-sheet-v1.png
public/game/sprites/mentors-sheet-v1-alpha.png
public/game/sprites/sippy-sheet-v2.png
public/game/sprites/sippy-sheet-v2-alpha.png
public/game/sprites/main-characters-sheet-v2.png
public/game/sprites/main-characters-sheet-v2-alpha.png
public/game/sprites/roma-sheet-v3.png
public/game/sprites/roma-sheet-v3-alpha.png
public/game/sprites/equipment-sheet-v1.png
public/game/sprites/equipment-sheet-v1-alpha.png
public/game/equipment-scenes/winery-crusher-destemmer-sippy-v1.png
public/game/equipment-scenes/winery-wine-press-sippy-v1.png
public/game/equipment-scenes/winery-fermentation-tank-sippy-v1.png
public/game/equipment-scenes/brewery-mash-tun-roma-v1.png
public/game/equipment-scenes/brewery-brew-kettle-roma-v1.png
public/game/equipment-scenes/brewery-conical-fermenter-roma-v1.png
public/game/equipment-scenes/distillery-pot-still-hummin-v1.png
public/game/equipment-scenes/distillery-spirit-safe-hummin-v1.png
public/game/equipment-scenes/distillery-washback-hummin-v1.png
```

Style direction:

- Wide 16:9 hand-painted hub backgrounds with open walking paths.
- Modern pixel-art sprite sheets combining friendly learning-game readability with classic 16-bit JRPG staging.
- Palette mix: teal, grape purple, hop green, copper, cream, wood, and stainless steel.
- No generated text, labels, logos, watermarks, or UI embedded inside assets.
- Character generation must use the canonical Sippy, Roma, and Hummin reference images in `DUMP-IN/Sippy & Roma/Main Photos/`.

Sprite workflow notes:

- Character and equipment sheets were generated on a green chroma-key background.
- Alpha versions were produced with:

```powershell
python C:\Users\TwoKn\.codex\skills\.system\imagegen\scripts\remove_chroma_key.py --input public\game\sprites\{sheet}.png --out public\game\sprites\{sheet}-alpha.png --auto-key border --soft-matte --transparent-threshold 45 --opaque-threshold 180 --despill
```

- React/CSS consumes the alpha sheets with deterministic frame positions rather than splitting the sheets into individual files.
- Sippy V1 cup sheet remains the current playable walking avatar because it has the strongest cute navigation read.
- Sippy V2 sheet uses 8 frames based on `Sippy.jpg`: idle frames, walk frames, point, celebrate.
- Main characters V2 sheet uses 6 frames based on canonical references: Roma idle/explain, Hummin idle/explain, Sippy idle/explain.
- Roma V3 sheet uses `DUMP-IN/Sippy & Roma/image (4).jpg`, `DUMP-IN/Sippy & Roma/Roma - Tea.png`, and `DUMP-IN/Sippy & Roma/Old Sippy & Roma/OG Roma.webp` for a warmer feminine Roma silhouette. It is now preferred over the Roma frames in the shared main character sheet.
- Mentor V1 sheet uses 6 frames: two poses each for winery, brewery, and distillery support mentors. It is retained for support NPCs alongside Sippy, Roma, and Hummin.
- Equipment sheet uses 8 frames: crusher-destemmer, wine press, fermentation tank, mash tun, brew kettle, conical fermenter, pot still, spirit safe.
- Equipment scene photos are realistic teaching-modal images with Sippy, Roma, or Hummin demonstrating the clicked equipment.

Validation:

- `npm.cmd run build` passed.
- Local route smoke check passed: `http://127.0.0.1:5173/#app/sip-game`.
- Local asset smoke checks passed for `/game/backgrounds/winery-hub-v1.png` and `/game/sprites/sippy-sheet-v1-alpha.png`.
