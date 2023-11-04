import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button, Divider} from 'react-native-paper';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {AuthContext} from '../context/AppContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

GoogleSignin.configure({
  webClientId:
    '177948603328-jv1f0k27kgu2578hkc9pofv2hvcpritv.apps.googleusercontent.com',
});

const Login = ({navigation}) => {
  const {setAuth} = React.useContext(AuthContext);

  const loginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo);
      setAuth({
        hasUser: true,
        loggedIn: true,
        user: {
          isInmobiliaria: false,
          name: userInfo.user.name,
          email: userInfo.user.email,
          photoUrl: userInfo.user.photo,
          idToken: userInfo.idToken,
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

  const logoutWithGoogle = async () => {
    console.log('logout');
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setAuth({userInfo: null}); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  const loginWithInmobiliaria = () => {
    console.log('loginWithInmobiliaria');
    setAuth({
      hasUser: true,
      loggedIn: true,
      user: {
        isInmobiliaria: true,
        name: 'Enermax Inmobiliaria',
        email: 'enermax@gmail.com',
        photoUrl: '',
        idToken: '123456789_enermax_token',
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginView}>
        <Text variant="headlineSmall">Ingresar como usuario</Text>
        <Button style={styles.googleButton} onPress={loginWithGoogle}>
          <Ionicons name={'logo-google'} size={16} color={'#ccc'} />
          <Text style={styles.googleButtonText}>CONTINUAR CON GOOGLE</Text>
        </Button>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.loginView}>
        <Text variant="headlineSmall">Ingresar como Inmobiliaria</Text>
        <Button style={styles.userButton} onPress={loginWithInmobiliaria}>
          <Text style={styles.googleButtonText}>INGRESAR</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    gap: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loginView: {
    width: '100%',
    display: 'flex',
    gap: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  googleButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#4285F4',
    display: 'flex',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  googleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  userButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#EB6440',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
  },
});

export default Login;
