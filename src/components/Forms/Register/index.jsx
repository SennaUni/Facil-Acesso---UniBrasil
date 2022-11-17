import React, { useRef, useState, useCallback } from 'react';

import { View, Dimensions } from 'react-native';

import { Form as Unform } from '@unform/mobile';

import { useFocusEffect } from '@react-navigation/native';

import auth from '@react-native-firebase/auth'

import firestore from '@react-native-firebase/firestore';

import { Feather } from '@expo/vector-icons';

import * as Yup from 'yup';
import { schema } from './schema';

import { Input } from '../../Basics/Input';
import { PasswordInput } from '../../Basics/PasswordInput';
import { Select } from '../../Basics/Select';
import { OptionSelect } from '../../Basics/OptionSelect';
import { ArrowButtom } from '../../Basics/ArrowButtom';
import { Header } from '../../Header';
import { useToast } from '../../../hooks/toast';

import { Container, ErrorContainer, Error } from './styles';

const { width } = Dimensions.get('window');

export function Form() {
  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [select, setSelect] = useState('');
  const [error, setError] = useState(false);

  const { addToast } = useToast();

  async function handleFirestoreUser({ name, email, phoneNumber, password }) { 
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
            accessibility: select.value,
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

      if (!select) {
        setError(true);

        await schema.validate(data, { abortEarly: false });

        return;
      } else {
        setError(false);
      }
      
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

  useFocusEffect(
    useCallback (() => {
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

      formRef.current.setData({
        name: '',
        email: '',
        phoneNumber: '',
        accessibility: '',
        password: '',
        passwordConfirm: '',
      })
    }, [])
  );

  return (
    <Container>
        <View
          style={{
            position: 'absolute',
            top: -30,
            left: width - 100,
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

          <Select 
            options={options}
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
    </Container>
  )
}