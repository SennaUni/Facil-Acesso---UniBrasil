import React, { useRef } from 'react';
import { Form as Unform } from '@unform/mobile';
import auth from '@react-native-firebase/auth';

import * as Yup from 'yup';
import { schema } from './schema';

import { Alert } from 'react-native';

import { Buttom } from '../../Basics/Buttom';
import { Input } from '../../Basics/Input';

import { Container } from './styles';

export function Form() {
  const formRef = useRef(null)

  async function handleForgotPassword(data) { console.log(data)
    const { email } = data;

    auth()
      .sendPasswordResetEmail(email)
      .then(() => Alert.alert("Redefinição de senha", "Foi enviado um e-mail para você"))
      .catch((error) => console.log(error));

    // try {
    //   formRef.current.setErrors({});

    //   await schema.validate(data, { abortEarly: false });

    //   console.log(data)
    // } catch (err) {
    //   const validationErrors = {};
      
    //   if (err instanceof Yup.ValidationError) {
    //     err.inner.forEach(error => {
    //       validationErrors[error.path] = error.message;
    //     });

    //     formRef.current.setErrors(validationErrors);
    //     console.log(validationErrors);
    //   }
    // }
  }

  return (
    <Container>
      <Unform ref={formRef} onSubmit={handleForgotPassword}>
        <Input
          name="email"
          icon="mail"
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize='none' // primeira letra começa como minuscula
        />
        <Buttom
          title="Editar"
          onPress={() => formRef.current.submitForm()}
        />
      </Unform>
    </Container>
  )
}