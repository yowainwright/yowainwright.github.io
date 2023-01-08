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
      !(i > 7) && !['/404/', '/about', '/about/', '/resume', '/resume/'].includes(path) ? (
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
    <main className='main'>
      <Helmet title={title}>
        <meta property='og:description' content={description} />
        <link rel='canonical' href='https://jeffry.in' itemProp='url' />
        <meta property='og:url' content='https://jeffry.in' />
        <meta property='og:title' content={title} />
      </Helmet>
      <section className='section section--intro'>
        <h1>I used to stand for something but now it is just because someone stole my chair. 💺 </h1>
      </section>
      <section className='section section--posts'>
        <h2><a href="https://jeffry.in/daily-changelogs">Check out what I&apos;m up to daily →</a></h2>
        <hr />
        <div className='posts--basic'>
          <PostsRow posts={data.allMarkdownRemark.edges} />
        </div>
        <hr />
        <h2><a href="https://jeffry.in/daily-changelogs">Check out what I&apos;m up to daily on my changelogs →</a></h2>
      </section>
    </main>
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
