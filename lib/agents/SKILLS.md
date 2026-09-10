# Writing skills

The blog uses four writing skills to draft posts, tighten prose, and preserve Jeff's voice.

## Pick a skill

For blog edits, start with Humanizer for voice and Orwell for clarity.

| Skill                     | Use it for                                              | Example request                                        |
| ------------------------- | ------------------------------------------------------- | ------------------------------------------------------ |
| `humanizer`               | Edit a draft using Jeff's vocabulary, rhythm, and tone. | "Edit this draft in my voice."                         |
| `orwell-writing`          | Cut excess words and clarify meaning.                   | "Tighten this paragraph without changing its meaning." |
| `walter-writes-humanizer` | Rewrite stock phrases and repetition in an AI draft.    | "Remove filler and repeated sentence patterns."        |
| `walter-writes-writer`    | Write a first draft from notes or an outline.           | "Turn this outline into a draft."                      |

[Humanizer](humanizer/SKILL.md) is the only custom skill. Its
[selected posts](humanizer/references/voice.md) guide edits. Preserve Jeff's voice
when Walter's rules conflict with it; the [review notes](SECURITY.md#findings-that-affect-use)
give examples.

## Install and use

Orwell's reviewed copy must exist at `~/.agents/skills/orwell-writing/SKILL.md`.
Then install dependencies from the repository root:

```sh
pnpm install
```

The `prepare` script installs hooks and skills, checking files against
[pinned sources and hashes](sources.json). CI skips this setup. Run
`pnpm run skills:install` to reinstall skills alone. Generated skill folders stay
Git-ignored. See the [setup guide](README.md) for
agent discovery and optional pre-commit reviews.

The optional `pnpm run skills:install --include-walter-mcp` command adds twelve Walter workflows. Using them
requires Walter's external service and sends it drafts. Read the
[service review](SECURITY.md#findings-that-affect-use) before using them.
