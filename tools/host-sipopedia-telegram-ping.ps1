[CmdletBinding()]
param(
    [ValidateSet('Sipopedia', 'SipStudies', 'PhysicalHealth', 'ProfessionalHealth', 'SocialHealth', 'FamilyHealth')]
    [string]$Group = 'Sipopedia',

    [string]$Target,

    [ValidateSet('clawdius', 'roma', 'sippy', 'hummin')]
    [string]$Account = 'clawdius',

    [Parameter(Mandatory = $true)]
    [string]$Message,

    [switch]$DryRun,

    [string]$WindowsVm = 'Windows 11 - Design',
    [string]$WindowsUser = 'RomaS',
    [string]$PasswordFile = 'C:\codebase\Repos\OpenClaw\secrets\windows-vm-password.txt',
    [string]$VBoxManage = 'C:\Program Files\Oracle\VirtualBox\VBoxManage.exe',
    [int]$TimeoutMs = 120000
)

$ErrorActionPreference = 'Stop'

$knownTargets = @{
    Sipopedia          = '-1004310159054'
    SipStudies         = '-1003975491397'
    PhysicalHealth     = '-1004406693492'
    ProfessionalHealth = '-1003737016625'
    SocialHealth       = '-1003619396801'
    FamilyHealth       = '-1004358045539'
}

if (-not $Target) {
    $Target = $knownTargets[$Group]
}

if (-not (Test-Path -LiteralPath $VBoxManage)) {
    throw "VBoxManage not found: $VBoxManage"
}

if (-not (Test-Path -LiteralPath $PasswordFile)) {
    throw "Windows VM password file not found: $PasswordFile"
}

$vmInfo = & $VBoxManage showvminfo $WindowsVm --machinereadable 2>&1
if ($LASTEXITCODE -ne 0) {
    throw "Could not inspect VM '$WindowsVm': $($vmInfo -join "`n")"
}

if (($vmInfo -join "`n") -notmatch 'VMState="running"') {
    throw "VM '$WindowsVm' is not running. Run Claws first, then retry."
}

$messageBytes = [Text.Encoding]::UTF8.GetBytes($Message)
$messageBase64 = [Convert]::ToBase64String($messageBytes)
$dryRunLiteral = if ($DryRun) { '$true' } else { '$false' }

$guestScript = @"
`$ErrorActionPreference = 'Stop'
`$message = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('$messageBase64'))
`$openclaw = 'C:\Codebase\Tools\bin\openclaw.cmd'
if (-not (Test-Path -LiteralPath `$openclaw)) {
    throw "OpenClaw CLI not found: `$openclaw"
}
`$args = @('message', 'send', '--channel', 'telegram', '--account', '$Account', '--target', '$Target', '--message', `$message, '--json')
if ($dryRunLiteral) {
    `$args += '--dry-run'
}
& `$openclaw @args
if (`$LASTEXITCODE -ne 0) {
    exit `$LASTEXITCODE
}
"@

$encodedGuestScript = [Convert]::ToBase64String([Text.Encoding]::Unicode.GetBytes($guestScript))
$powershellExe = 'C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe'

Write-Host "Sending Telegram message through OpenClaw guest account '$Account' to '$Target'." -ForegroundColor Cyan
if ($DryRun) {
    Write-Host "Dry run enabled; Telegram will not receive a message." -ForegroundColor Yellow
}

& $VBoxManage guestcontrol $WindowsVm run `
    --exe $powershellExe `
    --username $WindowsUser `
    --passwordfile $PasswordFile `
    --wait-stdout `
    --wait-stderr `
    --timeout $TimeoutMs `
    -- `
    -NoProfile `
    -ExecutionPolicy Bypass `
    -EncodedCommand $encodedGuestScript

if ($LASTEXITCODE -ne 0) {
    throw "Telegram ping failed through VM '$WindowsVm' with exit code $LASTEXITCODE."
}
