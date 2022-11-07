import React from 'react';

import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Select } from '../components/Basics/Select';
import { OptionSelect } from '../components/Basics/OptionSelect';

export function ScreenA() {
    const navigate = useNavigation();

    const Lista = [
      {
        id: '1',
        avatarUrl: 'http://i.pravatar.cc/300',
        name: 'Jhon Doe',
        callType: 'video',
        data: '31/01/2021',
        status: 'Perdida',
        stories: [
          {
            id: '1',
            lido: true,
          },
          {
            id: '2',
            lido: false,
          }
        ]
      },
      {
        id: '2',
        avatarUrl: 'http://i.pravatar.cc/300',
        name: 'Jhon Miranda',
        callType: 'video',
        data: '31/01/2021',
        status: 'Perdida',
        stories: [
          {
            id: '3',
            lido: true,
          },
          {
            id: '4',
            lido: false,
          }
        ]
      }
    ];

  return (
    <View style={{ backgroundColor: 'red', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <Text>Screen A</Text>
        <Button 
            title='Navegar para tela B'
            onPress={() => navigate.navigate('screenB', { name: "Senneca" })}
        /> */}
        <Select 
          options={Lista}
          name="senna_select"
          text="Selecione uma opção "
          label="Usuario"
          OptionComponent={OptionSelect}
        />
    </View>
  );
}
