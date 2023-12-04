import * as React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {Text, Button, Avatar} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

const ContactarExito = ({navigation}) => {
  const {t} = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={StyleSheet.container}>
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
        <View style={{marginTop: 20, alignItems: 'center'}}>
          <Avatar.Image
            size={100}
            source={require('../assets/images/FotoExito.png')}
            backgroundColor="#eff5f5"
          />
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
          <Text style={{fontSize: 20, fontWeight: 'bold', alignSelf: 'center'}}>
            Contacto Exitoso
          </Text>
          <View style={{marginTop: 20}}>
            <Text variant="bodyLarge" style={{marginBottom: 7}}>
              {t(
                '¡Felicidades! Tu solicitud de contacto ha sido enviada con exito. En breve nos pondremos en contacto contigo.',
              )}
            </Text>
          </View>
          <View style={{marginTop: 20}}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('HomeUser')}
              style={styles.button}>
              {t('Volver al Inicio')}
            </Button>
          </View>
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
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
    borderRadius: 10,
  },
});

export default ContactarExito;
