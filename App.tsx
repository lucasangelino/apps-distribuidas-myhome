/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// components
import Home from './app/screens/Home';
import LoginInmobiliaria from './app/screens/LoginInmobiliaria';
import RegistrarUsuarioInm from './app/screens/RegistrarUsuarioInm';
import RecuperarMail from './app/screens/RecuperarMail';
import Login from './app/screens/Login';
import RecuperarContraseña from './app/screens/RecuperarContraseña';
import CambiarContraseña from './app/screens/CambiarContraseña';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: '#E5E5E5',
              flex: 1,
              minHeight: '100%',
            },
          }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="LoginInmobiliaria"
            component={LoginInmobiliaria}
          />
          <Stack.Screen name="RecuperarFlier" component={RecuperarContraseña} />
          <Stack.Screen name="RecuperarMail" component={RecuperarMail} />
          <Stack.Screen name="Recuperar" component={RecuperarMail} />
          <Stack.Screen
            name="RegistrarUsuarioInm"
            component={RegistrarUsuarioInm}
          />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
