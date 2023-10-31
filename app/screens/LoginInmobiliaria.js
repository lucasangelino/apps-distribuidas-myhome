import React, {useState} from 'react';
import {Text, Button, Avatar} from 'react-native-paper';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import axios from 'axios';

const LoginInmobiliaria = ({navigation}) => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleLogin = (credentials) => {
    axios.post('localhost:3000/api/login', {
      usuario: usuario,
      contraseña: contraseña,
    });
  };

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={100}
        source={require('../assets/images/Logo.png')}
        marginTop={30}
      />
      <Text variant="headlineMedium" style={{marginLeft: 5, marginTop: 50}}>
        Ingresar como Inmobiliaria
      </Text>
      <Text
        variant="headlineMedium"
        style={{marginTop: 30, display: 'flex', alignSelf: 'flex-start'}}>
        Usuario
      </Text>
      <TextInput
        style={styles.input}
        value={usuario}
        onChangeText={usuario => setUsuario(usuario)}
      />
      <Text
        variant="headlineMedium"
        style={{
          marginTop: 30,
          display: 'flex',
          alignSelf: 'flex-start',
        }}>
        Contraseña
      </Text>
      <TextInput
        style={styles.input}
        value={contraseña}
        onChangeText={contraseña => setContraseña(contraseña)}
        secureTextEntry={true}
      />
      <Button style={styles.button} mode="contained" onPress={handleLogin}>
        Ingresar
      </Button>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <TouchableOpacity>
          <Text
            style={{
              color: '#0377ff',
              marginTop: 10,
              marginRight: 110,
            }}
            onPress={() => navigation.navigate('RegistrarUsuarioInm')}>
            No tengo cuenta
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{color: '#0377ff', marginTop: 10}}
            onPress={() => navigation.navigate('Recuperar')}>
            Olvidé mi contraseña
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#eff5f5',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
    borderRadius: 10,
  },
});

export default LoginInmobiliaria;
