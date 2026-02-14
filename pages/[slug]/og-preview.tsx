import SinglePostOgPreview from "../../lib/components/OgPreview";
import { getSinglePost, getAllPosts } from "../../lib/server/markdown";
import { Post } from "../../lib/server/markdown/types";
import { glob } from "glob";
import path from "path";

const SinglePostOgPreviewPage = ({
  post,
  ogImages,
}: {
  post: Post;
  ogImages: string[];
}) => {
  return <SinglePostOgPreview post={post} ogImages={ogImages} />;
};

export async function getStaticPaths() {
  const posts = getAllPosts("content");
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

function isValidOgImage(filename: string): boolean {
  const isOgFile = filename === "og.png";
  const hasSocialSuffix =
    filename.includes("-instagramSquare") ||
    filename.includes("-smallCard") ||
    filename.includes("-twitterLarge") ||
    filename.includes("-twitterSquare");

  return isOgFile || !hasSocialSuffix;
}

async function findOgImages(slug: string): Promise<string[]> {
  const ogDir = path.join(process.cwd(), "public/assets/og", slug);

  try {
    const ogFiles = await glob("*.png", { cwd: ogDir });
    return ogFiles.filter(isValidOgImage).sort((a, b) => {
      if (a === "og.png") return -1;
      if (b === "og.png") return 1;
      return a.localeCompare(b);
    });
  } catch {
    return [];
  }
}

function cleanPostData(post: Post, slug: string) {
  return {
    ...post,
    slug,
    frontmatter: {
      title: post.frontmatter.title || null,
      date: post.frontmatter.date || null,
      path: post.frontmatter.path || null,
      meta: post.frontmatter.meta || null,
      categories: post.frontmatter.categories || [],
      tags: post.frontmatter.tags || [],
    },
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = getSinglePost(params.slug, "content");
  const ogImages = await findOgImages(params.slug);
  const cleanPost = cleanPostData(post, params.slug);

  return {
    props: { post: cleanPost, ogImages },
  };
}

export default SinglePostOgPreviewPage;
