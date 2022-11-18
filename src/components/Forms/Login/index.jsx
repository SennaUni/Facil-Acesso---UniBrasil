import React, { useRef, useState } from 'react';

import { Form as Unform } from '@unform/mobile';

import auth from '@react-native-firebase/auth';

import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { View, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import * as Yup from 'yup';
import { schema } from './schema';

import { FacebookButton } from '../../FacebookButton';
import { GmailButton } from '../../GmailButton';
import { GithubButton } from '../../GithubButton';
import { TwitterButton } from '../../TwitterButton';
import { LinkedinButton } from '../../LinkedinButton';
import { ArrowButtom } from '../../Basics/ArrowButtom';
import { Input } from '../../Basics/Input';
import { PasswordInput } from '../../Basics/PasswordInput';
import { Header } from '../../../components/Header';
import { Divider } from '../../../components/Divider';
import { useToast } from '../../../hooks/toast';
import { useAuth } from '../../../hooks/auth';

import { Container, Options, OptionsText, LoginContainer, Logins } from './styles';

const { width } = Dimensions.get('window');

export function Form() {
  const formRef = useRef(null);

  const { navigate } = useNavigation();

  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();
  const { signIn } = useAuth();

  async function handleFirebaseAuth(data) {
    const { email, password} = data;

    auth()
    .signInWithEmailAndPassword(email, password)
    .then(async (value) => {
      const userData = {
        email: data.email,
        password: data.password,
        uid: value.user.uid,
      }
      
      await signIn(userData);

      const success = {
        type: 'success', 
        title: 'Autenticado com sucesso', 
        description: 'Bem vindo',
      }

      addToast(success); 
      
      navigate('principal')
    })
    .catch((err) => { console.log(err)
      const error = {
        type: 'error', 
        title: 'Falha na autenticação', 
        description: 'Usuário ou senha inválidos',
      }
      addToast(error);
    })
    .finally(() => setLoading(false));    
  }

  async function handleUserLogin(data) {
    setLoading(true);

    try {
      formRef.current.setErrors({});

      await schema.validate(data, { abortEarly: false });

      await handleFirebaseAuth(data);

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

  useFocusEffect(() => {
    formRef.current.setData({
      email: '',
      password: '',
    })
  })

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
          title='Realizar login'
        />
        
        <Unform ref={formRef} onSubmit={handleUserLogin} style={{ marginVertical: 10 }}>
            <Input
              name="email"
              icon="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize='none' // primeira letra começa como minuscula
            />
            <PasswordInput
              name="password"
              icon="lock"
              placeholder="Senha"
            />

            {/* <Buttom
              title="Cadastrar"
              onPress={() => formRef.current.submitForm()}
            /> */}
            
          </Unform>
      </KeyboardAvoidingView>

      <Options>
        <TouchableOpacity
          onPress={() => navigate('forgotPassword')}
        >
          <OptionsText color={'#6441A5'} >Esqueceu a senha?</OptionsText>  
        </TouchableOpacity>
      </Options>

      <LoginContainer>
        <Divider 
          color={'#6441A5'} 
          lines={false} 
          text='Or Sign up using'
        />
        <Logins>
          <GmailButton />
          <FacebookButton />
          <GithubButton />
          <TwitterButton />
          <LinkedinButton />
        </Logins>
      </LoginContainer>

      <Options>
        <TouchableOpacity
          onPress={() => navigate('register')} 
        >
          <OptionsText color={'#6441A5'}>Novo usuário? Se cadastre</OptionsText>  
        </TouchableOpacity>
      </Options>

    </Container>
  )
}