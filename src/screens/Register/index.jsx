import React from 'react';

import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements'

import { Buttom } from '../../components/Basics/Buttom';
import { Header } from '../../components/Header';
import { Form } from '../../components/Forms/Register';

import { Container, Content } from './styles';

export function Register() {
  const navigate = useNavigation();
  const height = useHeaderHeight()

  return (
    <Container>
      <Content>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView 
            behavior="position" 
            keyboardVerticalOffset={30} 
            style={{ flex: 1 }}
            enabled
          >
            <>
              <Header 
                title='Crie sua conta'
                subTitle='Faça seu cadastro de forma rápida e fácil'
              />
              <Form />
            </>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Content>
    </Container>
  );
}
