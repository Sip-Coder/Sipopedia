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

## Claim Work Before Editing

Before editing files that another agent could also touch, create a PR comment claim:

```powershell
powershell -File .\tools\claim-agent-work.ps1 -Agent Codex -Action Claim -Summary "Fix route smoke failures" -Paths "scripts/smoke-routes.mjs","package-lock.json"
powershell -File .\tools\claim-agent-work.ps1 -Agent OpenClaw -Action Claim -Summary "Audit missing pages" -Paths "src/App.tsx","src/components"
```

The helper prints a standardized PR comment. If GitHub CLI is authenticated, add `-Post` to post it automatically. If not, paste the printed message into the correct PR.

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

```powershell
powershell -File .\validators\validate-website.ps1
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
