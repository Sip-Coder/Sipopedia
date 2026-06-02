$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$runnerPath = Join-Path $repoRoot "scripts\run-daily-sip.ps1"
$taskName = "Sip Studies Daily Sip Research"

if (-not (Test-Path $runnerPath)) {
  throw "Daily Sip runner was not found at $runnerPath"
}

$powerShellCommand = Get-Command pwsh.exe -ErrorAction SilentlyContinue
if (-not $powerShellCommand) {
  $powerShellCommand = Get-Command powershell.exe -ErrorAction Stop
}

$arguments = "-NoProfile -ExecutionPolicy Bypass -File `"$runnerPath`""
$action = New-ScheduledTaskAction -Execute $powerShellCommand.Source -Argument $arguments -WorkingDirectory $repoRoot
$trigger = New-ScheduledTaskTrigger -AtLogOn
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -AllowStartIfOnBatteries -MultipleInstances IgnoreNew -ExecutionTimeLimit (New-TimeSpan -Minutes 25)

Register-ScheduledTask `
  -TaskName $taskName `
  -Action $action `
  -Trigger $trigger `
  -Settings $settings `
  -Description "Refreshes the Sipopedia Flavor Blog Daily Sip article from beverage industry sources when this user logs on." `
  -Force | Out-Null

Write-Host "Installed scheduled task: $taskName"
Write-Host "Runner: $runnerPath"
