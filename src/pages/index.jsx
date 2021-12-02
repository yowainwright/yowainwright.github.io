import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import { BasicPost } from '../components/post/basic'

function PostsRow({ posts }) {
  return posts.map(
    (
      {
        node: {
          frontmatter: { date, meta, path, title },
        },
      },
      i,
    ) =>
      !(i > 7) && !['/404/', '/about', '/about/', '/styleguide/', '/resume', '/resume/'].includes(path) ? (
        <BasicPost key={i} date={date} description={meta} path={path} title={title} />
      ) : null,
  )
}

export default function BlogIndex({
  data,
  description = 'Jeffry.in is the blog of Jeffry Wainwright, an engineer living in California.',
  title = 'Jeffry.in',
}) {
  return (
    <Layout>
      <main className='main'>
        <Helmet title={title}>
          <meta name='twitter:description' property='og:description' content={description} />
          <link rel='canonical' href='https://jeffry.in' itemProp='url' />
          <meta name='twitter:url' property='og:url' content='https://jeffry.in' />
          <meta name='twitter:title' property='og:title' content={title} />
        </Helmet>
        <section className='section section--intro intro'>
          <h1 className='intro__title'>
            I used to stand for something but now it is just because someone stole my chair. 💺{' '}
          </h1>
        </section>
        <section className='section section--posts'>
          <div className='posts--basic'>
            <PostsRow posts={data.allMarkdownRemark.edges} />
          </div>
        </section>
      </main>
    </Layout>
  )
}

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
