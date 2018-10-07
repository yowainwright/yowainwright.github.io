import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
export default class BlogIndex extends Component {
  constructor (props) {
    super(props)
    this.title = 'Jeffry.in'
    this.description = 'Jeffry.in is the blog of Jeffry Wainwright, an engineer living in California.'
    this.posts = get(this, 'props.data.allMarkdownRemark.edges')
  }

  generatePostHeader = (title, path, date) => {
    return (
      <header className='post__header'>
        <h2 className='post__title'><Link to={path}>{title}</Link></h2>
        <time>{date}</time>
      </header>
    )
  }

  generatePostFigure = (image, path) => {
    if (typeof image === 'undefined') return ''
    return (
      <figure itemType='http://schema.org/ImageObject'>
        <Link to={path}>
          <img src={`${image}?w=800&&fit=crop&crop=focalpoint&auto=format`} itemProp='contentURL' alt='Post Figure' />
        </Link>
      </figure>
    )
  }

  generatePosts = () => {
    const postItems = []
    this.posts.forEach((post, i) => {
      if (i > 11) return

      const pNode = post.node
      const path = get(post, 'node.frontmatter.path') || pNode.path
      if (path === '/404/' || path === '/about' || path === '/about/') return

      const title = get(post, 'node.frontmatter.title') || pNode.title
      const date = get(post, 'node.frontmatter.date') || pNode.date
      const description = get(post, 'node.frontmatter.meta') || pNode.meta
      const image = get(post, 'node.frontmatter.featured_image') || post.node.featured_image
      const header = this.generatePostHeader(title, path, date)
      const figure = this.generatePostFigure(image, path)

      postItems.push(
        <article key={i} className='post--article'>
          {header}
          {figure}
          <p>{description} <Link to={path}>[...]</Link></p>
          <hr />
        </article>
      )
    })

    return postItems
  }

  render () {
    return (
      <Layout>
        <main className='main'>
          <Helmet title={this.title}>
            <meta name='twitter:description' property='og:description' content={`${this.description}`} />
            <link rel='canonical' href='https://jeffry.in' itemProp='url' />
            <meta name='twitter:url' property='og:url' content='https://jeffry.in' />
            <meta name='twitter:title' property='og:title' content={`${this.title}`} />
            <meta name='twitter:image' content='https://yowainwright.imgix.net/w-logo-twitter.jpg?w=600&h=335&fit=crop&crop=focalpoint&auto=format' itemProp='image' />
            <meta property='og:image' content='https://yowainwright.imgix.net/w-logo-fb.jpg?w=1200&h=600&fit=crop&crop=focalpoint&auto=format' itemProp='image' />
          </Helmet>
          <hr />
          {this.generatePosts()}
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
