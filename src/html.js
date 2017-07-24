import React from "react"
import HeadContent from './components/HeadContent'

export default class HTML extends React.Component {
  render() {

    return (
      <html lang="en">
        <HeadContent />
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
