import { writeFileSync, mkdirSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { readFileSync } from "fs";
import matter from "gray-matter";
import { ImageResponse } from "@vercel/og";
import OgImage from "../../components/og";
import { OG_DIMENSIONS } from "../../components/og/constants";
import { Post } from "./types";
import { extractChartData } from "./charts";
import { extractAllContentForOg } from "./utils";

function getAllPostsForGeneration(): Post[] {
  const contentDir = join(process.cwd(), "content");
  const allFiles = readdirSync(contentDir).filter(
    (file) => file.endsWith(".mdx") || file.endsWith(".md"),
  );

  return allFiles.map((file) => {
    const filePath = join(contentDir, file);
    const stats = statSync(filePath);
    const content = readFileSync(filePath, "utf8");
    const { data } = matter(content);
    const isMdx = file.endsWith(".mdx");
    const slug = file.replace(/\.(mdx?|md)$/, "");

    return {
      title: data?.title ?? "Untitled",
      slug,
      modifiedTime: stats.mtime,
      isMdx,
    };
  });
}

function getRecentPosts(): Post[] {
  return getAllPostsForGeneration()
    .sort((a, b) => b.modifiedTime.getTime() - a.modifiedTime.getTime())
    .slice(0, 2);
}

async function generateVariantImages(post: Post) {
  const outputDir = join(process.cwd(), "public", "assets", "og", post.slug);
  mkdirSync(outputDir, { recursive: true });

  const chartData = post?.isMdx ? extractChartData(post.slug) : null;
  const allContent = post?.isMdx ? extractAllContentForOg(post.slug) : [];
  const variants = [];

  if (chartData) {
    variants.push({ content: chartData, suffix: "chart" });
  }

  allContent.forEach((content, index) => {
    const suffix =
      content.type === "mermaid"
        ? `mermaid-${content.index || index + 1}`
        : `code-${content.index || index + 1}`;
    variants.push({ content, suffix });
  });

  if (variants.length === 0) {
    variants.push({ content: null, suffix: "default" });
  }

  const results = await Promise.allSettled(
    variants.map(async ({ content, suffix }) => {
      const imageResponse = new ImageResponse(
        OgImage({
          title: post?.title ?? "Untitled",
          slug: post?.slug ?? "",
          content,
        }),
        OG_DIMENSIONS,
      );

      const arrayBuffer = await imageResponse.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const filename = suffix === "default" ? "og.png" : `og-${suffix}.png`;
      writeFileSync(join(outputDir, filename), buffer);
      writeFileSync(join(outputDir, "favicon.png"), buffer);

      return { slug: post.slug, variant: suffix };
    }),
  );

  return results;
}

async function generateOgImages() {
  const posts = getRecentPosts();

  const results = await Promise.allSettled(posts.map(generateVariantImages));

  results.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(
        `Failed to generate OG for ${posts[index]?.slug}:`,
        result.reason,
      );
    }
  });
}

generateOgImages().catch(console.error);
