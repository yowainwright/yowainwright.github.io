import React from "react";
import Head from "next/head";

const META_TITLE = "404 | Jeffry.in";
const META_CONTENT =
  "This is the 404 page of Jeffry.in. Use the navigation to find other pages of this website.";
const PATH = "https://jeffry.in/404/";
const TITLE = "404";
const MAIN_CLASS = "main main--404";

const DEFAULT_TEXT_LINES = [
  "Somehow, you've reached the 404 page of Jeffry.in.",
  "It's probably not your fault but that doesn't fix the problem.",
  "Use the navigation above to help you find your way.",
];

const DefaultText = (
  <>
    {DEFAULT_TEXT_LINES.map((line) => (
      <p key={line}>{line}</p>
    ))}
  </>
);

interface FourZeroFourProps {
  metaTitle?: string;
  metaContent?: string;
  path?: string;
  Text?: React.ReactNode;
  title?: string;
}

export default function FourZeroFour({
  metaTitle = META_TITLE,
  metaContent = META_CONTENT,
  path = PATH,
  Text = DefaultText,
  title = TITLE,
}: FourZeroFourProps) {
  return (
    <main className={MAIN_CLASS}>
      <Head>
        <title>{metaTitle}</title>
        <meta property="og:description" content={metaContent} />
        <link rel="canonical" href={path} itemProp="url" />
        <meta property="og:url" content={path} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://jeffry.in/og/default.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="404 | Jeffry.in" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://jeffry.in/og/default.png" />
        <meta name="twitter:creator" content="@yowainwright" />
        <meta name="fediverse:creator" content="@yowainwright.jeffry.in" />
      </Head>
      <h1>{title}</h1>
      {Text}
    </main>
  );
}
