import React from 'react'
import BlogPost from '../blog-post'

describe('BlogPost component', () => {
  it('renders correctly', () => {
    const rendered = shallow(<BlogPost />)

    expect(rendered).toMatchSnapshot()
  })
})
