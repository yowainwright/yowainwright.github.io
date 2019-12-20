import React from 'react'
import { Link } from 'gatsby'
import { SocialFooter } from './SocialFooter'

const name = 'site-footer'
const year = new Date().getFullYear()
export default () => (
  <footer className={`${name}`} role='contentinfo' itemType='http://schema.org/WPFooter'>
    <div className={`${name}__wrapper`}>
      <div className={`${name}__col`}>
        <p className={`${name}__body`}>
          My online thoughts. I'm <Link to="/about"><strong>Jeffry Wainwright</strong></Link>—a software engineer, artist, runner, and surfer living in Los Angeles. <strong><a href="mailto:yowainwright@gmail.com">Email me</a></strong> or reach out on <a href="https://github.com/yowainwright"><strong>Github</strong></a>, <a href="https://instagram.com/yowainwright"><strong>Instagram</strong></a>, <a href="https://twitter.com/yowainwright"><strong>Twitter</strong></a>, <a href="https://www.strava.com/athletes/722335"><strong>Strava</strong></a>, or <a href="https://www.linkedin.com/in/jeffrywainwright/"><strong>LinkedIn</strong></a>.
        </p>
      </div>
      <div className={`${name}__col`}>
        <SocialFooter />
      </div>
      <div className={`${name}__col`}>
        <figure className="figure--center">
          <img className="media--circular" src="https://yowainwright.imgix.net/portraits/me-smiling.jpg?w=100&h=100&fit=crop&auto=format" alt="Me smiling with a beard" />
        </figure>
        <p className={`${name}__content`}>
          <Link className={`${name}__link`} to={'/'}>jeffry.in {year}</Link>
        </p>
      </div>
    </div>
  </footer>
)
