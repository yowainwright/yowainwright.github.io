const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise(resolve => {
    const blogPost = path.resolve('./src/templates/blog-post.jsx')
    resolve(
      graphql(
        `
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              frontmatter {
                path
              }
            }
          }
        }
      }
    `
      ).then(result => {
        // Create blog posts pages
        result.data.allMarkdownRemark.edges.forEach(edge => {
          createPage({
            path: edge.node.frontmatter.path,
            component: blogPost,
          })
        })
      }, (error) => {
        console.error(error)
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
