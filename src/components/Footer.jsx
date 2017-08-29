import React, { Component } from 'react'
import Link from 'gatsby-link'

/*
  Footer (site footer)
  ----
  contains footer information
  - inherits gatsby link
  - takes in a year
*/
class Footer extends Component {
  constructor(props) {
    super(props)
    this.name = 'site-footer'
    this.year = new Date().getFullYear()
  }
  render() {
    return (
      <footer className={`${this.name}`} role="contentinfo" itemType="http://schema.org/WPFooter">
        <p className={`${this.name}__content`}>
          <Link className={`${this.name}__link`} to={'/'}>jeffry.in {this.year}</Link>
        </p>
      </footer>
    )
  }
}

export default Footer
