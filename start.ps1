[CmdletBinding()]
param()

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Assert-File {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "Required file missing: $Path"
  }
}

git rev-parse --is-inside-work-tree 1>$null 2>$null
if ($LASTEXITCODE -ne 0) {
  throw "This directory is not a git repository."
}

$dirty = git status --porcelain
if ($dirty) {
  Write-Warning "Working tree is dirty. Commit/stash unrelated work before running iterative loop."
}

$branch = "agent/karpathy-web-loop"
git show-ref --verify --quiet "refs/heads/$branch"
if ($LASTEXITCODE -eq 0) {
  git checkout $branch
}
else {
  git checkout -b $branch
}
if ($LASTEXITCODE -ne 0) {
  throw "Failed to create or switch to branch '$branch'."
}

Assert-File "program.md"
Assert-File "agent.md"
Assert-File "experiment.ps1"
Assert-File "run-loop.ps1"
Assert-File "start.ps1"
Assert-File "CHANGE_POLICY.md"
Assert-File "ITERATION_TEMPLATE.md"

if (-not (Test-Path "logs")) {
  New-Item -ItemType Directory -Path "logs" | Out-Null
}
if (-not (Test-Path "logs/.gitkeep")) {
  Set-Content -Path "logs/.gitkeep" -Value "" -Encoding UTF8
}

Write-Host "Running initial assessment (experiment.ps1)..."
& ".\experiment.ps1"
$assessmentExit = $LASTEXITCODE
if ($assessmentExit -eq 0) {
  Write-Host "Initial assessment: PASS"
}
else {
  Write-Warning "Initial assessment: FAIL (exit $assessmentExit). Loop can still be used to improve incrementally."
}

git add -- program.md agent.md experiment.ps1 run-loop.ps1 start.ps1 CHANGE_POLICY.md ITERATION_TEMPLATE.md logs/.gitkeep
if ($LASTEXITCODE -ne 0) {
  throw "Failed to stage control files."
}

$staged = git diff --cached --name-only
if ($staged) {
  git commit -m "chore(agent-loop): initialize karpathy web loop control harness"
  if ($LASTEXITCODE -ne 0) {
    throw "Failed to create initial checkpoint commit."
  }
  Write-Host "Created initial checkpoint commit."
}
else {
  Write-Host "No new control-file changes to commit."
}

Write-Host ""
Write-Host "Next commands:"
Write-Host "1) notepad .\program.md"
Write-Host "2) .\run-loop.ps1"
Write-Host "3) .\run-loop.ps1 -MaxIterations 3"
Write-Host "4) Get-ChildItem .\logs\*.md | Sort-Object LastWriteTime -Descending"
