param(
  [ValidateSet("Status", "Next", "Ping", "Auth", "Outbox", "Telegram", "All", "BootstrapOpenClaw")]
  [string]$Mode = "Status",
  [ValidateSet("Codex", "OpenClaw", "Both")]
  [string]$Agent = "Both",
  [string]$Summary = "",
  [string]$Message = "",
  [Alias("Paths")]
  [string[]]$ControlPaths = @(),
  [ValidateSet("Auto", "Codex", "OpenClaw", "Both")]
  [string]$To = "Auto",
  [ValidateSet("Auto", "Codex", "OpenClaw", "User")]
  [string]$From = "Auto",
  [ValidateSet("Sipopedia", "SipStudies", "PhysicalHealth", "ProfessionalHealth", "SocialHealth", "FamilyHealth")]
  [string]$Group = "Sipopedia",
  [string]$Target = "",
  [ValidateSet("clawdius", "roma", "sippy", "hummin")]
  [string]$Account = "clawdius",
  [switch]$Post,
  [switch]$Fetch,
  [switch]$DryRun
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
$telegramPing = Join-Path $ToolRoot "sipopedia-telegram-ping.ps1"

if ($Mode -eq "BootstrapOpenClaw") {
  if (-not (Test-Path -LiteralPath $bootstrapOpenClaw)) {
    throw "OpenClaw bootstrap script not found: $bootstrapOpenClaw"
  }

  & $bootstrapOpenClaw
  if ($LASTEXITCODE -ne 0) {
    throw "OpenClaw bootstrap failed."
  }
}

if ($Mode -eq "Telegram") {
  if (-not (Test-Path -LiteralPath $telegramPing)) {
    throw "Telegram ping helper not found: $telegramPing"
  }

  $body = $Message
  if (-not $body) {
    $body = $Summary
  }
  if (-not $body) {
    throw "Telegram mode requires -Message or -Summary."
  }

  if ($ControlPaths.Count -gt 0) {
    $body = @(
      $body
      ""
      "Paths:"
      ($ControlPaths | ForEach-Object { "- $_" })
    ) -join [Environment]::NewLine
  }

  $telegramParams = @{
    Group = $Group
    Account = $Account
    Message = $body
  }
  if ($Target) {
    $telegramParams.Target = $Target
  }
  if ($DryRun) {
    $telegramParams.DryRun = $true
  }

  & $telegramPing @telegramParams
  return
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
if ($To -ne "Auto") {
  $params.To = $To
}
if ($From -ne "Auto") {
  $params.From = $From
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
