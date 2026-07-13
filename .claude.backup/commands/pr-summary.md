# PR Summary

Generate a pull request description from the branch diff.

## Instructions

1. Run `git log main..HEAD --oneline` (or appropriate base branch) to see commits
2. Run `git diff main..HEAD --stat` to see changed files
3. Run `git diff main..HEAD` for detailed changes (if needed)
4. Generate a PR description

## PR Description Format

```markdown
## Summary

[2-3 sentences describing what this PR does and why]

## Changes

- [Bullet point for each logical change]
- [Group related file changes together]
- [Focus on what changed, not how]

## Testing

- [ ] [How to test this change]
- [ ] [What to verify]

## Notes

[Any context reviewers need: breaking changes, migration steps, follow-up work]
```

## Rules

- **Be concise** - Reviewers are busy
- **Focus on why** - The diff shows what, you explain why
- **Highlight risks** - Call out anything that needs careful review
- **Link context** - Reference issues, docs, or discussions if relevant

## Examples

**Feature PR:**

```markdown
## Summary

Adds rate limiting to public API endpoints to prevent abuse and ensure fair usage.

## Changes

- Add rate limiter middleware using sliding window algorithm
- Configure 100 req/min limit for unauthenticated requests
- Add rate limit headers to responses (X-RateLimit-\*)
- Add tests for rate limiting behavior

## Testing

- [ ] Verify rate limiting kicks in after 100 requests
- [ ] Check rate limit headers are present in responses
- [ ] Confirm authenticated requests are not limited

## Notes

Rate limits can be adjusted via environment variables. See updated README.
```

## Output

Output the PR description in markdown, ready to paste into GitHub/GitLab.

## IMPORTANT

**DO NOT run git push or create the PR.** Only generate the description. The user will create the PR manually.
