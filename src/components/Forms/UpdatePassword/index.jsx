import React, { useRef, useEffect, useState } from 'react';

import { KeyboardAvoidingView, View, Dimensions } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { Form as Unform } from '@unform/mobile';

import auth from '@react-native-firebase/auth';

import * as Yup from 'yup';
import { schema } from './schema';

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

  async function handleFirebaseUpdatePassword({ oldPassword, newPassword }) {
    auth()
      .signInWithEmailAndPassword(user.email, oldPassword)
      .then(() => {
        
        user.updatePassword(newPassword)
          
        const success = {
          type: 'success', 
          title: 'Senha atualizada com sucesso', 
          description: 'Tome cuidado na proxima vez',
        }

        addToast(success);

      })
      .catch(() => {
        
        const error = {
          type: 'error', 
          title: 'Ocorreu um erro', 
          description: 'A senha informada esta inválida',
        }

        addToast(error);

      })
      .finally(() => setLoading(false));
  }

  async function handleUpdatePassword(data) {
    try {
      formRef.current.setErrors({});

      await schema.validate(data, { abortEarly: false });

      await handleFirebaseUpdatePassword(data);

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

  useFocusEffect(() => {
    // PARA DESLOGAR
    // auth()
    //   .signOut()
    //   .then(() => {
    //     const success = {
    //       type: 'success', 
    //       title: 'LogOff realizdo com sucesso', 
    //       description: 'Até mais',
    //     }
    //     addToast(success);

    //     navigate.navigate('principal')
    //   })
    //   .catch(() => {
    //     const error = {
    //       type: 'error', 
    //       title: 'Falha na operação', 
    //       description: 'Não foi possível realizar o LogOff',
    //     }
    //     addToast(error);
    //   })

    const subscriber = auth().onAuthStateChanged(setUser);

    // const userLogin = auth().currentUser; 

    // console.log(userLogin)

    if (user) {
      console.log(user.email);
      // user.updatePassword('123789');
    }

    formRef.current.setData({
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    })

    return subscriber;
  });

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