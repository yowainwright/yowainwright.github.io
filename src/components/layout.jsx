import React from 'react'
import Head from './Head'
import Header from './Header'
import Footer from './Footer'
import { SocialNav } from './SocialNav'

import '../styles/main.scss'

export const Template = ({ children }) => (
  <div className='gatsby-container'>
    <Head />
    <SocialNav />
    <Header />
    {children}
    <Footer />
  </div>
)

export default Template
