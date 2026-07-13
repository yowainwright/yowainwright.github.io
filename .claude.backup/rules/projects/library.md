# Library Development Rules

## Public API Design

### Exports
- Export only what users need
- Use named exports for tree-shaking
- Provide TypeScript types

```typescript
// Good: Named exports
export { createClient } from './client'
export type { ClientOptions, Client } from './types'

// Avoid: Default exports (harder to tree-shake)
export default createClient
```

### Naming
- Use clear, descriptive names
- Avoid abbreviations
- Be consistent with ecosystem conventions

### Stability
- Mark experimental APIs clearly
- Deprecate before removing
- Follow semantic versioning strictly

## Documentation

### README Requirements
1. One-line description
2. Installation instructions
3. Quick start example
4. Link to full documentation

### API Documentation
- Document all public functions
- Include TypeScript types
- Provide code examples
- Document edge cases

### Changelog
- Keep CHANGELOG.md updated
- Follow Keep a Changelog format
- Link to migration guides for breaking changes

## Semantic Versioning

| Change Type | Version Bump | Example |
|-------------|--------------|---------|
| Breaking change | Major (X.0.0) | Remove function |
| New feature | Minor (0.X.0) | Add function |
| Bug fix | Patch (0.0.X) | Fix behavior |

### Pre-release
- Use `-alpha.N`, `-beta.N`, `-rc.N`
- Alpha: API may change
- Beta: Feature complete, testing
- RC: Ready for release

## Testing

- Test public API behavior
- Test edge cases and error conditions
- Test TypeScript types
- Aim for high coverage on public API

## Build

- Target appropriate environments (Node, browser, both)
- Provide ESM and CJS builds
- Include source maps
- Minimize bundle size
