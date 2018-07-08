import Archive from '../archive'

describe('Archive component', () => {
  it('renders correctly', () => {
    const rendered = shallow(<Archive />)

    expect(rendered).toMatchSnapshot()
  })
})
