import React from "react";
import Head from "next/head";

export default function FourZeroFour({
  metaTitle = "404 | Jeffry.in",
  metaContent = "This is the 404 page of Jeffry.in. Use the navigation to find other pages of this website.",
  path = "https://jeffry.in/404/",
  Text = (
    <>
      <p>Somehow, you&apos;ve reached the 404 page of Jeffry.in.</p>
      <p>
        It&apos;s probably not your fault but that doesn&apos;t fix the
        problem.{" "}
      </p>
      <p>Use the navigation above to help you find your way.</p>
    </>
  ),
  title = "404",
}) {
  return (
    <main className="main main--404">
      <Head>
        <title>{metaTitle}</title>
        <meta property="og:description" content={metaContent} />
        <link rel="canonical" href={path} itemProp="url" />
        <meta property="og:url" content={path} />
        <meta property="og:title" content={metaTitle} />
      </Head>
      <h1>{title}</h1>
      {Text}
    </main>
  );
}
