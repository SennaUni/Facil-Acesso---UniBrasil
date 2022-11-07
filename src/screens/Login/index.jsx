import React from 'react';

import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Text, View } from 'react-native';

import { Header } from '../../components/Header';
import { Form } from '../../components/Forms/Login';

import { Container, Content, FormView, HeaderTitle } from './styles';

export function Login() {
  return (
    <Container>
      <Content colors={[ '#6C33A3', '#8241B8' ]}>
        <HeaderTitle>
          <Header 
            title='Seja bem vindo ao Fácil Acesso'
            color='#EDF2FA'
          />
        </HeaderTitle>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {/* <KeyboardAvoidingView behavior="position" enabled> */}
            <FormView>
              <Form />
            </FormView>
          {/* </KeyboardAvoidingView> */}
        </TouchableWithoutFeedback>
      </Content>
    </Container>
  );
}