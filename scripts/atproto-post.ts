#!/usr/bin/env bun

import fs from "node:fs";
import path from "node:path";
import { createLogger } from "../lib/server/logger";
import { AtProtoClient } from "../lib/server/atproto";
import { getAllPostsArchive, getSinglePost } from "../lib/server/markdown";
import {
  DEFAULT_OG_IMAGE,
  OG_IMAGE_DIR,
} from "../lib/components/OgMeta/constants";

const log = createLogger("atproto-post");

const SITE_URL = "https://jeffry.in";

const getPublicAssetPath = (assetPath: string): string | undefined => {
  const absolutePath = path.join(
    process.cwd(),
    "public",
    assetPath.replace(/^\//, ""),
  );
  return fs.existsSync(absolutePath) ? absolutePath : undefined;
};

const getPostImagePath = (slug: string): string => {
  const candidateImagePath = `${OG_IMAGE_DIR}/${slug}/1.png`;
  return getPublicAssetPath(candidateImagePath)
    ? candidateImagePath
    : DEFAULT_OG_IMAGE;
};

const postToAtProto = async (slug: string): Promise<void> => {
  const post = getSinglePost(slug, "content");
  const title = post.frontmatter.title || slug;
  const description =
    post.frontmatter.description ||
    post.frontmatter.meta ||
    `Posted on ${post.frontmatter.date}`;
  const imagePath = getPublicAssetPath(getPostImagePath(slug));

  const url = `${SITE_URL}/${slug}/`;

  const client = new AtProtoClient();
  await client.login();

  log.info(
    { slug, title, hasImage: Boolean(imagePath) },
    "posting to AT Protocol",
  );

  const result = await client.createPost({
    text: `${title}\n\n${url}`,
    embed: {
      uri: url,
      title,
      description,
      thumbPath: imagePath,
    },
  });

  log.info({ uri: result.uri, cid: result.cid }, "post created");
};

const listPosts = (): void => {
  const posts = getAllPostsArchive("content");

  log.info({ count: posts.length }, "available posts");
  for (const post of posts.slice(0, 20)) {
    const imagePath = getPublicAssetPath(getPostImagePath(post.slug));
    log.info(
      {
        slug: post.slug,
        title: post.frontmatter.title,
        date: post.frontmatter.date,
        hasImage: Boolean(imagePath),
      },
      "post",
    );
  }
  log.info({ remaining: posts.length - 20 }, "more posts available");
};

const main = async () => {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === "list") {
    listPosts();
    return;
  }

  if (command === "post" && args[1]) {
    await postToAtProto(args[1]);
    return;
  }

  log.info("usage: bun scripts/atproto-post.ts <command>");
  log.info("commands: list, post <slug>");
  log.info("env: ATP_PDS_URL, ATP_IDENTIFIER, ATP_PASSWORD");
};

main().catch((err) => {
  log.error({ error: String(err) }, "failed");
  process.exit(1);
});
