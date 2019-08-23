import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'

export const PostHeader = ({ title, path, date }) => (
  <header className='post__header'>
    <h2 className='post__title'><Link to={path}>{title}</Link></h2>
    <time>{date}</time>
  </header>
)

export const PostFigure = ({ image, path }) => image ? (
    <figure itemType='http://schema.org/ImageObject'>
      <Link to={path}>
        <img src={`${image}?w=800&&fit=crop&crop=focalpoint&auto=format`} itemProp='contentURL' alt='Post Figure' />
      </Link>
    </figure>
  ) : null

export const Posts = ({ posts }) => posts.map((post, i) => {
  if (i > 11) return

  const pNode = post.node
  const path = get(post, 'node.frontmatter.path') || pNode.path
  if (path === '/404/' || path === '/about' || path === '/about/') return

  const title = get(post, 'node.frontmatter.title') || pNode.title
  const date = get(post, 'node.frontmatter.date') || pNode.date
  const description = get(post, 'node.frontmatter.meta') || pNode.meta
  const image = get(post, 'node.frontmatter.featured_image') || post.node.featured_image

  return (
    <article key={i} className='post--article'>
      <PostHeader title={title} path={path} date={date} />
      <PostFigure image={image} path={path} />
      <p>{description} <Link className='post__link--read-more' to={path}>[...]</Link></p>
      <hr />
    </article>
  )
})

export default class BlogIndex extends Component {
  render () {
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
    const title = 'Jeffry.in'
    const description = 'Jeffry.in is the blog of Jeffry Wainwright, an engineer living in California.'
    return (
      <Layout>
        <main className='main'>
          <Helmet title={title}>
            <meta name='twitter:description' property='og:description' content={description} />
            <link rel='canonical' href='https://jeffry.in' itemProp='url' />
            <meta name='twitter:url' property='og:url' content='https://jeffry.in' />
            <meta name='twitter:title' property='og:title' content={title} />
          </Helmet>
          <hr />
          <Posts posts={posts} />
        </main>
      </Layout>
    )
  }
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
