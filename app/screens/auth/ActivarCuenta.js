/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

const ActivarCuenta = ({navigation}) => {
  const {t} = useTranslation();
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
        {t('Revisa tu correo. Te enviamos un email para que valides tu cuenta')}
      </Text>
      <Button
        style={{width: '100%'}}
        mode="contained"
        onPress={() => navigation.navigate('LoginInmobiliaria')}>
        {t('Aceptar')}
      </Button>
    </View>
  );
};

export default ActivarCuenta;
