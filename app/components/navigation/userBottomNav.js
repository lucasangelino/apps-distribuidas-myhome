/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserHome from '../../screens/user/UserHome';
import UserMisAlquileres from '../../screens/user/UserMisAlquileres';
import UserFavoritos from '../../screens/user/UserFavoritos';
import UserProfile from '../../screens/user/UserProfile';

const Tab = createBottomTabNavigator();

const UserBottomNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#EB6440',
        tabBarInactiveTintColor: '#f0a895',
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'UserHome') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'UserMisAlquileres') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          } else if (route.name === 'UserFavoritos') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'UserProfile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="UserHome" component={UserHome} />
      <Tab.Screen name="UserMisAlquileres" component={UserMisAlquileres} />
      <Tab.Screen name="UserFavoritos" component={UserFavoritos} />
      <Tab.Screen name="UserProfile" component={UserProfile} />
    </Tab.Navigator>
  );
};

export default UserBottomNav;
