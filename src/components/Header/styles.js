import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  margin-top: 20px;
  padding: 5px 24px;
`;

export const Title = styled.Text`
  font-size: 40px;
  font-weight: bold;

  color: ${ props => props.color ? props.color : '#47474D' };
`;

export const Subtitle = styled.Text`
  font-size: 15px;
  line-height: 25px;  

  color: ${ props => props.color ? props.color : '#47474D' };

`;