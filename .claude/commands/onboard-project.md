---
description: "Read a project (or the current directory) and produce a structured summary: what it does, tech stack, directory layout, key commands, entry points, and where to start adding features. Optionally writes the result to start.md. Use when the user says 'read this project', 'onboard me', 'what is this project', 'summarize the codebase', or similar."
argument-hint: "[<path>] — optional project root; defaults to current directory"
---

# Onboard Project

You are analyzing the project at **$ARGUMENTS** (or the current directory if none given).

**Do NOT modify any code.** This is a read-only exploration.

## Procedure

1. **Discover the project root** — if an argument was given, `cd` into it; otherwise use the working directory.
2. **Read the top-level files** — `README.md`, `package.json`, `go.mod`, `Cargo.toml`, `pyproject.toml`, `Makefile`, `docker-compose.yml`, or whatever build/config files exist. Identify the primary language and framework.
3. **Map the directory tree** — run `find . -maxdepth 3 -type f | head -80` or equivalent to understand the layout. Note the key directories and what they contain.
4. **Identify entry points** — main source files, route definitions, index files, CLI entry points.
5. **Find build / dev / test commands** — look in `package.json` scripts, `Makefile` targets, `justfile`, `Taskfile`, `pyproject.toml` scripts, or equivalent.
6. **Identify the tech stack** — languages, frameworks, major libraries, database, ORM, deployment target.
7. **Note any obvious maintenance risks** — large files, deprecated patterns, missing tests, circular dependencies you spot.

## Output

Produce a structured summary in this exact format:

```markdown
# <Project Name> — Onboarding Summary

## What It Does
<1-3 sentence description of the project's purpose>

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Language | ... |
| Framework | ... |
| Database | ... |
| etc. | ... |

## Directory Layout
< Concise description of what each top-level and key subdirectory does >

## Key Commands
| Command | What it does |
|---------|-------------|
| `...` | ... |

## Entry Points
- **Main source file:** `...`
- **Routes / pages:** `...`
- **CLI:** `...`

## Where to Start (Adding a Feature)
< Step-by-step: which files to touch, which patterns to follow >

## Maintenance Risks
- < any risks spotted >
```

After producing the summary, ask the user: "Write this to start.md?" If they say yes (or if they already mentioned start.md in their request), write it to `start.md` in the project root.

## Notes

- Be thorough but concise. A developer reading this should be able to start contributing within 5 minutes.
- If the project has a `start.md` already, compare and note what changed.
- If you encounter errors reading files, note them but keep going — don't stop the whole analysis for one unreadable file.
