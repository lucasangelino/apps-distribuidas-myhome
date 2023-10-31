import * as React from 'react';
import {Text, Button, Avatar} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import axios from 'axios';

const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Avatar.Image
        size={100}
        style={{marginTop: 30}}
        source={require('../assets/images/Logo.png')}
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
        }}
        mode="contained"
        onPress={() => navigation.navigate('Home')}>
        Continuar con Google
      </Button>
      <Text variant="headlineSmall" style={{marginLeft: 10, marginTop: 30}}>
        ó
      </Text>
      <Text variant="headlineMedium" style={{marginLeft: 10, marginTop: 30}}>
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
  },
});

export default Login;
