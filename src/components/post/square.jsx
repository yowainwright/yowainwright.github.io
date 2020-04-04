import React from 'react';
import { Link } from 'gatsby';

export const SquarePost = ({ title, date, path }) => {
  return (
    <Link to={path} className="post--full-link post__link--square">
      <article className="post--headline post">
        <header>
          <h2 className="post__title--headline">{title}</h2>
          <time>{date}</time>
        </header>
      </article>
    </Link>
  );
};
