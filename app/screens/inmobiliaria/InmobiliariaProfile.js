import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const InmobiliariaProfile = ({ navigation }) => {
  const fetchedInmobiliaria = {
    name: 'Inmobiliaria 1',
    email: 'some@gmail.com0',
    phone: '1234567890',
    address: 'Some address 123',
    cuit: '1234567890',
  }
  return <View style={styles.container}>
    <Text>InmobiliariaProfile</Text>
    <View style={styles.fieldName}>
      <Text>E-mail de usuario</Text>
      <View style={styles.fieldValue}>
        <Text>{fetchedInmobiliaria.email}</Text>
        <Ionicons name='pencil' size={20} color={'#ccc'} onPress={() => navigation.navigate("Home")} />
      </View>
    </View>

    <View style={styles.fieldName}>
      <Text>E-mail de contacto</Text>
      <View style={styles.fieldValue}>
        <Text>{fetchedInmobiliaria.email}</Text>
        <Ionicons name='pencil' size={20} color={'#ccc'} />
      </View>
    </View>

    <View style={styles.fieldName}>
      <Text>Contraseña</Text>
      <View style={styles.fieldValue}>
        <Text>{fetchedInmobiliaria.email}</Text>
        <Ionicons name='pencil' size={20} color={'#ccc'} />
      </View>
    </View>

    <View style={styles.fieldName}>
      <Text>Telefono</Text>
      <View style={styles.fieldValue}>
        <Text>{fetchedInmobiliaria.email}</Text>
        <Ionicons name='pencil' size={20} color={'#ccc'} />
      </View>
    </View>

    <View style={styles.fieldName}>
      <Text>CUIT</Text>
      <View style={styles.fieldValue}>
        <Text>{fetchedInmobiliaria.email}</Text>
        <Ionicons name='pencil' size={20} color={'#ccc'} />
      </View>
    </View>

    <View style={styles.fieldName}>
      <Text>Direccion</Text>
      <View style={styles.fieldValue}>
        <Text>{fetchedInmobiliaria.email}</Text>
        <Ionicons name='pencil' size={20} color={'#ccc'} />
      </View>
    </View>

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
  fieldName: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fieldValue: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  }
});

export default InmobiliariaProfile;
