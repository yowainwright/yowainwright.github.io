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
        Written by
        {" "}
        <strong>Kyle Mathews</strong>
        {" "}
        who lives and works in San Francisco building useful things.
        {" "}
        <a href="https://twitter.com/kylemathews">
          You should follow him on Twitter
        </a>
      </p>
    )
  }
}

export default Bio
