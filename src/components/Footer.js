import React from "react"
import Link from "gatsby-link"

class Footer extends React.Component {
  render() {
    return (
      <footer className="site-footer" role="contentinfo" itemType="http://schema.org/WPFooter">
        <p className="site-footer__content">
          <Link className="site-footer__link" to={'/'}>jeffry.in</Link>
          <span className="site-footer__date" data-date="site-year">2017</span>
        </p>
      </footer>
    )
  }
}

export default Footer
