import React from 'react';

import { View, Text, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';

export function ScreenB() {
  const route = useRoute();
  // const { name } = route.params;

  return (
    <View style={{ backgroundColor: 'blue', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <Text>Bem vindo, {name || 'convidado'} a tela B</Text> */}
        <Text>Bem vindo, a tela B</Text>
    </View>
  );
}
