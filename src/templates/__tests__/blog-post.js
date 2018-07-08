import BlogPost from '..'

describe('BlogPost component', () => {
  it('renders correctly', () => {
    const rendered = shallow(<BlogPost />)

    expect(rendered).toMatchSnapshot()
  })
})
