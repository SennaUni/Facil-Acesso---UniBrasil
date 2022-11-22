import React from 'react';

import { create, act } from 'react-test-renderer';

import { Input } from '../src/components/Basics/Input';

describe('render correctly', () => {

  it('loading false', () => {
    const tree = create(
      <Input 
        name="password-homolog"
        icon="lock"
        placeholder="Senha"
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});