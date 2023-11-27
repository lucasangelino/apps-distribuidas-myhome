import React, { useEffect, useContext } from 'react';
import { StyleSheet, View, Image, Modal, TextInput, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BACKEND_URL, API_VERSION } from 'react-native-dotenv';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AppContext';
import { launchCamera } from 'react-native-image-picker';

const InmobiliariaProfile = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [fetchedInmobiliaria, setFetchedInmobiliaria] = React.useState([]);
  const [editedValues, setEditedValues] = React.useState({});
  const [editingField, setEditingField] = React.useState(null);
  const [modalTitle, setModalTitle] = React.useState('');
  const { auth, setAuth } = useContext(AuthContext);
  const [error, setError] = React.useState('');

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userToken');
      const userData = JSON.parse(jsonValue);
      const token = userData.token;
      const id = userData.id;
      const req = await fetch(`${BACKEND_URL}/${API_VERSION}/users/me`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await req.json();
      const user = res.data;
      setFetchedInmobiliaria(user);

    } catch (error) {
      console.log('error: ' + error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      setAuth({
        hasUser: false,
        user: null,
      });
    } catch (error) {
      console.log('Error logging out: ' + error);
    }
  };

  const deleteAccount = async () => {
    try {
      //TODO Agregar endpoint para eliminar cuenta
      await AsyncStorage.clear();
      setAuth({
        hasUser: false,
        user: null,
      });
    } catch (error) {
      console.log('Error logging out: ' + error);
    }
  };

  const validateField = () => {
    switch (editingField) {
      case 'fantasyName':
        if (editedValues[editingField] === '') {
          setError('Campo obligatorio.');
        } else {
          setError('');
        }
        break;
      case 'firstName':
        if (editedValues[editingField] === '') {
          setError('Campo obligatorio.');
        } else {
          setError('');
        }
        break;
      case 'lastName':
        if (editedValues[editingField] === '') {
          setError('Campo obligatorio.');
        } else {
          setError('');
        }
        break;
      case 'cuit':
        if (editedValues[editingField] === '') {
          setError('Completar con un número de CUIT.');
        } else if (editedValues[editingField].length !== 11) {
          setError('El CUIT debe tener 11 dígitos.');
        } else {
          setError('');
        }
        break;
      case 'mail':
        if (editedValues[editingField] === '') {
          setError('Completar con un email.');
        } else if (!isValidEmail(editedValues[editingField])) {
          setError('El email ingresado no es válido.');
        } else {
          setError('');
        }
        break;
      case 'contactMail':
        if (editedValues[editingField] === '') {
          setError('Completar con un email.');
        } else if (!isValidEmail(editedValues[editingField])) {
          setError('El email ingresado no es válido.');
        } else {
          setError('');
        }
        break;
      case 'password':
        if (editedValues[editingField] === '') {
          setError('Completar con una contraseña.');
        } else if (editedValues[editingField].length < 8) {
          setError('La contraseña debe tener al menos 8 caracteres.');
        } else if (!/[A-Z]/.test(editedValues[editingField])) {
          setError('La contraseña debe tener al menos una letra mayúscula.');
        } else {
          setError('');
        }
        break;
      case 'phone':
        if (editedValues[editingField] === '') {
          setError('Completar con un número de teléfono.');
        } else if (editedValues[editingField].length !== 10) {
          setError('El número de teléfono debe tener 10 dígitos.');
        } else {
          setError('');
        }
        break;
      default:
        break;
    }
  };

  const isValidEmail = (email) => {
    // Validación básica de dirección de correo electrónico
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEdit = (field, modalTitle) => {
    setIsModalVisible(true);
    setEditingField(field);
    setModalTitle(modalTitle);
    const initialValue = fetchedInmobiliaria[field] || '';
    const editedValue = field === 'phone' && initialValue.startsWith('+549') ? initialValue.slice(4) : initialValue;
    setEditedValues({ ...editedValues, [field]: editedValue });
  };

  const handleSave = async () => {
    try {
      validateField()
      if (error != '') {
        // Mostrar el error en el modal o realizar la acción correspondiente
        console.log('Error:', error);
        return;
      }
      const jsonValue = await AsyncStorage.getItem('userToken');
      const userData = JSON.parse(jsonValue);
      const token = userData.token;

      const editedValue = editingField === 'phone' && !editedValues[editingField].startsWith('+549')
        ? `+549${editedValues[editingField]}`
        : editedValues[editingField];

      const response = await fetch(`${BACKEND_URL}/${API_VERSION}/users`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          [editingField]: editedValue
        }),
      });

      const res = await response.json();
      const user = res.data;
      setFetchedInmobiliaria(user);

      setIsModalVisible(false);
    } catch (error) {
      console.error('Error al realizar la solicitud PATCH:', error);
    }
  };
  const handleImagePicker = async () => {
    const options = {
      title: 'Seleccionar imagen de perfil'
    };

    const response = await launchCamera({
      mediaType: 'photo',
      selectionLimit: 0,
    });
    if (response.cancelled) {
      console.log('Selección de imagen cancelada');
    } else if (response.error) {
      console.log('Error al seleccionar la imagen:', response.error);
    } else {
      try {
        const jsonValue = await AsyncStorage.getItem('userToken');
        const userData = JSON.parse(jsonValue);
        const token = userData.token;

        const formData = new FormData();
        formData.append('photo', {
          uri: response.uri,
          type: response.type,
          name: 'profile.jpg',
        });

        const responseImage = await fetch(`${BACKEND_URL}/${API_VERSION}/users/photo`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });

        const resImage = await responseImage.json();
        const updatedUser = resImage.data;
        setFetchedInmobiliaria(updatedUser);

        // También podrías actualizar la imagen localmente para que se refleje de inmediato
        setSelectedImage(response);
      } catch (error) {
        console.error('Error al enviar la imagen:', error);
      }
    }
  };

  useEffect(() => {
    const loadUser = navigation.addListener('focus', () => {
      getUser();
    });
    return loadUser;
  }, [navigation]);


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {fetchedInmobiliaria.photo ? (
          <Image
            source={{ uri: fetchedInmobiliaria.photo }}
            style={styles.profileImage}
            onError={(error) => console.error('Error al cargar la imagen:', error)}
          />
        ) : (
          <Text>Foto no disponible</Text>
        )}
        <Button mode="contained" onPress={handleImagePicker}>
          <Text>Editar imagen</Text>
        </Button>
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.name}>{fetchedInmobiliaria.fantasyName}</Text>
        <Ionicons
          name="pencil"
          size={30}
          color={'#ccc'}
          onPress={() => handleEdit('fantasyName', "Nombre de Fantasia")}
        />
      </View>

      <View style={styles.fieldName}>
        <Text>E-mail de usuario</Text>
        <View style={styles.fieldValue}>
          <Text>{fetchedInmobiliaria.mail}</Text>
          <Ionicons
            name="pencil"
            size={20}
            color={'#ccc'}
            onPress={() => handleEdit('mail', "Email")}
          />
        </View>
      </View>

      <View style={styles.fieldName}>
        <Text>E-mail de contacto</Text>
        <View style={styles.fieldValue}>
          <Text>{fetchedInmobiliaria.contactMail}</Text>
          <Ionicons
            name="pencil"
            size={20}
            color={'#ccc'}
            onPress={() => handleEdit('contactMail', "Email de Contacto")}
          />
        </View>
      </View>

      <View style={styles.fieldName}>
        <Text>Contraseña</Text>
        <View style={styles.fieldValue}>
          <Text>{fetchedInmobiliaria.password}</Text>
          <Ionicons
            name="pencil"
            size={20}
            color={'#ccc'}
            onPress={() => handleEdit('password', "Password")}
          />
        </View>
      </View>

      <View style={styles.fieldName}>
        <Text>Nombre</Text>
        <View style={styles.fieldValue}>
          <Text>{fetchedInmobiliaria.firstName}</Text>
          <Ionicons
            name="pencil"
            size={20}
            color={'#ccc'}
            onPress={() => handleEdit('firstName', "Nombre")}
          />
        </View>
      </View>


      <View style={styles.fieldName}>
        <Text>Apellido</Text>
        <View style={styles.fieldValue}>
          <Text>{fetchedInmobiliaria.lastName}</Text>
          <Ionicons
            name="pencil"
            size={20}
            color={'#ccc'}
            onPress={() => handleEdit('lastName', "Apellido")}
          />
        </View>
      </View>

      <View style={styles.fieldName}>
        <Text>Teléfono</Text>
        <View style={styles.fieldValue}>
          <Text>{fetchedInmobiliaria.phone}</Text>
          <Ionicons
            name="pencil"
            size={20}
            color={'#ccc'}
            onPress={() => handleEdit('phone', "Teléfono")}
          />
        </View>
      </View>

      <View style={styles.fieldName}>
        <Text>CUIT</Text>
        <View style={styles.fieldValue}>
          <Text>{fetchedInmobiliaria.cuit}</Text>
          <Ionicons
            name="pencil"
            size={20}
            color={'#ccc'}
            onPress={() => handleEdit('cuit', "CUIT")}
          />
        </View>
      </View>

      <Button mode="outlined" onPress={handleLogout}>
        <Text>Cerrar sesión</Text>
      </Button>

      <Button mode="contained" onPress={deleteAccount}>
        <Text>Eliminar cuenta</Text>
      </Button>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Cambiar {modalTitle}</Text>
          <TextInput
            style={styles.input}
            value={editedValues[editingField]}
            onChangeText={(text) => setEditedValues({ ...editedValues, [editingField]: text })}
          />
          <Text style={{ color: 'red' }}>{error}</Text>
          <Button mode="contained" onPress={handleSave}>
            <Text>Guardar</Text>
          </Button>
          <Button mode="outlined" onPress={() => setIsModalVisible(false)}>
            <Text>Cancelar</Text>
          </Button>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    direction: 'column',
    padding: 10,
    backgroundColor: '#fff',
  },
  fieldName: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fieldValue: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  imageContainer: {
    alignItems: 'center',

  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: 'black',
  },
  name: {
    fontSize: 30,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#EB6440',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semi-transparente
  },

  modalContent: {
    backgroundColor: '#fff', // Fondo blanco
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },

  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    width: '100%',
    textAlign: 'center',
  },
});

export default InmobiliariaProfile;
