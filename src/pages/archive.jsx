import React, { Component } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import { SquarePost } from '../components/post/square'
export default class Archive extends Component {
  constructor (props) {
    super(props)
    this.description = 'A full list of blog posts written by Jeffry Wainwright, a human person who enjoys building software, open source, being outside, and trying to live life with purpose.'
    this.posts = get(this, 'props.data.allMarkdownRemark.edges')
    this.title = 'Archive | Jeffry.in'
  }


  render () {
    return (
      <Layout>
        <main className='main'>
          <Helmet title={this.title}>
            <meta name='twitter:description' property='og:description' content={`${this.description}`} />
            <link rel='canonical' href='https://jeffry.in/archive/' itemProp='url' />
            <meta name='twitter:url' property='og:url' content='https://jeffry.in/archive/' />
            <meta name='twitter:title' property='og:title' content={`${this.title}`} />
          </Helmet>
          <div className='posts--squares'>
            {this.posts.map((post, i) => {
              const pNode = post.node
              const path = get(post, 'node.frontmatter.path') || pNode.path
              if (path === '/404/' || path === '/about' || path === '/about/') return
              const title = get(post, 'node.frontmatter.title') || pNode.title
              const date = get(post, 'node.frontmatter.date') || pNode.date
              return <SquarePost date={date} path={path} title={title} />
            })}
          </div>
        </main>
      </Layout>
    )
  }
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
