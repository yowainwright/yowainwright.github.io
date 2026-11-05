import type manifest from "../../lib/agents/sources.json";

export type Source = (typeof manifest.sources)[number];
export type Skill = Source["skills"][number];
export type FileEntry = Skill["files"][number];
export type Download = typeof fetch;
export type SkillFile = { path: string; entry: FileEntry };
export type PlannedFile = SkillFile & { url: string };
export type VerifiedFile = { file: SkillFile; bytes: Buffer };
export type SkillLink = { path: string; target: string };

export type HookName = "pre-commit" | "commit-msg" | "post-merge";
export type HookFingerprint = { checksum: number; length: number };
export type HookAction = "installed" | "updated" | "skipped";
export type InstallOptions = { target: "all" | "hooks" | "skills"; includeWalter: boolean };
