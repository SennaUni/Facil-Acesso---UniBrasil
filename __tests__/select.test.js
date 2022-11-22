import { render, screen, fireEvent } from '@testing-library/react-native';
import { Select } from '../src/components/Basics/Select';
import { OptionSelect } from '../src/components/Basics/OptionSelect';

test('Testando conteúdo interno do Select', async () => {
  const valorSelecionado = '';

  const options = [
    {
      id: 1,
      icon: 'smile-o',
      value: 'Super recomendo'
    },
    {
      id: 3,
      icon: 'meh-o',
      value: 'Recomendo'
    },
    {
      id: 3,
      icon: 'frown-o',
      value: 'Não recomendo'
    },
  ];

  function onChangeTest(valor) { console.log(value)
    valorSelecionado = valor;
  }

  const { getByText, toJSON } = render(
    <Select 
      options={options}
      icon="star"
      placeholder="Defina sua satisfação"
      header='Selecione sua satisfação'
      OptionComponent={OptionSelect}
      onChange={onChangeTest}
    />
  );

  fireEvent.press(getByText('Super recomendo'));

  expect(valorSelecionado).toBe('Super recomendo');
  expect(getByText('Super recomendo')).toBeTruthy();
  expect(toJSON()).toMatchSnapshot();
});
