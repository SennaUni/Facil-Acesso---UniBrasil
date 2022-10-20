import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Container, Title } from './styles';

export function Buttom({ title, loading = false, ...rest }) {
  return (
    <>
      { loading ? (
        <Container {...rest} loading={true} disabled={true}>
          <ActivityIndicator
            size='small'
            color='#FFF'
          />
          <Title>Loading</Title>
        </Container>
      ) : (
        <Container {...rest} >
          <Title>{title}</Title>
        </Container>
      )}
    </>
  );
}