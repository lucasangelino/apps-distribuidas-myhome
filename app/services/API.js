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
        Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjk5OTksImlhdCI6MTY5OTIyMTg5MiwiZXhwIjoxNjk5MzA4MjkyfQ.3pws1e4Y3cHpUOMB1sKrIBBSb-Pv5D5ljR5bOfRWHiQ'}`,
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
        Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjk5OTksImlhdCI6MTY5OTIyMTg5MiwiZXhwIjoxNjk5MzA4MjkyfQ.3pws1e4Y3cHpUOMB1sKrIBBSb-Pv5D5ljR5bOfRWHiQ'}`,
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
        Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjk5OTksImlhdCI6MTY5OTIyMTg5MiwiZXhwIjoxNjk5MzA4MjkyfQ.3pws1e4Y3cHpUOMB1sKrIBBSb-Pv5D5ljR5bOfRWHiQ'}`,
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
    swimming_pool,
    sport_field,
    laundry,
    gym,
    sauna,
    security,
    game_room,
    position,
    orientation,
    photos,
  } = payload;

  const formData = new FormData();
  formData.append('propertyId', propertyId);
  formData.append('sum', sum);
  formData.append('swimming_pool', swimming_pool);
  formData.append('gym', gym);
  formData.append('sport_field', sport_field);
  formData.append('laundry', laundry);
  formData.append('sauna', sauna);
  formData.append('security', security);
  formData.append('game_room', game_room);
  formData.append('position', position);
  formData.append('orientation', orientation);

  photos.forEach((element, idx) => {
    formData.append('photos[' + idx + ']', element);
  });

  console.log('formData ::::::::::::', formData);

  try {
    const response = await fetch(URL, {
      method: 'PATCH',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjk5OTksImlhdCI6MTY5OTIyMTg5MiwiZXhwIjoxNjk5MzA4MjkyfQ.3pws1e4Y3cHpUOMB1sKrIBBSb-Pv5D5ljR5bOfRWHiQ'}`,
      },
    });
    const responseJson = await response.json();
    console.log('responseJson ::::::::::::', responseJson);
    const status = response.status;
    return {
      success: status === 200,
      status: status,
      message: responseJson.message,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 'error',
      message: error.message,
    };
  }
};

export const getPropiedades = async () => {
  const URL = `${BACKEND_URL}/${API_VERSION}/properties`;
  try {
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjk5OTksImlhdCI6MTY5OTIyMTg5MiwiZXhwIjoxNjk5MzA4MjkyfQ.3pws1e4Y3cHpUOMB1sKrIBBSb-Pv5D5ljR5bOfRWHiQ'}`,
      },
    });
    const responseJson = await response.json();
    return {
      status: response.status,
      data: responseJson.data,
    };
  } catch (error) {
    console.log(error);
  }
};
