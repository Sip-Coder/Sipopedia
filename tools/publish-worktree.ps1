param(
  [string]$RepoPath = (Get-Location).Path,
  [string]$Branch = "",
  [switch]$Login
)

$ErrorActionPreference = "Stop"

$GitEnv = "C:\codebase\tools\git-env.ps1"
if (Test-Path -LiteralPath $GitEnv) {
  . $GitEnv
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw "git is not on PATH. Run the portable Git activation script first."
}
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  throw "gh is not on PATH. Install GitHub CLI or run C:\codebase\tools\git-env.ps1."
}
if (-not (Test-Path -LiteralPath $RepoPath)) {
  throw "Repo path not found: $RepoPath"
}

Push-Location $RepoPath
try {
  $currentBranch = (git branch --show-current).Trim()
  if (-not $Branch) {
    $Branch = $currentBranch
  }
  if ($currentBranch -ne $Branch) {
    throw "Expected branch $Branch, found $currentBranch"
  }

  git status --short --branch

  $authStatus = gh auth status 2>&1
  if ($LASTEXITCODE -ne 0) {
    if (-not $Login) {
      Write-Host ""
      Write-Host "GitHub CLI is not logged in."
      Write-Host "Run from an interactive shell with -Login to authenticate and push."
      exit 2
    }

    gh auth login --hostname github.com --git-protocol https --web
  }

  gh auth setup-git --hostname github.com
  gh auth status

  git fetch origin --prune
  git push origin $Branch
}
finally {
  Pop-Location
}
