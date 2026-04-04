# Hidden Tabs Registry (V2 Hold)

Last updated: 2026-03-23

These tabs are intentionally hidden from Sip Studios navigation for a future v2 release.
Routes and components are retained in the codebase so they can be restored later.

## Hidden Tabs

1. `sip studios > learn > game`
- Tab id: `sip-game`
- Hash route: `#/sip-game`
- Status: Hidden from Learn section nav

2. `sip studios > taste > flavors archived`
- Previous label: `Flavor Journal`
- Current label: `Tasting Journal Archived`
- Tab id: `tasting-journal`
- Hash route: `#/tasting-journal` (canonical), `#/flavor-journal` (legacy alias)
- Status: Hidden from Taste section nav

3. `sip studios > connect > tasting groups`
- Tab id: `tasting-groups`
- Hash route: `#/tasting-groups`
- Status: Hidden from Connect section nav

## Notes

- Connect section default page was changed to `Beverage News` while `Tasting Groups` is hidden.
- Re-enable by removing tab ids from `hiddenSipStudiosTabs` in `src/App.tsx`.
