import React from 'react';
export const UsuarioContext = React.createContext();

const initialState = {
  nombre: '',
  email: '',
  telefono: ''
};

function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = React.useState(initialState);
  const [favorites, setFavorites] = React.useState([]);
  const [contratos, setContratos] = React.useState([]);

  return (
    <UsuarioContext.Provider
      value={{ usuario, setUsuario, favorites, setFavorites, contratos, setContratos }}>
      {children}
    </UsuarioContext.Provider>
  );
}

export default UsuarioProvider;
