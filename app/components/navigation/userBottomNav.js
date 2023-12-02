/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserHome from '../../screens/user/UserHome';
import UserMisAlquileres from '../../screens/user/UserMisAlquileres';
import UserFavoritos from '../../screens/user/UserFavoritos';
import UserProfile from '../../screens/user/UserProfile';
import AppBar from '../appbar/AppBar';

const Tab = createBottomTabNavigator();

const UserBottomNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#EB6440',
        tabBarInactiveTintColor: '#ccc',
        headerShown: true,
        header: props => <AppBar {...props} />,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'UserHome') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Mis Alquileres') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          } else if (route.name === 'Favoritos') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="UserHome" component={UserHome} />
      <Tab.Screen name="Mis Alquileres" component={UserMisAlquileres} />
      <Tab.Screen name="Favoritos" component={UserFavoritos} />
      <Tab.Screen name="Perfil" component={UserProfile} />
    </Tab.Navigator>
  );
};

export default UserBottomNav;
