$ErrorActionPreference = "Continue"

$Root = "C:\codebase"
$ToolRoot = Join-Path $Root "tools"
$GitEnv = Join-Path $ToolRoot "git-env.ps1"
if (Test-Path -LiteralPath $GitEnv) {
  . $GitEnv
}

$worktrees = @(
  @{ Name = "main/reference"; Path = Join-Path $Root "sipopedia" },
  @{ Name = "codex"; Path = Join-Path $Root "sipopedia-codex" },
  @{ Name = "openclaw"; Path = Join-Path $Root "sipopedia-openclaw" }
)

Write-Host "GitHub CLI auth:"
if (Get-Command gh -ErrorAction SilentlyContinue) {
  $authStatus = gh auth status 2>&1
  if ($LASTEXITCODE -eq 0) {
    $authStatus | ForEach-Object { Write-Host $_ }
  } else {
    Write-Host "Not logged in. Run gh auth login from an interactive shell."
  }
} else {
  Write-Host "gh is not on PATH. Run C:\codebase\tools\git-env.ps1 if available."
}

Write-Host ""
Write-Host "Team control:"
Write-Host "  C:\codebase\tools\sipopedia-control.ps1 -Mode Status"
Write-Host "  C:\codebase\tools\sipopedia-control.ps1 -Mode Next"
Write-Host "  C:\codebase\tools\sipopedia-control.ps1 -Mode Auth"
Write-Host "  C:\codebase\tools\sipopedia-control.ps1 -Mode Outbox"
Write-Host "  C:\codebase\tools\sipopedia-control.ps1 -Mode Ping -To OpenClaw -From Codex -Summary ""<message>"""
Write-Host "  C:\codebase\tools\sipopedia-control.ps1 -Mode Telegram -Group Sipopedia -Account clawdius -Summary ""<message>"""

foreach ($worktree in $worktrees) {
  Write-Host ""
  Write-Host ("== {0}: {1} ==" -f $worktree.Name, $worktree.Path)
  if (-not (Test-Path -LiteralPath $worktree.Path)) {
    Write-Host "Missing"
    continue
  }

  git -C $worktree.Path status --short --branch
  git -C $worktree.Path lfs status
}
