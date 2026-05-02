import React from "react";
import Head from "next/head";
import {
  DEFAULT_AUTHOR,
  DEFAULT_LOCALE,
  DEFAULT_OG_IMAGE,
  DEFAULT_SITE_NAME,
  FEDIVERSE_CREATOR,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  SITE_URL,
  TWITTER_CREATOR,
} from "./constants";

type MetaTagProps =
  | {
      property: string;
      name?: never;
      content?: string | number | null;
    }
  | {
      name: string;
      property?: never;
      content?: string | number | null;
    };

export function MetaTag({ content, ...props }: MetaTagProps) {
  if (content === undefined || content === null || content === "") return null;
  return <meta {...props} content={String(content)} />;
}

interface OgMetaProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  slug?: string;
  date?: string;
  tags?: string[];
  wordCount?: number;
}

function createAbsoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  const normalizedPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${normalizedPath}`;
}

function createPostUrl(slug?: string, url?: string): string {
  if (url) return createAbsoluteUrl(url);
  if (!slug) return SITE_URL;
  return createAbsoluteUrl(`/${slug}/`);
}

function createIsoDate(date?: string): string | undefined {
  if (!date) return undefined;
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return undefined;
  return parsedDate.toISOString();
}

function createJsonLd({
  title,
  description,
  canonicalUrl,
  imageUrl,
  date,
  tags,
  wordCount,
}: {
  title: string;
  description: string;
  canonicalUrl: string;
  imageUrl: string;
  date?: string;
  tags?: string[];
  wordCount?: number;
}) {
  const publishedDate = createIsoDate(date);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: imageUrl,
    ...(publishedDate && {
      datePublished: publishedDate,
      dateModified: publishedDate,
    }),
    author: {
      "@type": "Person",
      name: DEFAULT_AUTHOR,
      url: `${SITE_URL}/about/`,
    },
    publisher: {
      "@type": "Person",
      name: DEFAULT_AUTHOR,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    inLanguage: "en-US",
    ...(tags?.length && { keywords: tags.join(", ") }),
    ...(wordCount && { wordCount }),
  };
}

export function OgMeta({
  title = DEFAULT_SITE_NAME,
  description = "",
  url,
  image = DEFAULT_OG_IMAGE,
  slug,
  date,
  tags = [],
  wordCount,
}: OgMetaProps) {
  const canonicalUrl = createPostUrl(slug, url);
  const imageUrl = createAbsoluteUrl(image);
  const publishedDate = createIsoDate(date);
  const jsonLd = createJsonLd({
    title,
    description,
    canonicalUrl,
    imageUrl,
    date,
    tags,
    wordCount,
  });

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} itemProp="url" />
      <MetaTag property="og:locale" content={DEFAULT_LOCALE} />
      <MetaTag property="og:site_name" content={DEFAULT_SITE_NAME} />
      <MetaTag property="og:title" content={title} />
      <MetaTag property="og:description" content={description} />
      <MetaTag property="og:url" content={canonicalUrl} />
      <MetaTag property="og:type" content={slug ? "article" : "website"} />
      <MetaTag property="og:image" content={imageUrl} />
      <MetaTag property="og:image:width" content={OG_IMAGE_WIDTH} />
      <MetaTag property="og:image:height" content={OG_IMAGE_HEIGHT} />
      <MetaTag property="og:image:alt" content={title} />
      <MetaTag property="article:published_time" content={publishedDate} />
      {tags.map((tag) => (
        <MetaTag key={tag} property="article:tag" content={tag} />
      ))}
      <MetaTag name="twitter:card" content="summary_large_image" />
      <MetaTag name="twitter:title" content={title} />
      <MetaTag name="twitter:description" content={description} />
      <MetaTag name="twitter:image" content={imageUrl} />
      <MetaTag name="twitter:creator" content={TWITTER_CREATOR} />
      <MetaTag name="fediverse:creator" content={FEDIVERSE_CREATOR} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}
