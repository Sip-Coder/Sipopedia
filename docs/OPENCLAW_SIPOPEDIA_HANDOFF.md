# OpenClaw Sipopedia Handoff

OpenClaw should work from the real Sipopedia Git repository, not from the temporary static demo folder.

## Correct Workspace

Use this folder for OpenClaw work:

```text
C:\codebase\sipopedia-openclaw
```

Expected branch:

```text
work/openclaw
```

Expected remote:

```text
https://github.com/Sip-Coder/Sipopedia.git
```

## Do Not Use As Primary Workspace

Do not continue primary Sipopedia work from:

```text
C:\home\rsipstudies\.openclaw\workspace\Application Demo
```

That folder is resume/demo work under the user's `/me` workspace. It is not the Sipopedia website repository. Treat it only as reference material if needed.

## If C:\codebase Is Not Visible

If OpenClaw's shell cannot see `C:\codebase`, it is running in a different VM/filesystem view than Codex. In that case, OpenClaw needs its own clone of the same GitHub repository inside a folder it can see.

Preferred options:

1. Mount or expose the Windows VM `C:\codebase` folder to OpenClaw, then use `C:\codebase\sipopedia-openclaw`.
2. If that is not available, create a separate OpenClaw-visible clone named `sipopedia-openclaw`, on branch `work/openclaw`, from `https://github.com/Sip-Coder/Sipopedia.git`.

Bootstrap script prepared by Codex:

```text
C:\codebase\tools\openclaw-bootstrap-sipopedia.ps1
```

If OpenClaw can receive that script but cannot see `C:\codebase`, run it with a base folder that exists in OpenClaw's environment, for example:

```powershell
powershell -ExecutionPolicy Bypass -File .\openclaw-bootstrap-sipopedia.ps1 -BaseDir C:\home\rsipstudies\.openclaw\workspace -WorkspaceName sipopedia-openclaw
```

That creates or reuses:

```text
C:\home\rsipstudies\.openclaw\workspace\sipopedia-openclaw
```

This is acceptable only when `C:\codebase` is not available to OpenClaw. The shared source of truth remains GitHub plus the `work/openclaw` branch.

## OpenClaw Startup Commands

In PowerShell:

```powershell
. C:\codebase\tools\git-env.ps1
cd C:\codebase\sipopedia-openclaw
git status --short --branch
git remote -v
git lfs status
```

The status should show:

```text
## work/openclaw...origin/main
```

## Working Rules

- OpenClaw edits only `C:\codebase\sipopedia-openclaw` unless the user explicitly says otherwise.
- Codex edits `C:\codebase\sipopedia-codex` unless the user explicitly says otherwise.
- Do not have OpenClaw and Codex edit the same working tree at the same time.
- Before changing files, run `git status --short --branch`.
- After changing files, run the relevant validation. Baseline web validation is:

```powershell
npm ci
npm run build
npm run smoke:routes
```

- If OpenClaw needs assets or ideas from the old `Application Demo` folder, copy the useful parts intentionally into the Git repo and explain the source in the handoff.

## Push Behavior

Portable Git is configured with:

```text
push.default=current
```

From `work/openclaw`, a plain `git push` should push to:

```text
origin/work/openclaw
```

Do not push directly to `main` unless the user explicitly asks for that.

## Message To Send OpenClaw

Please stop using `C:\home\rsipstudies\.openclaw\workspace\Application Demo` as the Sipopedia working folder. That is resume/demo work under `/me`, not the Sipopedia website repo.

Codex set up the real Git repo at `C:\codebase\sipopedia-openclaw` on branch `work/openclaw`, with Git LFS enabled and remote `https://github.com/Sip-Coder/Sipopedia.git`.

Start each session with:

```powershell
. C:\codebase\tools\git-env.ps1
cd C:\codebase\sipopedia-openclaw
git status --short --branch
git lfs status
```

If your shell cannot see `C:\codebase`, you are in a different VM/filesystem view. In that case, clone `https://github.com/Sip-Coder/Sipopedia.git` into an OpenClaw-visible folder named `sipopedia-openclaw`, switch to branch `work/openclaw`, install/pull Git LFS, and use that clone for Sipopedia edits. Treat the old `Application Demo` folder only as reference material.
