# Project-Specific Rules

This directory contains rules that apply to specific projects. When working in a project, copy the relevant rule file to the project's `.claude/rules/` directory.

## Usage

1. Create `.claude/rules/` in your project root
2. Copy or symlink relevant rule files
3. Claude Code will automatically load them

## Available Templates

### nextjs.md
Rules for Next.js projects:
- App Router conventions
- Server/Client component patterns
- Data fetching best practices

### api-service.md
Rules for backend API services:
- REST conventions
- Error handling patterns
- Logging standards

### library.md
Rules for library/package development:
- Public API design
- Documentation requirements
- Semantic versioning

### monorepo.md
Rules for monorepo projects:
- Package boundaries
- Shared dependency management
- Build orchestration

## Creating Custom Rules

```markdown
# Project: My App

## Architecture
- [Describe your architecture]

## Conventions
- [List naming conventions]
- [List file organization rules]

## Dependencies
- [List key dependencies and how to use them]

## Testing
- [Describe testing requirements]
```

## Example: Next.js Project

```bash
# In your Next.js project
mkdir -p .claude/rules
cp ~/.claude/rules/projects/nextjs.md .claude/rules/
```

Then customize for your specific project needs.
