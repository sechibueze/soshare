import React from 'react';
import renderer from 'react-test-renderer';
import ButtonPress from '.';
describe('It renders', () => {
  it('It renders unit', () => {
    const tree = renderer.create(<ButtonPress title='hello' />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
