---
name: onboarding
description: Help new contributors understand a codebase. Use when user says "new to this repo", "how does this work", "explain the codebase", "onboard me", or needs to understand project structure.
---

# Onboarding Skill

When helping someone get oriented in a codebase:

## Step 1: Identify the Project Type

Check for key indicators:

- `package.json` - Node.js/JavaScript/TypeScript
- `go.mod` - Go
- `requirements.txt` / `pyproject.toml` - Python
- `Cargo.toml` - Rust
- `docker-compose.yml` - Containerized app
- `turbo.json` / `pnpm-workspace.yaml` - Monorepo

## Step 2: Map the Architecture

```markdown
1. **Entry points** - Where does the app start?
2. **Directory structure** - What's the organization pattern?
3. **Key abstractions** - What are the main concepts?
4. **Data flow** - How does data move through the system?
5. **External dependencies** - What services does it connect to?
```

## Step 3: Create an Overview

Provide:

### Quick Facts

| Aspect          | Value      |
| --------------- | ---------- |
| Language        | TypeScript |
| Framework       | Next.js 14 |
| Database        | PostgreSQL |
| Package Manager | pnpm       |

### Directory Guide

```
src/
├── app/           # Next.js App Router pages
├── components/    # React components
├── lib/           # Shared utilities
├── server/        # Server-side code
└── types/         # TypeScript types
```

### Key Files

- `src/app/layout.tsx` - Root layout
- `src/lib/db.ts` - Database client
- `.env.example` - Required env vars

### Getting Started

1. Clone repo
2. Copy `.env.example` to `.env`
3. Run `pnpm install`
4. Run `pnpm dev`

## Step 4: Answer Common Questions

Prepare answers for:

- How do I add a new page/route?
- How do I add a new API endpoint?
- How do I connect to the database?
- How do I run tests?
- How do I deploy?

## Output Format

1. **Start with the big picture** - What does this project do?
2. **Show the structure** - Visual directory tree
3. **Highlight key files** - What to read first
4. **Provide commands** - How to run, test, deploy
5. **Link to docs** - README, CONTRIBUTING, etc.

## Auto-Trigger Phrases

- "I'm new to this codebase"
- "How does this project work?"
- "Can you explain the architecture?"
- "Onboard me to this repo"
- "What should I read first?"
- "How is this organized?"
