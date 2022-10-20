import React from 'react';

import { ToastProvider } from './toast';

export function AppProvider({children}) {
    <ToastProvider>
        {children}
    </ToastProvider>   
};

