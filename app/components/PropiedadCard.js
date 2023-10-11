import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import ActionButton from './ActionButton';

import {priceFormater} from '../utils/utils';

const PropiedadCard = ({propiedad}) => {
  const {id, price, uri, location, description, expenses, propiedadType} =
    propiedad;
  return (
    <Card style={styles.cardContainer} key={id}>
      <View style={styles.cardImageContainer}>
        <FavouriteIcon />
        <PropiedadType>{propiedadType}</PropiedadType>
        <Card.Cover style={styles.cardCover} source={{uri: uri}} />
      </View>
      <Card.Content style={styles.Content}>
        <Price>{`${priceFormater({price})}`}</Price>
        <Expenses>{`${priceFormater({price: expenses})}`}</Expenses>
        <Location>{location}</Location>
        <Amenities />
        <Description>{description}</Description>
      </Card.Content>
      <Card.Actions>
        <ActionButton
          label="ver mas"
          fullWith
          onClick={() => console.log(id)}
        />
      </Card.Actions>
    </Card>
  );
};

const Price = ({children}) => <Text variant="headlineMedium">{children}</Text>;
const Expenses = ({children}) => <Text variant="bodySmall">{children}</Text>;
const Location = ({children}) => <Text variant="titleMedium">{children}</Text>;
const Description = ({children}) => <Text variant="bodySmall">{children}</Text>;
const FavouriteIcon = () => <Text style={styles.cardFavourite}></Text>;
const PropiedadType = ({children}) => (
  <View style={styles.cardPropiedadType}>
    <Text style={styles.cardPropiedadTypeText}>
      {children || 'en alquiler'}
    </Text>
  </View>
);
const Amenities = () => {
  return (
    <View style={styles.cardAmenities}>
      <Text variant="bodySmall">Mts</Text>
      <Text variant="bodySmall">Baño</Text>
      <Text variant="bodySmall">Parking</Text>
      <Text variant="bodySmall">Dormitorios</Text>
      <Text variant="bodySmall">Ambientes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 8,
  },
  cardImageContainer: {
    position: 'relative',
  },
  cardCover: {
    borderRadius: 0,
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
});

PropiedadCard.Price = Price;
PropiedadCard.Expenses = Expenses;
PropiedadCard.Location = Location;
PropiedadCard.Description = Description;

export default PropiedadCard;
