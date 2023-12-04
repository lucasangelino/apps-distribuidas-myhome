/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext} from 'react';
// remove modeule import and change it
const {View, StyleSheet, SafeAreaView, FlatList} = require('react-native');
import Heading from '../../components/Heading';
import PropiedadCard from '../../components/PropiedadCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../context/AppContext';
import {InmobiliariaContext} from '../../context/InmobiliariaContext';
import {getPropiedades} from '../../services/API';
import NoPropiedades from '../../components/NoPropiedades';
import {BACKEND_URL, API_VERSION} from 'react-native-dotenv';
import {useTranslation} from 'react-i18next';

function InmobiliariaHome({navigation}) {
  const {auth, setAuth} = useContext(AuthContext);
  const {propiedades, setPropiedades, setPublicacion} =
    useContext(InmobiliariaContext);
  const {t} = useTranslation();

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userToken');

      const userData = JSON.parse(jsonValue);
      const token = userData.token;
      const id = userData.id;
      const req = await fetch(`${BACKEND_URL}/${API_VERSION}/users/id/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await req.json();
      const user = res.data;
      setAuth({
        ...auth,
        user: {
          contactMail: user.contactMail,
          cuit: user.cuit,
          fantasyName: user.fantasyName,
          firstName: user.firstName,
          id: user.id,
          mail: user.mail,
          phone: user.phone,
          photo: user.photo,
          status: user.status,
          name: user.name,
          email: user.email,
          userType: 'Inmobiliaria',
        },
      });
    } catch (error) {
      console.log('error: ' + error);
    }
  };

  const getUserPropiedades = async () => {
    const userPropiedades = await getPropiedades();
    setPropiedades(userPropiedades.data);
  };

  useEffect(() => {
    getUser();
    const loadPropertites = navigation.addListener('focus', () => {
      getUserPropiedades();
    });
    return loadPropertites;
  }, [navigation]);

  const renderPropiedadCard = ({item}) => {
    return (
      <PropiedadCard
        propiedad={item}
        actionButtonText="editar"
        onActionButtonPress={() => {
          console.log('item', JSON.stringify(item, null, 2));
          console.log(
            ' aaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            item.contract_types[0].contractType,
          );
          setPublicacion({
            id: item.id,
            publicada: 'publicada',
            tipoOperacion: item.contract_types[0].contractType,
            tipoPropiedad: item.propertyType,
            titulo: item.title,
            descripcion: item.description,
            direccion: {
              calleAltura: 'Pedro Moran 2430',
              ciudad: 'CABA',
              provincia: 'Buenos Aires',
              barrio: 'Agronomia',
              localidad: 'CABA',
              pisoDepto: '0',
              fullAddress: 'Pedro Moran 2430, CABA, Buenos Aires, Argentina',
              place_id: 'ChIJq6qq6QvKvJURhZwMkZq7CZM',
              latitud: '-34.603722',
              longitud: '-58.381592',
            },
            ambientes: item.numEnvironments,
            dormitorios: item.numRooms,
            banios: item.numBathrooms,
            cocheras: item.numCars,
            balcones: item.balcony,
            terrazas: item.roofTop,
            bauleras: item.vault,
            superficie: {
              cubierta: item.mtsCovered,
              semicubierta: item.mtsHalfCovered,
              descubierta: item.mtsUncovered,
            },
            antiguedad: item.antiquity,
            precio: item.contract_types[0].price,
            precioMoneda: item.contract_types[0].currency,
            expensas: item.contract_types[0].expPrice,
            expensasMoneda: item.contract_types[0].currency,
            amenities: [],
            orientacion: 'N',
            disposcion: 'Frente',
            images: item.multimedia,
            videoUrl: '',
          });
          navigation.navigate('AddPropiedadStepper');
        }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Heading>{t('Mis propiedades')}</Heading>

        {propiedades.length === 0 ? (
          <NoPropiedades />
        ) : (
          <FlatList
            style={styles.propiedadesList}
            data={propiedades}
            renderItem={({item}) => renderPropiedadCard({item})}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    paddingHorizontal: 2,
    backgroundColor: '#fff',
  },
  propiedadesList: {
    marginTop: 0,
    marginBottom: 150,
  },
  propiedadesItem: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default InmobiliariaHome;
