import React from 'react'
import { Link } from 'gatsby'

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
  navItems = [
    {
      alias: 'about',
      name: 'About',
      path: '/about/',
    },
    {
      alias: 'archive',
      name: 'Archive',
      path: '/archive/',
    },
  ],
}) => {
  return (
    <>
      <nav
        id='site-nav'
        className='site-nav'
        role='navigation'
        itemType='http://schema.org/SiteNavigationElement'
      >
        <section className='site-nav__container'>
          <Link to='/' className='logo'>
            <h3 className='logo__title'>j</h3>
          </Link>
          <NavList componentName='site-nav' navItems={navItems} />
        </section>
      </nav>
    </>
  )
}

export default Header
