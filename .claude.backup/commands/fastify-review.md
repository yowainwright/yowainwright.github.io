# Fastify Code Review

Review Fastify code for schema validation, performance, security, and TypeScript usage. Use Context7 to fetch the latest Fastify documentation.

**IMPORTANT: Start by running "use context7" to get current Fastify APIs and patterns.**

## Instructions

- **Be succinct and opinionated** - State what's wrong, state the fix
- **Summarize first** - 1-2 sentences about what you found, then fix it
- **Prove your work** - Run tests, show validation working, benchmark response times
- **No closing summary** - End when fixes are proven to work

## What to Review

1. **Schema Validation** - All routes must have request/response schemas
2. **TypeScript Types** - Proper typing for request params, body, query, response
3. **Plugin Architecture** - Proper encapsulation, decorators typed
4. **Performance** - Response schemas for serialization, async/await patterns

## Output Format

1. State findings (1-2 sentences)
2. Make fixes
3. Prove fixes work (tests pass, schema validates correctly)
4. Stop
