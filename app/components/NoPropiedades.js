import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

const NoPropiedades = () => {
  return (
    <View style={styles.container}>
      <Text variant="headlineSmall">No hay propiedades 😢</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#fff',
  },
});

export default NoPropiedades;
