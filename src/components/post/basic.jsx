import React from 'react';
import { PostHeader } from './header';
import { Link } from 'gatsby';
import { ShareList } from '../ShareList';

export const BasicPost = ({ date, description, path, title }) => (
  <article className="post--article">
    <PostHeader title={title} path={path} date={date} />
    <p>
      {description}{' '}
      <Link className="post__link--read-more" to={path}>
        &rarr;
      </Link>
    </p>
    <ShareList name="blog-bottom" path={path} title={title} />
    <hr />
  </article>
);
