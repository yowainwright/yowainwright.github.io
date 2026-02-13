#!/usr/bin/env bun

import { mkdir, writeFile, readdir, stat, rm } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import type { PostConfig, PostPath } from "./types";
import { DIRECTORIES, PROMPTS, MESSAGES, FILE_EXTENSIONS } from "./constants";

const prompt = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    process.stdout.write(question);
    process.stdin.once("data", (data) => {
      resolve(data.toString().trim());
    });
  });
};

const createComponentName = (slug: string): string => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

const generateMDXContent = (config: PostConfig): string => {
  const currentDate = new Date().toISOString().split("T")[0];
  const postDate = config.date || currentDate;
  const hasTags = config.tags && config.tags.length > 0;
  const tagsString = hasTags
    ? `tags: [${config.tags.map((tag) => `"${tag}"`).join(", ")}]`
    : "";

  return `---
title: "${config.title}"
date: "${postDate}"
path: "/${config.slug}"
meta: "${config.description}"
${hasTags ? tagsString : ""}
---

${config.description}

`;
};

const generateComponentIndex = (slug: string): string => {
  const componentName = createComponentName(slug);
  return `export { default as Example${componentName}Component } from './Example${componentName}Component';

`;
};

const generateExampleComponent = (slug: string): string => {
  const componentName = createComponentName(slug);

  return `import React from 'react';

interface Example${componentName}ComponentProps {

}

const Example${componentName}Component: React.FC<Example${componentName}ComponentProps> = () => {
  return (
    <div className="${slug}__example-component">
      <p>Example component for ${slug}</p>
    </div>
  );
};

export default Example${componentName}Component;
`;
};

const generateDataFile = (config: PostConfig): string => {
  const dataObject = {
    title: config.title,
    lastUpdated: new Date().toISOString(),
    data: {},
    sources: [],
  };

  return JSON.stringify(dataObject, null, 2);
};

const generateBuildScript = (slug: string): string => {
  const functionName = createComponentName(slug);

  return `#!/usr/bin/env bun

import { writeFile } from 'fs/promises';
import { join } from 'path';

async function build${functionName}() {
  console.log('Building ${slug} assets...');
  console.log('Build complete for ${slug}');
}

build${functionName}().catch(console.error);
`;
};

const generateReadme = (config: PostConfig): string => {
  return `# ${config.title}

${config.description}

## Structure

- \`content/${config.slug}${FILE_EXTENSIONS.MDX}\`
- \`components/content/${config.slug}/\`
- \`public/data/${config.slug}${FILE_EXTENSIONS.JSON}\`
- \`public/assets/${config.slug}/\`
- \`public/assets/og/${config.slug}/\`
- \`scripts/content/${config.slug}/\`

## Development

\`\`\`bash
bun scripts/content/${config.slug}/build${FILE_EXTENSIONS.TS}
\`\`\`
`;
};

const createDirectories = async (slug: string): Promise<void> => {
  const dirs = [
    join(process.cwd(), DIRECTORIES.COMPONENTS, slug),
    join(process.cwd(), DIRECTORIES.DATA),
    join(process.cwd(), DIRECTORIES.ASSETS, slug),
    join(process.cwd(), DIRECTORIES.OG, slug),
    join(process.cwd(), DIRECTORIES.SCRIPTS, slug),
  ];

  await Promise.all(dirs.map((dir) => mkdir(dir, { recursive: true })));
};

