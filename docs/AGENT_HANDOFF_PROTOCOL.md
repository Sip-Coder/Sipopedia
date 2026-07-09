# Agent Handoff Protocol

Use this when Codex, OpenClaw, or the user needs to ping another agent about Sipopedia work.

## Delivery Channels

Preferred human channel:

```text
Telegram, when the current runtime exposes a logged-in Telegram app or browser session.
```

Current Windows VM fallback:

```text
GitHub PR comments
Codex lane: https://github.com/Sip-Coder/Sipopedia/pull/2
OpenClaw lane: https://github.com/Sip-Coder/Sipopedia/pull/1
```

Codex cannot send Telegram messages from this VM unless a Telegram connector, logged-in controllable browser, or controllable Telegram Desktop session is exposed. When Telegram is unavailable, use the GitHub PR comments as the durable shared channel.

## Generate A Bot-Style Ping

Preferred from anywhere on the Windows VM:

```powershell
C:\codebase\tools\sipopedia-control.ps1 -Mode Ping -To OpenClaw -From Codex -Summary "Use C:\codebase\sipopedia-openclaw for Sipopedia edits. Application Demo is not the repo."
```

Lower-level form from any Sipopedia worktree:

```powershell
powershell -File .\tools\agent-handoff.ps1 -Recipient OpenClaw -From Codex -Summary "Use C:\codebase\sipopedia-openclaw for Sipopedia edits. Application Demo is not the repo."
```

With paths:

```powershell
powershell -File .\tools\agent-handoff.ps1 -Recipient OpenClaw -From Codex -Summary "Audit missing pages" -Paths "src\App.tsx","src\components"
```

If GitHub CLI is authenticated, add `-Post` to either command to publish the ping to the target lane PR.

## Message Rules

- State the recipient, sender, timestamp, repo lane, branch, and PR.
- State the exact folder to work in.
- Say explicitly that `Application Demo` is not the Sipopedia website repo when correcting workspace confusion.
- Include startup commands and the handoff files to read.
- Include paths being claimed or discussed.
- Keep the message short enough to paste into Telegram, GitHub, or another bot chat.
