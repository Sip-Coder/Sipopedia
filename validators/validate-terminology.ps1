[CmdletBinding()]
param(
  [int]$Limit = 535,
  [switch]$Apply,
  [switch]$AllowOffline
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path "."
$auditScript = Join-Path $repoRoot "scripts/audit-terms.js"
$playbook = Join-Path $repoRoot "docs/TERMS_AUTOMATION_PLAYBOOK.md"

if (-not (Test-Path $auditScript)) {
  throw "Missing script: $auditScript"
}

if (-not (Test-Path $playbook)) {
  throw "Missing playbook: $playbook"
}

$hasSupabaseUrl = -not [string]::IsNullOrWhiteSpace($env:SUPABASE_URL) -or -not [string]::IsNullOrWhiteSpace($env:VITE_SUPABASE_URL)
$hasServiceRole = -not [string]::IsNullOrWhiteSpace($env:SUPABASE_SERVICE_ROLE_KEY)

Write-Host "==> terminology validator (Start Terms workflow)"
Write-Host "==> policy: no encyclopedia/dictionary sources"
Write-Host "==> required fields: term, updated date, meaning, how_to_apply, examples, authors, infographic, references, mla citations, editorial policy"

if (-not $hasSupabaseUrl -or -not $hasServiceRole) {
  $message = "SUPABASE_URL/VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for full terminology validation."
  if ($AllowOffline) {
    Write-Host "warning: $message"
    Write-Host "warning: skipping live table audit because -AllowOffline was set."
    exit 0
  }
  throw $message
}

$args = @("scripts/audit-terms.js", "--limit", "$Limit")
if ($Apply) {
  $args += "--apply"
}

& node @args
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

Write-Host "==> terminology validator completed"
