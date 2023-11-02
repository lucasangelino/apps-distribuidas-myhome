import React from 'react';
import {Text, Button} from 'react-native-paper';

const Comentarios = ({navigation}) => {
  return (
    <Button
      style={{
        marginTop: 50,
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#EB6440',
      }}
      onPress={() => navigation.navigate('AddPropiedadStepOne')}
      title="Comentarios"
      color="#841584"
      accessibilityLabel="Comentarios">
      <Text>Comentarios</Text>
    </Button>
  );
};

export default Comentarios;
