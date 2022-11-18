import React, { useState, useCallback } from 'react';

import { KeyboardAvoidingView, View, Dimensions } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';

import { Feather } from '@expo/vector-icons';

import * as Yup from 'yup';
import { schema } from './schema';

import { Input } from '../../Basics/Input';
import { ArrowButtom } from '../../Basics/ArrowButtom';
import { Header } from '../../Header';
import { Select } from '../../Basics/Select';
import { OptionSelect } from '../../Basics/OptionSelect';

import { Container, ErrorContainer, Error } from './styles';

const { width } = Dimensions.get('window');

export function Form({ callBack, getSelect, formRef }) {
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(false);
  const [select, setSelect] = useState('');

  async function handleChangeForm() {
    try {
      const data = formRef.current.getData();

      formRef.current.setErrors({});

      if (!select) {
        setError(true);
        await schema.validate(data, { abortEarly: false });
        return;
      } 
        
      setError(false);

      await schema.validate(data, { abortEarly: false });

      callBack();
      getSelect(select);

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

  useFocusEffect(
    useCallback (() => {
      const rateOptions = () => {
        firestore()
          .collection('rate')
          .get()
          .then((value) => {
            const data = value.docs.map(doc => doc.data())
            setOptions(data);
          })
      }
  
      rateOptions();
    }, [])
  );

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
          // loading={loading}
          gradient={[ '#A88BEB', '#8241B8' ]}
          onPress={() => handleChangeForm()}
        />
        </View>
      <Header 
        title='Criar comentário'
      />
      <KeyboardAvoidingView behavior="position" enabled>
          <Input
            name="name"
            icon="user"
            placeholder="Nome estabalecimento"
          />
          <Input
            name="address"
            icon="map-pin"
            placeholder="Endereço"
          />

          <Select 
            options={options}
            icon="star"
            placeholder="Defina sua satisfação"
            header='Selecione sua satisfação'
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

          <Input
            name="comment"
            icon="message-circle"
            placeholder="Insira um comentário"
            multiline
            numberOfLines={4}
          />
      </KeyboardAvoidingView>
    </Container>
  )
}