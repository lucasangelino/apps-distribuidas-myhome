import * as React from 'react';
import {Text, Button, Avatar, Divider} from 'react-native-paper';
import {View, StyleSheet, TouchableHighlight} from 'react-native';
import axios from 'axios';

const Login = ({navigation}) => {
  const handleButtonPress = () => {
    console.log('Presionado');
  };
  return (
    <View style={styles.container}>
      <Avatar.Image
        size={100}
        style={{marginTop: 30}}
        source={require('../assets/images/Logo.png')}
        backgroundColor="#eff5f5"
      />
      <Text variant="headlineMedium" style={{marginTop: 140}}>
        Ingresar como Usuario
      </Text>
      <Button
        textColor="#000"
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 25,
          backgroundColor: '#fff',
          borderRadius: 10,
        }}
        mode="contained"
        onPress={() => navigation.navigate('Home')}>
        Continuar con Google
      </Button>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 30,
          alignItems: 'center',
        }}>
        <Divider style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        <Text
          variant="headlineSmall"
          style={{marginLeft: 8, marginRight: 8, marginBottom: 5}}>
          o
        </Text>
        <Divider style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      </View>
      <Text variant="headlineMedium" style={{marginTop: 30}}>
        Ingresar como Inmobiliaria
      </Text>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate('LoginInmobiliaria')}>
        Ingresar
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
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 10,
  },
});

export default Login;
