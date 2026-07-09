# GitHub Auth And Push Workflow

Portable Git, Git LFS, and GitHub CLI are installed under `C:\codebase\tools`, but GitHub CLI is not authenticated by default on this Windows VM.

## Check Auth

From an agent worktree:

```powershell
powershell -File .\tools\check-github-auth.ps1
```

This reports the current branch, local delta against `origin/<branch>`, and GitHub CLI auth status.

## Login From An Interactive Shell

Run this only in an interactive shell where browser login can complete:

```powershell
powershell -File .\tools\check-github-auth.ps1 -Login -SetupGit
```

That runs `gh auth login --hostname github.com --git-protocol https --web` and then `gh auth setup-git --hostname github.com`.

## Push Current Branch

After auth is set up:

```powershell
powershell -File .\tools\check-github-auth.ps1 -Push
```

The helper refuses to push a branch different from the current branch.

## Current Codex Lockfile Case

The validated `package-lock.json` audit update in `C:\codebase\sipopedia-codex` is local-only until authenticated push is available. Codex attempted to publish it through the GitHub connector, but the local lockfile is about 48 KB and the tool/chat surface truncated the content. A partial lockfile update would be unsafe, so the correct path is:

```powershell
cd C:\codebase\sipopedia-codex
powershell -File .\tools\check-github-auth.ps1 -Login -SetupGit
powershell -File .\tools\check-github-auth.ps1 -Push
```

Before pushing, confirm the only meaningful local delta against `origin/work/codex` is still the validated lockfile update:

```powershell
git diff --stat origin/work/codex..HEAD
```

## Coordination Rules

- Do not run `git fetch` concurrently from multiple Sipopedia worktrees because they share refs.
- Use `tools/claim-agent-work.ps1` before pushing work that changes shared files.
- Record push results in the lane PR after pushing.
