import React, { Component } from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

/*
  Archive 📚
  ---
  renders all posts without images
*/

class Archive extends Component {
  constructor(props) {
    super(props)
    this.description = 'A full list of blog posts written by Jeffry Wainwright, a human person who enjoys building software, open source, being outside, and trying to live life with purpose.'
    this.posts = get(this, 'props.data.allMarkdownRemark.edges')
    this.title = 'Archive'
  }

  generatePost(i, title, date, path) {
    return (
      <article key={i} className="post--headline">
        <header>
          <h2 className="post__title--headline"><Link to={path}>{title}</Link></h2>
          <time>{date}</time>
        </header>
        <hr />
      </article>
    )
  }

  generatePosts() {
    const postItems = []
    this.posts.forEach((post, i) => {
      const pNode = post.node
      const path = get(post, 'node.frontmatter.path') || pNode.path
      if (path === '/404/' || path === '/about/') return
      const title = get(post, 'node.frontmatter.title') || pNode.title
      const date = get(post, 'node.frontmatter.date') || pNode.date
      postItems.push(
        this.generatePost(i, title, date, path)
      )
    }) 

    return postItems
  }

  render() {
    return (
      <main className="main">
      	<Helmet title={this.title} description={this.description} />
      	<div className="main__grid">
        {this.generatePosts()}
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
