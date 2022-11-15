import React, { useRef, useState } from 'react';

import { View, Dimensions } from 'react-native';

import { Form as Unform } from '@unform/mobile';

import { useFocusEffect } from '@react-navigation/native';

import auth from '@react-native-firebase/auth'

import firestore from '@react-native-firebase/firestore';

import * as Yup from 'yup';
import { schema } from './schema';

import { Input } from '../../Basics/Input';
import { PasswordInput } from '../../Basics/PasswordInput';
import { ArrowButtom } from '../../Basics/ArrowButtom';
import { Header } from '../../Header';
import { useToast } from '../../../hooks/toast';

import { Container } from './styles';

const { width } = Dimensions.get('window');

export function Form() {
  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  async function handleFirestoreUser({ name, email, phoneNumber, accessibility, password }) {
    auth()
    .createUserWithEmailAndPassword(email, password)
      .then(async (data) => { 
       
        firestore()
          .collection('users')
          .doc(data.user.uid)
          .set({
            name,
            email,
            phoneNumber,
            accessibility,
            password,
            create_at: firestore.FieldValue.serverTimestamp()
          })

        const success = {
          type: 'success', 
          title: 'Cadastro realizado com sucesso', 
          description: 'Seja bem vindo ao Fácil Acesso',
        }
        addToast(success);

        // navigate.navigate('login');
      })
      .catch(() => {
        const error = {
          type: 'error', 
          title: 'Ocorreu um erro', 
          description: 'Não foi possível cadastrar novo usuário',
        }
        addToast(error);
      })
      .finally(() => setLoading(false));
  }

  async function handleUserRegister(data) { 
    setLoading(true);
    
    try {
      formRef.current.setErrors({});
      
      await schema.validate(data, { abortEarly: false });
      
      await handleFirestoreUser(data);

    } catch (err) {
      const validationErrors = {};
      
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      } 

      setLoading(false);
    } 
  }

  useFocusEffect(() => {

    formRef.current.setData({
      name: '',
      email: '',
      phoneNumber: '',
      accessibility: '',
      password: '',
      passwordConfirm: '',
    })

  })

  return (
    <Container>
      {/* <KeyboardAvoidingView behavior="position" enabled> */}
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
          title='Criar usuário'
        />

        <Unform ref={formRef} onSubmit={handleUserRegister} style={{ marginVertical: 0 }}>
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
            icon="phone"
            placeholder="Telefone para contato"
          />
          <Input
            name="accessibility"
            icon="award"
            placeholder="PRECISA SER UM SELECT"
          />
          <PasswordInput
            name="password"
            icon="lock"
            placeholder="Senha"
          />
          <PasswordInput
            name="passwordConfirm"
            icon="lock"
            placeholder="Confirme a senha"
          />
        </Unform>
      {/* </KeyboardAvoidingView> */}
    </Container>
  )
}