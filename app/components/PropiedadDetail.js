import React, {useContext} from 'react';
import {
  Alert,
  Share,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  Divider,
  Text,
  Card,
  Button,
  Avatar,
  Portal,
  Modal,
} from 'react-native-paper';
import uuid from 'react-native-uuid';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {priceFormater} from '../utils/utils';
import {Comment} from '../screens/inmobiliaria/Comentarios';
import {InmobiliariaContext} from '../context/InmobiliariaContext';
import {
  addUserFavorite,
  deleteUserFavorite,
} from '../services/API';

const PropiedadDetail = ({route, navigation}) => {
  const [visibleContactar, setVisibleContactar] = React.useState(false);
  const showModalContactar = () => setVisibleContactar(true);
  const hideModalContactar = () => setVisibleContactar(false);

  const [visibleReservar, setVisibleReservar] = React.useState(false);
  const showModalReservar = () => setVisibleReservar(true);
  const hideModalReservar = () => setVisibleReservar(false);

  const handleContactar = () => {
    hideModalContactar();
    navigation.navigate('Contactar', {propiedad: property});
  };

  const handleSolicitarVisita = () => {
    hideModalContactar();
    navigation.navigate('SolicitarVisita', {propiedad: property});
  };

  const handleReserva = () => {
    hideModalReservar();
    navigation.navigate('ReservarPropiedad', {propiedad: property});
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Hola, te comparto esta propiedad que encontré: ' +
          property.description,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

const {propiedades, setPropiedades} = useContext(InmobiliariaContext);

  const {property} = route.params;
  const {id, description, contract_types, location, multimedia, user, status, isFav, favoriteId} =
    property;
     const [fav, setFav] = React.useState(isFav);
      const [favId, setFavId] = React.useState(favoriteId);
  const {price = 0, expPrice = 0} =
    contract_types.length > 0 ? contract_types[0] : {};
  const uri =
    multimedia.length > 0 ? multimedia[0].url : 'https://picsum.photos/700';

  const handleFavorite = async () => {
    try {
      if (!fav) {
        const res = await addUserFavorite({ id });
        setFav(true);
        setFavId(res.data.favoriteId);
        setPropiedades((prevPropiedades) =>
          prevPropiedades.map((propiedad) =>
            propiedad.id === id ? { ...propiedad, isFav: true } : propiedad
          )
        );
      } else {
        const res = await deleteUserFavorite({ favId });
        setFav(false);
        setPropiedades((prevPropiedades) =>
          prevPropiedades.map((propiedad) =>
            propiedad.id === id ? { ...propiedad, isFav: false } : propiedad
          )
        );
      }
    } catch (error) {
      console.error('Error al manejar favorito:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={StyleSheet.container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 20,
            alignSelf: 'flex-start',
            alignItems: 'center',
          }}>
          <Ionicons
            name="arrow-back-outline"
            size={20}
            color={'#212121'}
            onPress={() => navigation.navigate('HomeUser')}
          />
          <Avatar.Image
            size={50}
            source={require('../assets/images/Logo.png')}
            backgroundColor="#eff5f5"
            style={{marginLeft: 17}}
          />
          <Text variant="titleLarge" style={{marginLeft: 18}}>
            Detalles de Propiedad
          </Text>
          <Ionicons
            name="share-social-outline"
            size={20}
            color={'#212121'}
            style={{marginLeft: 25}}
            onPress={() => onShare()}
          />
        </View>
        <ScrollView style={{minHeight: '100%'}}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              minHeight: '100%',
              borderRadius: 30,
            }}>
            <View style={styles.cardImageContainer}>
              <FavouriteIcon isFav={fav} onFavorite={() => handleFavorite(id)} />
              <Card.Cover style={styles.cardCover} source={{uri: uri}} />
            </View>
            <Card.Content style={styles.Content}>
              <View style={styles.priceContainer}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'baseline',
                  }}>
                  <Price>{`${priceFormater({price})}`}</Price>
                  <Text variant="bodyLarge">Precio</Text>
                </View>
                {contract_types[0].contractType === 'Alquiler' ? (
                  <View
                    style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                    <Expenses>{`${priceFormater({price: expPrice})}`}</Expenses>
                    <Text variant="bodyMedium">Expensas</Text>
                  </View>
                ) : null}
              </View>
              <Location>
                {location?.street +
                  ' ' +
                  location?.streetNumber +
                  ', ' +
                  location?.district +
                  ', ' +
                  location?.province}
              </Location>
              <Amenities />
              <Description>{description}</Description>
            </Card.Content>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Avatar.Image
                size={70}
                source={{uri: user.photo}}
                backgroundColor="#eff5f5"
                style={{marginRight: 5}}
              />
              <Text variant="titleLarge">{user.fantasyName}</Text>
              <Stars stars={user.rating} />
            </View>
            <View style={{alignItems: 'center'}}>
              <View style={{shadowOpacity: 0}}>
                <Text variant="bodyLarge" style={{marginBottom: 5}}>
                  Comentarios de la Inmobiliaria
                </Text>
              </View>
              {user.comments.length < 1 ? (
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                  }}>
                  <Text variant="bodyMedium">
                    La Inmobiliaria no posee comentarios 😢
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    width: '95%',
                    backgroundColor: '#e5e5e5',
                    borderRadius: 5,
                  }}>
                  {user.comments.map(comment => {
                    console.log(comment);
                    return (
                      <>
                        <Comment {...comment} />
                        <Divider key={uuid.v4()} />
                      </>
                    );
                  })}
                </View>
              )}
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 10,
                marginBottom: 10,
              }}>
              <Button
                style={styles.button}
                mode="outlined"
                onPress={showModalContactar}>
                Contactar
              </Button>
              {status === 'Publicada' ? (
                <Button
                  style={styles.button}
                  disabled={false}
                  mode="contained"
                  onPress={showModalReservar}>
                  Reservar
                </Button>
              ) : (
                <Button style={styles.button} disabled={true} mode="contained">
                  Reservar
                </Button>
              )}
            </View>
          </View>
          <Portal style={styles.container}>
            <Modal
              visible={visibleContactar}
              onDismiss={hideModalContactar}
              contentContainerStyle={{
                display: 'flex',
                alignSelf: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                padding: 20,
                borderRadius: 10,
                marginHorizontal: 10,
              }}>
              <Text variant="bodyLarge">
                ¿Desea contactar a la propiedad o solicitar visita programada?
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <Button
                  style={styles.button}
                  mode="contained"
                  onPress={handleContactar}>
                  Contactar
                </Button>
                <Button
                  style={styles.button}
                  mode="contained"
                  onPress={handleSolicitarVisita}>
                  Solicitar Visita
                </Button>
              </View>
            </Modal>
          </Portal>
          <Portal style={styles.container}>
            <Modal
              visible={visibleReservar}
              onDismiss={hideModalReservar}
              contentContainerStyle={{
                display: 'flex',
                alignSelf: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                padding: 20,
                borderRadius: 10,
                marginHorizontal: 10,
              }}>
              <Text variant="bodyLarge">
                ¿Desea reservar la propiedad? Deberá abonar el 50% del monto.
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <Button
                  style={styles.button}
                  mode="contained"
                  onPress={hideModalReservar}>
                  Cancelar
                </Button>
                <Button
                  style={styles.button}
                  mode="contained"
                  onPress={handleReserva}>
                  Continuar
                </Button>
              </View>
            </Modal>
          </Portal>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const Price = ({children}) => <Text variant="headlineMedium">{children}</Text>;
