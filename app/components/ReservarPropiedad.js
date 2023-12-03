import * as React from 'react';
import {View, StyleSheet, TextInput, SafeAreaView} from 'react-native';
import {Text, Button, Avatar} from 'react-native-paper';
import uuid from 'react-native-uuid';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {priceFormater} from '../utils/utils';

const ReservarPropiedad = ({route, navigation}) => {
  const {propiedad} = route.params;
  const {contract_types} = propiedad;
  const {price = 0} = contract_types.length > 0 ? contract_types[0] : {};
  const reservaMonto = price / 2;
  return (
    <SafeAreaView>
      <View style={StyleSheet.container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 20,
            alignItems: 'center',
          }}>
          <Ionicons
            name="arrow-back-outline"
            size={28}
            color={'#212121'}
            marginLeft={10}
            onPress={() =>
              navigation.navigate('PropiedadDetail', {property: propiedad})
            }
          />
          <Avatar.Image
            size={50}
            source={require('../assets/images/Logo.png')}
            backgroundColor="#eff5f5"
            style={{marginLeft: 80}}
          />
          <Text style={{fontSize: 20}}>MyHome</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            width: '95%',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Finalizar Reservar
          </Text>
          <View style={{marginTop: 20}}>
            <Text variant="bodyLarge" style={{marginBottom: 7}}>
              Número de la Tarjeta
            </Text>
            <TextInput keyboardType="numeric" style={styles.input} />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 35,
              width: '100%',
              marginTop: 10,
            }}>
            <View
              style={{display: 'flex', flexDirection: 'column', width: '45%'}}>
              <Text variant="bodyLarge" style={{marginBottom: 7}}>
                Nombre
              </Text>
              <TextInput style={styles.input} />
            </View>
            <View
              style={{display: 'flex', flexDirection: 'column', width: '45%'}}>
              <Text variant="bodyLarge" style={{marginBottom: 7}}>
                Apellido
              </Text>
              <TextInput style={styles.input} />
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 35,
              width: '100%',
              marginTop: 10,
            }}>
            <View
              style={{display: 'flex', flexDirection: 'column', width: '45%'}}>
              <Text variant="bodyLarge" style={{marginBottom: 7}}>
                Fecha de Expiración
              </Text>
              <TextInput keyboardType="numeric" style={styles.input} />
            </View>
            <View
              style={{display: 'flex', flexDirection: 'column', width: '45%'}}>
              <Text variant="bodyLarge" style={{marginBottom: 7}}>
                CVC/CVV
              </Text>
              <TextInput keyboardType="numeric" style={styles.input} />
            </View>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            width: '100%',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Resumen</Text>
          <View
            style={{display: 'flex', flexDirection: 'column', marginTop: 15}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Propiedad:</Text>
            <Location>
              {propiedad.propertyType + ' en ' + propiedad.location?.district}
            </Location>
          </View>
          <View
            style={{display: 'flex', flexDirection: 'column', marginTop: 7}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Valor Alquiler:
            </Text>
            <Price>{`${priceFormater({price})}`}</Price>
          </View>
          <View
            style={{display: 'flex', flexDirection: 'column', marginTop: 7}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Monto Reserva:
            </Text>
            <Price>{`${priceFormater({price: reservaMonto})}`}</Price>
          </View>
        </View>
        <View style={{width: '90%', marginTop: 25, alignSelf: 'center'}}>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate('ReservaExitosa')}>
            Reservar
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
const Location = ({children}) => {
  return (
    <View style={styles.smallDesc}>
      <Text style={styles.locationText}>{children}</Text>
    </View>
  );
};
const Price = ({children}) => <Text variant="headlineMedium">{children}</Text>;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#eff5f5',
    width: '100%',
  },
  input: {
    color: '#000',
    width: '100%',
    height: 40,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
});
export default ReservarPropiedad;
