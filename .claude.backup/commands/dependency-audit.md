# Dependency Security Audit

Analyze project dependencies for security vulnerabilities and supply chain risks:

## Audit Steps

### 1. **Identify Dependencies**

- List all direct and transitive dependencies
- Check package manager files (package.json, go.mod, requirements.txt, Pipfile)
- Identify version constraints and locked versions

### 2. **Vulnerability Scanning**

Run appropriate security audit commands based on project type:

#### JavaScript/TypeScript

```bash
npm audit
# or
yarn audit
# or
pnpm audit
```

#### Go

```bash
go list -json -m all | nancy sleuth
# or
govulncheck ./...
```

#### Python

```bash
pip-audit
# or
safety check
```

### 3. **Analyze Findings**

For each vulnerability found:

- **Package Name**: Which dependency is affected
- **Current Version**: Version in use
- **Vulnerable Versions**: Range of affected versions
- **CVE/Advisory**: CVE number or security advisory ID
- **Severity**: Critical / High / Medium / Low
- **Description**: What the vulnerability is
- **Patched Version**: Fixed version available
- **Exploit Status**: Known exploits in the wild?

### 4. **Supply Chain Risk Assessment**

#### Check for Suspicious Patterns

- **Recently published packages** with high download counts (potential typosquatting)
- **Packages with few maintainers** or single maintainer
- **Abandoned packages** with no recent updates
- **Unnecessary dependencies** - can they be removed?
- **Excessive permissions** requested by packages

#### Verify Package Integrity

- Check package repository legitimacy (npm, PyPI, Go modules)
- Verify maintainer reputation and history
- Look for sudden maintainer changes
- Check for executable scripts in package.json (preinstall, postinstall)

### 5. **Dependency Hygiene**

#### Version Management

- Are versions pinned or using wide ranges (^, ~)?
- Are there conflicting version requirements?
- Is there a lockfile committed (package-lock.json, go.sum, poetry.lock)?

#### Unnecessary Dependencies

- Identify dev dependencies in production builds
- Find unused dependencies
- Look for duplicate packages with different versions

### 6. **Recommended Actions**

For each finding, provide:

1. **Immediate Action**: Update, patch, or remove
2. **Alternative Package**: Safer alternatives if available
3. **Workaround**: Temporary mitigation if no patch exists
4. **Breaking Changes**: Impact of upgrading

## Output Format

### Summary

- Total dependencies: X
- Vulnerabilities found: Y (Z critical, A high, B medium, C low)
- Outdated packages: N
- Supply chain risks: M

### Detailed Findings

#### Critical Issues (Fix Immediately)

For each critical vulnerability:

```
Package: [name]@[version]
CVE: [CVE-ID]
Severity: Critical
Issue: [description]
Fix: Update to [version] with: [command]
Breaking Changes: [yes/no - details]
```

#### Recommendations

1. Update lockfiles and commit them
2. Enable automated security scanning (Dependabot, Snyk, etc.)
3. Configure audit checks in CI/CD pipeline
4. Consider using tools like Socket.dev for runtime monitoring

## Commands to Run

After reviewing findings, execute safe update commands:

- `npm update` (for non-breaking updates)
- `npm audit fix` (automatic fixes)
- `go get -u ./...` (with caution)
- `pip install --upgrade [package]`

**Always review changes before committing dependency updates.**
