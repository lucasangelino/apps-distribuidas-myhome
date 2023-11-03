import React, {useState} from 'react';
import {Text, Button, Avatar} from 'react-native-paper';
import {View, TextInput, StyleSheet} from 'react-native';

const CambiarContraseña = ({navigation}) => {
  const [nuevaContraseña, setNuevaContra] = useState('');
  const [confirmarContraseña, setConfirmarContra] = useState('');
  const [mostrarContraseña, setMostrarContra] = useState(true);
  return (
    <View style={styles.container}>
      <Avatar.Image
        size={100}
        source={require('../assets/images/Logo.png')}
        marginTop={20}
        marginLeft={15}
      />
      <Text variant="headlineMedium" style={{marginLeft: 10, marginTop: 20}}>
        Cambio de Contraseña
      </Text>
      <Text variant="headlineMedium" style={{marginLeft: 10, marginTop: 30}}>
        Nueva Contraseña
      </Text>
      <TextInput
        style={styles.input}
        value={nuevaContraseña}
        onChangeText={nuevaContraseña => setNuevaContra(nuevaContraseña)}
      />
      <Text variant="headlineMedium" style={{marginLeft: 10, marginTop: 30}}>
        confirmar Contraseña
      </Text>
      <TextInput
        style={styles.input}
        value={confirmarContraseña}
        onChangeText={confirmarContraseña =>
          setConfirmarContra(confirmarContraseña)
        }
        secureTextEntry={mostrarContraseña}
      />
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate('Home')}>
        Cambiar Contraseña
      </Button>
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

export default CambiarContraseña;
