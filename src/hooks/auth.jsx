import React, { createContext, useContext, useState, useCallback } from 'react';

import auth from '@react-native-firebase/auth';

import { useToast } from '../hooks/toast';

const AuthContex = createContext({});

const AuthProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const signIn = useCallback( async ({ email, password }) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {

        // setData();

        const success = {
          type: 'success', 
          title: 'Autenticado com sucesso', 
          description: 'Bem vindo',
        }
        addToast(success);

        navigate.navigate('principal')
      })
      .catch(() => {
        const error = {
          type: 'error', 
          title: 'Falha na autenticação', 
          description: 'Usuário ou senha inválidos',
        }
        addToast(error);
      })
  }, []);

  const signOut = useCallback(() => {
    auth()
      .signOut()
      .then(() => {

         // setData();

        const success = {
          type: 'success', 
          title: 'LogOff realizdo com sucesso', 
          description: 'Até mais',
        }
        addToast(success);

        navigate.navigate('principal')
      })
      .catch(() => {
        const error = {
          type: 'error', 
          title: 'Falha na operação', 
          description: 'Não foi possível realizar o LogOff',
        }
        addToast(error);
      })
  }, []);

  const checkAuthUser = useCallback((user) => {
      
    // setData();

  }, []);

  const updateUser = useCallback((user) => {
      
    // setData();

  }, []);

  return (
    <AuthContex.Provider value={{ addToast, removeToast }}>
      {children}
    </AuthContex.Provider>
  )
}

const useToast = () => {
  const contex = useContext(AuthContex);

  if (!contex) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return contex;
}

export { AuthProvider, useToast };