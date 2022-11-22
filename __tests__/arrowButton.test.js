import { render, fireEvent } from '@testing-library/react-native';

import { ArrowButtom } from '../src/components/Basics/ArrowButtom';

test('Testando renderização com Loading False', async () => {
  const { toJSON } = render(
    <ArrowButtom 
      loading={false}
      gradient={[ '#A88BEB', '#8241B8' ]}
    />
  );

  expect(toJSON()).toMatchSnapshot();
});

test('Testando renderização com Loading True', async () => {
  const { toJSON } = render(
    <ArrowButtom 
      loading={true}
      gradient={[ '#A88BEB', '#8241B8' ]}
    />
  );

  expect(toJSON()).toMatchSnapshot();
});

test('Testando renderização com Loading False e Reverse True', async () => {
  const { toJSON } = render(
    <ArrowButtom 
      loading={false}
      gradient={[ '#A88BEB', '#8241B8' ]}
      reverse={true}
    />
  );

  expect(toJSON()).toMatchSnapshot();
});

test('Testando renderização com Loading True e Reverse True', async () => {
  const { toJSON } = render(
    <ArrowButtom 
      loading={true}
      gradient={[ '#A88BEB', '#8241B8' ]}
      reverse={true}
    />
  );

  expect(toJSON()).toMatchSnapshot();
});

