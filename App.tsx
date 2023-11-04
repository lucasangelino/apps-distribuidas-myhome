import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InmobiliariaRoutesFromBottomNav from './app/components/navigation/InmobiliariaRoutesFromBottomNav';
import UserBottomNav from './app/components/navigation/userBottomNav';
import Login from './app/screens/LoginWithGoogle';
import {AddPropiedadStepper} from './app/screens/AddPropiedadStepper';
import {AuthContext} from './app/context/AppContext';
import AppBar from './app/components/appbar/AppBar';

const Stack = createNativeStackNavigator();

function App() {
  const {auth} = useContext(AuthContext);

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
          options={{headerShown: false}}
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
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddPropiedadStepper"
          component={AddPropiedadStepper}
          // options={{
          //   header: () => <AppBar />,
          // }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
