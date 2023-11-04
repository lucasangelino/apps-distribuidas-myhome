import axios from 'axios';

const BACKEND_URL = 'http://10.0.2.2:8080';
const API_VERSION = 'v1';

export const altaPropiedad = async ({payload}) => {
  const URL = `${BACKEND_URL}/${API_VERSION}/properties`;
  const {tipoPropiedad, propiedadTitle, propiedadDes} = payload;
  try {
    const response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify({
        propertyType: tipoPropiedad,
        title: propiedadTitle,
        description: propiedadDes,
      }),
      headers: {
        // TODO: remove token
        'Content-Type': 'application/json',
        Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjk5OTksImlhdCI6MTY5OTA0OTUyMSwiZXhwIjoxNjk5MTM1OTIxfQ.vUL5nlfC9bG_fblEKyfmfbqiVsBDDdhI2kj9ixZp1Yw'}`,
      },
    });

    const responseJson = await response.json();
    return {
      status: response.status,
      id: responseJson.data.id,
    };
  } catch (error) {
    console.log(error);
  }
};

export const updatePropiedad = async ({payload}) => {
  const URL = `${BACKEND_URL}/${API_VERSION}/properties`;
  const {
    propertyId,
    calleAltura,
    ciudad,
    provincia,
    barrio,
    localidad,
    piso,
    geoLocation,
  } = payload;

  try {
    const response = await fetch(URL, {
      method: 'PATCH',
      body: JSON.stringify({
        propertyId: propertyId,
        location: {
          id: geoLocation.place_id,
          latitude: geoLocation.latitude,
          longitude: geoLocation.longitude,
          street: calleAltura,
          streetNumber: 100,
          country: ciudad,
          province: provincia,
          district: barrio,
          department: piso,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjk5OTksImlhdCI6MTY5OTA0OTUyMSwiZXhwIjoxNjk5MTM1OTIxfQ.vUL5nlfC9bG_fblEKyfmfbqiVsBDDdhI2kj9ixZp1Yw'}`,
      },
    });
    const responseJson = await response.json();
    return {
      status: response.status,
      message: responseJson.message,
    };
  } catch (error) {
    console.log(error);
  }
};

export const updatePropiedadStepThree = async ({payload}) => {
  const URL = `${BACKEND_URL}/${API_VERSION}/properties`;
  const {
    propertyId,
    propertyType,
    numRooms,
    numBathrooms,
    numCars,
    balcony,
    roofTop,
    vault,
    mtsCovered,
    mtsHalfCovered,
    mtsUncovered,
    antiquity,
    contract_types,
  } = payload;

  console.log('payload', payload);

  try {
    const response = await fetch(URL, {
      method: 'PATCH',
      body: JSON.stringify({
        propertyId: propertyId,
        propertyType: propertyType,
        numRooms: numRooms,
        numBathrooms: numBathrooms,
        numCars: numCars,
        balcony: balcony,
        roofTop: roofTop,
        vault: vault,
        mtsCovered: mtsCovered,
        mtsHalfCovered: mtsHalfCovered,
        mtsUncovered: mtsUncovered,
        antiquity: antiquity,
        contract_types: contract_types,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjk5OTksImlhdCI6MTY5OTA0OTUyMSwiZXhwIjoxNjk5MTM1OTIxfQ.vUL5nlfC9bG_fblEKyfmfbqiVsBDDdhI2kj9ixZp1Yw'}`,
      },
    });
    const responseJson = await response.json();
    return {
      status: response.status,
      message: responseJson.message,
    };
  } catch (error) {
    console.log(error);
  }
};

export const updatePropiedadStepFour = async ({payload}) => {
  const URL = `${BACKEND_URL}/${API_VERSION}/properties`;
  const {
    propertyId,
    sum,
    swimmingPool,
    sport_field,
    laundry,
    sauna,
    security,
    game_room,
    position,
    orientation,
    photos,
  } = payload;

  console.log('payload', payload);

  try {
    const response = await fetch(URL, {
      method: 'PATCH',
      body: JSON.stringify({
        propertyId: 26,
        sum: sum,
        swimming_pool: swimmingPool,
        sport_field: sport_field,
        laundry: laundry,
        sauna: sauna,
        security: security,
        game_room: game_room,
        position: position,
        orientation: orientation,
        photos: photos[0].fileName,
      }),
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjk5OTksImlhdCI6MTY5OTA0OTUyMSwiZXhwIjoxNjk5MTM1OTIxfQ.vUL5nlfC9bG_fblEKyfmfbqiVsBDDdhI2kj9ixZp1Yw'}`,
      },
    });
    const responseJson = await response.json();
    return {
      status: response.status,
      message: responseJson.message,
    };
  } catch (error) {
    console.log(error);
  }
};
