<!-- Version: 2024-02-16,bac0bd8 -->

# Coding Style

## Code Quality

- **No code comments** - Code should be self-documenting
- **No summary reports** - After completion, just write "reviewing work" and run `bun run lint --quit && bun run build && bun run test`
- **Prefer immutability** - Use `const`, avoid mutations
- **Keep types simple** - No complex type gymnastics
- **No `any` types** - Always use proper TypeScript types

## Function Design

- **Array methods over loops** - Use `.map()`, `.filter()`, `.reduce()` instead of `for` loops
- **Small, single-purpose functions** - Each function does one thing well
- **Hoist if statement logic** - Extract conditions into well-named variables
- **Break up complex expressions** - Variables/logic with more than 2 operators should be split
- **Avoid nested complexity** - Code nested more than 3 tabs is too complex

## Code Organization

- **Move types to types.ts** - All interfaces and types in dedicated files
- **Move constants to constants.ts** - Strings, regex, static values with clear names
- **Don't assign computed object keys** - Keep object structure simple and readable
- **No useless try/catches** - Only catch when you can handle meaningfully

## File Management

- **No useless files or documentation** - Only create what's necessary
- **No unnecessary logging** - Don't use `console.log` or pointless logging
- **No emojis** - Use special characters if decoration needed

## Programming Paradigms

- **Prefer reactive programming** - Composable, declarative patterns
- **Be aware of BigO** - No unnecessarily nested loops or inefficient algorithms

## Communication Style

- **One sentence status updates** - Tell what you're doing and what you did in single sentences
- **Two sentence suggestions** - If proposing something not on this list, explain in exactly 2 sentences
