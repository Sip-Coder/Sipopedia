# Resume Build Runbook

This runbook documents how the Sip Studies resume files are built, where the source material comes from, and how to update the outputs in the future.

## Current Outputs

All generated resume outputs and assets now live under:

- `C:\codebase\sip_studies\me\resume\`

Current V4 Critical On Hand resume:

- `resume/JONATHAN_YU_SIP_STUDIES_COMBINED_RESUME_V4_CRITICAL_ON_HAND_2026-06-02.md`
- `resume/JONATHAN_YU_SIP_STUDIES_COMBINED_RESUME_V4_CRITICAL_ON_HAND_2026-06-02.pdf`
- `resume/JONATHAN_YU_SIP_STUDIES_COMBINED_RESUME_V4_CRITICAL_ON_HAND_2026-06-02_LETTER_8.5x11.pdf`
- `resume/JONATHAN_YU_SIP_STUDIES_COMBINED_RESUME_V4_CRITICAL_ON_HAND_2026-06-02.docx`
- `resume/JONATHAN_YU_SIP_STUDIES_COMBINED_RESUME_V4_CRITICAL_ON_HAND_2026-06-02_AFFINITY_SOURCE.svg`

Current V4 generator:

- `V4-Exp/scripts/create-combined-resume-v4-critical-on-hand.mjs`

Primary print-legibility one-page resume:

- `docs/resume/JON_YU_SIP_STUDIES_COMBINED_RESUME_V3_ONE_PAGE_PRINT_2026-05-25.md`
- `docs/resume/JON_YU_SIP_STUDIES_COMBINED_RESUME_V3_ONE_PAGE_PRINT_2026-05-25.pdf`
- `docs/resume/JON_YU_SIP_STUDIES_COMBINED_RESUME_V3_ONE_PAGE_PRINT_2026-05-25_LETTER_8.5x11.pdf`
- `docs/resume/JON_YU_SIP_STUDIES_COMBINED_RESUME_V3_ONE_PAGE_PRINT_2026-05-25.docx`
- `docs/resume/JON_YU_SIP_STUDIES_COMBINED_RESUME_V3_ONE_PAGE_PRINT_2026-05-25_AFFINITY_SOURCE.svg`

Earlier one-page v2 resume:

- `docs/resume/JON_YU_SIP_STUDIES_COMBINED_RESUME_V2_ONE_PAGE_2026-05-25.md`
- `docs/resume/JON_YU_SIP_STUDIES_COMBINED_RESUME_V2_ONE_PAGE_2026-05-25.pdf`
- `docs/resume/JON_YU_SIP_STUDIES_COMBINED_RESUME_V2_ONE_PAGE_2026-05-25_LETTER_8.5x11.pdf`
- `docs/resume/JON_YU_SIP_STUDIES_COMBINED_RESUME_V2_ONE_PAGE_2026-05-25.docx`
- `docs/resume/JON_YU_SIP_STUDIES_COMBINED_RESUME_V2_ONE_PAGE_2026-05-25_AFFINITY_SOURCE.svg`

Generator:

- `scripts/create-combined-resume-one-page-v3.mjs`
- `scripts/create-combined-resume-one-page-v2.mjs`

Older two-page combined resume:

- `docs/resume/JON_YU_SIP_STUDIES_COMBINED_RESUME_2026-05-25.md`
- `docs/resume/JON_YU_SIP_STUDIES_COMBINED_RESUME_2026-05-25.pdf`
- `docs/resume/JON_YU_SIP_STUDIES_COMBINED_RESUME_2026-05-25.docx`
- `docs/resume/JON_YU_SIP_STUDIES_COMBINED_RESUME_2026-05-25_AFFINITY_SOURCE.svg`

Older generator:

- `scripts/create-combined-resume-files.mjs`

## Source Material

The combined resume uses four source groups:

1. Public resume page:
   - `https://www.sipstudies.com/resume`
   - Used for formal experience history, education, certifications, Breakthru results, Total Wine work, AARP teaching, On Location, Video Tech Services, and architecture/design roles.

