import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { Moon } from './svg/Moon'
import { Sun } from './svg/Sun'

export const navItems = [
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
  {
    alias: 'resume',
    name: 'Resume',
    path: '/resume/',
  },
]

export function Icon({ isDarkMode }) {
  if (isDarkMode) {
    return <Sun />
  }

  return <Moon />
}

export const DarkmodeToggle = () => {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false
  const [isLoaded, setIsLoaded] = useState(false)
  const [isDarkMode, seIsDarkMode] = useState(prefersDarkMode)

  useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true)
      if (prefersDarkMode) {
        document.body.classList.add('js-is-darkmode')
      }
    }
  }, [isLoaded, setIsLoaded])

  function handleToggle() {
    const body = document.querySelector('body')
    body.classList.toggle('js-is-darkmode')
    seIsDarkMode(!isDarkMode)
  }

  return (
    <button className='site-nav__toggle' onClick={handleToggle} title='Toggle Darkmode'>
      <Icon isDarkMode={isDarkMode} />
    </button>
  )
}

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

export const Header = () => (
  <>
    <nav id='site-nav' className='site-nav' role='navigation' itemType='http://schema.org/SiteNavigationElement'>
      <section className='site-nav__container'>
        <Link to='/' className='logo'>
          <h3 className='logo__title'>j</h3>
        </Link>
        <div className='site-nav__links-wrapper'>
          <NavList componentName='site-nav' navItems={navItems} />
          <DarkmodeToggle />
        </div>
      </section>
    </nav>
  </>
)

export default Header
