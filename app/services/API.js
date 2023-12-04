/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BACKEND_URL, API_VERSION} from 'react-native-dotenv';

export const altaPropiedad = async ({payload}) => {
  const URL = `${BACKEND_URL}/${API_VERSION}/properties`;
  const {propertyId, tipoPropiedad, propiedadTitle, propiedadDes} = payload;

  try {
    const jsonValue = await AsyncStorage.getItem('userToken');
    const userData = JSON.parse(jsonValue);
    const token = userData.token;
    console.log('propertyId', propertyId);

    const response = await fetch(URL, {
      method: `${propertyId ? 'PATCH' : 'POST'}`,
      body: JSON.stringify({
        propertyId: propertyId,
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

export const updatePropiedadStepThree = async ({payload}) => {
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

export const getPropiedades = async (
  filters = {
    publicada: true,
    reservada: true,
    guardada: true,
    despublicada: true,
  },
) => {
  const jsonValue = await AsyncStorage.getItem('userToken');
  const userData = JSON.parse(jsonValue);
  const token = userData.token;

  console.log('filters', filters);

  let queryParams = '?orderType=ASC&orderBy=status';

  if (filters !== undefined) {
    if (filters.publicada) {
      queryParams = queryParams + '&publicada=' + filters.publicada;
    }

    if (filters.despublicada) {
      queryParams = queryParams + '&despublicada=' + filters.despublicada;
    }

    if (filters.guardada) {
      queryParams = queryParams + '&guardada=' + filters.guardada;
    }

    if (filters.reservada) {
      queryParams = queryParams + '&reservada=' + filters.reservada;
    }
  }

  console.log('queryParams', queryParams);

  const URL = `${BACKEND_URL}/${API_VERSION}/properties/owned` + queryParams;

  try {
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
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

export const updateUser = async ({formData} = {}) => {
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

export const deletePropiedad = async ({id}) => {
  const URL = `${BACKEND_URL}/${API_VERSION}/properties?propertyId=${id}`;

  try {
    const jsonValue = await AsyncStorage.getItem('userToken');
    const userData = JSON.parse(jsonValue);
    const token = userData.token;

    const response = await fetch(URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    const responseJson = await response.json();
    console.log('Delete Property: ', responseJson);
    return {
      status: response.status,
      message: responseJson.message,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getNearestProperties = async ({filters, countFilters} = {}) => {
  const auth = await AsyncStorage.getItem('userToken');
  const userData = JSON.parse(auth);
  const token = userData.token;
  console.log('filters', filters);

  // &contractType=${filters.contractType}
  // &currency=${filters.currency}
  // const URL = `${BACKEND_URL}/${API_VERSION}/properties`;
  let queryParams = '?orderType=ASC';
  if (filters !== undefined) {
    if (filters.numRooms !== 0) {
      queryParams = queryParams + '&numRooms=' + filters.numRooms;
    }
    if (filters.numCars !== 0) {
      queryParams = queryParams + '&numCars=' + filters.numCars;
    }
    if (filters.propertyType !== '') {
      queryParams = queryParams + '&propertyType=' + filters.propertyType;
    }
    if (filters.numEnvironments !== 0) {
      queryParams = queryParams + '&numEnvironments=' + filters.numEnvironments;
    }
    if (filters.numBathrooms !== 0) {
      queryParams = queryParams + '&numBathrooms=' + filters.numBathrooms;
    }
    if (filters.sum) {
      queryParams = queryParams + '&sum=' + filters.sum;
    }
    if (filters.swimming_pool) {
      queryParams = queryParams + '&swimming_pool=' + filters.swimming_pool;
    }
    if (filters.sport_field) {
      queryParams = queryParams + '&sport_field=' + filters.sport_field;
    }
    if (filters.laundry) {
      queryParams = queryParams + '&laundry=' + filters.laundry;
    }
    if (filters.solarium) {
      queryParams = queryParams + '&solarium=' + filters.solarium;
    }
    if (filters.gym) {
      queryParams = queryParams + '&gym=' + filters.gym;
    }
    if (filters.vault) {
      queryParams = queryParams + '&vault=' + filters.vault;
    }
    if (filters.security) {
      queryParams = queryParams + '&security=' + filters.security;
    }
    if (filters.game_room) {
      queryParams = queryParams + '&game_room=' + filters.game_room;
    }
    if (filters.currency !== '') {
      queryParams = queryParams + '&currency=' + filters.currency;
    }
    if (filters.minPrice !== 0) {
      queryParams = queryParams + '&minPrice=' + filters.minPrice;
    }
    if (filters.maxPrice !== 0) {
      queryParams = queryParams + '&maxPrice=' + filters.maxPrice;
    }
  }
  let URL = `${BACKEND_URL}/${API_VERSION}/properties`;

  if (countFilters > 0) {
    URL = URL + queryParams;
  }

  console.log('URL', URL);
  try {
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const responseJson = await response.json();
    // console.log('filtered properties', responseJson);
    return {
      status: response.status,
      data: responseJson.data,
    };
  } catch (error) {
    console.log('Error ', error);
  }
};

export const getUserFavorites = async () => {
  const auth = await AsyncStorage.getItem('userToken');
  const userData = JSON.parse(auth);
  const token = userData.token;
  const URL = `${BACKEND_URL}/${API_VERSION}/users/favs`;

  try {
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const responseJson = await response.json();
    console.log('Get User Favorites: ', responseJson);
    return {
      status: response.status,
      data: responseJson.data,
    };
  } catch (error) {
    console.log(error);
  }
};

export const addUserFavorite = async propertyId => {
  const auth = await AsyncStorage.getItem('userToken');
  const userData = JSON.parse(auth);
  const token = userData.token;
  const URL = `${BACKEND_URL}/${API_VERSION}/users/favs`;

  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        propertyId: propertyId.id,
      }),
    });
    const responseJson = await response.json();
    console.log('Add favorite', responseJson);
    return {
      status: response.status,
      data: responseJson.data,
    };
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserFavorite = async favoriteId => {
  const auth = await AsyncStorage.getItem('userToken');
  const userData = JSON.parse(auth);
  const token = userData.token;
  const URL = `${BACKEND_URL}/${API_VERSION}/users/favs`;

  try {
    const response = await fetch(URL, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        favoriteId: favoriteId.favId,
      }),
    });
    const responseJson = await response.json();
    console.log('Delete User Favorite', responseJson);
    return {
      status: response.status,
      data: responseJson.data,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getUserAlquileres = async () => {
  const auth = await AsyncStorage.getItem('userToken');
  const userData = JSON.parse(auth);
  const token = userData.token;
  const URL = `${BACKEND_URL}/${API_VERSION}/contracts`;

  try {
    const response = await fetch(URL, {
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

export const postUserComment = async ({
  contractTypeId,
  reviewType,
  commentMessage,
}) => {
  const URL = `${BACKEND_URL}/${API_VERSION}/contracts`;

  try {
    const jsonValue = await AsyncStorage.getItem('userToken');
    const userData = JSON.parse(jsonValue);
    const token = userData.token;

    const response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify({
        contractTypeId: contractTypeId,
        reviewType: reviewType,
        commentMessage: commentMessage,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    const responseJson = await response.json();
    console.log('responseJson', responseJson);
    return {
      ok: responseJson.ok,
      id: responseJson.data.id,
    };
  } catch (error) {
    console.log(error);
  }
};
