import React from 'react';

import { Container, Title } from './styles';

export function Buttom({ title, ...rest }) {
  return (
    <Container {...rest} >
        <Title>{title}</Title>
    </Container>
  );
}