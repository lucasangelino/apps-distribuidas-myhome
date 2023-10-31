import React, {useState} from 'react';
import {Text, Button, Avatar, Checkbox} from 'react-native-paper';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

const RegistrarUsuarioInm = ({navigation}) => {
  const [numeroCuil, setNumero] = useState('');
  const [email, setEmail] = useState('');
  const [nombreImb, setNombreImb] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [checked, setChecked] = React.useState(false);

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={100}
        style={{marginTop: 30}}
        source={require('../assets/images/Logo.png')}
      />
      <Text variant="headlineSmall" style={{marginLeft: 5}}>
        Registrate como Inmobiliaria
      </Text>
      <Text
        variant="headlineSmall"
        style={{marginTop: 10, display: 'flex', alignSelf: 'flex-start'}}>
        Email
      </Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <Text
        variant="headlineSmall"
        style={{marginTop: 10, display: 'flex', alignSelf: 'flex-start'}}>
        Nombre de la Inmobiliaria
      </Text>
      <TextInput
        style={styles.input}
        value={nombreImb}
        onChangeText={nombreImb => setNombreImb(nombreImb)}
      />
      <Text
        variant="headlineSmall"
        style={{marginTop: 10, display: 'flex', alignSelf: 'flex-start'}}>
        CUIT
      </Text>
      <TextInput
        style={styles.inputCuil}
        value={numeroCuil}
        onChangeText={numeroCuil => setNumero(numeroCuil)}
      />
      <Text
        variant="headlineSmall"
        style={{marginTop: 10, display: 'flex', alignSelf: 'flex-start'}}>
        Contraseña
      </Text>
      <TextInput
        style={styles.input}
        value={contraseña}
        onChangeText={contraseña => setContraseña(contraseña)}
        secureTextEntry={true}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
          style={styles.checkbox}
        />
        <Text style={{marginRight: 3.3}}>Acepto los</Text>
        <TouchableOpacity>
          <Text style={{color: '#0377ff'}}>Términos y Condiciones de Uso</Text>
        </TouchableOpacity>
      </View>

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
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#eff5f5',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  inputCuil: {
    width: '100%',
    height: 40,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    keyboardType: 'numeric',
  },
  link: {
    color: '#0377ff',
    marginTop: 50,
  },
  checkbox: {
    height: 100,
    width: 100,
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
});

export default RegistrarUsuarioInm;
