import React from 'react'
import { socialItems } from '../fixtures/social'

export const SocialList = () => (
  <ul className="social-list">
    {socialItems.map(({ name, path, small}, i) => (
      <li key={i} className={`social-list__item social-list__item--${small ? 'showing' : 'hidden'}`}>
        <a href={path} className='social-list__link'>{name}</a>
      </li>
    ))}
  </ul>
)
