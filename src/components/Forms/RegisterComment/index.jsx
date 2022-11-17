import React, { useState, useRef, useCallback } from 'react';

import { KeyboardAvoidingView, View, Dimensions } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { Form as Unform } from '@unform/mobile';

import { Feather } from '@expo/vector-icons';

import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';

import * as Yup from 'yup';
import { schema } from './schema';

import { Form as FormComment } from '../AddComment';
import { Form as FormAccessibility } from '../AddAccessibility';

import { useToast } from '../../../hooks/toast';
import { useAuth } from '../../../hooks/auth';

import { Container, Content } from './styles';

const { width } = Dimensions.get('window');

export function Form() {
  const formRef = useRef(null)

  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [select, setSelect] = useState('');
  const [error, setError] = useState(false);
  const [pageForm, setPageForm] = useState(false);

  const { addToast } = useToast();
  const { dataAuth } = useAuth();

  // async function handleFirebaseUpdateUser({ email, name, phoneNumber }) { 
  //   firestore()
  //     .collection('users')
  //     .doc(dataAuth.uid)
  //     .update({
  //       name,
  //       email,
  //       phoneNumber,
  //       accessibility: select.value,
  //     })
  //     .then(() => {
  //       const user = auth().currentUser;

  //       user.updateEmail(email);

  //       const success = {
  //         type: 'success', 
  //         title: 'Usuário atualizado com sucesso', 
  //         description: 'Tome cuidado na proxima vez',
  //       }

  //       addToast(success);
  //     })
  //     .catch((err) => {
  //       const error = {
  //         type: 'error', 
  //         title: 'Ocorreu um erro', 
  //         description: 'Erro ao atualizar usuário',
  //       }

  //       addToast(error);
  //     })
  //     .finally(() => setLoading(false));
  // }

  async function handleRegisteComment(data) { console.log('data =>', data)
    // try {
    //   formRef.current.setErrors({});

    //   if (!select) {
    //     setError(true);

    //     await schema.validate(data, { abortEarly: false });

    //     return;
    //   } else {
    //     setError(false);
    //   }

    //   await schema.validate(data, { abortEarly: false });

    //   await handleFirebaseUpdateUser(data);

    // } catch (err) {
    //   const validationErrors = {};
      
    //   if (err instanceof Yup.ValidationError) {
    //     err.inner.forEach(error => {
    //       validationErrors[error.path] = error.message;
    //     });

    //     formRef.current.setErrors(validationErrors);
    //   }
    // }
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

    // formRef.current.setData({
    //   name: dataAuth.name,
    //   email: dataAuth.email,
    //   phoneNumber: dataAuth.phoneNumber,
    // })  
  }, []));

  return (
    <Container>
      <KeyboardAvoidingView behavior="position" enabled>
        <Unform ref={formRef} onSubmit={handleRegisteComment}>
          <Content
             opacity={pageForm === 1 ? 1 : 0}
             height={pageForm === 1 ? 'auto' : 0}
          >
            <FormComment 
              callBack={() => setPageForm(2)}
            />
          </Content>
          <View 
             opacity={pageForm === 1 ? 0 : 1}
             height={pageForm === 1 ? 0 : 'auto'}
          >
            <FormAccessibility 
              callBack={() => setPageForm(1)}
              onSubmit={() => formRef.current.submitForm()}
            />
          </View>
        </Unform>
      </KeyboardAvoidingView>
    </Container>
  )
}