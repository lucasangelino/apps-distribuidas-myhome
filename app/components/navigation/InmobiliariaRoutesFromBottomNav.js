/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Comentarios from '../../screens/inmobiliaria/Comentarios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InmobiliariaProfile from '../../screens/inmobiliaria/InmobiliariaProfile';
import AppBar from '../appbar/AppBar';
import InmobiliariaHome from '../../screens/inmobiliaria/InmobiliariaHome';

const Tab = createBottomTabNavigator();

const InmobiliariaRoutesFromBottomNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="InmobiliariaHome"
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#EB6440',
        tabBarInactiveTintColor: '#ccc',
        paddingtop: 100,
        headerShown: true,
        header: props => <AppBar {...props} />,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'InmobiliariaHome') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Comentarios') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="InmobiliariaHome" component={InmobiliariaHome} />
      <Tab.Screen name="Comentarios" component={Comentarios} />
      <Tab.Screen name="Profile" component={InmobiliariaProfile} />
    </Tab.Navigator>
  );
};

export default InmobiliariaRoutesFromBottomNav;
