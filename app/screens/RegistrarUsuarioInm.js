import React, {useState} from 'react';
import {Text, Button, Avatar} from 'react-native-paper';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

const RegistrarUsuarioInm = ({navigation}) => {
  const [numeroCuil, setNumero] = useState('');
  const [email, setEmail] = useState('');
  const [nombreImb, setNombreImb] = useState('');
  const [contraseña, setContraseña] = useState('');

  return (
    <View style={styles.container}>
      <Avatar.Image size={100} source={require('../assets/images/Logo.png')} />
      <Text variant="headlineMedium" style={{marginLeft: 10}}>
        Email
      </Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <Text variant="headlineMedium" style={{marginLeft: 10}}>
        Nombre de la Inmobiliaria
      </Text>
      <TextInput
        style={styles.input}
        value={nombreImb}
        onChangeText={nombreImb => setNombreImb(nombreImb)}
        secureTextEntry={true}
      />
      <Text variant="headlineMedium" style={{marginLeft: 10}}>
        CUIT
      </Text>
      <TextInput
        style={styles.inputCuil}
        value={numeroCuil}
        onChangeText={numeroCuil => setNumero(numeroCuil)}
        secureTextEntry={true}
      />
      <Text variant="headlineMedium" style={{marginLeft: 10}}>
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
        onPress={() => console.log('Pressed')}>
        Registrar
      </Button>
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
    justifyContent: 'center',
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
  inputCuil: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    keyboardType: 'numeric',
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
  },
});

export default RegistrarUsuarioInm;
