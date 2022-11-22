import { render, screen, fireEvent } from '@testing-library/react-native';
import { OptionSelect } from '../src/components/Basics/OptionSelect';

test('Testando conteúdo interno do OptionSelect', async () => {
  let buttonPress = false;

  const item = {
    id: 1,
    icon: 'smile-o',
    value: 'Super recomendo'
  };

    const selectedValue = {
      id: 1,
      icon: 'smile-o',
      value: 'Super recomendo'
    };

  function onPressTest() {
    buttonPress = true;
  }

  const { getByText, toJSON } = render(
    <OptionSelect 
      item={item}
      selectedValue={selectedValue}
      onPress={onPressTest}
    />
  );

  fireEvent.press(getByText('Super recomendo'));

  expect(buttonPress).toBe(true);
  expect(getByText('Super recomendo')).toBeTruthy();
  expect(toJSON()).toMatchSnapshot();
});
