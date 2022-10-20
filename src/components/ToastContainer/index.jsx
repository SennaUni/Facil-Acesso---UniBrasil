import React from 'react';

import { Toast } from '../Toast';

import { FlatList, View, Text } from 'react-native';

import { Container } from './styles';

export function ToastContainer({ messages, removeToast }) {
  return (
    <Container>

    {/* <FlatList 
        style={{
          position: 'absolute',
          top: 5,
          left: 0,
          right: 0,
        }}
        contentContainerStyle={{ marginHorizontal: 20 }}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Toast message={item} />}
      /> */}

        {messages && messages.map(message => (
            <Toast 
                key={message.id}
                message={message}
                removeToast={() => removeToast(message.id)}
            />
        ))}
    </Container>
  )
};