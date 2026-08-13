# OpenClaw Workspace

This is OpenClaw's dedicated Sipopedia Git worktree.

Use this folder:

```text
C:\codebase\sipopedia-openclaw
```

Expected branch:

```text
work/openclaw
```

Enable portable Git/LFS before running Git commands:

```powershell
. C:\codebase\tools\git-env.ps1
```

Recommended session start:

```powershell
cd C:\codebase\sipopedia-openclaw
git status --short --branch
git remote -v
git lfs status
```

Do not use this old static demo folder as the primary Sipopedia repo:

```text
C:\home\rsipstudies\.openclaw\workspace\Application Demo
```

That folder is resume/demo work under `/me`. It can be treated as reference material only. Active Sipopedia website changes should be made in this Git worktree.

If this folder is not visible from OpenClaw's shell, OpenClaw is running in a different VM/filesystem view. In that case, clone `https://github.com/Sip-Coder/Sipopedia.git` into an OpenClaw-visible `sipopedia-openclaw` folder and use branch `work/openclaw`.
