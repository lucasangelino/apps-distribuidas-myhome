import React, {useState} from 'react';
import {Text, Button, Avatar} from 'react-native-paper';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import axios from 'axios';

const LoginInmobiliaria = ({navigation}) => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  // axios({method: 'get', url: `${baseUrl}/api/users/1`}).then(response => {
  //   console.log(response.data);
  // });
  const [post, setPost] = useState(null);
  const [errorMailEmpty, setErrorMailEmpty] = useState('');
  const [errorWrongMail, setErrorWrongMail] = useState('');
  const [errorPasswordEmpty, setErrorPasswordEmpty] = useState('');

  const handleButtonPress = () => {
    if (mail === '') {
      setErrorMailEmpty('Completar con un usuario.');
    } else {
      setErrorMailEmpty('');
      var validateEmail = 0;
      for (let i = 0; i < mail.length; i++) {
        if (mail[i] === '@') {
          validateEmail += 1;
        }
      }
      if (validateEmail !== 1) {
        setErrorWrongMail('El usuario ingresado no es válido.');
      } else {
        setErrorWrongMail('');
      }
    }
    if (password === '') {
      setErrorPasswordEmpty('Completar con una contraseña.');
    } else {
      setErrorPasswordEmpty('');
    }

    if (
      errorMailEmpty === '' &&
      errorPasswordEmpty === '' &&
      errorWrongMail === ''
    ) {
      handleLogin();
    }
  };

  const handleLogin = () => {
    axios
      .post('http://10.0.2.2:8080/v1/auths', {
        mail: mail,
        password: password,
      })
      .then(response => {
        console.log(response.data);
        setPost(response.data);
      })
      .catch(error => {
        console.log(error.message);
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
        value={mail}
        onChangeText={mail => setMail(mail)}
      />
      {errorMailEmpty ? (
        <Text style={{color: 'red', display: 'flex', alignSelf: 'flex-start'}}>
          {errorMailEmpty}
        </Text>
      ) : null}
      {errorWrongMail ? (
        <Text style={{color: 'red', display: 'flex', alignSelf: 'flex-start'}}>
          {errorWrongMail}
        </Text>
      ) : null}
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
        value={password}
        onChangeText={password => setPassword(password)}
        secureTextEntry={true}
      />
      {errorPasswordEmpty ? (
        <Text style={{color: 'red', display: 'flex', alignSelf: 'flex-start'}}>
          {errorPasswordEmpty}
        </Text>
      ) : null}
      <Button
        style={styles.button}
        mode="contained"
        onPress={handleButtonPress}>
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
