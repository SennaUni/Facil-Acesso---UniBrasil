import React from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { Container } from './styles';

export function Card({item}) { console.log(item)
  return (
    <Container>
      <View style={{backgroundColor : '#000', height : 70, width: 70, borderRadius: 50, position : 'absolute', top : -30, left : 15}}></View>
      <View>
        <Text style={styles.titulo}>{item.estabelecimento || 'Sem nome definido'} </Text>
      </View>
      <View style={{flexDirection : 'row', justifyContent: 'space-between', paddingHorizontal : 10, paddingVertical: 15}}>
        <View
          style={{flexDirection : 'row', alignItems: 'center', maxWidth: 270}}
        >
          <FontAwesome 
            name="map-marker" 
            size={24} 
            color="black" 
            style={{ color: 'blue', marginRight : 5}} 
          />
          <Text>{item.endereco || 'Sem endereço cadastrado'}</Text>
        </View>
        <View style={{paddingLeft : 15 }} >
          <TouchableOpacity>
            <MaterialCommunityIcons 
              name="heart-plus-outline" 
              size={24} 
              color="black" 
              style={{ color: 'blue', padding: 5 }} 
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons 
              name="star-plus" 
              size={24} 
              color="black" 
              style={{ color: 'blue', padding: 5 }} 
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.botao}>
          <Text>Mais detalhes</Text>
        </TouchableOpacity>
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  titulo : {
    textAlign : 'center',
    fontSize : 22,
    paddingTop : 25
  },
  botao : {
    alignItems : 'center',
    backgroundColor : 'red',
    borderRadius : 15,
    padding : 10,
  }
});