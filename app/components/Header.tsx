// import * as React from "react";
// import { Header, Icon } from "@rneui/base";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { View, StyleSheet, Dimensions, PixelRatio, useWindowDimensions } from 'react-native';
// import { Tab } from "@rneui/base";
// const { width, height } = Dimensions.get('window');
// const scale = PixelRatio.get();

// export default () => {
//   const { width, height } = useWindowDimensions();
//   return (
//     <Header
//       backgroundColor="#dedede"
//       backgroundImageStyle={{}}
//       barStyle="default"
//       centerComponent={{
//         text: "Generico",
//         style: { color: "#a865d4", fontWeight: 'bold', fontSize: '20px'}
//       }}
//       centerContainerStyle={{}}
//       containerStyle={{ width: width }}
//       leftComponent={{ icon: "home", color: "#a865d4" }}
//       leftContainerStyle={{}}
//       linearGradientProps={{}}
//       placement="center"
//       rightComponent={{ icon: "menu", color: "#a865d4" }}
//       rightContainerStyle={{}}
//       statusBarProps={{}}
//     />
//     <Tab
//       value={0}
//       onChange={() => console.log("onChange()")}
//       indicatorStyle={{}}
//       variant="default"
//     >
//       <Tab.Item title="Recent" />
//       <Tab.Item title="favourite" />
//       <Tab.Item title="cart" />
//     </Tab>
//   );
// }

import * as React from "react";
import { Header } from "@rneui/base";
import { useWindowDimensions, View, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';


export default () => {
  const { width } = useWindowDimensions();
  const [menuVisible, setMenuVisible] = useState(false); // Controla a visibilidade do menu

  const toggleMenu = () => {
    setMenuVisible(!menuVisible); // Alterna a visibilidade do menu
  };


  const menuWidth = width <= 500 ? width * 0.5 : width * 0.25;

  return (
    <View>
      <Header
        backgroundColor="#dedede"
        backgroundImageStyle={{}}
        barStyle="default"
        centerComponent={{
          text: "Generico",
          style: { color: "#a865d4", fontWeight: 'bold', fontSize: 20 }
        }}
        containerStyle={{ width: width }}
        leftComponent={{ 
          icon: "home", 
          color: "#a865d4",
          
        }}
        rightComponent={{
          icon: "menu",
          color: "#a865d4",
          onPress: toggleMenu // Adiciona função ao botão de menu
        }}
      />
      
      {menuVisible && ( // Exibe o Tab apenas quando menuVisible for true
        <View 
          style={{
            position: 'absolute',
            top: 47,
            right: 0, // Fixa no lado direito
            backgroundColor: '#dedede', // Fundo branco para contraste
            zIndex: 1000, // Garante que fique acima dos outros elementos
            padding: 10,
            borderColor: '#ccc', 
            borderWidth: 1,
            borderRadius: 5,
            width: menuWidth
          }}
        > <TouchableOpacity>
            <Link href="/login">
              <Text style={{ padding: 10, fontSize: 18, color: '#a865d4' }}>Login</Text>
            </Link>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Favourite clicked")}>
            <Text style={{ padding: 10, fontSize: 18, color: '#a865d4' }}>Cadastro</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}