import React, { useContext } from 'react'
import Link from 'next/link'
import { Moon } from './svg/Moon'
import { Sun } from './svg/Sun'
import { DispatchStore, GlobalState } from '../pages/_app'

export const navItems = [
  {
    alias: 'resume',
    name: 'Resume',
    path: '/resume/',
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

export const Icon = ({ isDarkMode }) => (isDarkMode ? <Sun /> : <Moon />)

export function DarkmodeToggle() {
  const state = useContext(GlobalState)
  const dispatch = useContext(DispatchStore)
  function handleToggle() {
    dispatch({ type: 'SET_IS_DARKMODE', payload: !state?.isDarkMode })
  }

  return (
    <button className='site-nav__toggle' onClick={handleToggle} title='Toggle Darkmode'>
      <Icon isDarkMode={state?.isDarkMode} />
    </button>
  )
}

export const NavItem = ({ alias, componentName, name, path }) => (
  <li className={`${componentName}__item ${componentName}__item--${alias}`}>
    <Link className={`${componentName}__link ${componentName}__link--${alias}`} href={path}>
      {name}
    </Link>
  </li>
)

export function NavList({ componentName, navItems }) {
  return (
    <ul className={`${componentName}__items`}>
      {navItems.map(({ alias, name, path }, i) => (
        <NavItem key={i} alias={alias} componentName={componentName} name={name} path={path} />
      ))}
    </ul>
  )
}

export function Header() {
  return (
    <nav id='site-nav' className='site-nav' role='navigation' itemType='http://schema.org/SiteNavigationElement'>
      <section className='site-nav__container'>
        <Link href='/' className='logo'>
          <h3 className='logo__title'>j</h3>
        </Link>
        <div className='site-nav__links-wrapper'>
          <NavList componentName='site-nav' navItems={navItems} />
          <DarkmodeToggle />
        </div>
      </section>
    </nav>
  )
}

export default Header
