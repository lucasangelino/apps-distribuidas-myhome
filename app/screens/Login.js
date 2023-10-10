import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingresa como usuario</Text>
      <GoogleLoginBtn />
      <SeparatorLine />
      <Text style={styles.title}>Ingresa como Inmobiliaria</Text>
      <Text style={styles.userLoginText}>Usuario</Text>
      <TextInput style={styles.input} placeholder="Email" />
      <Text style={styles.userLoginText}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor="#000"
      />
      <LoginBtn />
      <View style={styles.otherAction}>
        <Text style={styles.otherActionText}>¿Olvidaste tu contraseña?</Text>
        <Text style={styles.otherActionText}>No tengo cuenta</Text>
      </View>
    </View>
  );
}

function GoogleLoginBtn() {
  return (
    <TouchableOpacity
      style={styles.loginWithGoogleBtn}
      onPress={() => console.log('googleBtnPressed')}>
      <Text style={styles.loginWithGoogleBtnText}>CONTINUAR CON GOOGLE</Text>
    </TouchableOpacity>
  );
}

function LoginBtn() {
  return (
    <TouchableOpacity
      style={styles.loginBtn}
      onPress={() => console.log('LoginBtnPressed')}>
      <Text style={styles.loginBtnText}>INGRESAR</Text>
    </TouchableOpacity>
  );
}

const SeparatorLine = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  otherAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  otherActionText: {
    color: '#000',
    fontSize: 12,
    alignSelf: 'flex-start',
  },
  container: {
    flex: 1,
    backgroundColor: '#EFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    color: 'black',
    fontSize: 20,
  },
  loginBtn: {
    alignItems: 'center',
    backgroundColor: '#EB6440',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    paddingVertical: 15,
  },
  loginBtnText: {
    color: '#fff',
  },
  loginWithGoogleBtn: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    borderWidth: 2,
    borderColor: '#989898',
  },
  loginWithGoogleBtnText: {
    color: '#000',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#000',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  input: {
    height: 40,
    width: '100%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#989898',
    backgroundColor: '#fff',
  },
  userLoginText: {
    color: '#000',
    fontSize: 16,
    alignSelf: 'flex-start',
  },
});

export default Login;
