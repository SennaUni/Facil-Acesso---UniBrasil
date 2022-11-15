import React, { useState, useRef, useCallback } from 'react';

import { KeyboardAvoidingView, View, Dimensions } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { Form as Unform } from '@unform/mobile';

import { Feather } from '@expo/vector-icons';

import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';

import * as Yup from 'yup';
import { schema } from './schema';

import { Input } from '../../Basics/Input';
import { ArrowButtom } from '../../Basics/ArrowButtom';
import { Select } from '../../Basics/Select';
import { Header } from '../../Header';
import { OptionSelectAccessibility } from '../../Basics/OptionSelectAccessibility';
import { useToast } from '../../../hooks/toast';
import { useAuth } from '../../../hooks/auth';

import { Container, ErrorContainer, Error } from './styles';

const { height, width } = Dimensions.get('window');

export function Form() {
  const formRef = useRef(null)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);

  const { addToast } = useToast();
  const { dataAuth } = useAuth();

  const Lista = [
    {
      id: '1',
      avatarUrl: 'http://i.pravatar.cc/300',
      name: 'Jhon Doe',
      callType: 'video',
      data: '31/01/2021',
      status: 'Perdida',
      stories: [
        {
          id: '1',
          lido: true,
        },
        {
          id: '2',
          lido: false,
        }
      ]
    },
    {
      id: '2',
      avatarUrl: 'http://i.pravatar.cc/300',
      name: 'Jhon Miranda',
      callType: 'video',
      data: '31/01/2021',
      status: 'Perdida',
      stories: [
        {
          id: '3',
          lido: true,
        },
        {
          id: '4',
          lido: false,
        }
      ]
    }
  ];

  function onChange(value) {
    console.log(value)
  }

  async function handleFirebaseUpdateUser({ email, name, phoneNumber }) {
    firestore()
      .collection('users')
      .doc(dataAuth.uid)
      .update({
        name,
        email,
        phoneNumber,
        accessibility: '',
      })
      .then(() => {
        const user = auth().currentUser;

        user.updateEmail(email);

        const success = {
          type: 'success', 
          title: 'Usuário atualizado com sucesso', 
          description: 'Tome cuidado na proxima vez',
        }

        addToast(success);

      })
      .catch((err) => {
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
      formRef.current.setErrors({});

      await schema.validate(data, { abortEarly: false });

      await handleFirebaseUpdateUser(data);

    } catch (err) { console.log(err)
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
    formRef.current.setData({
      name: dataAuth.name,
      email: dataAuth.email,
      phoneNumber: dataAuth.phoneNumber,
      accessibility: dataAuth.accessibility,
    })
  }, []));

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
          {/* <Input
            name="accessibility"
            icon="lock"
            placeholder="PRECISA SER UM SELECT"
          /> */}

        <Select 
          options={Lista}
          icon="mail"
          name="sennaSelect"
          text="Selecione uma opção "
          label="Usuario"
          OptionComponent={OptionSelectAccessibility}
          onChange={onChange}
        />

        { error && (
          <ErrorContainer>
            <Feather 
              name="alert-triangle" 
              size={24} 
              color="#DC1637"
            />
              <Error> Selecione uma opção </Error>
          </ErrorContainer>
        )}

        </Unform>
      </KeyboardAvoidingView>
    </Container>
  )
}