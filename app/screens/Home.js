import React from 'react';
const {View, StyleSheet, SafeAreaView, FlatList} = require('react-native');
import PropiedadCard from '../components/PropiedadCard';
import Heading from '../components/Heading';
import propiedades from '../mocks/propiedadesList.json';

function Home() {
  const renderPropiedadCard = ({item}) => {
    return <PropiedadCard propiedad={item} />;
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <AppBar /> */}
      <View style={styles.container}>
        <Heading>Propiedades cerca de ti</Heading>
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
    backgroundColor: '#E5E5E5',
  },
  propiedadesList: {
    marginTop: 10,
  },
  propiedadesItem: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default Home;
