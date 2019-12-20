import React from 'react'
import PropTypes from 'prop-types'
import Head from './Head'
import Header from './Header'
import Footer from './Footer'
import { SocialNav } from './SocialNav'

import '../styles/main.scss'

import 'prismjs/themes/prism.css'

const Template = ({ children }) => (
  <div className='gatsby-container'>
    <Head />
    <SocialNav />
    <Header />
    {children}
    <Footer />
  </div>
)

Template.propTypes = {
  children: PropTypes.node,
}

export default Template
