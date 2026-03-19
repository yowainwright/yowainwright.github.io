import React from "react";
import Head from "next/head";
import {
  SITE_URL,
  DEFAULT_AUTHOR,
  DEFAULT_OG_IMAGE,
  OG_IMAGE_DIR,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
  TWITTER_HANDLE,
} from "./constants";
import type {
  OgMetaProps,
  OgMetaTagProps,
  NameMetaTagProps,
  JsonLdInput,
} from "./types";

function buildUrl(slug?: string): string {
  return slug ? `${SITE_URL}/${slug}` : SITE_URL;
}

function buildImageUrl(slug?: string): string {
  const path = slug ? `${OG_IMAGE_DIR}/${slug}/1.png` : DEFAULT_OG_IMAGE;
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
  title,
  description,
  url,
  imageUrl,
  isoDate,
  wordCount,
}: JsonLdInput) {
  return {
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
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "en-US",
    ...(wordCount ? { wordCount } : {}),
  };
}

function PropertyMeta({ property, content }: OgMetaTagProps) {
  if (!content) return null;
  return <meta property={property} content={content} />;
}

function NameMeta({ name, content }: NameMetaTagProps) {
  if (!content) return null;
  return <meta name={name} content={content} />;
}

function OgCoreTags({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return (
    <>
      <PropertyMeta property="og:title" content={title} />
      <PropertyMeta property="og:description" content={description} />
      <PropertyMeta property="og:url" content={url} />
      <PropertyMeta property="og:type" content="article" />
    </>
  );
}

function OgImageTags({ imageUrl }: { imageUrl: string }) {
  return (
    <>
      <PropertyMeta property="og:image" content={imageUrl} />
      <PropertyMeta property="og:image:width" content={OG_IMAGE_WIDTH} />
      <PropertyMeta property="og:image:height" content={OG_IMAGE_HEIGHT} />
    </>
  );
}

function ArticleTags({
  isoDate,
  tags,
}: {
  isoDate: string;
  tags: readonly string[];
}) {
  return (
    <>
      {isoDate && (
        <PropertyMeta property="article:published_time" content={isoDate} />
      )}
      {tags.map((tag) => (
        <PropertyMeta key={tag} property="article:tag" content={tag} />
      ))}
    </>
  );
}

function TwitterTags({
  title,
  description,
  imageUrl,
}: {
  title: string;
  description: string;
  imageUrl: string;
}) {
  return (
    <>
      <NameMeta name="twitter:card" content="summary_large_image" />
      <NameMeta name="twitter:title" content={title} />
      <NameMeta name="twitter:description" content={description} />
      <NameMeta name="twitter:image" content={imageUrl} />
      <NameMeta name="twitter:creator" content={TWITTER_HANDLE} />
    </>
  );
}

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OgMeta({
  title = "",
  description = "",
  slug,
  date,
  tags = [],
  wordCount,
}: OgMetaProps) {
  const url = buildUrl(slug);
  const imageUrl = buildImageUrl(slug);
  const isoDate = toIsoDate(date);
  const jsonLd = buildJsonLd({
    title,
    description,
    url,
    imageUrl,
    isoDate,
    wordCount,
  });

  return (
    <Head>
      <OgCoreTags title={title} description={description} url={url} />
      <OgImageTags imageUrl={imageUrl} />
      <ArticleTags isoDate={isoDate} tags={tags} />
      <TwitterTags
        title={title}
        description={description}
        imageUrl={imageUrl}
      />
      <JsonLdScript data={jsonLd} />
    </Head>
  );
}
