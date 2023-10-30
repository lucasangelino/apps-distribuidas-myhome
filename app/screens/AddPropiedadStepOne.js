/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, View, TextInput as TextAreaInput} from 'react-native';
import {Text, Button, TextInput, Icon, MD3Colors} from 'react-native-paper';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import Dropdown from 'react-native-input-select';

export const AddPropiedadStepOne = () => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1, minHeight: '100%', paddingHorizontal: 5}}>
        <ProgressSteps
          activeStepIconColor={'#EB6440'}
          activeStepNumColor={'#fff'}
          activeStepIconBorderColor={'#EB6440'}
          activeLabelColor={'#fff'}
          completedProgressBarColor={'#EB6440'}
          completedStepIconColor={'#EB6440'}
          completedStepNumColor={'#fff'}
          borderWidth={5}
          labelColor={'#fff'}>
          <ProgressStep
            errors={false}
            scrollable={true}
            nextBtnText={'Continuar'}
            nextBtnStyle={styles.nextButton}
            nextBtnTextStyle={styles.nextButtonText}>
            <StepOne />
          </ProgressStep>
          <ProgressStep
            errors={false}
            scrollable={true}
            nextBtnText={'Continuar'}
            previousBtnText={'Atras'}
            nextBtnStyle={styles.nextButton}
            nextBtnTextStyle={styles.nextButtonText}
            previousBtnStyle={styles.previousButton}
            previousBtnTextStyle={styles.prevButtonText}>
            <StepTwo />
          </ProgressStep>
          <ProgressStep
            errors={false}
            scrollable={true}
            nextBtnText={'Continuar'}
            previousBtnText={'Atras'}
            finishBtnText={'Finalizar'}
            nextBtnStyle={styles.nextButton}
            previousBtnStyle={styles.previousButton}
            nextBtnTextStyle={styles.buttonText}
            previousBtnTextStyle={styles.prevButtonText}
            submitBtnStyle={styles.nextButton}>
            <StepThree />
          </ProgressStep>
        </ProgressSteps>
      </View>
    </View>
  );
};

const StepOne = () => {
  const [modoOperacion, setModoOperacion] = useState('temporada');
  const [tipoPropiedad, setTipoPropiedad] = React.useState('casa');
  const [propiedadTitle, setPropiedadTitle] = React.useState('');
  const [propiedadDes, setPropieadDesc] = React.useState('');
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
        label="Ponle un titulo a tu propiedad"
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
    </View>
  );
};

const StepTwo = () => {
  const [calleAltura, setCalleAltura] = useState('');
  const [ciudad, setCiudad] = React.useState('');
  const [provincia, setProvincia] = useState('');
  const [barrio, setBarrio] = React.useState('');
  const [localidad, setLocalidad] = React.useState('');
  const [piso, setPiso] = React.useState('');
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
    </View>
  );
};

const StepThree = () => {
  const [calleAltura, setCalleAltura] = useState('');
  const [ciudad, setCiudad] = React.useState('');
  const [provincia, setProvincia] = useState('');
  const [barrio, setBarrio] = React.useState('');
  const [localidad, setLocalidad] = React.useState('');
  const [piso, setPiso] = React.useState('');
  return (
    <View style={{display: 'flex', gap: 10, width: '100%'}}>
      <Text variant="titleLarge" style={{marginBottom: 15}}>
        Caracteristicas principales
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
      <Text variant="titleMedium" style={{marginTop: 10}}>
        Superficie
      </Text>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 10,
          width: '100%',
        }}>
        <View style={{width: '50%'}}>
          <Text variant="titleSmall" style={{marginTop: 10}}>
            Cubierta
          </Text>
          <Icon source="camera" color={MD3Colors.error50} size={20} />
        </View>
        <View style={{width: '50%'}}>
          <Text variant="titleSmall" style={{marginTop: 10}}>
            Semidescubierta
          </Text>
          <TextInput
            mode="outlined"
            label=""
            value={barrio}
            style={{height: 40, width: '100%'}}
            onChangeText={title => setBarrio(title)}
          />
        </View>
        <View style={{width: '50%'}}>
          <Text variant="titleSmall" style={{marginTop: 10}}>
            Descubierta
          </Text>
          <TextInput
            mode="outlined"
            label=""
            value={barrio}
            style={{height: 40, width: '100%'}}
            onChangeText={title => setBarrio(title)}
          />
        </View>
      </View>

      <Text variant="titleMedium" style={{marginTop: 10}}>
        Antigueadad
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
          mode={'modoOperacion' === 'venta' ? 'contained' : 'outlined'}
          color="#EB6440"
          onPress={() => console.log('venta')}>
          USD
        </Button>
        <Button
          mode={'modoOperacion' === 'venta' ? 'contained' : 'outlined'}
          color="#EB6440"
          onPress={() => console.log('venta')}>
          Pesos
        </Button>
        <TextInput
          mode="outlined"
          label=""
          value={barrio}
          style={{height: 40, width: '100%'}}
          onChangeText={title => setBarrio(title)}
        />
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
