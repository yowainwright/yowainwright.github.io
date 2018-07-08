import Head from '../Head'

describe('Head component', () => {
  it('renders correctly', () => {
    const rendered = shallow(<Head />)

    expect(rendered).toMatchSnapshot()
  })
})
