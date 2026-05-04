# QA and Release Checklist

## Required Commands

Run before shipping website changes:

```bash
npm.cmd run build
```

Run the website validator:

```powershell
powershell -File .\validators\validate-website.ps1 -SkipInstall
```

Run before terminology changes:

```powershell
powershell -File .\validators\validate-terminology.ps1
```

Run before committing sensitive changes:

```bash
npm.cmd run security:secrets
```

## Manual Smoke Test

### Routing

- Open home route.
- Open `#app/sip-academy`.
- Open `#app/grapes`.
- Open `#app/grapes/hops`.
- Open a commodity detail page such as `#app/grapes/tea/green-tea`.
- Open `#app/cocktails`.
- Open `#app/resources`.
- Refresh on a deep route and confirm the expected page returns.

### Grapes & Grains

- Click every commodity tab.
- Confirm reference lists change with commodity.
- Confirm relationship chart changes with commodity.
- On index page, test `ArrowLeft` and `ArrowRight` commodity navigation.
- On index page, test `Ctrl + ArrowLeft` and `Ctrl + ArrowRight` variety navigation.
- On detail pages, test plain arrow variety navigation.
- On detail pages, test `Ctrl + ArrowLeft` and `Ctrl + ArrowRight` commodity navigation.
- On detail pages, test `Escape` returns to the current commodity index.
- Test swipe navigation on a touch-capable viewport or emulator.

### Bev Recipes

- Open Cocktails, Wine, and Beer subtabs.
- Confirm subtab order: Cocktails, Wine, Beer.
- Search for an item in each subtab.
- Hover or focus chart nodes and confirm modal content is readable.
- Confirm selected panel updates.
- Confirm nearest relatives update.
- In Wine, test Red Wine Map and White Wine Map.
- Confirm beer and wine missing images show fallback panels rather than broken image icons.

### Resources

- Open Wine resources.
- Open Spirits resources.
- Refresh and confirm the last selected resource view is restored.
- Toggle spirits prompt answers.
- Confirm downloadable worksheet and answer sheet links work.
- Confirm CTA to Bev Recipes works.

### Taste Pages

- Open Flavor Wheel.
- Open Tasting Journal.
- Open Journal Archive.
- Confirm form labels and text contrast remain readable.
- Save a local note and confirm it appears in archive.

### Connect Pages

- Open Beverage News.
- Open Tasting Groups.
- Open AI News.
- Open Somm Events.
- Confirm empty/error states are readable and do not break layout.

## Visual Checks

Desktop:

- 1440 x 900
- 1280 x 800

Tablet/mobile:

- 768 x 1024
- 390 x 844

Check:

- no overlapping nav tiles
- no unreadable low-contrast panel text
- no broken image icons
- no horizontal page overflow unless an intentional scroll strip is used
- sticky/detail panels do not cover chart content

## Accessibility Checks

- Keyboard focus is visible.
- Inputs have labels.
- Buttons have clear text or accessible labels.
- Hover-only content also appears on focus.
- Escape behavior is predictable on detail pages.
- Color-coded states include text or layout cues.

## Known Validation Limits

There is no configured unit test framework yet.

There is no configured browser automation suite yet.

`validators/validate-website.ps1` currently skips lint and test stages when scripts are absent. Build success is the strongest automated signal today.

## Recommended Next Test Additions

- Add `npm run lint`.
- Add `npm run test`.
- Add Playwright smoke tests for:
  - route loading
  - Grapes & Grains keyboard navigation
  - Bev Recipes subtab/search/chart behavior
  - Resources state persistence
  - Tasting Journal save/archive flow
