import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';


export default function Terceira() {
  const idUser = 3;
  return (
    <>
    <View style={styles.container}>
      <Text>Terceira tela</Text>
      <Link href={`/usuario/${idUser}`}>Ir para segunda tela</Link>
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
