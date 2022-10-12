import React from 'react';

import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function ScreenA() {
    const navigate = useNavigation();

  return (
    <View style={{ backgroundColor: 'red', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Screen A</Text>
        <Button 
            title='Navegar para tela B'
            onPress={() => navigate.navigate('screenB', { name: "Senneca" })}
        />
    </View>
  );
}
