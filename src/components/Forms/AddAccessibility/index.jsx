import React, { useRef, useState } from 'react';

import { KeyboardAvoidingView, View, Dimensions } from 'react-native';

import { Form as Unform } from '@unform/mobile';

import * as Yup from 'yup';
import { schema } from './schema';

import { Buttom } from '../../Basics/Buttom';
import { Input } from '../../Basics/Input';
import { ArrowButtom } from '../../Basics/ArrowButtom';
import { Header } from '../../Header';
import { useToast } from '../../../hooks/toast';

import { Container } from './styles';

const { width } = Dimensions.get('window');

export function Form({ callBack, onSubmit }) {
  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);

  return (
    <Container>
            <View
        style={{
          position: 'absolute',
          top: -30,
          left: 50,
        }}
      >
        <ArrowButtom
          loading={loading}
          reverse={true}
          gradient={[ '#A88BEB', '#8241B8' ]}
          onPress={() => callBack()}
        />
      </View>

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
          onPress={() => onSubmit()}
        />
      </View>

      <Header 
        title='Acessibilidades presentes'
      />

      <KeyboardAvoidingView behavior="position" enabled>
          <Input
            name="category"
            icon="lock"
            placeholder="PRECISA SER UM SELECT"
          />
          <Input
            name="accessibilityIcon"
            icon="lock"
            placeholder="PRECISA SER UM SELECT"
          />
          <Input
            name="accessiblity"
            icon="user"
            placeholder="VER SE EXISTE TEXT AREA"
          />

          <Buttom
            title="Cadastrar"
            onPress={() => formRef.current.submitForm()}
          />
      </KeyboardAvoidingView>
    </Container>
  )
}