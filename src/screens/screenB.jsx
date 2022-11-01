import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export function ScreenB() {
  const navigate = useNavigation();
  const route = useRoute(); // para parametros
  // const { name } = route.params;

  return (
    <View style={{ backgroundColor: 'blue', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <Text>Bem vindo, {name || 'convidado'} a tela B</Text> */}
        <Text>Bem vindo, a tela B</Text>
        <TouchableOpacity onPress={() => navigate.openDrawer()} style={{ backgroundColor: '#FFF', padding: 15 }}>
          <Text>Abrir menu lateral</Text>
        </TouchableOpacity>
    </View>
  );
}
