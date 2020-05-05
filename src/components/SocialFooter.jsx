import React from 'react'
import { SocialList } from './SocialList'

export const SocialFooter = ({ List = <SocialList /> }) => <nav className='social-footer'>{List}</nav>

export default SocialFooter
