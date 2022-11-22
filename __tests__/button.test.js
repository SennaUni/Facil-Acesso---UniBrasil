import React from 'react';

import { create, act } from 'react-test-renderer';

import { Buttom } from '../src/components/Basics/Buttom';

describe('render correctly', () => {

  it('loading false', () => {
    const tree = create(
      <Buttom 
        title='TESTE'
        loading={true}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('loading true', () => {
    const tree = create(
      <Buttom 
        title='TESTE'
        loading={false}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});