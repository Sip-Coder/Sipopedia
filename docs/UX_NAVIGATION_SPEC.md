# UX and Navigation Spec

## Route Navigation

The app uses hash routes. Workspace routes live under `#app/*`.

Primary examples:

```text
#app/sip-academy
#app/regions
#app/maps
#app/grapes
#app/cocktails
#app/resources
#app/flavor-wheel
#app/flavors
#app/tasting-journal
```

`#app/cocktails` is the technical route for the user-facing **Bev Recipes** tab.

## Workspace Navigation

Workspace nav is organized into:

- Learn
- Taste
- Connect

Each nav item should have:

- short label
- short signal text
- stable route id
- active state

## Grapes & Grains Navigation

Commodity order:

```text
Grapes -> Grains -> Hops -> Coffee Beans -> Tea -> Other Fruit
```

Index page keyboard behavior:

- `ArrowLeft`: previous commodity tab
- `ArrowRight`: next commodity tab
- `Ctrl + ArrowLeft`: previous variety within the current commodity
- `Ctrl + ArrowRight`: next variety within the current commodity
- `Escape`: return to Grapes tab

Detail page keyboard behavior:

- `ArrowLeft`: previous variety/detail record in the current commodity
- `ArrowRight`: next variety/detail record in the current commodity
- `Ctrl + ArrowLeft`: previous commodity family
- `Ctrl + ArrowRight`: next commodity family
- `Escape`: return to the current commodity index page

Touch behavior:

- horizontal swipe left/right changes variety/detail records on detail pages
- horizontal swipe left/right changes commodity tabs on the index page

## Bev Recipes Navigation

Subtab order:

```text
Cocktails -> Wine -> Beer
```

Wine subtab modes:

```text
Red Wine Map
White Wine Map
```

Keyboard behavior:

- `ArrowLeft`: previous item in active recipe/style list
- `ArrowRight`: next item in active recipe/style list

Touch behavior:

- horizontal swipe left/right changes recipe/style in the active subtab

Search behavior:

- search input uses the current subtab's item list
- `Enter` maps the typed item when a match exists
- `Map` button triggers the same lookup

## Resources Navigation

The Reference Library supports beverage-type navigation. Current active types:

- Wine
- Spirits

Resources preserve selected view state in local storage so reloads return to the last selected beverage/resource context.

## Accessibility Expectations

- Interactive elements must be keyboard reachable.
- Active states must be visible without relying on color alone where practical.
- Text/background contrast must remain legible on dark and light panels.
- Form placeholders are never the only label.
- Focus states should use visible outlines or borders.
- Motion and hover affordances should not be required to access content.

## Global Keyboard Navigation Hierarchy (Site-Wide)

The workspace now uses a strict keyboard hierarchy so navigation intent is consistent everywhere.

- `Alt + ArrowLeft/ArrowRight`: switch **Brand**
- `Ctrl + Shift + ArrowLeft/ArrowRight`: switch **Section**
- `Shift + ArrowLeft/ArrowRight`: switch **Module** within active section
- `ArrowLeft/ArrowRight`: switch **Page-Level Features**
- `Ctrl + ArrowLeft/ArrowRight`: switch **SubPage/SubMenu Features**
- `Escape`: return to **Starter Preview** (`/#app/starter`)

Notes:

- Keyboard handlers should not hijack input controls (`input`, `textarea`, `select`, `contenteditable`).
- Page-level and subpage-level feature switching are emitted as global events for feature modules to consume:
  - `sipstudies:navigate-page-feature`
  - `sipstudies:navigate-subfeature`

## Hover Menu Keyboard Hints

The floating command menu should display compact right-justified keyboard hints:

- Brand: `Alt + <- ->`
- Section: `Ctrl+Shift + <- ->`
- Module: `Shift + <- ->`

## UI Copy Rules

- Keep nav labels short.
- Keep card signal text short enough to avoid overflow on desktop and mobile.
- Use beverage-domain terms consistently:
  - Bev Recipes
  - Grapes & Grains
  - Journal Archive
  - Tasting Journal
  - Reference Library

## Image Fallbacks

When a recipe/style photo is missing, show a styled fallback panel with the selected item name. Do not render a broken image icon.

Current fallback applies to:

- Beer recipe/style photos until `public/beers/` is populated
- Wine style/blend photos until `public/wines/` is populated
