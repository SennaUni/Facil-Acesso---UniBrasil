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
import { OptionSelect } from '../../Basics/OptionSelect';
import { useToast } from '../../../hooks/toast';
import { useAuth } from '../../../hooks/auth';

import { Container, ErrorContainer, Error } from './styles';

const { width } = Dimensions.get('window');

export function Form() {
  const formRef = useRef(null)

  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [select, setSelect] = useState('');
  const [error, setError] = useState(false);

  const { addToast } = useToast();
  const { dataAuth } = useAuth();

  async function handleFirebaseUpdateUser({ email, name, phoneNumber }) { 
    firestore()
      .collection('users')
      .doc(dataAuth.uid)
      .update({
        name,
        email,
        phoneNumber,
        accessibility: select.value,
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

      if (!select) {
        setError(true);

        await schema.validate(data, { abortEarly: false });

        return;
      } else {
        setError(false);
      }

      await schema.validate(data, { abortEarly: false });

      await handleFirebaseUpdateUser(data);

    } catch (err) {
      const validationErrors = {};
      
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
    }
  }

  useFocusEffect(useCallback (() => {
    const acessibilityOptions = () => {
      firestore()
        .collection('accessibility')
        .get()
        .then((value) => {
          const data = value.docs.map(doc => {
            return {
              ...doc.data(),
            }
          })
          setOptions(data);
        })
    }

    acessibilityOptions();

    console.log('fora do select', dataAuth)

    formRef.current.setData({
      name: dataAuth.name,
      email: dataAuth.email,
      phoneNumber: dataAuth.phoneNumber,
    })  
  }, [dataAuth]));

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
            autoCapitalize='none'
          />
          <Input
            name="phoneNumber"
            icon="user"
            placeholder="Telefone para contato"
          />
          <Select 
            options={options}
            incialValue={dataAuth.accessibility}
            icon="handshake-o"
            placeholder="Defina a acessibilidade"
            header='Selecione sua acessibilidade'
            label="Usuario"
            OptionComponent={OptionSelect}
            onChange={setSelect}
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