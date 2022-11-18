import React, { useState, useRef, useCallback } from 'react';

import { KeyboardAvoidingView, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { Form as Unform } from '@unform/mobile';

import { v4 as uuidv4 } from 'uuid';

import firestore from '@react-native-firebase/firestore';

import { Form as FormComment } from '../AddComment';
import { Form as FormAccessibility } from '../AddAccessibility';

import { useToast } from '../../../hooks/toast';

import { Container, Content } from './styles';

export function Form() {
  const formRef = useRef(null)

  const [loading, setLoading] = useState(false);
  const [pageForm, setPageForm] = useState(1);
  const [selectRate, setSelectRate] = useState({});
  const [access, setAccess] = useState([]);

  const { addToast } = useToast();

  console.log(access)

  async function handleFirebaseAddComment({ address, comment, name }) {;
    firestore()
      .collection('comments')
      .add({
        id: uuidv4(),
        name,
        address,
        comment,
        rate: selectRate,
        asccess: JSON.stringify(access),
        create_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        const success = {
          type: 'success', 
          title: 'Comentário realizado com sucesso', 
          description: 'Obrigado por contribuir nessa batalha',
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

  async function handleRegisteComment(data) {console.log('dentro', access)
    try {

      await handleFirebaseAddComment(data);

    } catch (err) { 
      const error = {
        type: 'error', 
        title: 'Ocorreu um erro', 
        description: 'Não foi possível cadastrar o comentário',
      }
      addToast(error);
    }
  }

  useFocusEffect(
    useCallback (() => {
      // formRef.current.setData({
      //   name: dataAuth.name,
      //   email: dataAuth.email,
      //   phoneNumber: dataAuth.phoneNumber,
      // })  
    }, [])
  );

  return (
    <Container>
      <KeyboardAvoidingView behavior="position" enabled>
        <Unform ref={formRef} onSubmit={handleRegisteComment}>
          <Content
             opacity={pageForm === 1 ? 1 : 0}
             height={pageForm === 1 ? 'auto' : 0}
          >
            <FormComment 
              callBack={() =>  setPageForm(2)}
              loading={loading}
              formRef={formRef}
              getSelect={setSelectRate}
            />
          </Content>
          <View 
             opacity={pageForm === 1 ? 0 : 1}
             height={pageForm === 1 ? 0 : 'auto'}
          >
            <FormAccessibility 
              callBack={() => setPageForm(1)}
              onSubmit={() => formRef.current.submitForm()}
              loading={loading}
              getAccess={setAccess}
              formRef={formRef}
            />
          </View>
        </Unform>
      </KeyboardAvoidingView>
    </Container>
  )
}