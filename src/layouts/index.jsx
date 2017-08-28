import React, { Component } from 'react'
import Head from '../components/Head'
import Header from '../components/Header'
import Footer from '../components/Footer'

/*
  CSS 🎨
  ----
  With the gatsby sass plugin, this compiles all of the css
*/
import '../styles/main.scss'

/*


*/
class Template extends Component {
  render() {
    const {
      location,
      children
    } = this.props
    return (
      <div className="gatsby-container">
        <Head />
        <Header />
        {children()}
        <Footer />
      </div>
    )
  }
}

/*
  TODO
  ---
  document children, location and route in the Gatsby context
*/
Template.propTypes = {
  children: React.PropTypes.func,
  location: React.PropTypes.object,
  route: React.PropTypes.object,
}

export default Template

