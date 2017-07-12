import React from "react"
import { TypographyStyle } from "react-typography"
import Helmet from "react-helmet"

import typography from "./utils/typography"

let stylesStr
if (process.env.NODE_ENV === `production`) {
  try {
    stylesStr = require(`!raw-loader!../public/styles.css`)
  } catch (e) {
    console.log(e)
  }
}

export default class HTML extends React.Component {
  render() {
    const head = Helmet.rewind()
    let css
    if (process.env.NODE_ENV === `production`) {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: stylesStr }}
        />
      )
    }

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="robots" content="index,follow">
          <meta property="og:locale" content="en_US">
          <meta name="description" content="Jeffry.in—Jeff Wainwright's blog">
          <link href="https://yowainwright.imgix.net/favicon.ico" rel="icon" />
          <link href="https://yowainwright.imgix.net/w.png" rel="apple-touch-icon" itemprop="logo" />
          <meta name="google-site-verification" content="cXTq9c3NhBvHJsPXxzWAYAqbB8PRUKUxemU8mykg_vs" />
          <meta name="theme-color" content="#ffffcc">
          <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NRFFQ9');
          </script>
          <meta name="keywords" content="jeffry, wainwright, jeffry wainwright, code, programmer, artist, athlete, developer, engineer" />
          <link rel="manifest" href="https://yowainwright.imgix.net/manifest.json">
          <meta name="twitter:url" property="og:url" content="https://jeffry.in">
          <meta name="twitter:title" property="og:title" content="Jeffry.in—Jeff Wainwright's blog">
          <meta name="twitter:description" property="og:description" content="Jeffry.in—Jeff Wainwright's blog">
          <meta name="twitter:card" content="summary_large_image">
          <meta name="twitter:site" content="@yowainwright">
          <meta name="twitter:creator" content="@yowainwright">
          <meta name="twitter:image" content="https://yowainwright.imgix.net/w.jpg?w=1200&h=600&fit=crop&crop=focalpoint&auto=format" itemprop="image">
          <meta property="og:site_name" content="Jeffry.in">
          <meta property="og:image" content="https://yowainwright.imgix.net/w.jpg?w=1200&h=600&fit=crop&crop=focalpoint&auto=format" itemprop="image">
          <meta property="og:image:width" content="1200">
          <meta property="og:image:height" content="600">
          {this.props.headComponents}
          <TypographyStyle typography={typography} />
          {css}
        </head>
        <body>
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}
