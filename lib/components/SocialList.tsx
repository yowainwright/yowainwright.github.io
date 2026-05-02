import React from "react";
import { SOCIAL_ITEMS as socialItems } from "../constants";
import { SocialListProps } from "../types";

export const SocialList = ({ items = socialItems }: SocialListProps) => (
  <ul className="social-list">
    {items.map(({ alias, name, path, small }) => (
      <li
        key={alias}
        className={`social-list__item social-list__item--${small ? "showing" : "hidden"}`}
      >
        <a href={path} className="social-list__link">
          {name}
        </a>
      </li>
    ))}
  </ul>
);

export default SocialList;
