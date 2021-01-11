import React from 'react'
import { Link } from 'gatsby'

export const Footer = ({ name = 'site-footer', year = new Date().getFullYear() }) => (
  <footer className={`${name}`} role='contentinfo' itemType='http://schema.org/WPFooter'>
    <div className={`${name}__wrapper`}>
      <div className={`${name}__col`}>
        <figure className={`figure--center ${name}__figure`}>
          <img
            className='media--circular'
            src='https://yowainwright.imgix.net/portraits/me-smiling.jpg?w=100&h=100&fit=crop&auto=format'
            alt='Me smiling with a beard'
          />
        </figure>
        <p className={`${name}__content`}>
          <Link className={`${name}__link`} to='/'>
            jeffry.in {year}
          </Link>
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
