---
name: architecture-review
description: Review architecture decisions. Use when user asks "should I use X or Y", "design review", "architecture decision", "how should I structure", or is making significant design choices.
---

# Architecture Review Skill

When helping with architecture decisions:

## Approach

### 1. Understand Context

- What problem are you solving?
- What are the constraints (team size, timeline, scale)?
- What's the existing architecture?

### 2. Evaluate Options

For each option, consider:

- **Complexity**: How hard to implement and maintain?
- **Scalability**: Will it work at 10x scale?
- **Team fit**: Does the team have expertise?
- **Ecosystem**: Library support, community, documentation?
- **Flexibility**: How hard to change later?

### 3. Apply Relevant Expert Perspectives

Invoke appropriate agents:

- `principle-engineer` - Overall architecture vision
- `security-engineer` - Security implications
- `performance-optimization-expert` - Performance concerns
- `cloud-cost-expert` - Cost implications
- `resiliancy-engineer` - Reliability concerns

## Decision Framework

```
┌─────────────────────────────────────────────┐
│           Architecture Decision             │
├─────────────────────────────────────────────┤
│ Option A          │ Option B                │
├───────────────────┼─────────────────────────┤
│ Pros:             │ Pros:                   │
│ - ...             │ - ...                   │
│ Cons:             │ Cons:                   │
│ - ...             │ - ...                   │
├───────────────────┴─────────────────────────┤
│ Recommendation: [Option] because [reasons]  │
│ Tradeoffs accepted: [what you're giving up] │
└─────────────────────────────────────────────┘
```

## Output Format

1. **Summary**: One-sentence recommendation
2. **Analysis**: Detailed comparison
3. **Tradeoffs**: What you're accepting with this choice
4. **Migration path**: How to change if this doesn't work out
