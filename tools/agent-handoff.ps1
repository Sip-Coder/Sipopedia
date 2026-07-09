param(
  [ValidateSet("Codex", "OpenClaw", "Both")]
  [string]$Recipient = "OpenClaw",
  [ValidateSet("Codex", "OpenClaw", "User")]
  [string]$From = "Codex",
  [Parameter(Mandatory = $true)]
  [string]$Summary,
  [Alias("Paths")]
  [string[]]$HandoffPaths = @(),
  [switch]$Post,
  [switch]$NoQueue
)

$ErrorActionPreference = "Continue"

$Root = "C:\codebase"
$GitEnv = Join-Path $Root "tools\git-env.ps1"
if (Test-Path -LiteralPath $GitEnv) {
  . $GitEnv
}

$repo = "https://github.com/Sip-Coder/Sipopedia"
$lanes = @{
  "Codex" = [ordered]@{
    Workspace = "C:\codebase\sipopedia-codex"
    Branch = "work/codex"
    PullRequest = 2
    ReadFirst = "AGENTS.md, docs\TEAM_WORKFLOW.md, CODEX_WORKSPACE.md, docs\CODEX_SIPOPEDIA_HANDOFF.md"
  }
  "OpenClaw" = [ordered]@{
    Workspace = "C:\codebase\sipopedia-openclaw"
    Branch = "work/openclaw"
    PullRequest = 1
    ReadFirst = "AGENTS.md, docs\TEAM_WORKFLOW.md, OPENCLAW_WORKSPACE.md, docs\OPENCLAW_SIPOPEDIA_HANDOFF.md"
  }
}

if ($Recipient -eq "Both") {
  $targets = @("Codex", "OpenClaw")
} else {
  $targets = @($Recipient)
}

$timestamp = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")

$normalizedPaths = @()
foreach ($handoffPath in $HandoffPaths) {
  $normalizedPaths += $handoffPath -split "," | ForEach-Object { $_.Trim().Trim("'").Trim('"') } | Where-Object { $_ }
}

$pathLines = @()
if ($normalizedPaths.Count -gt 0) {
  $pathLines = $normalizedPaths | ForEach-Object { "- $_" }
} else {
  $pathLines = @("- not specified")
}

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
source: tools/agent-handoff.ps1
---

$Body
"@

  Set-Content -LiteralPath $filePath -Value $content -Encoding UTF8
  return $filePath
}

$postAvailable = $false
if ($Post) {
  if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Warning "gh is not on PATH. Posting will be skipped."
  } else {
    $authStatus = gh auth status 2>&1
    $postAvailable = $LASTEXITCODE -eq 0
    if (-not $postAvailable) {
      Write-Warning "GitHub CLI is not authenticated. Posting will be skipped."
    }
  }
}

$postFailed = $false
foreach ($target in $targets) {
  $lane = $lanes[$target]
  $prNumber = $lane.PullRequest
  $prUrl = "$repo/pull/$prNumber"

  $body = @"
Sipopedia team ping

To: $target
From: $From
Time: $timestamp

Work only here:
$($lane.Workspace)

Branch:
$($lane.Branch)

PR:
$prUrl

Do not use Application Demo for Sipopedia website edits.

Run first:
. C:\codebase\tools\git-env.ps1
cd $($lane.Workspace)
powershell -File .\tools\start-agent-session.ps1 -Agent $target -Strict
powershell -File .\tools\check-github-auth.ps1

Task:
$Summary

Paths:
$($pathLines -join "`n")

Read first:
$($lane.ReadFirst)

Shared rule:
Claim shared paths before editing with tools\claim-agent-work.ps1.
"@

  Write-Host ""
  Write-Host "Sipopedia agent handoff"
  Write-Host ("Target PR: {0}" -f $prUrl)
  Write-Host ""
  Write-Host $body

  if ($Post -and $postAvailable) {
    gh pr comment $prNumber --repo Sip-Coder/Sipopedia --body $body
    if ($LASTEXITCODE -ne 0) {
      Write-Warning ("Posting failed for PR {0}." -f $prNumber)
      $postFailed = $true
      if (-not $NoQueue) {
        $queuedPath = Save-OutboxMessage -Type "handoff" -PullRequest $prNumber -Target $target -Sender $From -Body $body
        Write-Host ("Queued local copy: {0}" -f $queuedPath)
      }
    }
  } else {
    Write-Host ""
    if (-not $NoQueue) {
      $queuedPath = Save-OutboxMessage -Type "handoff" -PullRequest $prNumber -Target $target -Sender $From -Body $body
      Write-Host ("Queued local copy: {0}" -f $queuedPath)
    }
    if ($Post) {
      Write-Host "Posting skipped. After gh auth is available, run:"
      Write-Host "  powershell -File .\tools\team-outbox.ps1 -Mode Post -All"
    } else {
      Write-Host "Posting skipped. Add -Post after gh auth is available, or paste the queued message into Telegram or the target PR."
    }
  }
}

if ($Post -and (-not $postAvailable -or $postFailed)) {
  exit 2
}
