Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$targetRoot = Join-Path $repoRoot "public\game\sprites\Character_Studio"
$genDir = "C:\Users\TwoKn\.codex\generated_images\019e2b0a-2b0e-7ef3-9581-b098d7c807cf"
$width = 384
$height = 768
$columns = 6
$rows = 5
$frameCount = 30

$characterIds = @("zuri", "asha", "mateo", "noor", "kenji", "elara", "kai", "rae")
$characterNames = @("Zuri", "Asha", "Mateo", "Noor", "Kenji", "Elara", "Kai", "Rae")
$characterRoles = @(
  "Fermentation mentor",
  "Tea and study guide",
  "Brewery coffee coach",
  "Water and maps tutor",
  "Spirits archive mentor",
  "Wine map researcher",
  "Sensory field captain",
  "Coffee library strategist"
)

$latest = @(Get-ChildItem -LiteralPath $genDir -Filter *.png | Sort-Object LastWriteTime | Select-Object -Last 8)
if ($latest.Count -ne 8) {
  throw "Expected 8 generated style-matched source sheets, found $($latest.Count)"
}

foreach ($folder in @("sources", "frames", "sheets", "portraits")) {
  $path = Join-Path $targetRoot $folder
  if (Test-Path -LiteralPath $path) {
    Remove-Item -LiteralPath $path -Recurse -Force
  }
  New-Item -ItemType Directory -Force -Path $path | Out-Null
}

function Save-Png($bitmap, [string]$path) {
  New-Item -ItemType Directory -Force -Path (Split-Path -Parent $path) | Out-Null
  $bitmap.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
}

function Test-KeyColor($color) {
  return (
    $color.G -gt 160 -and
    $color.R -lt 120 -and
    $color.B -lt 130 -and
    $color.G -gt ($color.R * 1.45) -and
    $color.G -gt ($color.B * 1.35)
  )
}

