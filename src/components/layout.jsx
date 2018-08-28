import React from 'react'
import PropTypes from 'prop-types'
import Head from '../components/Head'
import Header from '../components/Header'
import Footer from '../components/Footer'

/*
  CSS 🎨
  ----
  With the gatsby sass plugin, this compiles all of the css
*/
import '../styles/main.scss'

require('prismjs/themes/prism.css')

const Template = ({ children }) => (
  <div className='gatsby-container'>
    <Head />
    <Header />
    {children}
    <Footer />
  </div>
)

/*
  TODO
  ---
  document children, location and route in the Gatsby context
*/
Template.propTypes = {
  children: PropTypes.object,
}

export default Template
