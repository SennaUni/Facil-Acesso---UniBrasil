// import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';


export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-bottom-color: #EEE;
  border-bottom-width: 1px;
  padding: 10px;

  background-color: ${props => props.backGround};
`;

export const Picture = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  margin-right: 12px;
`;

export const Label = styled.Text`
  font-size: 16px;
  color: #555;

  font-weight: ${props => props.fontWeight};
`;
