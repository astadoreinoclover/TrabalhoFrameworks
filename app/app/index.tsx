import React from 'react';
import { Router } from './routes/Router';
import { AuthProvider } from '@/contexts/Auth';
import { RankingProvider } from '@/contexts/RankingContext';
import { FuncionariosProvider } from '@/contexts/FuncionariosContext';
import { RelatorioProvider } from '@/contexts/RelatorioContext';

export default function App() {
  return (
    <AuthProvider>
      <RankingProvider>
        <FuncionariosProvider>
          <RelatorioProvider>
            <Router />
          </RelatorioProvider>
        </FuncionariosProvider>
      </RankingProvider>
    </AuthProvider>
  );
}
