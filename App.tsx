import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InmobiliariaRoutesFromBottomNav from './app/components/navigation/InmobiliariaRoutesFromBottomNav';
import UserBottomNav from './app/components/navigation/userBottomNav';
import {AddPropiedadStepper} from './app/screens/AddPropiedadStepper';
import {AuthContext} from './app/context/AppContext';
import Login from './app/screens/auth/Login';
import LoginInmobiliaria from './app/screens/auth/LoginInmobiliaria';
import RegistrarUsuarioInm from './app/screens/auth/RegistrarUsuarioInm';
import RecuperarMail from './app/screens/auth/RecuperarMail';
import RecuperarContraseña from './app/screens/auth/RecuperarContraseña';
import ActivarCuenta from './app/screens/auth/ActivarCuenta';
import PropiedadDetail from './app/components/PropiedadDetail';
import ReservarPropiedad from './app/components/ReservarPropiedad';
import Contactar from './app/components/Contactar';
import ReservarPropiedadExito from './app/components/ReservarPropiedadExito';
import SolicitarVisita from './app/components/SolicitarVisita';
import SolicitarVisitaExito from './app/components/SolicitarVisitaExito';
import ContactarExito from './app/components/ContactarExito';

const Stack = createNativeStackNavigator();

function App() {
  const {auth} = useContext(AuthContext);

  if (!auth.hasUser) {
    return <AuthRouter />;
  }

  if (auth.user.userType === 'Inmobiliaria') {
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
        <Stack.Screen
          name="LoginInmobiliaria"
          component={LoginInmobiliaria}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegistrarUsuarioInm"
          component={RegistrarUsuarioInm}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RecuperarMail"
          component={RecuperarMail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RecuperarContraseña"
          component={RecuperarContraseña}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ActivarCuenta"
          component={ActivarCuenta}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const UserApp = () => {
  return (
    <NavigationContainer>
      <Stack.Screen
        name="PropiedadDetail"
        component={PropiedadDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Contactar"
        component={Contactar}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ContactarExito"
        component={ContactarExito}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReservarPropiedad"
        component={ReservarPropiedad}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReservaExitosa"
        component={ReservarPropiedadExito}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SolicitarVisita"
        component={SolicitarVisita}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SolicitarVisitaExito"
        component={SolicitarVisitaExito}
        options={{headerShown: false}}
      />
      <UserBottomNav />
    </NavigationContainer>
  );
};

const InmobiliariaApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
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
