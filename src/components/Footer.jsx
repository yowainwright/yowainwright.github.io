import React from 'react'
import { Link } from 'gatsby'

import { SocialFooter } from './SocialFooter';

export const Footer = () => (
  <footer className='site-footer' role='contentinfo' itemType='http://schema.org/WPFooter'>
    <section className='site-footer__wrapper site-footer__wrapper--main'>
      <article className='site-footer__col site-footer__col--self'>
        <h3 className='site-footer__title site-footer__title--self'>
          <Link className='site-footer__link' to='/about'>
            About
          </Link>
        </h3>
        <figure className='site-footer__figure'>
          <img
            className='media--circular site-footer__image'
            src='https://yowainwright.imgix.net/portraits/me-smiling.jpg?w=100&h=100&fit=crop&auto=format'
            alt='Me smiling with a beard'
          />
          <figcaption className='site-footer__caption'>
            <Link className='site-footer__link' to='/'>
              <strong>jeffry.in</strong>, {new Date().getFullYear()}
            </Link>, is the blog of Jeffry (Jeff) Wainwright, a software engineer, person, living in Los Angeles.
          </figcaption>
        </figure>
      </article>
      <div className='site-footer__col site-footer__col site-footer__col--social'>
        <h3 className='site-footer__title'><a href='https://github.com/yowainwright'>Connect</a></h3>
        <SocialFooter />
      </div>
     <article className='site-footer__col site-footer__col--contact'>
        <h3 className='site-footer__title'>
          <a href='mailto:yowainwright@gmail.com'>Contact</a>
        </h3>
        <address className='site-footer__address'>
          <ul className='site-footer__items site-footer__items--address'>
            <li className='site-footer__item'>
              Happy to chat, learn, help! <span className='site-footer__thumbs'></span>
            </li>
            <li className='site-footer__item'>
              <a href='mailto:yowainwright@gmail.com'>yowainwright@gmail.com</a>
            </li>
            <li className='site-footer__item'>Los Angeles, CA 90035</li>
        </ul>
      </address>
      </article>
    </section>
    <h3 className='site-footer__title site-footer__title--last'>
      <Link className='site-footer__link' to='/'>
        jeffry.in, {new Date().getFullYear()} <span className='site-footer__symbol site-footer__symbol--lightning'></span>
      </Link>
    </h3>
  </footer>
)

export default Footer
