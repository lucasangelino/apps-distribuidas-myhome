import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

const InmobiliariaProfile = () => {
  const fetchedInmobiliaria = {
    name: 'Inmobiliaria 1',
    email: 'some@gmail.com0',
    phone: '1234567890',
    address: 'Some address 123',
    cuit: '1234567890',
  }
  return <View style={styles.container}>
    <Text>InmobiliariaProfile</Text>
    <Text>{fetchedInmobiliaria.name}</Text>
    <Text>{fetchedInmobiliaria.email}</Text>
    <Text>{fetchedInmobiliaria.phone}</Text>
    <Text>{fetchedInmobiliaria.address}</Text>
    <Text>{fetchedInmobiliaria.cuit}</Text>


    <Button mode='outlined'>
      <Text>Cerrar sesion</Text>
    </Button>

    <Button mode='contained'>
      <Text>Eliminar cuenta</Text>
    </Button>
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    direction: 'column',
  },
});

export default InmobiliariaProfile;
