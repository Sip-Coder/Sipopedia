# Focused Checkpoints Plan

## Objective
Restore checkpoint image direction so the main playable focus rotates only between:
- Sippy (Man)
- Roma (Woman)
- Hummin (Male Robot)

## Completed Actions (2026-05-07)
1. Archived latest generated checkpoint scenes to:
   - `Checkpoint_Img/checkpoint-scenes-latest/`
2. Replaced Aria-focused winery checkpoint files with prior winery checkpoint variants already in rotation:
   - `public/game/checkpoint-scenes/winery-vine-training-aria-v1.png`
   - `public/game/checkpoint-scenes/winery-harvest-pick-aria-v1.png`
   - `public/game/checkpoint-scenes/winery-canopy-management-aria-v1.png`
3. Created supporting NPC image intake folders:
   - `DUMP-IN/Sippy & Roma/Supporting NPCs/Ari/`
   - `DUMP-IN/Sippy & Roma/Supporting NPCs/Bruno/`
   - `DUMP-IN/Sippy & Roma/Supporting NPCs/Sol/`

## Source Folders
Main character sources:
- `DUMP-IN/Sippy & Roma/Main Photos/`

Supporting source pool:
- `DUMP-IN/Sippy & Roma/`

## Rotation Rules
1. Checkpoint hero shots must prioritize Sippy, Roma, Hummin in rotating sequence.
2. Supporting NPCs (Ari, Bruno, Sol) can appear only as secondary/background support.
3. Do not assign supporting NPCs as the lead checkpoint character.

## Next Checkpoint Image Batch Process
1. Pull lead references from `Main Photos` first.
2. Generate checkpoint image draft set.
3. Save draft outputs into `Checkpoint_Img/<batch-name>/` before replacing live assets.
4. Validate lead-character compliance against rotation rules.
5. Copy approved images into `public/game/checkpoint-scenes/`.

## Image Generation Cost Policy
- For checkpoint images, use the built-in Codex `image_gen` workflow by default.
- Do not use project scripts that call the OpenAI API with `OPENAI_API_KEY` for checkpoint batches unless the user explicitly approves paid API usage for that run.
- Do not ask the user to paste API keys in chat or screenshots. If a key is exposed, rotate it before any further API use.
- Before any generation run, state whether it uses built-in image generation or paid API/CLI generation.
