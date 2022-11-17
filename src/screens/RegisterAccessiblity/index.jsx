import React, { useState } from 'react';

import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import { Header } from '../../components/Header';
import { Form } from '../../components/Forms/AddAccessibility';

import { Container, Content,FormView, HeaderTitle } from './styles';

export function RegisterAccessibility() {
  const [pageForm, setPageForm] = useState(1);

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
            <Form />
          </TouchableWithoutFeedback>
        </FormView>
      </Content>
    </Container>
  );
}