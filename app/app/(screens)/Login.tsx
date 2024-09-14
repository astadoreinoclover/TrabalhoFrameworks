// import React, { useState } from 'react';
// import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

// export default function LoginScreen({navigation}: {navigation: any}) {
//   const [email, setEmail] = useState('');                 // Estado para guardar o e-mail conforme está sendo escrito
//   const [password, setPassword] = useState('');           // Estado para guardar a senha conforme está sendo escrita
//   const [wrongInput, setWrongInput] = useState(false);    // Estado para guardar a validação dos campos e exibir mensagem de erro

//   /**
//    * Função para lidar com o login após o clique no botão
//    * Idealmente, neste momento seria realizada uma requisição para uma API de autenticação
//    */
//   const handleLogin = () => {
//     const validEmail = 'waloch@senacrs.com.br';
//     const validPassword = '123456';

//     // Se os dados forem válidos, passar para a página 'Home' passando como argumento o email
//     // Caso contrário, seta como verdadeiro para exibir o campo de mensagem
//     if (email === validEmail && password === validPassword) {
//       navigation.navigate('Home', { email });
//     } else {
//       setWrongInput(true);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="E-mail"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Senha"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry     // ofusca o texto, ideal para senhas
//         onSubmitEditing={handleLogin} // Caso o usuário pressione Enter quando está digitando neste campo, chamamos a função para validar o login
//       />
//       {wrongInput && (<Text style={styles.alertText}>E-mail ou senha incorretos!</Text>)}
//       <Button title="Acessar" onPress={handleLogin} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingHorizontal: 8,
//   },
//   alertText: {
//     color: 'red',
//     marginHorizontal: 'auto',
//     marginBottom: 12
//   }
// });

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, useWindowDimensions  } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

// const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [wrongInput, setWrongInput] = useState(false); 

  // Validação de e-mail
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Função de login
  const handleLogin = () => {
    if (!validateEmail(email)) {
      setAlertMessage('Por favor, insira um e-mail válido.');
      setShowAlert(true);
      return;
    }
    if (password.length < 8) {
      setAlertMessage('A senha deve ter no mínimo 8 caracteres.');
      setShowAlert(true);
      return;
    }
    const validEmail = 'renato@gmail.com';
    const validPassword = '123456789';
    
        // Se os dados forem válidos, passar para a página 'Home' passando como argumento o email
        // Caso contrário, seta como verdadeiro para exibir o campo de mensagem
    if (email === validEmail && password === validPassword) {
      navigation.navigate('Home', { email });
    } else {
      setWrongInput(true);
    }
  };

  return (
    <View style={[styles.container, { flexDirection: width >= 768 ? 'row':'column'}]}>
      {/* Logo */}
      <View style={[styles.logoContainer, {marginBottom: width>=768 ? 40:10, flex: width >= 768 ? 2:1, marginTop:10}]}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>Logo</Text>
        </View>
        <Text style={[styles.welcomeText, {fontSize: width >= 768 ? 35:20}]}>Bem-vindo à Work Pass, onde a inovação encontra a motivação!</Text>
      </View>

      {/* Formulário de Login */}
      <View style={[styles.loginContainer, {width: width * 0.85, padding: width >= 768 ? 20:0}]}>
        <Text style={styles.loginTitle}>Login</Text>
        <View style={[styles.areaLogin, {width: width >= 768 ? '80%': "90%", padding: width >= 768 ? 30:15}]}>
          <Text>Email</Text>
          <TextInput
            style={[styles.input, {padding: width >= 768 ? 10:5}]}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Text>Senha</Text>
          <TextInput
            style={[styles.input, {padding: width >= 768 ? 10:5}]}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          {wrongInput && (<Text style={styles.alertText}>E-mail ou senha incorretos!</Text>)}
          <TouchableOpacity style={[styles.button, {padding: width >= 768 ? 15:10}]} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Alerta */}
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Alerta"
        message={alertMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => setShowAlert(false)}
        overlayStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50', // Azul escuro
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    // marginBottom: 40,
    // flex: 2,
  },
  logo: {
    backgroundColor: '#8A79AF', // Roxo Lavanda
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700', // Cor para destacar o logo
  },
  welcomeText: {
    color: '#FFFFFF', // Texto branco
    fontSize: 35,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  loginContainer: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    flex: 2,
  },
  areaLogin: {
    backgroundColor: '#fff',
    // width: '80%',
    // padding: 30,
    borderRadius: 20,
  },
  loginTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff', // Cinza claro
  },
  button: {
    width: '100%',
    backgroundColor: '#8A79AF', // Roxo Lavanda
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  alertText: {
    color: 'red',
    marginHorizontal: 'auto',
    marginBottom: 5,
  }
});

export default LoginScreen;