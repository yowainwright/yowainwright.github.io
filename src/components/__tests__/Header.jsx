import React from 'react'
import renderer from 'react-test-renderer'
import Header from '../Header'

describe('Header component', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(<Header />).toJSON()

    expect(rendered).toMatchSnapshot()
  })
})
