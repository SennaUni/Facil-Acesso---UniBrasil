import React from 'react';

import { View, StyleSheet } from 'react-native';

import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

import { Container, Header, HeaderImage, HeaderText, DrawerOptions, Footer, FooterButtons, FooterText } from './styles';

export function CustomDrawer( props ) {
  return (
     <Container colors={[ '#8241B8', '#6C33A3' ]}>
      <DrawerContentScrollView 
        // contentContainerStyle={{}}
        {...props} 
      >
        <Header>
          <View>
            <HeaderImage
              
            />
            <HeaderText>Senninha</HeaderText>
          </View>
        </Header>
        <DrawerOptions>
          <DrawerItemList 
            {...props} 
          />
        </DrawerOptions>
      </DrawerContentScrollView>
      <Footer>
        <FooterButtons>
          <FontAwesome 
            name="gear" 
            size={22} 
            color='#FFF' 
            style={{ marginRight: 10 }}
          />
          <FooterText>Opções</FooterText>
        </FooterButtons>
        <FooterButtons>
          <MaterialIcons 
            name="logout" 
            size={22} 
            color='#FFF' 
            style={{ marginRight: 10 }} 
          />
          <FooterText>Sair</FooterText>
        </FooterButtons>
      </Footer>
    </Container>
  )
};

const styles = StyleSheet.create({
  containerImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: '#000',
  },
});