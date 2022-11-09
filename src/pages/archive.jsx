import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
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
      !['/404/', '/about', '/about/', '/resume', '/resume/'].includes(path) ? (
        <BasicPost key={i} date={date} description={meta} path={path} title={title} />
      ) : null,
  )
}

export default function Archive({ data, title = 'Archive | Jeffry.in' }) {
  return (
    <main className='main'>
      <Helmet title={title}>
        <meta
          property='og:description'
          content='A full list of blog posts written by Jeffry Wainwright, a human person who enjoys building software, open source, being outside, and trying to live life with purpose.'
        />
        <link rel='canonical' href='https://jeffry.in/archive/' itemProp='url' />
        <meta property='og:url' content='https://jeffry.in/archive/' />
        <meta property='og:title' content={`${title}`} />
      </Helmet>
      <section className='section section--intro'>
        <h1>Article archive: I have been writing for a while. Enjoy scrolling! 📚</h1>
      </section>
      <section className='section section--posts'>
        <div className='posts--basic'>
          <PostsRow posts={data.allMarkdownRemark.edges} />
        </div>
      </section>
    </main>
  )
}

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
