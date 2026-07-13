# Koa.js Code Review

Review Koa.js code for middleware patterns, security, error handling, and performance. Use Context7 to fetch the latest Koa documentation.

**IMPORTANT: Start by running "use context7" to get current Koa APIs and patterns.**

## Instructions

- **Be succinct and opinionated** - State what's wrong, state the fix
- **Summarize first** - 1-2 sentences about what you found, then fix it
- **Prove your work** - Run tests, show requests passing, demonstrate security improvements
- **No closing summary** - End when fixes are proven to work

## What to Review

1. **Middleware Order** - helmet → cors → logging → bodyParser → errorHandler → routes
2. **Error Handling** - Centralized error handler, proper async error catching
3. **Security** - CORS config (not "*"), helmet headers, input validation
4. **Context Usage** - ctx.state (not globals), ctx.throw for errors, early returns

## Output Format

1. State findings (1-2 sentences)
2. Make fixes
3. Prove fixes work (tests pass, security scan clean)
4. Stop
