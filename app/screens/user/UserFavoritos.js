import React, { useEffect, useState } from 'react';
import { getUserFavorites } from '../../services/API';
import NoPropiedades from '../../components/NoPropiedades';
import { View, SafeAreaView, FlatList } from 'react-native';
import Heading from '../../components/Heading';
import PropiedadCard from '../../components/PropiedadCard';


const UserFavoritos = () => {

  const [favorites, setFavorites] = useState([]);

  const getFavorites = async () => {
    const userFavorites = await getUserFavorites();
    setFavorites(userFavorites.data);

  }

  useEffect(() => {
    const loadFavorites = navigation.addListener('focus', () => {
      getFavorites();
    });
    return loadFavorites;
  }, [navigation]);

  const renderPropiedadCard = ({ item }) => {
    return <PropiedadCard propiedad={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Heading>Mis favoritos</Heading>

        {favorites.length === 0 ? (
          <NoPropiedades />
        ) : (
          <FlatList
            style={styles.propiedadesList}
            data={favorites}
            renderItem={({ item }) => renderPropiedadCard({ item })}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </SafeAreaView>
  )
};

export default UserFavoritos;
