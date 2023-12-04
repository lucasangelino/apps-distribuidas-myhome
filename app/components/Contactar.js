import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import {Text, Button, Avatar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BACKEND_URL, API_VERSION} from 'react-native-dotenv';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Contactar = ({route, navigation}) => {
  const {propiedad} = route.params;
  const [message, setMessage] = useState('');
  const [errorMessageEmpty, setErrorMessageEmpty] = useState('');
  const [name, setName] = useState('');
  const [errorNameEmpty, setErrorNameEmpty] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorPhoneNumberEmpty, setErrorPhoneNumberEmpty] = useState('');
  const [errorPhoneNumberLength, setErrorPhoneNumberLength] = useState('');

  const handleButtonPress = () => {
    if (message === '') {
      setErrorMessageEmpty('Completar con un mensaje.');
    } else {
      setErrorMessageEmpty('');
    }
    if (message === '') {
      setErrorNameEmpty('Completar con un nombre.');
    } else {
      setErrorNameEmpty('');
    }
    if (phoneNumber === '') {
      setErrorPhoneNumberEmpty('Completar con un número de teléfono.');
    } else {
      setErrorPhoneNumberEmpty('');
      if (phoneNumber.length !== 10) {
        setErrorPhoneNumberLength(
          'El número de teléfono debe tener 10 dígitos.',
        );
      } else {
        setErrorPhoneNumberLength('');
      }
    }
    if (
      errorMessageEmpty === '' &&
      errorNameEmpty === '' &&
      errorPhoneNumberEmpty === '' &&
      errorPhoneNumberLength === ''
    ) {
      handleContactar();
    }
  };

  const handleContactar = async () => {
    const jsonValue = await AsyncStorage.getItem('userToken');
    const userData = JSON.parse(jsonValue);
    const token = userData.token;
    try {
      const req = await fetch(`${BACKEND_URL}/${API_VERSION}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          statusMessage: message,
          contactType: 'Pregunta',
          propertyId: propiedad.id,
        }),
      });
      const res = await req.json();
      if (res.ok) {
        navigation.navigate('ContactarExito');
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
      <ScrollView>
        <View style={StyleSheet.container}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 20,
              alignItems: 'center',
              gap: 5,
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
              marginTop: 30,
              width: '95%',
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              Contactar Inmobiliaria
            </Text>
            <View style={{marginTop: 20}}>
              <Text variant="bodyLarge" style={{marginBottom: 7}}>
                Nombre
              </Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={name => setName(name)}
              />
              {errorNameEmpty ? (
                <Text
                  style={{
                    color: 'red',
                    display: 'flex',
                    alignSelf: 'flex-start',
                  }}>
                  {errorNameEmpty}
                </Text>
              ) : null}
            </View>
            <View style={{marginTop: 20}}>
              <Text variant="bodyLarge" style={{marginBottom: 7}}>
                Teléfono
              </Text>
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                value={phoneNumber}
                onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
              />
              {errorPhoneNumberEmpty ? (
                <Text
                  style={{
                    color: 'red',
                    display: 'flex',
                    alignSelf: 'flex-start',
                  }}>
                  {errorPhoneNumberEmpty}
                </Text>
              ) : null}
              {errorPhoneNumberLength ? (
                <Text
                  style={{
                    color: 'red',
                    display: 'flex',
                    alignSelf: 'flex-start',
                  }}>
                  {errorPhoneNumberLength}
                </Text>
              ) : null}
            </View>
            <View style={{marginTop: 20}}>
              <Text variant="bodyLarge" style={{marginBottom: 7}}>
                Mensaje
              </Text>
              <TextInput
                style={styles.input}
                value={message}
                multiline={true}
                numberOfLines={10}
                onChangeText={message => setMessage(message)}
              />
              {errorMessageEmpty ? (
                <Text
                  style={{
                    color: 'red',
                    display: 'flex',
                    alignSelf: 'flex-start',
                  }}>
                  {errorMessageEmpty}
                </Text>
              ) : null}
            </View>
          </View>
          <View style={{width: '90%', marginTop: 50, alignSelf: 'center'}}>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => handleButtonPress()}>
              Contactar
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#eff5f5',
  },
  input: {
    color: '#000',
    width: '100%',
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
export default Contactar;