const createPostFiles = async (config: PostConfig): Promise<void> => {
  const { slug } = config;
  const componentName = createComponentName(slug);

  const files = [
    {
      path: join(
        process.cwd(),
        DIRECTORIES.CONTENT,
        `${slug}${FILE_EXTENSIONS.MDX}`,
      ),
      content: generateMDXContent(config),
    },
    {
      path: join(
        process.cwd(),
        DIRECTORIES.COMPONENTS,
        slug,
        `index${FILE_EXTENSIONS.TS}`,
      ),
      content: generateComponentIndex(slug),
    },
    {
      path: join(
        process.cwd(),
        DIRECTORIES.COMPONENTS,
        slug,
        `Example${componentName}Component${FILE_EXTENSIONS.TSX}`,
      ),
      content: generateExampleComponent(slug),
    },
    {
      path: join(
        process.cwd(),
        DIRECTORIES.DATA,
        `${slug}${FILE_EXTENSIONS.JSON}`,
      ),
      content: generateDataFile(config),
    },
    {
      path: join(
        process.cwd(),
        DIRECTORIES.SCRIPTS,
        slug,
        `build${FILE_EXTENSIONS.TS}`,
      ),
      content: generateBuildScript(slug),
    },
    {
      path: join(
        process.cwd(),
        DIRECTORIES.SCRIPTS,
        slug,
        `README${FILE_EXTENSIONS.MD}`,
      ),
      content: generateReadme(config),
    },
  ];

  await Promise.all(files.map((file) => writeFile(file.path, file.content)));
};

const createPost = async (config: PostConfig): Promise<void> => {
  await createDirectories(config.slug);
  await createPostFiles(config);
  console.log(MESSAGES.POST_CREATED);
};

const getRenamePaths = (oldSlug: string, newSlug: string): PostPath[] => {
  return [
    {
      from: join(
        process.cwd(),
        DIRECTORIES.CONTENT,
        `${oldSlug}${FILE_EXTENSIONS.MDX}`,
      ),
      to: join(
        process.cwd(),
        DIRECTORIES.CONTENT,
        `${newSlug}${FILE_EXTENSIONS.MDX}`,
      ),
    },
    {
      from: join(process.cwd(), DIRECTORIES.COMPONENTS, oldSlug),
      to: join(process.cwd(), DIRECTORIES.COMPONENTS, newSlug),
    },
    {
      from: join(
        process.cwd(),
        DIRECTORIES.DATA,
        `${oldSlug}${FILE_EXTENSIONS.JSON}`,
      ),
      to: join(
        process.cwd(),
        DIRECTORIES.DATA,
        `${newSlug}${FILE_EXTENSIONS.JSON}`,
      ),
    },
    {
      from: join(process.cwd(), DIRECTORIES.ASSETS, oldSlug),
      to: join(process.cwd(), DIRECTORIES.ASSETS, newSlug),
    },
    {
      from: join(process.cwd(), DIRECTORIES.OG, oldSlug),
      to: join(process.cwd(), DIRECTORIES.OG, newSlug),
    },
    {
      from: join(process.cwd(), DIRECTORIES.SCRIPTS, oldSlug),
      to: join(process.cwd(), DIRECTORIES.SCRIPTS, newSlug),
    },
  ];
};

const moveFile = async (fromPath: string, toPath: string): Promise<void> => {
  const content = await Bun.file(fromPath).text();
  await writeFile(toPath, content);
  await rm(fromPath);
};

const moveDirectory = async (
  fromPath: string,
  toPath: string,
): Promise<void> => {
  await mkdir(toPath, { recursive: true });
  const files = await readdir(fromPath, { recursive: true });

  const movePromises = files.map(async (file) => {
    const fromFile = join(fromPath, file);
    const toFile = join(toPath, file);
    const fileStats = await stat(fromFile);

    if (fileStats.isFile()) {
      await moveFile(fromFile, toFile);
    }
  });

  await Promise.all(movePromises);
  await rm(fromPath, { recursive: true });
};

const movePath = async (path: PostPath): Promise<void> => {
  const pathExists = existsSync(path.from);
  if (!pathExists) return;

  await rm(path.to, { recursive: true, force: true });
  await mkdir(path.to.substring(0, path.to.lastIndexOf("/")), {
    recursive: true,
  });

  const stats = await stat(path.from);
  const isDirectory = stats.isDirectory();

  if (isDirectory) {
    await moveDirectory(path.from, path.to);
  } else {
    await moveFile(path.from, path.to);
  }
};

