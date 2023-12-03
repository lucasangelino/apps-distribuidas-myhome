import * as React from 'react';
import {View, StyleSheet, SafeAreaView, TextInput} from 'react-native';
import {Text, Button, Avatar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Contactar = ({route, navigation}) => {
  const {propiedad} = route.params;
  return (
    <SafeAreaView>
      <View style={StyleSheet.container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 20,
            alignItems: 'center',
            gap: 5,
          }}>
          <Ionicons
            name="arrow-back-outline"
            size={28}
            color={'#212121'}
            marginLeft={10}
            onPress={() =>
              navigation.navigate('PropiedadDetail', {property: propiedad})
            }
          />
          <Avatar.Image
            size={50}
            source={require('../assets/images/Logo.png')}
            backgroundColor="#eff5f5"
            style={{marginLeft: 80}}
          />
          <Text style={{fontSize: 20}}>MyHome</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 10,
            marginRight: 10,
            marginTop: 30,
            width: '95%',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Contactar Inmobiliaria
          </Text>
          <View style={{marginTop: 20}}>
            <Text variant="bodyLarge" style={{marginBottom: 7}}>
              Nombre
            </Text>
            <TextInput style={styles.input} />
          </View>
          <View style={{marginTop: 20}}>
            <Text variant="bodyLarge" style={{marginBottom: 7}}>
              Teléfono
            </Text>
            <TextInput keyboardType="numeric" style={styles.input} />
          </View>
          <View style={{marginTop: 20}}>
            <Text variant="bodyLarge" style={{marginBottom: 7}}>
              Mensaje
            </Text>
            <TextInput style={styles.input} />
          </View>
        </View>
        <View style={{width: '90%', marginTop: 50, alignSelf: 'center'}}>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate('ContactarExito')}>
            Contactar
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#eff5f5',
  },
  input: {
    color: '#000',
    width: '100%',
    height: 40,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
});
export default Contactar;
