import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Appbar, Text} from 'react-native-paper';

const AppBar = ({navigation}) => {
  return (
    <Appbar.Header>
      <View style={styles.appBarContaier}>
        <Text>
          <Text>my</Text>
          <Text style={{color: '#EB6440', fontSize: 18, fontWeight: 'bold'}}>
            Home
          </Text>
        </Text>
        <Appbar.Action
          icon="plus-circle"
          onPress={() => navigation.navigate('AddPropiedadStepOne')}
        />
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
