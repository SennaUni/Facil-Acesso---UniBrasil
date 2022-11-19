import React, { useState, useCallback } from 'react';

import { FlatList, TouchableOpacity } from 'react-native';

import { useNavigation, useFocusEffect } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';

import { FontAwesome } from '@expo/vector-icons';

import { DataTable as FilterOptions } from '../../components/DataTable/FilterOptions';
import { DataTable } from '../../components/DataTable/Comments';

import { Container, Content, Comments, CommentsText, Icon, CommentsCards } from './styles';

export function Principal() {
  const [loading, setLoading] = useState(false);
  const [accessOptions, setAccessOptions] = useState([]);
  const [commerceOptions, setCommerceOptions] = useState([]);
  const [commentsOptions, setCommentsOptions] = useState([]);
  const [access, setAccesss] = useState(null);
  const [commerce, setCommerce] = useState(null);

  const teste = (access && commerce)
  ? commentsOptions.filter(item => item.data.access
                   .find(item2 => item2.acessibilidade === access.value))
                   .filter(valor => valor.data.commerce.value === commerce.value )
  : access 
    ? commentsOptions.filter(item => item.data.access
                     .find(item2 => item2.acessibilidade === access.value))
    : commerce
      ? commentsOptions.filter(item => item.data.commerce.value === commerce.value)
      : commentsOptions;

  const { navigate } = useNavigation();

  useFocusEffect( 
    useCallback (() => {
      const AccessOptions = () => {
        firestore()
          .collection('accessibility')
          .get()
          .then((value) => {
            const data = value.docs.map(doc => doc.data())
            setAccessOptions(data);
          })
      }

      const CommercesOptions = () => {
        firestore()
          .collection('commerce')
          .get()
          .then((value) => {
            const data = value.docs.map(doc => doc.data())
            setCommerceOptions(data);
          })
      }

      const Subscriber = () => {
        firestore()
          .collection('comments')
          .onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => {
              return {
                id: doc.id,
                data: doc.data(),
              }
            })
            setCommentsOptions(data);
          })
      }

      AccessOptions();
      CommercesOptions();
      Subscriber();
    }, [])
  );

  return (
    <Container
      vertical
      showsVerticalScrollIndicator={false}
    >
      <Content colors={[ '#6C33A3', '#8241B8' ]}>
        <FilterOptions 
          data={accessOptions}
          header="Acessibilidades"
          callBack={setAccesss}
        />
        <FilterOptions 
          data={commerceOptions}
          header="Estabelecimento"
          callBack={setCommerce}
        />
        <Comments>
          <CommentsText>Comentarios</CommentsText>
          <TouchableOpacity
            onPress={() => navigate('registerComment')}
          >
            <Icon colors={[ '#A88BEB', '#8241B8' ]}>
              <FontAwesome
                name='plus'
                size={30}
                color='#FFF'
              />
            </Icon>
          </TouchableOpacity>
        </Comments>
        <CommentsCards>
          <DataTable
            data={teste}
          />
        </CommentsCards>
      </Content>
    </Container>
  );
}
