import React, { useEffect, useState } from 'react';
import { getUserAlquileres } from '../../services/API';
import NoPropiedades from '../../components/NoPropiedades';
import { View, SafeAreaView, FlatList } from 'react-native';
import Heading from '../../components/Heading';
import PropiedadCard from '../../components/PropiedadCard';


const UserMisAlquileres = () => {

  const [misAlguileres, setMisAlquileres] = useState([]);

  const getAlquileres = async () => {
    const userAlquileres = await setMisAlquileres();
    setFavorites(userAlquileres.data);

  }

  useEffect(() => {
    const loadAlquileres = navigation.addListener('focus', () => {
      getAlquileres();
    });
    return loadAlquileres;
  }, [navigation]);

  const renderPropiedadCard = ({ item }) => {
    return <PropiedadCard propiedad={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Heading>Mis Contratos</Heading>

        {misAlguileres.length === 0 ? (
          <NoPropiedades />
        ) : (
          <FlatList
            style={styles.propiedadesList}
            data={misAlguileres}
            renderItem={({ item }) => renderPropiedadCard({ item })}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </SafeAreaView>
  )
};

export default UserMisAlquileres;
