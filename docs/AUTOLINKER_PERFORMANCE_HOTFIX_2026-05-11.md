# Autolinker Performance Hotfix (2026-05-11)

## Why this was done

Tab-to-tab navigation felt laggy in workspace pages. The main suspected bottleneck was the terminology autolinker:

1. It was running across most workspace pages.
2. It was loading a very large term set from Supabase.
3. It builds a large regex and scans live DOM text with mutation observation.

That combination is expensive on interactive pages (game/maps/grapes/flavors) where DOM changes frequently.

## What changed

### 1) Restricted where autolinker runs

File:

`src/App.tsx`

Added an allowlist for autolinker so it only runs on content-style pages:

- `beverage-news`
- `flavor-blog`
- `resources`
- `ai-news`
- `somm-events`

Before:

Autolinker ran on most `Game` room public workspace pages.

After:

Autolinker only runs on the allowlisted pages above.

### 2) Capped autolinker terminology target volume

Files:

- `src/lib/terminology.ts`
- `src/components/TerminologyAutoLinker.tsx`

Changes:

1. `listTerminologyLinkTargets` now accepts a `maxRows` parameter and defaults to `1200`.
2. The autolinker explicitly calls it with a constant limit:
   `AUTOLINK_TARGET_LIMIT = 1200`.

Before:

The fetch loop used `while (from < 10000)` which pulled up to 10k rows.

After:

Autolinker term targets are intentionally bounded to reduce matcher and scan overhead.

## Expected impact

1. Faster route switches between interactive tabs.
2. Lower CPU spikes from autolinker on pages with frequent DOM updates.
3. Reduced startup cost for autolinker itself.

Tradeoff:

Autolink coverage is narrower (both by page scope and by term count). This is intentional for performance.

## How to undo (full rollback)

### Rollback A: restore autolinker on all previous workspace pages

File:

`src/App.tsx`

1. Remove `AUTOLINK_ALLOWED_WORKSPACE_PAGES`.
2. Restore `shouldAutolinkWorkspace` to previous logic:

`workspaceConfig.room === "Game" && workspaceConfig.status === "public" && workspacePage !== "starter"`

### Rollback B: remove term cap

File:

`src/components/TerminologyAutoLinker.tsx`

1. Remove `AUTOLINK_TARGET_LIMIT`.
2. Change:

`listTerminologyLinkTargets(AUTOLINK_TARGET_LIMIT)`

back to:

`listTerminologyLinkTargets()`

### Rollback C: restore original loop behavior

File:

`src/lib/terminology.ts`

1. Change function signature back to:

`listTerminologyLinkTargets(): Promise<TerminologyLinkTarget[]>`

2. Change fetch loop from:

`while (from < maxRows)`

back to:

`while (from < 10000)`

## How to tune instead of fully rollback

If performance is good but autolink coverage is too low:

1. Raise `AUTOLINK_TARGET_LIMIT` from `1200` to `2000` or `3000`.
2. Add more pages to `AUTOLINK_ALLOWED_WORKSPACE_PAGES` one at a time.
3. Re-test route switch responsiveness after each change.

## Change summary

Modified:

- `src/App.tsx`
- `src/lib/terminology.ts`
- `src/components/TerminologyAutoLinker.tsx`

Added:

- `docs/AUTOLINKER_PERFORMANCE_HOTFIX_2026-05-11.md`
