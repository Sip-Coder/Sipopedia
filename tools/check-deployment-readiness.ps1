param(
  [switch]$RunValidation,
  [switch]$RunSmoke,
  [switch]$SkipInstall
)

$ErrorActionPreference = "Continue"

$BootstrapGitEnv = "C:\codebase\tools\git-env.ps1"
if (Test-Path -LiteralPath $BootstrapGitEnv) {
  . $BootstrapGitEnv
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw "git is not on PATH. On the Windows VM, run: . C:\codebase\tools\git-env.ps1"
}

$repoRootRaw = git rev-parse --show-toplevel 2>$null
if ($LASTEXITCODE -ne 0 -or -not $repoRootRaw) {
  throw "Run this from inside the Sipopedia Git checkout."
}

$RepoRoot = [System.IO.Path]::GetFullPath($repoRootRaw.Trim())
Push-Location $RepoRoot

$failures = New-Object System.Collections.Generic.List[string]
$warnings = New-Object System.Collections.Generic.List[string]

function Add-Failure {
  param([string]$Message)
  $script:failures.Add($Message) | Out-Null
  Write-Host "FAIL: $Message"
}

function Add-WarningMessage {
  param([string]$Message)
  $script:warnings.Add($Message) | Out-Null
  Write-Host "WARN: $Message"
}

function Add-Pass {
  param([string]$Message)
  Write-Host "PASS: $Message"
}

function Test-RequiredFile {
  param([string]$RelativePath)
  if (Test-Path -LiteralPath (Join-Path $RepoRoot $RelativePath)) {
    Add-Pass "Found $RelativePath"
  } else {
    Add-Failure "Missing $RelativePath"
  }
}

function Get-CommandVersion {
  param([string]$Command, [string[]]$Arguments)
  $cmd = Get-Command $Command -ErrorAction SilentlyContinue
  if (-not $cmd) {
    Add-Failure "$Command is not on PATH"
    return
  }

  $version = & $cmd.Source @Arguments 2>$null | Select-Object -First 1
  Add-Pass "$Command available: $version"
}

function Invoke-NpmStep {
  param([string]$Label, [string[]]$Arguments)
  $npm = Get-Command npm.cmd -ErrorAction SilentlyContinue
  if (-not $npm) {
    $npm = Get-Command npm -ErrorAction SilentlyContinue
  }
  if (-not $npm) {
    Add-Failure "npm is not on PATH; cannot run $Label"
    return
  }

  Write-Host ""
  Write-Host "Running: npm $($Arguments -join ' ')"
  & $npm.Source @Arguments
  if ($LASTEXITCODE -eq 0) {
    Add-Pass "$Label passed"
  } else {
    Add-Failure "$Label failed with exit code $LASTEXITCODE"
  }
}

