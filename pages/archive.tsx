import React from 'react'
import Head from 'next/head'
import { BasicPost } from '../components/post/Basic'
import { getAllPosts } from "../utils";
interface Post {
  slug: string;
  frontmatter: {
    date: string;
    meta: string;
    title: string;
  };
}

interface PostsRowProps {
  posts: Post[]
}

function PostsRow({ posts }: PostsRowProps) {
  const filteredPosts = posts.filter(({ slug }) => !['/404/', '/about', '/about/', '/resume', '/resume/'].includes(slug))
  if (filteredPosts.length === 0) {
    return <p>There are no posts to display.</p>
  }
  const postRows = filteredPosts.map(
    (
      {
        slug,
        frontmatter: { date, meta, title },
      },
      i,
    ) => <BasicPost key={i} date={date} description={meta} path={slug} title={title} />,
  )
  return <>{postRows}</>
}


interface ArchiveProps {
  posts: Post[];
  title: string;
}


export default function Archive({ posts, title = 'Archive | Jeffry.in' }: ArchiveProps) {
  return (
    <main className='main'>
      <Head>
        <time>{title}</time>
        <meta
          property='og:description'
          content='A full list of blog posts written by Jeffry Wainwright, a human person who enjoys building software, open source, being outside, and trying to live life with purpose.'
        />
        <link rel='canonical' href='https://jeffry.in/archive/' itemProp='url' />
        <meta property='og:url' content='https://jeffry.in/archive/' />
        <meta property='og:title' content={`${title}`} />
      </Head>
      <section className='section section--intro'>
        <h1>Article archive: I have been writing for a while. Enjoy scrolling! 📚</h1>
      </section>
      <section className='section section--posts'>
        <div className='posts--basic'>
          <PostsRow posts={posts} />
        </div>
      </section>
    </main>
  )
}

export const getStaticProps = async () => {
  const posts = getAllPosts("content");
  return {
    props: { posts },
  };
};
