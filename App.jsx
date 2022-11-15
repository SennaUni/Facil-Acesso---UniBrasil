import React from 'react';

import { ToastProvider } from './src/hooks/toast';
import { AuthProvider } from './src/hooks/auth';

import { Routes } from './src/routes';

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ToastProvider>
  );
}

