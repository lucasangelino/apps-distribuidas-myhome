import React from 'react';
export const InmobiliariaContext = React.createContext();

const initialState = {
  nombre: '',
  email: '',
  telefono: '',
  cuit: '',
  nombreFantasia: '',
};

const initialStatePublicacion = {
  publicada: false,
  tipoOperacion: 'temporada',
  tipoPropiedad: 'casa',
  titulo: 'Propiedad en venta',
  descripcion: 'Propiedad en venta',
  direccion: {
    calleAltrura: '',
    ciudad: '',
    provincia: '',
    barrio: '',
    localidad: '',
    pisoDepto: '',
    fullAddress: '',
    latitud: -34.603722,
    longitud: -58.381592,
  },
  ambientes: 1,
  dormitorios: 1,
  banios: 1,
  cocheras: 0,
  balcones: 0,
  terrazas: 0,
  bauleras: 0,
  superficie: {
    cubierta: '1m2',
    semicubierta: '1m2',
    descubierta: '1m2',
  },
  antiguedad: '1',
  precio: 1,
  precioMoneda: 'usd',
  expensas: 0,
  expensasMoneda: 'ars',
  amenities: [],
  orientacion: 'norte',
  disposcion: 'frente',
  images: [],
  videoUrl: '',
};

function InmobiliariaProvider({children}) {
  const [inmobiliaria, setInmobiliaria] = React.useState(initialState);
  const [publicacion, setPublicacion] = React.useState(initialStatePublicacion);

  return (
    <InmobiliariaContext.Provider
      value={{inmobiliaria, publicacion, setInmobiliaria, setPublicacion}}>
      {children}
    </InmobiliariaContext.Provider>
  );
}

export default InmobiliariaProvider;
