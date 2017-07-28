import React from "react"

import Link from "gatsby-link"

/*
  Header 👤
  ----
  The Header Component is the navigation and top part of the site across all pages/routes
*/
class Header extends React.Component {
  render() {
    return (
      <nav id="site-nav" className="site-nav" role="navigation"  itemType="http://schema.org/SiteNavigationElement">
        <ol className="site-nav__items">
          <li className="site-nav__item site-nav__item--home">
          <Link className="site-nav__link site-nav__link--logo" to={"/"}> Jeffry.in</Link> </li>
          <li className="site-nav__item site-nav__item--github">
           <Link className="site-nav__link" to={"https://github.com/yowainwright"}>Github</Link>
          </li>
          <li className="site-nav__item site-nav__item--twitter">
            <Link className="site-nav__link" to={"https://twitter.com/yowainwright"}>Twitter</Link>
          </li>
          <li className="site-nav__item">
            <Link className="site-nav__link" to={"/archive"}>Archive</Link>
          </li>
          <li className="site-nav__item">
            <Link className="site-nav__link" to={"/about/"}>About</Link>
          </li>
        </ol>
      </nav>
    )
  }
}

export default Header
