# Sipopedia Team Workflow

This repo can be edited by Codex and OpenClaw at the same time, but each agent must stay in its own lane.

## Lanes

- Codex: `C:\codebase\sipopedia-codex`, branch `work/codex`, PR #2.
- OpenClaw: `C:\codebase\sipopedia-openclaw`, branch `work/openclaw`, PR #1.
- Main/reference: `C:\codebase\sipopedia`, branch `main`; do not use as a shared edit lane unless the user explicitly asks.

`Application Demo` is not the Sipopedia repo. Treat it as reference-only for the user's `/me` resume/application context.

## Start Every Session

Run the lane guard from inside the agent worktree before editing:

```powershell
. C:\codebase\tools\git-env.ps1
powershell -File .\tools\start-agent-session.ps1 -Agent Codex -Strict
powershell -File .\tools\start-agent-session.ps1 -Agent OpenClaw -Strict
```

Use only the command for the current agent. The guard checks folder, branch, origin, Git LFS status, GitHub auth state, and which handoff files to read.

## Current Validation Snapshot

Read `docs/VALIDATION_TRIAGE_SNAPSHOT.md` before debugging missing pages, deployment issues, or design regressions. It records the latest known build, audit, and route smoke status plus the current coverage limits.

## Deployment Readiness

For GitHub/Replit/deployment loading issues, read `docs/DEPLOYMENT_READINESS.md` and run:

```powershell
powershell -File .\tools\check-deployment-readiness.ps1
```

Before reporting a release-ready deployment state, run:

```powershell
powershell -File .\tools\check-deployment-readiness.ps1 -RunValidation -RunSmoke
```

## GitHub Auth And Pushes

For local push readiness, read `docs/GITHUB_AUTH_AND_PUSH.md` and run:

```powershell -File .\tools\check-github-auth.ps1
```

Login and push require an interactive shell:

```powershell
powershell -File .\tools\check-github-auth.ps1 -Login -SetupGit
powershell -File .\tools\check-github-auth.ps1 -Push
```

## Agent Handoff Pings

When the user asks to ping another bot or agent, read `docs/AGENT_HANDOFF_PROTOCOL.md` and generate the message with:

```powershell
powershell -File .\tools\agent-handoff.ps1 -Recipient OpenClaw -From Codex -Summary "Use C:\codebase\sipopedia-openclaw for Sipopedia edits. Application Demo is not the repo."
```

From anywhere on the Windows VM, prefer the explicit target form:

```powershell
C:\codebase\tools\sipopedia-control.ps1 -Mode Ping -To OpenClaw -From Codex -Summary "Use C:\codebase\sipopedia-openclaw for Sipopedia edits. Application Demo is not the repo."
```

For actual Telegram delivery through the running Windows OpenClaw guest and Clawdius account:

```powershell
C:\codebase\tools\sipopedia-control.ps1 -Mode Telegram -Group Sipopedia -Account clawdius -Summary "Use C:\codebase\sipopedia-openclaw for Sipopedia edits. Application Demo is not the repo."
```

If Telegram is not available from the current runtime, post the generated message to the target lane PR or leave it in `C:\codebase\team-outbox`.

## Team Control

For a combined lane, auth, and next-action view, run:

```powershell
powershell -File .\tools\team-control.ps1 -Mode All
```

From outside a Sipopedia worktree, use the host wrapper:

```powershell
C:\codebase\tools\sipopedia-control.ps1 -Mode Status
C:\codebase\tools\sipopedia-control.ps1 -Mode Next
C:\codebase\tools\sipopedia-control.ps1 -Mode Outbox
C:\codebase\tools\sipopedia-control.ps1 -Mode Ping -To OpenClaw -From Codex -Summary "Coordinate before touching shared route files." -Paths "src\App.tsx","scripts\smoke-routes.mjs"
C:\codebase\tools\sipopedia-control.ps1 -Mode Telegram -Group Sipopedia -Account clawdius -Summary "Coordinate before touching shared route files." -Paths "src\App.tsx","scripts\smoke-routes.mjs"
```

If the host wrapper is missing or stale, install it from a repo worktree:

```powershell -File .\tools\install-host-control.ps1
powershell -File .\tools\install-host-control.ps1 -Check
```

Use `-Mode Status` for a shorter lane summary, `-Mode Next` for recommended next commands, `-Mode Auth` for GitHub auth checks, `-Mode Outbox` for queued messages, `-Mode Ping -To Codex|OpenClaw|Both -From Codex|OpenClaw|User -Summary "..."` to generate bot-style pings through `tools\agent-handoff.ps1`, and `-Mode Telegram -Group Sipopedia -Account clawdius -Summary "..."` for live Telegram delivery. The older `-Mode Ping -Agent Codex|OpenClaw|Both` form still works as a sender-based shorthand.

## Claim Work Before Editing

Before editing files that another agent could also touch, create a PR comment claim:

```powershell
powershell -File .\tools\claim-agent-work.ps1 -Agent Codex -Action Claim -Summary "Fix route smoke failures" -Paths "scripts/smoke-routes.mjs","package-lock.json"
powershell -File .\tools\claim-agent-work.ps1 -Agent OpenClaw -Action Claim -Summary "Audit missing pages" -Paths "src/App.tsx","src/components"
```

The helper prints a standardized PR comment. If GitHub CLI is authenticated, add `-Post` to post it automatically. If not, the message is saved under `C:\codebase\team-outbox`; inspect with `C:\codebase\tools\sipopedia-control.ps1 -Mode Outbox` and post later with `powershell -File .\tools\team-outbox.ps1 -Mode Post -All`.

Use `-Action Update` when scope changes. Use `-Action Release` when the work is done or abandoned.

## Avoid Shared Git Ref Locks

These worktrees share one underlying Git repository. Do not run `git fetch` concurrently from multiple Sipopedia worktrees. Use the session guard's `-Fetch` option only when intentionally refreshing origin refs.

## Validation Baseline

For website changes, run:

```powershell
npm run build
npm run smoke:routes
```

For broader validation when time allows, run:

```powershell -File .\validators\validate-website.ps1
```

For terminology changes, run:

```powershell
powershell -File .\validators\validate-terminology.ps1
```

## Reporting

Each PR comment should include:

- folders or files touched
- commands run and pass/fail result
- blockers such as missing auth or missing environment variables
- whether another agent should avoid the same paths
