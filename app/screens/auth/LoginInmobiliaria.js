/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {Text, Button, Avatar} from 'react-native-paper';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {AuthContext} from '../../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BACKEND_URL, API_VERSION} from 'react-native-dotenv';
import {useTranslation} from 'react-i18next';

const LoginInmobiliaria = ({navigation}) => {
  const {_, setAuth} = useContext(AuthContext);

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMailEmpty, setErrorMailEmpty] = useState('');
  const [errorWrongMail, setErrorWrongMail] = useState('');
  const [errorPasswordEmpty, setErrorPasswordEmpty] = useState('');
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const {t} = useTranslation();

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

  const handleLogin = async () => {
    setWrongCredentials(false);
    try {
      const req = await fetch(`${BACKEND_URL}/${API_VERSION}/auths`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mail: mail,
          password: password,
        }),
      });
      const res = await req.json();
      if (res.ok) {
        const jsonValue = JSON.stringify({
          id: 1,
          isInmobiliaria: true,
          name: '',
          email: 'res.mail',
          photoUrl: '',
          token: res.token,
        });

        await AsyncStorage.setItem('userToken', jsonValue);

        setAuth({
          hasUser: true,
          loggedIn: true,
          user: {
            contactMail: '',
            cuit: '',
            fantasyName: '',
            firstName: '',
            id: '',
            mail: '',
            phone: '',
            photo: '',
            status: '',
            userType: 'Inmobiliaria',
            name: '',
            email: '',
          },
        });
      } else {
        setWrongCredentials(true);
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={100}
        source={require('../../assets/images/Logo.png')}
        marginTop={30}
        backgroundColor="#eff5f5"
      />
      <Text variant="headlineMedium" style={{marginLeft: 5, marginTop: 50}}>
        {t('Ingresar como Inmobiliaria')}
      </Text>
      <Text
        variant="headlineMedium"
        style={{marginTop: 30, display: 'flex', alignSelf: 'flex-start'}}>
        {t('Usuario')}
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
        {t('Contraseña')}
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

      {wrongCredentials ? (
        <Text style={{color: 'red', display: 'flex', alignSelf: 'flex-start'}}>
          {t('Usuario o contraseña incorrectos.')}
        </Text>
      ) : null}
      <Button
        style={styles.button}
        mode="contained"
        onPress={handleButtonPress}>
        {t('Ingresar')}
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
            {t('No tengo cuenta')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{color: '#0377ff', marginTop: 10}}
            onPress={() => navigation.navigate('RecuperarMail')}>
            {t('Olvidé mi contraseña')}
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
    color: '#000',
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