try {
  Write-Host "Sipopedia deployment readiness check"
  Write-Host "Repo: $RepoRoot"
  Write-Host "Branch: $((git branch --show-current 2>$null).Trim())"
  Write-Host "Origin: $((git remote get-url origin 2>$null).Trim())"
  Write-Host ""

  Get-CommandVersion -Command "git" -Arguments @("--version")
  Get-CommandVersion -Command "node" -Arguments @("--version")
  Get-CommandVersion -Command "npm" -Arguments @("--version")

  Test-RequiredFile "package.json"
  Test-RequiredFile "package-lock.json"
  Test-RequiredFile "vite.config.ts"
  Test-RequiredFile "index.html"
  Test-RequiredFile "src\main.tsx"
  Test-RequiredFile "src\App.tsx"
  Test-RequiredFile "scripts\smoke-routes.mjs"
  Test-RequiredFile "public"

  $packagePath = Join-Path $RepoRoot "package.json"
  if (Test-Path -LiteralPath $packagePath) {
    try {
      $package = Get-Content -LiteralPath $packagePath -Raw | ConvertFrom-Json
      $scriptNames = @($package.scripts.PSObject.Properties.Name)
      foreach ($requiredScript in @("build", "preview", "smoke:routes")) {
        if ($scriptNames -contains $requiredScript) {
          Add-Pass "package.json has npm script '$requiredScript'"
        } else {
          Add-Failure "package.json missing npm script '$requiredScript'"
        }
      }
    } catch {
      Add-Failure "package.json could not be parsed: $($_.Exception.Message)"
    }
  }

  $viteConfig = Join-Path $RepoRoot "vite.config.ts"
  if (Test-Path -LiteralPath $viteConfig) {
    $viteText = Get-Content -LiteralPath $viteConfig -Raw
    if ($viteText -match 'host:\s*"0\.0\.0\.0"') {
      Add-Pass "Vite server/preview binds to 0.0.0.0 for hosted environments"
    } else {
      Add-WarningMessage "Vite config does not obviously bind host to 0.0.0.0"
    }
    if ($viteText -match 'allowedHosts:\s*true') {
      Add-Pass "Vite allowedHosts is enabled for preview/proxy hosts"
    } else {
      Add-WarningMessage "Vite allowedHosts is not obviously enabled"
    }
  }

  $appPath = Join-Path $RepoRoot "src\App.tsx"
  if (Test-Path -LiteralPath $appPath) {
    $appText = Get-Content -LiteralPath $appPath -Raw
    if ($appText -match 'window\.location\.hash') {
      Add-Pass "App shell uses hash routing, suitable for static SPA hosting without rewrite rules"
    } else {
      Add-WarningMessage "App shell does not obviously use hash routing"
    }
  }

  $smokePath = Join-Path $RepoRoot "scripts\smoke-routes.mjs"
  if (Test-Path -LiteralPath $smokePath) {
    $smokeText = Get-Content -LiteralPath $smokePath -Raw
    $routeMatches = [regex]::Matches($smokeText, '"/#[^"]+"')
    if ($routeMatches.Count -gt 0) {
      Add-Pass "Route smoke harness has $($routeMatches.Count) hash routes"
    } else {
      Add-WarningMessage "Route smoke harness did not expose hash routes in the expected literal format"
    }
  }

  $readmePath = Join-Path $RepoRoot "README.md"
  if (Test-Path -LiteralPath $readmePath) {
    $readmeText = Get-Content -LiteralPath $readmePath -Raw
    if ($readmeText -match 'Replit' -and $readmeText -match 'VITE_APP_URL') {
      Add-Pass "README documents Replit/VITE_APP_URL deployment caveat"
    } else {
      Add-WarningMessage "README does not clearly document Replit and VITE_APP_URL together"
    }
  }

  $envPath = Join-Path $RepoRoot ".env"
  $isReplit = [bool]($env:REPL_ID -or $env:REPLIT_DEV_DOMAIN -or $env:REPL_SLUG)
  if (Test-Path -LiteralPath $envPath) {
    $envText = Get-Content -LiteralPath $envPath -Raw
    $viteAppUrlLine = ($envText -split "`r?`n") | Where-Object { $_ -match '^\s*VITE_APP_URL\s*=' } | Select-Object -First 1
    if ($viteAppUrlLine) {
      $viteAppUrl = ($viteAppUrlLine -replace '^\s*VITE_APP_URL\s*=\s*', '').Trim().Trim('"').Trim("'")
      if ($isReplit -and $viteAppUrl -match '^https?://(localhost|127\.0\.0\.1)') {
        Add-Failure "Replit environment must not set VITE_APP_URL to localhost"
      } elseif ($viteAppUrl) {
        Add-Pass "VITE_APP_URL is set in .env"
      } else {
        Add-WarningMessage "VITE_APP_URL is blank in .env"
      }
    } else {
      Add-WarningMessage ".env exists but VITE_APP_URL is not set"
    }
  } else {
    Add-WarningMessage ".env not found; expected for Supabase-backed deployed features"
  }

  if ($env:REPLIT_DEV_DOMAIN) {
    Add-Pass "Detected Replit dev domain: $env:REPLIT_DEV_DOMAIN"
  } elseif ($env:REPL_SLUG -and $env:REPL_OWNER) {
    Add-Pass "Detected Replit slug/owner: $env:REPL_OWNER/$env:REPL_SLUG"
  } else {
    Add-WarningMessage "No Replit environment variables detected; running local/VM readiness only"
  }

  if ($RunValidation) {
    if (-not $SkipInstall) {
      Invoke-NpmStep -Label "npm ci" -Arguments @("ci")
    }
    Invoke-NpmStep -Label "npm run build" -Arguments @("run", "build")
    Invoke-NpmStep -Label "npm audit --audit-level=moderate" -Arguments @("audit", "--audit-level=moderate")
    if ($RunSmoke) {
      Invoke-NpmStep -Label "npm run smoke:routes" -Arguments @("run", "smoke:routes")
    }
  } else {
    Add-WarningMessage "Validation commands skipped. Re-run with -RunValidation and optionally -RunSmoke before release."
  }

  Write-Host ""
  Write-Host "Readiness summary: $($failures.Count) failure(s), $($warnings.Count) warning(s)"
  if ($warnings.Count -gt 0) {
    Write-Host "Warnings:"
    $warnings | ForEach-Object { Write-Host "- $_" }
  }
  if ($failures.Count -gt 0) {
    Write-Host "Failures:"
    $failures | ForEach-Object { Write-Host "- $_" }
    exit 1
  }

  exit 0
} finally {
  Pop-Location
}
