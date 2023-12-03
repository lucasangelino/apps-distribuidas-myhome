/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Appbar, Text} from 'react-native-paper';
import {AuthContext} from '../../context/AppContext';

const AppBar = ({navigation}) => {
 const {auth} = useContext(AuthContext);
  return (
    <Appbar.Header>
      <View style={styles.appBarContaier}>
        <Text>
          <Text>my</Text>
          <Text style={{color: '#EB6440', fontSize: 22, fontWeight: 'bold'}}>
            Home
          </Text>
        </Text>
        {auth.user.userType === 'Inmobiliaria' && (
                  <Appbar.Action
                    icon="plus-circle"
                    onPress={() => navigation.navigate('AddPropiedadStepper')}
                  />
         )}
      </View>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  appBarContaier: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
});

export default AppBar;
