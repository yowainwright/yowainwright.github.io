# Security Review

Perform a comprehensive security audit on the provided code:

## Security Vulnerability Checks

### 1. **Injection Vulnerabilities**
- **SQL Injection**: Check for string concatenation in SQL queries, missing parameterized queries
- **Command Injection**: Look for user input passed to shell commands, `exec()`, `eval()`
- **XSS (Cross-Site Scripting)**: Identify unescaped user input in HTML output, missing sanitization
- **Path Traversal**: Check for user-controlled file paths without validation
- **Code Injection**: Look for `eval()`, `Function()`, or dynamic code execution with user input

### 2. **Authentication & Authorization**
- **Weak Authentication**: Check for hardcoded credentials, weak password requirements
- **Missing Authorization**: Verify access controls on sensitive operations
- **Session Management**: Look for insecure session handling, missing timeouts
- **JWT Issues**: Check for weak signing algorithms, missing verification

### 3. **Data Security**
- **Sensitive Data Exposure**: Look for secrets in code, logs, error messages
- **Missing Encryption**: Check for plaintext storage of passwords, tokens, PII
- **Insecure Transmission**: Verify HTTPS usage, check for HTTP fallbacks
- **Logging Sensitive Data**: Identify passwords, tokens in logs

### 4. **Input Validation**
- **Missing Validation**: Check all user inputs for validation
- **Type Confusion**: Look for incorrect type assumptions
- **Buffer Overflows**: Identify array access without bounds checking
- **Regex DoS**: Check for catastrophic backtracking in regex

### 5. **Dependency & Supply Chain**
- **Vulnerable Dependencies**: Check for outdated packages with known CVEs
- **Suspicious Imports**: Look for unusual or unnecessary dependencies
- **Package Integrity**: Verify dependency sources and checksums

### 6. **Language-Specific Issues**

#### JavaScript/TypeScript
- `eval()`, `Function()` with user input
- `innerHTML`, `dangerouslySetInnerHTML` without sanitization
- Prototype pollution vulnerabilities
- Missing CSRF tokens in forms
- Insecure `postMessage` usage

#### Go
- SQL queries with string concatenation
- Missing error handling exposing sensitive info
- Race conditions with shared state
- Goroutine leaks and unbounded resource usage
- Missing request timeouts

#### Python
- `exec()`, `eval()` with user input
- Pickle deserialization of untrusted data
- Missing input validation in file operations
- SQL injection via string formatting
- Missing CORS headers

### 7. **Configuration & Secrets**
- Environment variables for secrets (check if committed)
- Hardcoded API keys, passwords, tokens
- Debug mode enabled in production
- Overly permissive CORS policies
- Missing security headers

### 8. **Business Logic Flaws**
- Race conditions in critical operations
- Missing rate limiting
- Insufficient access controls
- TOCTOU (Time-of-check to time-of-use) issues

## Output Format

For each vulnerability found:
1. **Severity**: Critical / High / Medium / Low
2. **Location**: File path and line numbers
3. **Vulnerability Type**: Category from above
4. **Description**: What the security issue is
5. **Exploit Scenario**: How an attacker could exploit this
6. **Remediation**: Specific code fix with secure example
7. **References**: OWASP, CWE, or CVE links if applicable

Prioritize by severity: Critical → High → Medium → Low

## Security Best Practices Checklist

After identifying issues, verify:
- [ ] All user input is validated and sanitized
- [ ] Parameterized queries for all database operations
- [ ] Secrets stored in environment variables, not code
- [ ] HTTPS enforced for all communications
- [ ] Authentication required for sensitive operations
- [ ] Authorization checks on all protected resources
- [ ] Error messages don't leak sensitive information
- [ ] Dependencies are up-to-date and scanned for vulnerabilities
- [ ] Security headers properly configured
- [ ] Rate limiting on API endpoints
