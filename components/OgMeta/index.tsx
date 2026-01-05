import Head from "next/head";
import type { OgMetaProps, JsonLdBlogPosting } from "./types";
import {
  DEFAULT_AUTHOR,
  DEFAULT_TWITTER_HANDLE,
  SITE_URL,
  ABOUT_URL,
} from "./constants";

export const OgMeta = ({
  title,
  description,
  slug,
  date,
  author = DEFAULT_AUTHOR,
  twitterHandle = DEFAULT_TWITTER_HANDLE,
  tags = [],
  wordCount,
  modifiedDate,
}: OgMetaProps) => {
  const url = `${SITE_URL}/${slug}`;
  const imageUrl = `${SITE_URL}/og/${slug}/img-1.png`;
  const isoDate = new Date(date).toISOString();
  const isoModified = modifiedDate ? new Date(modifiedDate).toISOString() : isoDate;

  const jsonLd: JsonLdBlogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: imageUrl,
    datePublished: isoDate,
    dateModified: isoModified,
    author: {
      "@type": "Person",
      name: author,
      url: ABOUT_URL,
    },
    publisher: {
      "@type": "Person",
      name: author,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    inLanguage: "en-US",
    ...(tags.length > 0 && { keywords: tags.join(", "), articleSection: tags[0] }),
    ...(wordCount && { wordCount }),
  };

  return (
    <Head>
      <title>{`${title} | Jeffry.in`}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />

      <meta property="article:published_time" content={isoDate} />
      <meta property="article:modified_time" content={isoModified} />
      <meta property="article:author" content={author} />
      {tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content={twitterHandle} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
};
