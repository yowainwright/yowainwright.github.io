import React, { Component } from 'react'
import Header from './components/posts/Header'
import Figure from '../components/posts/Figure'

import Link from 'gatsby-link'

class Article extends Component {
  constructor(props) {
    super(props)
    this.name = 'article'
    this.i = props.i
    this.path = props.path
    this.title = props.title
    this.description = props.description
    this.imageSrc = props.imageSrc || null
  }

  render() {
    let figure
    if (imageSrc !== null) {
      figure = (
        <Figure to={this.path} src={this.imageSrc} />
      )
    } else figure = ''

    return (
      <article key={i} className={`post--${this.name}`}>
        <Header path={this.path} title={this.title} />
        {figure}
        <p>{this.description}</p>
        <hr />
      </article>
    )
  }
}

export default Article
