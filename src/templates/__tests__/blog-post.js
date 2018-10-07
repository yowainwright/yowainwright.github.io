import React from 'react'
import renderer from 'react-test-renderer'
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
    const rendered = renderer.create(<BlogPost data={data} />).toJSON()

    expect(rendered).toMatchSnapshot()
  })
})
