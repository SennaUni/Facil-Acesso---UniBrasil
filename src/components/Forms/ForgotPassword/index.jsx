import React, { useState, useRef } from 'react';

import { KeyboardAvoidingView, View, Dimensions, Text } from 'react-native';

import { Form as Unform } from '@unform/mobile';

import auth from '@react-native-firebase/auth';

import * as Yup from 'yup';
import { schema } from './schema';

import { Buttom } from '../../Basics/Buttom';
import { Input } from '../../Basics/Input';
import { ArrowButtom } from '../../Basics/ArrowButtom';
import { Header } from '../../Header';
import { useToast } from '../../../hooks/toast';

import { Container } from './styles';

const { height, width } = Dimensions.get('window');

export function Form() {
  const formRef = useRef(null)

  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  async function handleFirebaseChangePassword({ email }) {
    auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          const success = {
            type: 'success', 
            title: 'E-mail enviado com sucesso', 
            description: 'Favor verificar sua caixa de e-mail',
          }
          addToast(success);

          // navigate.navigate('login');
        })
        .catch(() => {
          const error = {
            type: 'error', 
            title: 'Ocorreu um erro', 
            description: 'Não foi possível enviar o e-mail',
          }
          addToast(error);
        })
        .finally(() => setLoading(false));
  }

  async function handleForgotPassword(data) {
    setLoading(true);

    try {
      formRef.current.setErrors({});

      await schema.validate(data, { abortEarly: false });

      await handleFirebaseChangePassword(data);
    } catch (err) {
      const validationErrors = {};
      
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }

      setLoading(false)
    }
  }

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
          title='Alteração de senha'
        />

        <Unform ref={formRef} onSubmit={handleForgotPassword}>
          <Input
            name="email"
            icon="mail"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize='none' // primeira letra começa como minuscula
          />
          {/* <Buttom
            title="Editar"
            onPress={() => formRef.current.submitForm()}
          /> */}
        </Unform>
        <View
          style={{
            backgroundColor: '#A88BEB',
            borderRadius: 20,
            marginTop: 25,
            borderColor: '#8241B8',
            borderWidth: 2,
          }}
        >
          <Text 
            style={{
              textAlign: 'center',
              fontSize: 22,
              color: '#FFF',
              padding: 10,
            }}
          >
            Como funciona?
          </Text>
          <Text
            style={{
              fontSize: 16,
              padding: 10,
              color: '#FFF',
            }}
          >
            Quem sabe utilizar esse local para preencher espaço e colocar um informativo de como funciona essa funcionalidade, como por exemplo
            seŕa enviado para o email informado um link onde será realizado a alteração de senha.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </Container>
  )
}