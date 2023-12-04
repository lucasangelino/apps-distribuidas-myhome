import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet, TextInput} from 'react-native';
import {Text, Button, Avatar, SegmentedButtons} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BACKEND_URL, API_VERSION} from 'react-native-dotenv';

const SolicitarVisita = ({route, navigation}) => {
  const {propiedad} = route.params;
  const [horario, setHorario] = useState('');
  const [errorHorarioEmpty, setErrorHorarioEmpty] = useState('');
  const [fecha, setFecha] = useState('');
  const [errorFechaEmpty, setErrorFechaEmpty] = useState('');
  const [errorFechaLength, setErrorFechaLength] = useState('');

  const handleButtonPress = () => {
    if (horario === '') {
      setErrorHorarioEmpty('Seleccionar un horario.');
    } else {
      setErrorHorarioEmpty('');
    }

    if (fecha === '') {
      setErrorFechaEmpty('Completar con una fecha.');
    } else {
      setErrorFechaEmpty('');
      if (fecha.length !== 10) {
        setErrorFechaLength('La fecha debe tener 10 dígitos.');
      } else {
        setErrorFechaLength('');
      }
    }

    if (errorHorarioEmpty === '' && errorFechaEmpty === '') {
      handleSolicitar();
    }
  };

  const handleSolicitar = async () => {
    try {
      const req = await fetch(`${BACKEND_URL}/${API_VERSION}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statusMessage: 'Me gustaria hacer una visita en esa fecha.',
          contactType: 'Visita',
          visitDate: fecha,
          visitTime: horario,
          propertyId: propiedad.id,
        }),
      });
      const res = await req.json();
      if (res.ok) {
        navigation.navigate('ContactarExito');
      } else {
        console.log('Error al contactar');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
        <View>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 20}}>
            Seleccione el horario de la visita que desee:
          </Text>
          <SegmentedButtons
            value={horario}
            onValueChange={setHorario}
            buttons={[
              {
                horario: 'AM',
                label: 'AM',
              },
              {
                horario: 'PM',
                label: 'PM',
              },
            ]}
          />
          {errorHorarioEmpty ? (
            <Text
              style={{
                color: 'red',
                display: 'flex',
                alignSelf: 'flex-start',
              }}>
              {errorHorarioEmpty}
            </Text>
          ) : null}
          <View style={{marginTop: 30}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              Ingrese la fecha en la que desea hacer la visita:
            </Text>
            <TextInput
              style={styles.input}
              placeholder="2020-12-25"
              value={fecha}
              onChangeText={fecha => setFecha(fecha)}
            />
            {errorFechaEmpty ? (
              <Text
                style={{
                  color: 'red',
                  display: 'flex',
                  alignSelf: 'flex-start',
                }}>
                {errorFechaEmpty}
              </Text>
            ) : null}
            {errorFechaLength ? (
              <Text
                style={{
                  color: 'red',
                  display: 'flex',
                  alignSelf: 'flex-start',
                }}>
                {errorFechaLength}
              </Text>
            ) : null}
          </View>
          <View style={{width: '100%', marginTop: 30, alignItems: 'center'}}>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => handleButtonPress}>
              Solicitar
            </Button>
          </View>
        </View>
      </View>
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
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 10,
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
    marginTop: 10,
  },
});

export default SolicitarVisita;
