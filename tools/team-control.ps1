param(
  [ValidateSet("Status", "Next", "Ping", "Auth", "All")]
  [string]$Mode = "Status",
  [ValidateSet("Codex", "OpenClaw", "Both")]
  [string]$Agent = "Both",
  [string]$Summary = "",
  [Alias("Paths")]
  [string[]]$ControlPaths = @(),
  [switch]$Post,
  [switch]$Fetch
)

$ErrorActionPreference = "Continue"

$Root = "C:\codebase"
$GitEnv = Join-Path $Root "tools\git-env.ps1"
if (Test-Path -LiteralPath $GitEnv) {
  . $GitEnv
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw "git is not on PATH. Run: . C:\codebase\tools\git-env.ps1"
}

$repo = "https://github.com/Sip-Coder/Sipopedia"
$lanes = [ordered]@{
  Codex = [ordered]@{
    Workspace = "C:\codebase\sipopedia-codex"
    Branch = "work/codex"
    PullRequest = 2
    HandoffRecipient = "OpenClaw"
  }
  OpenClaw = [ordered]@{
    Workspace = "C:\codebase\sipopedia-openclaw"
    Branch = "work/openclaw"
    PullRequest = 1
    HandoffRecipient = "Codex"
  }
}

function Get-Targets {
  if ($Agent -eq "Both") {
    return @("Codex", "OpenClaw")
  }
  return @($Agent)
}

function Write-ToolStatus {
  Write-Host "Tools:"
  git --version
  if (Get-Command git-lfs -ErrorAction SilentlyContinue) {
    git lfs version
  } else {
    Write-Warning "git-lfs is not on PATH."
  }
  if (Get-Command gh -ErrorAction SilentlyContinue) {
    gh --version | Select-Object -First 1
    $authStatus = gh auth status 2>&1
    if ($LASTEXITCODE -eq 0) {
      $authStatus | ForEach-Object { Write-Host $_ }
    } else {
      Write-Host "gh auth: not logged in"
    }
  } else {
    Write-Warning "gh is not on PATH."
  }
}

function Get-LaneState {
  param([string]$Name)

  $lane = $lanes[$Name]
  $state = [ordered]@{
    Name = $Name
    Workspace = $lane.Workspace
    Branch = $lane.Branch
    PullRequest = "$repo/pull/$($lane.PullRequest)"
    Exists = Test-Path -LiteralPath $lane.Workspace
    CurrentBranch = ""
    StatusLine = ""
    DirtyCount = $null
    DeltaStat = @()
  }

  if (-not $state.Exists) {
    return $state
  }

  $state.CurrentBranch = (git -C $lane.Workspace branch --show-current 2>$null).Trim()
  $state.StatusLine = (git -C $lane.Workspace status --short --branch 2>$null | Select-Object -First 1)
  $porcelain = @(git -C $lane.Workspace status --porcelain 2>$null)
  $state.DirtyCount = $porcelain.Count
  $state.DeltaStat = @(git -C $lane.Workspace diff --stat "origin/$($lane.Branch)..HEAD" 2>$null)
  return $state
}

function Write-LaneStatus {
  param([string]$Name)

  $lane = $lanes[$Name]
  $state = Get-LaneState $Name

  Write-Host ""
  Write-Host ("== {0} ==" -f $Name)
  Write-Host ("Workspace: {0}" -f $state.Workspace)
  Write-Host ("Branch:    {0}" -f $lane.Branch)
  Write-Host ("PR:        {0}" -f $state.PullRequest)

  if (-not $state.Exists) {
    Write-Warning "Workspace is missing."
    return
  }

  if ($Fetch) {
    Write-Host "Fetching origin for this lane. Do not run this concurrently from another Sipopedia worktree."
    git -C $lane.Workspace fetch origin --prune
  }

  Write-Host ("Status:    {0}" -f $state.StatusLine)
  if ($state.CurrentBranch -ne $lane.Branch) {
    Write-Warning ("Wrong branch: {0}; expected {1}." -f $state.CurrentBranch, $lane.Branch)
  }

  if ($state.DirtyCount -gt 0) {
    Write-Host "Working tree changes:"
    git -C $lane.Workspace status --short
  } else {
    Write-Host "Working tree: clean"
  }

  Write-Host "Local delta against origin:"
  if ($state.DeltaStat.Count -gt 0) {
    $state.DeltaStat | ForEach-Object { Write-Host $_ }
  } else {
    Write-Host "  none"
  }
}

