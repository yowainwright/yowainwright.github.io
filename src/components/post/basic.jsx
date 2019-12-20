import React from 'react'
import { PostHeader } from './header'
import { Link } from 'gatsby'

export const BasicPost = ({ date, description, path, title }) => (
  <article className='post--article'>
    <PostHeader title={title} path={path} date={date} />
    <p>
      {description}{' '}
      <Link className='post__link--read-more' to={path}>[...]</Link>
    </p>
    <hr />
  </article>
)
