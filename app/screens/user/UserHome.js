/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import i18n from '../../i18n';
import {useTranslation} from 'react-i18next';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import Heading from '../../components/Heading';
import NoPropiedades from '../../components/NoPropiedades';
import PropiedadCard from '../../components/PropiedadCard';
import {getNearestProperties, getUserFavorites} from '../../services/API';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';
import {
  Divider,
  Modal,
  Portal,
  Text,
  Button,
  SegmentedButtons,
  TextInput,
  Checkbox,
} from 'react-native-paper';

const initialFilters = {
  contractType: '',
  propertyType: '',
  numEnvironments: 0,
  numRooms: 0,
  numBathrooms: 0,
  numCars: 0,
  antiguedad: 0,
  sum: undefined,
  swimming_pool: undefined,
  sport_field: undefined,
  laundry: undefined,
  solarium: undefined,
  gym: undefined,
  vault: undefined,
  security: undefined,
  game_room: undefined,
  currency: '',
  minPrice: 0,
  maxPrice: 0,
  lat: -34.5896513,
  long: -58.4909745,
  distanceInMeters: 0,
};

const UserHome = ({navigation}) => {
  const [propiedades, setPropiedades] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [filters, setFilters] = React.useState(initialFilters);
  const [countFilters, setCountFilters] = React.useState(0);
  const [locationPermission, setLocationPermission] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const {t} = useTranslation();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    const loadPropertites = navigation.addListener('focus', () => {
      getUserPropiedades();
    });
    return loadPropertites;
  }, [navigation]);

  useEffect(() => {
    const count = Object.values(filters).filter(filter => filter).length;
    console.log(count);
    setCountFilters(count - 2);
  }, [filters]);

  useEffect(() => {
    (async () => {
      console.log('useEffect');
      const granted = await requestLocationPermission();
      if (granted) {
        setLocationPermission(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (locationPermission) {
      Geolocation.getCurrentPosition(info => {
        setUserLocation({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      });
    }
  }, [locationPermission]);

  const requestLocationPermission = async () => {
    console.log('requestLocationPermission');
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: t('Permiso de ubicacion'),
          message: t(
            'La aplicacion necesita acceder a su ubicacion para poder mostrarle las propiedades mas cercanas a usted',
          ),
          buttonNegative: t('Cancelar'),
          buttonPositive: t('OK'),
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('LOCATION PERSMISSION GRANTED');
        setLocationPermission(true);
        return true;
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getUserPropiedades = async () => {
    const userPropiedades = await getNearestProperties({filters, countFilters});
    const userFavorites = await getUserFavorites();

    const favoritosIds = userFavorites.data.map(fav => fav.propertyId);

    const propiedades = userPropiedades.data.map(propiedad => ({
      ...propiedad,
      isFav: favoritosIds.includes(propiedad.id),
      favoriteId: favoritosIds.includes(propiedad.id)
        ? userFavorites.data.find(fav => fav.propertyId === propiedad.id)
            .favoriteId
        : null,
    }));

    setPropiedades(propiedades);
  };

  const handleAplyFilters = async () => {
    const filteredNearestProperties = await getNearestProperties({
      filters,
      countFilters,
    });
    const userFavorites = await getUserFavorites();

    const favoritosIds = userFavorites.data.map(fav => fav.propertyId);

    const propiedades = filteredNearestProperties.data.map(propiedad => ({
      ...propiedad,
      isFav: favoritosIds.includes(propiedad.id),
      favoriteId: favoritosIds.includes(propiedad.id)
        ? userFavorites.data.find(fav => fav.propertyId === propiedad.id)
            .favoriteId
        : null,
    }));

    setPropiedades(propiedades);
  };

  const renderPropiedadCard = ({item}) => {
    return (
      <PropiedadCard
        propiedad={item}
        actionButtonText="VER MAS"
        onActionButtonPress={() =>
          navigation.navigate('PropiedadDetail', {property: item})
        }
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
                  {t('Limpiar')}
                </Text>
                <Text onPress={hideModal}>{t('Cerrar')}</Text>
              </View>
              <Divider style={{marginVertical: 10}} />

              <View style={{display: 'flex', gap: 20}}>
                <SegmentedButtons
                  value={filters.contractType}
                  onValueChange={operacion => {
                    setFilters({
                      ...filters,
                      contractType: operacion,
                    });
                  }}
                  checkColor="#EB6440"
                  buttons={[
                    {
                      value: 'alquiler',
                      label: 'Alquiler',
                    },
                    {
                      value: 'venta',
                      label: 'Venta',
                    },
                    {value: 'temporada', label: 'Temporada'},
                  ]}
                />

                <SegmentedButtons
                  value={filters.propertyType}
                  onValueChange={e => setFilters({...filters, propertyType: e})}
                  checkColor="#EB6440"
                  buttons={[
                    {
                      value: 'Departamento',
                      label: 'Departamento',
                    },
                    {
                      value: 'Casa',
                      label: 'Casa',
                    },
                    {value: 'Ph', label: 'PH'},
                  ]}
                />

                <View style={styles.amenitiesContainer}>
                  <Text style={{fontSize: 20}}>{t('Distancia en km')}</Text>
                  <TextInput
                    keyboardType="numeric"
                    mode="outlined"
                    label=""
                    onChangeText={distanceInMeters =>
                      setFilters({
                        ...filters,
                        distanceInMeters: distanceInMeters,
                      })
                    }
                    value={filters.distanceInMeters.toString()}
                    style={{height: 40}}
                  />

                  <Text style={{fontSize: 20}}>{t('Caracteristicas')}</Text>
                  {/* Ambientes */}
                  <View style={styles.amenitie}>
                    <View
                      style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                      <Ionicons name="home-outline" size={20} />
                      <Text>{t('Ambientes')}</Text>
                    </View>
                    <View style={styles.buttons}>
                      <Ionicons
                        name="add-circle-outline"
                        size={20}
                        onPress={() =>
                          setFilters({
                            ...filters,
                            numEnvironments: filters.numEnvironments + 1,
                          })
                        }
                      />
                      <Text>{filters.numEnvironments}</Text>
                      <Ionicons
                        name="remove-circle-outline"
                        size={20}
                        onPress={() =>
                          filters.numEnvironments > 0 &&
                          setFilters({
                            ...filters,
                            numEnvironments: filters.numEnvironments - 1,
                          })
                        }
                      />
                    </View>
                  </View>

                  {/* Dormitorio */}
                  <View style={styles.amenitie}>
                    <View
                      style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                      <Ionicons name="bed-outline" size={20} />
                      <Text>{t('Dormitorio')}</Text>
                    </View>
                    <View style={styles.buttons}>
                      <Ionicons
                        name="add-circle-outline"
                        size={20}
                        onPress={() =>
                          setFilters({
                            ...filters,
                            numRooms: filters.numRooms + 1,
                          })
                        }
                      />
                      <Text>{filters.numRooms}</Text>
                      <Ionicons
                        name="remove-circle-outline"
                        size={20}
                        onPress={() =>
                          filters.numRooms > 0 &&
                          setFilters({
                            ...filters,
                            numRooms: filters.numRooms - 1,
                          })
                        }
                      />
                    </View>
                  </View>

                  {/* Baños */}
                  <View style={styles.amenitie}>
                    <View
                      style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                      <Ionicons name="water-outline" size={20} />
                      <Text>{t('Baños')}</Text>
                    </View>
                    <View style={styles.buttons}>
                      <Ionicons
                        name="add-circle-outline"
                        size={20}
                        onPress={() =>
                          setFilters({
                            ...filters,
                            numBathrooms: filters.numBathrooms + 1,
                          })
                        }
                      />
                      <Text>{filters.numBathrooms}</Text>
                      <Ionicons
                        name="remove-circle-outline"
                        size={20}
                        onPress={() =>
                          filters.numBathrooms > 0 &&
                          setFilters({
                            ...filters,
                            numBathrooms: filters.numBathrooms - 1,
                          })
                        }
                      />
                    </View>
                  </View>

                  {/* Cocheras */}
                  <View style={styles.amenitie}>
                    <View
                      style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                      <Ionicons name="car-outline" size={20} />
                      <Text>{t('Cocheras')}</Text>
                    </View>
                    <View style={styles.buttons}>
                      <Ionicons
                        name="add-circle-outline"
                        size={20}
                        onPress={() =>
                          setFilters({
                            ...filters,
                            numCars: filters.numCars + 1,
                          })
                        }
                      />
                      <Text>{filters.numCars}</Text>
                      <Ionicons
                        name="remove-circle-outline"
                        size={20}
                        onPress={() =>
                          filters.numCars > 0 &&
                          setFilters({
                            ...filters,
                            numCars: filters.numCars - 1,
                          })
                        }
                      />
                    </View>
                  </View>

                  {/* Antiguedad */}
                  <View style={styles.amenitie}>
                    <View
                      style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                      <Ionicons name="calendar-outline" size={20} />
                      <Text>{t('Antiguedad')}</Text>
                    </View>
                    <View style={styles.buttons}>
                      <Ionicons
                        name="add-circle-outline"
                        size={20}
                        onPress={() =>
                          setFilters({
                            ...filters,
                            antiguedad: filters.antiguedad + 1,
                          })
                        }
                      />
                      <Text>{filters.antiguedad}</Text>
                      <Ionicons
                        name="remove-circle-outline"
                        size={20}
                        onPress={() =>
                          filters.antiguedad > 0 &&
                          setFilters({
                            ...filters,
                            antiguedad: filters.antiguedad - 1,
                          })
                        }
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      gap: 1,
                      justifyContent: 'space-between',
                    }}>
                    <Checkbox.Item
                      label="Sum"
                      status={filters.sum ? 'checked' : 'unchecked'}
                      onPress={() =>
                        setFilters({
                          ...filters,
                          sum: filters.sum === undefined ? true : false,
                        })
                      }
                    />
                    <Checkbox.Item
                      label="Pileta"
                      status={filters.swimming_pool ? 'checked' : 'unchecked'}
                      onPress={() =>
                        setFilters({
                          ...filters,
                          swimming_pool:
                            filters.swimming_pool === undefined ? true : false,
                        })
                      }
                    />
                    <Checkbox.Item
                      label="Cancha de deportes"
                      status={filters.sport_field ? 'checked' : 'unchecked'}
                      onPress={() =>
                        setFilters({
                          ...filters,
                          sport_field:
                            filters.sport_field === undefined ? true : false,
                        })
                      }
                    />
                    <Checkbox.Item
                      label="Laundry"
                      status={filters.laundry ? 'checked' : 'unchecked'}
                      onPress={() =>
                        setFilters({
                          ...filters,
                          laundry: filters.laundry === undefined ? true : false,
                        })
                      }
                    />
                    <Checkbox.Item
                      label="Solarium"
                      status={filters.solarium ? 'checked' : 'unchecked'}
                      onPress={() =>
                        setFilters({
                          ...filters,
                          solarium:
                            filters.solarium === undefined ? true : false,
                        })
                      }
                    />
                    <Checkbox.Item
                      label="Gimnasio"
                      status={filters.gym ? 'checked' : 'unchecked'}
                      onPress={() =>
                        setFilters({
                          ...filters,
                          gym: filters.gym === undefined ? true : false,
                        })
                      }
                    />
                    <Checkbox.Item
                      label="Baulera"
                      status={filters.vault ? 'checked' : 'unchecked'}
                      onPress={() =>
                        setFilters({
                          ...filters,
                          vault: filters.vault === undefined ? true : false,
                        })
                      }
                    />
                    <Checkbox.Item
                      label="Seguridad"
                      status={filters.security ? 'checked' : 'unchecked'}
                      onPress={() =>
                        setFilters({
                          ...filters,
                          security:
                            filters.security === undefined ? true : false,
                        })
                      }
                    />
                    <Checkbox.Item
                      label="Sala de juegos"
                      status={filters.game_room ? 'checked' : 'unchecked'}
                      onPress={() =>
                        setFilters({
                          ...filters,
                          game_room:
                            filters.game_room === undefined ? true : false,
                        })
                      }
                    />
                  </View>

                  <Text style={{fontSize: 20}}>{t('Precio')}</Text>
                  <SegmentedButtons
                    value={filters.currency}
                    onValueChange={currency =>
                      setFilters({...filters, currency})
                    }
                    checkColor="#EB6440"
                    buttons={[
                      {
                        value: 'usd',
                        label: 'USD',
                      },
                      {
                        value: 'ars',
                        label: 'ARS',
                      },
                    ]}
                  />
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 10,
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                        width: '40%',
                      }}>
                      <Text>{t('Minimo')}</Text>
                      <TextInput
                        keyboardType="numeric"
                        mode="outlined"
                        label=""
                        value={filters.minPrice.toString()}
                        style={{height: 40, width: '50%'}}
                        onChangeText={minPrice =>
                          setFilters({...filters, minPrice: minPrice})
                        }
                      />
                    </View>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                        width: '40%',
                      }}>
                      <Text>{t('Maximo')}</Text>
                      <TextInput
                        keyboardType="numeric"
                        mode="outlined"
                        label=""
                        value={filters.maxPrice.toString()}
                        style={{height: 40, width: '50%'}}
                        onChangeText={maxPrice =>
                          setFilters({...filters, maxPrice: maxPrice})
                        }
                      />
                    </View>
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
                      handleAplyFilters();
                      hideModal();
                    }}>
                    <Text style={{color: '#fff', fontSize: 18}}>
                      {t('Aplicar')}
                    </Text>
                  </Button>
                </View>
              </View>
            </ScrollView>
          </Modal>
        </Portal>

        <View style={styles.filterContainer}>
          <Heading>{t('Mis propiedades')}</Heading>
          <Text onPress={showModal}>{`${t('filtrar')} (${countFilters})`}</Text>
        </View>
        {!locationPermission && (
          <View>
            <Text
              style={{
                borderWidth: 1,
                backgroundColor: '#e6e6e6',
                borderColor: 'tomato',
                padding: 10,
                borderRadius: 10,
                color: '#000',
              }}>
              ❗
              {t(
                'Debes dar permiso a la ubicacion para nua mejor experiencia de usuario',
              )}
            </Text>
            <Button onPress={requestLocationPermission}>Dar permiso</Button>
          </View>
        )}

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
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
  },
  container: {
    minHeight: '100%',
    paddingHorizontal: 2,
    backgroundColor: '#fff',
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
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
  amenitiesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  amenitie: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
});

export default UserHome;
