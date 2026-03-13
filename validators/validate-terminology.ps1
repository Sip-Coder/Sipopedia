[CmdletBinding()]
param()

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$schemaPath = "schemas/terminology.schema.json"
$terminologyRoot = "terminology"
$reviewDir = "review/terminology"

if (-not (Test-Path $schemaPath)) {
  throw "Missing schema file: $schemaPath"
}
if (-not (Test-Path $terminologyRoot)) {
  throw "Missing terminology folder: $terminologyRoot"
}
if (-not (Test-Path $reviewDir)) {
  New-Item -ItemType Directory -Path $reviewDir -Force | Out-Null
}

$allowedCategories = @(
  "wine", "beer", "spirits", "coffee", "tea", "water",
  "sake", "kombucha", "juice", "milk", "energy-drinks", "other"
)
$requiredFields = @(
  "term",
  "category",
  "subcategory",
  "concise_definition",
  "expanded_explanation",
  "why_it_matters",
  "related_terms",
  "citations",
  "quality_score",
  "status"
)
$allowedStatuses = @("draft", "review", "published", "rejected")

function Normalize-Text {
  param([string]$Value)
  if ([string]::IsNullOrWhiteSpace($Value)) { return "" }
  return $Value.Trim().ToLowerInvariant()
}

function Test-FieldPresent {
  param($Obj, [string]$Name)
  return $null -ne $Obj.PSObject.Properties[$Name]
}

$jsonFiles = Get-ChildItem -Path $terminologyRoot -Recurse -File -Filter *.json
if ($jsonFiles.Count -eq 0) {
  Write-Host "Terminology validation summary:"
  Write-Host "files=0 entries=0 structural_failures=0 borderline=0 review_queue=none"
  exit 0
}

$structuralIssues = New-Object System.Collections.Generic.List[object]
$borderlineIssues = New-Object System.Collections.Generic.List[object]
$entryRecords = New-Object System.Collections.Generic.List[object]
$termOwner = @{}
$aliasOwner = @{}
$publishedCount = 0

foreach ($file in $jsonFiles) {
  $raw = Get-Content $file.FullName -Raw
  try {
    $parsed = $raw | ConvertFrom-Json -Depth 100
  }
  catch {
    $structuralIssues.Add([pscustomobject]@{
        File = $file.FullName
        Term = "(parse-error)"
        Issue = "Invalid JSON parse."
      }) | Out-Null
    continue
  }

  $entries = @()
  if ($parsed -is [System.Array]) { $entries = $parsed } else { $entries = @($parsed) }

  $entryIndex = 0
  foreach ($entry in $entries) {
    $entryIndex++
    $entryPath = "$($file.FullName)#$entryIndex"
    $entryErrors = New-Object System.Collections.Generic.List[string]
    $entryBorderline = New-Object System.Collections.Generic.List[string]

    foreach ($field in $requiredFields) {
      if (-not (Test-FieldPresent -Obj $entry -Name $field)) {
        $entryErrors.Add("Missing required field '$field'.") | Out-Null
      }
    }

    $term = if (Test-FieldPresent -Obj $entry -Name "term") { [string]$entry.term } else { "" }
    $category = if (Test-FieldPresent -Obj $entry -Name "category") { [string]$entry.category } else { "" }
    $status = if (Test-FieldPresent -Obj $entry -Name "status") { [string]$entry.status } else { "" }
    $qualityScore = if (Test-FieldPresent -Obj $entry -Name "quality_score") { $entry.quality_score } else { $null }
    $citations = if (Test-FieldPresent -Obj $entry -Name "citations") { $entry.citations } else { @() }
    $relatedTerms = if (Test-FieldPresent -Obj $entry -Name "related_terms") { $entry.related_terms } else { @() }
    $aliases = if (Test-FieldPresent -Obj $entry -Name "alias_terms") { $entry.alias_terms } else { @() }

    if ([string]::IsNullOrWhiteSpace($term)) {
      $entryErrors.Add("Field 'term' must be non-empty.") | Out-Null
    }
    if ($allowedCategories -notcontains $category) {
      $entryErrors.Add("Field 'category' must be one of allowed categories.") | Out-Null
    }
    if ($allowedStatuses -notcontains $status) {
      $entryErrors.Add("Field 'status' must be one of: $($allowedStatuses -join ', ').") | Out-Null
    }

    $qsNum = $null
    try {
      $qsNum = [double]$qualityScore
      if ($qsNum -lt 0 -or $qsNum -gt 100) {
        $entryErrors.Add("Field 'quality_score' must be between 0 and 100.") | Out-Null
      }
    }
    catch {
      $entryErrors.Add("Field 'quality_score' must be numeric.") | Out-Null
    }

    if ($relatedTerms -isnot [System.Array]) {
      $entryErrors.Add("Field 'related_terms' must be an array.") | Out-Null
    }
    if ($citations -isnot [System.Array] -or $citations.Count -lt 1) {
      $entryErrors.Add("Field 'citations' must be a non-empty array.") | Out-Null
    }
    else {
      $citationIdx = 0
      foreach ($c in $citations) {
        $citationIdx++
        if ($null -eq $c.title -or [string]::IsNullOrWhiteSpace([string]$c.title)) {
          $entryErrors.Add("Citation #$citationIdx missing title.") | Out-Null
        }
        if ($null -eq $c.url -or [string]::IsNullOrWhiteSpace([string]$c.url)) {
          $entryErrors.Add("Citation #$citationIdx missing url.") | Out-Null
        }
      }
    }

    if ($status -eq "published") {
      $publishedCount++
      if ($qsNum -lt 80) {
        $entryErrors.Add("Published entries require quality_score >= 80.") | Out-Null
      }
      if ($citations.Count -lt 2) {
        $entryErrors.Add("Published entries require at least 2 citations.") | Out-Null
      }
    }
    elseif ($null -ne $qsNum -and $qsNum -ge 65 -and $qsNum -lt 80) {
      $entryBorderline.Add("Borderline quality_score ($qsNum). Route to review queue.") | Out-Null
    }

    if ($entryErrors.Count -gt 0) {
      foreach ($issue in $entryErrors) {
        $structuralIssues.Add([pscustomobject]@{
            File = $entryPath
            Term = $term
            Issue = $issue
          }) | Out-Null
      }
    }
    else {
      $normTerm = Normalize-Text -Value $term
      $aliasList = @()
      if ($aliases -is [System.Array]) {
        foreach ($a in $aliases) {
          $n = Normalize-Text -Value ([string]$a)
          if (-not [string]::IsNullOrWhiteSpace($n)) { $aliasList += $n }
        }
      }
      $entryRecords.Add([pscustomobject]@{
          File = $entryPath
          Term = $term
          NormTerm = $normTerm
          Aliases = $aliasList
        }) | Out-Null
    }

    foreach ($issue in $entryBorderline) {
      $borderlineIssues.Add([pscustomobject]@{
          File = $entryPath
          Term = $term
          Issue = $issue
        }) | Out-Null
    }
  }
}

