# Sip Studies Avatar Roster v2 — Asset Manifest

Generated: 2026-08-02
Tool: OpenAI built-in ImageGen
Production location: `public/avatar-roster/v2/`
Format: 768 × 768 WebP, quality 82
Total production weight: approximately 1.35 MB

## Art direction

All 24 characters use one original, coherent Sip Studies character system: clearly adult beverage professionals, premium stylized 3D animated-adventure rendering, warm cinematic light, full-body composition, expressive faces, practical category-specific attire and tools, and at least ten percent safe space around the figure. Prompts prohibited generated text, logos, watermarks, minors, extra limbs, and distorted hands. The Wine woman was generated first and used as the visual continuity reference for the remaining cast.

The source prompt pattern was:

> Create a square, full-body, premium stylized 3D animated-adventure character portrait matching the supplied Sip Studies roster anchor in rendering quality, adult proportions, warm cinematic lighting, expressive friendly face, and polished educational-game aesthetic. Depict a clearly adult beverage professional with category-specific attire, tools, and setting. Keep the entire figure visible with safe margins. No text, labels, logos, watermark, minors, extra limbs, or distorted hands.

Each generation then specified the role, clothing, beverage tools, setting, palette accents, and professional demeanor listed in the roster data.

## Production roster

| Beverage world | Woman character | Woman asset | Man character | Man asset |
|---|---|---|---|---|
| Wine | Elena Marceau | `wine-woman.webp` | Julian Mercer | `wine-man.webp` |
| Beer | Talia Brooks | `beer-woman.webp` | Marcus Stein | `beer-man.webp` |
| Spirits | Amara Quinn | `spirits-woman.webp` | Rafael Ortega | `spirits-man.webp` |
| Coffee | Nia Okafor | `coffee-woman.webp` | Mateo Silva | `coffee-man.webp` |
| Tea | Priya Sen | `tea-woman.webp` | Kenji Mori | `tea-man.webp` |
| Kombucha | Zoe Park | `kombucha-woman.webp` | Elias Reed | `kombucha-man.webp` |
| Juice | Lucia Bennett | `juice-woman.webp` | Andre Costa | `juice-man.webp` |
| Milk | Miriam Cole | `milk-woman.webp` | Daniel Kim | `milk-man.webp` |
| Water | Noor Haddad | `water-woman.webp` | Theo Rivers | `water-man.webp` |
| Energy Drinks | Maya Chen | `energy-drinks-woman.webp` | Dante Cross | `energy-drinks-man.webp` |
| Protein Drinks | Aisha Grant | `protein-drinks-woman.webp` | Victor Hale | `protein-drinks-man.webp` |
| Soda | Sofia Reyes | `soda-woman.webp` | Owen Clark | `soda-man.webp` |

## Production safeguards

- Source-quality generated PNGs remain in the local Codex generated-images archive; they were not deleted.
- The production WebPs live outside every Git LFS-tracked path in this repository.
- The focused roster test verifies all 24 files exist and are larger than 10 KB.
- The selection interface only mounts the active beverage pair and selected preview, rather than loading all 24 images at once.
- `src/data/avatarRoster.ts` is the canonical mapping for names, accessible descriptions, roles, presentation, and image paths.
