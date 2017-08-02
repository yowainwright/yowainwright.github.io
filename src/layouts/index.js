import React from 'react'
import Link from 'gatsby-link'
import Header from '../components/Header'
import Footer from '../components/Footer'

import "../styles/main.scss"

import { Container } from 'react-responsive-grid'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    return (
      <Container>
        <Header />
        {children()}
        <Footer />
      </Container>
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
