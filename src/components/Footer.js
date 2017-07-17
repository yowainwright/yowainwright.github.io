import React from "react"

class Footer extends React.Component {
  render() {
    return (
      ~
      {" "}
      <footer
        class="site-footer"
        role="contentinfo"
        itemtype="http://schema.org/WPFooter"
      >
        ~
        {" "}
        <p class="site-footer__content">
          <Link
            class="site-footer__link"
            to={'/''>
              jeffry.in
          </LInk>
          ~
          {" "}
          <span
            class="site-footer__date"
            data-date="site-year">
              2017
          </span>
        </p>
      </footer>
    )
  }
}

export default Footer
