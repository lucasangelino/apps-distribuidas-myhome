import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Button} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const InmobiliariaProfile = ({navigation}) => {
  const fetchedInmobiliaria = {
    name: 'Inmobiliaria 1',
    email: 'some@gmail.com0',
    phone: '1234567890',
    address: 'Some address 123',
    cuit: '1234567890',
  };
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{fetchedInmobiliaria.name}</Text>
      </View>
      <View style={styles.fieldName}>
        <Text>E-mail de usuario</Text>
        <View style={styles.fieldValue}>
          <Text>{fetchedInmobiliaria.email}</Text>
          <Ionicons
            name="pencil"
            size={20}
            color={'#ccc'}
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      </View>

      <View style={styles.fieldName}>
        <Text>E-mail de contacto</Text>
        <View style={styles.fieldValue}>
          <Text>{fetchedInmobiliaria.email}</Text>
          <Ionicons name="pencil" size={20} color={'#ccc'} />
        </View>
      </View>

      <View style={styles.fieldName}>
        <Text>Contraseña</Text>
        <View style={styles.fieldValue}>
          <Text>{fetchedInmobiliaria.email}</Text>
          <Ionicons name="pencil" size={20} color={'#ccc'} />
        </View>
      </View>

      <View style={styles.fieldName}>
        <Text>Telefono</Text>
        <View style={styles.fieldValue}>
          <Text>{fetchedInmobiliaria.email}</Text>
          <Ionicons name="pencil" size={20} color={'#ccc'} />
        </View>
      </View>

      <View style={styles.fieldName}>
        <Text>CUIT</Text>
        <View style={styles.fieldValue}>
          <Text>{fetchedInmobiliaria.email}</Text>
          <Ionicons name="pencil" size={20} color={'#ccc'} />
        </View>
      </View>

      <View style={styles.fieldName}>
        <Text>Direccion</Text>
        <View style={styles.fieldValue}>
          <Text>{fetchedInmobiliaria.email}</Text>
          <Ionicons name="pencil" size={20} color={'#ccc'} />
        </View>
      </View>

      <Button mode="outlined">
        <Text>Cerrar sesion</Text>
      </Button>

      <Button mode="contained">
        <Text>Eliminar cuenta</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    direction: 'column',
    padding: 10,
    backgroundColor: '#fff',
  },
  fieldName: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fieldValue: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  name: {
    fontSize: 30,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#EB6440',
  },
});

export default InmobiliariaProfile;
