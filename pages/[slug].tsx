import React, { useContext } from 'react'
import Giscus from '@giscus/react';
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { getSinglePost, getAllPosts, markdownToHtml } from '../utils'
import { GlobalState } from './_app';
import { Share } from '../components/Share'
const THEME_DARK = "https://yowainwright.imgix.net/jeffry.in.giscus.dark.css"
const THEME_LIGHT = "https://yowainwright.imgix.net/jeffry.in.giscus.light.css"

interface PostProps {
  content: string
  slug: string
  frontmatter: {
    date: string
    title: string
    meta: string
    path: string
  }
}

interface GiscusWrapperProps {
  isDarkMode: boolean
}


const GiscusWrapper = ({ isDarkMode }: GiscusWrapperProps) => {
  const theme = isDarkMode ? THEME_DARK : THEME_LIGHT
  return (
    <Giscus
      repo="yowainwright/yowainwright.github.io"
      repoId="MDEwOlJlcG9zaXRvcnkxNzA5MTY4Mg=="
      category="General"
      categoryId="DIC_kwDOAQTMYs4COQJE"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      theme={theme}
      lang="en"
      loading="lazy"
    />
  )
}

const Post = ({ content, frontmatter, slug }: PostProps) => {
  const state = useContext(GlobalState)
  return (
    <article className='post__article'>
      <header className='post__header'>
        <h1>
          {frontmatter?.title}
        </h1>
        <DateText date={frontmatter?.date} slug={slug} />
      </header>
      <section className='post__section'>
        <div className='post__container'>
          <div className='post__content'>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
          </div>
          <div className='post__giscus'>
            <GiscusWrapper isDarkMode={state?.isDarkMode || false} />
          </div>
        </div>
        <aside className='aside'>
          <div className='aside__meta'>
            <header className='aside__header'>
              <h3 className='aside__title'>{frontmatter?.title}</h3>
            </header>
            <Share path={frontmatter?.path} />
          </div>
        </aside>
      </section>
    </article>
  )
}

export type DateTextProps = {
  date: string
  slug: string
}

export const DateText = ({ date, slug }: DateTextProps) => {
  const isExcludedDate = ['about', 'resume'].includes(slug)
  if (isExcludedDate) return null
  return <time className='post__time'>{date}</time>
}

export function getStaticPaths() {
  const paths = getAllPosts('content').map(({ slug }: any) => `/${slug}`)
  return {
    paths,
    fallback: false,
  }
}

interface StaticProps {
  params: {
    slug: string
  }
}

export const getStaticProps = async ({ params }: StaticProps) => {
  const data = getSinglePost(params.slug, 'content')
  const content = await markdownToHtml(data.content || '')
  console.log({ dataContent: data.content, content })
  return {
    props: { ...data, content },
  }
}

export default Post
