import React from 'react'
import Link from 'gatsby-link'

const name = 'site-footer'
const year = new Date().getFullYear()
export default () => (
  <footer className={`${name}`} role='contentinfo' itemType='http://schema.org/WPFooter'>
    <div className={`${name}__wrapper`}>
      <p align="center" className={`${name}__body`}>
        This webpage contains my online thoughts. I'm <a href="https://jeffry.in/about"><strong>Jeffry Wainwright</strong></a>—a software engineer, artist, runner, and surfer living in Los Angeles. Email me at <a href="mailto:yowainwright@gmail.com"><strong>yowainwright@gmail.com</strong></a> or connect with me. I'm on <a href="https://github.com/yowainwright"><strong>Github</strong></a> , <a href="https://instagram.com/yowainwright"><strong>Instagram</strong></a>, <a href="https://twitter.com/yowainwright"><strong>Twitter</strong></a>, <a href="https://www.strava.com/athletes/722335"><strong>Strava</strong></a>, and <a href="https://www.linkedin.com/in/jeffrywainwright/"><strong>LinkedIn</strong></a>.
      </p>
      <figure className="figure--center">
        <img className="media--circular" src="https://yowainwright.imgix.net/portraits/me-smiling.jpg?w=100&h=100&fit=crop&auto=format" alt="Me smiling with a beard" />
      </figure>
      <p className={`${name}__content`}>
        <Link className={`${name}__link`} to={'/'}>jeffry.in {year}</Link>
      </p>
    </div>
  </footer>
)
