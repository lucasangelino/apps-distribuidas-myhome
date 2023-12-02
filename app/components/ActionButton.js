import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

const ActionButton = ({label, onClick, fullWith = false, disable}) => {
  console.log('disable', onClick);
  return (
    <Button
      disabled={disable}
      style={fullWith ? styles.actionButtonFullWith : ''}
      uppercase={true}
      mode="contained"
      onPress={onClick}>
      {label}
    </Button>
  );
};

const styles = StyleSheet.create({
  actionButtonFullWith: {
    width: '100%',
    borderRadius: 10,
  },
});

export default ActionButton;
