import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
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
    <Layout>
      <article className='post__article'>
        <Helmet title={`${title} | Jeffry.in`}>
          <meta name='twitter:description' property='og:description' content={`${meta}`} />
          <link rel='canonical' href={`${path}`} itemProp='url' />
          <meta name='twitter:url' property='og:url' content={`${path}`} />
          <meta name='twitter:title' property='og:title' content={`${title}`} />
        </Helmet>
        <header className='post__header'>
          <h1 className='post__title' itemProp='headeline'>{title}</h1>
          {!['/about/', '/styleguide/'].includes(path) && <time className='post__time'>{date}</time>}
        </header>
        <section className='post__section'>
          <div className='post__content' dangerouslySetInnerHTML={{ __html: html }} />
          <aside className='aside'>
            <div className='aside__meta'>
              <h3 className='aside__title'>{title}</h3>
              <p className='aside__content'>{meta}</p>
              <Share name='blog-bottom' path={path} title={title} />
            </div>
          </aside>
        </section>
      </article>
    </Layout>
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
