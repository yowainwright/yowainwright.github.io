# Load Agent (Lazy)

Load a skill or agent on-demand from a local or external source.

## Usage

`/load-agent-lazy [source/]name`

This command is primarily for Claude-style command loading. In Codex, prefer the
built-in skill flow: select the matching skill from metadata and read its
`SKILL.md` only when the task triggers it.

- `name` - load from local `lazyLoadSource` agents or skills
- `matt-pocock/<path>` - load from Matt Pocock's official skills repo
- `effect-ts/effect-ts` - load from Effect's official skills repo
- `xstate/xstate-v5` - load from Stately's official XState skills repo
- `greptile/check-pr` - load from Greptile's official skills repo
- `greptile/greploop` - load from Greptile's official skills repo

## Steps

### 1. Resolve source

If the name has no prefix (e.g. `code-reviewer`), load from local source:

```bash
LAZY_SOURCE=$(
  {
    jq -r '.lazyLoadSource // empty' ~/.claude/settings.json 2>/dev/null
    jq -r '.templateSource // empty' ~/.codex/config.json ~/.claude/config.json 2>/dev/null
  } | head -n 1
)
```

If the name has an official source prefix, use the standard shared skills root for Claude Code and Codex:

```bash
SKILLS_ROOT="${HOME}/.agents/skills"
SOURCE=<prefix before slash>
SKILL=<path after slash>
```

Official source prefixes:

| Prefix        | Source repo                                | Skills path |
| ------------- | ------------------------------------------ | ----------- |
| `matt-pocock` | `https://github.com/mattpocock/skills.git` | `skills/`   |
| `effect-ts`   | `https://github.com/Effect-TS/skills.git`  | `skills/`   |
| `xstate`      | `https://github.com/statelyai/skills.git`  | `skills/`   |
| `greptile`    | `https://github.com/greptileai/skills.git` | repo root   |

Do not synthesize skills from framework docs. If an official source has no `SKILL.md`, tell the user it is not available as an official skill yet.

### 2. Ensure cache is populated

**Local source:**

```bash
ls "${LAZY_SOURCE}/tmpl/skills/${name}" 2>/dev/null || ls "${LAZY_SOURCE}/tmpl/agents/${name}" 2>/dev/null
```

**Official skill source:**

```bash
agent-sync sync
test -d "${SKILLS_ROOT}/${SOURCE}"
```

The sync command refreshes official skill sources into `.agents/skills`.

### 3. Load the skill

Read and apply the skill file from the resolved cache path:

- Official skills: `~/.agents/skills/<source>/<skill-path>/SKILL.md`
- Local skills: `${LAZY_SOURCE}/tmpl/skills/<name>/SKILL.md`
- Local agents: `${LAZY_SOURCE}/tmpl/agents/<name>.md`

### 4. Confirm

Tell the user which skill was loaded and from which source.

## Examples

- `/load-agent-lazy greptile/check-pr` - load Greptile's PR checker
- `/load-agent-lazy greptile/greploop` - load Greptile's iterative PR loop
- `/load-agent-lazy effect-ts/effect-ts` - load Effect's official skill
- `/load-agent-lazy xstate/xstate-v5` - load Stately's official XState skill
- `/load-agent-lazy matt-pocock/engineering/diagnose` - load Matt Pocock's diagnose skill
- `/load-agent-lazy code-reviewer` - load local code-reviewer agent
- `/load-agent-lazy backend-architect` - load local backend-architect agent
