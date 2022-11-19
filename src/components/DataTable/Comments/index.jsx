import React from 'react';

import { FlatList } from 'react-native';

import { Card } from '../../Card';

import { Container} from './styles';

export function DataTable({ data }) {
  return (
    <Container>
      <FlatList 
        data={data}
        renderItem={({item}) => <Card item={item}/>}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => console.log('vazio')}
      />
    </Container>
  )
}