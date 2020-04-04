import React from 'react';
import renderer from 'react-test-renderer';
import Template from '../layout';

describe('Template component', () => {
  it('renders correctly', () => {
    const node = <div />;
    const rendered = renderer.create(<Template children={node} />).toJSON() // eslint-disable-line

    expect(rendered).toMatchSnapshot();
  });
});
