$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$logDir = Join-Path $repoRoot "review\daily-sip"
New-Item -ItemType Directory -Force -Path $logDir | Out-Null

$stamp = Get-Date -Format "yyyy-MM-dd-HHmmss"
$logPath = Join-Path $logDir "daily-sip-startup-$stamp.log"

Set-Location $repoRoot
"[$(Get-Date -Format o)] Starting Daily Sip refresh in $repoRoot" | Tee-Object -FilePath $logPath -Append
$env:DAILY_SIP_EDITORIAL_STANDARD = "daily-sip-avant-garde-v2-2026-05"
"[$(Get-Date -Format o)] Daily Sip editorial standard: $env:DAILY_SIP_EDITORIAL_STANDARD" | Tee-Object -FilePath $logPath -Append

& node ".\scripts\generate-daily-sip.mjs" *>&1 | Tee-Object -FilePath $logPath -Append
$exitCode = $LASTEXITCODE

if ($exitCode -eq 0) {
  & node ".\scripts\generate-daily-sip-header.mjs" *>&1 | Tee-Object -FilePath $logPath -Append
  $exitCode = $LASTEXITCODE
  if ($exitCode -eq 2) {
    & powershell.exe -ExecutionPolicy Bypass -File ".\scripts\generate-daily-sip-header-codex.ps1" *>&1 | Tee-Object -FilePath $logPath -Append
    $exitCode = $LASTEXITCODE
  }
}

"[$(Get-Date -Format o)] Daily Sip refresh exited with code $exitCode" | Tee-Object -FilePath $logPath -Append
exit $exitCode
