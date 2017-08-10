import React, { Component } from 'react'
import Head from '../components/Head'
import Header from '../components/Header'
import Footer from '../components/Footer'

import '../styles/main.scss'

class Template extends Component {
  render() {
    const {
      location,
      children
    } = this.props
    return (
      <html>
      <Head />
        <body>
        <div className="gatsby-container">
          <Header />
            {children()}
          <Footer />
        </div>
        </body>
      </html>
    )
  }
}

/*

*/
Template.propTypes = {
  children: React.PropTypes.func,
  location: React.PropTypes.object,
  route: React.PropTypes.object,
}

export default Template
