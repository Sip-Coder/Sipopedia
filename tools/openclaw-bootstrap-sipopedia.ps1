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

$root = [System.IO.Path]::GetFullPath($BaseDir)
New-Item -ItemType Directory -Path $root -Force | Out-Null

$git = Enable-PortableGit -RootDir $root
$repoPath = Join-Path $root $WorkspaceName

Write-Host "Using base directory: $root"
& $git --version
& $git lfs version

if (-not (Test-Path -LiteralPath $repoPath)) {
  & $git clone $RepoUrl $repoPath
  if ($LASTEXITCODE -ne 0) { throw "git clone failed with exit code $LASTEXITCODE" }
}

& $git -C $repoPath fetch origin --prune
if ($LASTEXITCODE -ne 0) { throw "git fetch failed with exit code $LASTEXITCODE" }

$branches = & $git -C $repoPath branch --list "work/openclaw"
if ($branches) {
  & $git -C $repoPath switch "work/openclaw"
} else {
  & $git -C $repoPath switch -c "work/openclaw" origin/main
}
if ($LASTEXITCODE -ne 0) { throw "could not switch to work/openclaw" }

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
