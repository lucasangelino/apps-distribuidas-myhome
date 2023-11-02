import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InmobiliariaRoutesFromBottomNav from './app/components/navigation/InmobiliariaRoutesFromBottomNav';
import UserBottomNav from './app/components/navigation/userBottomNav';
import Login from './app/screens/Login';
import { AddPropiedadStepOne } from './app/screens/AddPropiedadStepOne';
import { AuthContext } from './app/context/AppContext';

const Stack = createNativeStackNavigator();

function App() {
  const { auth } = useContext(AuthContext);
  console.log('hasUser', auth.user.isInmobiliaria);
  console.log('!hasUser', !auth.hasUser);

  if (!auth.hasUser) {
    return <AuthRouter />;
  }

  if (true) {
    return <InmobiliariaApp />;
  }

  return <UserApp />;
}

const AuthRouter = () => {
  console.log('AuthRouter');
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddPropiedadStepOne"
          component={AddPropiedadStepOne}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
