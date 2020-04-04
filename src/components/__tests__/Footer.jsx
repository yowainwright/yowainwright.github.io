import React from 'react';
import renderer from 'react-test-renderer';
import Footer from '../Footer';

describe('Footer component', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(<Footer />).toJSON();

    expect(rendered).toMatchSnapshot();
  });
});
