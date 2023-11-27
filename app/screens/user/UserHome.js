import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, FlatList} from 'react-native';
import Heading from '../../components/Heading';
import NoPropiedades from '../../components/NoPropiedades';
import PropiedadCard from '../../components/PropiedadCard';
import {getNearestProperties} from '../../services/API';

const UserHome = () => {
  const [propiedades, setPropiedades] = useState([]);
  useEffect(() => {
    getUserPropiedades();
  }, []);

  const getUserPropiedades = async () => {
    console.log('getUserPropiedades');
    const userPropiedades = await getNearestProperties();
    setPropiedades(userPropiedades.data);
  };

  const renderPropiedadCard = ({item}) => {
    return <PropiedadCard propiedad={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Heading>Propiedades cercanas a ti</Heading>

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
