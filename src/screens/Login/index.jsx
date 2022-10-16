import React from 'react';

import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

import { Header } from '../../components/Header';
import { Form } from '../../components/Forms/Login';

import { Container, Content } from './styles';

export function Login() {
  return (
    <Container>
      <Content>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView behavior="position" enabled>
            <>
              <Header 
                title='Realizar login'
                subTitle='Faça seu login informando suas credenciais abaixo'
              />
              <Form />
            </>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Content>
    </Container>
  );
}