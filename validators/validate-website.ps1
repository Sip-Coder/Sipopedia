[CmdletBinding()]
param(
  [switch]$SkipInstall
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Get-PackageManager {
  if (Test-Path "pnpm-lock.yaml") { return @{ Name = "pnpm"; Exec = "pnpm.cmd" } }
  if (Test-Path "yarn.lock") { return @{ Name = "yarn"; Exec = "yarn.cmd" } }
  if (Test-Path "package-lock.json") { return @{ Name = "npm"; Exec = "npm.cmd" } }
  return @{ Name = "npm"; Exec = "npm.cmd" }
}

function Get-PackageScripts {
  if (-not (Test-Path "package.json")) {
    throw "package.json not found."
  }
  $pkg = Get-Content "package.json" -Raw | ConvertFrom-Json
  $scripts = @{}
  if ($null -ne $pkg.scripts) {
    foreach ($p in $pkg.scripts.PSObject.Properties) {
      $scripts[$p.Name] = [string]$p.Value
    }
  }
  return @{
    Package = $pkg
    Scripts = $scripts
  }
}

function Invoke-External {
  param(
    [string]$Exe,
    [string[]]$ArgumentList
  )
  & $Exe @ArgumentList | Out-Host
  if ($null -eq $LASTEXITCODE) { return 0 }
  return [int]$LASTEXITCODE
}

function Has-TypeScriptDependency {
  param($PackageObject)
  if ($null -ne $PackageObject.devDependencies) {
    if ($null -ne $PackageObject.devDependencies.PSObject.Properties["typescript"]) { return $true }
  }
  if ($null -ne $PackageObject.dependencies) {
    if ($null -ne $PackageObject.dependencies.PSObject.Properties["typescript"]) { return $true }
  }
  return $false
}

$results = New-Object System.Collections.Generic.List[object]
function Add-Result {
  param([string]$Stage, [string]$Status, [string]$Note)
  $results.Add([pscustomobject]@{ Stage = $Stage; Status = $Status; Note = $Note }) | Out-Null
}

function Run-Stage {
  param([string]$Stage, [string]$Exe, [string[]]$ArgumentList)
  Write-Host "==> [$Stage] $Exe $($ArgumentList -join ' ')"
  $code = Invoke-External -Exe $Exe -ArgumentList $ArgumentList
  if ($code -eq 0) {
    Add-Result -Stage $Stage -Status "PASS" -Note ""
    return $true
  }
  Add-Result -Stage $Stage -Status "FAIL" -Note "Exit $code"
  return $false
}

$pm = Get-PackageManager
$pkgInfo = Get-PackageScripts
$scripts = $pkgInfo.Scripts
$hasTypeScript = Has-TypeScriptDependency -PackageObject $pkgInfo.Package
$failed = $false

# Install dependencies if needed.
if ($SkipInstall) {
  Add-Result -Stage "install" -Status "SKIP" -Note "Skipped by flag."
}
elseif (Test-Path "node_modules") {
  Add-Result -Stage "install" -Status "SKIP" -Note "node_modules present."
}
else {
  switch ($pm.Name) {
    "pnpm" { $ok = Run-Stage -Stage "install" -Exe $pm.Exec -ArgumentList @("install", "--frozen-lockfile") }
    "yarn" { $ok = Run-Stage -Stage "install" -Exe $pm.Exec -ArgumentList @("install", "--frozen-lockfile") }
    default {
      if (Test-Path "package-lock.json") { $ok = Run-Stage -Stage "install" -Exe $pm.Exec -ArgumentList @("ci") }
      else { $ok = Run-Stage -Stage "install" -Exe $pm.Exec -ArgumentList @("install") }
    }
  }
  if (-not $ok) { $failed = $true }
}

# 1. lint
if ($scripts.ContainsKey("lint")) {
  if (-not (Run-Stage -Stage "lint" -Exe $pm.Exec -ArgumentList @("run", "lint"))) { $failed = $true }
}
else {
  Add-Result -Stage "lint" -Status "SKIP" -Note "No lint script."
}

# 2. typecheck
if ($scripts.ContainsKey("typecheck")) {
  if (-not (Run-Stage -Stage "typecheck" -Exe $pm.Exec -ArgumentList @("run", "typecheck"))) { $failed = $true }
}
elseif ((Test-Path "tsconfig.json") -and $hasTypeScript) {
  if (-not (Run-Stage -Stage "typecheck" -Exe "npx.cmd" -ArgumentList @("tsc", "--noEmit"))) { $failed = $true }
}
else {
  Add-Result -Stage "typecheck" -Status "SKIP" -Note "No typecheck script/setup."
}

# 3. test
if ($scripts.ContainsKey("test")) {
  if (-not (Run-Stage -Stage "test" -Exe $pm.Exec -ArgumentList @("run", "test"))) { $failed = $true }
}
else {
  Add-Result -Stage "test" -Status "SKIP" -Note "No test script."
}

# 4. build
if ($scripts.ContainsKey("build")) {
  if (-not (Run-Stage -Stage "build" -Exe $pm.Exec -ArgumentList @("run", "build"))) { $failed = $true }
}
else {
  Add-Result -Stage "build" -Status "SKIP" -Note "No build script."
}

Write-Host ""
Write-Host "Website validation summary:"
foreach ($r in $results) {
  $line = "{0,-10} {1,-5} {2}" -f $r.Stage, $r.Status, $r.Note
  Write-Host $line.TrimEnd()
}

if ($failed) { exit 1 }
exit 0
