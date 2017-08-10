import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'


class BlogPostTemplate extends Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <article>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`}>
          <meta name="description" name="twitter:description" property="og:description" content={`${post.frontmatter.meta}`} />
          <link rel="canonical" href={`${post.frontmatter.path}`} itemprop="url" />
          <meta name="twitter:url" property="og:url" content={`${post.frontmatter.meta}`} />
          <meta name="twitter:title" property="og:title" content={`${post.frontmatter.title}`} />
          <meta name="twitter:image" property="og:image"  content={`${post.frontmatter.featured_image || 'https://yowainwright.imgix/w.jpg'}`} itemprop="image" />
        </Helmet>
        <header>
          <h1 itemProp="headeline">{post.frontmatter.title}</h1>
          <time>{post.frontmatter.date}</time>
        </header>
        <div className="wrapper">
          <div className="content" dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </article>
    )
  }
}

export default BlogPostTemplate

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
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
