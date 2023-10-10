import React from 'react';
const {View, Text, StyleSheet} = require('react-native');
import Button from '@mui/material/Button';

function Home() {
  return (
    <View>
      <Text>Home</Text>
      <Button variant="contained">
        <Text>Hello world</Text>
      </Button>
      ;
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
