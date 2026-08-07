param(
  [ValidateSet("Auto", "Codex", "OpenClaw", "Main")]
  [string]$Agent = "Auto",
  [switch]$Strict,
  [switch]$Fetch
)

$ErrorActionPreference = "Continue"

$Root = "C:\codebase"
$GitEnv = Join-Path $Root "tools\git-env.ps1"
if (Test-Path -LiteralPath $GitEnv) {
  . $GitEnv
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw "git is not on PATH. On the Windows VM, run: . C:\codebase\tools\git-env.ps1"
}

function Normalize-PathForCompare {
  param([string]$Path)
  return [System.IO.Path]::GetFullPath($Path).TrimEnd("\")
}

$repoRootRaw = git rev-parse --show-toplevel 2>$null
if ($LASTEXITCODE -ne 0 -or -not $repoRootRaw) {
  throw "Run this from inside a Sipopedia Git checkout."
}

$repoRoot = Normalize-PathForCompare $repoRootRaw.Trim()
$currentBranch = (git branch --show-current 2>$null).Trim()
$remoteUrl = (git remote get-url origin 2>$null).Trim()
$issues = @()

$lanes = [ordered]@{
  Codex = [ordered]@{
    Path = Normalize-PathForCompare "C:\codebase\sipopedia-codex"
    Branch = "work/codex"
    PR = "https://github.com/Sip-Coder/Sipopedia/pull/2"
    ReadFirst = @("AGENTS.md", "docs/TEAM_WORKFLOW.md", "CODEX_WORKSPACE.md", "docs/CODEX_SIPOPEDIA_HANDOFF.md")
  }
  OpenClaw = [ordered]@{
    Path = Normalize-PathForCompare "C:\codebase\sipopedia-openclaw"
    Branch = "work/openclaw"
    PR = "https://github.com/Sip-Coder/Sipopedia/pull/1"
    ReadFirst = @("AGENTS.md", "docs/TEAM_WORKFLOW.md", "OPENCLAW_WORKSPACE.md", "docs/OPENCLAW_SIPOPEDIA_HANDOFF.md")
  }
  Main = [ordered]@{
    Path = Normalize-PathForCompare "C:\codebase\sipopedia"
    Branch = "main"
    PR = "main/reference checkout"
    ReadFirst = @("AGENTS.md", "docs/TEAM_WORKFLOW.md")
  }
}

$detected = "Unknown"
foreach ($name in $lanes.Keys) {
  $lane = $lanes[$name]
  if ($repoRoot.Equals($lane.Path, [System.StringComparison]::OrdinalIgnoreCase) -or $currentBranch -eq $lane.Branch) {
    $detected = $name
    break
  }
}

$targetName = $Agent
if ($Agent -eq "Auto") {
  $targetName = $detected
}

Write-Host ""
Write-Host "Sipopedia agent session guard"
Write-Host ("Repo root:      {0}" -f $repoRoot)
Write-Host ("Current branch: {0}" -f $currentBranch)
Write-Host ("Detected lane:  {0}" -f $detected)
Write-Host ("Requested lane: {0}" -f $targetName)
Write-Host ("Origin:         {0}" -f $remoteUrl)

if ($remoteUrl -and $remoteUrl -notmatch "github\.com[:/]Sip-Coder/Sipopedia(\.git)?$") {
  $issues += "Origin does not look like Sip-Coder/Sipopedia."
}

if ($lanes.Contains($targetName)) {
  $lane = $lanes[$targetName]
  Write-Host ""
  Write-Host ("Expected path:  {0}" -f $lane.Path)
  Write-Host ("Expected branch:{0}" -f $lane.Branch)
  Write-Host ("Coordination:   {0}" -f $lane.PR)
  Write-Host "Read first:"
  foreach ($file in $lane.ReadFirst) {
    Write-Host ("  {0}" -f $file)
  }

  if (-not $repoRoot.Equals($lane.Path, [System.StringComparison]::OrdinalIgnoreCase)) {
    $issues += ("Wrong folder for {0}. Expected {1}." -f $targetName, $lane.Path)
  }
  if ($currentBranch -ne $lane.Branch) {
    $issues += ("Wrong branch for {0}. Expected {1}." -f $targetName, $lane.Branch)
  }
} else {
  $issues += "Could not identify an expected Codex/OpenClaw/Main lane."
}

Write-Host ""
if ($Fetch) {
  Write-Host "Fetching origin. Do not run this concurrently from another Sipopedia worktree."
  git fetch origin --prune
} else {
  Write-Host "Fetch skipped. Use -Fetch when you intentionally want to refresh origin refs."
}

Write-Host ""
Write-Host "Git status:"
git status --short --branch

Write-Host ""
Write-Host "Git LFS status:"
if (Get-Command git-lfs -ErrorAction SilentlyContinue) {
  git lfs status
} else {
  Write-Warning "git-lfs is not on PATH."
}

Write-Host ""
Write-Host "GitHub CLI auth:"
if (Get-Command gh -ErrorAction SilentlyContinue) {
  gh auth status
} else {
  Write-Host "gh is not on PATH."
}

$teamStatus = "C:\codebase\tools\sipopedia-team-status.ps1"
if (Test-Path -LiteralPath $teamStatus) {
  Write-Host ""
  Write-Host ("Shared team status: {0}" -f $teamStatus)
}

if ($issues.Count -gt 0) {
  Write-Host ""
  Write-Host "Session guard warnings:"
  foreach ($issue in $issues) {
    Write-Warning $issue
  }

  if ($Strict) {
    throw "Sipopedia session guard failed. Fix the warnings above before editing."
  }
}
