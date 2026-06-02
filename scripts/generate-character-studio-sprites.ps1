Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$targetRoot = Join-Path $repoRoot "public\game\sprites\Character_Studio"
$allowedRoot = Resolve-Path (Join-Path $repoRoot "public\game\sprites")
$targetFull = if (Test-Path -LiteralPath $targetRoot) { Resolve-Path $targetRoot } else { $targetRoot }

if (-not $targetFull.ToString().StartsWith($allowedRoot.ToString(), [System.StringComparison]::OrdinalIgnoreCase)) {
  throw "Refusing to write outside public/game/sprites: $targetFull"
}

$canvasWidth = 384
$canvasHeight = 768
$sheetColumns = 6
$sheetRows = 5
$frameCount = 30
$layerScaleX = 1.28

$foldersToReset = @("frames", "sheets", "sources", "bases", "hair", "features", "props", "manifests", "portraits")
New-Item -ItemType Directory -Force -Path $targetRoot | Out-Null
foreach ($folder in $foldersToReset) {
  $path = Join-Path $targetRoot $folder
  if (Test-Path -LiteralPath $path) {
    $resolved = Resolve-Path $path
    if (-not $resolved.ToString().StartsWith((Resolve-Path $targetRoot).ToString(), [System.StringComparison]::OrdinalIgnoreCase)) {
      throw "Refusing to remove unsafe path: $resolved"
    }
    Remove-Item -LiteralPath $resolved -Recurse -Force
  }
}

$requiredFolders = @(
  "frames",
  "sheets",
  "bases\frames",
  "bases\sheets",
  "hair\masks\frames",
  "hair\masks\sheets",
  "hair\outlines\frames",
  "hair\outlines\sheets",
  "features\frames",
  "features\sheets",
  "manifests",
  "portraits"
)
foreach ($folder in $requiredFolders) {
  New-Item -ItemType Directory -Force -Path (Join-Path $targetRoot $folder) | Out-Null
}

function C([string]$hex, [int]$alpha = 255) {
  $base = [System.Drawing.ColorTranslator]::FromHtml($hex)
  return [System.Drawing.Color]::FromArgb($alpha, $base.R, $base.G, $base.B)
}