2. Public About page:
   - `https://www.sipstudies.com/about`
   - Used for founder positioning, beverage/AI focus areas, and additional certifications such as MIT AI, Certified Sherry Wine Specialist, and Cicerone Certified Beer Server.

3. Sip Studies repo documentation:
   - `README.md`
   - `docs/ARCHITECTURE.md`
   - `docs/WEBSITE_SPEC.md`
   - `AGENTS.md`
   - Used for product scope, tech stack, Supabase/Stripe/Edge Function architecture, terminology workflow, and validation language.

4. Local resume asset pack:
   - `docs/resume/resume-assets/`
   - Used for the logo, Sippy, Roma, Hummin, and visual context images.

5. Critical On Hand workbook evidence:
   - `C:\Users\TwoKn\Desktop\Critical on hand 9-16\Critical On Hand - Gap Analysis TEST 06.xlsx`
   - `C:\Users\TwoKn\Desktop\Critical on hand 9-16\Critical On Hand - Gap Analysis.xlsx`
   - Structural inspection report: `V4-Exp/research/2026-06-02-critical-on-hand-workbook-structure.md`
   - Used for POD gap analysis, on-hand inventory, days on hand, sales movement, incentives, account opportunity, and team-support language. Raw customer rows should not be reproduced in resume/application materials.

## Current Resume Assets

Primary one-page v2 generator currently uses:

- `docs/resume/resume-assets/signature-jonathan-yu-cream-on-teal.jpg`
- `docs/resume/resume-assets/sip-studies-logo-03-light.jpg`
- `docs/resume/resume-assets/sippy-guide.jpg`
- `docs/resume/resume-assets/roma-guide.jpg`
- `docs/resume/resume-assets/hummin-coffee-02.jpg`
- `docs/resume/resume-assets/academy-realm.jpg`

Current branding rule:

- The resume header should read as Jonathan Yu, not Sip Studies.
- Use the Jonathan Yu signature/header treatment for the global document identity.
- Keep the Sip Studies logo contextual to the Sip Studies experience entry or portfolio proof area.
- Use other company/certification marks only where they support the relevant experience or credential section.

The original user-provided PNG assets are preserved:

- `docs/resume/resume-assets/Sip Studies Logo 03 - Light.png`
- `docs/resume/resume-assets/Hummin - Coffee 02.png`

JPEG derivatives are used because the custom PDF and SVG generators embed JPEGs directly:

- `docs/resume/resume-assets/sip-studies-logo-03-light.jpg`
- `docs/resume/resume-assets/hummin-coffee-02.jpg`

## How To Update Text

Edit this file:

```powershell
V4-Exp\scripts\create-combined-resume-v4-critical-on-hand.mjs
```

Most resume content is near the top inside the `data` object:

- `profile`
- `certs`
- `skills`
- `focusAreas`
- `jobs`
- `education`
- `outcomes`

After editing, regenerate the outputs:

```powershell
node .\V4-Exp\scripts\create-combined-resume-v4-critical-on-hand.mjs
```

## How To Update Images

1. Add the new image to:

```powershell
docs\resume\resume-assets\
```

2. If the image is PNG or WebP, create a JPEG derivative for the generator.

Example PowerShell pattern:

```powershell
Add-Type -AssemblyName System.Drawing
$src = Resolve-Path "docs\resume\resume-assets\New Image.png"
$dest = "docs\resume\resume-assets\new-image.jpg"
$img = [System.Drawing.Image]::FromFile($src)
try {
  $bmp = New-Object System.Drawing.Bitmap $img.Width, $img.Height
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  try {
    $g.Clear([System.Drawing.ColorTranslator]::FromHtml("#F8F4EA"))
    $g.DrawImage($img, 0, 0, $img.Width, $img.Height)
    $bmp.Save($dest, [System.Drawing.Imaging.ImageFormat]::Jpeg)
  } finally {
    $g.Dispose()
    $bmp.Dispose()
  }
} finally {
  $img.Dispose()
}
```

3. Update the `assets` object in:

