import React, {useEffect, useContext} from 'react';
const {View, StyleSheet, SafeAreaView, FlatList} = require('react-native');
import Heading from '../../components/Heading';
import PropiedadCard from '../../components/PropiedadCard';
import propiedades from '../../mocks/propiedadesList.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../context/AppContext';

function InmobiliariaHome() {
  const {auth, setAuth} = useContext(AuthContext);
  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userToken');

      const userData = JSON.parse(jsonValue);
      const token = userData.token;
      const id = userData.id;
      const req = await fetch(`http://10.0.2.2:8080/v1/users/id/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await req.json();
      const user = res.data;

      setAuth({
        ...auth,
        user: {
          contactMail: user.contactMail,
          cuit: user.cuit,
          fantasyName: user.fantasyName,
          firstName: user.firstName,
          id: user.id,
          mail: user.mail,
          phone: user.phone,
          photo: user.photo,
          status: user.status,
          userType: user.userType,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.log('error: ' + error);
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderPropiedadCard = ({item}) => {
    return <PropiedadCard propiedad={item} />;
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Heading>Mis propiedades</Heading>

        <FlatList
          style={styles.propiedadesList}
          data={propiedades}
          renderItem={({item}) => renderPropiedadCard({item})}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 2,
    backgroundColor: '#fff',
  },
  propiedadesList: {
    marginTop: 0,
  },
  propiedadesItem: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default InmobiliariaHome;
