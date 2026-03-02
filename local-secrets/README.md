# Local Secrets

Put private keys in this folder.

## Safe file to create locally

Create `local-secrets/.env` and store keys like:

```env
OPENAI_API_KEY=your_key_here
```

`local-secrets/.env` will not be tracked by git.

## Quick load in PowerShell (current terminal only)

```powershell
Get-Content .\local-secrets\.env | ForEach-Object {
  if ($_ -match '^\s*#' -or $_ -match '^\s*$') { return }
  $name, $value = $_ -split '=', 2
  Set-Item -Path "Env:$name" -Value $value
}
```
