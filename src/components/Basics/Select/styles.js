import styled from 'styled-components/native';

export const Label = styled.Text`
  color: #555;
  font-size: 16px;
  padding: 10px 0 10px 20px;
`;

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const ComboBox = styled.TouchableOpacity`
  flex: 1;
  background-color: #FFFFFF;
  color: #7A7A80;
  margin: 0 20px;
  padding: 10px 15px;
  border-radius: 8px;
  border-color: #000;
  border-width: 1px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-bottom-color: #DDD;
  border-bottom-width: 1px;
`;

export const SelectTitle = styled.Text`
  color: #555;
  font-size: 18px;
  width: 90%;
`;

export const ModalTitle = styled.Text`
  font-size: 18px;
  color: #555;
`;

export const ModalClose = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: blue;
`;