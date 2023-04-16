import React from 'react'

export const socialItems = [
  {
    alias: 'github',
    name: 'Github',
    path: 'https://github.com/yowainwright',
    small: true,
  },
  {
    alias: 'instagram',
    name: 'Instragram',
    path: 'https://instagram.com/yowainwright',
    small: true,
  },
  {
    alias: 'linkedin',
    name: 'LinkedIn',
    path: 'https://www.linkedin.com/in/jeffrywainwright/',
    small: true,
  },
]

export const SocialList = ({ items = socialItems }) => (
  <ul className='social-list'>
    {items.map(({ name, path, small }, i) => (
      <li key={i} className={`social-list__item social-list__item--${small ? 'showing' : 'hidden'}`}>
        <a href={path} className='social-list__link'>
          {name}
        </a>
      </li>
    ))}
  </ul>
)

export default SocialList
