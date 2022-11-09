import React from 'react'
import Giscus from '@giscus/react';
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { Share } from '../components/Share'

export default function BlogPostTemplate({
  data: {
    markdownRemark: {
      html,
      frontmatter: { date, meta, path, title },
    },
  },
}) {
  return (
    <article className='post__article'>
      <Helmet title={`${title} | Jeffry.in`}>
        <meta name='description' content={`${meta}`} />
        <meta property='og:description' content={`${meta}`} />
        <link rel='canonical' href={`${path}`} itemProp='url' />
        <meta property='og:url' content={`${path}`} />
        <meta property='og:title' content={`${title}`} />
      </Helmet>
      <header className='post__header'>
        <h1 className='post__title' itemProp='headeline'>
          {title}
        </h1>
        {!['/about/', '/styleguide/', '/resume/'].includes(path) && <time className='post__time'>{date}</time>}
      </header>
      <section className='post__section'>
        <div className='post__container'>
        <div className='post__content' dangerouslySetInnerHTML={{ __html: html }} />
        <div className='post__giscus'>
          <Giscus
            repo="yowainwright/yowainwright.github.io"
            repoId="MDEwOlJlcG9zaXRvcnkxNzA5MTY4Mg=="
            category="General"
            categoryId="DIC_kwDOAQTMYs4COQJE"
            mapping="pathname"
            reactionsEnabled="1"
            emitMetadata="0"
            theme="light"
          />
        </div>
        </div>
        <aside className='aside'>
          <div className='aside__meta'>
            <header className='aside__header'>
              <h3 className='aside__title'>{title}</h3>
            </header>
            <Share name='blog-bottom' path={path} title={title} />
          </div>
        </aside>
      </section>
    </article>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        featured_image
        meta
        social_image
        title
        date(formatString: "MMMM DD, YYYY")
        path
      }
    }
  }
`
