/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  TextInput as TextAreaInput,
  Image,
} from 'react-native';
import {Text, Button, TextInput, Chip, Badge} from 'react-native-paper';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import Dropdown from 'react-native-input-select';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MapView, {Marker} from 'react-native-maps';
import axios from 'axios';
import {InmobiliariaContext} from '../context/InmobiliariaContext';

export const AddPropiedadStepOne = () => {
  const [activeStep, setActiveStep] = useState(0);

  const onNextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const onPrevStep = () => {
    setActiveStep(activeStep - 1);
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
            <StepFour onPrevStep={onPrevStep} />
          </ProgressStep>
        </ProgressSteps>
      </View>
    </View>
  );
};

const StepOne = ({onNextStep}) => {
  const {publicacion, setPublicacion} = useContext(InmobiliariaContext);

  const [modoOperacion, setModoOperacion] = useState(publicacion.tipoOperacion);
  const [tipoPropiedad, setTipoPropiedad] = React.useState(
    publicacion.tipoPropiedad,
  );
  const [propiedadTitle, setPropiedadTitle] = React.useState(
    publicacion.titulo,
  );
  const [propiedadDes, setPropieadDesc] = React.useState(
    publicacion.descripcion,
  );

  const saveStepOne = () => {
    setPublicacion({
      ...publicacion,
      tipoOperacion: modoOperacion,
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
        Tipo de operacion
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
          mode={modoOperacion === 'venta' ? 'contained' : 'outlined'}
          color="#EB6440"
          onPress={() => setModoOperacion('venta')}>
          Venta
        </Button>
        <Button
          mode={modoOperacion === 'alquiler' ? 'contained' : 'outlined'}
          color="#EB6440"
          onPress={() => setModoOperacion('alquiler')}>
          Alguiler
        </Button>
        <Button
          mode={modoOperacion === 'temporada' ? 'contained' : 'outlined'}
          color="#EB6440"
          onPress={() => setModoOperacion('temporada')}>
          Temporada
        </Button>
      </View>
      <Text variant="titleMedium" style={{marginTop: 10}}>
        Tipo de propiedad
      </Text>
      <Dropdown
        onValueChange={itemValue => setTipoPropiedad(itemValue)}
        placeholder="Elige una opcion"
        options={[
          {label: 'Casa', value: 'casa'},
          {label: 'PH', value: 'ph'},
          {label: 'Departamento', value: 'departamento'},
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
            <Text>Solo puedes elegir una opcion</Text>
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
        Describi la propiedad
      </Text>
      <Text variant="titleSmall" style={{marginTop: 10}}>
        Titulo
      </Text>
      <TextInput
        mode="outlined"
        value={propiedadTitle}
        onChangeText={title => setPropiedadTitle(title)}
      />
      <Text variant="titleSmall" style={{marginTop: 10}}>
        Descripcion
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
          onNextStep();
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
    latitude: publicacion.direccion.latitud,
    longitude: publicacion.direccion.longitud,
    fullAddress: publicacion.direccion.fullAddress,
  });

  const getGeoFromAddress = async ({address}) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAFFy-opQJ2zfds9jjVI6obxs1fNsT24iY`;
    const response = await axios.get(url);
    const {data} = response;

    return {
      latitude: data.results[0].geometry.location.lat,
      longitude: data.results[0].geometry.location.lng,
      fullAddress: data.results[0].formatted_address,
    };
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

  const showAddressInMap = async () => {
    const address = `${calleAltura}+${ciudad}+${provincia}+${barrio}+${localidad}`;
    const location = await getGeoFromAddress({address});
    setGeoLocation({
      latitude: location.latitude,
      longitude: location.longitude,
      fullAddress: location.fullAddress,
    });
  };

  return (
    <View style={{display: 'flex', gap: 10}}>
      <Text variant="titleLarge" style={{marginBottom: 15}}>
        ¿Donde esta ubicada la propiedad?
      </Text>

      <Text variant="titleSmall" style={{marginTop: 10}}>
        Calla y Altura
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
        value={piso}
        style={{height: 40}}
        onChangeText={title => setPiso(title)}
      />
      <Text variant="titleSmall" style={{marginTop: 10, marginBottom: 20}}>
        Ubicacion
      </Text>

      <Button mode="outlined" onPress={showAddressInMap}>
        Mostrar en el mapa
      </Button>
      <View style={{marginBottom: 20}}>
        <MapView style={{width: '100%', height: 250}}>
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
            onNextStep();
          }}>
          Continuar
        </Button>
      </View>
    </View>
  );
};

const StepThree = ({onNextStep, onPrevStep}) => {
  const {publicacion, setPublicacion} = useContext(InmobiliariaContext);

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

  return (
    <View style={{display: 'flex', gap: 10, width: '100%'}}>
      <Text variant="titleLarge" style={{marginBottom: 15}}>
        Caracteristicas principales
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
              <Text>{countAmenities}</Text>
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
                onPress={() => setCountAmenities(countAmenities + 1)}>
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
          mode="outlined"
          label=""
          value={superficieCubierta}
          style={{height: 40}}
          onChangeText={mts => setSuperficieCubierta(mts)}
        />

        <Text variant="titleSmall" style={{marginTop: 10}}>
          Semidescubierta
        </Text>
        <TextInput
          mode="outlined"
          label=""
          value={superficieSemiDesCubierta}
          style={{height: 40}}
          onChangeText={mts => setSuperficieSemiDescubierta(mts)}
        />

        <Text variant="titleSmall" style={{marginTop: 10}}>
          Descubierta
        </Text>
        <TextInput
          mode="outlined"
          label=""
          value={superficieDescubierta}
          style={{height: 40, marginBottom: 20}}
          onChangeText={mts => setSuperficieDescubierta(mts)}
        />
      </View>

      <Text variant="titleMedium" style={{marginTop: 10}}>
        Antiguedad
      </Text>
      <TextInput
        mode="outlined"
        label=""
        value={antiguedad}
        style={{height: 40, marginBottom: 20}}
        onChangeText={mts => setAntiguedad(mts)}
      />

      <Text variant="titleMedium" style={{marginTop: 10}}>
        Precio
      </Text>

      <Text variant="titleSmall" style={{marginTop: 10}}>
        Precio de la propiedad
      </Text>
      <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
        <Button
          mode={moneda === 'usd' ? 'contained' : 'outlined'}
          style={{
            borderColor: '#EB6440',
            justifyContent: 'center',
            borderRadius: 50,
            height: 40,
          }}
          onPress={() => setMoneda('usd')}>
          <Text style={{color: '#000', fontSize: 12}}>USD</Text>
        </Button>
        <Button
          mode={moneda === 'ars' ? 'contained' : 'outlined'}
          style={{
            borderColor: '#EB6440',
            justifyContent: 'center',
            borderRadius: 50,
            height: 40,
          }}
          onPress={() => setMoneda('ars')}>
          <Text style={{color: '#000', fontSize: 12}}>ARS</Text>
        </Button>
        <TextInput
          mode="outlined"
          label=""
          value={superficieCubierta}
          style={{height: 40, width: '50%', marginBottom: 20}}
          onChangeText={mts => setSuperficieCubierta(mts)}
        />
      </View>

      <Text variant="titleSmall" style={{marginTop: 10}}>
        Expensas
      </Text>

      <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
        <Button
          mode={expensasMoneda === 'usd' ? 'contained' : 'outlined'}
          style={{
            borderColor: '#EB6440',
            justifyContent: 'center',
            borderRadius: 50,
            height: 40,
          }}
          onPress={() => setExpensasMoneda('usd')}>
          <Text style={{color: '#000', fontSize: 12}}>USD</Text>
        </Button>
        <Button
          mode={expensasMoneda === 'ars' ? 'contained' : 'outlined'}
          style={{
            borderColor: '#EB6440',
            justifyContent: 'center',
            borderRadius: 50,
            height: 40,
          }}
          onPress={() => setExpensasMoneda('ars')}>
          <Text style={{color: '#000', fontSize: 12}}>ARS</Text>
        </Button>
        <TextInput
          mode="outlined"
          label=""
          value={superficieCubierta}
          style={{height: 40, width: '50%', marginBottom: 20}}
          onChangeText={mts => setSuperficieCubierta(mts)}
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
            onNextStep();
          }}>
          Continuar
        </Button>
      </View>
    </View>
  );
};

const StepFour = ({onPrevStep}) => {
  const {publicacion, setPublicacion} = useContext(InmobiliariaContext);

  const [amenitie, setAmenitie] = useState('');
  const [amenitiesList, setAmenitiesList] = useState(publicacion.amenities);
  const [orientacion, setOrientacion] = useState(publicacion.orientacion);
  const [disposicion, setDisposicion] = useState(publicacion.disposicion);
  const [videoUrl, setVideoUrl] = useState(publicacion.videoUrl);
  const [images, setImages] = useState(publicacion.images);

  const addAmenitie = amenitie => {
    setAmenitiesList([...amenitiesList, amenitie]);
    setAmenitie('');
  };

  const addVideo = video => {
    setVideoUrl(video);
  };

  const selectImagesFromGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 0,
    });
    if (!result.cancelled) {
      console.log(result);
      const selectedAssets = result.assets;
      const selectedUris = selectedAssets.map(i => i.uri);
      console.log('selectedUris: ', selectedUris);
      setImages(selectedAssets);
    }
  };

  const addImages = async () => {
    console.log('add images');
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
      <TextInput
        mode="outlined"
        label="Escribe un amenitie"
        value={amenitie}
        onChangeText={am => setAmenitie(am)}
      />
      <Button
        mode="contained"
        color="#EB6440"
        onPress={() => addAmenitie(amenitie)}>
        Agregar amenitie
      </Button>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
          borderColor: '#EB6440',
        }}>
        {amenitiesList.map((item, index) => {
          return (
            <Chip
              key={index}
              mode="outlined"
              onPress={() => console.log('Pressed')}
              onClose={() => {
                setAmenitiesList(amenitiesList.filter(i => i !== item));
              }}>
              {item}
            </Chip>
          );
        })}
      </View>

      <Text variant="titleMedium" style={{marginTop: 10}}>
        Orientacion
      </Text>
      <Dropdown
        onValueChange={itemValue => setOrientacion(itemValue)}
        placeholder="Elige una opcion"
        options={[
          {label: 'N', value: 'norte'},
          {label: 'S', value: 'sur'},
          {label: 'E', value: 'este'},
          {label: 'O', value: 'oeste'},
          {label: 'SE', value: 'sureste'},
          {label: 'SO', value: 'suroeste'},
          {label: 'NE', value: 'noreste'},
          {label: 'NO', value: 'noroeste'},
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
              💡 Elige la orientacion de la propiedad
            </Text>
          </View>
        }
        listFooterComponent={
          <View style={styles.customComponentContainer}>
            <Text>Solo puedes elegir una opcion</Text>
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
        Disposicion
      </Text>
      <Dropdown
        onValueChange={itemValue => setDisposicion(itemValue)}
        placeholder="Elige una opcion"
        options={[
          {label: 'Frente', value: 'frente'},
          {label: 'Contrafrente', value: 'contrafrente'},
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
              💡 Elige la disposicion de la propiedad
            </Text>
          </View>
        }
        listFooterComponent={
          <View style={styles.customComponentContainer}>
            <Text>Solo puedes elegir una opcion</Text>
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
          console.log('item: ', item);
          return (
            <View key={index}>
              <Image
                source={{
                  uri: 'file:///data/user/0/com.myhome/cache/rn_image_picker_lib_temp_d6814c9f-a9e5-4440-87e1-808bd9b9f40c.jpg',
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
          onPress={selectImagesFromGallery}>
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
          Atras
        </Button>
        <Button
          style={{
            width: '50%',
          }}
          mode="contained"
          onPress={() => {
            saveStepFour();
          }}>
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
    backgroundColor: '#D6E4E5',
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
