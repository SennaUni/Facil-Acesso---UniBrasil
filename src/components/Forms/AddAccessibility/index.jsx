import React, { useRef } from 'react';
import { Form as Unform } from '@unform/mobile';

import * as Yup from 'yup';
import { schema } from './schema';

import { Alert } from 'react-native';

import { Buttom } from '../../Basics/Buttom';
import { Input } from '../../Basics/Input';

import { Container } from './styles';

export function Form() {
  const formRef = useRef(null)

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
    </Container>
  )
}