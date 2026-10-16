# Blog agents

This directory holds the blog's custom [Humanizer](humanizer/SKILL.md), the
[reviewed sources](sources.json) for third-party skills, and their
[security review](SECURITY.md). Humanizer is the only custom skill; use it as the
primary guide for Jeff's voice.

Install the two local Walter writing skills from the repository root:

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

Keep the installer, source manifest, review notes, and custom Humanizer source in
Git. Downloaded skill files live in the ignored `.agents/skills/` directory.
The installer creates ignored `.claude/skills/` links to the same skills and
connects the custom Humanizer for both directories.

| Agents | Discovery directory |
| --- | --- |
| [Codex](https://learn.chatgpt.com/docs/build-skills#where-codex-loads-local-skills), [Gemini CLI](https://geminicli.com/docs/cli/skills/), [OpenCode](https://opencode.ai/docs/skills/) | `.agents/skills/` |
| [Claude Code](https://code.claude.com/docs/en/skills#where-skills-live) | `.claude/skills/` |

Codex can discover the new skills on the next turn. Restart an existing Claude
Code session if its skill directory was created after that session started.

The installer uses pinned commits, exact byte counts, and SHA-256 checksums.
All missing downloads must pass verification before it writes skill files.
It skips identical installed files, rejects changed files and conflicting links,
and never removes existing skills. Rerunning the default command does not remove
Walter MCP workflows installed with the additional option.

Skill installation is an explicit command, separate from package installation,
builds, and Git hooks. It uses no skill registry or upstream installation code.
Review new upstream content before changing a revision or checksum in the manifest.
Shared agent libraries belong in the global setup.
