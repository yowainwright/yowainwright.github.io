# Explain

Explain code clearly and concisely. Adapt explanation depth to the complexity of the code.

## Instructions

1. If a file path is provided, read and explain that file
2. If code is pasted, explain that code
3. If a concept is mentioned, explain how it's used in the codebase

## Explanation Structure

### For Functions/Methods

- **Purpose**: What does it do? (one sentence)
- **Inputs**: What does it take?
- **Output**: What does it return?
- **Side effects**: Does it modify state, call APIs, write files?
- **Key logic**: Walk through the important parts

### For Files/Modules

- **Purpose**: What is this file responsible for?
- **Exports**: What does it expose to other modules?
- **Dependencies**: What does it rely on?
- **Key components**: Brief description of main functions/classes

### For Architecture/Patterns

- **Pattern name**: What pattern is being used?
- **Why here**: Why was this pattern chosen?
- **How it works**: Brief explanation of the pattern
- **Trade-offs**: What are the pros/cons?

## Rules

- **No jargon without explanation** - Define terms if they're not obvious
- **Use analogies** - Compare to familiar concepts when helpful
- **Show don't tell** - Point to specific lines when explaining
- **Appropriate depth** - Simple code gets simple explanation, complex code gets detailed breakdown
