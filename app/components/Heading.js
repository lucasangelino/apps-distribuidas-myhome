import React from 'react';
const {StyleSheet} = require('react-native');
import {Text} from 'react-native-paper';

function Heading({children: heading}) {
  return (
    <Text variant="titleLarge" style={styles.heading}>
      {heading}
    </Text>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginVertical: 10,
    color: '#393939',
    fontWeight: 'bold',
  },
});

export default Heading;
