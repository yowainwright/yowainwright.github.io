import React from 'react'
import renderer from 'react-test-renderer'
import Head from '../Head'

describe('Head component', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(<Head />).toJSON()

    expect(rendered).toMatchSnapshot()
  })
})