# Duplicate and alias collision checks
foreach ($r in $entryRecords) {
  if ($termOwner.ContainsKey($r.NormTerm)) {
    $structuralIssues.Add([pscustomobject]@{
        File = $r.File
        Term = $r.Term
        Issue = "Duplicate term collision with $($termOwner[$r.NormTerm])."
      }) | Out-Null
  }
  else {
    $termOwner[$r.NormTerm] = $r.File
  }
}

foreach ($r in $entryRecords) {
  foreach ($alias in $r.Aliases) {
    if ($termOwner.ContainsKey($alias) -and $termOwner[$alias] -ne $r.File) {
      $structuralIssues.Add([pscustomobject]@{
          File = $r.File
          Term = $r.Term
          Issue = "Alias '$alias' collides with canonical term in $($termOwner[$alias])."
        }) | Out-Null
      continue
    }
    if ($aliasOwner.ContainsKey($alias) -and $aliasOwner[$alias] -ne $r.File) {
      $structuralIssues.Add([pscustomobject]@{
          File = $r.File
          Term = $r.Term
          Issue = "Alias '$alias' collides with alias in $($aliasOwner[$alias])."
        }) | Out-Null
      continue
    }
    $aliasOwner[$alias] = $r.File
  }
}

$reviewPath = $null
if ($structuralIssues.Count -gt 0 -or $borderlineIssues.Count -gt 0) {
  $stamp = (Get-Date).ToString("yyyyMMdd-HHmmss")
  $reviewPath = Join-Path $reviewDir ("terminology-review-$stamp.md")
  $reviewLines = New-Object System.Collections.Generic.List[string]
  $reviewLines.Add("# Terminology Review Queue - $stamp") | Out-Null
  $reviewLines.Add("") | Out-Null
  $reviewLines.Add("## Structural Failures") | Out-Null
  if ($structuralIssues.Count -eq 0) {
    $reviewLines.Add("- none") | Out-Null
  }
  else {
    foreach ($i in $structuralIssues) {
      $reviewLines.Add("- [$($i.Term)] $($i.File): $($i.Issue)") | Out-Null
    }
  }
  $reviewLines.Add("") | Out-Null
  $reviewLines.Add("## Borderline Entries") | Out-Null
  if ($borderlineIssues.Count -eq 0) {
    $reviewLines.Add("- none") | Out-Null
  }
  else {
    foreach ($b in $borderlineIssues) {
      $reviewLines.Add("- [$($b.Term)] $($b.File): $($b.Issue)") | Out-Null
    }
  }
  Set-Content -Path $reviewPath -Value ($reviewLines -join "`n") -Encoding UTF8
}

Write-Host "Terminology validation summary:"
Write-Host "files=$($jsonFiles.Count) entries=$($entryRecords.Count) published=$publishedCount structural_failures=$($structuralIssues.Count) borderline=$($borderlineIssues.Count)"
if ($reviewPath) {
  Write-Host "review_queue=$reviewPath"
}
else {
  Write-Host "review_queue=none"
}

if ($structuralIssues.Count -gt 0) {
  exit 1
}
exit 0
