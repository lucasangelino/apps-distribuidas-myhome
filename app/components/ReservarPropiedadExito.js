import * as React from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {Text, Button, Avatar} from 'react-native-paper';

const ReservarPropiedadExito = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 20,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 5,
        }}>
        <Avatar.Image
          size={50}
          source={require('../assets/images/Logo.png')}
          backgroundColor="#eff5f5"
          style={{marginRight: 5}}
        />
        <Text style={{fontSize: 20}}>MyHome</Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: 10,
          marginRight: 10,
          marginTop: 10,
          width: '100%',
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Reserva Exitosa</Text>
        <View style={{marginTop: 20}}>
          <Text variant="bodyLarge" style={{marginBottom: 7}}>
            ¡Felicidades! Tu reserva ha sido exitosa. Pronto nos pondremos en
            contacto contigo.
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <Image
            style={{width: 300, height: 300}}
            // source={require('../assets/images/ReservaExitosa.png')}
          />
        </View>
        <View style={{marginTop: 20}}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Home')}
            style={{backgroundColor: '#212121'}}>
            Volver al Inicio
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#eff5f5',
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
});
export default ReservarPropiedadExito;
