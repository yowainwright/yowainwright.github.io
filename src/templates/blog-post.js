import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <article>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
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
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
