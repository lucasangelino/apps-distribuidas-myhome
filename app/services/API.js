/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL, API_VERSION } from 'react-native-dotenv';

export const altaPropiedad = async ({ payload }) => {
  const URL = `${BACKEND_URL}/${API_VERSION}/properties`;
  const { tipoPropiedad, propiedadTitle, propiedadDes } = payload;

  try {
    const jsonValue = await AsyncStorage.getItem('userToken');
    const userData = JSON.parse(jsonValue);
    const token = userData.token;

    const response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify({
        propertyType: tipoPropiedad,
        title: propiedadTitle,
        description: propiedadDes,
        token: token,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();
    console.log('responseJson', responseJson);
    return {
      status: response.status,
      id: responseJson.data.id,
    };
  } catch (error) {
    console.log(error);
  }
};

export const updatePropiedad = async ({ payload }) => {
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
    const jsonValue = await AsyncStorage.getItem('userToken');
    const userData = JSON.parse(jsonValue);
    const token = userData.token;

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
        Authorization: 'Bearer ' + token,
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

export const updatePropiedadStepThree = async ({ payload }) => {
  const URL = `${BACKEND_URL}/${API_VERSION}/properties`;
  const {
    propertyId,
    propertyType,
    numEnvironments,
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
    const jsonValue = await AsyncStorage.getItem('userToken');
    const userData = JSON.parse(jsonValue);
    const token = userData.token;

    const response = await fetch(URL, {
      method: 'PATCH',
      body: JSON.stringify({
        propertyId: propertyId,
        propertyType: propertyType,
        numEnvironments: numEnvironments,
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
        Authorization: 'Bearer ' + token,
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

export const updatePropiedadStepFour = async ({ payload }) => {
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

  try {
    const jsonValue = await AsyncStorage.getItem('userToken');
    const userData = JSON.parse(jsonValue);
    const token = userData.token;

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
    console.log('URL ::::::::::::', photos);

    const response = await fetch(URL, {
      method: 'PATCH',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      },
    });
    const responseJson = await response.json();
    console.log('responseJson ::::::::::::', responseJson);
    const status = response.status;
    console.log('status ::::::::::::', status);
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

export const getPropiedades = async ({ filters } = {}) => {
  const jsonValue = await AsyncStorage.getItem('userToken');
  const userData = JSON.parse(jsonValue);
  const token = userData.token;

  const URL = `${BACKEND_URL}/${API_VERSION}/properties/owned?orderType=DESC&orderBy=title`;

  try {
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization:'Bearer ' + token
      },
    });
    const responseJson = await response.json();
    console.log('responseJson', responseJson);
    return {
      status: response.status,
      data: responseJson.data,
    };
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async ({ formData } = {}) => {
  const jsonValue = await AsyncStorage.getItem('userToken');
  const userData = JSON.parse(jsonValue);
  const token = userData.token;

  try {
    const response = await fetch(`${BACKEND_URL}/${API_VERSION}/users`, {
      method: 'PATCH',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      },
    });

    const responseJson = await response.json();
    console.log('responseJson', responseJson);
    return {
      status: response.status,
      data: responseJson.data,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getUserProfile = async () => {
  const jsonValue = await AsyncStorage.getItem('userToken');
  const userData = JSON.parse(jsonValue);
  const token = userData.token;

  try {
    const response = await fetch(`${BACKEND_URL}/${API_VERSION}/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const responseJson = await response.json();
    console.log('responseJson', responseJson);
    return {
      status: response.status,
      data: responseJson.data,
    };
  } catch (error) {
    console.log(error);
  }
};
