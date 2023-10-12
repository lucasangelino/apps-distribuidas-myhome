import React from 'react';
export const AppContext = React.createContext();

const inmobiliariaRole = {
  isUser: false,
  name: 'Ideas',
  email: 'ideas@gmail.com',
  phone: '123456789',
  cuit: '123456789',
  location: {
    latitude: -34.603722,
    longitude: -58.381592,
  },
};

const userRole = {
  isUser: 'true',
  name: 'Lucas',
  lastName: 'Angelino',
  email: 'angelino@gmail.com',
  phone: '999999999',
  location: {
    latitude: -34.603722,
    longitude: -58.381592,
  },
};

function AppProvider({children}) {
  const [user, setUser] = React.useState(userRole);

  return (
    <AppContext.Provider value={{user, setUser}}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
