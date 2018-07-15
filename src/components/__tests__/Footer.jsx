import React from 'react'
import Footer from '../Footer'

describe('Footer component', () => {
  it('renders correctly', () => {
    const rendered = shallow(<Footer />)

    expect(rendered).toMatchSnapshot()
  })
})
