import React from 'react';
export const AuthContext = React.createContext();

const initialAuthState = {
  hasUser: false,
  loggedIn: false,
  user: {
    isInmobiliaria: false,
    name: '',
    email: '',
    photoUrl: '',
    idToken: '',
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
