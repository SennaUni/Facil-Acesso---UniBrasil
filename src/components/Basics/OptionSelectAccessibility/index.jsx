import React from 'react';

import { FontAwesome } from '@expo/vector-icons';

import { Container, Picture, Label } from './styles';

export function OptionSelectAccessibility({ item, selectedValue, onPress }) {

  return (
    <Container 
      backGround={item.id === selectedValue?.id ? '#8241B8' : '#FFF'}
      onPress={onPress}
    >
      <Picture 
        source={{
          uri: item.avatarUrl,
        }}
      />
      <Label 
        color={item.id === selectedValue?.id ? '#FFF' : '#555'}
      >
        {item.name}
      </Label>
      {/* { item.id === selectedValue?.id && (
        <FontAwesome
        name='check-square'
        size={22}
        color={'green'}
      />
      )} */}
    </Container>
  );
}
