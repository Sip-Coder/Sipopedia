# Sip Studies Menu Research Brief

Date: 2026-05-11

## Sources Consulted

- Awwwards winner/nominee galleries for contemporary high-craft web interaction patterns: https://www.awwwards.com/
- CSS Design Awards winner galleries for visual and interaction craft references: https://www.cssdesignawards.com/
- The FWA galleries for experimental digital interaction references: https://thefwa.com/
- Nielsen Norman Group on visible navigation and hidden-navigation friction: https://www.nngroup.com/articles/hamburger-menus/
- Nielsen Norman Group on progressive disclosure for managing complexity: https://www.nngroup.com/articles/progressive-disclosure/
- W3C WAI-ARIA disclosure navigation pattern and keyboard expectations: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/
- Baymard checkout research hub for account and checkout friction: https://baymard.com/research/checkout
- Internal agent audits of the current Sip Studies screenshots, navigation data, and onboarding funnel.

## Applied Principles

1. Navigation should stay compact, but not cryptic.
   The header menu remains small, but now shows a live route preview so novice users understand what each destination does before clicking.

2. Expert speed and novice guidance must coexist.
   `Ctrl+K`, arrow keys, `Home`, `End`, and `Enter` support fast routing. The preview panel and destination count support users who need more context.

3. State must survive the funnel.
   A user who tries to open a locked module should keep that destination through paywall, pricing, checkout, and payment-success routing.

4. Access language must be consistent.
   Public account actions use `Log In` / `Log Out`; stale `Sign In` copy should not reappear in user-facing navigation.

5. Mobile needs deliberate compression.
   The command menu stacks into one column on mobile and caps height so it behaves like an overlay, not a broken desktop dropdown.

## Audit Findings Captured

- Add preview metadata to each menu destination.
- Expose active destination state to assistive technology.
- Preserve checkout `next` routes after payment success.
- Preserve safe query context through auth callback route storage.
- Normalize remaining `Sign In` label drift to `Log In`.

## Next Design Directions

- Collapse the long homepage module grid into three cinematic `Learn`, `Taste`, and `Connect` portals.
- Add visible `Preview`, `Locked`, `Included`, and `Current` access states to module cards.
- Convert pricing from static cards into a route builder that visually connects plan, source, destination, and checkout path.
- Restyle checkout form fields to match the premium dark interface instead of default browser inputs.
- Consolidate route/menu data into one typed registry to eliminate label and count drift.
