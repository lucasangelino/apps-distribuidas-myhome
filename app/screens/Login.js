import * as React from 'react';
import {Text, Button, Avatar} from 'react-native-paper';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

const LoginInmobiliaria = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Avatar.Image
        size={50}
        source={require('../assets/images/icons/white_logo.svg')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  button: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginInmobiliaria;
