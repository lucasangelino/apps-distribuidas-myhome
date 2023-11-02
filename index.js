/**
 * @format
 */

import * as React from 'react';
import {AppRegistry} from 'react-native';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import App from './App';
import {name as appName} from './app.json';
import AuthProvider from './app/context/AppContext';
import InmobiliariaProvider from './app/context/InmobiliariaContext';

const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    primary: '#EB6440',
    secondary: '#497174',
    triary: '#F2C94C',
    outline: '#EB6440',
  },
};

export default function Main() {
  return (
    <AuthProvider>
      <InmobiliariaProvider>
        <PaperProvider theme={theme}>
          <App />
        </PaperProvider>
      </InmobiliariaProvider>
    </AuthProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
