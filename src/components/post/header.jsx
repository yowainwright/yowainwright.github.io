import React from 'react'
import { Link } from 'gatsby'

export const PostHeader = ({ title, path, date }) => (
  <header>
    <h2>
      <Link to={path}>{title}</Link>
    </h2>
    <time>{date}</time>
  </header>
)
