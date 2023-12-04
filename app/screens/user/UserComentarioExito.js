/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

const UserComentarioExito = ({navigation, route}) => {
  const {t} = useTranslation();
  console.log('comentario con exito');
  return (
    <View
      style={{
        height: '100%',
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
      }}>
      <Text style={{fontSize: 20}}>{t('Comentario guardado con exito')}</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('UserAlquileres')}>
        {t('Volver')}
      </Button>
    </View>
  );
};

export default UserComentarioExito;
