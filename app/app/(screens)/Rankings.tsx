import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, useWindowDimensions,Text } from 'react-native';
import BarSuperior from '@/components/bars/BarSuperior';
import { AuthContext } from '@/contexts/Auth';
import BarInferior from '@/components/bars/BarInferior';
import Ranking from '@/components/rankings/Ranking';

export default function Rankings() {
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setEmail(authContext.authData?.email || null);
    setName(authContext.authData?.name || null)
  }, [authContext.authData]);
  
  console.log(authContext.authData?.token);
  return (
    <View style={styles.container}>
      <View style={{position: 'absolute', top:0}}><BarSuperior /></View>
      <View style={{display: 'flex',flexDirection: width >=768 ? 'row' : 'column', height: width >=768 ? height*0.6: height*0.8}}>
        <View style={{width: width*0.5, right:0, position: 'relative', alignItems: 'center'}}>
          <Text style={{fontSize: 32, color: '#2c3e50', fontWeight: 'bold'}}>Ranking</Text>
        </View>
        <View style={{width: width*0.5, left:0, position: 'relative', alignItems: 'center'}}><Ranking /></View>
      </View>
      <View style={{position: 'absolute', bottom:0}}><BarInferior /></View>
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