import React from 'react';
import { Container, Subtitle, Title } from './styles';

export function Header({ title, subTitle }) {
  return (
    <Container>
      <Title>
        {title}
      </Title>
      <Subtitle>
        {subTitle}
      </Subtitle>
    </Container>
  )
}