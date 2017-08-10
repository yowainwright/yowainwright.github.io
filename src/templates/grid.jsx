import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

class GridTemplate extends Component {

  render() {

    return (
      <article>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <header>
          <h1 itemProp="headeline">{post.frontmatter.title}</h1>
          <time>{post.frontmatter.date}</time>
        </header>
        <div className="wrapper">
          <div className="content" dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </article>
    )
  }
}
