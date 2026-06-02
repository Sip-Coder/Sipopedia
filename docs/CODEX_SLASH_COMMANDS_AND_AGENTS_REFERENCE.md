# Codex Slash Commands And Agents Reference

Last updated: 2026-06-02

## Quick Mental Model

Slash commands are Codex control buttons. Type `/` in the composer, choose a command, and press Enter.

The most important distinction:

- `AGENTS.md` is the instruction file Codex reads before work starts.
- Custom subagents are specialized worker roles, usually defined as TOML files.
- `/agent` switches between active spawned subagent threads.
- `/personality` changes Codex's communication tone, not its job role.

## Agent Setup

There is no documented `/agents` command. The documented command is `/agent`, singular.

Do not create separate repositories just for agent personalities. Use separate agent files instead.

Use personal agents when you want them available across all repositories:

```text
~/.codex/agents/reviewer.toml
~/.codex/agents/explorer.toml
```

Use project agents when they should live with a specific repository:

```text
your-repo/
  AGENTS.md
  .codex/
    agents/
      reviewer.toml
      tester.toml
      researcher.toml
```

Example custom agent:

```toml
name = "reviewer"
description = "Reviews code for correctness, security, regressions, and missing tests."
developer_instructions = """
Review code like a senior maintainer.
Prioritize bugs, behavior regressions, security risks, and missing tests.
Return findings first with file references.
"""
model_reasoning_effort = "high"
```

Then ask Codex to use agents in plain language:

```text
Spawn one reviewer agent for correctness and one tester agent for test gaps. Wait for both, then summarize.
```

Codex only spawns subagents when explicitly asked. Subagents use more tokens because each worker performs its own model and tool work.

## `/agent`

`/agent` is for managing spawned subagent threads.

Use it when:

- multiple agents are running
- you want to inspect what one worker is doing
- you want to continue, steer, or close a specific worker thread

It does not create repo instructions and it does not define a personality by itself.

## `AGENTS.md`

`AGENTS.md` is durable guidance for Codex. It is loaded before work starts.

Use it for:

- repo structure
- build and test commands
- coding style
- review expectations
- security rules
- folders to avoid
- validation steps to run before finishing

Codex reads global guidance first, then repo guidance, then more specific nested guidance closer to the current directory.

Typical locations:

```text
~/.codex/AGENTS.md
your-repo/AGENTS.md
your-repo/special-area/AGENTS.md
```

## `/init`

`/init` creates a starter `AGENTS.md` in the current directory.

It is not a subagent setup command. It is an instruction-file setup command.

Use `/init` when:

- a repository does not have Codex instructions yet
- you want Codex to scaffold a starting point
- you want durable project rules instead of repeating them in every chat

After running `/init`, edit the result so it matches the real repo. The generated file should become practical guidance, not generic filler.

In this repository, the reference file already exists:

```text
AGENTS.md
```

## `/vim`

`/vim` toggles Vim-style editing in the Codex composer.

It affects the message box where you type prompts. It does not make Codex edit your project files in Vim.

Use it if you already like Vim navigation and want faster editing for long prompts.

Skip it if Vim modes slow you down.

To make Vim mode the default for new sessions:

```toml
[tui]
vim_mode_default = true
```

Workflow effect:

- Normal composer mode feels like a regular text box.
- Vim mode gives you Vim-style normal and insert behavior.
- It is most useful when writing, revising, and navigating long prompts.

## `/side` And `/btw`

`/side` and `/btw` start an ephemeral side conversation.

Use them for a small question that should not redirect the main task.

Example:

```text
/btw explain what that error means in plain English
```

Comparison:

| Tool | Meaning | Use It When |
| --- | --- | --- |
| Queue | Line up the next message or slash command while Codex is busy. | "After this finishes, run `/diff`." |
| Steering | Change the direction or constraints of the main task. | "Actually avoid changing Supabase." |
| `/side` or `/btw` | Ask a focused side question without changing the main mission. | "Quickly explain what Vite is doing." |

Simple rule:

- Queue means "do this next."
- Steering means "change the mission."
- Side chat means "answer this without changing the mission."

## Daily Power Set

These are the slash commands worth remembering first:

- `/status`: check model, context, permissions, and session state
- `/model`: switch models
- `/permissions`: change what Codex can do without asking
- `/plan`: ask for a plan before implementation
- `/goal`: set a persistent mission
- `/review`: review code changes
- `/diff`: inspect changes
- `/compact`: summarize a long chat to save context
- `/mention`: point Codex at a file or folder
- `/skills`: load a task-specific workflow
- `/agent`: inspect spawned worker threads
- `/vim`: toggle Vim composer editing
- `/side` or `/btw`: ask a small side question

