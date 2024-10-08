import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserComentarAlquiler from '../../screens/user/UserComentarAlquiler';
import UserAlquileres from '../../screens/user/UserAlquileres';
import UserComentarioExito from '../../screens/user/UserComentarioExito';

const Stack = createNativeStackNavigator();

const UserMisAlquileresNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="UserAlquileres">
      <Stack.Screen
        name="UserAlquileres"
        component={UserAlquileres}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserComentarAlquiler"
        component={UserComentarAlquiler}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserComentarioExito"
        component={UserComentarioExito}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default UserMisAlquileresNavigation;
