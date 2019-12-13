import React, { Component } from 'react'
import PropTypes from 'prop-types'
export default class Header extends Component {
  static defaultProps = {
    componentName: 'site-nav',
    navItems: [
      {
        alias: 'github',
        inApp: false,
        name: 'Github',
        path: 'https://github.com/yowainwright',
      },
      {
        alias: 'twitter',
        inApp: false,
        name: 'Twitter',
        path: 'https://twitter.com/yowainwright',
      },
      {
        alias: 'archive',
        inApp: true,
        name: 'Archive',
        path: '/archive/',
      },
      {
        alias: 'about',
        name: 'About',
        path: '/about/',
      },
    ],
  }

  render () {
    const { componentName, navItems } = this.props
    return (
      <nav id={componentName} className={componentName} role='navigation' itemType='http://schema.org/SiteNavigationElement'>
        <div className={`${componentName}__container`}>
          <div className={`${componentName}__main-item`}>
            <a href="/" className={`${componentName}__main-item-link`}>Jeffry.in</a>
          </div>
          <ol className={`${componentName}__items`}>
            {navItems.map(({ alias, name, path }, i) => {
              return (
                <li
                  key={i}
                  className={`${componentName}__item ${componentName}__item--${alias}`}
                >
                  <a
                    className={`${componentName}__link ${componentName}__link--${alias}`}
                    href={path}
                  >
                    {name}
                  </a>
                </li>
              )
            })}
          </ol>
        </div>
      </nav>
    )
  }
}

Header.propTypes = {
  componentName: PropTypes.string.isRequired,
  navItems: PropTypes.array.isRequired,
}
