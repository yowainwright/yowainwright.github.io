import React, { Component } from 'react'

import Link from 'gatsby-link'

class Header extends Component {
  constructor(props) {
    super(props)
    this.path = props.path
    this.title = props.title
  }

  render() {
    return (
      <header className="post__header">
        <h2 className="post__title">
          <Link to={this.path}>{this.title}</Link>
        </h2>
        <time>{this.date}</time>
      </header>
    )
  }
}


export default Header
