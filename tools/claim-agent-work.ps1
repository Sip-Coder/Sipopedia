param(
  [ValidateSet("Auto", "Codex", "OpenClaw")]
  [string]$Agent = "Auto",
  [ValidateSet("Claim", "Update", "Release")]
  [string]$Action = "Claim",
  [Parameter(Mandatory = $true)]
  [string]$Summary,
  [string[]]$Paths = @(),
  [switch]$Post
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
if ($Paths.Count -gt 0) {
  $pathLines = $Paths | ForEach-Object { "- $_" }
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

Write-Host ""
Write-Host "Sipopedia agent work claim"
Write-Host ("Target PR: https://github.com/Sip-Coder/Sipopedia/pull/{0}" -f $prNumber)
Write-Host ""
Write-Host $body

if ($currentBranch -ne $expectedBranch) {
  Write-Warning ("Current branch is {0}; expected {1} for {2}." -f $currentBranch, $expectedBranch, $targetAgent)
}

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
  Write-Host "Posting skipped. Add -Post after gh auth is available, or paste the message above into the PR."
}
