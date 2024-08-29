import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function SegundaTela() {
  return (
    <>
    <View style={styles.container}>
    <ScrollView style={{maxWidth: 750}}>
      <Text>Segunda Tela</Text>
      <Link href="/terceiraTela">Ir para Terceira tela</Link>
      <Text style= {styles.texto}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
    </Text>
    </ScrollView>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333"
  },
  texto: {
    color: "#ccc"
  }
});
