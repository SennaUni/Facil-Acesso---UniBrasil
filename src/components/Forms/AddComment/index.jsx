import React, { useRef, useEffect, useState } from 'react';

import { KeyboardAvoidingView, View, Dimensions } from 'react-native';

import { Form as Unform } from '@unform/mobile';

import firestore from '@react-native-firebase/firestore';

import * as Yup from 'yup';
import { schema } from './schema';

import { Input } from '../../Basics/Input';
import { ArrowButtom } from '../../Basics/ArrowButtom';
import { Header } from '../../Header';
import { useToast } from '../../../hooks/toast';

import { Container } from './styles';

const { height, width } = Dimensions.get('window');

export function Form({ callBack }) {
  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

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

        console.log(data);
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
          onPress={() => callBack()}
        />
        </View>
      <Header 
        title='Criar comentário'
      />
      <KeyboardAvoidingView behavior="position" enabled>
        {/* <Unform ref={formRef} onSubmit={handleCommentRegister}> */}
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
            // numberOfLines={4}
          />
          <Input
            name="image"
            icon="lock"
            placeholder="INSERIR IMAGEM"
          />
        {/* </Unform> */}
      </KeyboardAvoidingView>
    </Container>
  )
}