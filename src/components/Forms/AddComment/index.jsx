import React, { useRef, useEffect } from 'react';
import { Form as Unform } from '@unform/mobile';
import firestore from '@react-native-firebase/firestore';

import * as Yup from 'yup';
import { schema } from './schema';

import { Alert } from 'react-native';

import { Buttom } from '../../Basics/Buttom';
import { Input } from '../../Basics/Input';

import { Container } from './styles';

export function Form() {
  const formRef = useRef(null)

  async function handleCommentRegister(data) {
    try {
      formRef.current.setErrors({});

      await schema.validate(data, { abortEarly: false });

      console.log(data)

      const { address, comment, image, name, rating } = data;

      firestore()
        .collection('teste')
        .add({
          address,
          comment,
          image,
          name,
          rating,
          create_at: firestore.FieldValue.serverTimestamp()
        })
        .then(() => Alert.alert('Sucesso'))
        .catch((err) => console.log(err));

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

  useEffect(() => { 
    const subscribe = firestore()
      .collection('teste')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
          // console.log(doc.id);
          return {
            id: doc.id,
            ...doc.data(),
          }
        })

        // console.log(data);
        // setar essa data em algum lugar
      })
    
    return () => subscribe();

    // async function teste() {
    //   const users = await firestore().collection('teste').doc('jLiODWAy5y9imR1pPxma').get();
    //   console.log(users.data());
    // }

    // teste();

  }, []);

  return (
    <Container>
      <Unform ref={formRef} onSubmit={handleCommentRegister}>
        <Input
          name="name"
          icon="user"
          placeholder="Nome estabalecimento"
        />
        <Input
          name="address"
          icon="mail"
          placeholder="Endereço"
        />
        <Input
          name="rating"
          icon="lock"
          placeholder="PRECISA SER UM SELECT"
        />
        <Input
          name="comment"
          icon="lock"
          placeholder="VER SE EXISTE TEXT AREA"
          multiline
          numberOfLines={4}
        />
        <Input
          name="image"
          icon="lock"
          placeholder="INSERIR IMAGEM"
        />

        <Buttom
          title="Cadastrar"
          onPress={() => formRef.current.submitForm()}
        />
      </Unform>
    </Container>
  )
}