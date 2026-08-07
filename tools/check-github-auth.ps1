param(
  [switch]$Login,
  [switch]$SetupGit,
  [switch]$Push,
  [string]$Branch = ""
)

$ErrorActionPreference = "Continue"

$GitEnv = "C:\codebase\tools\git-env.ps1"
if (Test-Path -LiteralPath $GitEnv) {
  . $GitEnv
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw "git is not on PATH. On the Windows VM, run: . C:\codebase\tools\git-env.ps1"
}
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  throw "gh is not on PATH. On the Windows VM, run: . C:\codebase\tools\git-env.ps1"
}

$repoRootRaw = git rev-parse --show-toplevel 2>$null
if ($LASTEXITCODE -ne 0 -or -not $repoRootRaw) {
  throw "Run this from inside a Sipopedia Git checkout."
}

$repoRoot = [System.IO.Path]::GetFullPath($repoRootRaw.Trim())
Push-Location $repoRoot
try {
  $currentBranch = (git branch --show-current 2>$null).Trim()
  if (-not $Branch) {
    $Branch = $currentBranch
  }

  Write-Host "Sipopedia GitHub auth and push readiness"
  Write-Host "Repo:   $repoRoot"
  Write-Host "Branch: $currentBranch"
  Write-Host "Target: $Branch"
  Write-Host "Origin: $((git remote get-url origin 2>$null).Trim())"
  Write-Host ""

  git status --short --branch
  Write-Host ""
  Write-Host ("Local delta against origin/{0}:" -f $Branch)
  git diff --stat "origin/$Branch..HEAD" 2>$null

  Write-Host ""
  Write-Host "GitHub CLI auth status:"
  $authStatus = gh auth status 2>&1
  $isAuthed = $LASTEXITCODE -eq 0
  $authStatus | ForEach-Object { Write-Host $_ }

  if (-not $isAuthed -and $Login) {
    Write-Host ""
    Write-Host "Starting GitHub CLI browser login."
    gh auth login --hostname github.com --git-protocol https --web
    $isAuthed = $LASTEXITCODE -eq 0
  }

  if ($isAuthed -and ($SetupGit -or $Push)) {
    Write-Host ""
    Write-Host "Configuring git to use GitHub CLI credentials."
    gh auth setup-git --hostname github.com
    if ($LASTEXITCODE -ne 0) {
      throw "gh auth setup-git failed."
    }
  }

  if ($Push) {
    if (-not $isAuthed) {
      throw "Cannot push because gh is not authenticated. Re-run with -Login -Push from an interactive shell."
    }
    if ($currentBranch -ne $Branch) {
      throw "Current branch is $currentBranch but target branch is $Branch. Refusing to push."
    }

    Write-Host ""
    Write-Host "Fetching origin before push. Do not run this concurrently from another Sipopedia worktree."
    git fetch origin --prune
    if ($LASTEXITCODE -ne 0) {
      throw "git fetch failed."
    }

    Write-Host ""
    Write-Host "Pushing $Branch to origin."
    git push origin $Branch
    if ($LASTEXITCODE -ne 0) {
      throw "git push failed."
    }
  } elseif (-not $isAuthed) {
    Write-Host ""
    Write-Host "Not authenticated. From an interactive shell, run:"
    Write-Host "  powershell -File .\tools\check-github-auth.ps1 -Login -SetupGit"
    Write-Host "Then push with:"
    Write-Host "  powershell -File .\tools\check-github-auth.ps1 -Push"
  }
} finally {
  Pop-Location
}
