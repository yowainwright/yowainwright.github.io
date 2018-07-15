import React from 'react'
import Template from '..'

describe('Template component', () => {
  it('renders correctly', () => {
    const rendered = shallow(<Template children={() => null} />)

    expect(rendered).toMatchSnapshot()
  })
})