```powershell
scripts/create-combined-resume-one-page-v3.mjs
```

4. Regenerate:

```powershell
node .\scripts\create-combined-resume-one-page-v3.mjs
```

## How To Verify Outputs

Run this quick check after regeneration:

```powershell
$bytes = [System.IO.File]::ReadAllBytes((Resolve-Path docs\resume\JON_YU_SIP_STUDIES_COMBINED_RESUME_V3_ONE_PAGE_PRINT_2026-05-25.pdf))
$text = [System.Text.Encoding]::ASCII.GetString($bytes)
[pscustomobject]@{
  Header = $text.Substring(0, 8)
  PageObjects = ([regex]::Matches($text, '/Type /Page /Parent')).Count
  ImageObjects = ([regex]::Matches($text, '/Subtype /Image')).Count
  HasEof = $text.TrimEnd().EndsWith('%%EOF')
  Bytes = $bytes.Length
}
```

Expected for the current one-page resume:

- `Header`: `%PDF-1.4`
- `PageObjects`: `1`
- `ImageObjects`: `5`
- `HasEof`: `True`

Verify the Word package:

```powershell
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead((Resolve-Path docs\resume\JON_YU_SIP_STUDIES_COMBINED_RESUME_V3_ONE_PAGE_PRINT_2026-05-25.docx))
try {
  [pscustomobject]@{
    HasDocument = [bool]($zip.Entries | Where-Object FullName -eq 'word/document.xml')
    HasStyles = [bool]($zip.Entries | Where-Object FullName -eq 'word/styles.xml')
    MediaCount = ($zip.Entries | Where-Object { $_.FullName -match '^word/media/' }).Count
  }
} finally {
  $zip.Dispose()
}
```

## Affinity Designer Notes

The file ending in `_AFFINITY_SOURCE.svg` is the editable source for Affinity Designer:

```powershell
docs\resume\JON_YU_SIP_STUDIES_COMBINED_RESUME_V3_ONE_PAGE_PRINT_2026-05-25_AFFINITY_SOURCE.svg
```

Open the SVG in Affinity Designer, then save it as a native `.afdesign` file.

Do not claim a native `.afdesign` was generated by script unless Affinity adds a documented CLI export path. The current workflow intentionally uses SVG as the editable interchange format.

## Refreshing Website Source Material

If the public resume or About pages change, refresh the source text with:

```powershell
$r = Invoke-WebRequest -Uri "https://www.sipstudies.com/resume" -UseBasicParsing -MaximumRedirection 5 -TimeoutSec 30
$content = $r.Content
[regex]::Matches($content, '<p class="[^"]*"[^>]*>(.*?)</p>', 'Singleline') | ForEach-Object {
  $txt = $_.Groups[1].Value `
    -replace '<br\s*/?>', "`n" `
    -replace '<[^>]+>', '' `
    -replace '&amp;', '&' `
    -replace '&mdash;', '-' `
    -replace '&nbsp;', ' '
  $txt = [System.Net.WebUtility]::HtmlDecode($txt).Trim()
  if ($txt) { $txt }
}
```

Repeat with:

```powershell
https://www.sipstudies.com/about
```

Then manually fold the useful changes into the `data` object in the generator.

## Design Notes

- Keep the primary v3 print resume to one page.
- Use the left sidebar for certifications, skills, focus areas, education, Jonathan Yu signature identity, and character imagery.
- Use the main right column for profile, experience, and outcomes.
- Do not place the Sip Studies logo in the global resume header; it should appear only inside the Sip Studies experience context.
- Preserve quantified proof where possible:
  - `3,500+ placements`
  - `$2.291M wine revenue lift`
  - `Weekly Critical On Hand POD gap analysis tool`
  - `45,542-row inventory reference file`
  - `20,000 Sipopedia candidate rows`
  - `69 Supabase migrations + 5 Edge Functions`
  - `$4.5M strategic acquisition thesis`
- Keep source language honest: candidate rows and buyer valuation are strategic/product artifacts, not completed revenue unless separately verified.
