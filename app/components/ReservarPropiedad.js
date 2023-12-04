import React, {useState} from 'react';
import {View, StyleSheet, TextInput, SafeAreaView} from 'react-native';
import {Text, Button, Avatar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {priceFormater} from '../utils/utils';
import {BACKEND_URL, API_VERSION} from 'react-native-dotenv';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

const ReservarPropiedad = ({route, navigation}) => {
  const {propiedad} = route.params;
  const {contract_types} = propiedad;
  const {price = 0} = contract_types.length > 0 ? contract_types[0] : {};
  const reservaMonto = price / 2;

  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [errorNumeroTarjetaEmpty, setErrorNumeroTarjetaEmpty] = useState('');
  const [errorNumeroTarjetaLength, setErrorNumeroTarjetaLength] = useState('');
  const [nombre, setNombre] = useState('');
  const [errorNombreEmpty, setErrorNombreEmpty] = useState('');
  const [apellido, setApellido] = useState('');
  const [errorApellidoEmpty, setErrorApellidoEmpty] = useState('');
  const [fechaExpiracion, setFechaExpiracion] = useState('');
  const [errorFechaExpiracionEmpty, setErrorFechaExpiracionEmpty] =
    useState('');
  const [errorFechaExpiracionLength, setErrorFechaExpiracionLength] =
    useState('');
  const [cvc, setCvc] = useState('');
  const [errorCvcEmpty, setErrorCvcEmpty] = useState('');
  const [errorCvcLength, setErrorCvcLength] = useState('');
  const {t} = useTranslation();

  const handleButtonPress = () => {
    if (numeroTarjeta === '') {
      setErrorNumeroTarjetaEmpty(t('El número de la tarjeta es requerido.'));
    } else {
      setErrorNumeroTarjetaEmpty('');
      if (numeroTarjeta.length !== 16) {
        setErrorNumeroTarjetaLength(
          t('El número de la tarjeta debe tener 16 dígitos.'),
        );
      } else {
        setErrorNumeroTarjetaLength('');
      }

      if (nombre === '') {
        setErrorNombreEmpty(t('El nombre es requerido'));
      } else {
        setErrorNombreEmpty('');
      }

      if (apellido === '') {
        setErrorApellidoEmpty(t('El apellido es requerido'));
      } else {
        setErrorApellidoEmpty('');
      }

      if (fechaExpiracion === '') {
        setErrorFechaExpiracionEmpty(t('La fecha de expiración es requerida'));
      } else {
        setErrorFechaExpiracionEmpty('');
        if (fechaExpiracion.length !== 4) {
          setErrorFechaExpiracionLength(
            t('La fecha de expiración debe ser de 4 caracteres'),
          );
        } else {
          setErrorFechaExpiracionLength('');
        }
      }

      if (cvc === '') {
        setErrorCvcEmpty(t('El cvc es requerido'));
      } else {
        setErrorCvcEmpty('');
        if (cvc.length !== 3) {
          setErrorCvcLength(t('El cvc debe ser de 3 caracteres'));
        } else {
          setErrorCvcLength('');
        }
      }

      if (
        numeroTarjeta !== '' &&
        numeroTarjeta.length === 16 &&
        nombre !== '' &&
        apellido !== '' &&
        fechaExpiracion !== '' &&
        fechaExpiracion.length === 4 &&
        cvc !== '' &&
        cvc.length === 3
      ) {
        handleReservar();
      }
    }
  };

  const handleReservar = async () => {
    const jsonValue = await AsyncStorage.getItem('userToken');
    const userData = JSON.parse(jsonValue);
    const token = userData.token;

    try {
      const req = await fetch(`${BACKEND_URL}/${API_VERSION}/contracts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          contractTypeId: propiedad.contract_types[0].id,
        }),
      });
      const res = await req.json();
      if (res.ok) {
        navigation.navigate('ReservaExitosa');
        console.log(res);
      } else {
        console.log('Error al contactar');
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            {t('Finalizar Reservar')}
          </Text>
          <View style={{marginTop: 20}}>
            <Text variant="bodyLarge" style={{marginBottom: 7}}>
              {t('Número de la Tarjeta')}
            </Text>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              value={numeroTarjeta}
              onChangeText={numeroTarjeta => setNumeroTarjeta(numeroTarjeta)}
            />
          </View>
          {errorNumeroTarjetaEmpty ? (
            <Text
              style={{
                color: 'red',
                display: 'flex',
                alignSelf: 'flex-start',
              }}>
              {errorNumeroTarjetaEmpty}
            </Text>
          ) : null}
          {errorNumeroTarjetaLength ? (
            <Text
              style={{
                color: 'red',
                display: 'flex',
                alignSelf: 'flex-start',
              }}>
              {errorNumeroTarjetaLength}
            </Text>
          ) : null}
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
                {t('Nombre')}
              </Text>
              <TextInput
                style={styles.input}
                value={nombre}
                onChangeText={nombre => setNombre(nombre)}
              />
            </View>
            <View
              style={{display: 'flex', flexDirection: 'column', width: '45%'}}>
              <Text variant="bodyLarge" style={{marginBottom: 7}}>
                {t('Apellido')}
              </Text>
              <TextInput
                style={styles.input}
                value={apellido}
                onChangeText={apellido => setApellido(apellido)}
              />
            </View>
          </View>
          {errorNombreEmpty ? (
            <Text
              style={{
                color: 'red',
                display: 'flex',
                alignSelf: 'flex-start',
              }}>
              {errorNombreEmpty}
            </Text>
          ) : null}
          {errorApellidoEmpty ? (
            <Text
              style={{
                color: 'red',
                display: 'flex',
                alignSelf: 'flex-start',
              }}>
              {errorApellidoEmpty}
            </Text>
          ) : null}
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
                {t('Fecha de Expiración')}
              </Text>
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                value={fechaExpiracion}
                onChangeText={fechaExpiracion =>
                  setFechaExpiracion(fechaExpiracion)
                }
              />
            </View>
            <View
              style={{display: 'flex', flexDirection: 'column', width: '45%'}}>
              <Text variant="bodyLarge" style={{marginBottom: 7}}>
                CVC/CVV
              </Text>
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                value={cvc}
                secureTextEntry={true}
                onChangeText={cvc => setCvc(cvc)}
              />
            </View>
          </View>
          {errorFechaExpiracionEmpty ? (
            <Text
              style={{color: 'red', display: 'flex', alignSelf: 'flex-start'}}>
              {errorFechaExpiracionEmpty}
            </Text>
          ) : null}
          {errorFechaExpiracionLength ? (
            <Text
              style={{color: 'red', display: 'flex', alignSelf: 'flex-start'}}>
              {errorFechaExpiracionLength}
            </Text>
          ) : null}
          {errorCvcEmpty ? (
            <Text
              style={{color: 'red', display: 'flex', alignSelf: 'flex-start'}}>
              {errorCvcEmpty}
            </Text>
          ) : null}
          {errorCvcLength ? (
            <Text
              style={{color: 'red', display: 'flex', alignSelf: 'flex-start'}}>
              {errorCvcLength}
            </Text>
          ) : null}
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
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{t('Resumen')}</Text>
          <View
            style={{display: 'flex', flexDirection: 'column', marginTop: 15}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {t('Propiedad:')}
            </Text>
            <Location>
              {propiedad.propertyType + ' en ' + propiedad.location?.district}
            </Location>
          </View>
          <View
            style={{display: 'flex', flexDirection: 'column', marginTop: 7}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {t('Valor Alquiler:')}
            </Text>
            <Price>{`${priceFormater({price})}`}</Price>
          </View>
          <View
            style={{display: 'flex', flexDirection: 'column', marginTop: 7}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {t('Monto Reserva:')}
            </Text>
            <Price>{`${priceFormater({price: reservaMonto})}`}</Price>
          </View>
        </View>
        <View style={{width: '90%', marginTop: 25, alignSelf: 'center'}}>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => handleButtonPress()}>
            {t('Reservar')}
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
