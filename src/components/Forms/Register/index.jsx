import React, { useRef } from 'react';
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

  async function handleUserRegister(data) { 
    console.log(data)

    const { email, password } = data;

    // CRIAR AUTENTICAÇÃO DE USUARIO - EMAIL E SENHA
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => Alert.alert("Conta", "Cadastrado com sucesso!"))
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
          onPress={() => formRef.current.submitForm()}
        />
      </Unform>
    </Container>
  )
}