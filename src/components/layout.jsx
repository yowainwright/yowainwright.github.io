import React from 'react'
import PropTypes from 'prop-types'
import Head from '../components/Head'
import Header from '../components/Header'
import Footer from '../components/Footer'

import '../styles/main.scss'

import 'prismjs/themes/prism.css'

const Template = ({ children }) => (
  <div className='gatsby-container'>
    <Head />
    <Header />
    {children}
    <Footer />
  </div>
)

Template.propTypes = {
  children: PropTypes.node,
}

export default Template
