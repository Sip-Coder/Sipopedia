[CmdletBinding()]
param(
  [switch]$SkipInstall
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$args = @()
if ($SkipInstall) {
  $args += "-SkipInstall"
}

& powershell -NoProfile -ExecutionPolicy Bypass -File ".\validators\validate-website.ps1" @args
exit $LASTEXITCODE
