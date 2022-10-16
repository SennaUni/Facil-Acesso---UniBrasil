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

  async function handleUserLogin(data) {
    console.log(data);

    const { email, password } = data;

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => Alert.alert("Sucesso", "Logado com sucesso!"))
      .catch((error) => console.log(error))

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
     <Unform ref={formRef} onSubmit={handleUserLogin}>
        <Input
          name="email"
          icon="mail"
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize='none' // primeira letra começa como minuscula
        />
        <Input
          name="password"
          icon="lock"
          placeholder="Senha"
          secureTextEntry
        />
        <Buttom
          title="Cadastrar"
          onPress={() => formRef.current.submitForm()}
        />
      </Unform>
    </Container>
  )
}