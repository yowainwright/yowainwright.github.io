---
name: technical-writing
description: Help with documentation and technical writing. Use when user asks to "document", "write docs", "create README", "explain for others", "write tutorial", or needs to communicate technical concepts.
---

# Technical Writing Skill

When helping with documentation and technical writing:

## Identify Document Type

| Request                 | Recommended Agent            |
| ----------------------- | ---------------------------- |
| API documentation       | `software-technical-writer`  |
| README file             | `software-technical-writer`  |
| SDK/library docs        | `software-technical-writer`  |
| Tutorial/codelab        | `codelab-demo-expert`        |
| Blog post               | `article-writing-expert`     |
| Engineering spec        | `engineer-technical-writer`  |
| Research/protocol       | `scientist-technical-writer` |
| Product launch          | `devrel-writer`              |
| Changelog/release notes | `devrel-writer`              |
| Privacy policy/ToS      | `compliance-writer`          |

## Quick Guidelines

### All Documentation

- Lead with the user's problem, not the solution
- Show code early and often
- Test all examples
- Progressive disclosure (simple → complex)

### README Structure

```markdown
# Project Name

One-line description

## Quick Start

[Fastest path to "hello world"]

## Installation

[How to install]

## Usage

[Common use cases with examples]

## Documentation

[Links to detailed docs]
```

### API Documentation

- Every endpoint: method, path, params, response, errors
- Copy-paste ready examples
- Include authentication details

### Tutorials

- State what they'll build upfront
- Small steps with checkpoints
- "If this doesn't work" troubleshooting

## Output Format

1. **Identify type** - What kind of document?
2. **Suggest agent** - Which specialist to invoke?
3. **Draft or outline** - Provide structure
4. **Review checklist** - What to verify before publishing
