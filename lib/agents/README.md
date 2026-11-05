# Blog agents

This directory holds the blog's custom [Humanizer](humanizer/SKILL.md), the
[reviewed sources](sources.json) for third-party skills, and their
[security review](SECURITY.md). Humanizer is the only custom skill; use it as the
primary guide for Jeff's voice.

See [Writing skills](SKILLS.md) for what each skill does and when to use it.

Local `pnpm install` sets up Git hooks, Humanizer, and the two Walter
writing skills through `prepare`. CI skips this agent setup. To rerun only skill
installation from the repository root:

```sh
pnpm run skills:install
```

This downloads `walter-writes-humanizer` and `walter-writes-writer` directly from
[Walter's no-slop repository](https://github.com/walterwritesai/no-slop-ai-humanizer-rewriter/tree/ef668580dc8782b7241b16ea77ae513737602616).
It preserves the files and attribution license exactly. Their strict style rules
and example rewrites need judgment; see the review before using them on a post.

To also install the 12 workflows from
[Walter Skills](https://github.com/walterwritesai/walter-skills/tree/d043f4c5b21155f8c6b389d64010561af5ce5979):

```sh
pnpm run skills:install --include-walter-mcp
```

Those workflows require Walter MCP and instruct agents to send drafts to its
humanization and detection service automatically. This command installs their
instructions only. It does not configure MCP, provide credentials, or send drafts.

## What belongs in Git

Keep the installer, source manifest, review prompt, review notes, and custom
Humanizer source in Git. Installed third-party skill files live in
the ignored `.agents/skills/` directory.
The installer creates ignored `.claude/skills/` links to the same skills and
connects the custom Humanizer for both directories.

| Agents                                                                                                                                                                                  | Discovery directory |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| [Codex](https://learn.chatgpt.com/docs/build-skills#where-codex-loads-local-skills), [Gemini CLI](https://geminicli.com/docs/cli/skills/), [OpenCode](https://opencode.ai/docs/skills/) | `.agents/skills/`   |
| [Claude Code](https://code.claude.com/docs/en/skills#where-skills-live)                                                                                                                 | `.claude/skills/`   |

Codex can discover the new skills on the next turn. Restart an existing Claude
Code session if its skill directory was created after that session started.

The installer uses pinned commits, exact byte counts, and SHA-256 checksums.
All missing downloads must pass verification before it writes skill files.
It skips identical installed files, rejects changed files and conflicting links,
and never removes existing skills. Rerunning the default command does not remove
Walter MCP workflows installed with the additional option.

Local package installation runs the default skill installer. Builds and
pre-commit reviews do not download skills. Setup uses no skill registry or
upstream installation code.
Review new upstream content before changing a revision or checksum in the manifest.
Shared agent libraries belong in the global setup.

Both installers use `scripts/install/index.ts`: `skills:install` selects `skills`,
and the package's `prepare` lifecycle selects `all` for hooks and skills. Supporting functions,
constants, and types live alongside it in `utils.ts`, `constants.ts`, and `types.ts`.

## Optional local prose check

For a local spelling, grammar, and wordiness check of one working-tree post:

```sh
pnpm run review:prose content/why-pastoralist.mdx
```

This uses [Harper](https://github.com/Automattic/harper) and
[write-good](https://github.com/btford/write-good), following the résumé project's
local review approach. Both run locally with installed packages; no drafts leave
the machine. Findings include the original line and column and are advisory.
The command never edits files. Exit status `0` means the review completed, even
with suggestions; `2` means it failed or received invalid arguments.

The Markdown/MDX parser excludes frontmatter, code, imports, expressions,
components (including their text), tables, blockquotes, and link targets.
Formatting and excluded content can limit grammar context. These checks do not
verify facts, judge Jeff's voice, or measure human authorship.

The dependencies are development-only. This command runs only when requested;
it is not attached to builds, hooks, or the site's runtime.

## Optional pre-commit review

The managed pre-commit hook offers a writing review when blog Markdown or MDX
files are staged. It keeps the existing build and lint checks. Skill installation
runs during local dependency setup; pre-commit reviews do not download skills.

| Choice         | Review scope                                                                                   | Time limit |
| -------------- | ---------------------------------------------------------------------------------------------- | ---------- |
| Skip (default) | No agent review                                                                                | Immediate  |
| Quick          | Staged diff and surrounding context; up to five material findings                              | 2 minutes  |
| Deep           | Full staged posts, the diff, approved committed voice samples, and extended editing references | 10 minutes |

Press Enter to skip. The prompt also skips after 30 seconds without an answer.
Without an interactive terminal, or in CI, review defaults to skip. Set
`BLOG_REVIEW=skip`, `BLOG_REVIEW=quick`, or `BLOG_REVIEW=deep` to bypass the prompt
and choose a mode explicitly. This setting affects only the writing review;
build and lint still run.

The runner uses an installed, authenticated Codex CLI with a read-only sandbox,
no approval requests, and no saved session history. It disables shell, browser,
apps, plugins, and web search and skips user configuration to avoid loading
global MCP integrations. Choosing Quick or Deep sends the supplied review
context to Codex using your existing account. No Walter service is used.

[The prompt](review.md) combines the custom Humanizer's voice guidance and
Walter's editing checklist. Findings are advisory; the review
does not rewrite or stage files. A failed or timed-out run stops that commit
attempt with an error; `BLOG_REVIEW=skip` bypasses the optional review. Deep checks
argument, consistency, clarity, voice, and filler. It flags claims needing
external verification and makes no detector-score or authorship claims.

Run a review separately, or print the same context to use with another agent:

```sh
pnpm run review:content deep
pnpm run review:content deep --prompt-only
```

Both commands use staged posts. The prompt is limited to 256 KiB; stage fewer
posts if it exceeds that limit. An empty staged-post selection exits without
starting an agent.
