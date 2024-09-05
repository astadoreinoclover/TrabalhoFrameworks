import { Link } from 'expo-router';
import React from 'react';
import MainText from '@/components/MainText';
import { View, StyleSheet, Dimensions, PixelRatio } from 'react-native';
import { rgbaArrayToRGBAColor } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
// import myCustomStyles from './_styles';      // Aqui podem importar estilos 
// import ScrollViewIndicator from 'react-native-scroll-indicator';
import Header from '@/components/Header';
const { width, height} = Dimensions.get('window');
const scale = PixelRatio.get();

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <Header></Header>
      <View style={styles.mainText}><MainText></MainText></View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    alignItems: 'center',
    backgroundColor: "#f0f0f0",
    // height: height * 0.1,
  },
  mainText: {
    color: '#fff'
  }
}
);
