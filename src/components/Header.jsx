import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
export default class Header extends Component {
  static defaultProps = {
    componentName: 'site-nav',
    navItems: [
      {
        alias: 'about',
        name: 'About',
        path: '/about/',
      },
      {
        alias: 'archive',
        inApp: true,
        name: 'Archive',
        path: '/archive/',
      },
    ],
  }

  render () {
    const { componentName, navItems } = this.props
    return (
      <nav id={componentName} className={componentName} role='navigation' itemType='http://schema.org/SiteNavigationElement'>
        <div className={`${componentName}__container`}>
          <Link to="/" className={`${componentName}__main-item-link`}>
            <div className={`${componentName}__main-item`}>
              <h3 className={`${componentName}__main-item-symbol`}>j</h3>
              <h2 className={`${componentName}__main-item-title`}>Jeffry.in</h2>
            </div>
          </Link>
          <ol className={`${componentName}__items`}>
            {navItems.map(({ alias, name, path }, i) => {
              return (
                <li
                  key={i}
                  className={`${componentName}__item ${componentName}__item--${alias}`}
                >
                  <Link
                    className={`${componentName}__link ${componentName}__link--${alias}`}
                    to={path}
                  >
                    {name}
                  </Link>
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
