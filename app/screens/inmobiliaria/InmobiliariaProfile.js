import React, { useEffect, useContext } from 'react';
import { StyleSheet, View, Image, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BACKEND_URL, API_VERSION } from 'react-native-dotenv';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AppContext';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { updateUser, getUserProfile } from '../../services/API';

const InmobiliariaProfile = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isModalImageVisible, setIsModalImageVisible] = React.useState(false);
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
      const res = await getUserProfile();
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

const deleteAccount = () => {
  Alert.alert(
    'Eliminar Cuenta',
    '¿Estás seguro de que quieres eliminar tu cuenta?',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Eliminar',
        onPress: async () => {
          try {
           const formData = new FormData();
            formData.append('status', 'Deactivated');
            const res = await updateUser({ formData });
            await AsyncStorage.clear();
            setAuth({
              hasUser: false,
              user: null,
            });
          } catch (error) {
            console.log('Error al eliminar cuenta:', error);
          }
        },
      },
    ],
    { cancelable: false }
  );
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

  const handleImagePicker = (field, modalTitle) => {
    setIsModalImageVisible(true);
  };

  const handleSave = async () => {
    try {
      validateField()
      if (error != '') {
        console.log('Error:', error);
        return;
      }
      const jsonValue = await AsyncStorage.getItem('userToken');
      const userData = JSON.parse(jsonValue);
      const token = userData.token;

      const editedValue = editingField === 'phone' && !editedValues[editingField].startsWith('+549')
        ? `+549${editedValues[editingField]}`
        : editedValues[editingField];

      const formData = new FormData();
      formData.append(editingField, editedValue);

      const res = await updateUser({ formData });
      const user = res.data;
      setFetchedInmobiliaria(user);

      setIsModalVisible(false);
    } catch (error) {
      console.error('Error al realizar la solicitud PATCH:', error);
    }
  };

  const handleImageSelection = async (response) => {
    if (response.cancelled) {
      console.log('Selección de imagen cancelada');
      return;
    }

    if (response.error) {
      console.log('Error al seleccionar la imagen:', response.error);
      return;
    }

    try {
      const selectedAssets = response.assets;
      const selectedUris = selectedAssets.map(i => ({
        name: i.fileName,
        originalFilename: i.fileName,
        size: i.fileSize,
        type: i.type,
        path: i.originalPath,
        uri: i.uri,
      }));

      const formData = new FormData();
      formData.append('photo', selectedUris[0]);

      const resImage = await updateUser({ formData });
      const updatedUser = resImage.data;
      setFetchedInmobiliaria(updatedUser);
      if (!response.fromGallery) {
        setIsModalImageVisible(false);
      }
    } catch (error) {
      console.error('Error al enviar la imagen:', error);
    }
  };

  const selectImagesFromGallery = async () => {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    handleImageSelection(response);
  };

  const selectImagesFromCamera = async () => {
    const response = await launchCamera({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    handleImageSelection(response);
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
        <Button style={{
          marginTop: 5
        }} mode="contained" onPress={handleImagePicker}>
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

      <Button style={{
        marginTop: 5
      }} mode="contained" onPress={deleteAccount}>
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
          <Button style={{
            marginTop: 5
          }} mode="outlined" onPress={() => setIsModalVisible(false)}>
            <Text>Cancelar</Text>
          </Button>
        </View>
      </Modal>
      <Modal visible={isModalImageVisible} animationType="slide">
        <View style={styles.modalContainer}>
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
              marginTop: 5
            }}
            mode="outlined"
            onPress={selectImagesFromGallery}>
            {' '}
            Abrir galeria
          </Button>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 20,
              left: 20,
              zIndex: 1,
            }}
            onPress={() => setIsModalImageVisible(false)}>
            <Ionicons name="arrow-back" size={30} color="#EB6440" />
          </TouchableOpacity>
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
    marginVertical: 10,
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
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#EB6440',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  modalContent: {
    backgroundColor: '#fff',  
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
