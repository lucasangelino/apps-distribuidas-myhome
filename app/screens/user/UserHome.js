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
} from 'react-native';
import Heading from '../../components/Heading';
import NoPropiedades from '../../components/NoPropiedades';
import PropiedadCard from '../../components/PropiedadCard';
import {getNearestProperties, getUserFavorites} from '../../services/API';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
  cocheras: 0,
  antiguedad: 0,
  sum: false,
  swimming_pool: false,
  sport_field: false,
  laundry: false,
  solarium: false,
  gym: false,
  vault: false,
  security: false,
  game_room: false,
  currency: '',
  minPrice: 0,
  maxPrice: 0,
};

const UserHome = ({navigation}) => {
  const [propiedades, setPropiedades] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [filters, setFilters] = React.useState(initialFilters);
  const [countFilters, setCountFilters] = React.useState(0);

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
    setCountFilters(count);
  }, [filters]);

  const getUserPropiedades = async () => {
    const userPropiedades = await getNearestProperties({filters});
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
    const filteredNearestProperties = await getNearestProperties({filters});
    setPropiedades(filteredNearestProperties.data);
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
                            cocheras: filters.cocheras + 1,
                          })
                        }
                      />
                      <Text>{filters.cocheras}</Text>
                      <Ionicons
                        name="remove-circle-outline"
                        size={20}
                        onPress={() =>
                          filters.cocheras > 0 &&
                          setFilters({
                            ...filters,
                            cocheras: filters.cocheras - 1,
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
                        setFilters({...filters, sum: !filters.sum})
                      }
                    />
                    <Checkbox.Item
                      label="Pileta"
                      status={filters.swimming_pool ? 'checked' : 'unchecked'}
                      onPress={() =>
                        setFilters({
                          ...filters,
                          swimming_pool: !filters.swimming_pool,
                        })
                      }
                    />
                    <Checkbox.Item
                      label="Cancha de deportes"
                      status={filters.sport_field ? 'checked' : 'unchecked'}
                      onPress={() =>
                        setFilters({
                          ...filters,
                          sport_field: !filters.sport_field,
                        })
                      }
                    />
                    <Checkbox.Item
                      label="Laundry"
                      status={filters.laundry ? 'checked' : 'unchecked'}
                      onPress={() =>
                        setFilters({...filters, laundry: !filters.laundry})
                      }
                    />
                    <Checkbox.Item
                      label="Solarium"
                      status={filters.solarium ? 'checked' : 'unchecked'}
                      onPress={() =>
                        setFilters({...filters, solarium: !filters.solarium})
                      }
                    />
                    <Checkbox.Item
                      label="Gimnasio"
                      status={filters.gym ? 'checked' : 'unchecked'}
                      onPress={() =>
                        setFilters({...filters, gym: !filters.gym})
                      }
                    />
                    <Checkbox.Item
                      label="Baulera"
                      status={filters.vault ? 'checked' : 'unchecked'}
                      onPress={() =>
                        setFilters({...filters, vault: !filters.vault})
                      }
                    />
                    <Checkbox.Item
                      label="Seguridad"
                      status={filters.security ? 'checked' : 'unchecked'}
                      onPress={() =>
                        setFilters({
                          ...filters,
                          security: !filters.security,
                        })
                      }
                    />
                    <Checkbox.Item
                      label="Sala de juegos"
                      status={filters.game_room ? 'checked' : 'unchecked'}
                      onPress={() =>
                        setFilters({
                          ...filters,
                          game_room: !filters.game_room,
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
          <Heading>{t('user-home-title')}</Heading>
          <Text onPress={showModal}>{`${t('filtrar')} (${countFilters})`}</Text>
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