function New-Bitmap {
  $bitmap = [System.Drawing.Bitmap]::new($canvasWidth, $canvasHeight, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $graphics.Clear([System.Drawing.Color]::Transparent)
  return [pscustomobject]@{ Bitmap = $bitmap; Graphics = $graphics }
}

function New-RoundedPath([float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
  $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $d = $r * 2
  $path.AddArc($x, $y, $d, $d, 180, 90)
  $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  return $path
}

function Fill-Path($g, $path, $fillColor, [float]$outlineWidth = 0, $outlineColor = $null) {
  if ($outlineWidth -gt 0) {
    $pen = [System.Drawing.Pen]::new($outlineColor, $outlineWidth)
    $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    $g.DrawPath($pen, $path)
    $pen.Dispose()
  }
  $brush = [System.Drawing.SolidBrush]::new($fillColor)
  $g.FillPath($brush, $path)
  $brush.Dispose()
}

function Fill-Ellipse($g, [float]$x, [float]$y, [float]$w, [float]$h, $fillColor, [float]$outlineWidth = 0, $outlineColor = $null) {
  if ($outlineWidth -gt 0) {
    $pen = [System.Drawing.Pen]::new($outlineColor, $outlineWidth)
    $g.DrawEllipse($pen, $x, $y, $w, $h)
    $pen.Dispose()
  }
  $brush = [System.Drawing.SolidBrush]::new($fillColor)
  $g.FillEllipse($brush, $x, $y, $w, $h)
  $brush.Dispose()
}

function Fill-RoundRect($g, [float]$x, [float]$y, [float]$w, [float]$h, [float]$r, $fillColor, [float]$outlineWidth = 0, $outlineColor = $null) {
  $path = New-RoundedPath $x $y $w $h $r
  Fill-Path $g $path $fillColor $outlineWidth $outlineColor
  $path.Dispose()
}

function Draw-Line($g, [float]$x1, [float]$y1, [float]$x2, [float]$y2, $color, [float]$width) {
  $pen = [System.Drawing.Pen]::new($color, $width)
  $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
  $g.DrawLine($pen, $x1, $y1, $x2, $y2)
  $pen.Dispose()
}

function Draw-Arc($g, [float]$x, [float]$y, [float]$w, [float]$h, [float]$startAngle, [float]$sweepAngle, $color, [float]$width) {
  $pen = [System.Drawing.Pen]::new($color, $width)
  $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $g.DrawArc($pen, $x, $y, $w, $h, $startAngle, $sweepAngle)
  $pen.Dispose()
}

function Draw-Poly($g, [array]$points, $fillColor, [float]$outlineWidth = 0, $outlineColor = $null) {
  $drawPoints = @()
  foreach ($point in $points) {
    $drawPoints += [System.Drawing.PointF]::new([float]$point[0], [float]$point[1])
  }
  if ($outlineWidth -gt 0) {
    $pen = [System.Drawing.Pen]::new($outlineColor, $outlineWidth)
    $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    $g.DrawPolygon($pen, $drawPoints)
    $pen.Dispose()
  }
  $brush = [System.Drawing.SolidBrush]::new($fillColor)
  $g.FillPolygon($brush, $drawPoints)
  $brush.Dispose()
}

function Darken([string]$hex, [float]$factor) {
  $base = [System.Drawing.ColorTranslator]::FromHtml($hex)
  $r = [Math]::Max(0, [Math]::Min(255, [int]($base.R * $factor)))
  $g = [Math]::Max(0, [Math]::Min(255, [int]($base.G * $factor)))
  $b = [Math]::Max(0, [Math]::Min(255, [int]($base.B * $factor)))
  return [System.Drawing.Color]::FromArgb(255, $r, $g, $b)
}

function Save-Png($bitmap, [string]$path) {
  New-Item -ItemType Directory -Force -Path (Split-Path -Parent $path) | Out-Null
  $bitmap.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
}

function Normalize-LayerBitmap($source) {
  $bitmap = [System.Drawing.Bitmap]::new($canvasWidth, $canvasHeight, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.Clear([System.Drawing.Color]::Transparent)
  try {
    $drawWidth = [int]($canvasWidth * $layerScaleX)
    $drawX = [int](($canvasWidth - $drawWidth) / 2)
    $graphics.DrawImage($source, $drawX, 0, $drawWidth, $canvasHeight)
    return $bitmap.Clone()
  } finally {
    $graphics.Dispose()
    $bitmap.Dispose()
  }
}

$outline = C "#16100f"
$line = C "#2b1a17"
$white = C "#fff6dc"
$page = C "#f8ecd1"
$gold = C "#f0bf5a"
$glass = C "#dff7ff" 185
$shadowInk = C "#000000" 55

$gestures = @(
  [pscustomobject]@{ Index = 1; Id = "ready"; Label = "Ready"; Mode = "neutral"; Expression = "bright"; Prop = "none"; PropHand = "none" },
  [pscustomobject]@{ Index = 2; Id = "hello-wave"; Label = "Hello Wave"; Mode = "wave"; Expression = "bright"; Prop = "none"; PropHand = "none" },
  [pscustomobject]@{ Index = 3; Id = "point-up"; Label = "Point Up"; Mode = "point"; Expression = "focused"; Prop = "none"; PropHand = "none" },
  [pscustomobject]@{ Index = 4; Id = "present-left"; Label = "Present Left"; Mode = "present-left"; Expression = "calm"; Prop = "none"; PropHand = "none" },
  [pscustomobject]@{ Index = 5; Id = "present-right"; Label = "Present Right"; Mode = "present-right"; Expression = "calm"; Prop = "none"; PropHand = "none" },
  [pscustomobject]@{ Index = 6; Id = "thumbs-up"; Label = "Thumbs Up"; Mode = "thumb"; Expression = "bright"; Prop = "none"; PropHand = "right" },
  [pscustomobject]@{ Index = 7; Id = "wine-glass"; Label = "Wine Glass"; Mode = "hold-right"; Expression = "bright"; Prop = "wine-glass"; PropHand = "right" },
  [pscustomobject]@{ Index = 8; Id = "wine-bottle"; Label = "Wine Bottle"; Mode = "hold-left"; Expression = "focused"; Prop = "wine-bottle"; PropHand = "left" },
  [pscustomobject]@{ Index = 9; Id = "beer-mug"; Label = "Beer Mug"; Mode = "hold-right"; Expression = "bright"; Prop = "beer-mug"; PropHand = "right" },
  [pscustomobject]@{ Index = 10; Id = "beer-pint"; Label = "Beer Pint"; Mode = "hold-left"; Expression = "calm"; Prop = "beer-pint"; PropHand = "left" },
  [pscustomobject]@{ Index = 11; Id = "spirit-snifter"; Label = "Spirit Snifter"; Mode = "hold-right"; Expression = "wry"; Prop = "spirit-snifter"; PropHand = "right" },
  [pscustomobject]@{ Index = 12; Id = "rocks-glass"; Label = "Rocks Glass"; Mode = "hold-left"; Expression = "focused"; Prop = "rocks-glass"; PropHand = "left" },
  [pscustomobject]@{ Index = 13; Id = "coffee-cup"; Label = "Coffee Cup"; Mode = "hold-right"; Expression = "calm"; Prop = "coffee-cup"; PropHand = "right" },
  [pscustomobject]@{ Index = 14; Id = "tea-cup"; Label = "Tea Cup"; Mode = "hold-left"; Expression = "bright"; Prop = "tea-cup"; PropHand = "left" },
  [pscustomobject]@{ Index = 15; Id = "water-glass"; Label = "Water Glass"; Mode = "hold-right"; Expression = "calm"; Prop = "water-glass"; PropHand = "right" },
  [pscustomobject]@{ Index = 16; Id = "open-book"; Label = "Open Book"; Mode = "book-open"; Expression = "focused"; Prop = "open-book"; PropHand = "both" },
  [pscustomobject]@{ Index = 17; Id = "reading-book"; Label = "Reading Book"; Mode = "book-high"; Expression = "calm"; Prop = "book"; PropHand = "both" },
  [pscustomobject]@{ Index = 18; Id = "notebook-pencil"; Label = "Notebook Pencil"; Mode = "write"; Expression = "focused"; Prop = "notebook"; PropHand = "both" },
  [pscustomobject]@{ Index = 19; Id = "clipboard"; Label = "Clipboard"; Mode = "hold-left"; Expression = "focused"; Prop = "clipboard"; PropHand = "left" },
  [pscustomobject]@{ Index = 20; Id = "map"; Label = "Map"; Mode = "hold-left"; Expression = "bright"; Prop = "map"; PropHand = "left" },
  [pscustomobject]@{ Index = 21; Id = "aroma-wheel"; Label = "Aroma Wheel"; Mode = "present-right"; Expression = "spark"; Prop = "aroma-wheel"; PropHand = "right" },
  [pscustomobject]@{ Index = 22; Id = "corkscrew"; Label = "Corkscrew"; Mode = "hold-right"; Expression = "wry"; Prop = "corkscrew"; PropHand = "right" },
  [pscustomobject]@{ Index = 23; Id = "thinking"; Label = "Thinking"; Mode = "think"; Expression = "wry"; Prop = "none"; PropHand = "none" },
  [pscustomobject]@{ Index = 24; Id = "question"; Label = "Question"; Mode = "question"; Expression = "curious"; Prop = "none"; PropHand = "none" },
  [pscustomobject]@{ Index = 25; Id = "celebrate"; Label = "Celebrate"; Mode = "cheer"; Expression = "spark"; Prop = "none"; PropHand = "none" },
  [pscustomobject]@{ Index = 26; Id = "explain-left"; Label = "Explain Left"; Mode = "explain-left"; Expression = "bright"; Prop = "none"; PropHand = "none" },
  [pscustomobject]@{ Index = 27; Id = "explain-right"; Label = "Explain Right"; Mode = "explain-right"; Expression = "bright"; Prop = "none"; PropHand = "none" },
  [pscustomobject]@{ Index = 28; Id = "tablet"; Label = "Tablet"; Mode = "hold-left"; Expression = "focused"; Prop = "tablet"; PropHand = "left" },
  [pscustomobject]@{ Index = 29; Id = "tray"; Label = "Tray"; Mode = "tray"; Expression = "calm"; Prop = "tray"; PropHand = "right" },
  [pscustomobject]@{ Index = 30; Id = "confident"; Label = "Confident"; Mode = "confident"; Expression = "wry"; Prop = "none"; PropHand = "none" }
)

$hairStyles = @(
  [pscustomobject]@{ Id = "short-crop"; Label = "Short Crop" },
  [pscustomobject]@{ Id = "curly-fade"; Label = "Curly Fade" },
  [pscustomobject]@{ Id = "coils"; Label = "Coils" },
  [pscustomobject]@{ Id = "locs"; Label = "Locs" },
  [pscustomobject]@{ Id = "bob"; Label = "Bob" },
  [pscustomobject]@{ Id = "long-braid"; Label = "Long Braid" },
  [pscustomobject]@{ Id = "wavy-long"; Label = "Wavy Long" },
  [pscustomobject]@{ Id = "silver-sweep"; Label = "Silver Sweep" },
  [pscustomobject]@{ Id = "top-knot"; Label = "Top Knot" },
  [pscustomobject]@{ Id = "headscarf"; Label = "Headscarf" },
  [pscustomobject]@{ Id = "afro-puffs"; Label = "Afro Puffs" },
  [pscustomobject]@{ Id = "buzzcut"; Label = "Buzzcut" }
)

$featureStyles = @(
  [pscustomobject]@{ Id = "round-glasses"; Label = "Round Glasses" },
  [pscustomobject]@{ Id = "square-glasses"; Label = "Square Glasses" },
  [pscustomobject]@{ Id = "freckles"; Label = "Freckles" },
  [pscustomobject]@{ Id = "short-beard"; Label = "Short Beard" },
  [pscustomobject]@{ Id = "hearing-aid"; Label = "Hearing Aid" },
  [pscustomobject]@{ Id = "gold-earrings"; Label = "Gold Earrings" }
)

$characters = @(
  [pscustomobject]@{ Id = "zuri"; Name = "Zuri"; Role = "Fermentation mentor"; Skin = "#6f3f32"; Hair = "#17100d"; Outfit = "#27483f"; Accent = "#f0bf5a"; Pants = "#252735"; Build = "tall"; Feature = "gold-earrings"; HairStyle = "locs"; BodyFeature = "none"; Eye = "#241512" },
  [pscustomobject]@{ Id = "asha"; Name = "Asha"; Role = "Tea and study guide"; Skin = "#9b6546"; Hair = "#21110f"; Outfit = "#7c2f45"; Accent = "#f2d19b"; Pants = "#263445"; Build = "classic"; Feature = "freckles"; HairStyle = "long-braid"; BodyFeature = "none"; Eye = "#25130f" },
  [pscustomobject]@{ Id = "mateo"; Name = "Mateo"; Role = "Brewery coffee coach"; Skin = "#b87955"; Hair = "#3a1f17"; Outfit = "#1f4d5a"; Accent = "#f4a261"; Pants = "#2d2a36"; Build = "broad"; Feature = "short-beard"; HairStyle = "curly-fade"; BodyFeature = "none"; Eye = "#22110d" },
  [pscustomobject]@{ Id = "noor"; Name = "Noor"; Role = "Water and maps tutor"; Skin = "#8f654f"; Hair = "#386b7a"; Outfit = "#34524a"; Accent = "#9fdaf5"; Pants = "#242838"; Build = "classic"; Feature = "hearing-aid"; HairStyle = "headscarf"; BodyFeature = "none"; Eye = "#1d1714" },
  [pscustomobject]@{ Id = "kenji"; Name = "Kenji"; Role = "Spirits archive mentor"; Skin = "#d6a47f"; Hair = "#d8d2bf"; Outfit = "#4c3944"; Accent = "#f6c46f"; Pants = "#262a2d"; Build = "compact"; Feature = "square-glasses"; HairStyle = "silver-sweep"; BodyFeature = "none"; Eye = "#1d1816" },
  [pscustomobject]@{ Id = "elara"; Name = "Elara"; Role = "Wine map researcher"; Skin = "#f0bd92"; Hair = "#a64629"; Outfit = "#355e3b"; Accent = "#f8f1df"; Pants = "#24303f"; Build = "tall"; Feature = "freckles"; HairStyle = "bob"; BodyFeature = "none"; Eye = "#2c160f" },
  [pscustomobject]@{ Id = "kai"; Name = "Kai"; Role = "Sensory field captain"; Skin = "#7c5040"; Hair = "#12100e"; Outfit = "#613a6b"; Accent = "#66c7b7"; Pants = "#26283b"; Build = "broad"; Feature = "round-glasses"; HairStyle = "top-knot"; BodyFeature = "prosthetic-leg"; Eye = "#1b1210" },
  [pscustomobject]@{ Id = "rae"; Name = "Rae"; Role = "Coffee library strategist"; Skin = "#5f3a31"; Hair = "#0f0d0c"; Outfit = "#2f4668"; Accent = "#c8a1ff"; Pants = "#273141"; Build = "classic"; Feature = "round-glasses"; HairStyle = "coils"; BodyFeature = "mobility-chair"; Eye = "#1a100e" },
  [pscustomobject]@{ Id = "mira"; Name = "Mira"; Role = "Sensory-study mentor"; Skin = "#8f553e"; Hair = "#2a1510"; Outfit = "#1f6f72"; Accent = "#f5d7a1"; Pants = "#273141"; Build = "compact"; Feature = "gold-earrings"; HairStyle = "afro-puffs"; BodyFeature = "none"; Eye = "#241512" },
  [pscustomobject]@{ Id = "jules"; Name = "Jules"; Role = "Beer and coffee study coach"; Skin = "#c78a63"; Hair = "#5a2e1f"; Outfit = "#b85f32"; Accent = "#1f334b"; Pants = "#2a2c3b"; Build = "classic"; Feature = "round-glasses"; HairStyle = "wavy-long"; BodyFeature = "none"; Eye = "#21130f" },
  [pscustomobject]@{ Id = "santi"; Name = "Santi"; Role = "Spirits and maps archive guide"; Skin = "#b77752"; Hair = "#1f1713"; Outfit = "#2f5d4e"; Accent = "#f1d19a"; Pants = "#262a2d"; Build = "broad"; Feature = "short-beard"; HairStyle = "buzzcut"; BodyFeature = "none"; Eye = "#20120f" },
  [pscustomobject]@{ Id = "priya"; Name = "Priya"; Role = "Tea, water, and wine learning guide"; Skin = "#9f6748"; Hair = "#22110f"; Outfit = "#8c314d"; Accent = "#f8ead1"; Pants = "#293045"; Build = "tall"; Feature = "gold-earrings"; HairStyle = "long-braid"; BodyFeature = "none"; Eye = "#23140f" }
)

function Get-Layout($gesture, $character) {
  $bob = (($gesture.Index % 5) - 2) * 1.5
  $headX = 192
  $headY = 320 + $bob
  $bodyY = 420 + $bob
  $scale = 1.0
  if ($character.Build -eq "compact") { $scale = 0.93 }
  if ($character.Build -eq "tall") { $scale = 1.05 }
  if ($character.Build -eq "broad") { $scale = 1.08 }
  if ($character.BodyFeature -eq "mobility-chair") {
    $bodyY = 500 + $bob
    $headY = 335 + $bob
  }
  return [pscustomobject]@{ HeadX = $headX; HeadY = $headY; BodyY = $bodyY; Scale = $scale }
}

function Get-Arms($gesture, $layout) {
  $lShoulder = [pscustomobject]@{ X = 148; Y = $layout.BodyY + 40 }
  $rShoulder = [pscustomobject]@{ X = 236; Y = $layout.BodyY + 40 }
  $left = [pscustomobject]@{ ElbowX = 130; ElbowY = $layout.BodyY + 104; HandX = 126; HandY = $layout.BodyY + 166 }
  $right = [pscustomobject]@{ ElbowX = 254; ElbowY = $layout.BodyY + 104; HandX = 258; HandY = $layout.BodyY + 166 }

  switch ($gesture.Mode) {
    "wave" { $right = [pscustomobject]@{ ElbowX = 260; ElbowY = $layout.BodyY - 8; HandX = 284; HandY = $layout.BodyY - 92 } }
    "point" { $right = [pscustomobject]@{ ElbowX = 244; ElbowY = $layout.BodyY + 2; HandX = 262; HandY = $layout.BodyY - 104 } }
    "present-left" { $left = [pscustomobject]@{ ElbowX = 106; ElbowY = $layout.BodyY + 50; HandX = 76; HandY = $layout.BodyY + 92 } }
    "present-right" { $right = [pscustomobject]@{ ElbowX = 278; ElbowY = $layout.BodyY + 50; HandX = 310; HandY = $layout.BodyY + 92 } }
    "thumb" { $right = [pscustomobject]@{ ElbowX = 268; ElbowY = $layout.BodyY + 50; HandX = 296; HandY = $layout.BodyY + 42 } }
    "hold-right" { $right = [pscustomobject]@{ ElbowX = 268; ElbowY = $layout.BodyY + 64; HandX = 300; HandY = $layout.BodyY + 78 } }
    "hold-left" { $left = [pscustomobject]@{ ElbowX = 116; ElbowY = $layout.BodyY + 64; HandX = 84; HandY = $layout.BodyY + 78 } }
    "book-open" {
      $left = [pscustomobject]@{ ElbowX = 130; ElbowY = $layout.BodyY + 86; HandX = 138; HandY = $layout.BodyY + 128 }
      $right = [pscustomobject]@{ ElbowX = 254; ElbowY = $layout.BodyY + 86; HandX = 246; HandY = $layout.BodyY + 128 }
    }
    "book-high" {
      $left = [pscustomobject]@{ ElbowX = 130; ElbowY = $layout.BodyY + 52; HandX = 132; HandY = $layout.BodyY + 78 }
      $right = [pscustomobject]@{ ElbowX = 254; ElbowY = $layout.BodyY + 52; HandX = 252; HandY = $layout.BodyY + 78 }
    }
    "write" {
      $left = [pscustomobject]@{ ElbowX = 132; ElbowY = $layout.BodyY + 96; HandX = 146; HandY = $layout.BodyY + 126 }
      $right = [pscustomobject]@{ ElbowX = 256; ElbowY = $layout.BodyY + 96; HandX = 230; HandY = $layout.BodyY + 118 }
    }
    "think" { $right = [pscustomobject]@{ ElbowX = 252; ElbowY = $layout.BodyY + 28; HandX = 230; HandY = $layout.HeadY + 62 } }
    "question" { $left = [pscustomobject]@{ ElbowX = 112; ElbowY = $layout.BodyY + 48; HandX = 82; HandY = $layout.BodyY + 26 } }
    "cheer" {
      $left = [pscustomobject]@{ ElbowX = 116; ElbowY = $layout.BodyY + 0; HandX = 90; HandY = $layout.BodyY - 86 }
      $right = [pscustomobject]@{ ElbowX = 268; ElbowY = $layout.BodyY + 0; HandX = 294; HandY = $layout.BodyY - 86 }
    }
    "explain-left" { $left = [pscustomobject]@{ ElbowX = 110; ElbowY = $layout.BodyY + 48; HandX = 76; HandY = $layout.BodyY + 58 } }
    "explain-right" { $right = [pscustomobject]@{ ElbowX = 274; ElbowY = $layout.BodyY + 48; HandX = 308; HandY = $layout.BodyY + 58 } }
    "tray" { $right = [pscustomobject]@{ ElbowX = 268; ElbowY = $layout.BodyY + 60; HandX = 310; HandY = $layout.BodyY + 64 } }
    "confident" {
      $left = [pscustomobject]@{ ElbowX = 122; ElbowY = $layout.BodyY + 70; HandX = 154; HandY = $layout.BodyY + 102 }
      $right = [pscustomobject]@{ ElbowX = 262; ElbowY = $layout.BodyY + 70; HandX = 232; HandY = $layout.BodyY + 102 }
    }
  }

  return [pscustomobject]@{ LeftShoulder = $lShoulder; RightShoulder = $rShoulder; Left = $left; Right = $right }
}

function Draw-Arm($g, $shoulder, $arm, $jacketColor, $skinColor) {
  Draw-Line $g $shoulder.X $shoulder.Y $arm.ElbowX $arm.ElbowY $outline 24
  Draw-Line $g $arm.ElbowX $arm.ElbowY $arm.HandX $arm.HandY $outline 24
  Draw-Line $g $shoulder.X $shoulder.Y $arm.ElbowX $arm.ElbowY $jacketColor 16
  Draw-Line $g $arm.ElbowX $arm.ElbowY $arm.HandX $arm.HandY $jacketColor 16
  Fill-Ellipse $g ($arm.HandX - 10) ($arm.HandY - 9) 20 19 $skinColor 3 $outline
}

function Draw-Prop($g, [string]$prop, [float]$x, [float]$y, [float]$scale) {
  if ($prop -eq "none") { return }
  $s = $scale
  switch ($prop) {
    "wine-glass" {
      Fill-Ellipse $g ($x - 18*$s) ($y - 48*$s) (36*$s) (42*$s) $glass 4 $outline
      Fill-Ellipse $g ($x - 14*$s) ($y - 34*$s) (28*$s) (22*$s) (C "#8b1733" 210) 0
      Draw-Line $g $x ($y - 8*$s) $x ($y + 34*$s) $outline (5*$s)
      Draw-Line $g ($x - 20*$s) ($y + 36*$s) ($x + 20*$s) ($y + 36*$s) $outline (5*$s)
    }
    "wine-bottle" {
      Fill-RoundRect $g ($x - 14*$s) ($y - 58*$s) (28*$s) (80*$s) (9*$s) (C "#183a2d") 5 $outline
      Fill-RoundRect $g ($x - 9*$s) ($y - 78*$s) (18*$s) (28*$s) (5*$s) (C "#183a2d") 4 $outline
      Fill-RoundRect $g ($x - 12*$s) ($y - 18*$s) (24*$s) (24*$s) (3*$s) (C "#f8ecd1") 2 $outline
      Draw-Line $g ($x - 8*$s) ($y - 68*$s) ($x + 8*$s) ($y - 68*$s) (C "#be8b32") (4*$s)
    }
    "beer-mug" {
      Fill-RoundRect $g ($x - 22*$s) ($y - 44*$s) (40*$s) (58*$s) (8*$s) (C "#f2b84b" 230) 4 $outline
      Fill-Ellipse $g ($x - 24*$s) ($y - 54*$s) (44*$s) (18*$s) (C "#fff6dc") 3 $outline
      Fill-Ellipse $g ($x + 13*$s) ($y - 26*$s) (24*$s) (30*$s) ([System.Drawing.Color]::Transparent) 5 $outline
      Draw-Line $g ($x - 8*$s) ($y - 32*$s) ($x - 8*$s) ($y + 4*$s) (C "#ffd36f" 180) (5*$s)
    }
    "beer-pint" {
      Draw-Poly $g @(@(($x - 18*$s), ($y - 52*$s)), @(($x + 18*$s), ($y - 52*$s)), @(($x + 12*$s), ($y + 16*$s)), @(($x - 12*$s), ($y + 16*$s))) (C "#f0bd47" 220) 5 $outline
      Fill-Ellipse $g ($x - 20*$s) ($y - 60*$s) (40*$s) (16*$s) (C "#fff6dc") 2 $outline
    }
    "spirit-snifter" {
      Fill-Ellipse $g ($x - 21*$s) ($y - 43*$s) (42*$s) (38*$s) $glass 4 $outline
      Fill-Ellipse $g ($x - 15*$s) ($y - 24*$s) (30*$s) (17*$s) (C "#c27a2c" 210) 0
      Draw-Line $g $x ($y - 6*$s) $x ($y + 30*$s) $outline (4*$s)
      Draw-Line $g ($x - 17*$s) ($y + 32*$s) ($x + 17*$s) ($y + 32*$s) $outline (4*$s)
    }
    "rocks-glass" {
      Draw-Poly $g @(@(($x - 19*$s), ($y - 36*$s)), @(($x + 19*$s), ($y - 36*$s)), @(($x + 14*$s), ($y + 18*$s)), @(($x - 14*$s), ($y + 18*$s))) $glass 4 $outline
      Fill-RoundRect $g ($x - 14*$s) ($y - 10*$s) (28*$s) (22*$s) (5*$s) (C "#b86c29" 190) 0
    }
    "coffee-cup" {
      Fill-RoundRect $g ($x - 23*$s) ($y - 24*$s) (44*$s) (33*$s) (8*$s) (C "#f6f0df") 4 $outline
      Fill-Ellipse $g ($x - 20*$s) ($y - 31*$s) (40*$s) (14*$s) (C "#6f3d26") 3 $outline
      Fill-Ellipse $g ($x + 14*$s) ($y - 18*$s) (22*$s) (20*$s) ([System.Drawing.Color]::Transparent) 4 $outline
      Draw-Line $g ($x - 9*$s) ($y - 52*$s) ($x - 2*$s) ($y - 42*$s) (C "#d8d2bf" 150) (4*$s)
      Draw-Line $g ($x + 6*$s) ($y - 53*$s) ($x + 13*$s) ($y - 42*$s) (C "#d8d2bf" 150) (4*$s)
    }
    "tea-cup" {
      Fill-RoundRect $g ($x - 24*$s) ($y - 24*$s) (46*$s) (32*$s) (9*$s) (C "#dff7d8") 4 $outline
      Fill-Ellipse $g ($x - 20*$s) ($y - 31*$s) (40*$s) (14*$s) (C "#b7d37d") 3 $outline
      Fill-Ellipse $g ($x + 16*$s) ($y - 17*$s) (22*$s) (20*$s) ([System.Drawing.Color]::Transparent) 4 $outline
      Draw-Line $g ($x - 8*$s) ($y - 51*$s) ($x - 2*$s) ($y - 42*$s) (C "#d8d2bf" 150) (4*$s)
    }
    "water-glass" {
      Draw-Poly $g @(@(($x - 17*$s), ($y - 44*$s)), @(($x + 17*$s), ($y - 44*$s)), @(($x + 13*$s), ($y + 15*$s)), @(($x - 13*$s), ($y + 15*$s))) $glass 4 $outline
      Fill-RoundRect $g ($x - 13*$s) ($y - 16*$s) (26*$s) (25*$s) (4*$s) (C "#66c7ff" 150) 0
    }
    "open-book" {
      Draw-Poly $g @(@(($x - 64*$s), ($y - 31*$s)), @(($x - 4*$s), ($y - 18*$s)), @(($x - 4*$s), ($y + 38*$s)), @(($x - 64*$s), ($y + 20*$s))) $page 5 $outline
      Draw-Poly $g @(@(($x + 4*$s), ($y - 18*$s)), @(($x + 64*$s), ($y - 31*$s)), @(($x + 64*$s), ($y + 20*$s)), @(($x + 4*$s), ($y + 38*$s))) $page 5 $outline
      Draw-Line $g $x ($y - 19*$s) $x ($y + 38*$s) (C "#7c2f45") (4*$s)
      Draw-Line $g ($x - 47*$s) ($y - 12*$s) ($x - 15*$s) ($y - 5*$s) (C "#ab9d7e") (2*$s)
      Draw-Line $g ($x + 15*$s) ($y - 5*$s) ($x + 47*$s) ($y - 12*$s) (C "#ab9d7e") (2*$s)
    }
    "book" {
      Fill-RoundRect $g ($x - 54*$s) ($y - 48*$s) (108*$s) (78*$s) (8*$s) (C "#7d1f38") 5 $outline
      Fill-RoundRect $g ($x - 43*$s) ($y - 38*$s) (86*$s) (58*$s) (4*$s) $page 3 $outline
      Draw-Line $g $x ($y - 38*$s) $x ($y + 18*$s) (C "#7d1f38") (3*$s)
    }
    "notebook" {
      Fill-RoundRect $g ($x - 56*$s) ($y - 31*$s) (112*$s) (62*$s) (8*$s) (C "#f8f1df") 5 $outline
      Draw-Line $g ($x - 40*$s) ($y - 12*$s) ($x + 28*$s) ($y - 12*$s) (C "#b5a88d") (3*$s)
      Draw-Line $g ($x - 40*$s) ($y + 7*$s) ($x + 18*$s) ($y + 7*$s) (C "#b5a88d") (3*$s)
      Draw-Line $g ($x + 28*$s) ($y - 28*$s) ($x + 56*$s) ($y - 44*$s) (C "#d08f2d") (7*$s)
    }
    "clipboard" {
      Fill-RoundRect $g ($x - 32*$s) ($y - 54*$s) (64*$s) (92*$s) (8*$s) (C "#a46c39") 5 $outline
      Fill-RoundRect $g ($x - 25*$s) ($y - 40*$s) (50*$s) (66*$s) (3*$s) $page 2 $outline
      Fill-RoundRect $g ($x - 16*$s) ($y - 62*$s) (32*$s) (18*$s) (5*$s) (C "#65717d") 3 $outline
    }
    "map" {
      Draw-Poly $g @(@(($x - 54*$s), ($y - 39*$s)), @(($x - 18*$s), ($y - 25*$s)), @(($x + 18*$s), ($y - 40*$s)), @(($x + 54*$s), ($y - 26*$s)), @(($x + 54*$s), ($y + 31*$s)), @(($x + 18*$s), ($y + 17*$s)), @(($x - 18*$s), ($y + 32*$s)), @(($x - 54*$s), ($y + 18*$s))) (C "#e8d7a6") 5 $outline
      Draw-Line $g ($x - 18*$s) ($y - 25*$s) ($x - 18*$s) ($y + 32*$s) (C "#b99b66") (3*$s)
      Draw-Line $g ($x + 18*$s) ($y - 40*$s) ($x + 18*$s) ($y + 17*$s) (C "#b99b66") (3*$s)
      Draw-Line $g ($x - 43*$s) ($y + 4*$s) ($x + 42*$s) ($y - 3*$s) (C "#66a189") (4*$s)
    }
    "aroma-wheel" {
      $colors = @("#ef476f", "#f4a261", "#ffd166", "#66c7b7", "#9fdaf5", "#c8a1ff")
      for ($i = 0; $i -lt $colors.Count; $i++) {
        $angle = ($i / $colors.Count) * [Math]::PI * 2
        $cx = $x + [Math]::Cos($angle) * 20*$s
        $cy = $y + [Math]::Sin($angle) * 20*$s
        Fill-Ellipse $g ($cx - 13*$s) ($cy - 13*$s) (26*$s) (26*$s) (C $colors[$i]) 3 $outline
      }
      Fill-Ellipse $g ($x - 15*$s) ($y - 15*$s) (30*$s) (30*$s) $white 3 $outline
    }
    "corkscrew" {
      Draw-Line $g ($x - 22*$s) ($y - 28*$s) ($x + 22*$s) ($y - 28*$s) (C "#744b37") (8*$s)
      Draw-Line $g $x ($y - 25*$s) $x ($y + 29*$s) (C "#65717d") (6*$s)
      Draw-Line $g ($x - 10*$s) ($y + 4*$s) ($x + 10*$s) ($y + 16*$s) (C "#65717d") (4*$s)
      Draw-Line $g ($x + 10*$s) ($y + 16*$s) ($x - 6*$s) ($y + 28*$s) (C "#65717d") (4*$s)
    }
    "tablet" {
      Fill-RoundRect $g ($x - 39*$s) ($y - 51*$s) (78*$s) (98*$s) (10*$s) (C "#1e2735") 5 $outline
      Fill-RoundRect $g ($x - 30*$s) ($y - 40*$s) (60*$s) (73*$s) (5*$s) (C "#89d2e0") 1 (C "#89d2e0")
    }
    "tray" {
      Fill-Ellipse $g ($x - 67*$s) ($y - 18*$s) (134*$s) (28*$s) (C "#c6923d") 5 $outline
      Fill-RoundRect $g ($x - 42*$s) ($y - 48*$s) (28*$s) (38*$s) (7*$s) $glass 3 $outline
      Fill-RoundRect $g ($x + 8*$s) ($y - 48*$s) (34*$s) (38*$s) (7*$s) (C "#f2b84b") 3 $outline
    }
  }
}

function Draw-Face($g, $character, $gesture, $layout) {
  $eyeColor = C $character.Eye
  $skin = C $character.Skin
  $hx = $layout.HeadX
  $hy = $layout.HeadY
  $cheek = C "#f1a0a0" 92
  Fill-Ellipse $g ($hx - 73) ($hy - 42) 24 32 $skin 3 $outline
  Fill-Ellipse $g ($hx + 49) ($hy - 42) 24 32 $skin 3 $outline
  Fill-RoundRect $g ($hx - 64) ($hy - 78) 128 140 36 $skin 4 $outline
  Fill-Ellipse $g ($hx - 45) ($hy - 18) 26 32 $eyeColor 2 $outline
  Fill-Ellipse $g ($hx + 19) ($hy - 18) 26 32 $eyeColor 2 $outline
  Fill-Ellipse $g ($hx - 39) ($hy - 11) 7 8 (C "#ffffff") 0
  Fill-Ellipse $g ($hx + 25) ($hy - 11) 7 8 (C "#ffffff") 0
  Fill-Ellipse $g ($hx - 32) ($hy + 3) 7 5 (C "#6f4638" 120) 0
  Fill-Ellipse $g ($hx + 32) ($hy + 3) 7 5 (C "#6f4638" 120) 0
  Fill-Ellipse $g ($hx - 53) ($hy + 24) 22 10 $cheek 0
  Fill-Ellipse $g ($hx + 31) ($hy + 24) 22 10 $cheek 0
  Draw-Line $g ($hx - 48) ($hy - 30) ($hx - 22) ($hy - 32) $line 3
  Draw-Line $g ($hx + 22) ($hy - 32) ($hx + 48) ($hy - 30) $line 3
  Draw-Line $g ($hx - 2) ($hy + 10) ($hx + 3) ($hy + 21) (Darken $character.Skin 0.74) 3

  switch ($gesture.Expression) {
    "focused" { Draw-Arc $g ($hx - 19) ($hy + 31) 38 18 18 144 (C "#8f332d") 5 }
    "calm" { Draw-Arc $g ($hx - 18) ($hy + 30) 36 17 18 144 (C "#8f332d") 5 }
    "wry" { Draw-Arc $g ($hx - 19) ($hy + 31) 39 19 10 132 (C "#8f332d") 5 }
    "curious" { Fill-Ellipse $g ($hx - 9) ($hy + 33) 18 16 (C "#8f332d") 0 }
    "spark" { Fill-Ellipse $g ($hx - 18) ($hy + 32) 36 21 (C "#8f332d") 0; Fill-Ellipse $g ($hx - 11) ($hy + 40) 22 7 (C "#f4a0a5") 0 }
    default { Draw-Arc $g ($hx - 21) ($hy + 29) 42 21 14 152 (C "#8f332d") 5 }
  }
}

function Draw-Body($g, $character, $gesture, $layout) {
  $skin = C $character.Skin
  $jacket = C $character.Outfit
  $accent = C $character.Accent
  $pants = C $character.Pants
  $bodyY = $layout.BodyY
  $bodyWidth = 94 * $layout.Scale
  if ($character.Build -eq "broad") { $bodyWidth = 112 }
  if ($character.Build -eq "compact") { $bodyWidth = 86 }
  $bodyX = 192 - ($bodyWidth / 2)
  $torsoHeight = 158
  $legTop = $bodyY + 142
  $legHeight = 168
  $shoeY = $bodyY + 302

  if ($character.BodyFeature -eq "mobility-chair") {
    Fill-Ellipse $g 92 ($bodyY + 152) 78 78 ([System.Drawing.Color]::Transparent) 8 (C "#293547")
    Fill-Ellipse $g 214 ($bodyY + 152) 78 78 ([System.Drawing.Color]::Transparent) 8 (C "#293547")
    Draw-Line $g 134 ($bodyY + 183) 250 ($bodyY + 183) (C "#293547") 8
    Fill-RoundRect $g 135 ($bodyY + 132) 114 42 16 (C "#384a5f") 5 $outline
  }

  Fill-RoundRect $g ($bodyX + ($bodyWidth / 2) - 17) ($bodyY - 34) 34 38 12 $skin 4 $outline
  Fill-RoundRect $g $bodyX $bodyY $bodyWidth $torsoHeight 22 $jacket 5 $outline
  Draw-Poly $g @(@(($bodyX + 10), ($bodyY + 12)), @(($bodyX + 41), ($bodyY + 13)), @(($bodyX + 39), ($bodyY + 88))) $accent 2 $outline
  Draw-Poly $g @(@(($bodyX + $bodyWidth - 10), ($bodyY + 12)), @(($bodyX + $bodyWidth - 41), ($bodyY + 13)), @(($bodyX + $bodyWidth - 39), ($bodyY + 88))) $accent 2 $outline
  Fill-RoundRect $g ($bodyX + ($bodyWidth / 2) - 7) ($bodyY + 18) 14 95 7 (Darken $character.Outfit 0.62) 0
  Fill-Ellipse $g ($bodyX + ($bodyWidth / 2) - 4) ($bodyY + 44) 8 8 $gold 0
  Fill-Ellipse $g ($bodyX + ($bodyWidth / 2) - 4) ($bodyY + 74) 8 8 $gold 0

  $arms = Get-Arms $gesture $layout
  Draw-Arm $g $arms.LeftShoulder $arms.Left $jacket $skin
  Draw-Arm $g $arms.RightShoulder $arms.Right $jacket $skin

  if ($gesture.PropHand -eq "left") { Draw-Prop $g $gesture.Prop $arms.Left.HandX $arms.Left.HandY 1.0 }
  if ($gesture.PropHand -eq "right") { Draw-Prop $g $gesture.Prop $arms.Right.HandX $arms.Right.HandY 1.0 }
  if ($gesture.PropHand -eq "both") { Draw-Prop $g $gesture.Prop 192 ($bodyY + 118) 0.96 }

  if ($character.BodyFeature -eq "mobility-chair") {
    Fill-RoundRect $g 143 ($bodyY + 154) 39 76 12 $pants 4 $outline
    Fill-RoundRect $g 202 ($bodyY + 154) 39 76 12 $pants 4 $outline
    Fill-RoundRect $g 133 ($bodyY + 222) 56 22 8 (C "#211711") 4 $outline
    Fill-RoundRect $g 195 ($bodyY + 222) 56 22 8 (C "#211711") 4 $outline
  } else {
    Fill-RoundRect $g 151 $legTop 34 $legHeight 12 $pants 5 $outline
    Fill-RoundRect $g 199 $legTop 34 $legHeight 12 $pants 5 $outline
    if ($character.BodyFeature -eq "prosthetic-leg") {
      Fill-RoundRect $g 202 ($legTop + 15) 28 ($legHeight - 11) 9 (C "#99a7b3") 4 $outline
      Draw-Line $g 216 ($legTop + 29) 216 ($legTop + $legHeight - 21) (C "#dbe5ea") 3
    }
    Fill-RoundRect $g 135 $shoeY 57 27 10 (C "#251712") 4 $outline
    Fill-RoundRect $g 192 $shoeY 57 27 10 (C "#251712") 4 $outline
  }
}

function Add-HairShape($g, $path, $fillColor, [string]$mode) {
  if ($mode -eq "outline") {
    $pen = [System.Drawing.Pen]::new($outline, 8)
    $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    $g.DrawPath($pen, $path)
    $pen.Dispose()
    return
  }
  if ($mode -eq "fill") {
    $brush = [System.Drawing.SolidBrush]::new((C "#ffffff"))
    $g.FillPath($brush, $path)
    $brush.Dispose()
    return
  }
  Fill-Path $g $path $fillColor 8 $outline
}

function HairColorForMode([string]$hex, [string]$mode) {
  if ($mode -eq "fill") { return C "#ffffff" }
  return C $hex
}

function Draw-Hair($g, [string]$style, [string]$colorHex, $gesture, [string]$mode = "composite") {
  $layout = Get-Layout $gesture ([pscustomobject]@{ Build = "classic"; BodyFeature = "none" })
  $hx = $layout.HeadX
  $hy = $layout.HeadY
  $hair = HairColorForMode $colorHex $mode
  $state = $g.Save()
  $g.TranslateTransform($hx, $hy)
  $g.ScaleTransform(0.64, 0.64)
  $g.TranslateTransform(-$hx, -$hy)
  try {
  switch ($style) {
    "buzzcut" {
      Fill-Ellipse $g ($hx - 70) ($hy - 94) 140 82 $hair $(if ($mode -eq "composite") { 8 } else { 0 }) $outline
      if ($mode -eq "outline") { Fill-Ellipse $g ($hx - 70) ($hy - 94) 140 82 ([System.Drawing.Color]::Transparent) 8 $outline }
    }
    "short-crop" {
      Fill-Ellipse $g ($hx - 76) ($hy - 98) 152 94 $hair $(if ($mode -eq "composite") { 8 } else { 0 }) $outline
      foreach ($i in 0..5) {
        Fill-Ellipse $g ($hx - 58 + ($i * 20)) ($hy - 55 + (($i % 2) * 5)) 34 28 $hair $(if ($mode -eq "composite") { 4 } else { 0 }) $outline
      }
    }
    "curly-fade" {
      for ($i = 0; $i -lt 18; $i++) {
        $angle = ($i / 18) * [Math]::PI * 1.15 + [Math]::PI * 0.9
        $cx = $hx + [Math]::Cos($angle) * 58
        $cy = $hy - 34 + [Math]::Sin($angle) * 48
        Fill-Ellipse $g ($cx - 20) ($cy - 20) 40 40 $hair $(if ($mode -eq "composite") { 5 } else { 0 }) $outline
      }
      Fill-Ellipse $g ($hx - 56) ($hy - 94) 112 84 $hair $(if ($mode -eq "composite") { 6 } else { 0 }) $outline
    }
    "coils" {
      for ($i = 0; $i -lt 28; $i++) {
        $angle = ($i / 28) * [Math]::PI * 1.35 + [Math]::PI * 0.82
        $radius = if (($i % 3) -eq 0) { 66 } else { 54 }
        $cx = $hx + [Math]::Cos($angle) * $radius
        $cy = $hy - 28 + [Math]::Sin($angle) * 58
        Fill-Ellipse $g ($cx - 17) ($cy - 17) 34 34 $hair $(if ($mode -eq "composite") { 4 } else { 0 }) $outline
      }
    }
    "afro-puffs" {
      Fill-Ellipse $g ($hx - 105) ($hy - 72) 72 76 $hair $(if ($mode -eq "composite") { 7 } else { 0 }) $outline
      Fill-Ellipse $g ($hx + 33) ($hy - 72) 72 76 $hair $(if ($mode -eq "composite") { 7 } else { 0 }) $outline
      Fill-Ellipse $g ($hx - 67) ($hy - 101) 134 90 $hair $(if ($mode -eq "composite") { 7 } else { 0 }) $outline
    }
    "locs" {
      Fill-Ellipse $g ($hx - 70) ($hy - 98) 140 82 $hair $(if ($mode -eq "composite") { 7 } else { 0 }) $outline
      foreach ($xOff in @(-76, -60, 60, 76)) {
        Draw-Line $g ($hx + $xOff) ($hy - 43) ($hx + $xOff + (($xOff % 3) * 2)) ($hy + 86) $(if ($mode -eq "fill") { C "#ffffff" } else { $hair }) $(if ($mode -eq "outline") { 16 } else { 13 })
        if ($mode -eq "composite") { Draw-Line $g ($hx + $xOff + 4) ($hy - 35) ($hx + $xOff + 2) ($hy + 72) (C "#ffffff" 45) 3 }
      }
      foreach ($xOff in @(-43, 43)) {
        Draw-Line $g ($hx + $xOff) ($hy - 64) ($hx + $xOff) ($hy - 5) $(if ($mode -eq "fill") { C "#ffffff" } else { $hair }) $(if ($mode -eq "outline") { 14 } else { 11 })
      }
    }
    "bob" {
      Fill-Ellipse $g ($hx - 70) ($hy - 101) 140 86 $hair $(if ($mode -eq "composite") { 7 } else { 0 }) $outline
      Fill-RoundRect $g ($hx - 89) ($hy - 58) 42 132 22 $hair $(if ($mode -eq "composite") { 7 } else { 0 }) $outline
      Fill-RoundRect $g ($hx + 47) ($hy - 58) 42 132 22 $hair $(if ($mode -eq "composite") { 7 } else { 0 }) $outline
      Draw-Line $g ($hx - 50) ($hy - 42) ($hx + 44) ($hy - 56) $(if ($mode -eq "fill") { C "#ffffff" } else { $hair }) $(if ($mode -eq "outline") { 16 } else { 13 })
    }
    "long-braid" {
      Fill-Ellipse $g ($hx - 70) ($hy - 101) 140 88 $hair $(if ($mode -eq "composite") { 7 } else { 0 }) $outline
      Fill-RoundRect $g ($hx - 88) ($hy - 54) 40 124 21 $hair $(if ($mode -eq "composite") { 7 } else { 0 }) $outline
      Fill-RoundRect $g ($hx + 50) ($hy - 36) 32 92 18 $hair $(if ($mode -eq "composite") { 7 } else { 0 }) $outline
      foreach ($i in 0..4) {
        Fill-Ellipse $g ($hx + 51) ($hy + 36 + ($i * 24)) 34 34 $hair $(if ($mode -eq "composite") { 4 } else { 0 }) $outline
      }
      Fill-Ellipse $g ($hx + 58) ($hy + 158) 20 18 (C "#d9b15d") $(if ($mode -eq "composite") { 2 } else { 0 }) $outline
    }
    "wavy-long" {
      Fill-Ellipse $g ($hx - 72) ($hy - 104) 144 88 $hair $(if ($mode -eq "composite") { 7 } else { 0 }) $outline
      foreach ($xOff in @(-82, -62, 62, 82)) {
        Draw-Line $g ($hx + $xOff) ($hy - 32) ($hx + $xOff + 8) ($hy + 112) $(if ($mode -eq "fill") { C "#ffffff" } else { $hair }) $(if ($mode -eq "outline") { 18 } else { 13 })
      }
    }
    "silver-sweep" {
      Fill-Ellipse $g ($hx - 72) ($hy - 96) 144 84 $hair $(if ($mode -eq "composite") { 7 } else { 0 }) $outline
      $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
      $path.AddBezier($hx - 68, $hy - 60, $hx - 12, $hy - 135, $hx + 72, $hy - 91, $hx + 58, $hy - 30)
      $path.AddBezier($hx + 58, $hy - 30, $hx + 10, $hy - 50, $hx - 32, $hy - 32, $hx - 68, $hy - 60)
      $path.CloseFigure()
      Add-HairShape $g $path $hair $mode
      $path.Dispose()
    }
    "top-knot" {
      Fill-Ellipse $g ($hx - 68) ($hy - 90) 136 82 $hair $(if ($mode -eq "composite") { 7 } else { 0 }) $outline
      Fill-Ellipse $g ($hx - 30) ($hy - 136) 60 58 $hair $(if ($mode -eq "composite") { 7 } else { 0 }) $outline
      Draw-Line $g ($hx - 50) ($hy - 50) ($hx + 52) ($hy - 52) $(if ($mode -eq "fill") { C "#ffffff" } else { $hair }) $(if ($mode -eq "outline") { 16 } else { 12 })
    }
    "headscarf" {
      $scarf = if ($mode -eq "fill") { C "#ffffff" } else { C $colorHex }
      $scarfFill = if ($mode -eq "outline") { [System.Drawing.Color]::Transparent } else { $scarf }
      $scarfOutline = if ($mode -eq "fill") { 0 } else { 7 }
      Fill-Ellipse $g ($hx - 82) ($hy - 108) 164 92 $scarfFill $scarfOutline $outline
      Fill-RoundRect $g ($hx - 86) ($hy - 54) 42 122 19 $scarfFill $scarfOutline $outline
      Fill-RoundRect $g ($hx + 44) ($hy - 48) 42 196 19 $scarfFill $scarfOutline $outline
      Draw-Line $g ($hx - 55) ($hy - 48) ($hx + 56) ($hy - 44) $(if ($mode -eq "outline") { $outline } elseif ($mode -eq "fill") { C "#ffffff" } else { (C "#ffffff" 70) }) $(if ($mode -eq "outline") { 6 } else { 5 })
      if ($mode -eq "composite") {
        Draw-Line $g ($hx + 57) ($hy + 39) ($hx + 75) ($hy + 128) (C "#ffffff" 60) 4
      }
    }
  }
  } finally {
    $g.Restore($state)
  }
}

function Draw-Feature($g, [string]$feature, $gesture, [string]$hairColor = "#20120f") {
  $layout = Get-Layout $gesture ([pscustomobject]@{ Build = "classic"; BodyFeature = "none" })
  $hx = $layout.HeadX
  $hy = $layout.HeadY
  $state = $g.Save()
  $g.TranslateTransform($hx, $hy)
  $g.ScaleTransform(0.82, 0.82)
  $g.TranslateTransform(-$hx, -$hy)
  try {
  switch ($feature) {
    "round-glasses" {
      Fill-Ellipse $g ($hx - 52) ($hy - 24) 42 37 ([System.Drawing.Color]::Transparent) 5 $outline
      Fill-Ellipse $g ($hx + 10) ($hy - 24) 42 37 ([System.Drawing.Color]::Transparent) 5 $outline
      Draw-Line $g ($hx - 10) ($hy - 7) ($hx + 10) ($hy - 7) $outline 4
    }
    "square-glasses" {
      Fill-RoundRect $g ($hx - 56) ($hy - 24) 46 36 8 ([System.Drawing.Color]::Transparent) 5 $outline
      Fill-RoundRect $g ($hx + 10) ($hy - 24) 46 36 8 ([System.Drawing.Color]::Transparent) 5 $outline
      Draw-Line $g ($hx - 10) ($hy - 7) ($hx + 10) ($hy - 7) $outline 4
    }
    "freckles" {
      foreach ($pt in @(@(-39,18), @(-27,27), @(-18,18), @(20,18), @(31,28), @(42,19))) {
        Fill-Ellipse $g ($hx + $pt[0]) ($hy + $pt[1]) 6 5 (C "#7c4634" 170) 0
      }
    }
    "short-beard" {
      Draw-Arc $g ($hx - 27) ($hy + 18) 54 38 18 144 (C $hairColor 210) 7
      Fill-Ellipse $g ($hx - 8) ($hy + 42) 16 12 (C $hairColor 180) 0
    }
    "hearing-aid" {
      Fill-RoundRect $g ($hx + 71) ($hy - 42) 15 30 7 (C "#9fdaf5") 3 $outline
      Draw-Line $g ($hx + 78) ($hy - 14) ($hx + 65) ($hy - 4) (C "#9fdaf5") 4
    }
    "gold-earrings" {
      Fill-Ellipse $g ($hx - 76) ($hy - 40) 18 22 ([System.Drawing.Color]::Transparent) 4 $gold
      Fill-Ellipse $g ($hx + 58) ($hy - 40) 18 22 ([System.Drawing.Color]::Transparent) 4 $gold
    }
  }
  } finally {
    $g.Restore($state)
  }
}

function Draw-BaseFrame($g, $character, $gesture, [bool]$includeFeature) {
  $layout = Get-Layout $gesture $character
  Draw-Body $g $character $gesture $layout
  Draw-Face $g $character $gesture $layout
  if ($includeFeature -and $character.Feature -ne "none") {
    Draw-Feature $g $character.Feature $gesture $character.Hair
  }
}

function New-Frame($character, $gesture, [bool]$withHair, [bool]$withFeature) {
  $asset = New-Bitmap
  try {
    Draw-BaseFrame $asset.Graphics $character $gesture $withFeature
    if ($withHair) {
      Draw-Hair $asset.Graphics $character.HairStyle $character.Hair $gesture "composite"
    }
    return Normalize-LayerBitmap $asset.Bitmap
  } finally {
    $asset.Graphics.Dispose()
    $asset.Bitmap.Dispose()
  }
}

function New-HairFrame([string]$style, $gesture, [string]$mode) {
  $asset = New-Bitmap
  try {
    Draw-Hair $asset.Graphics $style "#20120f" $gesture $mode
    return Normalize-LayerBitmap $asset.Bitmap
  } finally {
    $asset.Graphics.Dispose()
    $asset.Bitmap.Dispose()
  }
}

function New-FeatureFrame([string]$feature, $gesture) {
  $asset = New-Bitmap
  try {
    Draw-Feature $asset.Graphics $feature $gesture "#20120f"
    return Normalize-LayerBitmap $asset.Bitmap
  } finally {
    $asset.Graphics.Dispose()
    $asset.Bitmap.Dispose()
  }
}

function Build-Sheet([array]$framePaths, [string]$outPath) {
  $sheet = [System.Drawing.Bitmap]::new($canvasWidth * $sheetColumns, $canvasHeight * $sheetRows, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($sheet)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::None
  $g.Clear([System.Drawing.Color]::Transparent)
  try {
    for ($i = 0; $i -lt $framePaths.Count; $i++) {
      $src = [System.Drawing.Bitmap]::new($framePaths[$i])
      try {
        $col = $i % $sheetColumns
        $row = [Math]::Floor($i / $sheetColumns)
        $g.DrawImage($src, $col * $canvasWidth, $row * $canvasHeight, $canvasWidth, $canvasHeight)
      } finally {
        $src.Dispose()
      }
    }
    Save-Png $sheet $outPath
  } finally {
    $g.Dispose()
    $sheet.Dispose()
  }
}

$manifestCharacters = @()
foreach ($character in $characters) {
  $frameDir = Join-Path $targetRoot "frames\$($character.Id)"
  $baseFrameDir = Join-Path $targetRoot "bases\frames\$($character.Id)"
  New-Item -ItemType Directory -Force -Path $frameDir, $baseFrameDir | Out-Null
  $framePaths = @()
  $baseFramePaths = @()
  $manifestFrames = @()

  foreach ($gesture in $gestures) {
    $frameNumber = "{0:D2}" -f $gesture.Index
    $basePath = Join-Path $baseFrameDir "$($character.Id)-base-gesture-$frameNumber.png"
    $finalPath = Join-Path $frameDir "$($character.Id)-gesture-$frameNumber.png"

    $baseBitmap = New-Frame $character $gesture $false $false
    try { Save-Png $baseBitmap $basePath } finally { $baseBitmap.Dispose() }

    $finalBitmap = New-Frame $character $gesture $true $true
    try { Save-Png $finalBitmap $finalPath } finally { $finalBitmap.Dispose() }

    $baseFramePaths += $basePath
    $framePaths += $finalPath
    $manifestFrames += [pscustomobject]@{
      index = $gesture.Index
      gesture = $gesture.Id
      label = $gesture.Label
      prop = $gesture.Prop
      file = "public/game/sprites/Character_Studio/frames/$($character.Id)/$($character.Id)-gesture-$frameNumber.png"
      base_file = "public/game/sprites/Character_Studio/bases/frames/$($character.Id)/$($character.Id)-base-gesture-$frameNumber.png"
    }
  }

  $sheetPath = Join-Path $targetRoot "sheets\$($character.Id)-30-gestures.png"
  $baseSheetPath = Join-Path $targetRoot "bases\sheets\$($character.Id)-base-30-gestures.png"
  Build-Sheet $framePaths $sheetPath
  Build-Sheet $baseFramePaths $baseSheetPath
  Copy-Item -LiteralPath $framePaths[0] -Destination (Join-Path $targetRoot "portraits\$($character.Id).png") -Force

  $manifestCharacters += [pscustomobject]@{
    id = $character.Id
    name = $character.Name
    role = $character.Role
    build = $character.Build
    default_hair_style = $character.HairStyle
    default_hair_color = $character.Hair
    default_feature = $character.Feature
    body_feature = $character.BodyFeature
    skin = $character.Skin
    outfit = $character.Outfit
    accent = $character.Accent
    frame_count = $frameCount
    sheet = "public/game/sprites/Character_Studio/sheets/$($character.Id)-30-gestures.png"
    base_sheet = "public/game/sprites/Character_Studio/bases/sheets/$($character.Id)-base-30-gestures.png"
    portrait = "public/game/sprites/Character_Studio/portraits/$($character.Id).png"
    frames = $manifestFrames
  }
}

$manifestHair = @()
foreach ($hairStyle in $hairStyles) {
  $maskDir = Join-Path $targetRoot "hair\masks\frames\$($hairStyle.Id)"
  $outlineDir = Join-Path $targetRoot "hair\outlines\frames\$($hairStyle.Id)"
  New-Item -ItemType Directory -Force -Path $maskDir, $outlineDir | Out-Null
  $maskPaths = @()
  $outlinePaths = @()
  $hairFrames = @()

  foreach ($gesture in $gestures) {
    $frameNumber = "{0:D2}" -f $gesture.Index
    $maskPath = Join-Path $maskDir "$($hairStyle.Id)-hair-fill-$frameNumber.png"
    $outlinePath = Join-Path $outlineDir "$($hairStyle.Id)-hair-outline-$frameNumber.png"
    $mask = New-HairFrame $hairStyle.Id $gesture "fill"
    try { Save-Png $mask $maskPath } finally { $mask.Dispose() }
    $outlineBitmap = New-HairFrame $hairStyle.Id $gesture "outline"
    try { Save-Png $outlineBitmap $outlinePath } finally { $outlineBitmap.Dispose() }
    $maskPaths += $maskPath
    $outlinePaths += $outlinePath
    $hairFrames += [pscustomobject]@{
      index = $gesture.Index
      gesture = $gesture.Id
      fill = "public/game/sprites/Character_Studio/hair/masks/frames/$($hairStyle.Id)/$($hairStyle.Id)-hair-fill-$frameNumber.png"
      outline = "public/game/sprites/Character_Studio/hair/outlines/frames/$($hairStyle.Id)/$($hairStyle.Id)-hair-outline-$frameNumber.png"
    }
  }

  $maskSheet = Join-Path $targetRoot "hair\masks\sheets\$($hairStyle.Id)-hair-fill-30-gestures.png"
  $outlineSheet = Join-Path $targetRoot "hair\outlines\sheets\$($hairStyle.Id)-hair-outline-30-gestures.png"
  Build-Sheet $maskPaths $maskSheet
  Build-Sheet $outlinePaths $outlineSheet
  $manifestHair += [pscustomobject]@{
    id = $hairStyle.Id
    label = $hairStyle.Label
    tintable = $true
    frame_count = $frameCount
    fill_sheet = "public/game/sprites/Character_Studio/hair/masks/sheets/$($hairStyle.Id)-hair-fill-30-gestures.png"
    outline_sheet = "public/game/sprites/Character_Studio/hair/outlines/sheets/$($hairStyle.Id)-hair-outline-30-gestures.png"
    frames = $hairFrames
  }
}

$manifestFeatures = @()
foreach ($feature in $featureStyles) {
  $featureDir = Join-Path $targetRoot "features\frames\$($feature.Id)"
  New-Item -ItemType Directory -Force -Path $featureDir | Out-Null
  $featurePaths = @()
  $featureFrames = @()
  foreach ($gesture in $gestures) {
    $frameNumber = "{0:D2}" -f $gesture.Index
    $featurePath = Join-Path $featureDir "$($feature.Id)-feature-$frameNumber.png"
    $featureBitmap = New-FeatureFrame $feature.Id $gesture
    try { Save-Png $featureBitmap $featurePath } finally { $featureBitmap.Dispose() }
    $featurePaths += $featurePath
    $featureFrames += [pscustomobject]@{
      index = $gesture.Index
      gesture = $gesture.Id
      file = "public/game/sprites/Character_Studio/features/frames/$($feature.Id)/$($feature.Id)-feature-$frameNumber.png"
    }
  }
  $featureSheet = Join-Path $targetRoot "features\sheets\$($feature.Id)-feature-30-gestures.png"
  Build-Sheet $featurePaths $featureSheet
  $manifestFeatures += [pscustomobject]@{
    id = $feature.Id
    label = $feature.Label
    frame_count = $frameCount
    sheet = "public/game/sprites/Character_Studio/features/sheets/$($feature.Id)-feature-30-gestures.png"
    frames = $featureFrames
  }
}

$manifest = [pscustomobject]@{
  version = 5
  generator = "scripts/generate-character-studio-sprites.ps1"
  source_reference_folder = "public/game/sprites/characters"
  video_reference = "public/game/sprites/Character_Studio/reference/Duolingo Character Creation.mp4"
  target_folder = "public/game/sprites/Character_Studio"
  frame_size = [pscustomobject]@{ width = $canvasWidth; height = $canvasHeight }
  sheet_grid = [pscustomobject]@{ columns = $sheetColumns; rows = $sheetRows; frames = $frameCount }
  layering = [pscustomobject]@{
    order = @("base_frame", "hair_fill_mask_tinted", "hair_outline", "feature_overlay")
    anchor = "same 384x768 canvas for every frame and layer"
    layer_scale_x = $layerScaleX
  }
  art_direction = "Sippy/Roma-proportioned 16-bit human sprites with grounded feet, softer dark catchlight eyes, shorter necks, and less paper-doll facial geometry."
  gestures = $gestures | ForEach-Object {
    [pscustomobject]@{ index = $_.Index; id = $_.Id; label = $_.Label; prop = $_.Prop }
  }
  characters = $manifestCharacters
  hair_styles = $manifestHair
  feature_overlays = $manifestFeatures
}

$manifestPath = Join-Path $targetRoot "manifests\character-studio-manifest.json"
$manifest | ConvertTo-Json -Depth 9 | Set-Content -LiteralPath $manifestPath -Encoding UTF8

$readme = @"
# Character Studio Sprites

Deterministic modular sprite set for the Sip Studies avatar/game ecosystem.

## Contents

- `frames/<character>/`: final transparent 384x768 character frames with default hair and feature overlays.
- `sheets/`: final 6-by-5 character sheets, 30 gestures each.
- `bases/`: no-hair base frames and sheets for modular composition.
- `hair/masks/`: tintable hair fill masks aligned to the same 30 gesture frames.
- `hair/outlines/`: matching hair outline layers.
- `features/`: optional facial/accessory overlays aligned to the same gesture grid.
- `portraits/`: frame-01 character previews.
- `manifests/character-studio-manifest.json`: full layer, frame, gesture, and metadata registry.

## Cast

- `zuri`: fermentation mentor with locs.
- `asha`: tea and study guide with a long braid.
- `mateo`: brewery coffee coach with a curly fade and short beard.
- `noor`: water and maps tutor with a headscarf and hearing aid.
- `kenji`: spirits archive mentor with silver swept hair and square glasses.
- `elara`: wine map researcher with bob hair and freckles.
- `kai`: sensory field captain with a top knot, round glasses, and prosthetic leg.
- `rae`: coffee library strategist with coils and a mobility chair.
- `mira`: sensory-study mentor with afro puffs and earrings.
- `jules`: beer and coffee study coach with wavy hair and round glasses.
- `santi`: spirits and maps archive guide with a buzzcut and short beard.
- `priya`: tea, water, and wine guide with a long braid and earrings.

Every layer shares a fixed 384x768 canvas, so hair styles and feature overlays can be exchanged without re-slicing or manual alignment.
"@

$readme | Set-Content -LiteralPath (Join-Path $targetRoot "README.md") -Encoding UTF8

[pscustomobject]@{
  Characters = $characters.Count
  CharacterFrames = $characters.Count * $frameCount
  HairStyles = $hairStyles.Count
  HairLayerFrames = $hairStyles.Count * $frameCount * 2
  FeatureOverlays = $featureStyles.Count
  FeatureFrames = $featureStyles.Count * $frameCount
  Manifest = $manifestPath
} | ConvertTo-Json
