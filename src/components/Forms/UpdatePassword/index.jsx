import React, { useRef, useEffect, useState } from 'react';
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

  const [user, setUser] = useState(null);

  async function handleUpdatePassword(data) {
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

  useEffect(() => {
    // PARA DESLOGAR
    // auth().signOut();

    const subscriber = auth().onAuthStateChanged(setUser);

    if (user) console.log(user);

    return subscriber;
  }, []);

  return (
    <Container>
     <Unform ref={formRef} onSubmit={handleUpdatePassword}>
        <Input
          name="oldPassword"
          icon="lock"
          placeholder="Senha"
          secureTextEntry
        />
        <Input
          name="newPassword"
          icon="lock"
          placeholder="Senha"
          secureTextEntry
        />
        <Input
          name="newPasswordConfirm"
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