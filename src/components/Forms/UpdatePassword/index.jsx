import React, { useRef, useEffect, useState } from 'react';

import { KeyboardAvoidingView, View, Dimensions } from 'react-native';

import { Form as Unform } from '@unform/mobile';

import auth from '@react-native-firebase/auth';

import * as Yup from 'yup';
import { schema } from './schema';

import { Buttom } from '../../Basics/Buttom';
import { PasswordInput } from '../../Basics/PasswordInput';
import { ArrowButtom } from '../../Basics/ArrowButtom';
import { Header } from '../../Header';
import { useToast } from '../../../hooks/toast';

import { Container } from './styles';

const { height, width } = Dimensions.get('window');

export function Form() {
  const formRef = useRef(null)

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

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
          title='Alterar senha'
        />
        <Unform ref={formRef} onSubmit={handleUpdatePassword}>
          <PasswordInput
            name="oldPassword"
            icon="lock"
            placeholder="Senha atual"
          />
          <PasswordInput
            name="newPassword"
            icon="lock"
            placeholder="Nova senha"
          />
          <PasswordInput
            name="newPasswordConfirm"
            icon="lock"
            placeholder="Confirmar nova senha"
          />
        </Unform>
      </KeyboardAvoidingView>
    </Container>
  )
}