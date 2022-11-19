import React, { createContext, useContext, useState, useCallback } from 'react';

import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';

const AuthContex = createContext({});

const AuthProvider = ({ children }) => {
  const [dataAuth, setDataAuth] = useState({
    email: '',
    password: '',
    uid: '',
    accessibility: '',
    name: '',
    phoneNumber: '',
  });

  const signIn = useCallback( async ({ email, password, uid }) => {
    const userToEdit = await firestore()
        .collection('users')
        .doc(uid)
        .get();

    const { accessibility, name, phoneNumber } = userToEdit.data();
  
    setDataAuth({
      email,
      password,
      uid,
      accessibility,
      name,
      phoneNumber,
    })

  }, [dataAuth]);

  const signOut = useCallback(() => {
    auth().signOut();
    setDataAuth([])
  }, []);

  const updateValues = useCallback((data) => {
    const object = {
      ...dataAuth,
      ...data,
    }

    setDataAuth(object);

    signIn(object);
  }, []);

  return (
    <AuthContex.Provider value={{ dataAuth, signIn, signOut, updateValues }}>
      {children}
    </AuthContex.Provider>
  )
}

const useAuth = () => {
  const contex = useContext(AuthContex);

  if (!contex) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return contex;
}

export { AuthProvider, useAuth };