import React from 'react'

const isProd = process.env.NODE_ENV === 'production'

class HeadContent extends React.Component {
  constructor(props) {
    super(props);
    this.env = process.env.NODE_ENV
  }

  inlineStyles() {
    if (!isProd) return
    let stylesStr
    try {
      stylesStr = require(`!raw-loader!../public/styles.css`)
    } catch (e) {
      console.warn(e)
    }
    return (
      <style id="gatsby-inlined-css" dangerouslySetInnerHTML={{ __html: stylesStr }}
      />
    )
  }

  render() {
    return (
      <head>
        <meta name="robots" content="index,follow" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Jeffry.in" />
        <meta property="og:image" content="https://yowainwright.imgix.net/w.jpg" itemProp="image" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="600" />
        {this.props.headComponents}
        {this.inlineStyles}
      </head>
    )
  }
}

export default HeadContent
