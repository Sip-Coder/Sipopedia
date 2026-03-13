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

function Get-ProgramContent {
  if (-not (Test-Path "program.md")) {
    throw "program.md not found."
  }
  return Get-Content "program.md" -Raw
}

function Get-MdSection {
  param(
    [string]$Content,
    [string]$SectionName
  )
  $pattern = "(?ms)^##\s*$([regex]::Escape($SectionName))\s*\r?\n(?<body>.*?)(?=^##\s|\z)"
  $m = [regex]::Match($Content, $pattern, [System.Text.RegularExpressions.RegexOptions]::Multiline)
  if ($m.Success) {
    return $m.Groups["body"].Value.Trim()
  }
  return ""
}

function Get-ChangedFiles {
  $status = git status --porcelain
  if (-not $status) {
    return @()
  }
  $files = @()
  foreach ($line in $status) {
    if ($line.Length -ge 4) {
      $path = $line.Substring(3).Trim()
      if ($path.Contains(" -> ")) {
        $path = ($path.Split(" -> ")[-1]).Trim()
      }
      $norm = $path.Replace("\", "/")
      if ($norm -match "^logs/") {
        continue
      }
      $files += $path
    }
  }
  return $files | Sort-Object -Unique
}

function Test-PolicyViolation {
  param(
    [string[]]$Files
  )
  $violations = @()
  foreach ($f in $Files) {
    $norm = $f.Replace("\", "/")
    if ($norm -match "(^|/)\.env($|\.|/)") {
      $violations += "Environment file touched: $f"
    }
    if ($norm -match "^supabase/migrations/" -or $norm -eq "supabase/schema.sql") {
      $violations += "Database/schema file touched: $f"
    }
    if ($norm -eq ".git" -or $norm -match "^\.git/") {
      $violations += "Git internals touched: $f"
    }
  }
  return $violations
}

function Get-FirstFailingStage {
  param([string]$LogPath)
  if (-not (Test-Path $LogPath)) {
    return ""
  }
  $match = Select-String -Path $LogPath -Pattern "^\s*([a-zA-Z]+)\s+FAIL" | Select-Object -First 1
  if ($null -eq $match) {
    return ""
  }
  $m = [regex]::Match($match.Line, "^\s*([a-zA-Z]+)\s+FAIL")
  if ($m.Success) {
    return $m.Groups[1].Value
  }
  return ""
}

function Write-IterationLog {
  param(
    [int]$Iteration,
    [datetime]$Timestamp,
    [string]$Hypothesis,
    [string[]]$FilesChanged,
    [string[]]$CommandsRun,
    [string]$Results,
    [string]$ReviewerDecision,
    [string]$KeptOrReverted,
    [string]$NextIdea
  )
  $safeTs = $Timestamp.ToString("yyyyMMdd-HHmmss")
  $logPath = Join-Path "logs" ("iteration-{0:D2}-{1}.md" -f $Iteration, $safeTs)

  $filesText = if ($FilesChanged.Count -gt 0) { ($FilesChanged | ForEach-Object { "- $_" }) -join "`n" } else { "- (none)" }
  $cmdText = ($CommandsRun | ForEach-Object { "- $_" }) -join "`n"

  if (-not (Test-Path "ITERATION_TEMPLATE.md")) {
    throw "ITERATION_TEMPLATE.md not found."
  }
  $template = Get-Content "ITERATION_TEMPLATE.md" -Raw
  $content = $template.Replace("{{ITERATION_NUMBER}}", [string]$Iteration)
  $content = $content.Replace("{{TIMESTAMP}}", $Timestamp.ToString("o"))
  $content = $content.Replace("{{HYPOTHESIS}}", $Hypothesis)
  $content = $content.Replace("{{FILES_CHANGED}}", $filesText)
  $content = $content.Replace("{{COMMANDS_RUN}}", $cmdText)
  $content = $content.Replace("{{RESULTS}}", $Results)
  $content = $content.Replace("{{REVIEWER_DECISION}}", $ReviewerDecision)
  $content = $content.Replace("{{KEPT_OR_REVERTED}}", $KeptOrReverted)
  $content = $content.Replace("{{NEXT_IDEA}}", $NextIdea)
  Set-Content -Path $logPath -Value $content -Encoding UTF8
  return $logPath
}

Assert-GitRepo
if (-not (Test-Path "logs")) {
  New-Item -ItemType Directory -Path "logs" | Out-Null
}

$initialDirty = git status --porcelain
if ($initialDirty) {
  throw "Working tree is dirty. run-loop.ps1 requires a clean tree to safely revert per iteration."
}

for ($i = 1; $i -le $MaxIterations; $i++) {
  $ts = Get-Date
  Write-Host ""
  Write-Host "========== Iteration $i / $MaxIterations =========="

  $program = Get-ProgramContent
  if ($program -match "(?im)manual_stop:\s*true") {
    Write-Host "Stop condition met in program.md (manual_stop: true)."
    break
  }

  $objective = Get-MdSection -Content $program -SectionName "Current Objective"
  $priority = Get-MdSection -Content $program -SectionName "Priority Order For Improvements"

  $commandsRun = New-Object System.Collections.Generic.List[string]
  $commandsRun.Add(".\experiment.ps1") | Out-Null

  $preLog = Join-Path "logs" ("iteration-{0:D2}-pre-{1}.log" -f $i, $ts.ToString("yyyyMMdd-HHmmss"))
  & ".\experiment.ps1" *>&1 | Tee-Object -FilePath $preLog
  $preExit = $LASTEXITCODE
  $firstFail = Get-FirstFailingStage -LogPath $preLog

  $hypothesis = ""
  if ($preExit -ne 0 -and $firstFail) {
    $hypothesis = "If we make one small fix that resolves the '$firstFail' check failure, overall repository health should improve without changing business behavior."
  }
  elseif ($objective) {
    $hypothesis = "If we apply one minimal change aligned with the current objective, quality should improve while all checks remain stable."
  }
  else {
    $hypothesis = "If we apply one minimal maintainability improvement in a low-risk file, quality should improve without regressions."
  }

  Write-Host "[Planner] $hypothesis"
  Write-Host "[Implementer] apply a single minimal edit now."
  if (-not $NoPrompt) {
    Read-Host "Press Enter after completing the edit"
  }

  $changedFiles = Get-ChangedFiles
  if ($changedFiles.Count -eq 0) {
    $logPath = Write-IterationLog -Iteration $i -Timestamp $ts -Hypothesis $hypothesis -FilesChanged @() -CommandsRun $commandsRun `
      -Results "No file changes detected; iteration stopped." -ReviewerDecision "stop" -KeptOrReverted "not-kept" `
      -NextIdea "Apply a minimal scoped change, then rerun."
    Write-Host "No changes found. Logged to $logPath"
    break
  }

  $commandsRun.Add(".\experiment.ps1 (post-change)") | Out-Null
  $postLog = Join-Path "logs" ("iteration-{0:D2}-post-{1}.log" -f $i, $ts.ToString("yyyyMMdd-HHmmss"))
  & ".\experiment.ps1" *>&1 | Tee-Object -FilePath $postLog
  $postExit = $LASTEXITCODE

  $policyViolations = Test-PolicyViolation -Files $changedFiles

  $reviewerDecision = "keep"
  $keptOrReverted = "kept"
  $results = "Pre-validation exit: $preExit; Post-validation exit: $postExit."
  if ($policyViolations.Count -gt 0) {
    $reviewerDecision = "revert"
    $keptOrReverted = "reverted"
    $results += " Policy violations: $($policyViolations -join '; ')"
  }
  elseif ($postExit -ne 0) {
    $reviewerDecision = "revert"
    $keptOrReverted = "reverted"
    $results += " Post-validation failed."
  }

  $nextIdea = if ($reviewerDecision -eq "keep") {
    "Read updated program.md next iteration and pick the next smallest high-confidence change."
  }
  else {
    "Choose an even smaller, lower-risk change for the same objective."
  }

  $logPath = Write-IterationLog -Iteration $i -Timestamp $ts -Hypothesis $hypothesis -FilesChanged $changedFiles `
    -CommandsRun $commandsRun -Results $results -ReviewerDecision $reviewerDecision `
    -KeptOrReverted $keptOrReverted -NextIdea $nextIdea
  Write-Host "Iteration log: $logPath"

  if ($reviewerDecision -eq "revert") {
    Write-Host "[Reviewer] Reverting latest iteration changes."
    git restore --staged --worktree -- .
    if ($LASTEXITCODE -ne 0) {
      throw "Severe failure: could not revert latest iteration changes safely."
    }
  }
  else {
    if (-not $NoCommit) {
      $stageTargets = @()
      $stageTargets += $changedFiles
      $stageTargets += $logPath
      git add -- @stageTargets
      if ($LASTEXITCODE -ne 0) {
        throw "Failed to stage files."
      }
      $short = if ($firstFail) { "fix $firstFail gate" } else { "small quality improvement" }
      git commit -m "agent-loop: iter $i - $short"
      if ($LASTEXITCODE -ne 0) {
        throw "Failed to commit kept iteration."
      }
    }
  }

  if ($reviewerDecision -eq "revert" -and $postExit -ne 0 -and $preExit -ne 0) {
    Write-Host "Validation unstable before and after change. Stopping for safety."
    break
  }
}

Write-Host ""
Write-Host "run-loop completed."
