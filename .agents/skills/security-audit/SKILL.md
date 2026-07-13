---
name: security-audit
description: Perform security review of code or configuration. Use when user asks to "check for vulnerabilities", "security review", "audit security", "find security issues", or mentions OWASP, injection, or auth concerns.
---

# Security Audit Skill

When performing a security review:

## Scope Identification

First, clarify what to audit:

- Specific file or function?
- Entire application?
- Configuration only?
- Dependencies?

## Audit Checklist

### Input Validation

```markdown
- All user input validated
- Input length limits enforced
- Input type/format verified
- Allowlist over blocklist approach
- No dynamic code execution with user input
```

### Authentication

```markdown
- Strong password requirements
- Rate limiting on auth endpoints
- Secure session management
- MFA available/enforced
- Password hashing (bcrypt/argon2)
- No credentials in logs
```

### Authorization

```markdown
- Access controls on all endpoints
- Principle of least privilege
- IDOR (Insecure Direct Object Reference) checks
- Role verification at service layer
- No authorization in client-side only
```

### Injection Prevention

```markdown
- SQL: Parameterized queries only
- NoSQL: Input sanitization
- Command: No shell execution with user input
- XSS: Output encoding, use textContent not raw HTML insertion
- Path traversal: Sanitized file paths
```

### Data Protection

```markdown
- Secrets in env vars, not code
- Encryption at rest for sensitive data
- HTTPS everywhere
- Secure cookies (HttpOnly, Secure, SameSite)
- No sensitive data in URLs
- PII handling compliant
```

### Dependencies

```markdown
- Known vulnerabilities checked (npm audit, snyk)
- Dependencies up to date
- Lock files committed
- No unnecessary dependencies
```

### Configuration

```markdown
- Debug mode off in production
- Verbose errors hidden from users
- Security headers set (CSP, HSTS, etc.)
- CORS properly configured
- Rate limiting enabled
```

## Common Vulnerabilities

### SQL Injection

```javascript
// BAD
const query = `SELECT * FROM users WHERE id = ${userId}`;

// GOOD
const query = `SELECT * FROM users WHERE id = $1`;
await db.query(query, [userId]);
```

### XSS Prevention

```javascript
// GOOD - use textContent for user input
element.textContent = userInput;

// For rich content, use DOMPurify sanitizer
const clean = DOMPurify.sanitize(userInput);
```

### Command Injection

```javascript
// BAD - spawning shell with user input
const result = spawn("sh", ["-c", `ls ${userPath}`]);

// GOOD - use execFile with array args
const result = execFileSync("ls", [sanitizedPath]);
// or avoid shell entirely
const files = readdirSync(sanitizedPath);
```

### Path Traversal

```javascript
// BAD
const filePath = `./uploads/${filename}`;

// GOOD
const safeName = path.basename(filename);
const filePath = path.join("./uploads", safeName);
if (!filePath.startsWith("./uploads/")) throw new Error("Invalid path");
```

## Output Format

For each finding:

### [CRITICAL/HIGH/MEDIUM/LOW] Issue Title

**Location:** `file.ts:42`

**Vulnerability:** Brief description of the issue

**Risk:** What could happen if exploited

**Remediation:**

```typescript
// Suggested fix
```

**References:** OWASP link or CWE number

## Summary Template

```markdown
## Security Audit Summary

**Scope:** [what was reviewed]
**Date:** [date]

### Findings

| Severity | Count |
| -------- | ----- |
| Critical | 0     |
| High     | 2     |
| Medium   | 5     |
| Low      | 3     |

### Critical/High Priority

1. [Issue 1]
2. [Issue 2]

### Recommendations

1. [Top recommendation]
2. [Secondary recommendation]
```

## Recommended Agent

For deep security expertise, invoke:

- `security-engineer` - Threat modeling and architecture
