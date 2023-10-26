import React, {useState} from 'react';
import {Text, Button, Avatar} from 'react-native-paper';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

const LoginInmobiliaria = ({navigation}) => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  return (
    <View style={styles.container}>
      <Avatar.Image
        size={100}
        source={require('../assets/images/Logo.png')}
        marginTop={20}
        marginLeft={15}
      />
      <Text variant="headlineMedium" style={{marginLeft: 10, marginTop: 20}}>
        Ingresar como Inmobiliaria
      </Text>
      <Text variant="headlineMedium" style={{marginLeft: 10, marginTop: 30}}>
        Usuario
      </Text>
      <TextInput
        style={styles.input}
        value={usuario}
        onChangeText={usuario => setUsuario(usuario)}
      />
      <Text variant="headlineMedium" style={{marginLeft: 10, marginTop: 30}}>
        Contraseña
      </Text>
      <TextInput
        style={styles.input}
        value={contraseña}
        onChangeText={contraseña => setContraseña(contraseña)}
        secureTextEntry={true}
      />
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate('Home')}>
        Registrar
      </Button>
      <TouchableOpacity>
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('RegistrarUsuarioInm')}>
          No tengo cuenta
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('Recuperar')}>
          Olvidé mi contraseña
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  button: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
});

export default LoginInmobiliaria;
