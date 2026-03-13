[CmdletBinding()]
param(
  [switch]$SkipInstall
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Get-PackageManager {
  if (Test-Path "pnpm-lock.yaml") {
    return @{ Name = "pnpm"; Exec = "pnpm.cmd" }
  }
  if (Test-Path "yarn.lock") {
    return @{ Name = "yarn"; Exec = "yarn.cmd" }
  }
  if (Test-Path "package-lock.json") {
    return @{ Name = "npm"; Exec = "npm.cmd" }
  }
  return @{ Name = "npm"; Exec = "npm.cmd" }
}

function Get-PackageScripts {
  if (-not (Test-Path "package.json")) {
    throw "package.json not found in repo root."
  }
  $pkg = Get-Content "package.json" -Raw | ConvertFrom-Json
  $scripts = @{}
  if ($null -ne $pkg.scripts) {
    foreach ($p in $pkg.scripts.PSObject.Properties) {
      $scripts[$p.Name] = [string]$p.Value
    }
  }
  return @{
    Scripts = $scripts
    Package = $pkg
  }
}

function Invoke-ExternalCommand {
  param(
    [Parameter(Mandatory = $true)][string]$Executable,
    [Parameter(Mandatory = $true)][string[]]$Arguments
  )
  & $Executable @Arguments | Out-Host
  if ($null -eq $LASTEXITCODE) {
    return 0
  }
  return [int]$LASTEXITCODE
}

$results = New-Object System.Collections.Generic.List[object]

function Add-Result {
  param(
    [string]$Stage,
    [string]$Status,
    [string]$Command,
    [int]$ExitCode,
    [string]$Note
  )
  $results.Add([pscustomobject]@{
      Stage    = $Stage
      Status   = $Status
      Command  = $Command
      ExitCode = $ExitCode
      Note     = $Note
    }) | Out-Null
}

function Run-Stage {
  param(
    [string]$Stage,
    [string]$Executable,
    [string[]]$Arguments
  )
  $cmdText = "$Executable $($Arguments -join ' ')"
  Write-Host "==> [$Stage] $cmdText"
  $code = Invoke-ExternalCommand -Executable $Executable -Arguments $Arguments
  if ($code -eq 0) {
    Add-Result -Stage $Stage -Status "PASS" -Command $cmdText -ExitCode $code -Note ""
    return $true
  }
  Add-Result -Stage $Stage -Status "FAIL" -Command $cmdText -ExitCode $code -Note "Command failed."
  return $false
}

$pm = Get-PackageManager
$pkgInfo = Get-PackageScripts
$scripts = $pkgInfo.Scripts

$hasTypeScript = $false
if ($null -ne $pkgInfo.Package.devDependencies) {
  $tsDevProp = $pkgInfo.Package.devDependencies.PSObject.Properties["typescript"]
  if ($null -ne $tsDevProp) {
    $hasTypeScript = $true
  }
}
if (-not $hasTypeScript -and $null -ne $pkgInfo.Package.dependencies) {
  $tsDepProp = $pkgInfo.Package.dependencies.PSObject.Properties["typescript"]
  if ($null -ne $tsDepProp) {
    $hasTypeScript = $true
  }
}

$checksFailed = $false

# 1) Install dependencies if needed.
$installNeeded = -not (Test-Path "node_modules")
if ($SkipInstall) {
  Add-Result -Stage "install" -Status "SKIP" -Command "-" -ExitCode 0 -Note "Skipped by flag."
}
elseif (-not $installNeeded) {
  Add-Result -Stage "install" -Status "SKIP" -Command "-" -ExitCode 0 -Note "node_modules already present."
}
else {
  switch ($pm.Name) {
    "pnpm" { $ok = Run-Stage -Stage "install" -Executable $pm.Exec -Arguments @("install", "--frozen-lockfile") }
    "yarn" { $ok = Run-Stage -Stage "install" -Executable $pm.Exec -Arguments @("install", "--frozen-lockfile") }
    default {
      if (Test-Path "package-lock.json") {
        $ok = Run-Stage -Stage "install" -Executable $pm.Exec -Arguments @("ci")
      }
      else {
        $ok = Run-Stage -Stage "install" -Executable $pm.Exec -Arguments @("install")
      }
    }
  }
  if (-not $ok) {
    $checksFailed = $true
  }
}

# 2) lint
if ($scripts.ContainsKey("lint")) {
  $ok = Run-Stage -Stage "lint" -Executable $pm.Exec -Arguments @("run", "lint")
  if (-not $ok) { $checksFailed = $true }
}
else {
  Add-Result -Stage "lint" -Status "SKIP" -Command "-" -ExitCode 0 -Note "No lint script in package.json."
}

# 3) typecheck
if ($scripts.ContainsKey("typecheck")) {
  $ok = Run-Stage -Stage "typecheck" -Executable $pm.Exec -Arguments @("run", "typecheck")
  if (-not $ok) { $checksFailed = $true }
}
elseif ((Test-Path "tsconfig.json") -and $hasTypeScript) {
  $ok = Run-Stage -Stage "typecheck" -Executable "npx.cmd" -Arguments @("tsc", "--noEmit")
  if (-not $ok) { $checksFailed = $true }
}
else {
  Add-Result -Stage "typecheck" -Status "SKIP" -Command "-" -ExitCode 0 -Note "No typecheck script or TypeScript setup."
}

# 4) test
if ($scripts.ContainsKey("test")) {
  $ok = Run-Stage -Stage "test" -Executable $pm.Exec -Arguments @("run", "test")
  if (-not $ok) { $checksFailed = $true }
}
else {
  Add-Result -Stage "test" -Status "SKIP" -Command "-" -ExitCode 0 -Note "No test script in package.json."
}

# 5) build
if ($scripts.ContainsKey("build")) {
  $ok = Run-Stage -Stage "build" -Executable $pm.Exec -Arguments @("run", "build")
  if (-not $ok) { $checksFailed = $true }
}
else {
  Add-Result -Stage "build" -Status "SKIP" -Command "-" -ExitCode 0 -Note "No build script in package.json."
}

Write-Host ""
Write-Host "Validation summary:"
foreach ($r in $results) {
  $line = "{0,-10} {1,-5} {2}" -f $r.Stage, $r.Status, $r.Note
  Write-Host $line.TrimEnd()
}

if ($checksFailed) {
  exit 1
}
exit 0
