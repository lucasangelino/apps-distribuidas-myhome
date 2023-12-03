import * as React from 'react';
import {View, SafeAreaView, StyleSheet, TextInput} from 'react-native';
import {Text, Button, Avatar, SegmentedButtons} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SolicitarVisita = ({route, navigation}) => {
  const {propiedad} = route.params;
  const [value, setValue] = React.useState('');
  return (
    <SafeAreaView style={styles.container}>
      <View style={StyleSheet.container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 20,
            alignItems: 'center',
          }}>
          <Ionicons
            name="arrow-back-outline"
            size={28}
            color={'#212121'}
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
        <View>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 20}}>
            Seleccione el horario de la visita que desee:
          </Text>

          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            buttons={[
              {
                value: 'AM',
                label: 'AM',
              },
              {
                value: 'PM',
                label: 'PM',
              },
            ]}
          />
          <View style={{marginTop: 30}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              Ingrese la fecha en la que desea hacer la visita:
            </Text>
            <TextInput style={styles.input} placeholder="12-05-2020" />
          </View>
          <View style={{width: '100%', marginTop: 30, alignItems: 'center'}}>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => navigation.navigate('SolicitarVisitaExito')}>
              Solicitar
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
    marginTop: 30,
    borderRadius: 10,
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
    marginTop: 10,
  },
});

export default SolicitarVisita;
