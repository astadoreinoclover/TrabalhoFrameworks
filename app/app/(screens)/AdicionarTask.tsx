import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, useWindowDimensions,Text } from 'react-native';
import BarSuperior from '@/components/bars/BarSuperior';
import { AuthContext } from '@/contexts/Auth';
import TaskForm from '@/components/tasks/TaskForm';

export default function AdicionarTask() {
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setEmail(authContext.authData?.email || null);
    setName(authContext.authData?.name || null)
  }, [authContext.authData]);
  
  return (
    <View style={styles.container}>
      <View style={{position: 'absolute', top:0}}><BarSuperior /></View>
      <View style={{position: 'absolute', bottom:20 ,display: 'flex',flexDirection: width >=768 ? 'row' : 'column', height: width >=768 ? height*0.8: height*0.8}}>
        <TaskForm />
      </View>
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
    color: '#2c3e50',
    fontWeight: 'bold'
  },
});