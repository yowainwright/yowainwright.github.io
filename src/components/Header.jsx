import React, { Component } from 'react'

/*
  Header 👤
  ----
  The Header Component is the navigation and top part of the site across all pages/routes
*/
class Header extends Component {
  constructor (props) {
    super(props)
    this.name = 'site-nav'
  }

  /*
    TODO
    ----
    Abstract navItems out to a config
  */
  generateNav (name) {
    const nav = []

    // [array] of {object} nav items
    const navItems = [
      {
        alias: 'home',
        name: 'Jeffry.in',
        path: '/',
      },
      {
        alias: 'github',
        name: 'Github',
        path: 'https://github.com/yowainwright',
      },
      {
        alias: 'twitter',
        name: 'Twitter',
        path: 'https://twitter.com/yowainwright',
      },
      {
        alias: 'archive',
        name: 'Archive',
        path: '/archive/',
      },
      {
        alias: 'about',
        name: 'About',
        path: '/about/',
      },
    ]

    // build the nav list
    navItems.map((item, i) => {
      nav.push(
        <li key={i} className={`${name}__item ${name}__item--${item.alias}`}>
          <a className={`${name}__link ${name}__link--${item.alias}`} href={item.path}>{item.name}</a>
        </li>
      )
    })

    return nav
  }

  render () {
    return (
      <nav id={`${this.name}`} className={`${this.name}`} role='navigation' itemType='http://schema.org/SiteNavigationElement'>
        <ol className={`${this.name}__items`}>
          {this.generateNav(this.name)}
        </ol>
      </nav>
    )
  }
}

export default Header
