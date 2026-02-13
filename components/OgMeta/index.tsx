import React from "react";

export function MetaTag({
  property,
  content,
}: {
  property: string;
  content?: string;
}) {
  if (!content) return null;
  return <meta property={property} content={content} />;
}

interface OgMetaProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

export function OgMeta({ title, description, url, image }: OgMetaProps) {
  return (
    <>
      <MetaTag property="og:title" content={title} />
      <MetaTag property="og:description" content={description} />
      <MetaTag property="og:url" content={url} />
      <MetaTag property="og:image" content={image} />
    </>
  );
}
