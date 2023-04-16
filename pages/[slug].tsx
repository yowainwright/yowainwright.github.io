import React from 'react'
import ReactMarkdown from 'react-markdown'
import { getSinglePost, getAllPosts } from '../utils'
import Link from 'next/link'

interface PostProps {
  content: string
  frontmatter: {
    date: string
    title: string
  }
}

const Post = ({ content, frontmatter }: PostProps) => {
  return (
    <article className='post__article'>
      <header className='post__header'>
        <h2>
          <Link href='/'>Back to Changelog List →</Link>
        </h2>
        <h1>
          <i>{frontmatter?.date}:</i> {frontmatter?.title}
        </h1>
        <time className='post__time'>{frontmatter?.date}</time>
      </header>
      <section className='post__section' style={{ display: 'block' }}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </section>
      <hr />
    </article>
  )
}

export async function getStaticPaths() {
  const paths = await getAllPosts('content').map(({ slug }: any) => `/${slug}`)
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

export const getStaticProps = async ({ params }: StaticProps) => {
  const data = await getSinglePost(params.slug, 'content')
  return {
    props: { ...data },
  }
}

export default Post
