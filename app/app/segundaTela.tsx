import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function SegundaTela() {
  return (
    <>
    <View style={styles.container}>
      <Text>Segunda Tela</Text>
      <Link href="/terceiraTela">Ir para Terceira tela</Link>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
