import React from 'react';
const {View, StyleSheet, SafeAreaView, FlatList} = require('react-native');
import Heading from '../../components/Heading';
import PropiedadCard from '../../components/PropiedadCard';
import propiedades from '../../mocks/propiedadesList.json';
import {Text} from 'react-native-paper';

function InmobiliariaHome() {
  const renderPropiedadCard = ({item}) => {
    return <PropiedadCard propiedad={item} />;
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Heading>Mis propiedades</Heading>

        <FlatList
          style={styles.propiedadesList}
          data={propiedades}
          renderItem={({item}) => renderPropiedadCard({item})}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 2,
    backgroundColor: '#fff',
  },
  propiedadesList: {
    marginTop: 0,
  },
  propiedadesItem: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default InmobiliariaHome;
