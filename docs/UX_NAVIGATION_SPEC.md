# UX and Navigation Spec

## 2026 Navigation Direction

Sip Studies navigation should behave like a compact learning cockpit, not a full-screen directory.

Current strategy:

- Keep the primary paths visible for novices: Lobby, pricing, enrollment/login, Launch Pad, and the active study lanes.
- Keep expert acceleration available through Search: `Ctrl/Cmd + K`, query, arrow selection, and Enter activation.
- Avoid returning to hidden-only navigation as the primary model. Hidden menus are useful for overflow, but the main learning routes need visible anchors.
- Make locked/public states explicit. A public user should understand what is available now and what requires login or enrollment without being thrown into a dead-end paywall.
- Treat mobile as constrained, not second-class. The same mental model should fit the viewport rather than becoming a separate menu system.

Research anchors:

- Nielsen Norman Group style guidance favors visible or partially visible navigation over hidden-only navigation for discoverability and task success.
- Awwwards and Godly references support bolder navigation treatments, but Sip Studies should borrow the intentionality, motion, and hierarchy rather than copying novelty at the cost of clarity.
- WCAG 2.2 navigation expectations require keyboard access, visible focus, and hidden regions that do not contain reachable controls.

Reference URLs:

- https://www.awwwards.com/inspiration/experimental-navigation-gallery
- https://godly.website/
- https://godly.design/
- https://www.thewcag.com/examples/navigation
- https://www.wuhcag.com/focus-visible/

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

## Onboarding Intent

Public acquisition routes should preserve user intent instead of sending every CTA to a generic checkout state.

Supported intent query fields:

- `plan`: `starter`, `pro`, or `founding`.
- `source`: the CTA surface that produced the intent, such as `home-hero`, `pricing`, `paywall`, `footer`, or `powerful-point`.
- `next`: the route the user was trying to reach before login, pricing, or checkout.

Current rules:

- Pricing initializes the selected card from `plan`.
- Pricing CTAs route to `checkout?plan=...&source=pricing` for paid plans.
- Checkout initializes the selected paid plan from `plan`.
- Checkout includes `plan`, `source`, and `next` in hosted checkout URL params and assisted enrollment email copy.
- Paywall CTAs preserve the blocked destination in `next`.
- Public CTAs should use `buildOnboardingRoute(...)`; do not add new blind `onNavigate("checkout")` acquisition links.

## Locked-State Preview

Locked routes should behave like guided access checkpoints, not dead ends.

Current rules:

- The paywall must show the attempted destination from `next` or the blocked route.
- The paywall must explain current access state using Launch Pad / public preview language.
- The paywall must preview the Learn, Taste, and Connect lanes before asking for payment.
- Membership Details and Subscribe for $10/month must preserve the blocked route in `next`.
- Starter Preview cards must use Learn, Taste, Connect, and Enrollment labels; do not reintroduce House Brand labels.

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

Current Mission Control behavior:

- The workspace menu is `Sip Studies Mission Control`.
- The active destination appears in the status card.
- Learn, Taste, and Connect are always visible as lane buttons.
- The active lane exposes a horizontal module rail when modules are available.
- Public users see locked lane messaging instead of empty module rails.
- Lobby links remain visible as a secondary band.
- Primary actions remain visible: Search, Launch Pad, Log In or Dashboard/Log Out depending on auth state.

Public destination search behavior:

- The public header menu is a compact `Choose destination` search surface, not a full-page menu.
- The visible destination list remains auth-specific; search, keyboard hints, and route badges are utilities, not extra destinations.
- `Ctrl K` opens the public destination menu when the public header is present.
- Opening the menu focuses the destination search field.
- `ArrowUp` and `ArrowDown` move the active search result.
- `Enter` opens the active result.
- `Escape` closes the menu and returns focus to `Choose destination`.
- Filtering must search destination labels, details, badges, and keyword aliases.
- Empty results must keep the menu open and offer a recovery hint.

Auth-specific lobby rules:

- Logged-out lobby menu:
  - Choose Destination
  - Lobby Home
  - Plan & Pricing
  - Enroll Now
  - Log In
- Logged-in lobby menu:
  - Choose Destination
  - Lobby Home
  - Plan & Pricing
  - Launch Pad
  - Account Dashboard
  - Log Out

Naming rules:

- Use `Launch Pad`, not `Launch Deck`.
- Use `Log In` and `Log Out` in navigation surfaces.
- Use `Dashboard` only where space is constrained and the surrounding context is clearly account-related.
- Do not reintroduce `House Brands` as a global navigation surface.

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

The workspace uses a strict keyboard hierarchy so navigation intent is consistent everywhere.

- `Ctrl/Cmd + K`: open **Search**
- `Shift + ArrowLeft/ArrowRight`: switch **Section**
- `Ctrl + ArrowLeft/ArrowRight`: switch **Module** within active section
- `ArrowLeft/ArrowRight`: switch **Page-Level Features**
- `Ctrl + Shift + ArrowLeft/ArrowRight`: switch **SubPage/SubMenu Features**
- `Escape`: return to **Starter Preview** (`/#app/starter`)

Notes:

- Keyboard handlers should not hijack input controls (`input`, `textarea`, `select`, `contenteditable`).
- Page-level and subpage-level feature switching are emitted as global events for feature modules to consume:
  - `sipstudies:navigate-page-feature`
  - `sipstudies:navigate-subfeature`

## Search Palette

Search is for expert navigation, not a replacement for visible navigation.

Requirements:

- Opens with `Ctrl/Cmd + K`.
- Closes with `Escape` or outside click.
- Search includes available lobby actions, available account actions, and visible modules.
- ArrowUp and ArrowDown move the active search result.
- Home and End jump within results.
- Enter activates the selected result.
- Hidden search palettes must not leave focusable controls in the tab order.

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
