# Beyond The Glass — Implementation Plan

## Objective

Add a reusable cinematic-learning system to Sipopedia and ship its first chapter, **The Journey of a Drop**, immediately after Sip Game in the Learn navigation.

## Route and integration

- Canonical route: `/#app/beyond-the-glass`
- Compatibility aliases: `/#BTG`, `/#btg`, `/#app/BTG`, `/#app/btg`
- Navigation order: Sip Academy → Sip Game → Beyond The Glass → Sipopedia
- Search keywords: beyond the glass, BTG, water, systems, story, cinematic, origin, access
- Boss Room: inherit shared workspace registry and publication controls
- Recommended access: public first chapter; future chapters may use membership access

## Component architecture

```text
src/features/beyond-the-glass/
  BeyondTheGlassPage.tsx
  ScrollStoryStage.tsx
  NarrationControls.tsx
  useScrollStoryProgress.ts
  beyond-the-glass.css

src/data/
  beyondTheGlassChapters.ts
```

### `BeyondTheGlassPage`

- Owns page semantics, chapter selection, transcript, sources, CTAs, and reduced-motion presentation.
- Loads one chapter configuration.
- Keeps the complete educational content available outside the sticky stage.

### `ScrollStoryStage`

- Renders the tall scroll container and sticky visual stage.
- Derives scene, local scene progress, active layer, transforms, opacity, and theme from normalized progress.
- Never locks page scroll.

### `NarrationControls`

- Visible “Begin narrated journey” control.
- Play/pause, stop, mute/unmute, captions, transcript jump, and scene status.
- No audio autoplay.
- Uses the existing speech-synthesis approach as an optional fallback while keeping text first-class.

### `useScrollStoryProgress`

- Passive scroll and resize listeners.
- One scheduled `requestAnimationFrame` update.
- Normalizes the narrative section to `0–1`.
- Uses deterministic interpolation so reverse scrolling works.
- Cancels the frame and listeners on unmount.

## Reusable chapter schema

```ts
type BeyondTheGlassChapter = {
  slug: string;
  title: string;
  eyebrow: string;
  subject: string;
  openingNarration: string;
  landscapeAssets: {
    opening: string;
    transition: string;
    isolation: string;
    orbit: string;
    finalArtifact: string;
    lobby: string;
    reducedMotionPoster: string;
  };
  characters: CharacterCue[];
  scenes: StoryScene[];
  knowledgeLayers: KnowledgeLayer[];
  closingNarration: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  sources: SourceReference[];
};
```

## Animation architecture

- Narrative height: approximately `1000svh`.
- Sticky stage: `100svh`.
- CSS transforms and opacity are the primary motion tools.
- Landscape zoom uses multiple crossfaded resolutions instead of scaling one huge bitmap.
- Scene transforms are functions of progress, not timeline side effects.
- The stage exposes progress through CSS custom properties.
- No Three.js dependency for chapter one.
- The active object always remains inside a protected visual safe zone.

## Performance strategy

- Lazy-loaded route boundary.
- Feature-local stylesheet; do not add another large section to global CSS.
- Opening image preloaded; remaining images staged by progress.
- WebP production assets with explicit dimensions.
- No canvas or WebGL for the core sequence.
- No continuous frame loop when scroll position is unchanged.
- No layout reads after writes inside the frame update.
- Stable image containers prevent layout shift.
- Git LFS coverage for cinematic media.

## Accessibility strategy

- Semantic `main`, headings, ordered scenes, transcript, and source list.
- Audio remains optional.
- Captions mirror the narration exactly.
- Previous/next scene controls support keyboard learners.
- Visible focus states and touch targets of at least 44px.
- No automatic focus or mobile keyboard activation.
- `prefers-reduced-motion` receives a complete static illustrated sequence.
- High-contrast copy panels remain readable over every asset.
- Images include meaningful alt text; decorative layers are hidden from assistive technology.
- JavaScript failure leaves the chapter overview, all ten lessons, transcript, sources, and CTAs readable.

## Test strategy

### Automated

- TypeScript typecheck.
- Production build.
- Navigation-policy test for `Sip Game → Beyond The Glass → Sipopedia`.
- Route smoke tests for the canonical route and aliases.
- Pure progress tests at all scene boundaries.
- Asset existence and LFS-pointer guard.
- Existing full RGRD gate.

### Browser QA

- Desktop: 1440×900.
- Tablet: 768×1024.
- Mobile: 390×844.
- Progress checkpoints: 0%, 12%, 25%, 42%, 52%, 65%, 75%, 86%, 94%, 100%.
- Reverse scrolling through every boundary.
- Touch/native scrolling.
- No horizontal overflow.
- No empty stage states.
- Narration start, pause, resume, stop, mute, captions, and transcript.
- Reduced motion and high contrast.
- Broken-image fallbacks and slow-load behavior.
- Search result and Boss Room visibility.

## Delivery sequence

1. Complete story bible, storyboard, narration, asset manifest, and implementation plan.
2. Generate and approve only the necessary assets.
3. Build the reusable engine.
4. Implement chapter one.
5. Add route, navigation, search, Boss Room, and smoke coverage.
6. Run automated checks.
7. Perform browser and design QA; repair P0–P2 issues.
8. Commit to `Improvements`.
9. Push, open/refresh the PR, run RGRD, merge only when authorized, and verify deployment.

## Non-goals for chapter one

- No forced orientation changes.
- No scroll locking.
- No autoplay video standing in for interaction.
- No new heavy animation dependency.
- No backend requirement for completing the story.
- No generated text embedded in artwork.
