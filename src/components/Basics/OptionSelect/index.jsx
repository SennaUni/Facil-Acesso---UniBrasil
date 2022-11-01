import React from 'react';

import { FontAwesome } from '@expo/vector-icons';

import { Container, Picture, Label } from './styles';

export function OptionSelect({ item, selectedValue, onPress }) {

  return (
    <Container 
      backGround={item.id === selectedValue?.id ? '#EEE' : '#FFF'}
      onPress={onPress}
    >
      <Picture 
        source={{
          uri: item.avatarUrl,
        }}
      />
      <Label 
        fontWeight={item.id === selectedValue?.id ? 'bold' : 'normal'} 
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
