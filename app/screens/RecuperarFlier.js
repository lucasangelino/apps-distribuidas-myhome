import React from 'react';
import {Text, Button, Avatar} from 'react-native-paper';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

const RecuperarFlier = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Avatar.Image
        size={100}
        source={require('../assets/images/Verificado.png')}
        marginTop={20}
        marginLeft={15}
      />
      <Text style={styles.text} variant="headlineSmall">
        Verificar si recibiste el mail en tu casilla con el link.
      </Text>
      <TouchableOpacity>
        <Text style={styles.link}>Volver a enviar el mail</Text>
      </TouchableOpacity>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate('Login')}>
        Volver
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#eff5f5',
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  link: {
    color: '#0377ff',
    marginTop: 50,
  },
  button: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
});

export default RecuperarFlier;
