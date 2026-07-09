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

$script:GitHubAuthed = $false

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
    $script:GitHubAuthed = $LASTEXITCODE -eq 0
    if ($script:GitHubAuthed) {
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
    Behind = $null
    Ahead = $null
    DeltaStat = @()
    DeltaNames = @()
  }

  if (-not $state.Exists) {
    return $state
  }

  $state.CurrentBranch = (git -C $lane.Workspace branch --show-current 2>$null).Trim()
  $state.StatusLine = (git -C $lane.Workspace status --short --branch 2>$null | Select-Object -First 1)
  $porcelain = @(git -C $lane.Workspace status --porcelain 2>$null)
  $state.DirtyCount = $porcelain.Count
  $aheadBehind = (git -C $lane.Workspace rev-list --left-right --count "origin/$($lane.Branch)...HEAD" 2>$null)
  if ($LASTEXITCODE -eq 0 -and $aheadBehind) {
    $parts = $aheadBehind.Trim() -split "\s+"
    if ($parts.Count -eq 2) {
      $state.Behind = [int]$parts[0]
      $state.Ahead = [int]$parts[1]
    }
  }
  $state.DeltaStat = @(git -C $lane.Workspace diff --stat "origin/$($lane.Branch)..HEAD" 2>$null)
  $state.DeltaNames = @(git -C $lane.Workspace diff --name-only "origin/$($lane.Branch)..HEAD" 2>$null)
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
  if ($null -ne $state.Ahead -and $null -ne $state.Behind) {
    Write-Host ("Graph:     ahead {0}, behind {1}" -f $state.Ahead, $state.Behind)
  }
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
    Write-Host "Changed paths:"
    $state.DeltaNames | ForEach-Object { Write-Host ("  {0}" -f $_) }
  } else {
    Write-Host "  none"
    if (($state.Ahead -as [int]) -gt 0) {
      Write-Host "  note: branch is ahead only by local merge/history commits; no content delta against origin."
    }
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
    if ($state.DeltaNames.Count -gt 0) {
      Write-Host ("- Content delta against origin: {0}" -f ($state.DeltaNames -join ", "))
      if (-not $script:GitHubAuthed) {
        Write-Host "- gh is not authenticated. Interactive owner step before push:"
        Write-Host "  powershell -File .\tools\check-github-auth.ps1 -Login -SetupGit"
        Write-Host "  powershell -File .\tools\check-github-auth.ps1 -Push"
      } else {
        Write-Host "- gh is authenticated; claim shared paths, then push when ready."
      }
    } else {
      Write-Host "- No local commit delta against origin."
      if (($state.Ahead -as [int]) -gt 0) {
        Write-Host "- Ahead count is local merge/history only; do not push it just to preserve local sync commits."
      }
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
