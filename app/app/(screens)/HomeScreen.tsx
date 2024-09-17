import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BarSuperior from '@/components/bars/BarSuperior';
import { AuthContext } from '@/contexts/Auth';

export default function HomeScreen() {
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    // Atribuindo o email assim que o componente renderiza ou quando authData muda
    setEmail(authContext.authData?.email || null);
    setName(authContext.authData?.name || null)
  }, [authContext.authData]);
  
  console.log(authContext.authData?.token);
  return (
    <View style={styles.container}>
      <View style={{position: 'absolute', top:0}}><BarSuperior /></View>
      <Text style={styles.title}>Bem-vindo à Tela Inicial!</Text>
      <Text style={styles.title}>Seu e-mail é: {email ? email : 'Não disponível'}</Text>
      <Text style={styles.title}>Seu nome é: {name ? name : 'Não disponível'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
});

