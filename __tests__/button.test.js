import React from 'react';

import renderer from 'react-test-renderer';

import { Buttom } from '../src/components/Basics/Buttom';

describe('<Buttom />', () => {

  it('has 1 child', () => {
    const tree = renderer
      .create(
        <Buttom 
          title='TESTE'
          loading={true}
        />
      ).toJSON();

    expect(tree.children.length).toBe(1);
    // expect(tree).toMatchSnapshot();
  });

  it('has 1 child', () => {
    const tree = renderer
      .create(
        <Buttom 
          title='TESTE'
          loading={false}
        />
      ).toJSON();

    expect(tree.children.length).toBe(1);
    // expect(tree).toMatchSnapshot();
  });
});