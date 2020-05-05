import React from 'react'
import { Link } from 'gatsby'

export const Hamburger = ({ icon = '☰' }) => <button className='nav-button nav-button--hamburger'>{icon}</button>

export const NavList = ({ componentName, navItems }) => (
  <ol className={`${componentName}__items`}>
    {navItems.map(({ alias, name, path }, i) => {
      return (
        <li key={i} className={`${componentName}__item ${componentName}__item--${alias}`}>
          <Link className={`${componentName}__link ${componentName}__link--${alias}`} to={path}>
            {name}
          </Link>
        </li>
      )
    })}
  </ol>
)

export const Header = ({
  componentName = 'site-nav',
  navItems = [
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
}) => {
  return (
    <nav
      id={componentName}
      className={componentName}
      role='navigation'
      itemType='http://schema.org/SiteNavigationElement'
    >
      <div className={`${componentName}__container`}>
        <Link to='/' className={`${componentName}__main-item-link`}>
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
