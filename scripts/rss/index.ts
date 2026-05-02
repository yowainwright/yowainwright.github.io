#!/usr/bin/env bun

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { createLogger } from "../../lib/server/logger";
import {
  SITE_URL,
  SITE_TITLE,
  SITE_DESCRIPTION,
  AUTHOR_NAME,
  AUTHOR_EMAIL,
  CONTENT_DIR,
  OUTPUT_DIR,
  EXCLUDE_SLUGS,
  SITEMAP_EXCLUDE,
  MAX_ITEMS,
} from "./constants";
import type { Post, JsonFeed, SitemapEntry } from "./types";

const log = createLogger("generate-rss");

const escapeXml = (str: string): string =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const getPosts = (): Post[] => {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const posts = files
    .map((fileName) => {
      const slug = fileName.replace(/\.(md|mdx)$/, "");
      if (EXCLUDE_SLUGS.includes(slug)) return null;

      const filePath = path.join(CONTENT_DIR, fileName);
      const source = fs.readFileSync(filePath, "utf8");
      const { data: frontmatter, content } = matter(source);

      const date = new Date(frontmatter.date);
      if (isNaN(date.getTime())) return null;

      return {
        slug,
        title: frontmatter.title || slug,
        description: frontmatter.description || frontmatter.meta || "",
        date,
        url: `${SITE_URL}/${slug}`,
        content: content.slice(0, 500),
      };
    })
    .filter((post): post is Post => post !== null);

  return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
};

const buildRssXml = (posts: Post[]): string => {
  const latestDate = posts[0]?.date.toUTCString() || new Date().toUTCString();

  const items = posts
    .slice(0, MAX_ITEMS)
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${post.url}</link>
      <guid isPermaLink="true">${post.url}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${post.date.toUTCString()}</pubDate>
      <author>${AUTHOR_EMAIL} (${AUTHOR_NAME})</author>
    </item>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${latestDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/apple-icon-180x180.png</url>
      <title>${escapeXml(SITE_TITLE)}</title>
      <link>${SITE_URL}</link>
    </image>${items}
  </channel>
</rss>`;
};

const buildAtomXml = (posts: Post[]): string => {
  const latestDate = posts[0]?.date.toISOString() || new Date().toISOString();

  const entries = posts
    .slice(0, MAX_ITEMS)
    .map(
      (post) => `
  <entry>
    <title>${escapeXml(post.title)}</title>
    <link href="${post.url}" rel="alternate" type="text/html"/>
    <id>${post.url}</id>
    <published>${post.date.toISOString()}</published>
    <updated>${post.date.toISOString()}</updated>
    <summary>${escapeXml(post.description)}</summary>
    <author>
      <name>${AUTHOR_NAME}</name>
      <email>${AUTHOR_EMAIL}</email>
    </author>
  </entry>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(SITE_TITLE)}</title>
  <link href="${SITE_URL}" rel="alternate" type="text/html"/>
  <link href="${SITE_URL}/atom.xml" rel="self" type="application/atom+xml"/>
  <id>${SITE_URL}/</id>
  <updated>${latestDate}</updated>
  <subtitle>${escapeXml(SITE_DESCRIPTION)}</subtitle>
  <author>
    <name>${AUTHOR_NAME}</name>
    <email>${AUTHOR_EMAIL}</email>
  </author>${entries}
</feed>`;
};

const buildJsonFeed = (posts: Post[]): string => {
  const items = posts.slice(0, MAX_ITEMS).map((post) => ({
    id: post.url,
    url: post.url,
    title: post.title,
    summary: post.description,
    date_published: post.date.toISOString(),
    author: {
      name: AUTHOR_NAME,
    },
  }));

  const feed: JsonFeed = {
    version: "https://jsonfeed.org/version/1.1",
    title: SITE_TITLE,
    home_page_url: SITE_URL,
    feed_url: `${SITE_URL}/feed.json`,
    description: SITE_DESCRIPTION,
    author: {
      name: AUTHOR_NAME,
      url: `${SITE_URL}/about`,
    },
    items,
  };

  return JSON.stringify(feed, null, 2);
};

const getSitemapEntries = (posts: Post[]): SitemapEntry[] => {
  const staticPages: SitemapEntry[] = [
    { loc: SITE_URL, changefreq: "weekly", priority: 1.0 },
    { loc: `${SITE_URL}/archive`, changefreq: "weekly", priority: 0.8 },
    { loc: `${SITE_URL}/about`, changefreq: "monthly", priority: 0.7 },
    { loc: `${SITE_URL}/resume`, changefreq: "monthly", priority: 0.7 },
  ];

  const postEntries: SitemapEntry[] = posts
    .filter((post) => !SITEMAP_EXCLUDE.includes(post.slug))
    .map((post) => ({
      loc: post.url,
      lastmod: post.date.toISOString().split("T")[0],
      changefreq: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticPages, ...postEntries];
};

const buildSitemapXml = (entries: SitemapEntry[]): string => {
  const urls = entries
    .map(
      (entry) => `
  <url>
    <loc>${entry.loc}</loc>${entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ""}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;
};

const buildRobotsTxt = (): string => {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
};

const main = () => {
  const posts = getPosts();
  log.info({ count: posts.length }, "found posts");

  const rssXml = buildRssXml(posts);
  fs.writeFileSync(path.join(OUTPUT_DIR, "rss.xml"), rssXml);
  log.info("generated rss.xml");

  const atomXml = buildAtomXml(posts);
  fs.writeFileSync(path.join(OUTPUT_DIR, "atom.xml"), atomXml);
  log.info("generated atom.xml");

  const jsonFeed = buildJsonFeed(posts);
  fs.writeFileSync(path.join(OUTPUT_DIR, "feed.json"), jsonFeed);
  log.info("generated feed.json");

  const sitemapEntries = getSitemapEntries(posts);
  const sitemapXml = buildSitemapXml(sitemapEntries);
  fs.writeFileSync(path.join(OUTPUT_DIR, "sitemap.xml"), sitemapXml);
  log.info({ count: sitemapEntries.length }, "generated sitemap.xml");

  const robotsTxt = buildRobotsTxt();
  fs.writeFileSync(path.join(OUTPUT_DIR, "robots.txt"), robotsTxt);
  log.info("generated robots.txt");

  log.info("feeds and sitemap generated successfully");
};

main();
