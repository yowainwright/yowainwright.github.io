#!/usr/bin/env bun

import fs from "node:fs";
import path from "node:path";
import { createLogger } from "../lib/logger";
import { AtProtoClient } from "../lib/atproto";

const log = createLogger("atproto-post");

const OG_DIR = path.join(process.cwd(), "public/og");
const SITE_URL = "https://jeffry.in";

interface PostManifest {
  slug: string;
  title: string;
  images: string[];
  primary: string;
  generatedAt: string;
}

interface OgManifest {
  generatedAt: string;
  posts: Array<{
    slug: string;
    title: string;
    date: string;
    strategy: string;
  }>;
}

const getPostManifest = (slug: string): PostManifest | null => {
  const manifestPath = path.join(OG_DIR, slug, "manifest.json");
  if (!fs.existsSync(manifestPath)) return null;
  return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
};

const getOgManifest = (): OgManifest | null => {
  const manifestPath = path.join(OG_DIR, "manifest.json");
  if (!fs.existsSync(manifestPath)) return null;
  return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
};

const postToAtProto = async (slug: string): Promise<void> => {
  const ogManifest = getOgManifest();
  if (!ogManifest) {
    log.error("OG manifest not found. Run build:og first.");
    process.exit(1);
  }

  const postInfo = ogManifest.posts.find((p) => p.slug === slug);
  if (!postInfo) {
    log.error({ slug }, "Post not found in manifest");
    process.exit(1);
  }

  const postManifest = getPostManifest(slug);
  const imagePath = postManifest
    ? path.join(OG_DIR, slug, postManifest.primary)
    : path.join(OG_DIR, "default.png");

  const url = `${SITE_URL}/${slug}`;

  const client = new AtProtoClient();
  await client.login();

  log.info({ slug, title: postInfo.title }, "posting to AT Protocol");

  const result = await client.createPost({
    text: `${postInfo.title}\n\n${url}`,
    embed: {
      uri: url,
      title: postInfo.title,
      description: `Posted on ${postInfo.date}`,
      thumbPath: imagePath,
    },
  });

  log.info({ uri: result.uri, cid: result.cid }, "post created");
};

const listPosts = (): void => {
  const manifest = getOgManifest();
  if (!manifest) {
    log.error("OG manifest not found. Run build:og first.");
    process.exit(1);
  }

  log.info({ count: manifest.posts.length }, "available posts");
  for (const post of manifest.posts.slice(0, 20)) {
    const hasOg = fs.existsSync(path.join(OG_DIR, post.slug, "manifest.json"));
    log.info(
      { slug: post.slug, title: post.title, date: post.date, hasOg },
      "post",
    );
  }
  log.info({ remaining: manifest.posts.length - 20 }, "more posts available");
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
