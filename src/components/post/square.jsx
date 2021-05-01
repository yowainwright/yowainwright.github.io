import React from 'react'
import { Link } from 'gatsby'

export const SquarePost = ({ title, date, path }) => {
  return (
      <article className='post--headline post'>
        <header>
          <Link to={path} className='post--full-link post__link--square'>
          <h2 className='post__title--headline'>{title}</h2>
          </Link>
          <time>{date}</time>
        </header>
      </article>
  )
}

export default SquarePost
