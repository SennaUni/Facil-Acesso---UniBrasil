import React, { useState, useRef, useCallback } from 'react';

import { KeyboardAvoidingView, View, Dimensions } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { Form as Unform } from '@unform/mobile';

import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';

import * as Yup from 'yup';
import { schema } from './schema';

import { Input } from '../../Basics/Input';
import { ArrowButtom } from '../../Basics/ArrowButtom';
import { Header } from '../../Header';
import { useToast } from '../../../hooks/toast';

import { Container } from './styles';

const { height, width } = Dimensions.get('window');

export function Form() {
  const formRef = useRef(null)

  const [user, setUser] = useState(null);
  const [dataUser, setDataUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  async function handleFirebaseUpdateUser({ accessibility, email, name, phoneNumber }) {
    firestore()
      .collection('users')
      .doc(dataUser.id)
      .update({
        name,
        email,
        phoneNumber,
        accessibility,
      })
      .then(() => {

        const success = {
          type: 'success', 
          title: 'Usuário atualizado com sucesso', 
          description: 'Tome cuidado na proxima vez',
        }

        addToast(success);

      })
      .catch(() => {
        
        const error = {
          type: 'error', 
          title: 'Ocorreu um erro', 
          description: 'Erro ao atualizar usuário',
        }

        addToast(error);

      })
      .finally(() => setLoading(false));
  }

  async function handleUpdateUser(data) {
    try {
      console.log(data)
      formRef.current.setErrors({});

      await schema.validate(data, { abortEarly: false });

      await handleFirebaseUpdateUser(data);

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

  useFocusEffect(useCallback (() => {
    auth()
      .onAuthStateChanged(setUser);

    // console.log(user);

    async function getUserData() { 
      if (!user) return; 

      const userToEdit = await firestore()
        .collection('users')
        .where('id', '==', user.uid)
        .get();

      userToEdit.forEach((value) => {
        setDataUser(value)
        return;
      })
    }

    getUserData();
    
    console.log(dataUser.id)

    async function setUserData() { 
      if (!dataUser) return; 

      const { name, email, phoneNumber, accessibility } = dataUser;

      formRef.current.setData({
        name,
        email,
        phoneNumber,
        accessibility,
      })
    }

    setUserData();

  }, [user]));

  return (
    <Container>
      <KeyboardAvoidingView behavior="position" enabled>
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
            title='Alterar meus dados'
          />
        <Unform ref={formRef} onSubmit={handleUpdateUser}>
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
        </Unform>
      </KeyboardAvoidingView>
    </Container>
  )
}