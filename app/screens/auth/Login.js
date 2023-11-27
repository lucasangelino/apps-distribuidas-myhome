/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Text, Button, Avatar, Divider} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import {AuthContext} from '../../context/AppContext';
import {BACKEND_URL, API_VERSION} from 'react-native-dotenv';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  webClientId:
    '177948603328-jv1f0k27kgu2578hkc9pofv2hvcpritv.apps.googleusercontent.com',
});

const Login = ({navigation}) => {
  const {setAuth} = React.useContext(AuthContext);

  const handleLoginWithGoogle = async () => {
    console.log('login');
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      console.log('userInfo.idToken', userInfo.idToken);

      const backLogin = await fetch(
        `${BACKEND_URL}/${API_VERSION}/authGoogle`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${userInfo.idToken}`,
          },
        },
      );
      const backLoginJson = await backLogin.json();
      await AsyncStorage.setItem('userToken', backLoginJson.tokenSend);

      setAuth({
        hasUser: true,
        loggedIn: true,
        user: {
          isInmobiliaria: false,
          contactMail: '',
          cuit: '',
          fantasyName: userInfo.user.name,
          firstName: userInfo.user.name,
          id: '',
          mail: '',
          phone: '',
          status: '',
          userType: 'User',
          name: '',
          email: userInfo.user.email,
          photo: userInfo.user.photo,
        },
      });
    } catch (error) {
      console.log('error', error.code);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  return (
    <View style={styles.container}>
      <Avatar.Image
        size={100}
        style={{marginTop: 30}}
        source={require('../../assets/images/Logo.png')}
        backgroundColor="#eff5f5"
      />
      <Text variant="headlineMedium" style={{marginTop: 140}}>
        Ingresar como Usuario
      </Text>
      <Button
        textColor="#fff"
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 25,
          backgroundColor: '#4285f4',
          borderRadius: 10,
        }}
        mode="contained"
        onPress={handleLoginWithGoogle}>
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
