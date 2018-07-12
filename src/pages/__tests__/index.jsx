import React from 'react'
import BlogIndex from '..'

describe('BlogIndex component', () => {
  it('renders correctly', () => {
    const rendered = shallow(<BlogIndex />)

    expect(rendered).toMatchSnapshot()
  })
})
