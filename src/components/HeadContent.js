import React from "react"

import typography from "../utils/typography"

import { TypographyStyle } from "react-typography"

let stylesStr
if (process.env.NODE_ENV === `production`) {
  try {
    stylesStr = require(`!raw-loader!../public/styles.css`)
  } catch (e) {
    console.log(e)
  }
}

class HeadContent extends React.Component {
  render() {
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
      <head>
        <meta name="robots" content="index,follow" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Jeffry.in" />
        <meta property="og:image" content="https://yowainwright.imgix.net/w.jpg" itemProp="image" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="600" />
        {this.props.headComponents}
        <TypographyStyle typography={typography} />
        {css}
      </head>
    )
  }
}

export default HeadContent
