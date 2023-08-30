/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// components
import Splash from './app/screens/Splash';
import {Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();

function App() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Splash" component={Splash} />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: '#EFF5F5',
              flex: 1,
              minHeight: '100%',
              paddingHorizontal: 5,
            },
          }}>
          <Stack.Screen name="Home" component={Splash} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
