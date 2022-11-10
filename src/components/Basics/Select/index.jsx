import React, { useState, useRef, useEffect } from 'react';

import { TouchableOpacity, Modal, FlatList, SafeAreaView } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import { useField } from '@unform/core';

import { Label, Container, ComboBox, ModalHeader, SelectTitle, ModalTitle, ModalClose } from './styles';

export function Select({ name, options, text, label, OptionComponent }) {
  const selectRef = useRef(null)

  // const { fieldName, registerField } = useField(name);

  const [openModal, setOpenModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState();

  function renderOption(item) {
    return (
      <OptionComponent 
        item={item}
        selectedValue={selectedValue}
        onPress={() => {
          setSelectedValue(item);
          setOpenModal(false);
        }}
      />
    )
  }

  // useEffect(() => {
  //   registerField({
  //     name: fieldName,
  //     ref: selectRef.current,
  //     path: 'value',
  //     getValue: ref => {
  //       return ref.value || ''
  //     },
  //     setValue: (ref, value) => {
  //       ref.setNativeProps({ text: value });
  //       ref.value = value
  //     },
  //     clearValue: ref => {
  //       ref.value = ''
  //     },
  //   })
  // }, [fieldName, registerField])

  return (
    <>
      <Label>
        {label}
      </Label>
      <Container >
        <ComboBox
          onPress={() => setOpenModal(true)}
        >
          <SelectTitle 
            numberOfLines={1}
          >
            {selectedValue?.name || text}
          </SelectTitle>
          <FontAwesome
            name='angle-down'
            size={26}
            color={'#000'}
          />
        </ComboBox>
        <Modal 
          animationType='slide'
          visible={openModal}
          onRequestClose={() => setOpenModal(false)}
        >
          <SafeAreaView>
            <ModalHeader>
              <TouchableOpacity
                onPress={() => setOpenModal(false)}
              >
                <FontAwesome
                  name='angle-down'
                  size={30}
                  color={'#000'}
                />
              </TouchableOpacity>
              <ModalTitle>
                {text}
              </ModalTitle>
              <TouchableOpacity
                onPress={() => setOpenModal(false)}
              >
                <ModalClose>
                  Cancelar
                </ModalClose>
              </TouchableOpacity>
            </ModalHeader>
            <FlatList 
              data={options ?? []}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => renderOption(item) }
            />
          </SafeAreaView>
        </Modal>
      </Container>
    </>
  );
}