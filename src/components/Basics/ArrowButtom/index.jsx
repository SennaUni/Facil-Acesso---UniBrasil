import React from 'react';

import { ActivityIndicator, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { Container, Gradient } from './styles';

export function ArrowButtom({ loading = false, gradient, ...rest }) {
  return (
    <>
      { loading ? (
        <Container {...rest} disabled={true}>
          <Gradient loading={loading} colors={gradient}>
            <ActivityIndicator
              size='small'
              color='#FFF'
            />
          </Gradient>
        </Container>
      ) : (
        <Container {...rest} >
          <Gradient loading={loading} colors={gradient}>
            <Feather
              name={'arrow-right'}
              size={40}
              color={'#FFF'}
            />
          </Gradient>
        </Container>
      )}
    </>
  );
}