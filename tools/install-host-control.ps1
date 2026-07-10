param(
  [string]$TargetPath = "C:\codebase\tools\sipopedia-control.ps1",
  [string]$TelegramTargetPath = "C:\codebase\tools\sipopedia-telegram-ping.ps1",
  [switch]$Check
)

$ErrorActionPreference = "Stop"

function Normalize-Content {
  param([string]$Value)
  return ($Value -replace "`r`n", "`n").TrimEnd("`n")
}

$templates = @(
  @{
    Label = "Host control wrapper"
    Source = Join-Path $PSScriptRoot "host-sipopedia-control.ps1"
    Target = $TargetPath
  },
  @{
    Label = "Telegram ping helper"
    Source = Join-Path $PSScriptRoot "host-sipopedia-telegram-ping.ps1"
    Target = $TelegramTargetPath
  }
)

$hasMismatch = $false

foreach ($template in $templates) {
  if (-not (Test-Path -LiteralPath $template.Source)) {
    throw ("Missing template for {0}: {1}" -f $template.Label, $template.Source)
  }

  $targetDir = Split-Path -Parent $template.Target
  if (-not (Test-Path -LiteralPath $targetDir)) {
    if ($Check) {
      Write-Host ("Missing target directory for {0}: {1}" -f $template.Label, $targetDir)
      $hasMismatch = $true
      continue
    }
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
  }

  $expected = Get-Content -LiteralPath $template.Source -Raw
  $exists = Test-Path -LiteralPath $template.Target
  if ($exists) {
    $current = Get-Content -LiteralPath $template.Target -Raw
    if ((Normalize-Content $current) -eq (Normalize-Content $expected)) {
      Write-Host ("{0} is current: {1}" -f $template.Label, $template.Target)
      continue
    }

    if ($Check) {
      Write-Host ("{0} differs: {1}" -f $template.Label, $template.Target)
      $hasMismatch = $true
      continue
    }
  } elseif ($Check) {
    Write-Host ("{0} is missing: {1}" -f $template.Label, $template.Target)
    $hasMismatch = $true
    continue
  }

  Set-Content -LiteralPath $template.Target -Value $expected -Encoding UTF8
  Write-Host ("Installed {0}: {1}" -f $template.Label, $template.Target)
}

if ($Check -and $hasMismatch) {
  exit 2
}
