/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';

const ActivarCuenta = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        width: '100%',
        display: 'flex',
        gap: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <Text variant="titleMedium" style={{color: '#000'}}>
        Revisa tu correo. Te enviamos un email para que valides tu cuenta
      </Text>
      <Button
        style={{width: '100%'}}
        mode="contained"
        onPress={() => navigation.navigate('LoginInmobiliaria')}>
        Aceptar
      </Button>
    </View>
  );
};

export default ActivarCuenta;
