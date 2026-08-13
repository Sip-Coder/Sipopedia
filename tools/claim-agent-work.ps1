param(
  [ValidateSet("Auto", "Codex", "OpenClaw")]
  [string]$Agent = "Auto",
  [ValidateSet("Claim", "Update", "Release")]
  [string]$Action = "Claim",
  [Parameter(Mandatory = $true)]
  [string]$Summary,
  [Alias("Paths")]
  [string[]]$ClaimPaths = @(),
  [switch]$Post,
  [switch]$NoQueue
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

$repoRootRaw = git rev-parse --show-toplevel 2>$null
if ($LASTEXITCODE -ne 0 -or -not $repoRootRaw) {
  throw "Run this from inside a Sipopedia Git checkout."
}

$currentBranch = (git branch --show-current 2>$null).Trim()
$lanes = @{
  "work/codex" = @{ Agent = "Codex"; PullRequest = 2; Workspace = "C:\codebase\sipopedia-codex" }
  "work/openclaw" = @{ Agent = "OpenClaw"; PullRequest = 1; Workspace = "C:\codebase\sipopedia-openclaw" }
}

$targetAgent = $Agent
if ($Agent -eq "Auto") {
  if ($lanes.ContainsKey($currentBranch)) {
    $targetAgent = $lanes[$currentBranch].Agent
  } else {
    throw "Could not infer agent from branch '$currentBranch'. Pass -Agent Codex or -Agent OpenClaw."
  }
}

$targetLane = $lanes.GetEnumerator() | Where-Object { $_.Value.Agent -eq $targetAgent } | Select-Object -First 1
if (-not $targetLane) {
  throw "Unsupported agent lane: $targetAgent"
}

$expectedBranch = $targetLane.Key
$prNumber = $targetLane.Value.PullRequest
$workspace = $targetLane.Value.Workspace
$timestamp = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")

$pathLines = @()
if ($ClaimPaths.Count -gt 0) {
  $pathLines = $ClaimPaths | ForEach-Object { "- $_" }
} else {
  $pathLines = @("- not specified")
}

$lowerAction = $Action.ToLowerInvariant()
$body = @"
Agent work $lowerAction

Agent: $targetAgent
Action: $Action
Branch: $currentBranch
Expected branch: $expectedBranch
Workspace: $workspace
Time: $timestamp

Paths:
$($pathLines -join "`n")

Summary:
$Summary
"@

function Save-OutboxMessage {
  param(
    [string]$Type,
    [int]$PullRequest,
    [string]$Target,
    [string]$Sender,
    [string]$Body
  )

  $outboxRoot = Join-Path $Root "team-outbox"
  New-Item -ItemType Directory -Path $outboxRoot -Force | Out-Null

  $safeTarget = $Target -replace "[^A-Za-z0-9_-]", "-"
  $safeSender = $Sender -replace "[^A-Za-z0-9_-]", "-"
  $stamp = (Get-Date).ToUniversalTime().ToString("yyyyMMddTHHmmssZ")
  $suffix = [guid]::NewGuid().ToString("N").Substring(0, 8)
  $fileName = "{0}-{1}-pr{2}-{3}-from-{4}-{5}.md" -f $stamp, $Type, $PullRequest, $safeTarget, $safeSender, $suffix
  $filePath = Join-Path $outboxRoot $fileName
  $createdAt = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")

  $content = @"
---
type: $Type
target: $Target
from: $Sender
pr: $PullRequest
created_at: $createdAt
source: tools/claim-agent-work.ps1
---

$Body
"@

  Set-Content -LiteralPath $filePath -Value $content -Encoding UTF8
  return $filePath
}

Write-Host ""
Write-Host "Sipopedia agent work claim"
Write-Host ("Target PR: https://github.com/Sip-Coder/Sipopedia/pull/{0}" -f $prNumber)
Write-Host ""
Write-Host $body

if ($currentBranch -ne $expectedBranch) {
  Write-Warning ("Current branch is {0}; expected {1} for {2}." -f $currentBranch, $expectedBranch, $targetAgent)
}

if ($Post) {
  $canPost = $false
  if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Warning "gh is not on PATH. Posting skipped."
  } else {
    $authStatus = gh auth status 2>&1
    $canPost = $LASTEXITCODE -eq 0
    if (-not $canPost) {
      Write-Warning "GitHub CLI is not authenticated. Posting skipped."
    }
  }

  if (-not $canPost) {
    if (-not $NoQueue) {
      $queuedPath = Save-OutboxMessage -Type "claim" -PullRequest $prNumber -Target $targetAgent -Sender $targetAgent -Body $body
      Write-Host ("Queued local copy: {0}" -f $queuedPath)
    }
    Write-Host "After login, post queued messages with:"
    Write-Host "  powershell -File .\tools\team-outbox.ps1 -Mode Post -All"
    exit 2
  }

  gh pr comment $prNumber --repo Sip-Coder/Sipopedia --body $body
  if ($LASTEXITCODE -ne 0) {
    Write-Warning "Posting failed."
    if (-not $NoQueue) {
      $queuedPath = Save-OutboxMessage -Type "claim" -PullRequest $prNumber -Target $targetAgent -Sender $targetAgent -Body $body
      Write-Host ("Queued local copy: {0}" -f $queuedPath)
    }
    exit 2
  }
} else {
  Write-Host ""
  if (-not $NoQueue) {
    $queuedPath = Save-OutboxMessage -Type "claim" -PullRequest $prNumber -Target $targetAgent -Sender $targetAgent -Body $body
    Write-Host ("Queued local copy: {0}" -f $queuedPath)
  }
  Write-Host "Posting skipped. Add -Post after gh auth is available, or paste the queued message into the PR."
}
