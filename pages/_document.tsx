import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property="og:locale" content="en_US" />
        <link rel="preconnect" href="https://giscus.app" />
        <link rel="dns-prefetch" href="https://giscus.app" />
        <link href="https://yowainwright.imgix.net/favicon.png" rel="icon" />
        <link
          href="https://yowainwright.imgix.net/apple-icon-120x120.png"
          rel="apple-touch-icon"
          itemProp="logo"
        />
        <meta
          name="keywords"
          content="jeffry, wainwright, jeffry wainwright, code, programmer, artist, athlete, developer, engineer"
        />
        <meta name="theme-color" content="#007cf0" />
        <link
          rel="manifest"
          href="https://yowainwright.imgix.net/manifest.json"
        />
        <meta
          name="description"
          content="Jeffry.in is the daily changelog of Jeffry Wainwright, an engineer living in California."
        />
        <meta property="og:site_name" content="Jeffry.in" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&amp;display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="alternate" type="application/rss+xml" title="Jeffry.in RSS Feed" href="/rss.xml" />
        <link rel="alternate" type="application/atom+xml" title="Jeffry.in Atom Feed" href="/atom.xml" />
        <link rel="alternate" type="application/feed+json" title="Jeffry.in JSON Feed" href="/feed.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
