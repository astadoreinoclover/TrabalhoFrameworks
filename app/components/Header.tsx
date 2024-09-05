import * as React from "react";
import { Header, Icon } from "@rneui/base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, StyleSheet, Dimensions, PixelRatio, useWindowDimensions } from 'react-native';

// const { width, height } = Dimensions.get('window');
// const scale = PixelRatio.get();

export default () => {
  const { width, height } = useWindowDimensions();
  return (
    <Header
      backgroundColor="#dedede"
      backgroundImageStyle={{}}
      barStyle="default"
      centerComponent={{
        text: "Generico",
        style: { color: "#a865d4", fontWeight: 'bold', fontSize: '20px'}
      }}
      centerContainerStyle={{}}
      containerStyle={{ width: width }}
      leftComponent={{ icon: "home", color: "#a865d4" }}
      leftContainerStyle={{}}
      linearGradientProps={{}}
      placement="center"
      rightComponent={{ icon: "menu", color: "#a865d4" }}
      rightContainerStyle={{}}
      statusBarProps={{}}
    />
  );
}

// import * as React from "react";
// import { Text } from "@rneui/base";

// export default () => {
//   return (
//     <Text
//       h1
//       h1Style={{}}
//       h2Style={{}}
//       h3Style={{}}
//       h4Style={{}}
//       style={{}}
//     >
//       A maior plataforma de Genéricos do Brasil!
//     </Text>
//   );
// }