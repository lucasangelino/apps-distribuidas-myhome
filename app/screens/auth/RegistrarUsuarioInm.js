/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, Button, Avatar, Checkbox, Snackbar} from 'react-native-paper';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {BACKEND_URL, API_VERSION} from 'react-native-dotenv';

const RegistrarUsuarioInm = ({navigation}) => {
  const [cuit, setCuit] = useState('');
  const [errorCuitEmpty, setErrorCuitEmpty] = useState('');
  const [errorCuitLength, setErrorCuitLength] = useState('');
  const [email, setEmail] = useState('');
  const [errorEmailEmpty, setErrorEmailEmpty] = useState('');
  const [errorNotEmail, setErrorNotEmail] = useState('');
  const [fantasyName, setFantasyName] = useState('');
  const [errorFantasyNameEmpty, setErrorFantasyNameEmpty] = useState('');
  const [password, setPassword] = useState('');
  const [errorPasswordEmpty, setErrorPasswordEmpty] = useState('');
  const [errorPasswordLength, setErrorPasswordLength] = useState('');
  const [errorPasswordUpperCase, setErrorPasswordUpperCase] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorRepeatPasswordEmpty, setErrorRepeatPasswordEmpty] = useState('');
  const [errorRepeatPassword, setErrorRepeatPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorPhoneNumberEmpty, setErrorPhoneNumberEmpty] = useState('');
  const [errorPhoneNumberLength, setErrorPhoneNumberLength] = useState('');
  const [checked, setChecked] = React.useState(false);
  const [errorChecked, setErrorChecked] = useState('');
  const [visible, setVisible] = React.useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const onToggleSnackBar = Message => {
    setVisible(true);
    setErrorMessage(Message);
  };
  const onDismissSnackBar = () => {
    setVisible(false);
  };

  const handleButtonPress = () => {
    if (cuit === '') {
      setErrorCuitEmpty('Completar con un número de CUIT.');
    } else {
      setErrorCuitEmpty('');
      if (cuit.length < 11) {
        setErrorCuitLength('El CUIT debe tener 11 dígitos.');
      } else {
        setErrorCuitLength('');
      }
    }

    if (email === '') {
      setErrorEmailEmpty('Completar con un email.');
    } else {
      setErrorEmailEmpty('');
      var checkEmail = 0;
      for (let i = 0; i < email.length; i++) {
        if (email[i] === '@') {
          checkEmail += 1;
        }
      }
      if (checkEmail !== 1) {
        setErrorNotEmail('El email ingresado no es válido.');
      } else {
        setErrorNotEmail('');
      }
    }

    if (fantasyName === '') {
      setErrorFantasyNameEmpty('Completar con un nombre de Inmobiliaria.');
    } else {
      setErrorFantasyNameEmpty('');
    }

    if (password === '') {
      setErrorPasswordEmpty('Completar con una contraseña.');
    } else {
      setErrorPasswordEmpty('');
      if (password.length < 8) {
        setErrorPasswordLength(
          'La contraseña debe tener al menos 8 caracteres.',
        );
      } else {
        setErrorPasswordLength('');
        var validateUpperCase = 0;
        for (let i = 0; i < password.length; i++) {
          if (password[i] === password[i].toUpperCase()) {
            validateUpperCase += 1;
          }
        }
        if (validateUpperCase === 0) {
          setErrorPasswordUpperCase(
            'La contraseña debe tener al menos una letra mayúscula.',
          );
        } else {
          setErrorPasswordUpperCase('');
        }
      }
    }

    if (repeatPassword === '') {
      setErrorRepeatPasswordEmpty('Completar con una contraseña.');
    } else {
      setErrorRepeatPasswordEmpty('');
      if (repeatPassword !== password) {
        setErrorRepeatPassword('Las contraseñas no coinciden.');
      } else {
        setErrorRepeatPassword('');
      }
    }

    if (checked === false) {
      setErrorChecked('Debe aceptar los Términos y Condiciones de Uso.');
    } else {
      setErrorChecked('');
    }

    if (phoneNumber === '') {
      setErrorPhoneNumberEmpty('Completar con un número de teléfono.');
    } else {
      setErrorPhoneNumberEmpty('');
      if (phoneNumber.length !== 10) {
        setErrorPhoneNumberLength(
          'El número de teléfono debe tener 10 dígitos.',
        );
      } else {
        setErrorPhoneNumberLength('');
      }
    }

    if (
      errorCuitEmpty === '' &&
      errorEmailEmpty === '' &&
      errorFantasyNameEmpty === '' &&
      errorPasswordEmpty === '' &&
      errorPasswordLength === '' &&
      errorCuitLength === '' &&
      checked === true &&
      errorNotEmail === '' &&
      errorPasswordUpperCase === '' &&
      errorPhoneNumberEmpty === '' &&
      errorPhoneNumberLength === '' &&
      errorRepeatPasswordEmpty === '' &&
      errorRepeatPassword === ''
    ) {
      handleRegistro();
    }
  };

  const handleRegistro = async () => {
    const formData = new FormData();
    formData.append('firstName', fantasyName);
    formData.append('lastName', fantasyName);
    formData.append('userType', 'Inmobiliaria');
    formData.append('password', password);
    formData.append('repeatPassword', repeatPassword);
    formData.append('mail', email);
    formData.append('contactMail', email);
    formData.append('fantasyName', fantasyName);
    formData.append('phone', `+549${phoneNumber}`);
    formData.append('cuit', cuit);
    console.log('API_VERSION: ', API_VERSION);

    const request = await fetch(
      `${'http://10.0.2.2:8080'}/${API_VERSION}/users`,
      {
        method: 'POST',
        body: formData,
      },
    );
    const response = await request.json();
    console.log('Register response: ', response);
    if (response.result === 'ok') {
      navigation.navigate('ActivarCuenta');
    } else {
      if (response.ok === false) {
        console.log('response.message ', response.message);
        if (response.errors) {
          onToggleSnackBar(Object.values(response.errors)[0].msg);
          console.log(Object.values(response.errors)[0].msg);
        } else {
          onToggleSnackBar(response.message);
          console.log(response.message);
        }
      }
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Snackbar
          wrapperStyle={{zIndex: 999, position: 'absolute'}}
          visible={visible}
          onDismiss={onDismissSnackBar}
          duration={3000}
          action={{
            label: 'OK',
            onPress: () => {
              setVisible(!visible);
            },
          }}>
          {errorMessage}
        </Snackbar>
        <Avatar.Image
          size={100}
          style={{marginTop: 30, alignContent: 'center', alignSelf: 'center'}}
          source={require('../../assets/images/Logo.png')}
          backgroundColor="#eff5f5"
        />
        <Text variant="headlineSmall" style={{marginLeft: 5}}>
          Registrate como Inmobiliaria
        </Text>
        <Text
          variant="headlineSmall"
          style={{marginTop: 10, display: 'flex', alignSelf: 'flex-start'}}>
          Email
        </Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={email => setEmail(email)}
        />
        {errorEmailEmpty ? (
          <Text
            style={{color: 'red', display: 'flex', alignSelf: 'flex-start'}}>
            {errorEmailEmpty}
          </Text>
        ) : null}
        {errorNotEmail ? (
          <Text
            style={{color: 'red', display: 'flex', alignSelf: 'flex-start'}}>
            {errorNotEmail}
          </Text>
        ) : null}
        <Text
          variant="headlineSmall"
          style={{marginTop: 10, display: 'flex', alignSelf: 'flex-start'}}>
          Nombre de la Inmobiliaria
        </Text>
        <TextInput
          style={styles.input}
          value={fantasyName}
          onChangeText={fantasyName => setFantasyName(fantasyName)}
        />
        {errorFantasyNameEmpty ? (
          <Text
            style={{color: 'red', display: 'flex', alignSelf: 'flex-start'}}>
            {errorFantasyNameEmpty}
          </Text>
        ) : null}
        <Text
          variant="headlineSmall"
          style={{marginTop: 10, display: 'flex', alignSelf: 'flex-start'}}>
          CUIT
        </Text>
        <TextInput
          keyboardType="numeric"
          style={styles.inputCuit}
          value={cuit}
          onChangeText={cuit => setCuit(cuit)}
        />
        {errorCuitEmpty ? (
          <Text
            style={{color: 'red', display: 'flex', alignSelf: 'flex-start'}}>
            {errorCuitEmpty}
          </Text>
        ) : null}
        {errorCuitLength ? (
          <Text
            style={{color: 'red', display: 'flex', alignSelf: 'flex-start'}}>
            {errorCuitLength}
          </Text>
        ) : null}
        <Text
          variant="headlineSmall"
          style={{marginTop: 10, display: 'flex', alignSelf: 'flex-start'}}>
          Teléfono
        </Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          keyboardType="numeric"
          onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
          secureTextEntry={false}
        />
        {errorPhoneNumberEmpty ? (
          <Text
            style={{color: 'red', display: 'flex', alignSelf: 'flex-start'}}>
            {errorPhoneNumberEmpty}
          </Text>
        ) : null}
        {errorPhoneNumberLength ? (
          <Text
            style={{color: 'red', display: 'flex', alignSelf: 'flex-start'}}>
            {errorPhoneNumberLength}
          </Text>
        ) : null}
        <Text
          variant="headlineSmall"
          style={{marginTop: 10, display: 'flex', alignSelf: 'flex-start'}}>
          Contraseña
        </Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={password => setPassword(password)}
          secureTextEntry={true}
        />
        {errorPasswordEmpty ? (
          <Text
            style={{color: 'red', display: 'flex', alignSelf: 'flex-start'}}>
            {errorPasswordEmpty}
          </Text>
        ) : null}
        {errorPasswordLength ? (
          <Text
            style={{color: 'red', display: 'flex', alignSelf: 'flex-start'}}>
            {errorPasswordLength}
          </Text>
        ) : null}
        {errorPasswordUpperCase ? (
          <Text
            style={{color: 'red', display: 'flex', alignSelf: 'flex-start'}}>
            {errorPasswordUpperCase}
          </Text>
        ) : null}
        <Text
          variant="headlineSmall"
          style={{marginTop: 10, display: 'flex', alignSelf: 'flex-start'}}>
          Repetir Contraseña
        </Text>
        <TextInput
          style={styles.input}
          value={repeatPassword}
          onChangeText={repeatPassword => setRepeatPassword(repeatPassword)}
          secureTextEntry={true}
        />
        {errorRepeatPasswordEmpty ? (
          <Text
            style={{color: 'red', display: 'flex', alignSelf: 'flex-start'}}>
            {errorRepeatPasswordEmpty}
          </Text>
        ) : null}
        {errorRepeatPassword ? (
          <Text
            style={{color: 'red', display: 'flex', alignSelf: 'flex-start'}}>
            {errorRepeatPassword}
          </Text>
        ) : null}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
            style={styles.checkbox}
          />
          <Text style={{marginRight: 3.3}}>Acepto los</Text>
          <TouchableOpacity>
            <Text style={{color: '#0377ff'}}>
              Términos y Condiciones de Uso
            </Text>
          </TouchableOpacity>
        </View>
        {errorChecked ? (
          <Text
            style={{color: 'red', display: 'flex', alignSelf: 'flex-start'}}>
            {errorChecked}
          </Text>
        ) : null}

        <Button
          style={styles.button}
          mode="contained"
          onPress={() => handleButtonPress()}>
          Registrar
        </Button>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity>
            <Text
              style={styles.link}
              onPress={() => navigation.navigate('RecuperarMail')}>
              Olvidé mi contraseña
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  inputCuit: {
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
  link: {
    color: '#0377ff',
    marginTop: 35,
    marginBottom: 20,
    alignContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    height: 100,
    width: 100,
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
});

export default RegistrarUsuarioInm;
