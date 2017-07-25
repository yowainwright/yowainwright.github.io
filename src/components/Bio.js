import React from "react"

// Import typefaces
import "typeface-montserrat"
import "typeface-merriweather"

import { rhythm } from "../utils/typography"

class Bio extends React.Component {
  render() {
    return (<p style={{marginBottom: rhythm(2.5),}}><strong><Link to={"https://github.com/yowainwright"}>Jeff Wainwright</Link></strong></p>)
  }
}

export default Bio
