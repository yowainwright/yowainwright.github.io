import React, { Component } from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

/*
  Archive 📚
  ---
  renders a roll of 10 posts
*/
class Archive extends Component {
  constructor(props) {
    super(props)
    // this.description = 'A full list of blog posts written by Jeffry Wainwright, a human person who enjoys building software, open source, being outside, and trying to live life with purpose.'
    this.posts = get(this, 'props.data.allMarkdownRemark.edges')
    // this.title = 'Archive'
  }

  render() {
    // render 10 posts or less
    const pageLinks = []
    this.posts.forEach((post, i) => {
      const pNode = post.node
      const postPath = get(post, 'node.frontmatter.path') || pNode.path
      if (postPath === '/404/' || postPath === '/about/') return
      const title = get(post, 'node.frontmatter.title') || pNode.title
      const date = get(post, 'node.frontmatter.date') || pNode.date
      const description = get(post, 'node.frontmatter.meta') || pNode.meta
      const header = (
        <header>
          <h2 className="post__title--headline"><Link to={postPath}>{title}</Link></h2>
          <time>{date}</time>
        </header>
      )

      pageLinks.push(
        <article key={i} className="post--headline">
          {header}
          <hr />
        </article>
      )
    })

    return (
      <main className="main">
      	<Helmet title={title} />
      	<div className="main__grid">
        {pageLinks}
        </div>
      </main>
    )
  }
}

Archive.propTypes = {
  route: React.PropTypes.object,
}

export default Archive



/*
  Graphql
  ----
  exports data for pages and posts
  TODO: this probably should not live here
*/
export const pageQuery = graphql`
  query ArchiveQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            date
            path
            meta
            title
          }
        }
      }
    }
  }
`
