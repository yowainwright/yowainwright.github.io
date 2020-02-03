import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'


const navData = {
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

export const Hamburger = () => (<button className="nav-button nav-button--hamburger">☰</button>)

export const NavList = ({ componentName, navItems }) => (
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
)

const Header = () => {
  const { componentName, navItems } = navData
  return (
    <nav id={componentName} className={componentName} role='navigation' itemType='http://schema.org/SiteNavigationElement'>
      <div className={`${componentName}__container`}>
        <Link to="/" className={`${componentName}__main-item-link`}>
          <div className={`${componentName}__main-item`}>
            <h3 className={`${componentName}__main-item-symbol`}>j</h3>
            <h2 className={`${componentName}__main-item-title`}>Jeffry.in</h2>
          </div>
        </Link>
        <NavList componentName={componentName} navItems={navItems} />
      </div>
    </nav>
  )
}

export default Header
