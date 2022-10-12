import React from 'react';

import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements'

import { Buttom } from '../../components/Basics/Buttom';
import { Header } from '../../components/Header';
import { Form } from '../../components/Forms/Register';

import { Container } from './styles';

export function Register() {
  const navigate = useNavigation();
  const height = useHeaderHeight()

  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={height + 25} enabled>
          <>
            <Header 
              title='Crie sua conta'
              subTitle='Faça seu cadastro de forma rápida e fácil'
            />
            <Form />
            {/* <Buttom 
              title='Ir para Login'
              onPress={() => navigate.navigate('login')}
            /> */}
          </>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
}
