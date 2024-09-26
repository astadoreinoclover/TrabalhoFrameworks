import React from 'react';
import { Router } from './routes/Router';
import { AuthProvider } from '@/contexts/Auth';
import { RankingProvider } from '@/contexts/RankingContext';

export default function App() {
  return (
    <AuthProvider>
      <RankingProvider>
        <Router />
      </RankingProvider>
    </AuthProvider>
  );
}