const Expenses = ({children}) => {
  return (
    <View style={styles.smallDesc}>
      <Ionicons name="cash-outline" size={20} color={'#757474'} />
      <Text variant="bodyMedium" style={styles.smallDescText}>
        {children}
      </Text>
    </View>
  );
};
const Location = ({children}) => {
  return (
    <View style={styles.smallDesc}>
      <Ionicons name="location-outline" size={20} color={'#393939'} />
      <Text style={styles.locationText}>{children}</Text>
    </View>
  );
};
const Description = ({children}) => (
  <Text variant="bodyMedium" style={{marginVertical: 10}}>
    {children}
  </Text>
);
const FavouriteIcon = ({isFav, onFavorite}) => {
  const [fav, setFav] = React.useState(isFav);
  return (
    <View style={styles.cardFavourite}>
      <Ionicons
        name={fav ? 'bookmark' : 'bookmark-outline'}
        size={20}
        color={fav ? '#EB6440' : '#757474'}
        onPress={() => {
          setFav(!fav);
          onFavorite();
        }}
      />
    </View>
  );
};
const Amenities = () => {
  return (
    <View style={styles.cardAmenities}>
      <View style={styles.smallDesc}>
        <Ionicons name="resize-outline" size={20} color={'#757474'} />
        <Text variant="bodyMedium" style={styles.smallDescText}>
          12 mts
        </Text>
      </View>
      <View style={styles.smallDesc}>
        <Ionicons name="water-outline" size={20} color={'#757474'} />
        <Text variant="bodyMedium" style={styles.smallDescText}>
          3
        </Text>
      </View>
      <View style={styles.smallDesc}>
        <Ionicons name="car-outline" size={20} color={'#757474'} />
        <Text variant="bodyMedium" style={styles.smallDescText}>
          1
        </Text>
      </View>
      <View style={styles.smallDesc}>
        <Ionicons name="bed-outline" size={20} color={'#757474'} />
        <Text variant="bodyMedium" style={styles.smallDescText}>
          3
        </Text>
      </View>

      <View style={styles.smallDesc}>
        <Ionicons name="bed-outline" size={20} color={'#757474'} />
        <Text variant="bodyMedium" style={styles.smallDescText}>
          3
        </Text>
      </View>

      <View style={styles.smallDesc}>
        <Ionicons name="business-outline" size={20} color={'#757474'} />
        <Text variant="bodyMedium" style={styles.smallDescText}>
          3
        </Text>
      </View>
    </View>
  );
};

