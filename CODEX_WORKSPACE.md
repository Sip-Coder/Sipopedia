# Codex Workspace

This is Codex's dedicated Sipopedia work channel.

Default local Windows VM folder:

```text
C:\codebase\sipopedia-codex
```

Expected branch:

```text
work/codex
```

Shared repository:

```text
https://github.com/Sip-Coder/Sipopedia.git
```

Enable portable Git/LFS before Git commands on the Windows VM:

```powershell
. C:\codebase\tools\git-env.ps1
```

Recommended session start:

```powershell
cd C:\codebase\sipopedia-codex
git status --short --branch
git fetch origin --prune
git lfs status
```

Working rule: Codex edits `work/codex`; OpenClaw edits `work/openclaw`. Do not have both agents edit the same working tree at the same time.

The `C:\codebase\sipopedia` checkout is the main/reference checkout and may contain local staging or validation work. Use `sipopedia-codex` for new Codex changes unless the user explicitly says otherwise.
