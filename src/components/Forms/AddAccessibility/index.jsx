import React, { useRef, useState } from 'react';

import { KeyboardAvoidingView, View, Dimensions } from 'react-native';

import { Form as Unform } from '@unform/mobile';

import * as Yup from 'yup';
import { schema } from './schema';

import { Buttom } from '../../Basics/Buttom';
import { Input } from '../../Basics/Input';
import { ArrowButtom } from '../../Basics/ArrowButtom';
import { Header } from '../../Header';
import { useToast } from '../../../hooks/toast';

import { Container } from './styles';

const { height, width } = Dimensions.get('window');

export function Form() {
  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  async function handleAccessibilityRegister(data) {
    try {
      formRef.current.setErrors({});

      await schema.validate(data, { abortEarly: false });

      console.log(data)
    } catch (err) {
      const validationErrors = {};
      
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
        console.log(validationErrors);
      }
    }
  }

  return (
    <Container>
      <View
        style={{
          position: 'absolute',
          top: -30,
          left: width - 120,
        }}
      >
        <ArrowButtom
          loading={loading}
          gradient={[ '#A88BEB', '#8241B8' ]}
          onPress={() => formRef.current.submitForm()}
        />
      </View>

      <Header 
        title='Acessibilidades presentes'
      />

      <KeyboardAvoidingView behavior="position" enabled>
        <Unform ref={formRef} onSubmit={handleAccessibilityRegister}>
          <Input
            name="category"
            icon="lock"
            placeholder="PRECISA SER UM SELECT"
          />
          <Input
            name="accessibilityIcon"
            icon="lock"
            placeholder="PRECISA SER UM SELECT"
          />
          <Input
            name="accessiblity"
            icon="user"
            placeholder="VER SE EXISTE TEXT AREA"
          />

          <Buttom
            title="Cadastrar"
            onPress={() => formRef.current.submitForm()}
          />
        </Unform>
      </KeyboardAvoidingView>
    </Container>
  )
}