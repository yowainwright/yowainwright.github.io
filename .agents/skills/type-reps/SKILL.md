---
name: type-reps
description: 'Total TypeScript-style TypeScript improvement reps associated with Matt Pocock''s teaching style, not an official mattpocock/skills repo skill. Use when the user asks for "type reps", "matt type reps", "TypeScript exercise", "type improvement exercise", "fix this type", "improve inference", "remove any", "generic practice", "compiler error workout", or wants a quick type-safety challenge.'
---

# Type Reps

Run a compact TypeScript learning or code-improvement rep using an exercise-driven flow.

The goal is to build understanding, not only silence the compiler.

This is a local TypeScript exercise wrapper. The official `mattpocock/skills` repo does not currently provide a dedicated TypeScript type-rep skill; use `~/.agents/skills/matt-pocock/misc/scaffold-exercises/SKILL.md` when the user wants to scaffold course-style exercises.

## Loop

1. Isolate the type problem:
   - compiler error
   - unsafe `any` or assertion
   - weak inference
   - overloaded or generic API
   - confusing conditional, mapped, or template-literal type
2. Write the desired call-site or type-level outcome before changing implementation.
3. Prefer inference from values and function parameters over manually annotated output types.
4. Replace broad types with the narrowest useful model:
   - `unknown` over `any`
   - discriminated unions over boolean flag clusters
   - generic constraints over unconstrained generics
   - helper types only when they remove repeated type logic
5. Run `tsc --noEmit` or the repo's typecheck script.
6. Explain the mental model in 3 bullets:
   - what TypeScript knew before
   - what TypeScript knows now
   - why the final type is safer or easier to use

## Exercise Mode

When the user wants practice rather than a direct fix:

1. Present the broken snippet or error.
2. Ask the user to predict the type or choose the fix.
3. Give one hint at a time.
4. Reveal the solution only after the user asks or gets stuck.

Keep examples small enough to reason about in one screen.
