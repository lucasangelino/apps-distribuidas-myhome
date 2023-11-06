/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, Button, Avatar} from 'react-native-paper';
import {View, TextInput, StyleSheet} from 'react-native';
import axios from 'axios';

const RecuperarMail = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [errorEmailEmpty, setErrorEmailEmpty] = useState('');
  const [post, setPost] = useState(null);

  const handleButtonPress = () => {
    if (email === '') {
      setErrorEmailEmpty('Completar con un email.');
    } else {
      setErrorEmailEmpty('');
    }
    if (errorEmailEmpty === '') {
      handleRecuperar();
    }
  };
  const handleRecuperar = () => {
    axios
      .post('http://10.0.2.2:8080/v1/auths/forgotPassword', {mail: email})
      .then(response => {
        console.log(response.data);
        setPost(response.data);
      })
      .catch(error => {
        console.log(error.message);
      });
    navigation.navigate('RecuperarContraseña', {
      email: email,
    });
  };
  return (
    <View style={styles.container}>
      <Avatar.Image
        size={100}
        source={require('../../assets/images/Logo.png')}
        marginTop={60}
        backgroundColor="#eff5f5"
      />
      <Text variant="headlineMedium" style={{marginTop: 20}}>
        Recuperar tu Usuario
      </Text>
      <Text
        variant="headlineMedium"
        style={{marginTop: 135, display: 'flex', alignSelf: 'flex-start'}}>
        Email
      </Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={email => setEmail(email)}
      />
      {errorEmailEmpty ? (
        <Text style={{color: 'red', display: 'flex', alignSelf: 'flex-start'}}>
          {errorEmailEmpty}
        </Text>
      ) : null}
      <Button
        style={styles.button}
        mode="contained"
        onPress={handleButtonPress}>
        Recuperar
      </Button>
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
    marginTop: 5,
    backgroundColor: '#fff',
    color: '#000',
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
    borderRadius: 10,
  },
});

export default RecuperarMail;
