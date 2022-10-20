import React, { useRef, useState } from 'react';
import { Form as Unform } from '@unform/mobile';
import auth from '@react-native-firebase/auth';

import * as Yup from 'yup';
import { schema } from './schema';

import { Alert } from 'react-native';

import { Buttom } from '../../Basics/Buttom';
import { Input } from '../../Basics/Input';

import { Container } from './styles';

import { useToast } from '../../../hooks/toast';

export function Form() {
  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  async function handleUserLogin(data) {

    const teste = {
      type: 'error', 
      title: 'Favor respeitar as validações', 
      description: 'Todos os campos são obrigatórios',
    }

    addToast(teste);

    // setLoading(true);

    // try {
    //   formRef.current.setErrors({});

    //   await schema.validate(data, { abortEarly: false });

    //   const { email, password } = data;

    //   auth()
    //     .signInWithEmailAndPassword(email, password)
    //     .then(() => Alert.alert("Sucesso", "Logado com sucesso!"))
    //     .catch((error) => console.log(error))

    // } catch (err) {
    //   const validationErrors = {};
      
    //   if (err instanceof Yup.ValidationError) {
    //     err.inner.forEach(error => {
    //       validationErrors[error.path] = error.message;
    //     });

    //     formRef.current.setErrors(validationErrors);
    //     console.log(validationErrors);
    //   }
    // } finally {
    //   setLoading(false);
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