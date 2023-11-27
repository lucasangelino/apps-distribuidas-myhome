import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, FlatList} from 'react-native';
import Heading from '../../components/Heading';
import NoPropiedades from '../../components/NoPropiedades';
import PropiedadCard from '../../components/PropiedadCard';
import {getNearestProperties} from '../../services/API';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UserHome = () => {
  const [propiedades, setPropiedades] = useState([]);
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <Heading>Propiedades cercanas a ti</Heading>
          <Ionicons name="search-outline" size={20} color={'#393939'} />
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
});

export default UserHome;
