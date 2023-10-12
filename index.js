/**
 * @format
 */

import * as React from 'react';
import {AppRegistry} from 'react-native';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import App from './App';
import {name as appName} from './app.json';
import AppProvider from './app/context/AppContext';

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
  },
};

export default function Main() {
  return (
    <AppProvider>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </AppProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
