import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BarSuperior from '@/components/bars/BarSuperior';

export default function HomeScreen() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('userEmail');
        if (storedEmail !== null) {
          setEmail(storedEmail);
        }
      } catch (error) {
        console.error('Failed to load email from AsyncStorage', error);
      }
    };

    fetchEmail();
  }, []);

  return (
    <View style={styles.container}>
      <BarSuperior />
      <Text style={styles.title}>Bem-vindo à Tela Inicial!</Text>
      <Text style={styles.title}>Seu e-mail é: {email ? email : 'Não disponível'}</Text>
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

