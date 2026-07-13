---
name: dependency-check
description: Check for outdated or vulnerable dependencies. Use when user mentions dependencies, packages, npm audit, security scanning, or outdated packages.
---

# Dependency Check Skill

When checking dependencies:

## For Node.js/npm projects

1. Run `npm outdated` to see outdated packages
2. Run `npm audit` to check for vulnerabilities
3. Check `package.json` for pinned vs range versions
4. Flag any packages with critical CVEs

## For Go projects

1. Run `go list -m -u all` to check for updates
2. Run `govulncheck ./...` if available
3. Check `go.mod` for indirect dependencies

## For Python projects

1. Run `pip list --outdated` for outdated packages
2. Run `pip-audit` or `safety check` if available
3. Check `requirements.txt` or `pyproject.toml`

## Output Format

- List critical vulnerabilities first (severity high/critical)
- Show outdated packages with current vs latest version
- Recommend specific update commands
- Warn about breaking changes in major version updates
