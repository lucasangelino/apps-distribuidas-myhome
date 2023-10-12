import React from 'react';
const {StyleSheet} = require('react-native');
import {Text} from 'react-native-paper';

function Heading({children: heading}) {
  return (
    <Text variant="headlineSmall" style={styles.heading}>
      {heading}
    </Text>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginVertical: 5,
  },
});

export default Heading;
