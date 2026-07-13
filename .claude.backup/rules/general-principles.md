<!-- Version: 2024-02-16,bac0bd8 -->

# General Principles

## Design Philosophy

- **Separation of concerns** - Each module/function should have a single responsibility
- **Keep things minimal** - Don't add abstraction layers until they're needed
- **Avoid over-abstraction** - Solve the problem at hand, not imaginary future problems
- **Readability over cleverness** - Code should be obvious and easy to understand

## Code Organization

- **Flat is better than nested** - Minimize nesting depth in all code
- **Extract for clarity** - If naming a section would add clarity, extract it to a function
- **No premature optimization** - Write clear code first, optimize only when needed

## When Writing Code

- Don't add features, refactor code, or make "improvements" beyond what was asked
- A bug fix doesn't need surrounding code cleaned up
- A simple feature doesn't need extra configurability
- Don't add docstrings, comments, or type annotations to code you didn't change
- Only add comments where the logic isn't self-evident

## Avoid Over-Engineering

- Don't add error handling for scenarios that can't happen
- Trust internal code and framework guarantees
- Only validate at system boundaries (user input, external APIs)
- Don't use feature flags or backwards-compatibility shims when you can just change the code
- Don't create helpers, utilities, or abstractions for one-time operations
- Don't design for hypothetical future requirements
