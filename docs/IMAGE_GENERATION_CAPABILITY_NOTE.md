# Image Generation Capability Note

## Built-In Codex Image Generation

Some Codex sessions expose a built-in `image_gen` tool. This is the workflow used when Codex generated project images without asking for `OPENAI_API_KEY`.

Important behavior:
- It does not require a repo-local `OPENAI_API_KEY`.
- It saves outputs under `C:\Users\TwoKn\.codex\generated_images\...` by default.
- Project-bound outputs must be copied from that Codex generated-images folder into the repo path that consumes them.
- It is intended for ordinary image generation and image editing requests.
- It is not the same as the repo's Python CLI or a custom Node/OpenAI SDK script.

This capability may depend on the active Codex model/session/tooling. If a session does not expose the built-in `image_gen` tool, the no-key path is unavailable in that session.

## API-Key Workflows

The repo also documents CLI/API workflows in:
- `photogen.md`
- `docs/sip_academy_media_generation.md`

Those workflows use:

```powershell
python "C:\Users\TwoKn\.codex\skills\.system\imagegen\scripts\image_gen.py" generate-batch ...
```

That fallback CLI requires:
- `OPENAI_API_KEY`
- network access
- an installed OpenAI Python dependency

Use this path only when explicitly choosing the CLI/API workflow, model controls, transparent-output fallback, or large JSONL batch execution.

## Practical Rule For This Repo

For checkpoint images and other ordinary raster assets:
1. Prefer built-in Codex `image_gen` when available.
2. Copy generated outputs into the target project folder, for example `public/game/checkpoint-scenes/`.
3. Archive replaced assets under `Checkpoint_Img/`.
4. Use the CLI/API path only when built-in generation is unavailable or when exact API/model control is required.

## Current Checkpoint Regeneration Note

The attempted Node script at `scripts/regenerate-checkpoint-scenes.mjs` uses the OpenAI SDK and therefore requires `OPENAI_API_KEY`. That is not the no-key workflow.

For no-key checkpoint regeneration, use repeated built-in `image_gen` calls, then copy each generated image from `C:\Users\TwoKn\.codex\generated_images\...` to the matching file under:

```text
public/game/checkpoint-scenes/
```