const Stars = ({stars}) => {
  const starsArray = [];
  const fullStars = Math.floor(stars);
  const halfStar = stars % 1;
  const emptyStars = 4 - fullStars - halfStar;
  for (let i = 0; i < fullStars; i++) {
    starsArray.push(
      <Ionicons key={uuid.v4()} name="star" size={20} color="#FFC107" />,
    );
  }
  if (halfStar) {
    starsArray.push(
      <Ionicons key={uuid.v4()} name="star-half" size={20} color="#FFC107" />,
    );
  }
  for (let i = 0; i < emptyStars; i++) {
    starsArray.push(<Ionicons key={uuid.v4()} name="star-outline" size={20} />);
  }
  return (
    <View key={uuid.v4()} style={styles.starContainer}>
      {starsArray}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#eff5f5',
  },
  starContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 10,
  },
  cardContainer: {
    marginVertical: 8,
    borderColor: '#fff',
  },
  cardImageContainer: {
    position: 'relative',
  },
  priceContainer: {
    width: '100%',
    display: 'flex',
    gap: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  cardCover: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  Content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 5,
    marginTop: 10,
  },
  cardAmenities: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 5,
  },
  cardFavourite: {
    position: 'absolute',
    zIndex: 999,
    right: 5,
    top: 5,
    backgroundColor: '#fff',
    height: 30,
    width: 30,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardPropiedadType: {
    position: 'absolute',
    zIndex: 999,
    right: 5,
    bottom: 5,
    backgroundColor: '#fff',
    fontSize: 25,
    paddingHorizontal: 20,
    paddingVertical: 2,
    borderRadius: 5,
  },
  cardPropiedadTypeText: {
    color: '#EB6440',
    fontSize: 12,
    fontWeight: 'bold',
  },
  smallDesc: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  smallDescText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#757474',
  },
  locationText: {
    fontSize: 14,
    fontWeight: 'semibold',
    color: '#393939',
  },
});
export default PropiedadDetail;
