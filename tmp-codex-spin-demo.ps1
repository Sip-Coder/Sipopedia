$esc = [char]27
$frames = @(
"   .-''''-.`n /  .--.  \`n|  /    \  |`n|  \    /  |`n \  '--'  /`n   '-..-'",
"   .-''''-.`n /  .--.  \`n|  /\\    | |`n| |  \\/\\ | |`n \  '--'  /`n   '-..-'",
"   .-''''-.`n /  .--.  \`n|  \    /  |`n|  /    \  |`n \  '--'  /`n   '-..-'",
"   .-''''-.`n /  .--.  \`n| | /\\/  | |`n| |    /\\| |`n \  '--'  /`n   '-..-'"
)
$end = (Get-Date).AddSeconds(20)
$i = 0
while ((Get-Date) -lt $end) {
  $f = $frames[$i % $frames.Count]
  Write-Host -NoNewline "$esc[H$esc[2J$f`n`nCodex-style spin demo (real terminal window)"
  Start-Sleep -Milliseconds 120
  $i++
}