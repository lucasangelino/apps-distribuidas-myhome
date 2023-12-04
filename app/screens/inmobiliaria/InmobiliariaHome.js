/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext} from 'react';
// remove modeule import and change it
const {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
} = require('react-native');

import {
  Divider,
  Modal,
  Portal,
  Text,
  Button,
  Checkbox,
} from 'react-native-paper';

import Heading from '../../components/Heading';
import PropiedadCard from '../../components/PropiedadCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../context/AppContext';
import {InmobiliariaContext} from '../../context/InmobiliariaContext';
import {getPropiedades} from '../../services/API';
import NoPropiedades from '../../components/NoPropiedades';
import {BACKEND_URL, API_VERSION} from 'react-native-dotenv';
import {useTranslation} from 'react-i18next';

const initialFilters = {
  publicada: true,
  reservada: true,
  guardada: true,
  despublicada: true,
};

function InmobiliariaHome({navigation}) {
  const {auth, setAuth} = useContext(AuthContext);
  const {propiedades, setPropiedades, setPublicacion} =
    useContext(InmobiliariaContext);
  const {t} = useTranslation();

  const [visible, setVisible] = React.useState(false);
  const [filters, setFilters] = React.useState(initialFilters);
  const [countFilters, setCountFilters] = React.useState(0);

  useEffect(() => {
    const count = Object.values(filters).filter(filter => filter).length;
    setCountFilters(count);
  }, [filters]);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

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

  const handleApplyFilters = async () => {
    const filteredProperties = await getPropiedades(filters);
    setPropiedades(filteredProperties.data);
  };

  useEffect(() => {
    getUser();
    const loadPropertites = navigation.addListener('focus', () => {
      setFilters(initialFilters);
      getUserPropiedades();
    });
    return loadPropertites;
  }, [navigation]);

  const renderPropiedadCard = ({item}) => {
    return (
      <PropiedadCard
        propiedad={item}
        actionButtonText={t('Editar')}
        onActionButtonPress={() => {
          console.log('item', JSON.stringify(item, null, 2));
          setPublicacion({
            id: item.id,
            publicada: 'publicada',
            tipoOperacion: item.contract_types[0].contractType,
            tipoPropiedad: item.propertyType,
            titulo: item.title,
            descripcion: item.description,
            direccion: {
              calleAltura: item.location?.street || '',
              ciudad: item.location?.country || '',
              provincia: item.location?.province || '',
              barrio: item.location?.district || '',
              localidad: item.location?.country || '',
              pisoDepto: item.location?.department || '',
              place_id: item.location?.place_id || '',
              latitud: item.location?.latitude || '',
              longitud: item.location?.longitude || '',
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
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.containerStyle}>
            <ScrollView style={{marginBottom: 20}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    backgroundColor: '#EB6440',
                    color: '#fff',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 50,
                  }}>{`Filtros (${countFilters})`}</Text>
                <Text onPress={() => setFilters(initialFilters)}>
                  {t('Filtrar')}
                </Text>
                <Text onPress={hideModal}>Cerrar</Text>
              </View>
              <Divider style={{marginVertical: 10}} />

              <View style={{display: 'flex', gap: 20}}>
                <View style={styles.filterContainer}>
                  <Text style={{fontSize: 20}}>Filtrar por: </Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flexWrap: 'wrap',
                      gap: 1,
                      justifyContent: 'space-between',
                    }}>
                    <Checkbox.Item
                      label="Publicada"
                      style={{justifyContent: 'flex-start'}}
                      labelStyle={{textAlign: 'left', flexGrow: 0}}
                      position="leading"
                      status={filters.publicada ? 'checked' : 'unchecked'}
                      onPress={() =>
                        setFilters({...filters, publicada: !filters.publicada})
                      }
                    />
                    <Checkbox.Item
                      label="Reservada"
                      style={{justifyContent: 'flex-start'}}
                      labelStyle={{textAlign: 'left', flexGrow: 0}}
                      position="leading"
                      status={filters.reservada ? 'checked' : 'unchecked'}
                      onPress={() =>
                        setFilters({...filters, reservada: !filters.reservada})
                      }
                    />
                    <Checkbox.Item
                      label="Guardada"
                      style={{justifyContent: 'flex-start'}}
                      labelStyle={{textAlign: 'left', flexGrow: 0}}
                      position="leading"
                      status={filters.guardada ? 'checked' : 'unchecked'}
                      onPress={() =>
                        setFilters({
                          ...filters,
                          guardada: !filters.guardada,
                        })
                      }
                    />
                    <Checkbox.Item
                      label="Despublicada"
                      style={{justifyContent: 'flex-start'}}
                      labelStyle={{textAlign: 'left', flexGrow: 0}}
                      position="leading"
                      status={filters.despublicada ? 'checked' : 'unchecked'}
                      onPress={() =>
                        setFilters({
                          ...filters,
                          despublicada: !filters.despublicada,
                        })
                      }
                    />
                  </View>

                  <Button
                    style={{
                      backgroundColor: '#EB6440',
                      borderWidth: 1,
                      alignContent: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 50,
                      textAlign: 'center',
                      marginTop: 20,
                    }}
                    onPress={() => {
                      handleApplyFilters();
                      hideModal();
                    }}>
                    <Text style={{color: '#fff', fontSize: 18}}>Aplicar</Text>
                  </Button>
                </View>
              </View>
            </ScrollView>
          </Modal>
        </Portal>

        <View style={styles.headingContainer}>
          <Heading>{t('Mis propiedades')}</Heading>
          <Text onPress={showModal}>
            {`${t('Filtrar')} (${countFilters})`}{' '}
          </Text>
        </View>

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
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  headingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

export default InmobiliariaHome;
