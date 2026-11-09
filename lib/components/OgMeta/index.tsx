import React from "react";
import Head from "next/head";
import {
  SITE_URL,
  DEFAULT_AUTHOR,
  DEFAULT_OG_IMAGE,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
  TWITTER_HANDLE,
} from "./constants";
import type { OgMetaProps, JsonLdInput } from "./types";

export function OgMeta({
  title = "",
  description = "",
  slug,
  imagePath,
  date,
  tags = [],
  wordCount,
}: OgMetaProps) {
  const url = buildUrl(slug);
  const imageUrl = buildImageUrl(imagePath);
  const isoDate = toIsoDate(date);
  const schemaType = getSchemaType(slug);
  const isBlogPosting = schemaType === "BlogPosting";
  const ogType = isBlogPosting ? "article" : "website";
  const publishedTime = isBlogPosting && isoDate;
  const articleTags = isBlogPosting ? tags : [];
  const jsonLd = buildJsonLd({
    schemaType,
    title,
    description,
    url,
    imageUrl,
    isoDate,
    wordCount,
  });

  const jsonLdHtml = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content={OG_IMAGE_WIDTH} />
      <meta property="og:image:height" content={OG_IMAGE_HEIGHT} />
      <meta property="og:image:alt" content={title} />
      {publishedTime && <meta property="article:published_time" content={isoDate} />}
      {articleTags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml }} />
    </Head>
  );
}

function getSchemaType(slug?: string): JsonLdInput["schemaType"] {
  if (slug === "about") return "AboutPage";
  if (slug === "resume") return "ProfilePage";
  return "BlogPosting";
}

function buildUrl(slug?: string): string {
  return slug ? `${SITE_URL}/${slug}/` : `${SITE_URL}/`;
}

function buildImageUrl(imagePath?: string): string {
  const path = imagePath || DEFAULT_OG_IMAGE;
  return `${SITE_URL}${path}`;
}

function toIsoDate(date?: string): string {
  if (!date) return "";
  try {
    return new Date(date).toISOString();
  } catch {
    return "";
  }
}

function buildJsonLd({
  schemaType,
  title,
  description,
  url,
  imageUrl,
  isoDate,
  wordCount,
}: JsonLdInput) {
  const baseJsonLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    headline: title,
    description,
    image: imageUrl,
    datePublished: isoDate,
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
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "en-US",
  };
  const isBlogPosting = schemaType === "BlogPosting";
  const includeWordCount = isBlogPosting && Boolean(wordCount);
  const wordCountJsonLd = includeWordCount ? { wordCount } : {};
  const subjectJsonLd = isBlogPosting ? {} : { mainEntity: baseJsonLd.author };
  return Object.assign({}, baseJsonLd, wordCountJsonLd, subjectJsonLd);
}
