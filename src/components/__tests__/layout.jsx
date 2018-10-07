import React from 'react'
import renderer from 'react-test-renderer'
import Template from '../layout'

describe('Template component', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(<Template children={() => null} />).toJSON() // eslint-disable-line

    expect(rendered).toMatchSnapshot()
  })
})
