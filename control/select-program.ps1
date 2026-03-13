[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [ValidateSet("website", "terminology")]
  [string]$Program
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$map = @{
  website     = "programs/program.website.md"
  terminology = "programs/program.terminology.md"
}

$target = $map[$Program]
if (-not (Test-Path $target)) {
  throw "Target program file not found: $target"
}

$activePath = "control/active-program.txt"
Set-Content -Path $activePath -Value $target -Encoding UTF8
Write-Host "Active program set to: $target"
