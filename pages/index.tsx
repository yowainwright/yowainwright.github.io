import React from "react";
import Head from "next/head";
import Link from "next/link";
import { getAllNewPosts } from "../utils";

interface Post {
  slug: string;
  frontmatter: {
    date: string;
    meta: string;
    title: string;
  };
}

interface HomeProps {
  posts: Post[];
}

export const Home = ({ posts }: HomeProps) => {
  return (
    <div className="main">
      <Head>
        <title>Jeff Wainwright</title>
        <meta
          name="description"
          content="Jeffry.in is the blog of Jeffry Wainwright, an engineer living in California."
        />
        <link rel="canonical" href="https://jeffry.in/" itemProp="url" />
        <meta property="og:url" content="https://jeffry.in/" />
        <meta property="og:title" content="Jeff Wainwright" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://jeffry.in/og/default.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Jeff Wainwright" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://jeffry.in/og/default.png" />
        <meta name="twitter:creator" content="@yowainwright" />
        <meta name="fediverse:creator" content="@yowainwright.jeffry.in" />
      </Head>
      <section className="section section--intro">
        <h1>
          I used to stand for something but now it is just because someone stole
          my chair.
        </h1>
      </section>
      <section className="section section--posts">
        <div className="posts--basic">
          {posts.map((post) => (
            <article key={post.slug} className="post--article">
              <header>
                <h2>
                  <Link href={post.slug}>{post.frontmatter?.title}</Link>
                </h2>
                <time dateTime={post.frontmatter?.date}>
                  {post.frontmatter?.date}
                </time>
              </header>
              <p>
                {post.frontmatter?.meta}
                <Link href={post.slug}>→</Link>
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export const getStaticProps = async () => {
  const posts = getAllNewPosts("content");
  return {
    props: { posts },
  };
};

export default Home;
