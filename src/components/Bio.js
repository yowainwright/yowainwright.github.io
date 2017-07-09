import React from "react"

// Import typefaces
import "typeface-montserrat"
import "typeface-merriweather"

import { rhythm } from "../utils/typography"

class Bio extends React.Component {
  render() {
    return (
      <p
        style={{
          marginBottom: rhythm(2.5),
        }}
      >
        ~
        {" "}
        <strong><a href="https://github.com/yowainwright">Jeff Wainwright</a></strong>

      </p>
    )
  }
}

export default Bio
