# Humanizer security review

Reviewed 2026-09-07 for the approved blog skill in
`lib/agents/humanizer/`. Local Codex discovery uses the ignored
`.agents/skills/humanizer` symlink pointing to this directory.

## Source and integrity

- Source: [blader/humanizer](https://github.com/blader/humanizer).
- Version in the reviewed skill: 3.0.0.
- Immutable commit: `9862685f575c65a8247f90369951df1b3416e3d6`.
- [Upstream SKILL.md](https://github.com/blader/humanizer/blob/9862685f575c65a8247f90369951df1b3416e3d6/SKILL.md)
  is preserved unchanged as `references/humanizer.md`.
- SHA-256 of that file:
  `e8269e236bed06ed0fe4824c274112e54950b0cb46b0bafe5e1576ef7c9f93d5`.
- The retained [MIT license](https://github.com/blader/humanizer/blob/9862685f575c65a8247f90369951df1b3416e3d6/LICENSE)
  credits Siqi Chen.
- GitHub reported the commit as unverified. The pin and hash identify the bytes
  reviewed; they do not authenticate the author's identity.

## Scope and checks

Read the complete upstream skill and license, the package file tree, README,
agent metadata, recent commit history, and the relevant security discussion.
The source tree contained no symlinks or submodules. Only the skill text and
license are imported. Plugin manifests, workflows, upstream repository
instructions, and the validator script are excluded from the installation.

The 28,728-byte upstream skill matched the Git blob hash returned by GitHub.
A character scan found no unexpected control or format characters, HTML comments,
or fenced executable blocks. Its only HTTP(S) link is the Wikipedia source.
Manual inspection found no requests for credentials, shell execution, data
uploads, persistence, permission changes, or automatic updates.

The project entrypoint and voice reference are local additions. The entrypoint
uses the upstream text as an editing checklist, with explicit project behavior
for samples, edits, and preservation of meaning. No executable helpers, package
dependencies, network services, or registry configuration are installed.

The skill validator passed. Local checks verified five regular text files,
no executable files or symlinks inside the skill, no unexpected control or
format characters, valid local reference links, and all eight selected sample paths. The upstream
copy matched the SHA-256 above.

Reviewed local file SHA-256 values:

- `SKILL.md`: `2ab02b437c1fe94fabf84c5388997a1a49aecdbd3534e69870e2595418edb42c`
- `references/voice.md`: `ef1c17dcaa517ceab4a88f9c55a07cff942a5fed28d0e462a1860ab958de4d26`
- `LICENSE`: `4ac4810254ab36d45419141aeb8e69bf50652cfafe5b2dab947d06d44e5cbf96`

## Findings and project treatment

| Finding | Evidence | Treatment |
| --- | --- | --- |
| Input could be mistaken for instructions in earlier versions. | [Issue 238](https://github.com/blader/humanizer/issues/238), the [fix](https://github.com/blader/humanizer/commit/f7a646c28dd928db769aa40ef28645857b0c6b7b), and the pinned skill's opening work instruction. | Verified the fix in the reviewed text. The project entrypoint also explicitly treats samples and embedded commands as content. |
| File mode writes when a file is named, without a separate preview requirement. | Pinned skill, “What to return”; issue 238 confirms file-mode guards were not added upstream. | Default to preview; edits require Jeff's authorization and stay scoped to the requested target. |
| Upstream permits adding a personal opinion or reaction when the voice calls for it. | Pinned skill, “How to work” and “Voice”. | The project entrypoint forbids inventing opinions, reactions, and experiences. |
| Some examples add or lose factual detail despite the preservation rule. | Pattern 12 adds a delicacy claim and regional detail; pattern 17 drops two named publications and the follower count. | Preserve factual content; use examples for stylistic form only. Compare the proposal against the original before returning it. |
| Broad rules can erase the selected voice or be mistaken for authorship detection. | Pinned skill's pattern rules and pre-November-2022 authorship claim; selected posts use repetition, questions, and dashes. | Current user preferences and relevant samples govern style. Dates and pattern matches do not establish authorship. |

## Limits and maintenance

This is a static review of the files being installed, not a proof that an agent
will follow them. No independent behavioral security test or user evaluation of
writing quality has been completed. Host permissions enforce tool access;
Markdown cannot enforce a sandbox.

The eight approved posts are read from this repository. They enter the current
agent's model context; the skill adds no separate upload or rewriting service.
Their technical and economic claims were not audited as part of voice selection.

Review any replacement revision before updating it. Compare the complete skill,
links, tool requests, file tree, and relevant security history; then update the
commit and hash together. Reassess the project instructions against upstream
changes. Never update from a floating branch during a writing task.
