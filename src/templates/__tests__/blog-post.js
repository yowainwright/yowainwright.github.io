import React from 'react'
import BlogPost from '../blog-post'

describe('BlogPost component', () => {
  it('renders correctly', () => {
    const data = {
      markdownRemark: {
        frontmatter: {
          title: 'foo',
        },
      },
    }
    const rendered = shallow(<BlogPost data={data} />)

    expect(rendered).toMatchSnapshot()
  })
})
