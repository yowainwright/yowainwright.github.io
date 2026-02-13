"use client";

import { useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { getAllPosts, getSinglePost } from "../../lib/server/markdown";
import { SITE_URL, DEFAULT_AUTHOR } from "../../components/OgMeta/constants";

const FacebookPreviews = dynamic(
  () =>
    import("@automattic/social-previews").then((mod) => mod.FacebookPreviews),
  { ssr: false },
);

const TwitterPreviews = dynamic(
  () =>
    import("@automattic/social-previews").then((mod) => mod.TwitterPreviews),
  { ssr: false },
);

const LinkedInPreviews = dynamic(
  () =>
    import("@automattic/social-previews").then((mod) => mod.LinkedInPreviews),
  { ssr: false },
);

const GoogleSearchPreview = dynamic(
  () =>
    import("@automattic/social-previews").then(
      (mod) => mod.GoogleSearchPreview,
    ),
  { ssr: false },
);

interface PreviewPageProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  url: string;
  tags: string[];
  wordCount: number;
}

const MetaTagsSection = ({
  title,
  description,
  url,
  imageUrl,
  date,
  tags,
}: PreviewPageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isoDate = new Date(date).toISOString();

  const metaTags = [
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:type", content: "article" },
    { property: "og:image", content: imageUrl },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "article:published_time", content: isoDate },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    ...tags.map((tag) => ({ property: "article:tag", content: tag })),
  ];

  return (
    <div style={styles.section}>
      <button onClick={() => setIsOpen(!isOpen)} style={styles.toggle}>
        {isOpen ? "Hide" : "Show"} Meta Tags ({metaTags.length})
      </button>
      {isOpen && (
        <pre style={styles.code}>
          {metaTags.map((tag, i) => (
            <div key={i}>
              &lt;meta{" "}
              {tag.property
                ? `property="${tag.property}"`
                : `name="${tag.name}"`}{" "}
              content="{tag.content}" /&gt;
            </div>
          ))}
        </pre>
      )}
    </div>
  );
};

const JsonLdSection = ({
  title,
  description,
  url,
  imageUrl,
  date,
  wordCount,
}: PreviewPageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isoDate = new Date(date).toISOString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: imageUrl,
    datePublished: isoDate,
    dateModified: isoDate,
    author: {
      "@type": "Person",
      name: DEFAULT_AUTHOR,
      url: `${SITE_URL}/about`,
    },
    publisher: {
      "@type": "Person",
      name: DEFAULT_AUTHOR,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    inLanguage: "en-US",
    wordCount,
  };

  return (
    <div style={styles.section}>
      <button onClick={() => setIsOpen(!isOpen)} style={styles.toggle}>
        {isOpen ? "Hide" : "Show"} JSON-LD Schema
      </button>
      {isOpen && (
        <pre style={styles.code}>{JSON.stringify(jsonLd, null, 2)}</pre>
      )}
    </div>
  );
};

export default function PreviewPage(props: PreviewPageProps) {
  const { slug, title, description, imageUrl, url } = props;

  return (
    <>
      <Head>
        <title>Preview: {title} | Jeffry.in</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/@automattic/social-previews@3.0.0/style.css"
        />
      </Head>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.h1}>Social Preview: {slug}</h1>
          <a href={`/${slug}`} style={styles.link}>
            View Post
          </a>
        </header>

        <section style={styles.section}>
          <h2 style={styles.h2}>OG Image</h2>
          <img src={imageUrl} alt="OG Preview" style={styles.ogImage} />
          <p style={styles.imageInfo}>1200 x 630px</p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Twitter / X</h2>
          <div style={styles.previewWrapper}>
            <TwitterPreviews
              tweets={[
                {
                  date: Date.now(),
                  name: DEFAULT_AUTHOR,
                  profileImage:
                    "https://pbs.twimg.com/profile_images/1265754417220501506/gv6HHbYH_400x400.jpg",
                  screenName: "@yowainwright",
                  text: title,
                  card: {
                    type: "summary_large_image",
                    title,
                    description,
                    image: imageUrl,
                    url,
                  },
                },
              ]}
            />
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Facebook</h2>
          <div style={styles.previewWrapper}>
            <FacebookPreviews
              title={title}
              description={description}
              url={url}
              image={imageUrl}
              user={{ displayName: DEFAULT_AUTHOR }}
            />
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>LinkedIn</h2>
          <div style={styles.previewWrapper}>
            <LinkedInPreviews
              jobTitle="Software Engineer"
              image={imageUrl}
              name={DEFAULT_AUTHOR}
              profileImage="https://pbs.twimg.com/profile_images/1265754417220501506/gv6HHbYH_400x400.jpg"
              title={title}
              description={description}
              url={url}
            />
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Google Search</h2>
          <div style={styles.previewWrapper}>
            <GoogleSearchPreview
              title={title}
              description={description}
              url={url}
              siteTitle="Jeffry.in"
            />
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Raw Data</h2>
          <MetaTagsSection {...props} />
          <JsonLdSection {...props} />
        </section>
      </div>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "system-ui, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: 20,
  },
  h1: {
    fontSize: 24,
    fontWeight: 600,
    margin: 0,
  },
  h2: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 16,
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
  },
  section: {
    marginBottom: 40,
  },
  ogImage: {
    maxWidth: "100%",
    borderRadius: 8,
    border: "1px solid #e5e7eb",
  },
  imageInfo: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 8,
  },
  previewWrapper: {
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: 20,
    background: "#f9fafb",
  },
  toggle: {
    background: "#f3f4f6",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: 14,
    marginBottom: 12,
  },
  code: {
    background: "#1f2937",
    color: "#f9fafb",
    padding: 16,
    borderRadius: 8,
    overflow: "auto",
    fontSize: 13,
    lineHeight: 1.6,
  },
};

export function getStaticPaths() {
  const paths = getAllPosts("content").map(
    ({ slug }: { slug: string }) => `/preview/${slug}`,
  );
  return {
    paths,
    fallback: false,
  };
}

interface StaticProps {
  params: {
    slug: string;
  };
}

export const getStaticProps = async ({ params }: StaticProps) => {
  const data = getSinglePost(params.slug, "content");
  const wordCount = (data.content || "").split(/\s+/).filter(Boolean).length;
  const description =
    data.frontmatter?.description || data.frontmatter?.meta || "";

  return {
    props: {
      slug: params.slug,
      title: data.frontmatter?.title || "",
      description,
      date: data.frontmatter?.date || "",
      imageUrl: `${SITE_URL}/og/${params.slug}/img-1.png`,
      url: `${SITE_URL}/${params.slug}`,
      tags: data.frontmatter?.tags || [],
      wordCount,
    },
  };
};
