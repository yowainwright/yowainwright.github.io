import React, { Component } from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

/*
  BlogIndex 📚
  ---
  renders a blog roll of 10 posts
*/
class BlogIndex extends Component {
  constructor(props) {
    super(props)
    this.siteTitle = get(this, 'props.data.site.siteMetadata.title')
    this.posts = get(this, 'props.data.allMarkdownRemark.edges')
  }

  render() {
    // render 10 posts or less
    const pageLinks = []
    this.posts.forEach((post, i) => {
      if (i > 11) return
      // TODO: the blog roll post could be a separate post
      const pNode = post.node
      const postPath = get(post, 'node.frontmatter.path') || pNode.path
      if (postPath === '/404/' || postPath === '/about/') return
      const title = get(post, 'node.frontmatter.title') || pNode.title
      const date = get(post, 'node.frontmatter.date') || pNode.date
      const description = get(post, 'node.frontmatter.meta') || pNode.meta
      const featuredImage = get(post, 'node.frontmatter.featured_image') || pNode.featured_image
      const noImage = typeof featuredImage === undefined
      const header = (
        <header className="post__header">
          <h2 className="post__title"><Link to={postPath}>{title}</Link></h2>
          <time>{date}</time>
        </header>
      )
      let figure
      if (!noImage) {
        figure = (
          <figure itemType="http://schema.org/ImageObject">
            <Link to={postPath}>
              <img src={featuredImage} itemProp="contentURL" />
            </Link>
          </figure>
        )
      } else figure = ''

      pageLinks.push(
        <article key={i} className="post--article">
          {header}
          {figure}
          <p>{description}</p>
          <hr />
        </article>
      )
    })

    return (
      <main className="main">
        <Helmet title={title} />
        {pageLinks}
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
            date
            featured_image
            path
            meta
            title
          }
        }
      }
    }
  }
`

// import React from 'react'
// import Link from 'gatsby-link'
// import get from 'lodash/get'
// import Helmet from 'react-helmet'

// class BlogIndex extends React.Component {
//   render() {
//     // console.log("props", this.props)
//     const pageLinks = []
//     const siteTitle = get(this, 'props.data.site.siteMetadata.title')
//     const posts = get(this, 'props.data.allMarkdownRemark.edges')
//     posts.forEach(post => {
//       if (post.node.path !== '/404/') {
//         const title = get(post, 'node.frontmatter.title') || post.node.path
//         pageLinks.push(
//           <li>
//             <Link to={post.node.frontmatter.path}>
//               {post.node.frontmatter.title}
//             </Link>
//           </li>
//         )
//       }
//     })

//     return (
//       <div>
//         <Helmet title={get(this, 'props.data.site.siteMetadata.title')} />
//         <ul>
//           {pageLinks}
//         </ul>
//       </div>
//     )
//   }
// }

// BlogIndex.propTypes = {
//   route: React.PropTypes.object,
// }

// export default BlogIndex

// export const pageQuery = graphql`
//   query IndexQuery {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//     allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
//       edges {
//         node {
//           frontmatter {
//             path
//             title
//           }
//         }
//       }
//     }
//   }
// `

