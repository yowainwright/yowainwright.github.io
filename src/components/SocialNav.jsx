import React from 'react'
import { SocialList } from './SocialList'

export const SocialNav = ({ List = <SocialList /> }) => <nav className='social-nav'>{List}</nav>
