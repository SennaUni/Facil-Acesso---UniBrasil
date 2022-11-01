import React from 'react';

import { ToastProvider } from './src/hooks/toast';

import { Routes } from './src/routes';
import { Principal } from './src/screens/principal';

import { Toast } from './src/components/Toast';

export default function App() {
  return (
    <ToastProvider>
      <Routes />
    {/* <Principal /> */}
    </ToastProvider>
  );
}

