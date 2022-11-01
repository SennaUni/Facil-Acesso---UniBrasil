import React from 'react';

import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

import { FontAwesome } from '@expo/vector-icons';

import { Container } from './styles';

export function CustomDrawer( props ) {
  return (
    <Container>
      <DrawerContentScrollView 
        contentContainerStyle={{}}
        {...props} 
      >
        <View style={styles.containerHeader}>
          <View style={styles.containerContent}>
            <View style={styles.containerImage}/>
            <Text style={styles.containerText}>Senninha</Text>
          </View>
        </View>
        <View style={styles.drawerOptions}>
          <DrawerItemList 
            {...props} 
          />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopColor: '#CCC', borderTopWidth: 1 }}>
        <TouchableOpacity
          style={{ paddingVertical: 15, flexDirection: 'row', alignItems: 'center' }}
        >
          <FontAwesome name="gear" size={22} color='black' style={{ marginRight: 10 }} />
          <Text style={{ fontSize: 15 }}>Opções</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingVertical: 5, flexDirection: 'row', alignItems: 'center' }}
        >
          <FontAwesome name="close" size={22} color='black' style={{ marginRight: 10 }} />
          <Text style={{ fontSize: 15 }}>Sair</Text>
        </TouchableOpacity>
      </View>
    </Container>
  )
};

const styles = StyleSheet.create({
  containerHeader: {
    backgroundColor: '#FFF',
    padding: 10,
    borderBottomColor: 'red',
    borderBottomWidth: 1,
  },
  containerContent: {
    
  },
  containerImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: '#000',
  },
  containerText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingLeft: 5,
  },
  drawerOptions: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 10,
  }
});