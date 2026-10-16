# Walter skill review

Reviewed 2026-09-08. Scope: the skill text, supporting references, licenses,
repository trees, available commit history, and public issues/PRs in the two
requested repositories. This is a static installation and instruction review;
it does not establish that a model will follow the instructions safely or that
the prose will pass an AI detector.

## Reviewed revisions

| Source | Commit | Skills | License |
| --- | --- | ---: | --- |
| [no-slop-ai-humanizer-rewriter](https://github.com/walterwritesai/no-slop-ai-humanizer-rewriter/tree/ef668580dc8782b7241b16ea77ae513737602616) | `ef668580dc8782b7241b16ea77ae513737602616` | 2 | CC BY-ND 4.0 |
| [walter-skills](https://github.com/walterwritesai/walter-skills/tree/d043f4c5b21155f8c6b389d64010561af5ce5979) | `d043f4c5b21155f8c6b389d64010561af5ce5979` | 12 | MIT |

[sources.json](sources.json) records every installed file's source path, byte
count, and SHA-256 hash. The repository trees contained only directories and
regular, non-executable Markdown/license files, with no symlinks, submodules,
hooks, manifests for executable packages, or installation scripts. Full reads
and a character scan found no hidden control characters or HTML comments in the
installed material. No open or closed issues/PRs were returned for either source
at review time.

GitHub reported the no-slop revision as verified and the Walter Skills revision
as unverified. Commit verification and content hashes are not independent proof
of author identity or safe instructions.

## Findings that affect use

1. **Walter MCP sends content to an external service.** All 12 Walter Skills
   workflows depend on Walter's tools. For example,
   [SEO Writer](https://github.com/walterwritesai/walter-skills/blob/d043f4c5b21155f8c6b389d64010561af5ce5979/skills/seo-writer/SKILL.md)
   directs agents to use the connector automatically for content work, including
   pasted text, and to repeat processing based on detector scores. Installing a
   skill is not permission to disclose private drafts. These workflows require
   the explicit `--include-walter-mcp` installer option; the default installs the
   two local skills. No Walter MCP implementation, data-retention policy, or
   account configuration was audited or installed.

2. **Example rewrites can change facts.** The local skills' shared
   [examples](https://github.com/walterwritesai/no-slop-ai-humanizer-rewriter/blob/ef668580dc8782b7241b16ea77ae513737602616/humanizer/references/examples.md)
   add a two-year time period to a vague industry-change claim and change a
   suggestion for a holistic content strategy into a claim favoring a narrow
   strategy. Compare every edit with its source; do not copy example claims into
   a draft. Neither a self-assigned score nor a detector score verifies fidelity.

3. **Blanket style bans conflict with Jeff's samples.** The local writer and
   humanizer reject adverbs, em dashes, question-word openings, and three-part
   lists broadly. The Walter brand template also defaults to a second-person,
   confident voice. Jeff's current instructions, actual source material, and
   [custom Humanizer guidance](humanizer/SKILL.md) take precedence when writing
   in his voice. Installing these generic skills does not train them on his posts.

4. **One upstream reference is incomplete.**
   [humanizer/references/structures.md](https://github.com/walterwritesai/no-slop-ai-humanizer-rewriter/blob/ef668580dc8782b7241b16ea77ae513737602616/humanizer/references/structures.md)
   ends mid-example at the 3,317-byte file boundary. The writer's version is
   longer and complete. The installer preserves both reviewed files as supplied;
   it does not silently substitute or repair the reference.

5. **The licenses differ.** The no-slop
   [license](https://github.com/walterwritesai/no-slop-ai-humanizer-rewriter/blob/ef668580dc8782b7241b16ea77ae513737602616/LICENSE)
   identifies Walter Writes AI and CC BY-ND 4.0. Walter Skills uses MIT. Each
   installed skill includes the respective upstream license. Third-party text
   is downloaded unchanged into ignored directories; no adapted third-party
   skill text is included in this repository's tracked source.

## Installer controls and validation

The installer downloads individual files from fixed HTTPS GitHub URLs at the
reviewed commits. It does not use a registry, clone repositories, extract an
archive, execute upstream code, install packages, configure MCP, or submit prose.
Redirects are rejected. Downloads have a 15-second timeout, are bounded to the
reviewed byte count (at most 64 KiB), and must match the recorded SHA-256 hash.
Every missing file must pass before installation begins.

Destination names and paths are restricted to skill names, `SKILL.md`, `LICENSE`,
and Markdown references. Existing directory symlinks, file symlinks, changed
files, and conflicting Claude discovery links are rejected. New files use
exclusive creation with non-executable permissions. Existing identical files
are left in place. An interrupted filesystem write may leave a partial install;
rerunning fills missing files without overwriting existing content.

The focused tests cover exact bytes and references, repeat installation without
downloads, hash/size/HTTP failures, path traversal, unpinned revisions, conflicting
provider links, and preservation of local edits. All 14 tests passed, along with
focused type, lint, and format checks. Tests use local fixtures and mocked HTTP
responses. The two local skills were also installed from GitHub: all 10 installed
files match the manifest bytes and hashes, have no executable permissions, and
are Git-ignored. Claude discovery links resolve to those files, and the existing
custom Humanizer resolves through both provider directories. No writing-quality
benchmark or detector test was run.

Keep the host's normal approval and network controls in place. Markdown
instructions are not a sandbox. Review upstream changes again before updating
the pins or hashes.
