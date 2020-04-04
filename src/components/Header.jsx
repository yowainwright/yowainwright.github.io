import React from "react";
import { Link } from "gatsby";

const navData = {
  name: "site-nav",
  navItems: [
    {
      alias: "about",
      name: "About",
      path: "/about/"
    },
    {
      alias: "archive",
      inApp: true,
      name: "Archive",
      path: "/archive/"
    }
  ]
};

/**
 * @todo export const Hamburger = () => (<button className="nav-button nav-button--hamburger">☰</button>)
 */

export const NavList = ({ name, navItems }) => (
  <ol className={`${name}__items`}>
    {navItems.map(({ alias, name, path }, i) => {
      return (
        <li key={i} className={`${name}__item ${name}__item--${alias}`}>
          <Link className={`${name}__link ${name}__link--${alias}`} to={path}>
            {name}
          </Link>
        </li>
      );
    })}
  </ol>
);

const Header = () => {
  const { name, navItems } = navData;
  return (
    <nav
      id={name}
      className={name}
      role="navigation"
      itemType="http://schema.org/SiteNavigationElement"
    >
      <div className={`${name}__container`}>
        <Link to="/" className={`${name}__main-item-link`}>
          <div className={`${name}__main-item`}>
            <h3 className={`${name}__main-item-symbol`}>j</h3>
            <h2 className={`${name}__main-item-title`}>Jeffry.in</h2>
          </div>
        </Link>
        <NavList name={name} navItems={navItems} />
      </div>
    </nav>
  );
};

export default Header;
