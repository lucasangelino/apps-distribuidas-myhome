import React from 'react';
const {View, Text, StyleSheet} = require('react-native');

function Home() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
});

export default Home;
