---
name: github-setup
description: Set up .github folder for a new project. Use when user asks to create GitHub templates, workflows, CODEOWNERS, or initialize .github directory.
---

# GitHub Setup Skill

When setting up a `.github/` folder for a new project:

## First: Ask About the Project

Before creating files, determine:

1. **Project type** - Library, CLI, web app, API, monorepo?
2. **Language/runtime** - Node/Bun, Go, Python, Rust, multi-language?
3. **Package manager** - npm, bun, pnpm, pip, go modules?
4. **Test runner** - What command runs tests?
5. **Build command** - What command builds the project (if any)?
6. **Owner GitHub username** - For CODEOWNERS

## Files to Create

### Required Files

**CODEOWNERS**

```
* @{owner-username}
```

**CODE_OF_CONDUCT.md**

- Contributor Covenant based
- Contact email for reports
- Keep it concise

**CONTRIBUTING.md**

- Development setup steps
- Workflow (branch → changes → test → PR)
- Code style guidelines
- Testing instructions
- PR process

**SECURITY.md**

- Email for vulnerability reports
- Response timeline (48hr ack, 5 day investigation)
- Supported versions

**ISSUE_TEMPLATE.md**

- Description section
- Type checkboxes (Bug, Feature, Docs)
- Environment info (if bug)
- Steps to reproduce
- Expected vs actual behavior

**PULL_REQUEST_TEMPLATE.md**

- Description section
- Type checkboxes (Fix, Feature, Docs, Refactor)
- Testing checklist (adapt to project's test commands)

### Optional Files

**codecov.yml** (if using Codecov)

```yaml
codecov:
  require_ci_to_pass: false

coverage:
  status:
    project:
      default:
        target: auto
        threshold: 1%
    patch:
      default:
        target: auto
        threshold: 5%

comment:
  require_changes: false
  require_base: false
  require_head: true

ignore:
  - "tests/**/*"
  - "**/*.test.*"
```

### Workflows

**workflows/test.yml**
Adapt to project's stack:

- Checkout code
- Setup runtime (actions/setup-node, actions/setup-go, actions/setup-python, oven-sh/setup-bun, etc.)
- Install dependencies
- Run linting/formatting checks
- Run type checking (if applicable)
- Run tests
- Upload coverage (if using Codecov)

**workflows/release.yml** (if publishing)

- Trigger on version tags (`v*`)
- Build artifacts
- Create GitHub release
- Publish to registry (npm, PyPI, crates.io, etc.)

## Output

1. Ask clarifying questions about the project
2. Create `.github/` directory structure
3. Generate all files with project-specific values
4. Explain what each file does
5. Note any secrets needed (CODECOV_TOKEN, etc.)
