import React from 'react';
import {Text, Button, Avatar} from 'react-native-paper';
import {View, TouchableOpacity, StyleSheet, TextInput} from 'react-native';

const RecuperarContraseña = ({navigation}) => {
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const [post, setPost] = React.useState(null);
  const [securityValue, setSecurityValue] = React.useState('');
  const [errorPasswordEmpty, setErrorPasswordEmpty] = React.useState('');
  const [errorPasswordLength, setErrorPasswordLength] = React.useState('');
  const [errorPasswordUpperCase, setErrorPasswordUpperCase] =
    React.useState('');
  const [errorRepeatPasswordEmpty, setErrorRepeatPasswordEmpty] =
    React.useState('');
  const [errorRepeatPassword, setErrorRepeatPassword] = React.useState('');

  const handleButtonPress = () => {
    if (password === '') {
      setErrorPasswordEmpty('Completar con una contraseña.');
    }
  };
  const handleRegistro = async () => {
    try {
      const formData = new FormData();
      formData.append('mail', 'ar.gabrielrojas@gmail.com');
      formData.append('otp', securityValue);
      formData.append('password', password);
      formData.append('repeatPassword', repeatPassword);

      const request = await fetch(
        'http://10.0.2.2:8080/v1/auths/resetPassword',
        {
          method: 'POST',
          body: formData,
        },
      );
      const response = await request.json();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Avatar.Image
        size={100}
        source={require('../assets/images/Verificado.png')}
        marginTop={20}
        marginLeft={15}
      />
      <Text style={styles.text} variant="headlineSmall">
        Verificar si recibiste el mail en tu casilla con el link.
      </Text>
      <TouchableOpacity>
        <Text style={styles.link}>Volver a enviar el mail</Text>
      </TouchableOpacity>
      <Text
        variant="headlineSmall"
        style={{marginTop: 10, display: 'flex', alignSelf: 'flex-start'}}>
        Codigo de Seguridad
      </Text>
      <TextInput
        style={styles.input}
        value={securityValue}
        onChangeText={securityValue => setSecurityValue(securityValue)}
        secureTextEntry={true}
      />
      <Text
        variant="headlineSmall"
        style={{marginTop: 10, display: 'flex', alignSelf: 'flex-start'}}>
        Contraseña
      </Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={password => setPassword(password)}
        secureTextEntry={true}
      />
      {errorPasswordEmpty ? (
        <Text style={{color: 'red', display: 'flex', alignSelf: 'flex-start'}}>
          {errorPasswordEmpty}
        </Text>
      ) : null}
      {errorPasswordLength ? (
        <Text style={{color: 'red', display: 'flex', alignSelf: 'flex-start'}}>
          {errorPasswordLength}
        </Text>
      ) : null}
      {errorPasswordUpperCase ? (
        <Text style={{color: 'red', display: 'flex', alignSelf: 'flex-start'}}>
          {errorPasswordUpperCase}
        </Text>
      ) : null}
      <Text
        variant="headlineSmall"
        style={{marginTop: 10, display: 'flex', alignSelf: 'flex-start'}}>
        Repetir Contraseña
      </Text>
      <TextInput
        style={styles.input}
        value={repeatPassword}
        onChangeText={repeatPassword => setRepeatPassword(repeatPassword)}
        secureTextEntry={true}
      />
      {errorRepeatPasswordEmpty ? (
        <Text style={{color: 'red', display: 'flex', alignSelf: 'flex-start'}}>
          {errorRepeatPasswordEmpty}
        </Text>
      ) : null}
      {errorRepeatPassword ? (
        <Text style={{color: 'red', display: 'flex', alignSelf: 'flex-start'}}>
          {errorRepeatPassword}
        </Text>
      ) : null}
      <Button style={styles.button} mode="contained" onPress={handleRegistro}>
        Volver
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#eff5f5',
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginTop: 5,
    backgroundColor: '#fff',
  },
  link: {
    color: '#0377ff',
    marginTop: 50,
  },
  button: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
});

export default RecuperarContraseña;
