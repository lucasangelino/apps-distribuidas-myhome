import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

const ActionButton = ({label, onClick, fullWith = false}) => (
  <Button
    style={fullWith ? styles.actionButtonFullWith : ''}
    uppercase={true}
    mode="contained"
    onPress={onClick}>
    {label}
  </Button>
);

const styles = StyleSheet.create({
  actionButtonFullWith: {
    width: '100%',
  },
});

export default ActionButton;
