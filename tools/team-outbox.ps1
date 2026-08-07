param(
  [ValidateSet("List", "Show", "Post", "Remove")]
  [string]$Mode = "List",
  [string]$Path = "",
  [switch]$All
)

$ErrorActionPreference = "Stop"

$Root = "C:\codebase"
$OutboxRoot = Join-Path $Root "team-outbox"
$SentRoot = Join-Path $OutboxRoot "sent"
$RepoName = "Sip-Coder/Sipopedia"
$GitEnv = Join-Path $Root "tools\git-env.ps1"
if (Test-Path -LiteralPath $GitEnv) {
  . $GitEnv
}

function Get-OutboxFiles {
  if (-not (Test-Path -LiteralPath $OutboxRoot)) {
    return @()
  }

  return @(Get-ChildItem -LiteralPath $OutboxRoot -Filter "*.md" -File | Sort-Object LastWriteTimeUtc)
}

function Resolve-OutboxPath {
  param([string]$InputPath)

  if (-not $InputPath) {
    throw "Pass -Path for Mode $Mode, or use -All with Mode Post."
  }

  if (Test-Path -LiteralPath $InputPath) {
    return (Resolve-Path -LiteralPath $InputPath).Path
  }

  $candidate = Join-Path $OutboxRoot $InputPath
  if (Test-Path -LiteralPath $candidate) {
    return (Resolve-Path -LiteralPath $candidate).Path
  }

  throw "Outbox message not found: $InputPath"
}

function Get-OutboxMetadata {
  param([string]$FilePath)

  $metadata = [ordered]@{}
  $lines = Get-Content -LiteralPath $FilePath
  if ($lines.Count -lt 3 -or $lines[0] -ne "---") {
    return $metadata
  }

  for ($i = 1; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -eq "---") {
      break
    }
    $parts = $lines[$i] -split ":", 2
    if ($parts.Count -eq 2) {
      $metadata[$parts[0].Trim()] = $parts[1].Trim()
    }
  }

  return $metadata
}

function Get-OutboxBody {
  param([string]$FilePath)

  $raw = Get-Content -LiteralPath $FilePath -Raw
  $parts = $raw -split "(?m)^---\s*$", 3
  if ($parts.Count -ge 3) {
    return $parts[2].TrimStart("`r", "`n")
  }
  return $raw
}

function Write-OutboxList {
  $files = Get-OutboxFiles
  Write-Host ("Outbox: {0}" -f $OutboxRoot)
  if ($files.Count -eq 0) {
    Write-Host "No queued messages."
    return
  }

  foreach ($file in $files) {
    $metadata = Get-OutboxMetadata -FilePath $file.FullName
    $type = if ($metadata.type) { $metadata.type } else { "unknown" }
    $pr = if ($metadata.pr) { $metadata.pr } else { "?" }
    $target = if ($metadata.target) { $metadata.target } else { "?" }
    $created = if ($metadata.created_at) { $metadata.created_at } else { $file.LastWriteTimeUtc.ToString("yyyy-MM-ddTHH:mm:ssZ") }
    Write-Host ("- {0} | type={1} pr={2} target={3} created={4}" -f $file.Name, $type, $pr, $target, $created)
  }
}

function Invoke-OutboxPost {
  param([string]$FilePath)

  if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    throw "gh is not on PATH. Run . C:\codebase\tools\git-env.ps1 first."
  }

  $authStatus = gh auth status 2>&1
  if ($LASTEXITCODE -ne 0) {
    throw "GitHub CLI is not authenticated. Run gh auth login from an interactive shell."
  }

  $metadata = Get-OutboxMetadata -FilePath $FilePath
  if (-not $metadata.pr) {
    throw "Missing pr metadata in $FilePath"
  }

  $body = Get-OutboxBody -FilePath $FilePath
  $temp = New-TemporaryFile
  try {
    Set-Content -LiteralPath $temp.FullName -Value $body -Encoding UTF8
    gh pr comment $metadata.pr --repo $RepoName --body-file $temp.FullName
    if ($LASTEXITCODE -ne 0) {
      throw "gh pr comment failed for $FilePath"
    }
  } finally {
    if (Test-Path -LiteralPath $temp.FullName) {
      Remove-Item -LiteralPath $temp.FullName -Force
    }
  }

  New-Item -ItemType Directory -Path $SentRoot -Force | Out-Null
  $destination = Join-Path $SentRoot (Split-Path -Leaf $FilePath)
  Move-Item -LiteralPath $FilePath -Destination $destination -Force
  Write-Host ("Posted and archived: {0}" -f $destination)
}

switch ($Mode) {
  "List" {
    Write-OutboxList
  }
  "Show" {
    $messagePath = Resolve-OutboxPath -InputPath $Path
    Get-Content -LiteralPath $messagePath
  }
  "Post" {
    if ($All) {
      $files = Get-OutboxFiles
      if ($files.Count -eq 0) {
        Write-Host "No queued messages."
        return
      }
      foreach ($file in $files) {
        Invoke-OutboxPost -FilePath $file.FullName
      }
    } else {
      $messagePath = Resolve-OutboxPath -InputPath $Path
      Invoke-OutboxPost -FilePath $messagePath
    }
  }
  "Remove" {
    $messagePath = Resolve-OutboxPath -InputPath $Path
    Remove-Item -LiteralPath $messagePath -Force
    Write-Host ("Removed queued message: {0}" -f $messagePath)
  }
}
