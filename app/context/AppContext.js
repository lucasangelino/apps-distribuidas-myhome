import React from 'react';
export const AuthContext = React.createContext();

const initialAuthState = {
  hasUser: false,
  loggedIn: false,
  user: {
    contactMail: '',
    cuit: '',
    fantasyName: '',
    firstName: '',
    id: '',
    mail: '',
    phone: '',
    photo: '',
    status: '',
    userType: '',
    name: '',
    email: '',
  },
};

function AuthProvider({children}) {
  const [auth, setAuth] = React.useState(initialAuthState);

  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
