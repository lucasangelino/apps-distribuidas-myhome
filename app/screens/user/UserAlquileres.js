import React, {useEffect, useState} from 'react';
import {getUserAlquileres} from '../../services/API';
import NoPropiedades from '../../components/NoPropiedades';
import {View, SafeAreaView, FlatList, StyleSheet} from 'react-native';
import Heading from '../../components/Heading';
import PropiedadCard from '../../components/PropiedadCard';
import {useTranslation} from 'react-i18next';

const UserAlquileres = ({navigation}) => {
  const [misAlguileres, setMisAlquileres] = useState([]);
  const {t} = useTranslation();

  const getAlquileres = async () => {
    const userAlquileres = await getUserAlquileres();
    setMisAlquileres(userAlquileres.data);
  };

  useEffect(() => {
    const loadAlquileres = navigation.addListener('focus', () => {
      getAlquileres();
    });
    return loadAlquileres;
  }, [navigation]);

  const renderPropiedadCard = ({item}) => {
    return (
      <PropiedadCard
        propiedad={item}
        actionButtonText="Comentar"
        onActionButtonPress={() =>
          navigation.navigate('UserComentarAlquiler', {alquilerId: item.id})
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Heading>{t('Mis Contratos')}</Heading>

        {misAlguileres.length === 0 ? (
          <NoPropiedades />
        ) : (
          <FlatList
            style={styles.propiedadesList}
            data={misAlguileres}
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
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 2,
  },
  propiedadesList: {
    marginTop: 20,
  },
});

export default UserAlquileres;
