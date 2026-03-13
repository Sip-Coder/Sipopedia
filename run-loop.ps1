[CmdletBinding()]
param(
  [int]$MaxIterations = 5,
  [switch]$NoPrompt,
  [switch]$NoCommit
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$args = @("-MaxIterations", [string]$MaxIterations)
if ($NoPrompt) { $args += "-NoPrompt" }
if ($NoCommit) { $args += "-NoCommit" }

& powershell -NoProfile -ExecutionPolicy Bypass -File ".\control\run-program.ps1" @args
exit $LASTEXITCODE
