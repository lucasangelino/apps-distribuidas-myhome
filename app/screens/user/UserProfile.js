import React, {useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Text, Button} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../context/AppContext';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {updateUser, getUserProfile} from '../../services/API';
import {userValidation} from '../../utils/utils';
import {useTranslation} from 'react-i18next';

const UserProfile = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isModalImageVisible, setIsModalImageVisible] = React.useState(false);
  const [fetchedUser, setFetchedUser] = React.useState([]);
  const [editedValues, setEditedValues] = React.useState({});
  const [editingField, setEditingField] = React.useState(null);
  const [modalTitle, setModalTitle] = React.useState('');
  const {auth, setAuth} = useContext(AuthContext);
  const [error, setError] = React.useState('');
  const {validateUserField} = userValidation();
  const {t} = useTranslation();

  const getUser = async () => {
    try {
      const res = await getUserProfile();
      const user = res.data;
      setFetchedUser(user);
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

  const handleEdit = (field, modalTitle) => {
    setIsModalVisible(true);
    setEditingField(field);
    setModalTitle(modalTitle);
    const initialValue = fetchedUser[field] || '';
    const editedValue =
      field === 'phone' && initialValue.startsWith('+549')
        ? initialValue.slice(4)
        : initialValue;
    setEditedValues({...editedValues, [field]: editedValue});
  };

  const handleImagePicker = (field, modalTitle) => {
    setIsModalImageVisible(true);
  };

  const handleSave = async () => {
    try {
      const errorValidation = await validateUserField(
        editingField,
        editedValues[editingField],
      );
      setError(errorValidation);
      if (errorValidation != '') {
        console.log('Error:', error);
        return;
      }
      const jsonValue = await AsyncStorage.getItem('userToken');
      const userData = JSON.parse(jsonValue);
      const token = userData.token;

      const editedValue =
        editingField === 'phone' &&
        !editedValues[editingField].startsWith('+549')
          ? `+549${editedValues[editingField]}`
          : editedValues[editingField];

      const formData = new FormData();
      formData.append(editingField, editedValue);

      const res = await updateUser({formData});
      const user = res.data;
      setFetchedUser(user);

      setIsModalVisible(false);
    } catch (error) {
      console.error('Error al realizar la solicitud PATCH:', error);
    }
  };

  const handleImageSelection = async response => {
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

      const resImage = await updateUser({formData});
      const updatedUser = resImage.data;
      setFetchedUser(updatedUser);
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
        {fetchedUser.photo ? (
          <Image
            source={{uri: fetchedUser.photo}}
            style={styles.profileImage}
            onError={error =>
              console.error('Error al cargar la imagen:', error)
            }
          />
        ) : (
          <Text>{t('Foto no disponible')}</Text>
        )}
        <Button
          style={{
            marginTop: 5,
          }}
          mode="contained"
          onPress={handleImagePicker}>
          <Text>{t('Editar imagen')}</Text>
        </Button>
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.name}>
          {fetchedUser.firstName} {fetchedUser.lastName}{' '}
        </Text>
      </View>

      <View style={styles.fieldName}>
        <Text>{t('E-mail de usuario')}</Text>
        <View style={styles.fieldValue}>
          <Text>{fetchedUser.mail}</Text>
        </View>
      </View>

      <View style={styles.fieldName}>
        <Text>{t('Nombre')}</Text>
        <View style={styles.fieldValue}>
          <Text>{fetchedUser.firstName}</Text>
          <Ionicons
            name="pencil"
            size={20}
            color={'#ccc'}
            onPress={() => handleEdit('firstName', 'Nombre')}
          />
        </View>
      </View>

      <View style={styles.fieldName}>
        <Text>{t('Apellido')}</Text>
        <View style={styles.fieldValue}>
          <Text>{fetchedUser.lastName}</Text>
          <Ionicons
            name="pencil"
            size={20}
            color={'#ccc'}
            onPress={() => handleEdit('lastName', 'Apellido')}
          />
        </View>
      </View>

      <View style={styles.fieldName}>
        <Text>{t('Telefono')}</Text>
        <View style={styles.fieldValue}>
          <Text>{fetchedUser.phone}</Text>
          <Ionicons
            name="pencil"
            size={20}
            color={'#ccc'}
            onPress={() => handleEdit('phone', 'Teléfono')}
          />
        </View>
      </View>

      <Button mode="outlined" onPress={handleLogout}>
        <Text>{t('Cerrar sesión')}</Text>
      </Button>

      <Button
        style={{
          marginTop: 5,
        }}
        mode="contained"
        onPress={deleteAccount}>
        <Text>{t('Eliminar cuenta')}</Text>
      </Button>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>{`${t('Cambiar')} ${modalTitle}`}</Text>
          <TextInput
            style={styles.input}
            value={editedValues[editingField]}
            onChangeText={text =>
              setEditedValues({...editedValues, [editingField]: text})
            }
          />
          <Text style={{color: 'red'}}>{error}</Text>
          <Button mode="contained" onPress={handleSave}>
            <Text>{t('Guardar')}</Text>
          </Button>
          <Button
            style={{
              marginTop: 5,
            }}
            mode="outlined"
            onPress={() => {
              setError('');
              setIsModalVisible(false);
            }}>
            <Text>{t('Cancelar')}</Text>
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
            {t('Abrir camara')}
          </Button>
          <Button
            style={{
              width: '50%',
              backgroundColor: '#fff',
              marginTop: 5,
            }}
            mode="outlined"
            onPress={selectImagesFromGallery}>
            {' '}
            {t('Abrir galeria')}
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

export default UserProfile;
