import React from "react";
import Head from 'next/head'
import Link from "next/link";
import { getAllPosts } from "../utils";

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
        <title>Jeff Wainwright&apos;s Changelog</title>
        <meta name="description" content="Daily changelog notes generally related to programming but with a little daily context" />
      </Head>
      <section className='section section--posts'>
        <div className='posts--basic'>
          {posts.map((post) => (
            <article key={post.slug} className="post--article">
              <header>
                <h2>
                  <Link href={post.slug}>{post.frontmatter.date}: {post.frontmatter.title}</Link>
                </h2>
                <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
              </header>
              <p>{post.frontmatter.meta}<Link href={post.slug}>→</Link></p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export const getStaticProps = async () => {
  const posts = getAllPosts("content");
  return {
    props: { posts },
  };
};

export default Home;
