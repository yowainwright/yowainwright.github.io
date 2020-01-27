import React from 'react'
import renderer from 'react-test-renderer'
import { BlogPostTemplate } from '../blog-post'

describe('BlogPost component', () => {
  it('renders correctly', () => {
    const data = {
      markdownRemark: {
        frontmatter: {
          title: 'foo',
        },
      },
    }
    const rendered = renderer.create(<BlogPostTemplate data={data} />).toJSON()

    expect(rendered).toMatchSnapshot()
  })
})
