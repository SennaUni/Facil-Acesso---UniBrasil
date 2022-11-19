import React, { useState } from 'react';

import { Keyboard, TouchableWithoutFeedback, Text } from 'react-native';

import { Header } from '../../components/Header';

import { Container, Content,FormView, HeaderTitle } from './styles';

export function Perfil() {

  return (
    <Container>
       <Content colors={[ '#6C33A3', '#8241B8' ]}>
        <HeaderTitle>
          <Header 
             title='Definir suas acessibilidades'
             subTitle='Insira as acessibilidades presentes no estalecimento'
             color='#FFF'
          />
        </HeaderTitle>
        <FormView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {/* <Form /> */}
            <Text>Meu perfil</Text>
          </TouchableWithoutFeedback>
        </FormView>
      </Content>
    </Container>
  );
}