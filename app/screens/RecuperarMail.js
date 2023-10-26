import React, {useState} from 'react';
import {Text, Button, Avatar} from 'react-native-paper';
import {View, TextInput, StyleSheet} from 'react-native';

const RecuperarMail = ({navigation}) => {
  const [email, setEmail] = useState('');
  return (
    <View style={styles.container}>
      <Avatar.Image
        size={100}
        source={require('../assets/images/Logo.png')}
        marginTop={20}
        marginLeft={15}
      />
      <Text variant="headlineMedium" style={{marginLeft: 10, marginTop: 20}}>
        Recuperar tu Usuario
      </Text>
      <Text variant="headlineMedium" style={{marginLeft: 10, marginTop: 50}}>
        Email
      </Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate('RecuperarFlier')}>
        Recuperar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  button: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
});

export default RecuperarMail;
