import Header from '../Header'

describe('Header component', () => {
  it('renders correctly', () => {
    const rendered = shallow(<Header />)

    expect(rendered).toMatchSnapshot()
  })
})
