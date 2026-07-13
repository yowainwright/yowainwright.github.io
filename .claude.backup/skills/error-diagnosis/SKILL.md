---
name: error-diagnosis
description: Diagnose errors and exceptions. Use when user shares stack traces, error messages, exceptions, or asks why something is failing.
---

# Error Diagnosis Skill

When diagnosing errors:

## Analysis Steps

1. **Identify error type** - Syntax, runtime, logic, network, permission
2. **Find root cause** - Not just the symptom, trace back to origin
3. **Check common causes** - Null/undefined, async issues, import problems
4. **Verify context** - Environment, dependencies, configuration

## For JavaScript/TypeScript

- Check for undefined/null access
- Look for Promise rejection handling
- Verify import paths and module resolution
- Check for async/await misuse

## For Go

- Check error return values
- Look for nil pointer dereference
- Verify goroutine synchronization
- Check channel operations

## For Python

- Check for None access
- Look for import/module issues
- Verify indentation and syntax
- Check exception handling chains

## Output Format

1. **What happened** - Plain English explanation
2. **Why it happened** - Root cause analysis
3. **How to fix** - Specific code change
4. **How to prevent** - Pattern to avoid recurrence
