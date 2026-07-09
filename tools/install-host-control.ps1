param(
  [string]$TargetPath = "C:\codebase\tools\sipopedia-control.ps1",
  [switch]$Check
)

$ErrorActionPreference = "Stop"

$content = @'
param(
  [ValidateSet("Status", "Next", "Ping", "Auth", "All", "BootstrapOpenClaw")]
  [string]$Mode = "Status",
  [ValidateSet("Codex", "OpenClaw", "Both")]
  [string]$Agent = "Both",
  [string]$Summary = "",
  [Alias("Paths")]
  [string[]]$ControlPaths = @(),
  [switch]$Post,
  [switch]$Fetch
)

$ErrorActionPreference = "Stop"

$ToolRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$GitEnv = Join-Path $ToolRoot "git-env.ps1"
if (Test-Path -LiteralPath $GitEnv) {
  . $GitEnv
}

$root = "C:\codebase"
$codexControl = Join-Path $root "sipopedia-codex\tools\team-control.ps1"
$openClawControl = Join-Path $root "sipopedia-openclaw\tools\team-control.ps1"
$bootstrapOpenClaw = Join-Path $ToolRoot "openclaw-bootstrap-sipopedia.ps1"

if ($Mode -eq "BootstrapOpenClaw") {
  if (-not (Test-Path -LiteralPath $bootstrapOpenClaw)) {
    throw "OpenClaw bootstrap script not found: $bootstrapOpenClaw"
  }

  & $bootstrapOpenClaw
  if ($LASTEXITCODE -ne 0) {
    throw "OpenClaw bootstrap failed."
  }
}

$teamControl = $null
if (Test-Path -LiteralPath $codexControl) {
  $teamControl = $codexControl
} elseif (Test-Path -LiteralPath $openClawControl) {
  $teamControl = $openClawControl
}

if (-not $teamControl) {
  throw "Could not find repo-local team-control.ps1. Expected $codexControl or $openClawControl."
}

$teamMode = $Mode
if ($Mode -eq "BootstrapOpenClaw") {
  $teamMode = "Status"
  $Agent = "OpenClaw"
}

$params = @{
  Mode = $teamMode
  Agent = $Agent
}
if ($Summary) {
  $params.Summary = $Summary
}
if ($ControlPaths.Count -gt 0) {
  $params.ControlPaths = $ControlPaths
}
if ($Post) {
  $params.Post = $true
}
if ($Fetch) {
  $params.Fetch = $true
}

Write-Host ""
Write-Host ("Delegating to repo-local team control: {0}" -f $teamControl)
& $teamControl @params
'@

$targetDir = Split-Path -Parent $TargetPath
if (-not (Test-Path -LiteralPath $targetDir)) {
  if ($Check) {
    Write-Host ("Missing target directory: {0}" -f $targetDir)
    exit 1
  }
  New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
}

function Normalize-Content {
  param([string]$Value)
  return ($Value -replace "`r`n", "`n").TrimEnd("`n")
}

$normalizedExpected = Normalize-Content $content
$exists = Test-Path -LiteralPath $TargetPath
if ($exists) {
  $current = Normalize-Content (Get-Content -LiteralPath $TargetPath -Raw)
  if ($current -eq $normalizedExpected) {
    Write-Host ("Host control wrapper is current: {0}" -f $TargetPath)
    exit 0
  }

  if ($Check) {
    Write-Host ("Host control wrapper differs: {0}" -f $TargetPath)
    exit 2
  }
}

if ($Check) {
  Write-Host ("Host control wrapper is missing: {0}" -f $TargetPath)
  exit 1
}

Set-Content -LiteralPath $TargetPath -Value $content -Encoding UTF8
Write-Host ("Installed host control wrapper: {0}" -f $TargetPath)
