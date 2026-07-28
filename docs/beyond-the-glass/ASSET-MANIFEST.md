# Beyond The Glass — Asset Manifest

## Art direction

Editorial naturalism + tactile museum diorama + tech-nouveau archive. Forest green, espresso, cream, muted teal, terracotta, brass, and water-blue. Generated assets contain no text, logos, or watermarks.

Production assets live under `public/beyond-the-glass/`. Source-quality originals remain outside the production bundle.

| Production filename | Purpose | Source | Production dimensions | Transparency | Format | Alt text |
| --- | --- | --- | --- | --- | --- | --- |
| `landscape-living-archive.webp` | Opening aerial knowledge ecosystem | Built-in image generation | 1672×941 | No | WebP | A connected beverage landscape of watersheds, farms, production rooms, cafés, laboratories, and an archive |
| `landscape-mid-altitude.webp` | Aerial-to-macro crossfade | Built-in image generation using the opening as continuity reference | 1600×900 | No | WebP | Rivers, roots, roads, and pipes converging on one bright drop of water |
| `central-drop.webp` | Independent signal and dive subject | Built-in image generation plus alpha cleanup | 768×1152 | Yes | WebP | A single luminous drop suspended on a transparent background |
| `drop-isolation.webp` | Macro Drop and laboratory scene | Built-in image generation | 1672×941 | No | WebP | A luminous drop of water suspended inside a dark brass-and-glass archive laboratory |
| `knowledge-orbit.webp` | Ten-layer deconstruction tableau | Built-in image generation | 1536×1024 | No | WebP | Ten beverage-system objects orbiting a luminous central drop |
| `noise-fragments.webp` | Isolation distortion overlay | Built-in image generation plus alpha cleanup | 1600×900 | Yes | WebP | Fragmented archival pathways and broken water-blue and brass connections |
| `living-knowledge-card.webp` | Reassembled final artifact | Built-in image generation | 1672×941 | No | WebP | A tactile archive object formed from connected water, people, process, and evidence systems |
| `living-archive-lobby.webp` | Closing chapter lobby | Built-in image generation | 1672×941 | No | WebP | A living archive with illuminated doors leading to future beverage journeys |
| `poster-reduced-motion.webp` | Complete static chapter poster | Built-in image generation with a centered 4:5 production crop | 1086×1358 | No | WebP | Sippy, Roma, and Hummin following a drop through a connected beverage knowledge system |
| `social-beyond-the-glass.webp` | Social-sharing image | 1200×630 derivative of the approved mid-altitude generation | 1200×630 | No | WebP | Beyond The Glass journey artwork with a luminous drop and connected beverage landscape |

## Generation log

All original artwork was created with the built-in image generator. The exact selected source files remain outside the production bundle:

| Asset | Selected source | Prompt brief |
| --- | --- | --- |
| Opening landscape | `C:/Users/TwoKn/.codex/generated_images/019fa7cb-e831-7340-82d8-3e13edc82bda/call_mor6tCcgtuaocBH04b4e4Xsa.png` | Epic aerial beverage-knowledge watershed; editorial naturalism and brass tech-nouveau archive; interconnected farms, laboratories, service spaces, and water routes; generous dark copy space; no text or marks. |
| Mid-altitude transition | `C:/Users/TwoKn/.codex/generated_images/019fa7db-cb3e-7431-8a0c-874e70cc3f7b/call_lLY97NsuUQc4MRLXdkC1mzmR.png` | Descend through the approved landscape toward one luminous Drop while rivers, roots, pipes, and pathways converge; preserve art direction and focal continuity. |
| Central Drop | `C:/Users/TwoKn/.codex/generated_images/019fa7db-cb3e-7431-8a0c-874e70cc3f7b/call_U9CtAH7E21GlAmK7pKzsE7QT.png` | One clean luminous water Drop with a strong silhouette for independent motion; transparent final background; no shadow, text, logo, or watermark. |
| Isolation laboratory | `C:/Users/TwoKn/.codex/generated_images/019fa7cc-37c5-7f62-b837-a4567966c942/call_nTrnzgccHLxluxkd12JSKc2j.png` | One glass-clear Drop suspended in a near-black brass archive laboratory; copy-safe negative space; scientific wonder without labels. |
| Ten-layer orbit | `C:/Users/TwoKn/.codex/generated_images/019fa7cc-9a0b-7762-ab44-e377a6f3aae7/call_enr2qGu5iRg2fc6lKXZQWXKj.png` | Exactly ten distinct tactile objects orbit one Drop, representing origin, ingredients, process, science, culture, people, access, service, technology, and responsibility. |
| Noise overlay | `C:/Users/TwoKn/.codex/generated_images/019fa7db-cb3e-7431-8a0c-874e70cc3f7b/call_NMGiD9Lasz5Lcy3D7B6X8vVC.png` | Fractured archive pathways, broken water-blue and brass connections, and abstract unreadable marks; transparent final background; no readable text. |
| Living Knowledge Card | `C:/Users/TwoKn/.codex/generated_images/019fa7cb-e831-7340-82d8-3e13edc82bda/call_cJLWo9RPDtnZ9QQshcWuMJpP.png` | Reassemble all ten concepts into one museum-grade knowledge instrument with a central Drop, evidence geometry, and generous left-side copy space. |
| Living Archive | `C:/Users/TwoKn/.codex/generated_images/019fa7cc-37c5-7f62-b837-a4567966c942/call_sXavDZF7GNeszQnCao4Fj2vQ.png` | Luminous archive lobby with water, coffee, tea, wine, spirits, and technology portals surrounding a central pedestal; generous left-side copy space. |
| Reduced-motion poster | `C:/Users/TwoKn/.codex/generated_images/019fa7cc-9a0b-7762-ab44-e377a6f3aae7/call_6ljN9KtbEXO43X9OjqY4k7tJ.png` | A single poster journey from storm and watershed through beverage production to the Living Archive, with exactly one Sippy, one Roma, and one Hummin. |

## Existing character assets

The first implementation reuses the existing individual transparent production sprites rather than cropping a sprite sheet:

| Character | Existing source | Use |
| --- | --- | --- |
| Sippy | `/game/sprites/characters/main-5.png` | Narrator and route-guide pose |
| Roma | `/game/sprites/characters/roma-0.png` and `/game/sprites/characters/roma-2.png` | Sensory signal and field-guide poses |
| Hummin | `/game/sprites/characters/main-3.png` and related robot variants | Evidence scan and source-guide poses |

These sprites provide stable brand continuity and a low-bandwidth fallback. New cinematic character cutouts may replace them only after visual QA confirms a coherent identity.

## Knowledge-object coverage

The first production pass uses the composite `knowledge-orbit.webp` so the ten objects share one coherent visual language and stable geometry. HTML callouts, focus controls, captions, and sources remain individual and accessible. A future asset pass may split the approved orbit into independently generated objects if stronger spatial motion is needed.

## Generation constraints

- No generated words, numbers, labels, logos, signatures, or watermarks.
- Clear center and mobile-safe focal zone.
- Strong silhouettes at 390px width.
- No accidental real-world brand marks.
- Conceptual/AI-generated status documented in chapter source notes.
- Source prompts and final selected file paths recorded before commit.
- Large production assets covered by Git LFS.

## Loading strategy

1. Preload the opening landscape and transparent Drop.
2. Load the mid-altitude, isolation, orbit, and Noise assets after the journey begins.
3. Load the final artifact and lobby only for the late scenes.
4. Load the reduced-motion poster only for the reduced-motion presentation.
5. Every rendered image receives explicit dimensions, decoding hints, and a visible fallback.
