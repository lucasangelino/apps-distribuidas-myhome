/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';

const UserComentarioExito = ({navigation, route}) => {
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
      <Text style={{fontSize: 20}}>Comentario guardado con exito</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('UserAlquileres')}>
        Volver
      </Button>
    </View>
  );
};

export default UserComentarioExito;
