# Deployment Readiness

This app is a Vite React single-page app that uses hash-based routing. That matters for Replit and other static or proxy-style hosts: deep app pages should load through `/#...` URLs without requiring server rewrite rules.

## First Check

From the agent lane you are using:

```powershell
. C:\codebase\tools\git-env.ps1
powershell -File .\tools\start-agent-session.ps1 -Agent Codex -Strict
powershell -File .\tools\start-agent-session.ps1 -Agent OpenClaw -Strict
```

Use only the command for your lane.

## Readiness Checker

Run the structural deployment check:

```powershell
powershell -File .\tools\check-deployment-readiness.ps1
```

Run the full local validation gate:

```powershell
powershell -File .\tools\check-deployment-readiness.ps1 -RunValidation -RunSmoke
```

Use `-SkipInstall` with `-RunValidation` only when `node_modules` is already known to match `package-lock.json`.

## What The Checker Verifies

The checker confirms:

- Git, Node, and npm are available.
- Required repo files exist: `package.json`, `package-lock.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `scripts/smoke-routes.mjs`, and `public/`.
- `package.json` exposes `build`, `preview`, and `smoke:routes`.
- Vite is configured for hosted/proxied access with `host: "0.0.0.0"` and `allowedHosts: true`.
- The app shell still uses hash routing.
- The smoke harness has explicit hash routes.
- The README documents the Replit and `VITE_APP_URL` caveat.
- Replit environments are not using a localhost `VITE_APP_URL`.

With `-RunValidation`, it also runs:

```text
npm ci
npm run build
npm audit --audit-level=moderate
```

With `-RunSmoke`, it additionally runs:

```text
npm run smoke:routes
```

## Replit Notes

For a temporary Replit URL:

- Do not set `VITE_APP_URL` to localhost.
- Add the exact Replit URL to Supabase Auth redirect URLs if login is tested there.
- Keep provider secrets in Supabase Edge Function secrets, not frontend env files.
- Use the app's hash routes, such as `/#app/sipopedia`, for direct links.

For a custom domain:

- Set `VITE_APP_URL` to the canonical production URL, for example `https://sipopedia.com`.
- Add both apex and www domains to Supabase Auth redirect URLs if both are used.

## Reading Failures

A checker failure means the deployment lane is not ready to debug app behavior yet. Fix the missing tool, missing file, or bad environment setting first.

A checker warning means deployment can continue, but the team should record the caveat in the PR before handing work to another agent.

## Relationship To Route Smoke

`npm run smoke:routes` proves only the explicit route list in `scripts/smoke-routes.mjs`. It does not prove every possible data-driven route, query-string state, auth callback, Supabase-backed admin state, or third-party API response.

Use `docs/VALIDATION_TRIAGE_SNAPSHOT.md` for the latest known green baseline and coverage limits.
