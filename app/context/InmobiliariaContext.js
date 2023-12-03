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
  id: null,
  publicada: false,
  tipoOperacion: 'Venta',
  tipoPropiedad: 'Casa',
  titulo: 'Escribe un Titulo aquí',
  descripcion: 'Escribe una Descripción aquí',
  direccion: {
    calleAltrura: '',
    ciudad: '',
    provincia: '',
    barrio: '',
    localidad: '',
    pisoDepto: '',
    fullAddress: '',
    place_id: '',
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
    cubierta: 0,
    semicubierta: 0,
    descubierta: 0,
  },
  antiguedad: 0,
  precio: 0,
  precioMoneda: 'US$',
  expensas: 0,
  expensasMoneda: 'US$',
  amenities: [],
  orientacion: 'N',
  disposcion: 'Frente',
  images: [],
  videoUrl: '',
};

function InmobiliariaProvider({children}) {
  const [inmobiliaria, setInmobiliaria] = React.useState(initialState);
  const [publicacion, setPublicacion] = React.useState(initialStatePublicacion);
  const [propiedades, setPropiedades] = React.useState([]);

  return (
    <InmobiliariaContext.Provider
      value={{inmobiliaria, publicacion, setInmobiliaria, setPublicacion, propiedades, setPropiedades}}>
      {children}
    </InmobiliariaContext.Provider>
  );
}

export default InmobiliariaProvider;
