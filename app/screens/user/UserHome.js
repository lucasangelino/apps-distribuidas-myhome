/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
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
import {getNearestProperties} from '../../services/API';
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

const UserHome = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [tipoOperacion, setTipoOperacion] = React.useState('');

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    getUserPropiedades();
  }, []);

  const getUserPropiedades = async () => {
    const userPropiedades = await getNearestProperties();
    setPropiedades(userPropiedades.data);
  };

  const renderPropiedadCard = ({item}) => {
    return <PropiedadCard propiedad={item} />;
  };
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}>
            <ScrollView style={{marginBottom: 20}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text>Filtros</Text>
                <Text onPress={hideModal}>Cerrar</Text>
              </View>
              <Divider style={{marginVertical: 10}} />

              <View style={{display: 'flex', gap: 20}}>
                <SegmentedButtons
                  value={tipoOperacion}
                  onValueChange={setTipoOperacion}
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
                  value={tipoOperacion}
                  onValueChange={setTipoOperacion}
                  checkColor="#EB6440"
                  buttons={[
                    {
                      value: 'departamento',
                      label: 'Departamento',
                    },
                    {
                      value: 'casa',
                      label: 'Casa',
                    },
                    {value: 'ph', label: 'PH'},
                  ]}
                />

                <View style={styles.amenitiesContainer}>
                  <Text style={{fontSize: 20}}>Caracteristicas</Text>
                  {/* Ambientes */}
                  <View style={styles.amenitie}>
                    <View
                      style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                      <Ionicons name="home-outline" size={20} />
                      <Text>Ambientes</Text>
                    </View>
                    <View style={styles.buttons}>
                      <Ionicons name="add-circle-outline" size={20} />
                      <Text>{'0'}</Text>
                      <Ionicons name="remove-circle-outline" size={20} />
                    </View>
                  </View>

                  {/* Dormitorio */}
                  <View style={styles.amenitie}>
                    <View
                      style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                      <Ionicons name="bed-outline" size={20} />
                      <Text>Dormitorio</Text>
                    </View>
                    <View style={styles.buttons}>
                      <Ionicons name="add-circle-outline" size={20} />
                      <Text>{'0'}</Text>
                      <Ionicons name="remove-circle-outline" size={20} />
                    </View>
                  </View>

                  {/* Baños */}
                  <View style={styles.amenitie}>
                    <View
                      style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                      <Ionicons name="water-outline" size={20} />
                      <Text>Baños</Text>
                    </View>
                    <View style={styles.buttons}>
                      <Ionicons name="add-circle-outline" size={20} />
                      <Text>{'0'}</Text>
                      <Ionicons name="remove-circle-outline" size={20} />
                    </View>
                  </View>

                  {/* Cocheras */}
                  <View style={styles.amenitie}>
                    <View
                      style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                      <Ionicons name="car-outline" size={20} />
                      <Text>Cocheras</Text>
                    </View>
                    <View style={styles.buttons}>
                      <Ionicons name="add-circle-outline" size={20} />
                      <Text>{'0'}</Text>
                      <Ionicons name="remove-circle-outline" size={20} />
                    </View>
                  </View>

                  {/* Antiguedad */}
                  <View style={styles.amenitie}>
                    <View
                      style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                      <Ionicons name="calendar-outline" size={20} />
                      <Text>Antiguedad</Text>
                    </View>
                    <View style={styles.buttons}>
                      <Ionicons name="add-circle-outline" size={20} />
                      <Text>{'0'}</Text>
                      <Ionicons name="remove-circle-outline" size={20} />
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
                      status={true ? 'checked' : 'unchecked'}
                      onPress={() => {}}
                    />
                    <Checkbox.Item
                      label="Pileta"
                      status={true ? 'checked' : 'unchecked'}
                      onPress={() => {}}
                    />
                    <Checkbox.Item
                      label="Cancha de deportes"
                      status={true ? 'checked' : 'unchecked'}
                      onPress={() => {}}
                    />
                    <Checkbox.Item
                      label="Laundry"
                      status={true ? 'checked' : 'unchecked'}
                      onPress={() => {}}
                    />
                    <Checkbox.Item
                      label="Solarium"
                      status={true ? 'checked' : 'unchecked'}
                      onPress={() => {}}
                    />
                    <Checkbox.Item
                      label="Gimnasio"
                      status={true ? 'checked' : 'unchecked'}
                      onPress={() => {}}
                    />
                    <Checkbox.Item
                      label="Sauna"
                      status={true ? 'checked' : 'unchecked'}
                      onPress={() => {}}
                    />
                    <Checkbox.Item
                      label="Vigilancia"
                      status={true ? 'checked' : 'unchecked'}
                      onPress={() => {}}
                    />
                    <Checkbox.Item
                      label="Sala de juegos"
                      status={true ? 'checked' : 'unchecked'}
                      onPress={() => {}}
                    />
                  </View>

                  <Text style={{fontSize: 20}}>Precio</Text>
                  <SegmentedButtons
                    value={tipoOperacion}
                    onValueChange={setTipoOperacion}
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
                      <Text>Minimo</Text>
                      <TextInput
                        keyboardType="numeric"
                        mode="outlined"
                        label=""
                        value={0}
                        style={{height: 40, width: '50%'}}
                        onChangeText={() => {}}
                      />
                    </View>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                        width: '40%',
                      }}>
                      <Text>Maximo</Text>
                      <TextInput
                        keyboardType="numeric"
                        mode="outlined"
                        label=""
                        value={0}
                        style={{height: 40, width: '50%'}}
                        onChangeText={() => {}}
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
                    onPress={() => {}}>
                    <Text style={{color: '#fff', fontSize: 18}}>Aplicar</Text>
                  </Button>
                </View>
              </View>
            </ScrollView>
          </Modal>
        </Portal>

        <View style={styles.filterContainer}>
          <Heading>Propiedades cercanas a ti</Heading>
          <Text onPress={showModal}>Filtrar</Text>
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