const renamePost = async (oldSlug: string, newSlug: string): Promise<void> => {
  const paths = getRenamePaths(oldSlug, newSlug);
  await Promise.all(paths.map(movePath));
  console.log(MESSAGES.POST_RENAMED);
};

const getExistingPosts = async (): Promise<string[]> => {
  const contentDir = join(process.cwd(), DIRECTORIES.CONTENT);
  const dirExists = existsSync(contentDir);

  if (!dirExists) return [];

  const files = await readdir(contentDir);
  const mdxPattern = /\.(mdx?|md)$/;

  return files
    .filter((file) => mdxPattern.test(file))
    .map((file) => file.replace(mdxPattern, ""));
};

const listPosts = async (): Promise<string[]> => {
  const posts = await getExistingPosts();
  const hasPosts = posts.length > 0;

  if (!hasPosts) {
    console.log(MESSAGES.NO_POSTS);
    return [];
  }

  console.log("\nExisting posts:");
  posts.forEach((post, index) => {
    console.log(`${index + 1}. ${post}`);
  });

  return posts;
};

const handleCreateAction = async (): Promise<void> => {
  const slug = await prompt(PROMPTS.SLUG);
  const slugExists = !slug;

  if (slugExists) {
    console.log(MESSAGES.SLUG_REQUIRED);
    process.exit(1);
  }

  const mdxPath = join(
    process.cwd(),
    DIRECTORIES.CONTENT,
    `${slug}${FILE_EXTENSIONS.MDX}`,
  );
  const postExists = existsSync(mdxPath);

  if (postExists) {
    console.log(`${MESSAGES.POST_EXISTS}: ${slug}`);
    process.exit(1);
  }

  const defaultTitle = slug.replace(/-/g, " ");
  const title = await prompt(`${PROMPTS.TITLE} [${defaultTitle}]: `);
  const description = await prompt(PROMPTS.DESCRIPTION);
  const tagsInput = await prompt(PROMPTS.TAGS);

  const hasTags = Boolean(tagsInput);
  const tags = hasTags
    ? tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  const config: PostConfig = {
    slug,
    title: title || defaultTitle,
    description: description || `A post about ${title || defaultTitle}`,
    tags,
  };

  await createPost(config);
};

const handleRenameAction = async (): Promise<void> => {
  const posts = await listPosts();
  const noPosts = posts.length === 0;

  if (noPosts) {
    console.log("No posts to rename");
    process.exit(1);
  }

  const oldSlug = await prompt(`\n${PROMPTS.OLD_SLUG}`);
  const oldPostExists = posts.includes(oldSlug);

  if (!oldPostExists) {
    console.log(`${MESSAGES.POST_NOT_FOUND}: ${oldSlug}`);
    process.exit(1);
  }

  const newSlug = await prompt(PROMPTS.NEW_SLUG);
  const newPostExists = posts.includes(newSlug);

  if (newPostExists) {
    console.log(`${MESSAGES.POST_EXISTS}: ${newSlug}`);
    process.exit(1);
  }

  await renamePost(oldSlug, newSlug);
};

const main = async (): Promise<void> => {
  process.stdin.setRawMode(false);
  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  console.log("Post Manager\n");

  const action = await prompt(PROMPTS.ACTION);
  const actionLower = action.toLowerCase();

  const isCreate = actionLower === "c" || actionLower === "create";
  const isRename = actionLower === "r" || actionLower === "rename";
  const isList = actionLower === "l" || actionLower === "list";

  if (isCreate) {
    await handleCreateAction();
  } else if (isRename) {
    await handleRenameAction();
  } else if (isList) {
    await listPosts();
  } else {
    console.log(MESSAGES.INVALID_ACTION);
    process.exit(1);
  }

  process.exit(0);
};

main().catch(console.error);
