import { render, screen, fireEvent } from '@testing-library/react-native';
import { Buttom } from '../src/components/Basics/Buttom';

test('Testando conteudo para botão com parametro loading TRUE', async () => {
  const { getByText, toJSON } = render(
    <Buttom 
      title='Teste' 
      loading={true}
    />
  );

  // expect(getByText('Jabuticaba')).toBeFalsy();
  expect(getByText('Loading')).toBeTruthy();
  expect(toJSON()).toMatchSnapshot();
});

test('Testando conteudo para botão com parametro loading FALSE', async () => {
  const { getByText, toJSON } = render(
    <Buttom 
      title='Jabuticaba' 
      loading={false}
    />
  );

  // expect(getByText('Loading')).toBeFalsy();
  expect(getByText('Jabuticaba')).toBeTruthy();
  expect(toJSON()).toMatchSnapshot();
});