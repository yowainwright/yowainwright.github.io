import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import { SquarePost } from '../components/post/square'

export const Archive = ({ data, title = 'Archive | Jeffry.in' }) => (
  <Layout>
    <main className='main'>
      <Helmet title={title}>
        <meta
          name='twitter:description'
          property='og:description'
          content='A full list of blog posts written by Jeffry Wainwright, a human person who enjoys building software, open source, being outside, and trying to live life with purpose.'
        />
        <link rel='canonical' href='https://jeffry.in/archive/' itemProp='url' />
        <meta name='twitter:url' property='og:url' content='https://jeffry.in/archive/' />
        <meta name='twitter:title' property='og:title' content={`${title}`} />
      </Helmet>
      <div className='posts--squares'>
        {data.allMarkdownRemark.edges.map((post, i) => {
          const { date, path, title } = post.node.frontmatter
          if (path === '/404/' || path === '/about' || path === '/about/') return null
          return <SquarePost date={date} path={path} title={title} key={i} />
        })}
      </div>
    </main>
  </Layout>
)

export default Archive

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
            date(formatString: "MMMM DD, YY")
            path
            meta
            title
          }
        }
      }
    }
  }
`
