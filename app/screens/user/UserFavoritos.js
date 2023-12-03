import React, { useEffect, useContext} from 'react';
import { getUserFavorites } from '../../services/API';
import NoFavoritos from '../../components/NoFavoritos';
import { View, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import Heading from '../../components/Heading';
import PropiedadCard from '../../components/PropiedadCard';
import {UsuarioContext} from '../../context/UsuarioContext';

const UserFavoritos = ({navigation}) => {

  const {favorites, setFavorites} = useContext(UsuarioContext);

  const getFavorites = async () => {
    const userFavorites = await getUserFavorites();
    const properties = userFavorites.data.map(item =>  {
      const property = item.property;
      return {
        ...property,
        isFav: true,
        favoriteId: item.favoriteId
      };
    });
    console.log(properties);
    setFavorites(properties);

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
          <NoFavoritos />
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

export default UserFavoritos;
