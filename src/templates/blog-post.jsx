import React from 'react'
import Helmet from 'react-helmet'
import { remarkForm } from 'gatsby-tinacms-remark'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { ShareList } from '../components/ShareList'

export const BlogPostTemplate = ({
  data: {
    markdownRemark: {
      html,
      frontmatter: { date, meta, path, title },
    },
  },
}) => (
  <Layout>
    <article>
      <Helmet title={`${title} | Jeffry.in`}>
        <meta name='twitter:description' property='og:description' content={`${meta}`} />
        <link rel='canonical' href={`${path}`} itemProp='url' />
        <meta name='twitter:url' property='og:url' content={`${path}`} />
        <meta name='twitter:title' property='og:title' content={`${title}`} />
      </Helmet>
      <header className='post__header'>
        <h1 itemProp='headeline'>{title}</h1>
        {!['/about/', '/styleguide/'].includes(path) && <time className='post__time'>{date}</time>}
      </header>
      <div className='wrapper'>
        <div className='content' dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <footer className='post__footer'>
        <h3 className='post__footer-title'>{title}</h3>
        <p className='post__meta'>{meta}</p>
        <ShareList name='blog-bottom' path={path} title={title} />
      </footer>
    </article>
  </Layout>
)

export default remarkForm(BlogPostTemplate)

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
      ...TinaRemark
    }
  }
`
