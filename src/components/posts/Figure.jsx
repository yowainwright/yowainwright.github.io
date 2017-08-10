import React, { Component } from 'react'

import Link from 'gatsby-link'

class Figure extends Component {
  constructor(props) {
    super(props)
    this.path = props.path
    this.imageSrc = props.imageSrc
  }

  render() {
    return (
      <figure itemType="http://schema.org/ImageObject">
        <Link to={this.path}>
          <img src={this.src} itemProp="contentURL" />
        </Link>
      </figure>
    )
  }
}

export default Figure
