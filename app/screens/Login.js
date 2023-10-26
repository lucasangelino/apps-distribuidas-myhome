import * as React from 'react';
import {Text, Button, Avatar} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Avatar.Image size={100} source={require('../assets/images/Logo.png')} />
      <Text variant="headlineMedium" style={{marginLeft: 10, marginTop:30}}>
        Ingresar como Usuario
      </Text>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate('Home')}>
        Continuar con Google
      </Button>
      <Text variant="headlineMedium" style={{marginLeft: 10, marginTop:30}}>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
