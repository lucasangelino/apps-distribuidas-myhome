import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InmobiliariaRoutesFromBottomNav from './app/components/navigation/InmobiliariaRoutesFromBottomNav';
import UserBottomNav from './app/components/navigation/userBottomNav';
import {AddPropiedadStepOne} from './app/screens/AddPropiedadStepOne';

const Stack = createNativeStackNavigator();

function App() {
  const [isUser, _] = useState(false);

  if (isUser) {
    return <UserApp />;
  }
  return <InmobiliariaApp />;
}

const UserApp = () => {
  return (
    <NavigationContainer>
      <UserBottomNav />
    </NavigationContainer>
  );
};

const InmobiliariaApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="InmobiliariaRoutesFromBottomNav"
          component={InmobiliariaRoutesFromBottomNav}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddPropiedadStepOne"
          component={AddPropiedadStepOne}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
