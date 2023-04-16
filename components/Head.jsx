import React from 'react'
import Helmet from 'react-helmet'
/* eslint-disable react/no-unknown-property */

export const Header = () => (
  <Helmet
    htmlAttributes={{
      lang: 'en',
    }}
  >
    <meta name='robots' content='index,follow' />
    <meta property='og:locale' content='en_US' />
    <link href='https://yowainwright.imgix.net/favicon.png' rel='icon' />
    <link href='https://yowainwright.imgix.net/apple-icon-120x120.png' rel='apple-touch-icon' itemProp='logo' />
    <link rel='preconnect' href='https://fonts.googleapis.com' />
    <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin></link>
    <link href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap' rel='stylesheet' />
    <meta
      name='keywords'
      content='jeffry, wainwright, jeffry wainwright, code, programmer, artist, athlete, developer, engineer'
    />
    <meta name='theme-color' content='#007cf0' />
    <link rel='manifest' href='https://yowainwright.imgix.net/manifest.json' />
    <meta name='description' content='Jeffry.in is the blog of Jeffry Wainwright, an engineer living in California.' />
    <meta property='og:site_name' content='Jeffry.in' />
    <meta property='og:image:width' content='1200' />
    <meta property='og:image:height' content='600' />
    <meta name='google-site-verification' content='cXTq9c3NhBvHJsPXxzWAYAqbB8PRUKUxemU8mykg_vs' />

    <script src='https://www.googletagmanager.com/gtag/js?id=UA-73077309-1' defer />
    <script src='https://yowainwright.imgix.net/data-layer.js' defer />
  </Helmet>
)

export default Header
