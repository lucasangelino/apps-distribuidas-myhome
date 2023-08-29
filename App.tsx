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
import Splash from './app/screens/Splash';

const Stack = createNativeStackNavigator();

function App() {
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
