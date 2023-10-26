import * as React from 'react';
import {Text, Button, Avatar} from 'react-native-paper';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

const LoginInmobiliaria = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Avatar.Image
        size={50}
        source={require('../assets/images/icons/white_logo.svg')}
      />
      <Text variant="headlineMedium" style={{marginLeft: 10}}>
        Usuario
      </Text>
      <TextInput style={styles.input} />
      <Text variant="headlineMedium" style={{marginLeft: 10}}>
        Contraseña
      </Text>
      <TextInput style={styles.input} secureTextEntry={true} />
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => console.log('Pressed')}>
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

export default LoginInmobiliaria;
