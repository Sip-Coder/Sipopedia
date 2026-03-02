# Sip Academy Media Generation Pack

This project now has a 20-lesson campaign UI with realm cinematic slots.  
To generate final custom assets with OpenAI Image + Sora, set `OPENAI_API_KEY` and run the commands below.

## Prerequisites

1. Create an API key: https://platform.openai.com/api-keys
2. Set it in PowerShell:

```powershell
$env:OPENAI_API_KEY = "YOUR_KEY_HERE"
```

3. Confirm:

```powershell
if ($env:OPENAI_API_KEY) { "OPENAI_API_KEY set" } else { "missing" }
```

## Generate Realm Images (5 posters)

```powershell
python "C:\Users\TwoKn\.codex\skills\imagegen\scripts\image_gen.py" generate-batch `
  --input "tools\sip_academy_image_batch.jsonl" `
  --out-dir "output\imagegen\sip_academy_realms" `
  --concurrency 3
```

## Generate Realm Sora Clips (5 trailers)

```powershell
python "C:\Users\TwoKn\.codex\skills\sora\scripts\sora.py" create-batch `
  --input "tools\sip_academy_sora_batch.jsonl" `
  --out-dir "output\sora\sip_academy_realms" `
  --concurrency 2
```

Then poll and download each completed video ID:

```powershell
python "C:\Users\TwoKn\.codex\skills\sora\scripts\sora.py" poll --id "<video_id>" --download --variant video --out "output\sora\sip_academy_realms\<slug>.mp4"
```

## Wiring Notes

- Realm cinematic UI is in `src/components/SipAcademyWineLessons.tsx` (`REALM_MEDIA` constant).
- Replace placeholder local portraits in `REALM_MEDIA` with generated posters and trailer metadata.
- Suggested final locations:
  - `src/assets/academy/realms/*.webp`
  - `public/academy-trailers/*.mp4`
