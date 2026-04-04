[CmdletBinding()]
param(
  [string]$Letters = "",
  [int]$BatchPerLetter = 2,
  [int]$Target = 100,
  [int]$Iterations = 1,
  [string]$BeverageTypes = "",
  [switch]$DryRun
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

if ($Iterations -lt 1) {
  throw "Iterations must be >= 1."
}

function Import-EnvFile {
  param([string]$Path)
  if (-not (Test-Path $Path)) { return }

  Get-Content -Path $Path | ForEach-Object {
    $line = $_.Trim()
    if (-not $line -or $line.StartsWith("#")) { return }
    $match = [regex]::Match($line, '^(?:\$env:)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*"?(.+?)"?$')
    if (-not $match.Success) { return }
    [Environment]::SetEnvironmentVariable($match.Groups[1].Value, $match.Groups[2].Value, "Process")
  }
}

Import-EnvFile "local-secrets/.env"
Import-EnvFile "local-secrets/.env.example"

for ($i = 1; $i -le $Iterations; $i++) {
  Write-Host ("[ralph-loop] iteration {0}/{1}" -f $i, $Iterations)

  $args = @(
    "scripts/start-terms.js",
    "--batch-per-letter", $BatchPerLetter,
    "--target", $Target
  )

  if ($Letters.Trim()) {
    $args += @("--letters", $Letters.Trim())
  }

  if ($BeverageTypes.Trim()) {
    $args += @("--beverage-types", $BeverageTypes.Trim())
  }

  if ($DryRun) {
    $args += "--dry-run"
  }

  & node @args
  if ($LASTEXITCODE -ne 0) {
    throw "start-terms failed on iteration $i."
  }
}

Write-Host "[ralph-loop] completed"
