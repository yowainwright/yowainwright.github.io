import React from 'react'
import ReactMarkdown from 'react-markdown'
import { getSinglePost, getAllPosts } from '../utils'
import Head from 'next/head'

interface PostProps {
  content: string
  slug: string
  frontmatter: {
    date: string
    title: string
    meta: string
  }
}

const Post = ({ content, frontmatter }: PostProps) => {
  return (
    <article className='post__article'>
      <header className='post__header'>
        <h1>
          {frontmatter?.title}
        </h1>
        <time className='post__time'>{frontmatter?.date}</time>
      </header>
      <section className='post__section' style={{ display: 'block' }}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </section>
    </article>
  )
}

export function getStaticPaths() {
  const paths = getAllPosts('content').map(({ slug }: any) => `/${slug}`)
  return {
    paths,
    fallback: true,
  }
}

interface StaticProps {
  params: {
    slug: string
  }
}

export const getStaticProps = ({ params }: StaticProps) => {
  const data = getSinglePost(params.slug, 'content')
  return {
    props: { ...data },
  }
}

export default Post
