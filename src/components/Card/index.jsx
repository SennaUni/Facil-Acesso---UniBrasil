import React from 'react';

import { View } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import { Container, Icon, Header, Content, Address, AddressText, Buttons, IconButton, ButtonDetails, DeatilsText } from './styles';

export function Card({item}) {
  return (
    <Container
      style={{
        shadowColor: '#8241B8',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 0},
        shadowRadius: 3,
        elevation: 15,
      }}
    >
      <View 
        style={{
          position : 'absolute', 
          top : -20, 
          left : 15,
        }}
      >
        <Icon colors={[ '#A88BEB', '#8241B8' ]}>
          <FontAwesome
            name={item.data.rate.icon}
            size={30}
            color='#FFF'
          />
        </Icon>
      </View>
      <Header>{item.data.name} </Header>
      <Content>
        <Address>
          <FontAwesome 
            name="map-marker" 
            size={25} 
            color="#8241B8"
          />
          <AddressText>
            {item.data.address}
          </AddressText>
        </Address>

        <Buttons>
          <IconButton
            onPress={() => console.log('curti o id: ' + item.id)}
          >
            <FontAwesome 
              name={'heart-o' || 'heart'} 
              size={24} 
              color="#8241B8"
            />
          </IconButton>
          <IconButton
            onPress={() => console.log('favoritei o id: ' + item.id)}
          >
          <FontAwesome 
              name={'star-o' || 'star'} 
              size={24} 
              color="#8241B8"
            />
          </IconButton>
        </Buttons>
      </Content>
      <ButtonDetails>
        <DeatilsText>
          Mais detalhes
        </DeatilsText>
      </ButtonDetails>
    </Container>
  )
}