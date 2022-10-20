import 'react-native-get-random-values';

import React, { createContext, useContext, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { ToastContainer } from '../components/ToastContainer';

const ToastContex = createContext({});

const ToastProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  function addToast({type, title, description}) {

    const toast = {
      id: uuidv4(),
      type,
      title,
      description,
    };

    setMessages((state) => [...state, toast]);
  };

  function removeToast(id) {
    setMessages(messages => messages.filter(currentMessage => currentMessage.id !== id));
  };

  return (
    <ToastContex.Provider value={{ addToast, removeToast }}>
      <ToastContainer 
        messages={messages}
        removeToast={removeToast}
      />
      {children}
    </ToastContex.Provider>
  )
}

const useToast = () => {
  const contex = useContext(ToastContex);

  if (!contex) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return contex;
}

export { ToastProvider, useToast };