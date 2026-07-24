# Codex Sipopedia Handoff

Codex should use the dedicated worktree and branch for Sipopedia changes.

## Correct Workspace

Windows VM path:

```text
C:\codebase\sipopedia-codex
```

Branch:

```text
work/codex
```

Remote:

```text
https://github.com/Sip-Coder/Sipopedia.git
```

## Team Split

```text
Codex    -> C:\codebase\sipopedia-codex     -> work/codex
OpenClaw -> C:\codebase\sipopedia-openclaw  -> work/openclaw
Main     -> C:\codebase\sipopedia           -> main/reference checkout
```

Do not have Codex and OpenClaw edit the same working tree at the same time.

## Session Startup

```powershell
. C:\codebase\tools\git-env.ps1
cd C:\codebase\sipopedia-codex
git fetch origin --prune
git status --short --branch
git lfs status
```

## Validation Baseline

For website changes, run:

```powershell
npm ci
npm run build
npm run smoke:routes
npm audit --audit-level=moderate
```

## Current Known Local Validation Work

Codex previously validated the local `C:\codebase\sipopedia` checkout with:

```text
npm run build              passed
npm run smoke:routes       passed 44/44 after smoke harness adjustment
npm audit --audit-level=moderate passed after dependency lockfile update
```

Those local changes are currently in the main/reference checkout and should be moved deliberately into `work/codex` before being proposed for merge:

```text
package-lock.json
scripts/smoke-routes.mjs
```

Behavioral summary of the smoke-route adjustment:

```text
Ignore browser-canceled Network.loadingFailed events where params.canceled is true or params.errorText is net::ERR_ABORTED. Continue failing real same-origin 4xx/5xx and network failures.
```

Dependency summary of the lockfile update:

```text
Vite resolved to 8.1.4
picomatch resolved to 4.0.5
postcss resolved to 8.5.16
ws resolved to 8.21.0
npm audit reported 0 vulnerabilities after the update
```

Do not assume these local changes are already on GitHub unless a later PR or commit explicitly carries them.
