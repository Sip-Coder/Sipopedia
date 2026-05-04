$ErrorActionPreference = 'Stop'
$jobs = Get-Content 'C:\codebase\sip_studies\actual\Sip-Studies\tmp\imagegen\commodity-turntable-edit-jobs.json' -Raw | ConvertFrom-Json
$secretFile = Get-ChildItem -Path 'C:\codebase\sip_studies\actual\Sip-Studies\local-secrets' -Recurse -File -ErrorAction SilentlyContinue | Where-Object { (Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue) -match 'sk-proj-' } | Select-Object -First 1 -ExpandProperty FullName
if (-not $secretFile) { throw 'OPENAI key not found in local-secrets.' }
$content = Get-Content $secretFile -Raw
if ($content -match 'sk-proj-[A-Za-z0-9_\-]+') { $apiKey = $matches[0] } else { throw 'OPENAI key not found in local secrets file.' }
$script = 'C:\Users\TwoKn\.codex\skills\.system\imagegen\scripts\image_gen.py'
$logDir = Join-Path 'C:\codebase\sip_studies\actual\Sip-Studies' 'tmp\imagegen\commodity-turntable-logs'
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir | Out-Null }
$maxParallel = 2
$running = @()
$completed = 0
$failed = @()
foreach ($job in $jobs) {
  while ($running.Count -ge $maxParallel) {
    $done = Wait-Job -Job $running -Any
    $output = Receive-Job -Job $done
    if ($done.State -ne 'Completed') { $failed += $done.Name }
    Remove-Job -Job $done
    $running = @($running | Where-Object { $_.Id -ne $done.Id })
    $completed++
    Write-Host "completed jobs observed: $completed / $($jobs.Count)"
  }
  $name = "$($job.commodity)-$($job.id)-$($job.view)"
  $running += Start-Job -Name $name -ArgumentList $script,$apiKey,$job.image,$job.prompt,$job.out,$logDir,$name -ScriptBlock {
    param($script,$apiKey,$image,$prompt,$out,$logDir,$name)
    $env:OPENAI_API_KEY = $apiKey
    $stdout = Join-Path $logDir "$name.out.log"
    $stderr = Join-Path $logDir "$name.err.log"
    & python $script edit --model gpt-image-1.5 --image $image --prompt-file $prompt --out $out --size 1024x1024 --quality medium --output-format png --force > $stdout 2> $stderr
    if ($LASTEXITCODE -ne 0) { throw "image edit failed: $name" }
  }
}
while ($running.Count -gt 0) {
  $done = Wait-Job -Job $running -Any
  $output = Receive-Job -Job $done
  if ($done.State -ne 'Completed') { $failed += $done.Name }
  Remove-Job -Job $done
  $running = @($running | Where-Object { $_.Id -ne $done.Id })
  $completed++
  Write-Host "completed jobs observed: $completed / $($jobs.Count)"
}
if ($failed.Count -gt 0) {
  Write-Host "failed jobs: $($failed -join ', ')"
  exit 1
}
$missing = $jobs | Where-Object { -not (Test-Path $_.out) }
Write-Host "expected edits: $($jobs.Count)"
Write-Host "missing edits: $($missing.Count)"
if ($missing.Count -gt 0) { $missing | Select-Object commodity,id,view,out | Format-Table -AutoSize; exit 1 }


