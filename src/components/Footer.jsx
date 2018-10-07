import React, { Component } from 'react'
import Link from 'gatsby-link'

export default class Footer extends Component {
  constructor (props) {
    super(props)
    this.name = 'site-footer'
    this.year = new Date().getFullYear()
  }
  render () {
    return (
      <footer className={`${this.name}`} role='contentinfo' itemType='http://schema.org/WPFooter'>
        <p className={`${this.name}__content`}>
          <Link className={`${this.name}__link`} to={'/'}>jeffry.in {this.year}</Link>
        </p>
      </footer>
    )
  }
}
