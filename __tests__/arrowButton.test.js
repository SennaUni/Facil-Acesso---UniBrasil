import React from 'react';

import { create, act } from 'react-test-renderer';

import { ArrowButtom } from '../src/components/Basics/ArrowButtom';

describe('render correctly', () => {

  it('loading false', () => {
    const tree = create(
      <ArrowButtom 
        loading={false}
        gradient={[ '#A88BEB', '#8241B8' ]}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('loading true', () => {
    const tree = create(
      <ArrowButtom 
      loading={true}
      gradient={[ '#A88BEB', '#8241B8' ]}
    />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('loading true and reverse', () => {
    const tree = create(
      <ArrowButtom 
      loading={true}
      gradient={[ '#A88BEB', '#8241B8' ]}
      reverse={true}
    />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});