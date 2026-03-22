[CmdletBinding()]
param(
  [int]$MaxIterations = 5,
  [switch]$NoPrompt,
  [switch]$NoCommit
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

if ($MaxIterations -lt 1) {
  throw "MaxIterations must be >= 1."
}

function Assert-GitRepo {
  git rev-parse --is-inside-work-tree 1>$null 2>$null
  if ($LASTEXITCODE -ne 0) {
    throw "Not a git repository. Run from repo root."
  }
}

function Get-ActiveProgramPath {
  $activeFile = "control/active-program.txt"
  if (-not (Test-Path $activeFile)) {
    throw "Missing $activeFile"
  }
  $path = (Get-Content $activeFile -Raw).Trim()
  if ([string]::IsNullOrWhiteSpace($path)) {
    throw "Active program path is empty in $activeFile"
  }
  if (-not (Test-Path $path)) {
    throw "Active program not found: $path"
  }
  return $path
}

function Get-MissionFromPath {
  param([string]$ProgramPath)
  $leaf = [System.IO.Path]::GetFileName($ProgramPath).ToLowerInvariant()
  if ($leaf -like "*website*") { return "website" }
  if ($leaf -like "*terminology*") { return "terminology" }
  throw "Cannot infer mission from active program path: $ProgramPath"
}

function Get-ValidatorPath {
  param([string]$Mission)
  switch ($Mission) {
    "website" { return "validators/validate-website.ps1" }
    "terminology" { return "validators/validate-terminology.ps1" }
    default { throw "Unsupported mission: $Mission" }
  }
}

function Get-ChangedFiles {
  $status = git status --porcelain
  if (-not $status) {
    return @()
  }
  $files = @()
  foreach ($line in $status) {
    if ($line.Length -lt 4) { continue }
    $path = $line.Substring(3).Trim()
    if ($path.Contains(" -> ")) {
      $path = ($path.Split(" -> ")[-1]).Trim()
    }
    $norm = $path.Replace("\", "/")
    if ($norm -match "^logs/") { continue }
    if ($norm -eq "control/active-program.txt") { continue }
    $files += $path
  }
  return @($files | Sort-Object -Unique)
}

function Get-BlockingDirtyLines {
  $status = git status --porcelain
  if (-not $status) {
    return @()
  }
  $blocking = @()
  foreach ($line in $status) {
    if ($line.Length -lt 4) { continue }
    $path = $line.Substring(3).Trim()
    if ($path.Contains(" -> ")) {
      $path = ($path.Split(" -> ")[-1]).Trim()
    }
    $norm = $path.Replace("\", "/")
    if ($norm -match "^logs/") { continue }
    if ($norm -eq "control/active-program.txt") { continue }
    $blocking += $line
  }
  return @($blocking)
}

function Write-IterationLog {
  param(
    [int]$Iteration,
    [datetime]$Timestamp,
    [string]$ActiveProgram,
    [string]$Hypothesis,
    [string[]]$FilesChanged,
    [string[]]$CommandsRun,
    [string]$ValidationResult,
    [string]$KeptOrReverted,
    [string]$NextIdea
  )
  if (-not (Test-Path "docs/ITERATION_TEMPLATE.md")) {
    throw "Missing docs/ITERATION_TEMPLATE.md"
  }
  $template = Get-Content "docs/ITERATION_TEMPLATE.md" -Raw
  $filesText = if ($FilesChanged.Count -gt 0) { ($FilesChanged | ForEach-Object { "- $_" }) -join "`n" } else { "- (none)" }
  $commandsText = if ($CommandsRun.Count -gt 0) { ($CommandsRun | ForEach-Object { "- $_" }) -join "`n" } else { "- (none)" }

  $content = $template.Replace("{{TIMESTAMP}}", $Timestamp.ToString("o"))
  $content = $content.Replace("{{ACTIVE_PROGRAM}}", $ActiveProgram)
  $content = $content.Replace("{{HYPOTHESIS}}", $Hypothesis)
  $content = $content.Replace("{{FILES_CHANGED}}", $filesText)
  $content = $content.Replace("{{COMMANDS_RUN}}", $commandsText)
  $content = $content.Replace("{{VALIDATION_RESULT}}", $ValidationResult)
  $content = $content.Replace("{{KEPT_OR_REVERTED}}", $KeptOrReverted)
  $content = $content.Replace("{{NEXT_IDEA}}", $NextIdea)

  if (-not (Test-Path "logs")) {
    New-Item -ItemType Directory -Path "logs" | Out-Null
  }
  $logPath = Join-Path "logs" ("iteration-{0:D2}-{1}.md" -f $Iteration, $Timestamp.ToString("yyyyMMdd-HHmmss"))
  Set-Content -Path $logPath -Value $content -Encoding UTF8
  return $logPath
}

Assert-GitRepo
if (-not (Test-Path "review/terminology")) {
  New-Item -ItemType Directory -Path "review/terminology" -Force | Out-Null
}
if (-not [Environment]::UserInteractive) {
  $NoPrompt = $true
}

$initialDirty = @(Get-BlockingDirtyLines)
if ($initialDirty.Count -gt 0) {
  throw "Working tree is dirty. Commit or stash changes before running control/run-program.ps1."
}

for ($i = 1; $i -le $MaxIterations; $i++) {
  $timestamp = Get-Date
  $activeProgram = Get-ActiveProgramPath
  $mission = Get-MissionFromPath -ProgramPath $activeProgram
  $validator = Get-ValidatorPath -Mission $mission

  $programText = Get-Content $activeProgram -Raw
  if ($programText -match "(?im)manual_stop:\s*true") {
    Write-Host "manual_stop:true detected in $activeProgram. Stopping."
    break
  }

  Write-Host ""
  Write-Host "========== Iteration $i / $MaxIterations =========="
  Write-Host "Active program: $activeProgram"
  Write-Host "Mission: $mission"

  $hypothesis = if ($mission -eq "website") {
    "Apply one minimal website improvement that increases quality while preserving behavior."
  }
  else {
    "Apply one minimal terminology improvement that raises quality and source reliability."
  }

  Write-Host "[Planner] $hypothesis"
  Write-Host "[Implementer] Apply one narrow change now."
  if (-not $NoPrompt) {
    Read-Host "Press Enter after finishing the edit"
  }

  $changedFiles = @(Get-ChangedFiles)
  if ($changedFiles.Count -eq 0) {
    $logPath = Write-IterationLog -Iteration $i -Timestamp $timestamp -ActiveProgram $activeProgram -Hypothesis $hypothesis `
      -FilesChanged @() -CommandsRun @() -ValidationResult "No change detected." -KeptOrReverted "not-kept" `
      -NextIdea "Make one narrow change aligned to the active program and rerun."
    Write-Host "No changes detected. Logged to $logPath"
    break
  }

  $commandsRun = @("powershell -NoProfile -ExecutionPolicy Bypass -File .\$validator")
  & powershell -NoProfile -ExecutionPolicy Bypass -File ".\$validator"
  $validationExit = $LASTEXITCODE

  $decision = "kept"
  $validationResult = "PASS"
  if ($validationExit -ne 0) {
    $decision = "reverted"
    $validationResult = "FAIL (exit $validationExit)"
  }

  $nextIdea = if ($decision -eq "kept") {
    "Choose the next smallest high-confidence improvement within the active program."
  }
  else {
    "Reduce scope and fix the failing validation condition before retrying."
  }

  $logPath = Write-IterationLog -Iteration $i -Timestamp $timestamp -ActiveProgram $activeProgram -Hypothesis $hypothesis `
    -FilesChanged $changedFiles -CommandsRun $commandsRun -ValidationResult $validationResult `
    -KeptOrReverted $decision -NextIdea $nextIdea
  Write-Host "Iteration log: $logPath"

  if ($decision -eq "reverted") {
    git restore --staged --worktree -- .
    if ($LASTEXITCODE -ne 0) {
      throw "Severe failure: unable to revert latest iteration safely."
    }
    Write-Host "Latest iteration reverted."
    break
  }

  if (-not $NoCommit) {
    $stageTargets = @()
    $stageTargets += $changedFiles
    $stageTargets += $logPath
    git add -- @stageTargets
    if ($LASTEXITCODE -ne 0) {
      throw "Failed to stage iteration files."
    }
    git commit -m "agent-loop: iter $i - $mission mission improvement"
    if ($LASTEXITCODE -ne 0) {
      throw "Failed to commit kept iteration."
    }
  }
}

Write-Host ""
Write-Host "control/run-program.ps1 completed."
