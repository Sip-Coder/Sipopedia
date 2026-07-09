param(
  [ValidateSet("Codex", "OpenClaw", "Both")]
  [string]$Recipient = "OpenClaw",
  [ValidateSet("Codex", "OpenClaw", "User")]
  [string]$From = "Codex",
  [Parameter(Mandatory = $true)]
  [string]$Summary,
  [Alias("Paths")]
  [string[]]$HandoffPaths = @(),
  [switch]$Post
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

  if ($Post) {
    if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
      throw "gh is not on PATH. Run . C:\codebase\tools\git-env.ps1 first."
    }

    $authStatus = gh auth status 2>&1
    if ($LASTEXITCODE -ne 0) {
      Write-Warning "GitHub CLI is not authenticated. Posting skipped."
      Write-Host "After login, post with:"
      Write-Host ("  gh pr comment {0} --repo Sip-Coder/Sipopedia --body '<message body>'" -f $prNumber)
      exit 2
    }

    gh pr comment $prNumber --repo Sip-Coder/Sipopedia --body $body
  } else {
    Write-Host ""
    Write-Host "Posting skipped. Add -Post after gh auth is available, or paste the message above into Telegram or the target PR."
  }
}
