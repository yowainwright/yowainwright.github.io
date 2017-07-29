import React from 'react'
import Link from 'gatsby-link'
// TODO: can we remove lodash depencency?
import get from 'lodash/get'
import Helmet from 'react-helmet'

/*
  BlogIndex 📚
  ---
  renders a blog roll of 10 posts
*/
class BlogIndex extends React.Component {
  constructor(props) {
    super(props);
    this.pageLinks = []
    this.siteTitle = get(this, "props.data.site.siteMetadata.title")
    this.posts= get(this, "props.data.allMarkdownRemark.edges")
  }

  render() {
    // render 10 posts or less
    this.posts.forEach((post, i) => {
      if (i > 10) return
      // TODO: the blog roll post could be a separate post
      const pNode = post.node
      const title = get(post, "node.frontmatter.title") || pNode.path
      const date = get(post, "node.frontmatter.date ") || pNode.date
      const path = get(post, "node.frontmatter.path") || pNode.path
      const description = get(post, "node.frontmatter.meta") || pNode.meta
      const featuredImage = get(post, "node.frontmatter.featured_image") || pNode.featured_image
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
      if (pNode.path !== "/404/") {
        this.pageLinks.push(
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
      <main>
        <Helmet title={get(this, "props.data.site.siteMetadata.title")} />
        {this.pageLinks}
      </main>
    )
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
}

export default BlogIndex



/*
  Graphql
  ----
  exports data for pages and posts
  TODO: this probably should not live here
*/
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
