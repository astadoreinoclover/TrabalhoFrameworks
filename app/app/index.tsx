import React from 'react';
import { Router } from './routes/Router';
import { AuthProvider } from '@/contexts/Auth';

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
