import * as React from "react";
import { Text } from "@rneui/base";
import { useWindowDimensions } from 'react-native';

export default () => {
  const { width, height } = useWindowDimensions();
  let font = width >= 420 ? 50 : 40;
  return (
    <Text
      h1
      h1Style={{fontSize: font, marginTop: height * 0.22, marginLeft:width*0.02, fontWeight:"600", color: '#a865d4'}}
      h2Style={{}}
      h3Style={{}}
      h4Style={{}}
      style={{}}
    >
      A maior plataforma de Genéricos do Brasil!
    </Text>
  );
}


// https://reactnativeelements.com/docs/components/text