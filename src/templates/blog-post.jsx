import React, { Component } from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

export default class BlogPostTemplate extends Component {
  constructor (props) {
    super(props)
    this.post = get(this, 'props.data.markdownRemark')
  }

  generateDate = () => {
    if (this.post.frontmatter.path === '/about/') return
    return (<time>{this.post.frontmatter.date}</time>)
  }

  render () {
    const post = this.post
    return (
      <Layout>
        <article>
          <Helmet title={`${post.frontmatter.title} | Jeffry.in`}>
            <meta name='twitter:description' property='og:description' content={`${post.frontmatter.meta}`} />
            <link rel='canonical' href={`${post.frontmatter.path}`} itemProp='url' />
            <meta name='twitter:url' property='og:url' content={`${post.frontmatter.path}`} />
            <meta name='twitter:title' property='og:title' content={`${post.frontmatter.title}`} />
          </Helmet>
          <header>
            <h1 itemProp='headeline'>{post.frontmatter.title}</h1>
            {this.generateDate()}
          </header>
          <div className='wrapper'>
            <div className='content' dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
        </article>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        featured_image
        meta
        social_image
        title
        date(formatString: "MMMM DD, YYYY")
        path
      }
    }
  }
`
