/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  TextInput as TextAreaInput,
  Image,
} from 'react-native';
import {Text, Button, TextInput, Checkbox} from 'react-native-paper';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import Dropdown from 'react-native-input-select';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MapView, {Marker} from 'react-native-maps';
import axios from 'axios';
import {InmobiliariaContext} from '../context/InmobiliariaContext';
import {
  altaPropiedad,
  updatePropiedad,
  updatePropiedadStepThree,
  updatePropiedadStepFour,
} from '../services/API';

export const AddPropiedadStepper = ({navigation}) => {
  const [activeStep, setActiveStep] = useState(0);

  const onNextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const onPrevStep = () => {
    setActiveStep(activeStep - 1);
  };

  const onSubmitSteps = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1, minHeight: '100%', paddingHorizontal: 5}}>
        <ProgressSteps
          activeStep={activeStep}
          activeStepIconColor={'#EB6440'}
          activeStepNumColor={'#fff'}
          activeStepIconBorderColor={'#EB6440'}
          activeLabelColor={'#fff'}
          completedProgressBarColor={'#EB6440'}
          completedStepIconColor={'#EB6440'}
          completedStepNumColor={'#fff'}
          borderWidth={5}
          labelColor={'#fff'}>
          <ProgressStep removeBtnRow={true} errors={false} scrollable={true}>
            <StepOne onNextStep={onNextStep} />
          </ProgressStep>
          <ProgressStep removeBtnRow={true} errors={false} scrollable={true}>
            <StepTwo onNextStep={onNextStep} onPrevStep={onPrevStep} />
          </ProgressStep>
          <ProgressStep removeBtnRow={true} errors={false} scrollable={true}>
            <StepThree onNextStep={onNextStep} onPrevStep={onPrevStep} />
          </ProgressStep>
          <ProgressStep removeBtnRow={true} errors={false} scrollable={true}>
            <StepFour onPrevStep={onPrevStep} onSubmitSteps={onSubmitSteps} />
          </ProgressStep>
        </ProgressSteps>
      </View>
    </View>
  );
};

const StepOne = ({onNextStep}) => {
  const {publicacion, setPublicacion} = useContext(InmobiliariaContext);

  const [tipoPropiedad, setTipoPropiedad] = React.useState(
    publicacion.tipoPropiedad,
  );
  const [propiedadTitle, setPropiedadTitle] = React.useState(
    publicacion.titulo,
  );
  const [propiedadDes, setPropieadDesc] = React.useState(
    publicacion.descripcion,
  );

  const publishPropiedadStepOne = async () => {
    const payload = {
      tipoPropiedad,
      propiedadTitle,
      propiedadDes,
    };
    const data = await altaPropiedad({payload});
    const id = data.id;
    setPublicacion({
      ...publicacion,
      id,
    });
    onNextStep();
  };

  const saveStepOne = () => {
    setPublicacion({
      ...publicacion,
      tipoPropiedad,
      titulo: propiedadTitle,
      descripcion: propiedadDes,
    });
  };

  return (
    <View style={{display: 'flex', gap: 10}}>
      <Text variant="titleLarge" style={{marginBottom: 15}}>
        Contanos, ¿Qué querés publicar?
      </Text>

      <Text variant="titleMedium" style={{marginTop: 10}}>
        Tipo de propiedad
      </Text>
      <Dropdown
        onValueChange={itemValue => setTipoPropiedad(itemValue)}
        placeholder="Elige una opción"
        options={[
          {label: 'Casa', value: 'Casa'},
          {label: 'PH', value: 'PH'},
          {label: 'Departamento', value: 'Departamento'},
        ]}
        selectedValue={tipoPropiedad}
        primaryColor={'#EB6440'}
        dropdownStyle={{
          borderWidth: 1,
          borderColor: '#EB6440',
          borderRadius: 10,
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginVertical: 10,
        }}
        checkboxComponentStyles={{
          checkboxStyle: {
            borderWidth: 1,
            borderColor: '#EB6440',
          },
          checkboxLabelStyle: {
            color: '#000',
            fontSize: 16,
            fontWeight: 'thin',
          },
        }}
        listHeaderComponent={
          <View style={styles.customComponentContainer}>
            <Text style={styles.text}>💡 Elige el tipo de propiedad</Text>
          </View>
        }
        listFooterComponent={
          <View style={styles.customComponentContainer}>
            <Text>Solo puedes elegir una opción</Text>
          </View>
        }
        modalOptionsContainerStyle={{
          padding: 10,
          backgroundColor: '#fff',
          borderRadius: 10,
          borderWidth: 2,
          borderColor: '#EB6440',
        }}
        listComponentStyles={{
          sectionHeaderStyle: {
            padding: 10,
            backgroundColor: 'green',
            color: '#000',
            width: '30%',
          },
        }}
      />
      <Text variant="titleLarge" style={{marginTop: 10}}>
        Describí la propiedad
      </Text>
      <Text variant="titleSmall" style={{marginTop: 10}}>
        Título
      </Text>
      <TextInput
        mode="outlined"
        value={propiedadTitle}
        onChangeText={title => setPropiedadTitle(title)}
      />
      <Text variant="titleSmall" style={{marginTop: 10}}>
        Descripción
      </Text>
      <TextAreaInput
        editable
        multiline
        numberOfLines={4}
        maxLength={40}
        onChangeText={text => setPropieadDesc(text)}
        value={propiedadDes}
        style={{
          padding: 10,
          backgroundColor: '#fff',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#EB6440',
          color: '#000',
          marginBottom: 10,
        }}
      />

      <Button
        mode="contained"
        onPress={() => {
          saveStepOne();
          publishPropiedadStepOne();
        }}>
        Continuar
      </Button>
    </View>
  );
};

