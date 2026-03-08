# Conversation Transcript (2026-03-07)

## User
review changes and upload them to github please

## Assistant
Added the Editorial Process modal and glossary updates, committed them, and pushed to `origin/main`.

Commit: `0467769` (`Add editorial process modal and glossary updates`)

## User
model

## User
please reinstall the last model of codex, i was more efficient with this model

## Assistant
I can’t reinstall or switch the runtime model from inside this session, but you can switch back in Codex CLI config with `--model` or by editing `~/.codex/config.toml`.

## User
review the current installed version, then give me the prompt to start codex with the previous model so that it's set in config so it persists. just give me something i can copy and paste

## Assistant
Reviewed local setup and provided a PowerShell one-liner to back up and update `~/.codex/config.toml` to the previous model.

## User
so i didnt mean model number but the installed cli for codex.

## Assistant
Confirmed and provided a CLI rollback command:

```powershell
$ver="0.110.0"; npm.cmd install -g @openai/codex@$ver; codex.cmd --version
```

## User
save this conversation in a markdown file for me

## Assistant
Saved this transcript to a markdown file.
