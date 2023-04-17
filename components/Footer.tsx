import React from 'react'
import Link from 'next/link'

import { SocialFooter } from './SocialFooter'

export const Footer = () => (
  <footer className='site-footer' role='contentinfo' itemType='http://schema.org/WPFooter'>
    <section className='site-footer__wrapper site-footer__wrapper--main'>
      <article className='site-footer__col site-footer__col--contact'>
        <h3 className='site-footer__title'>Contact</h3>
        <address className='site-footer__address'>
          <p className='site-footer__content'>Happy to chat, learn, help!</p>
          <p className='site-footer__content'>
            <a href='mailto:yowainwright@gmail.com'>yowainwright@gmail.com</a>, Los Angeles, CA
          </p>
        </address>
      </article>
      <div className='site-footer__col site-footer__col site-footer__col--social'>
        <h3 className='site-footer__title'>Connect</h3>
        <SocialFooter />
      </div>
      <article className='site-footer__col site-footer__col--self'>
        <h3 className='site-footer__title site-footer__title--self'>About</h3>
        <figure className='site-footer__figure'>
          <img
            className='media--circular site-footer__image'
            src='https://yowainwright.imgix.net/portraits/me-smiling.jpg?w=150&h=150&fit=crop&auto=format'
            height='100%'
            width='100%'
            alt='Me smiling with a beard'
          />
          <figcaption className='site-footer__caption'>
            <Link className='site-footer__link' href='/'>
              <strong>jeffry.in</strong>, {new Date().getFullYear()}
            </Link>
            , is the blog of{' '}
            <Link className='site-footer__link' href='/about'>
              Jeffry (Jeff) Wainwright
            </Link>
            , a software engineer, person, living in Los Angeles.
          </figcaption>
        </figure>
      </article>
    </section>
    <section className='site-footer__wrapper site-footer__wrapper--last'>
      <h3 className='site-footer__title site-footer__title--last'>
        <Link className='site-footer__link' href='/'>
          jeffry.in
        </Link>
        , {new Date().getFullYear()}
      </h3>
    </section>
  </footer>
)

export default Footer
