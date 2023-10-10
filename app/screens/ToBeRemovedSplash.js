import React from 'react';
const {View, Text, StyleSheet} = require('react-native');
import IMAGES from '../assets/images/images';

function Splash() {
  return (
    <View style={styles.container}>
      {/* <IMAGES.SVG.WHITE_LOGO width={100} height={100} /> */}
      <Text>Splash</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EB6440',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
});

export default Splash;
