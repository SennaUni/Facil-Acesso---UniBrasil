import React from 'react';
import { Container, Subtitle, Title } from './styles';

export function Header({ title, subTitle, color }) {
  return (
    <Container>
      <Title
        color={color}
      >
        {title}
      </Title>
      {subTitle && (
      <Subtitle
        color={color}
      >
        {subTitle}
      </Subtitle>
      )}
    </Container>
  )
}