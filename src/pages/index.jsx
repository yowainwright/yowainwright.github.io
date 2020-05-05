import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import { BasicPost } from '../components/post/basic'

export const PostsRow = ({ posts }) =>
  posts.map(({ node: { frontmatter: { date, meta, path, title } } }, i) =>
    !(i > 7) && !['/404/', '/about', '/about/', '/styleguide/'].includes(path) ? (
      <BasicPost key={i} date={date} description={meta} path={path} title={title} />
    ) : null,
  )

export const BlogIndex = ({
  data,
  description = 'Jeffry.in is the blog of Jeffry Wainwright, an engineer living in California.',
  title = 'Jeffry.in',
}) => (
  <Layout>
    <main className='main'>
      <Helmet title={title}>
        <meta name='twitter:description' property='og:description' content={description} />
        <link rel='canonical' href='https://jeffry.in' itemProp='url' />
        <meta name='twitter:url' property='og:url' content='https://jeffry.in' />
        <meta name='twitter:title' property='og:title' content={title} />
      </Helmet>
      <div className='posts--basic'>
        <PostsRow posts={data.allMarkdownRemark.edges} />
      </div>
    </main>
  </Layout>
)

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
            date(formatString: "MMMM DD, YYYY")
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
