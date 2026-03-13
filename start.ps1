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
  Write-Warning "Working tree is dirty. Commit/stash unrelated work before running loop."
}

$branch = "agent/multi-program-control-plane"
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

Assert-File "control/active-program.txt"
Assert-File "control/run-program.ps1"
Assert-File "control/select-program.ps1"
Assert-File "control/agent-task.md"
Assert-File "programs/program.website.md"
Assert-File "programs/program.terminology.md"
Assert-File "validators/validate-website.ps1"
Assert-File "validators/validate-terminology.ps1"
Assert-File "schemas/terminology.schema.json"
Assert-File "docs/RUNBOOK.md"
Assert-File "docs/CHANGE_POLICY.md"
Assert-File "docs/ITERATION_TEMPLATE.md"

if (-not (Test-Path "logs")) {
  New-Item -ItemType Directory -Path "logs" | Out-Null
}
if (-not (Test-Path "logs/.gitkeep")) {
  Set-Content -Path "logs/.gitkeep" -Value "" -Encoding UTF8
}

Write-Host "Running active-program validation pass..."
$active = (Get-Content "control/active-program.txt" -Raw).Trim()
if ($active -like "*terminology*") {
  & powershell -NoProfile -ExecutionPolicy Bypass -File ".\validators\validate-terminology.ps1"
}
else {
  & powershell -NoProfile -ExecutionPolicy Bypass -File ".\validators\validate-website.ps1"
}
$assessmentExit = $LASTEXITCODE
if ($assessmentExit -eq 0) {
  Write-Host "Initial assessment: PASS"
}
else {
  Write-Warning "Initial assessment: FAIL (exit $assessmentExit)."
}

Write-Host ""
Write-Host "Next commands:"
Write-Host "1) powershell -NoProfile -ExecutionPolicy Bypass -File .\control\select-program.ps1 website"
Write-Host "2) powershell -NoProfile -ExecutionPolicy Bypass -File .\control\run-program.ps1"
Write-Host "3) Get-ChildItem .\logs\*.md | Sort-Object LastWriteTime -Descending"