function Remove-ChromaKey($source) {
  $output = [System.Drawing.Bitmap]::new($source.Width, $source.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($output)
  $graphics.DrawImage($source, 0, 0, $source.Width, $source.Height)
  $graphics.Dispose()

  $rect = [System.Drawing.Rectangle]::new(0, 0, $output.Width, $output.Height)
  $data = $output.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  try {
    $byteCount = [Math]::Abs($data.Stride) * $output.Height
    $bytes = New-Object byte[] $byteCount
    [System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $byteCount)

    for ($y = 0; $y -lt $output.Height; $y++) {
      $row = $y * [Math]::Abs($data.Stride)
      for ($x = 0; $x -lt $output.Width; $x++) {
        $offset = $row + ($x * 4)
        $blue = [int]$bytes[$offset]
        $green = [int]$bytes[$offset + 1]
        $red = [int]$bytes[$offset + 2]
        if ($green -gt 160 -and $red -lt 120 -and $blue -lt 130 -and $green -gt ($red * 1.45) -and $green -gt ($blue * 1.35)) {
          $bytes[$offset] = 0
          $bytes[$offset + 1] = 0
          $bytes[$offset + 2] = 0
          $bytes[$offset + 3] = 0
        }
      }
    }
    [System.Runtime.InteropServices.Marshal]::Copy($bytes, 0, $data.Scan0, $byteCount)
  } finally {
    $output.UnlockBits($data)
  }
  return $output
}

function New-TransparentFrame($sheet, [int]$index) {
  $cellWidth = [int][Math]::Floor($sheet.Width / $columns)
  $cellHeight = [int][Math]::Floor($sheet.Height / $rows)
  $column = ($index - 1) % $columns
  $row = [int][Math]::Floor(($index - 1) / $columns)
  $cellRect = [System.Drawing.Rectangle]::new($column * $cellWidth, $row * $cellHeight, $cellWidth, $cellHeight)
  $cell = $sheet.Clone($cellRect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $frame = [System.Drawing.Bitmap]::new($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($frame)
  $graphics.Clear([System.Drawing.Color]::Transparent)
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::Half
  try {
    $scale = [Math]::Min(($width * 0.95) / $cell.Width, ($height * 0.95) / $cell.Height)
    $drawWidth = [int]($cell.Width * $scale)
    $drawHeight = [int]($cell.Height * $scale)
    $drawX = [int](($width - $drawWidth) / 2)
    $drawY = [int]($height - $drawHeight - 8)
    $graphics.DrawImage($cell, $drawX, $drawY, $drawWidth, $drawHeight)
  } finally {
    $graphics.Dispose()
    $cell.Dispose()
  }
  return $frame
}

function Build-Sheet([array]$framePaths, [string]$outputPath) {
  $sheet = [System.Drawing.Bitmap]::new($width * $columns, $height * $rows, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($sheet)
  $graphics.Clear([System.Drawing.Color]::Transparent)
  try {
    for ($i = 0; $i -lt $framePaths.Count; $i++) {
      $frame = [System.Drawing.Bitmap]::new($framePaths[$i])
      try {
        $graphics.DrawImage($frame, (($i % $columns) * $width), ([int][Math]::Floor($i / $columns) * $height), $width, $height)
      } finally {
        $frame.Dispose()
      }
    }
    Save-Png $sheet $outputPath
  } finally {
    $graphics.Dispose()
    $sheet.Dispose()
  }
}

$manifestCharacters = @()
for ($characterIndex = 0; $characterIndex -lt $characterIds.Count; $characterIndex++) {
  $id = $characterIds[$characterIndex]
  $sourcePath = Join-Path $targetRoot "sources\$id-stylematched-source.png"
  $alphaSourcePath = Join-Path $targetRoot "sources\$id-stylematched-alpha.png"
  Copy-Item -LiteralPath $latest[$characterIndex].FullName -Destination $sourcePath -Force

  $rawSource = [System.Drawing.Bitmap]::new($sourcePath)
  try {
    $alphaSheet = Remove-ChromaKey $rawSource
  } finally {
    $rawSource.Dispose()
  }
  Save-Png $alphaSheet $alphaSourcePath

  $frameDirectory = Join-Path $targetRoot "frames\$id"
  New-Item -ItemType Directory -Force -Path $frameDirectory | Out-Null

  $framePaths = @()
  $manifestFrames = @()
  for ($frameIndex = 1; $frameIndex -le $frameCount; $frameIndex++) {
    $frameNumber = "{0:D2}" -f $frameIndex
    $framePath = Join-Path $frameDirectory "$id-gesture-$frameNumber.png"
    $frame = New-TransparentFrame $alphaSheet $frameIndex
    try {
      Save-Png $frame $framePath
      if ($frameIndex -eq 1) {
        Save-Png $frame (Join-Path $targetRoot "portraits\$id.png")
      }
    } finally {
      $frame.Dispose()
    }
    $framePaths += $framePath
    $manifestFrames += [pscustomobject]@{
      index = $frameIndex
      file = "public/game/sprites/Character_Studio/frames/$id/$id-gesture-$frameNumber.png"
    }
  }

  $alphaSheet.Dispose()
  $sheetPath = Join-Path $targetRoot "sheets\$id-30-gestures.png"
  Build-Sheet $framePaths $sheetPath

  $manifestCharacters += [pscustomobject]@{
    id = $id
    name = $characterNames[$characterIndex]
    role = $characterRoles[$characterIndex]
    frame_count = $frameCount
    source = "public/game/sprites/Character_Studio/sources/$id-stylematched-source.png"
    alpha_source = "public/game/sprites/Character_Studio/sources/$id-stylematched-alpha.png"
    sheet = "public/game/sprites/Character_Studio/sheets/$id-30-gestures.png"
    portrait = "public/game/sprites/Character_Studio/portraits/$id.png"
    frames = $manifestFrames
  }
}

$manifest = [pscustomobject]@{
  version = 3
  generator = "built-in image_gen source sheets plus local chroma-key slicing"
  source_reference_folder = "public/game/sprites/characters"
  target_folder = "public/game/sprites/Character_Studio"
  frame_size = [pscustomobject]@{ width = $width; height = $height }
  sheet_grid = [pscustomobject]@{ columns = $columns; rows = $rows; frames = $frameCount }
  characters = $manifestCharacters
}

$manifest | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $targetRoot "manifests\character-studio-manifest.json") -Encoding UTF8

[pscustomobject]@{
  Sources = @(Get-ChildItem -LiteralPath (Join-Path $targetRoot "sources") -Filter *.png).Count
  Characters = $manifestCharacters.Count
  Frames = @(Get-ChildItem -LiteralPath (Join-Path $targetRoot "frames") -Recurse -Filter *.png).Count
  Sheets = @(Get-ChildItem -LiteralPath (Join-Path $targetRoot "sheets") -Filter *.png).Count
} | ConvertTo-Json
