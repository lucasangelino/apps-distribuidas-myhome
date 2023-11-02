import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text, Button} from 'react-native-paper';
import ActionButton from './ActionButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {priceFormater} from '../utils/utils';

const PropiedadCard = ({propiedad}) => {
  const {id, price, uri, location, description, expenses, propiedadType} =
    propiedad;
  return (
    <Card style={styles.cardContainer} key={id}>
      <View style={styles.cardImageContainer}>
        <FavouriteIcon isFav={false} />
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
          disable={true}
          label="EDITAR (2da entrega)"
          fullWith
          onClick={() => console.log(id)}
        />
      </Card.Actions>
    </Card>
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
      <Ionicons name="location-outline" size={32} color={'#393939'} />
      <Text style={styles.locationText}>{children}</Text>
    </View>
  );
};
const Description = ({children}) => <Text variant="bodySmall">{children}</Text>;
const FavouriteIcon = ({isFav}) => {
  const [fav, setFav] = React.useState(isFav);
  return (
    <View style={styles.cardFavourite}>
      <Ionicons
        name={fav ? 'bookmark' : 'bookmark-outline'}
        size={20}
        color={fav ? '#EB6440' : '#757474'}
        onPress={() => setFav(!fav)}
      />
    </View>
  );
};
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
    fontSize: 18,
    fontWeight: 'semibold',
    color: '#393939',
  },
});

PropiedadCard.Price = Price;
PropiedadCard.Expenses = Expenses;
PropiedadCard.Location = Location;
PropiedadCard.Description = Description;

export default PropiedadCard;
