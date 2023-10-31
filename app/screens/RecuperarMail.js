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
        marginTop={60}
      />
      <Text variant="headlineMedium" style={{marginTop: 20}}>
        Recuperar tu Usuario
      </Text>
      <Text
        variant="headlineMedium"
        style={{marginTop: 135, display: 'flex', alignSelf: 'flex-start'}}>
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
    backgroundColor: '#eff5f5',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginTop: 5,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
    borderRadius: 10,
  },
});

export default RecuperarMail;