const StepTwo = ({onNextStep, onPrevStep}) => {
  const {publicacion, setPublicacion} = useContext(InmobiliariaContext);
  const [calleAltura, setCalleAltura] = useState(
    publicacion.direccion.calleAltura,
  );
  const [ciudad, setCiudad] = React.useState(publicacion.direccion.ciudad);
  const [provincia, setProvincia] = useState(publicacion.direccion.provincia);
  const [barrio, setBarrio] = React.useState(publicacion.direccion.barrio);
  const [localidad, setLocalidad] = React.useState(
    publicacion.direccion.localidad,
  );
  const [piso, setPiso] = React.useState('');
  const [geoLocation, setGeoLocation] = useState({
    place_id: publicacion.direccion.place_id,
    latitude: publicacion.direccion.latitud,
    longitude: publicacion.direccion.longitud,
    fullAddress: publicacion.direccion.fullAddress,
  });

  const getGeoFromAddress = async ({address}) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAFFy-opQJ2zfds9jjVI6obxs1fNsT24iY`;
    const response = await axios.get(url);
    const {data} = response;

    return {
      location_id: data.results[0].place_id,
      latitude: data.results[0].geometry.location.lat,
      longitude: data.results[0].geometry.location.lng,
      fullAddress: data.results[0].formatted_address,
    };
  };
  const showAddressInMap = async () => {
    const address = `${calleAltura}+${ciudad}+${provincia}+${barrio}+${localidad}`;
    const location = await getGeoFromAddress({address});
    setGeoLocation({
      place_id: location.location_id,
      latitude: location.latitude,
      longitude: location.longitude,
      fullAddress: location.fullAddress,
    });
  };

  const saveStepTwo = () => {
    setPublicacion({
      ...publicacion,
      direccion: {
        calleAltura,
        ciudad,
        provincia,
        barrio,
        localidad,
        piso,
        fullAddress: geoLocation.fullAddress,
        latitud: geoLocation.latitude,
        longitud: geoLocation.longitude,
      },
    });
  };

  const publishPropiedadStepTwo = async () => {
    const payload = {
      propertyId: publicacion.id,
      calleAltura,
      ciudad,
      provincia,
      barrio,
      localidad,
      piso,
      geoLocation,
    };
    const data = await updatePropiedad({payload}); // TODO: error hanlder si se rompio
    console.log('STEP TWO', data);
    onNextStep();
  };

  return (
    <View style={{display: 'flex', gap: 10}}>
      <Text variant="titleLarge" style={{marginBottom: 15}}>
        ¿Dónde está ubicada la propiedad?
      </Text>

      <Text variant="titleSmall" style={{marginTop: 10}}>
        Calle y Altura
      </Text>
      <TextInput
        mode="outlined"
        label=""
        value={calleAltura}
        style={{height: 40}}
        onChangeText={title => setCalleAltura(title)}
      />
      <Text variant="titleSmall" style={{marginTop: 10}}>
        Ciudad
      </Text>
      <TextInput
        mode="outlined"
        label=""
        value={ciudad}
        style={{height: 40}}
        onChangeText={title => setCiudad(title)}
      />
      <Text variant="titleSmall" style={{marginTop: 10}}>
        Provincia
      </Text>
      <TextInput
        mode="outlined"
        label=""
        value={provincia}
        style={{height: 40}}
        onChangeText={title => setProvincia(title)}
      />
      <Text variant="titleSmall" style={{marginTop: 10}}>
        Barrio
      </Text>
      <TextInput
        mode="outlined"
        label=""
        value={barrio}
        style={{height: 40}}
        onChangeText={title => setBarrio(title)}
      />
      <Text variant="titleSmall" style={{marginTop: 10}}>
        Localidad
      </Text>
      <TextInput
        mode="outlined"
        label=""
        value={localidad}
        style={{height: 40}}
        onChangeText={title => setLocalidad(title)}
      />
      <Text variant="titleSmall" style={{marginTop: 10}}>
        Piso/Departamento
      </Text>
      <TextInput
        mode="outlined"
        label=""
        value={piso.toString()}
        style={{height: 40}}
        onChangeText={title => setPiso(title)}
      />
      <Text variant="titleSmall" style={{marginTop: 10, marginBottom: 20}}>
        Ubicación
      </Text>

      <Button mode="outlined" onPress={showAddressInMap}>
        Mostrar en el mapa
      </Button>
      <View style={{marginBottom: 20}}>
        <MapView
          style={{width: '100%', height: 250}}
          mapType="standard"
          initialRegion={{
            latitude: -34.603722,
            longitude: -58.381592,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}>
          <Marker
            coordinate={{
              latitude: geoLocation.latitude,
              longitude: geoLocation.longitude,
            }}
            title={geoLocation.fullAddress}
            description={'Mapa'}
          />
        </MapView>
      </View>
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 10,
          marginBottom: 20,
          paddingHorizontal: 10,
        }}>
        <Button
          style={{
            width: '50%',
            backgroundColor: '#fff',
          }}
          mode="outlined"
          onPress={() => {
            saveStepTwo();
            onPrevStep();
          }}>
          Atras
        </Button>
        <Button
          style={{
            width: '50%',
          }}
          mode="contained"
          onPress={() => {
            saveStepTwo();
            publishPropiedadStepTwo();
          }}>
          Continuar
        </Button>
      </View>
    </View>
  );
};

const StepThree = ({onNextStep, onPrevStep}) => {
  const {publicacion, setPublicacion} = useContext(InmobiliariaContext);
  const [modoOperacion, setModoOperacion] = useState(publicacion.tipoOperacion);
  const [countAmenities, setCountAmenities] = useState(publicacion.ambientes);
  const [countDormitorios, setCountDormitorios] = useState(
    publicacion.dormitorios,
  );
  const [countBanos, setCountBanos] = useState(publicacion.banios);
  const [countCocheras, setCountCocheras] = useState(publicacion.cocheras);
  const [countBalcones, setCountBalcones] = useState(publicacion.balcones);
  const [countTerrazas, setCountTerrazas] = useState(publicacion.terrazas);
  const [countBauleras, setCountBauleras] = useState(publicacion.bauleras);
  const [superficieCubierta, setSuperficieCubierta] = useState(
    publicacion.superficie.cubierta,
  );
  const [superficieSemiDesCubierta, setSuperficieSemiDescubierta] = useState(
    publicacion.superficie.semicubierta,
  );
  const [superficieDescubierta, setSuperficieDescubierta] = useState(
    publicacion.superficie.descubierta,
  );
  const [antiguedad, setAntiguedad] = useState(publicacion.antiguedad);
  const [moneda, setMoneda] = useState(publicacion.precioMoneda);
  const [precioPropiedad, setPrecioPropiedad] = useState(publicacion.precio);
  const [expensasMoneda, setExpensasMoneda] = useState(
    publicacion.expensasMoneda,
  );
  const [expensas, setExpensas] = useState(publicacion.expensas);

  const saveStepThree = () => {
    setPublicacion({
      ...publicacion,
      ambientes: countAmenities,
      dormitorios: countDormitorios,
      banios: countBanos,
      cocheras: countCocheras,
      balcones: countBalcones,
      terrazas: countTerrazas,
      bauleras: countBauleras,
      superficie: {
        cubierta: superficieCubierta,
        semicubierta: superficieSemiDesCubierta,
        descubierta: superficieDescubierta,
      },
      antiguedad,
      precio: precioPropiedad,
      precioMoneda: moneda,
      expensas,
      expensasMoneda,
    });
  };

  const publishPropiedadStepThree = async () => {
    const payload = {
      propertyId: publicacion.id,
      propertyType: publicacion.tipoPropiedad,
      numEnvironments: countDormitorios,
      numRooms: countDormitorios,
      numBathrooms: countBanos,
      numCars: countCocheras,
      balcony: true,
      roofTop: true,
      vault: true,
      mtsCovered: superficieCubierta,
      mtsHalfCovered: superficieSemiDesCubierta,
      mtsUncovered: superficieDescubierta,
      antiquity: antiguedad,
      contract_types: [
        {
          contractType: modoOperacion,
          price: precioPropiedad,
          expPrice: precioPropiedad,
          currency: 'AR$',
          contractDays: 0,
        },
      ],
    };

    const data = await updatePropiedadStepThree({payload}); // TODO: error hanlder si se rompio
    console.log('STEP THREE', data);
    onNextStep();
  };

  return (
    <View style={{display: 'flex', gap: 10, width: '100%'}}>
      <Text variant="titleLarge" style={{marginBottom: 15}}>
        Características principales
      </Text>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 10,
          width: '100%',
        }}>
        <View>
          {/* <Icon source="camera" color={MD3Colors.error50} size={20} /> */}
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
            }}>
            <Text>Ambientes</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
              }}>
              <Button
                style={{
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#EB6440',
                  alignContent: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  textAlign: 'center',
                }}
                onPress={() => setCountAmenities(countAmenities - 1)}>
                <Text style={{color: '#000', fontSize: 18}}>-</Text>
              </Button>
            </View>
          </View>
        </View>
        <View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
            }}>
            <Text>Dommitorios</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
              }}>
              <Button
                style={{
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#EB6440',
                  alignContent: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  textAlign: 'center',
                }}
                onPress={() => setCountDormitorios(countDormitorios - 1)}>
                <Text style={{color: '#000', fontSize: 18}}>-</Text>
              </Button>
              <Text>{countDormitorios}</Text>
              <Button
                style={{
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#EB6440',
                  alignContent: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  textAlign: 'center',
                }}
                onPress={() => setCountDormitorios(countDormitorios + 1)}>
                <Text style={{color: '#000', fontSize: 18}}>+</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 10,
          width: '100%',
          marginTop: 20,
        }}>
        <View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
            }}>
            <Text>Baños</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
              }}>
              <Button
                style={{
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#EB6440',
                  alignContent: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  textAlign: 'center',
                }}
                onPress={() => setCountBanos(countBanos - 1)}>
                <Text style={{color: '#000', fontSize: 18}}>-</Text>
              </Button>
              <Text>{countBanos}</Text>
              <Button
                style={{
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#EB6440',
                  alignContent: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  textAlign: 'center',
                }}
                onPress={() => setCountBanos(countBanos + 1)}>
                <Text style={{color: '#000', fontSize: 18}}>+</Text>
              </Button>
            </View>
          </View>
        </View>
        <View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
            }}>
            <Text>Cocheras</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
              }}>
              <Button
                style={{
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#EB6440',
                  alignContent: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  textAlign: 'center',
                }}
                onPress={() => setCountCocheras(countCocheras - 1)}>
                <Text style={{color: '#000', fontSize: 18}}>-</Text>
              </Button>
              <Text>{countCocheras}</Text>
              <Button
                style={{
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#EB6440',
                  alignContent: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  textAlign: 'center',
                }}
                onPress={() => setCountCocheras(countCocheras + 1)}>
                <Text style={{color: '#000', fontSize: 18}}>+</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 10,
          width: '100%',
          marginTop: 20,
        }}>
        <View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
            }}>
            <Text>Balcones</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
              }}>
              <Button
                style={{
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#EB6440',
                  alignContent: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  textAlign: 'center',
                }}
                onPress={() => setCountBalcones(countBalcones - 1)}>
                <Text style={{color: '#000', fontSize: 18}}>-</Text>
              </Button>
              <Text>{countBalcones}</Text>
              <Button
                style={{
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#EB6440',
                  alignContent: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  textAlign: 'center',
                }}
                onPress={() => setCountBalcones(countBalcones + 1)}>
                <Text style={{color: '#000', fontSize: 18}}>+</Text>
              </Button>
            </View>
          </View>
        </View>
        <View>
          {/* <Icon source="camera" color={MD3Colors.error50} size={20} /> */}
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
            }}>
            <Text>Terrazas</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
              }}>
              <Button
                style={{
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#EB6440',
                  alignContent: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  textAlign: 'center',
                }}
                onPress={() => setCountTerrazas(countTerrazas - 1)}>
                <Text style={{color: '#000', fontSize: 18}}>-</Text>
              </Button>
              <Text>{countTerrazas}</Text>
              <Button
                style={{
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#EB6440',
                  alignContent: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  textAlign: 'center',
                }}
                onPress={() => setCountTerrazas(countTerrazas + 1)}>
                <Text style={{color: '#000', fontSize: 18}}>+</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
          gap: 10,
        }}>
        <Text>Bauleras</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
          }}>
          <Button
            style={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#EB6440',
              alignContent: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
              textAlign: 'center',
            }}
            onPress={() => setCountBauleras(countBauleras - 1)}>
            <Text style={{color: '#000', fontSize: 18}}>-</Text>
          </Button>
          <Text>{countBauleras}</Text>
          <Button
            style={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#EB6440',
              alignContent: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
              textAlign: 'center',
            }}
            onPress={() => setCountBauleras(countBauleras + 1)}>
            <Text style={{color: '#000', fontSize: 18}}>+</Text>
          </Button>
        </View>
      </View>

      <Text variant="titleMedium" style={{marginTop: 10}}>
        Superficie
      </Text>
      <View>
        <Text variant="titleSmall" style={{marginTop: 10}}>
          Cubierta
        </Text>
        <TextInput
          keyboardType="numeric"
          mode="outlined"
          label=""
          value={superficieCubierta.toString()}
          style={{height: 40}}
          onChangeText={mts => setSuperficieCubierta(mts)}
        />

        <Text variant="titleSmall" style={{marginTop: 10}}>
          Semidescubierta
        </Text>
        <TextInput
          keyboardType="numeric"
          mode="outlined"
          label=""
          value={superficieSemiDesCubierta.toString()}
          style={{height: 40}}
          onChangeText={mts => setSuperficieSemiDescubierta(mts)}
        />

        <Text variant="titleSmall" style={{marginTop: 10}}>
          Descubierta
        </Text>
        <TextInput
          keyboardType="numeric"
          mode="outlined"
          label=""
          value={superficieDescubierta.toString()}
          style={{height: 40, marginBottom: 20}}
          onChangeText={mts => setSuperficieDescubierta(mts)}
        />
      </View>

      <Text variant="titleMedium" style={{marginTop: 10}}>
        Antiguedad (años)
      </Text>
      <TextInput
        mode="outlined"
        keyboardType="numeric"
        label=""
        value={antiguedad.toString()}
        style={{height: 40, marginBottom: 20}}
        onChangeText={mts => setAntiguedad(mts)}
      />

      <Text variant="titleMedium" style={{marginTop: 10}}>
        Tipo de operación
      </Text>

      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          gap: 30,
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <Button
          mode={modoOperacion === 'Venta' ? 'contained' : 'outlined'}
          color="#EB6440"
          onPress={() => setModoOperacion('Venta')}>
          Venta
        </Button>
        <Button
          mode={modoOperacion === 'Alquiler' ? 'contained' : 'outlined'}
          color="#EB6440"
          onPress={() => setModoOperacion('Alquiler')}>
          Alquiler
        </Button>
        <Button
          mode={modoOperacion === 'Temporada' ? 'contained' : 'outlined'}
          color="#EB6440"
          onPress={() => setModoOperacion('Temporada')}>
          Temporada
        </Button>
      </View>

      <Text variant="titleMedium" style={{marginTop: 10}}>
        Precio
      </Text>

      <Text variant="titleSmall" style={{marginTop: 10}}>
        Precio de la propiedad
      </Text>
      <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
        <Button
          mode={moneda === 'US$' ? 'contained' : 'outlined'}
          style={{
            borderColor: '#EB6440',
            justifyContent: 'center',
            borderRadius: 50,
            height: 40,
          }}
          onPress={() => setMoneda('US$')}>
          <Text style={{color: '#000', fontSize: 12}}>US$</Text>
        </Button>
        <Button
          mode={moneda === 'AR$' ? 'contained' : 'outlined'}
          style={{
            borderColor: '#EB6440',
            justifyContent: 'center',
            borderRadius: 50,
            height: 40,
          }}
          onPress={() => setMoneda('AR$')}>
          <Text style={{color: '#000', fontSize: 12}}>AR$</Text>
        </Button>
        <TextInput
          mode="outlined"
          keyboardType="numeric"
          label=""
          value={precioPropiedad.toString()}
          style={{height: 40, width: '50%', marginBottom: 20}}
          onChangeText={precio => setPrecioPropiedad(precio)}
        />
      </View>

      <Text variant="titleSmall" style={{marginTop: 10}}>
        Expensas
      </Text>

      <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
        <Button
          mode={expensasMoneda === 'US$' ? 'contained' : 'outlined'}
          style={{
            borderColor: '#EB6440',
            justifyContent: 'center',
            borderRadius: 50,
            height: 40,
          }}
          onPress={() => setExpensasMoneda('US$')}>
          <Text style={{color: '#000', fontSize: 12}}>US$</Text>
        </Button>
        <Button
          mode={expensasMoneda === 'AR$' ? 'contained' : 'outlined'}
          style={{
            borderColor: '#EB6440',
            justifyContent: 'center',
            borderRadius: 50,
            height: 40,
          }}
          onPress={() => setExpensasMoneda('AR$')}>
          <Text style={{color: '#000', fontSize: 12}}>AR$</Text>
        </Button>
        <TextInput
          keyboardType="numeric"
          mode="outlined"
          label=""
          value={expensas.toString()}
          style={{height: 40, width: '50%', marginBottom: 20}}
          onChangeText={exp => setExpensas(exp)}
        />
      </View>
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 10,
          marginBottom: 20,
          paddingHorizontal: 10,
        }}>
        <Button
          style={{
            width: '50%',
            backgroundColor: '#fff',
          }}
          mode="outlined"
          onPress={() => {
            saveStepThree();
            onPrevStep();
          }}>
          Atras
        </Button>
        <Button
          style={{
            width: '50%',
          }}
          mode="contained"
          onPress={() => {
            saveStepThree();
            publishPropiedadStepThree();
          }}>
          Continuar
        </Button>
      </View>
    </View>
  );
};

const StepFour = ({onPrevStep, onSubmitSteps}) => {
  const {publicacion, setPublicacion} = useContext(InmobiliariaContext);

  const [amenitiesList, setAmenitiesList] = useState(publicacion.amenities);
  const [orientacion, setOrientacion] = useState(publicacion.orientacion);
  const [disposicion, setDisposicion] = useState(publicacion.disposicion);
  const [videoUrl, setVideoUrl] = useState(publicacion.videoUrl);
  const [images, setImages] = useState(publicacion.images);
  const [sum, setSum] = useState(false);
  const [pileta, setPileta] = useState(false);
  const [canchaDeportes, setCanchaDeportes] = useState(false);
  const [laundry, setLaundry] = useState(false);
  const [solarium, setSolarium] = useState(false);
  const [gimnasio, setGimnasio] = useState(false);
  const [sauna, setSauna] = useState(false);
  const [vigilancia, setVigilancia] = useState(false);
  const [salaDeJuegos, setSalaDeJuegos] = useState(false);

  const addVideo = video => {
    setVideoUrl(video);
  };

  const selectImagesFromGallery = async () => {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 0,
    });
    if (!response.cancelled) {
      const selectedAssets = response.assets;
      const selectedUris = selectedAssets.map(i => {
        return {
          name: i.fileName,
          originalFilename: i.fileName,
          size: i.fileSize,
          type: i.type,
          path: i.originalPath,
          uri: i.uri,
        };
      });
      setImages([...images, ...selectedUris]);
    }
  };

  const selectImagesFromCamera = async () => {
    const response = await launchCamera({
      mediaType: 'photo',
      selectionLimit: 0,
    });
    if (!response.cancelled) {
      const selectedAssets = response.assets;
      const selectedUris = selectedAssets.map(i => {
        return {
          name: i.fileName,
          originalFilename: i.fileName,
          size: i.fileSize,
          type: i.type,
          path: i.originalPath,
          uri: i.uri,
        };
      });
      setImages([...images, ...selectedUris]);
    }
  };

  const addImages = async () => {
    console.log('add images');
  };

  const publishPropiedadStepfour = async () => {
    console.log('publish');
    const payload = {
      propertyId: publicacion.id,
      sum: sum,
      swimming_pool: pileta,
      sport_field: canchaDeportes,
      laundry: laundry,
      gym: gimnasio,
      sauna: sauna,
      security: vigilancia,
      game_room: salaDeJuegos,
      position: disposicion,
      orientation: orientacion,
      photos: images,
    };
    const data = await updatePropiedadStepFour({payload}); // TODO: error hanlder si se rompio
    if (data.success) {
      onSubmitSteps();
    }
  };

  const saveStepFour = () => {
    setPublicacion({
      ...publicacion,
      amenities: amenitiesList,
      orientacion,
      disposicion,
      videoUrl,
      images,
    });
  };

  return (
    <View style={{display: 'flex', gap: 10}}>
      <Text variant="titleMedium" style={{marginTop: 10}}>
        Que amenities tiene la propiedad?
      </Text>
      <View
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
        }}>
        <Checkbox.Item
          label="Sum"
          status={sum ? 'checked' : 'unchecked'}
          onPress={() => setSum(!sum)}
        />
        <Checkbox.Item
          label="Pileta"
          status={pileta ? 'checked' : 'unchecked'}
          onPress={() => setPileta(!pileta)}
        />
        <Checkbox.Item
          label="Cancha de deportes"
          status={canchaDeportes ? 'checked' : 'unchecked'}
          onPress={() => setCanchaDeportes(!canchaDeportes)}
        />
        <Checkbox.Item
          label="Laundry"
          status={laundry ? 'checked' : 'unchecked'}
          onPress={() => setLaundry(!laundry)}
        />
        <Checkbox.Item
          label="Solarium"
          status={solarium ? 'checked' : 'unchecked'}
          onPress={() => setSolarium(!solarium)}
        />
        <Checkbox.Item
          label="Gimnasio"
          status={gimnasio ? 'checked' : 'unchecked'}
          onPress={() => setGimnasio(!gimnasio)}
        />
        <Checkbox.Item
          label="Sauna"
          status={sauna ? 'checked' : 'unchecked'}
          onPress={() => setSauna(!sauna)}
        />
        <Checkbox.Item
          label="Vigilancia"
          status={vigilancia ? 'checked' : 'unchecked'}
          onPress={() => setVigilancia(!vigilancia)}
        />
        <Checkbox.Item
          label="Sala de juegos"
          status={salaDeJuegos ? 'checked' : 'unchecked'}
          onPress={() => setSalaDeJuegos(!salaDeJuegos)}
        />
      </View>

      <Text variant="titleMedium" style={{marginTop: 10}}>
        Orientación
      </Text>
      <Dropdown
        onValueChange={itemValue => setOrientacion(itemValue)}
        placeholder="Elige una opción"
        options={[
          {label: 'N', value: 'N'},
          {label: 'S', value: 'S'},
          {label: 'E', value: 'E'},
          {label: 'O', value: 'O'},
          {label: 'NE', value: 'NE'},
          {label: 'NO', value: 'NO'},
          {label: 'SE', value: 'SE'},
          {label: 'SO', value: 'SO'},
        ]}
        selectedValue={orientacion}
        primaryColor={'#EB6440'}
        dropdownStyle={{
          borderWidth: 1,
          borderColor: '#EB6440',
          borderRadius: 10,
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginVertical: 10,
        }}
        checkboxComponentStyles={{
          checkboxStyle: {
            borderWidth: 1,
            borderColor: '#EB6440',
          },
          checkboxLabelStyle: {
            color: '#000',
            fontSize: 16,
            fontWeight: 'thin',
          },
        }}
        listHeaderComponent={
          <View style={styles.customComponentContainer}>
            <Text style={styles.text}>
              💡 Elige la orientación de la propiedad
            </Text>
          </View>
        }
        listFooterComponent={
          <View style={styles.customComponentContainer}>
            <Text>Solo puedes elegir una opción</Text>
          </View>
        }
        modalOptionsContainerStyle={{
          padding: 10,
          backgroundColor: '#fff',
          borderRadius: 10,
          borderWidth: 2,
          borderColor: '#EB6440',
        }}
        listComponentStyles={{
          sectionHeaderStyle: {
            padding: 10,
            backgroundColor: 'green',
            color: '#000',
            width: '30%',
          },
        }}
      />
      <Text variant="titleMedium" style={{marginTop: 10}}>
        Disposición
      </Text>
      <Dropdown
        onValueChange={itemValue => setDisposicion(itemValue)}
        placeholder="Elige una opción"
        options={[
          {label: 'Frente', value: 'Frente'},
          {label: 'Contrafrente', value: 'Contrafrente'},
        ]}
        selectedValue={disposicion}
        primaryColor={'#EB6440'}
        dropdownStyle={{
          borderWidth: 1,
          borderColor: '#EB6440',
          borderRadius: 10,
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginVertical: 10,
        }}
        checkboxComponentStyles={{
          checkboxStyle: {
            borderWidth: 1,
            borderColor: '#EB6440',
          },
          checkboxLabelStyle: {
            color: '#000',
            fontSize: 16,
            fontWeight: 'thin',
          },
        }}
        listHeaderComponent={
          <View style={styles.customComponentContainer}>
            <Text style={styles.text}>
              💡 Elige la disposición de la propiedad
            </Text>
          </View>
        }
        listFooterComponent={
          <View style={styles.customComponentContainer}>
            <Text>Solo puedes elegir una opción</Text>
          </View>
        }
        modalOptionsContainerStyle={{
          padding: 10,
          backgroundColor: '#fff',
          borderRadius: 10,
          borderWidth: 2,
          borderColor: '#EB6440',
        }}
        listComponentStyles={{
          sectionHeaderStyle: {
            padding: 10,
            backgroundColor: 'green',
            color: '#000',
            width: '30%',
          },
        }}
      />

      <Text variant="titleMedium" style={{marginTop: 10}}>
        Imagenes
      </Text>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          borderWidth: 1,
          borderColor: '#EB6440',
          backgroundColor: '#fff',
          padding: 10,
          borderRadius: 10,
          minHeight: 50,
        }}>
        {images?.map((item, index) => {
          // console.log('item: ', item);
          return (
            <View key={index}>
              <Image
                source={{
                  uri: item.uri,
                }}
                style={{width: 50, height: 50, borderRadius: 10}}
              />
            </View>
          );
        })}
      </View>

      <View
        style={{
          marginTop: 20,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 10,
          marginBottom: 20,
          paddingHorizontal: 10,
        }}>
        <Button
          style={{
            width: '50%',
            backgroundColor: '#fff',
          }}
          mode="outlined"
          onPress={selectImagesFromCamera}>
          Abrir camara
        </Button>
        <Button
          style={{
            width: '50%',
            backgroundColor: '#fff',
          }}
          mode="outlined"
          onPress={selectImagesFromGallery}>
          {' '}
          Abrir galeria
        </Button>
      </View>

      <Text variant="titleMedium" style={{marginTop: 10}}>
        Videos (opcional)
      </Text>
      <TextInput
        mode="outlined"
        label="Ingresa la url del video"
        value={videoUrl}
        onChangeText={url => setVideoUrl(url)}
      />
      <Button
        mode="outlined"
        color="#EB6440"
        onPress={() => addVideo(videoUrl)}>
        Agregar url del video
      </Button>

      <View
        style={{
          marginTop: 20,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 10,
          marginBottom: 20,
          paddingHorizontal: 10,
        }}>
        <Button
          style={{
            width: '50%',
            backgroundColor: '#fff',
          }}
          mode="outlined"
          onPress={() => {
            saveStepFour();
            onPrevStep();
          }}>
          Atrás
        </Button>
        <Button
          style={{
            width: '50%',
          }}
          mode="contained"
          onPress={publishPropiedadStepfour}>
          Publicar
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  customComponentContainer: {
    padding: 8,
    backgroundColor: 'white',
  },
  container: {
    minHeight: '100%',
    flex: 1,
    paddingHorizontal: 5,
    paddingTop: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  stepContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#000',
  },
  step: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: '#EB6440',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    width: '100dp',
    backgroundColor: '#EB6440',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    color: '#fff',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'thin',
  },
  prevButtonText: {
    color: '#EB6440',
    fontSize: 18,
    fontWeight: 'thin',
  },

  previousButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    width: '100%',
    borderColor: '#EB6440',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
});
