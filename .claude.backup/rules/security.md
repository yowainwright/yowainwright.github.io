<!-- Version: 2024-02-16,bac0bd8 -->

# Security Principles

## Code Security

- **Never hardcode secrets** - Use environment variables, never commit credentials
- **Input validation** - All user input must be validated and sanitized
- **Parameterized queries** - Never concatenate strings for SQL queries
- **Avoid dangerous functions** - No dynamic code execution with user input
- **Secure dependencies** - Keep dependencies updated, scan for vulnerabilities regularly

## Authentication & Authorization

- **Explicit authorization checks** - Verify permissions before sensitive operations
- **Secure session management** - Proper timeouts, secure cookies, HTTPS only
- **Least privilege** - Give minimum necessary permissions

## Error Handling

- **Don't leak sensitive info** - Error messages should not expose system details
- **Log security events** - But never log passwords, tokens, or PII
- **Fail securely** - Default to denying access on errors

## Common Vulnerabilities to Avoid

- SQL Injection
- XSS (Cross-Site Scripting)
- CSRF (Cross-Site Request Forgery)
- Command Injection
- Path Traversal
- Insecure Deserialization
