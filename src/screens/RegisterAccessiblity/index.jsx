import React from 'react';

import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

import { Header } from '../../components/Header';
import { Form } from '../../components/Forms/AddAccessibility';

import { Container } from './styles';

export function RegisterAccessibility() {
  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position" enabled>
          <>
            <Header 
              title='Definir suas acessibilidades'
              subTitle='Insira as acessibilidades presentes no estalecimento'
            />
            <Form />
          </>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
}