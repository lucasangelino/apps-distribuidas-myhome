import {useContext} from 'react';
import {AppContext} from '../context/AppContext';

export function useUser() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useUser debe estar dentro del proveedor AppProvider');
  }
  return context;
}
