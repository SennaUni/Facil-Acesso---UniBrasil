import React, { useState } from 'react';

import { TouchableOpacity, Modal, FlatList } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import { Feather } from '@expo/vector-icons';

import { Header } from '../../../components/Header';

import { Container, ComboBox, IconContainer, ModalContent, ModalHeader, ModalTitle, ModalSelect, SelectTitle } from './styles';

export function Select({ icon, options, text, OptionComponent, onChange }) {

  const [openModal, setOpenModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState();

  function renderOption(item) {
    return (
      <OptionComponent 
        item={item}
        selectedValue={selectedValue}
        onPress={() => {
          setSelectedValue(item);
          onChange(item);
          setOpenModal(false);
        }}
      />
    )
  }

  return (
    <>
      <Container >
        <IconContainer>
         <Feather
            name={icon}
            size={24}
            color={selectedValue ? '#6441A5' : '#AEAEB3'}
          />
        </IconContainer>

        <ComboBox
          onPress={() => setOpenModal(true)}
        >
          <SelectTitle 
            numberOfLines={1}
            color={selectedValue ? '#000' : '#AEAEB3'}
          >
            {selectedValue?.name || text}
          </SelectTitle>
          <FontAwesome
            name='angle-down'
            size={26}
            color={selectedValue ? '#6441A5' : '#AEAEB3'}
          />
        </ComboBox>
        <Modal 
          animationType='slide'
          visible={openModal}
          onRequestClose={() => setOpenModal(false)}
        >
          <ModalContent colors={[ '#6C33A3', '#8241B8' ]}>
            <ModalHeader>
              <TouchableOpacity
                onPress={() => setOpenModal(false)}
                style={{ }}
              >
                <FontAwesome
                  name='close'
                  size={30}
                  color={'#FFF'}
                />
              </TouchableOpacity>
              <ModalTitle>
                <Header 
                  title='Selecione sua acessibilidade'
                  color='#FFF'
                />
              </ModalTitle>
            </ModalHeader>
            <ModalSelect>
              <FlatList 
                data={options ?? []}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => renderOption(item) }
              />
            </ModalSelect>
          </ModalContent>
        </Modal>
      </Container>
    </>
  );
}