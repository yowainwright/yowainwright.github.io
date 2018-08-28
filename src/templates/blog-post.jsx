import React, { Component } from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

class BlogPostTemplate extends Component {
  constructor (props) {
    super(props)
    this.post = get(this, 'props.data.markdownRemark')
  }

  // generateCategories() {
  //   const categories = this.post.categories
  //   if (!categories || categories.length === 0) return
  //   return categories.forEach(category => {
  //     (<Link to={`/category/${category}``} className='category')
  //   })
  // }

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
            <meta name='twitter:image' content={`${post.frontmatter.featured_image || 'https://yowainwright.imgix.net/w-logo-twitter.jpg'}?w=600&h=335&fit=crop&crop=focalpoint&auto=format`} itemProp='image' />
            <meta property='og:image' content={`${post.frontmatter.featured_image || 'https://yowainwright.imgix.net/w-logo-fb.jpg'}?w=1200&h=600&fit=crop&crop=focalpoint&auto=format`} itemProp='image' />
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

export default BlogPostTemplate

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
        title
        date(formatString: "MMMM DD, YYYY")
        path
      }
    }
  }
`
