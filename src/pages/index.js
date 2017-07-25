import React from "react"
import Link from "gatsby-link"
import get from "lodash/get"
import Helmet from "react-helmet"

import Bio from "../components/Bio"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const pageLinks = []
    const siteTitle = get(this, "props.data.site.siteMetadata.title")
    const posts = get(this, "props.data.allMarkdownRemark.edges")
    posts.reverse()
    posts.forEach((post, i) => {
      const title = get(post, "node.frontmatter.title") || post.node.path
      const date = get(post, "node.frontmatter.date ") || post.node.date
      const path = get(post, "node.frontmatter.path") || post.node.path
      const description = get(post, "node.frontmatter.meta") || post.node.meta
      const featuredImage = get(post, "node.frontmatter.featured_image") || post.node.featured_image
      const noImage = typeof featuredImage === undefined
      const header = (
        <header className="post__header">
          <h2 className="post__title"><Link to={path}>{title}</Link></h2>
          <time>{date}</time>
        </header>
      )
      let figure
      if (!noImage) {
        figure = (
          <figure itemType="http://schema.org/ImageObject">
            <img src={featuredImage} itemProp="contentURL" />
          </figure>
        )
      } else {
        figure = ''
      }
      if (post.node.path !== "/404/") {
        pageLinks.push(
           <article key={i} className="post--article">
              {header}
              {figure}
              <p>{description}</p>
              <hr />
            </article>
        )
      }
    })

    return (
      <div>
        <Helmet title={get(this, "props.data.site.siteMetadata.title")} />
        {pageLinks}
      </div>
    )
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            path
            meta
            title
            featured_image
          }
        }
      }
    }
  }
`