function Write-NextActions {
  foreach ($name in Get-Targets) {
    $lane = $lanes[$name]
    $state = Get-LaneState $name

    Write-Host ""
    Write-Host ("Next actions for {0}:" -f $name)
    if (-not $state.Exists) {
      Write-Host ("- Clone {0} into {1} and switch to {2}." -f $repo, $lane.Workspace, $lane.Branch)
      continue
    }

    Write-Host ("- Start with: cd {0}; powershell -File .\tools\start-agent-session.ps1 -Agent {1} -Strict" -f $lane.Workspace, $name)
    Write-Host "- Check push readiness: powershell -File .\tools\check-github-auth.ps1"
    if ($state.DeltaStat.Count -gt 0) {
      Write-Host "- Local commits differ from origin; review the delta, claim shared paths, then push after gh auth."
    } else {
      Write-Host "- No local commit delta against origin."
    }
    if ($state.DirtyCount -gt 0) {
      Write-Host "- There are uncommitted working tree changes; inspect before starting new work."
    }
    Write-Host "- For a bot-style ping: powershell -File .\tools\agent-handoff.ps1 -Recipient $($lane.HandoffRecipient) -From $name -Summary ""<message>"""
  }
}

function Invoke-AuthChecks {
  foreach ($name in Get-Targets) {
    $lane = $lanes[$name]
    if (-not (Test-Path -LiteralPath $lane.Workspace)) {
      Write-Warning ("Skipping {0}; workspace missing: {1}" -f $name, $lane.Workspace)
      continue
    }

    Write-Host ""
    Write-Host ("== GitHub auth check: {0} ==" -f $name)
    Push-Location $lane.Workspace
    try {
      powershell -NoProfile -ExecutionPolicy Bypass -File ".\tools\check-github-auth.ps1"
    } finally {
      Pop-Location
    }
  }
}

function Invoke-Ping {
  if (-not $Summary) {
    throw "Mode Ping requires -Summary."
  }

  $targets = Get-Targets
  foreach ($name in $targets) {
    $lane = $lanes[$name]
    if (-not (Test-Path -LiteralPath $lane.Workspace)) {
      Write-Warning ("Skipping {0}; workspace missing: {1}" -f $name, $lane.Workspace)
      continue
    }

    Push-Location $lane.Workspace
    try {
      $args = @(
        "-NoProfile",
        "-ExecutionPolicy", "Bypass",
        "-File", ".\tools\agent-handoff.ps1",
        "-Recipient", $lane.HandoffRecipient,
        "-From", $name,
        "-Summary", $Summary
      )
      if ($ControlPaths.Count -gt 0) {
        $args += "-Paths"
        $args += $ControlPaths
      }
      if ($Post) {
        $args += "-Post"
      }
      powershell @args
    } finally {
      Pop-Location
    }
  }
}

Write-Host ""
Write-Host "Sipopedia team control"
Write-Host ("Mode: {0}" -f $Mode)
Write-Host ("Agent: {0}" -f $Agent)
Write-Host ""
Write-ToolStatus

if ($Mode -eq "Status" -or $Mode -eq "All") {
  foreach ($name in Get-Targets) {
    Write-LaneStatus $name
  }
}

if ($Mode -eq "Next" -or $Mode -eq "All") {
  Write-NextActions
}

if ($Mode -eq "Auth" -or $Mode -eq "All") {
  Invoke-AuthChecks
}

if ($Mode -eq "Ping") {
  Invoke-Ping
}
