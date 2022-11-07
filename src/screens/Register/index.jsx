import React from 'react';

import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements'

import { Header } from '../../components/Header';
import { Form } from '../../components/Forms/Register';

import { Container, Content,FormView, HeaderTitle } from './styles';

export function Register() {
  const navigate = useNavigation();
  const height = useHeaderHeight()

  return (
    <Container>
      <Content colors={[ '#6C33A3', '#8241B8' ]}>
        <HeaderTitle>
          <Header 
             title='Crie sua conta'
             subTitle='Faça seu cadastro de forma rápida e fácil'
             color='#FFF'
          />
        </HeaderTitle>
        <FormView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Form />
          </TouchableWithoutFeedback>
        </FormView>
      </Content>
    </Container>
  );
}
