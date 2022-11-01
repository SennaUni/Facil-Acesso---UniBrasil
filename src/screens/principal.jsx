import React from 'react';

import { View, Text, TouchableOpacity, ScrollView, FlatList , SafeAreaView, TextInput} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export function Principal() {
  const navigate = useNavigation();
  const route = useRoute(); // para parametros
  // const { name } = route.params;

  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const data = [
    {id: 1, label:'Guilherme'},
    {id: 2, label:'Gabriel'},
    {id: 3, label:'Renan'},
    {id: 4, label:'Renan'},
    {id: 5, label:'Renan'},
    {id: 6, label:'Renan'},
    {id: 7, label:'Renan'},
    {id: 8, label:'Renan'}

  ]

  function loopTest() {
    return(
      <View 
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 5,
        }}
      >
        <View style={{
          margin: 10,
          width: 80,
          height: 80,
          borderRadius: 50,
          backgroundColor: '#FFF'
        }}></View>
        <Text
          style={
            {
              color : '#FFF',
              fontWeight: 'bold',
              fontSize: 16
            }
          }
        >  
          TESTE
        </Text>
      </View>
    )
  }

  const renderItem = ({ item }) => (
    loopTest()
  )

  return (
    <View style={{ backgroundColor: 'blue', flex: 1 }}>
       <View>
          <View
            style={{ backgroundColor: 'purple'}}
          >
          <Text
            style={{
              marginVertical: 5,
              marginLeft: 35,
              fontSize : 23,
              color : '#FFF'
            }}
          >
            Estabelecimento
          </Text>
          </View>
          <ScrollView 
            horizontal={true}
            style={{ backgroundColor: 'red'}}
          >
           { list.map(() => loopTest())}
          </ScrollView>
       </View>
       <View
        style={{ backgroundColor: 'purple'}}
       >
         <Text
            style={{
              marginVertical: 5,
              marginLeft: 35,
              fontSize : 23,
              color : '#FFF'
            }}
          >
            Acessibilidade
          </Text>
       </View>
       <SafeAreaView>
          <FlatList 
            data={data}
            renderItem={loopTest}
            keyExtractor={item => item.id}
            horizontal
            style={{ backgroundColor: 'red'}}
          />
       </SafeAreaView>
       <View style={{
         justifyContent: 'center',
         alignItems: 'center',
         flexDirection: 'row'

       }}>
         <Text
          style={{
            marginVertical : 12,
            textAlign : 'center',
            color : '#FFF',
            fontSize : 28,
            fontWeight: 'bold',
          }}
         >Comentarios</Text>
         <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
            backgroundColor: '#FFF',
            marginLeft: 8,
          }}
         >
          <Text
           style={{
            color : '#000',
            fontSize : 28,
            fontWeight: 'bold',
            textAlign: 'center',
            justifyContent: 'center',
           }}
          >
            +
          </Text>
         </TouchableOpacity>
       </View>
    </View>
  );
}
