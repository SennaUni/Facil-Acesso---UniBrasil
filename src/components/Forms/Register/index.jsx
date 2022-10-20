import React, { useRef, useState } from 'react';
import { Form as Unform } from '@unform/mobile';
import auth from '@react-native-firebase/auth'

import * as Yup from 'yup';
import { schema } from './schema';

import { Alert } from 'react-native';

import { Buttom } from '../../Basics/Buttom';
import { Input } from '../../Basics/Input';

import { Container } from './styles';

export function Form() {
  const formRef = useRef(null)

  const [loading, setLoading] = useState(false);

  async function handleUserRegister(data) { 
    try {
      setLoading(true);

      formRef.current.setErrors({});

      await schema.validate(data, { abortEarly: false });

      const { email, password } = data;

      // CRIAR AUTENTICAÇÃO DE USUARIO - EMAIL E SENHA
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => setLoading(false));

    } catch (err) {
      setLoading(false);

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
      <Unform ref={formRef} onSubmit={handleUserRegister}>
        <Input
          name="name"
          icon="user"
          placeholder="Nome"
        />
        <Input
          name="email"
          icon="mail"
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize='none' // primeira letra começa como minuscula
        />
        <Input
          name="phoneNumber"
          icon="user"
          placeholder="Telefone para contato"
        />
        <Input
          name="accessibility"
          icon="lock"
          placeholder="PRECISA SER UM SELECT"
        />
        <Input
          name="password"
          icon="lock"
          placeholder="Senha"
          secureTextEntry
        />
        <Input
          name="passwordConfirm"
          icon="lock"
          placeholder="Confirme a senha"
          secureTextEntry // colocar a bolinha e ocultar senha
        />

        <Buttom
          title="Cadastrar"
          loading={loading}
          onPress={() => formRef.current.submitForm()}
        />
      </Unform>
    </Container>
  )
}