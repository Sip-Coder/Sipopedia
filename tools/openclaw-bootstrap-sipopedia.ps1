param(
  [string]$BaseDir = "C:\codebase",
  [string]$WorkspaceName = "sipopedia-openclaw",
  [string]$RepoUrl = "https://github.com/Sip-Coder/Sipopedia.git"
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

function Get-GitHubReleaseAsset {
  param(
    [string]$Repo,
    [string]$AssetPattern,
    [string]$RejectPattern = ""
  )

  $release = Invoke-RestMethod -Uri "https://api.github.com/repos/$Repo/releases/latest" -Headers @{ "User-Agent" = "sipopedia-openclaw-bootstrap" }
  $assets = $release.assets | Where-Object { $_.name -match $AssetPattern }
  if ($RejectPattern) {
    $assets = $assets | Where-Object { $_.name -notmatch $RejectPattern }
  }
  $asset = $assets | Select-Object -First 1
  if (-not $asset) {
    throw "Could not find release asset matching $AssetPattern for $Repo"
  }
  return $asset
}

function Enable-PortableGit {
  param([string]$RootDir)

  $toolsDir = Join-Path $RootDir "tools"
  $gitDir = Join-Path $toolsDir "mingit"
  $gitExe = Join-Path $gitDir "cmd\git.exe"
  $gitLfsExe = Join-Path $gitDir "cmd\git-lfs.exe"

  New-Item -ItemType Directory -Path $toolsDir -Force | Out-Null

  if (-not (Test-Path -LiteralPath $gitExe) -or -not (Test-Path -LiteralPath $gitLfsExe)) {
    if (Test-Path -LiteralPath $gitDir) {
      throw "Partial portable Git install found at $gitDir. Remove it or install Git/LFS manually before rerunning."
    }

    $workDir = Join-Path $toolsDir (".install-git-" + [guid]::NewGuid().ToString("N"))
    New-Item -ItemType Directory -Path $workDir | Out-Null

    try {
      $gitAsset = Get-GitHubReleaseAsset -Repo "git-for-windows/git" -AssetPattern "^MinGit-.*64-bit\.zip$" -RejectPattern "busybox"
      $lfsAsset = Get-GitHubReleaseAsset -Repo "git-lfs/git-lfs" -AssetPattern "^git-lfs-windows-amd64-v.*\.zip$"

      $gitZip = Join-Path $workDir $gitAsset.name
      $lfsZip = Join-Path $workDir $lfsAsset.name
      $lfsDir = Join-Path $toolsDir "git-lfs"

      Invoke-WebRequest -Uri $gitAsset.browser_download_url -OutFile $gitZip -Headers @{ "User-Agent" = "sipopedia-openclaw-bootstrap" }
      Invoke-WebRequest -Uri $lfsAsset.browser_download_url -OutFile $lfsZip -Headers @{ "User-Agent" = "sipopedia-openclaw-bootstrap" }

      New-Item -ItemType Directory -Path $gitDir | Out-Null
      New-Item -ItemType Directory -Path $lfsDir -Force | Out-Null
      Expand-Archive -LiteralPath $gitZip -DestinationPath $gitDir
      Expand-Archive -LiteralPath $lfsZip -DestinationPath $lfsDir -Force

      $extractedLfs = Get-ChildItem -LiteralPath $lfsDir -Recurse -Filter "git-lfs.exe" | Select-Object -First 1
      if (-not $extractedLfs) {
        throw "Could not find git-lfs.exe after extracting Git LFS."
      }
      Copy-Item -LiteralPath $extractedLfs.FullName -Destination $gitLfsExe
    } finally {
      if (Test-Path -LiteralPath $workDir) {
        Remove-Item -LiteralPath $workDir -Recurse -Force
      }
    }
  }

  $env:Path = (Join-Path $gitDir "cmd") + ";" + (Join-Path $gitDir "mingw64\bin") + ";" + $env:Path
  return $gitExe
}

function Enable-PortableGitHubCli {
  param([string]$RootDir)

  $toolsDir = Join-Path $RootDir "tools"
  $ghDir = Join-Path $toolsDir "gh"
  $ghBin = Join-Path $ghDir "bin"
  $ghExe = Join-Path $ghBin "gh.exe"

  New-Item -ItemType Directory -Path $toolsDir -Force | Out-Null

  if (-not (Test-Path -LiteralPath $ghExe)) {
    $workDir = Join-Path $toolsDir (".install-gh-" + [guid]::NewGuid().ToString("N"))
    New-Item -ItemType Directory -Path $workDir | Out-Null

    try {
      $ghAsset = Get-GitHubReleaseAsset -Repo "cli/cli" -AssetPattern "^gh_.*_windows_amd64\.zip$"
      $ghZip = Join-Path $workDir $ghAsset.name
      $extractDir = Join-Path $workDir "extract"

      Invoke-WebRequest -Uri $ghAsset.browser_download_url -OutFile $ghZip -Headers @{ "User-Agent" = "sipopedia-openclaw-bootstrap" }
      New-Item -ItemType Directory -Path $extractDir -Force | Out-Null
      Expand-Archive -LiteralPath $ghZip -DestinationPath $extractDir -Force

      $extractedGh = Get-ChildItem -LiteralPath $extractDir -Recurse -Filter "gh.exe" | Select-Object -First 1
      if (-not $extractedGh) {
        throw "Could not find gh.exe after extracting GitHub CLI."
      }

      New-Item -ItemType Directory -Path $ghBin -Force | Out-Null
      Copy-Item -LiteralPath $extractedGh.FullName -Destination $ghExe -Force
    } finally {
      if (Test-Path -LiteralPath $workDir) {
        Remove-Item -LiteralPath $workDir -Recurse -Force
      }
    }
  }

  $env:Path = $ghBin + ";" + $env:Path
  return $ghExe
}

function Write-TeamHelperScripts {
  param([string]$RootDir)

  $toolsDir = Join-Path $RootDir "tools"
  $gitEnvPs1 = Join-Path $toolsDir "git-env.ps1"
  $gitEnvCmd = Join-Path $toolsDir "git-env.cmd"
  $statusScript = Join-Path $toolsDir "sipopedia-team-status.ps1"

  @'
$GitRoot = Join-Path $PSScriptRoot "mingit"
$GitCmd = Join-Path $GitRoot "cmd"
$GitBin = Join-Path $GitRoot "mingw64\bin"
$GhBin = Join-Path $PSScriptRoot "gh\bin"

if (-not (Test-Path -LiteralPath (Join-Path $GitCmd "git.exe"))) {
  throw "Portable Git was not found at $GitCmd"
}

$paths = @($GitCmd, $GitBin)
if (Test-Path -LiteralPath (Join-Path $GhBin "gh.exe")) {
  $paths += $GhBin
}

$env:Path = ($paths + $env:Path) -join ";"
Write-Host "Portable Git tooling enabled for this PowerShell session:"
git --version
git lfs version
if (Get-Command gh -ErrorAction SilentlyContinue) {
  gh --version | Select-Object -First 1
}
'@ | Set-Content -LiteralPath $gitEnvPs1 -Encoding ASCII

  @'
@echo off
set "GIT_ROOT=%~dp0mingit"
set "GH_BIN=%~dp0gh\bin"
if exist "%GH_BIN%\gh.exe" (
  set "PATH=%GIT_ROOT%\cmd;%GIT_ROOT%\mingw64\bin;%GH_BIN%;%PATH%"
) else (
  set "PATH=%GIT_ROOT%\cmd;%GIT_ROOT%\mingw64\bin;%PATH%"
)
echo Portable Git tooling enabled for this cmd.exe session:
git --version
git lfs version
where gh >nul 2>nul && gh --version
'@ | Set-Content -LiteralPath $gitEnvCmd -Encoding ASCII

  @'
$ErrorActionPreference = "Continue"

$ToolRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
. (Join-Path $ToolRoot "git-env.ps1")

$worktrees = @(
  @{ Name = "main/reference"; Path = "C:\codebase\sipopedia" },
  @{ Name = "codex"; Path = "C:\codebase\sipopedia-codex" },
  @{ Name = "openclaw"; Path = "C:\codebase\sipopedia-openclaw" }
)

Write-Host ""
Write-Host "GitHub CLI auth:"
$authStatus = gh auth status 2>&1
if ($LASTEXITCODE -eq 0) {
  $authStatus | ForEach-Object { Write-Host $_ }
} else {
  Write-Host "Not logged in. Run gh auth login from an interactive shell."
}

Write-Host ""
Write-Host "Team control:"
Write-Host "  C:\codebase\tools\sipopedia-control.ps1 -Mode Status"
Write-Host "  C:\codebase\tools\sipopedia-control.ps1 -Mode Next"
Write-Host "  C:\codebase\tools\sipopedia-control.ps1 -Mode Auth"
Write-Host "  C:\codebase\tools\sipopedia-control.ps1 -Mode Ping -To OpenClaw -From Codex -Summary ""<message>"""

foreach ($worktree in $worktrees) {
  Write-Host ""
  Write-Host ("== {0}: {1} ==" -f $worktree.Name, $worktree.Path)
  if (-not (Test-Path -LiteralPath $worktree.Path)) {
    Write-Host "Missing"
    continue
  }

  git -C $worktree.Path status --short --branch
  git -C $worktree.Path lfs status
}
'@ | Set-Content -LiteralPath $statusScript -Encoding ASCII
}

$root = [System.IO.Path]::GetFullPath($BaseDir)
New-Item -ItemType Directory -Path $root -Force | Out-Null

$git = Enable-PortableGit -RootDir $root
$gh = Enable-PortableGitHubCli -RootDir $root
Write-TeamHelperScripts -RootDir $root
$repoPath = Join-Path $root $WorkspaceName

Write-Host "Using base directory: $root"
& $git --version
& $git lfs version
& $gh --version

if (-not (Test-Path -LiteralPath $repoPath)) {
  & $git clone $RepoUrl $repoPath
  if ($LASTEXITCODE -ne 0) { throw "git clone failed with exit code $LASTEXITCODE" }
}

& $git -C $repoPath fetch origin --prune
if ($LASTEXITCODE -ne 0) { throw "git fetch failed with exit code $LASTEXITCODE" }

$branches = & $git -C $repoPath branch --list "work/openclaw"
$remoteBranch = & $git -C $repoPath branch -r --list "origin/work/openclaw"
if ($branches) {
  & $git -C $repoPath switch "work/openclaw"
} elseif ($remoteBranch) {
  & $git -C $repoPath switch --track -c "work/openclaw" "origin/work/openclaw"
} else {
  & $git -C $repoPath switch -c "work/openclaw" origin/main
}
if ($LASTEXITCODE -ne 0) { throw "could not switch to work/openclaw" }

if ($remoteBranch) {
  & $git -C $repoPath branch --set-upstream-to "origin/work/openclaw" "work/openclaw"
  if ($LASTEXITCODE -ne 0) { throw "could not set upstream to origin/work/openclaw" }
}

& $git -C $repoPath lfs install --local
if ($LASTEXITCODE -ne 0) { throw "git lfs install failed with exit code $LASTEXITCODE" }

& $git -C $repoPath lfs pull
if ($LASTEXITCODE -ne 0) { throw "git lfs pull failed with exit code $LASTEXITCODE" }

& $git -C $repoPath config push.default current
if ($LASTEXITCODE -ne 0) { throw "could not set push.default=current" }

Write-Host ""
Write-Host "Sipopedia OpenClaw workspace is ready:"
Write-Host $repoPath
& $git -C $repoPath status --short --branch
& $git -C $repoPath remote -v
Write-Host ""
Write-Host "Team status helper:"
Write-Host (Join-Path $root "tools\sipopedia-team-status.ps1")
