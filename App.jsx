import React from 'react';

import { ToastProvider } from './src/hooks/toast';

import { Routes } from './src/routes';

import { Toast } from './src/components/Toast';

export default function App() {
  return (
    <ToastProvider>
      <Routes />
    </ToastProvider>
  );
}

