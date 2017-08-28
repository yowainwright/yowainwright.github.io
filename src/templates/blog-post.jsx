import React, { Component } from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'

class BlogPostTemplate extends Component {
  render() {
    const post =  this.props.data.markdownRemark

    return (
      <article>
        <Helmet title={`${post.frontmatter.title} | Jeffry.in`}>
          <meta name="twitter:description" property="og:description" content={`${post.frontmatter.meta}`} />
          <link rel="canonical" href={`${post.frontmatter.path}`} itemProp="url" />
          <meta name="twitter:url" property="og:url" content={`${post.frontmatter.path}`} />
          <meta name="twitter:title" property="og:title" content={`${post.frontmatter.title}`} />
          <meta name="twitter:image" property="og:image"  content={`${post.frontmatter.featured_image || 'https://yowainwright.imgix/w.jpg'}`} itemProp="image" />
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
