import React, { Component } from 'react'
import Helmet from 'react-helmet'

/*
  Header 👤
  ----
  The Header Component is the navigation and top part of the site across all pages/routes
*/
class Head extends Component {
  constructor(props) {
    super(props)
  }

  /*
    TODO
    ----
    Abstract navItems out to a config
  */
  render() {
    return (
      <Helmet>
        <meta name="robots" content="index,follow" />
        <meta property="og:locale" content="en_US" />
        <link href="https://yowainwright.imgix.net/favicon.ico" rel="icon" />
        <link href="https://yowainwright.imgix.net/w.png" rel="apple-touch-icon" itemProp="logo" />
        <meta name="google-site-verification" content="cXTq9c3NhBvHJsPXxzWAYAqbB8PRUKUxemU8mykg_vs" />
        <script async src="//www.google-analytics.com/analytics.js"></script>
        <script async src="https://www.googletagmanager.com/gtm.js?id=GTM-NRFFQ9"></script>
        <meta name="keywords" content="jeffry, wainwright, jeffry wainwright, code, programmer, artist, athlete, developer, engineer" />
        <meta name="theme-color" content="#ffffcc" />
        <link rel="manifest" href="https://yowainwright.imgix.net/manifest.json" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yowainwright" />
        <meta name="twitter:creator" content="@yowainwright" />
        <meta property="og:site_name" content="Jeffry.in" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="600" />
      </Helmet>
    )
  }
}

export default Head
