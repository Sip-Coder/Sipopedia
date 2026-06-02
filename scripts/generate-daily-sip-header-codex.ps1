param(
  [string]$ReportId = "",
  [string]$Date = "",
  [switch]$Force
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$dataPath = Join-Path $repoRoot "src\data\dailySip.ts"
$data = Get-Content -Raw -Path $dataPath
$match = [regex]::Match($data, 'export const dailySipReports: DailySipReport\[\] = (?<json>[\s\S]*?);\s*export const dailySipReport')

if (-not $match.Success) {
  throw "Could not find dailySipReports in $dataPath"
}

$reports = $match.Groups["json"].Value | ConvertFrom-Json

if ($Date) {
  if ($Date -notmatch '^\d{4}-\d{2}-\d{2}$') {
    throw "Date must use YYYY-MM-DD format."
  }
  $ReportId = "daily-sip-$Date"
}

$report = @($reports)[0]
if ($ReportId) {
  $report = @($reports | Where-Object { $_.id -eq $ReportId })[0]
  if (-not $report) {
    throw "Could not find Daily Sip report with id $ReportId"
  }
}

if (-not $report.headerImageUrl) {
  throw "Daily Sip report $($report.id) does not include headerImageUrl."
}

$relativeImagePath = $report.headerImageUrl.TrimStart("/") -replace "/", "\"
$outputPath = Join-Path (Join-Path $repoRoot "public") $relativeImagePath

if ((Test-Path $outputPath) -and -not $Force) {
  Write-Host "Daily Sip Codex header already exists: $outputPath"
  exit 0
}

if ((Test-Path $outputPath) -and $Force) {
  $publicRoot = [System.IO.Path]::GetFullPath((Join-Path $repoRoot "public\daily-sip"))
  $resolvedOutputPath = [System.IO.Path]::GetFullPath($outputPath)
  if (-not $resolvedOutputPath.StartsWith($publicRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Refusing to remove a file outside public\daily-sip: $resolvedOutputPath"
  }
  Remove-Item -LiteralPath $resolvedOutputPath -Force
}

$prompt = @"
You are running from the Sip-Studies repo. Do not edit source code, package files, data files, or any unrelated assets.

Task:
1. Read src/data/dailySip.ts and use the dailySipReports entry with id "$($report.id)".
2. Use the built-in image generation tool to generate a photorealistic 16:9 Daily Sip header image using that entry's headerImagePrompt.
3. Copy the final generated PNG into this exact workspace path:
$outputPath
4. Leave the original generated image in the Codex generated_images folder.
5. Verify the workspace file exists and is non-empty.

Constraints:
- No readable text, no logos, no brand labels, no people, no watermark.
- Do not change any files except the requested PNG path.
- The requested PNG path has been intentionally removed by the wrapper when regeneration is requested.
"@

& codex -a never --sandbox workspace-write exec --cd $repoRoot $prompt
$exitCode = $LASTEXITCODE
if ($exitCode -ne 0) {
  exit $exitCode
}

if (-not (Test-Path $outputPath)) {
  throw "Codex image fallback completed but did not create $outputPath"
}

$output = Get-Item $outputPath
if ($output.Length -le 0) {
  throw "Codex image fallback created an empty file at $outputPath"
}

Write-Host "Daily Sip Codex header generated: $outputPath"
