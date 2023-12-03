import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import Heading from '../../components/Heading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import uuid from 'react-native-uuid';
import {AuthContext} from '../../context/AppContext';

const Comentarios = () => {
  const {auth, _} = React.useContext(AuthContext);
  console.log(auth);
  const fetchedPoints = 4.5;
  const fetchedComments = [
    {
      id: '1',
      stars: 4.5,
      text: 'Muy buena atención, el lugar es muy lindo y la comida es excelente.',
      date: 'Sept 12 2021',
      author: 'Juan Perez',
    },
    {
      id: '2',
      stars: 3,
      text: 'Muy buena atención, el lugar es muy lindo y la comida es excelente.',
      date: 'Sept 12 2021',
      author: 'Juan Perez',
    },
    {
      id: '3',
      stars: 5,
      text: 'Muy buena atención, el lugar es muy lindo y la comida es excelente.',
      date: 'Sept 12 2021',
      author: 'Juan Perez',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Heading>Comentarios</Heading>
        </View>
        <Stars stars={fetchedPoints} />
      </View>
      <View style={styles.commentContainer}>
        {fetchedComments.map(comment => (
          <>
            <Comment {...comment} />
            <Divider key={uuid.v4()} />
          </>
        ))}
      </View>
    </View>
  );
};

const Comment = ({id, stars, text, date, author}) => {
  return (
    <View style={styles.comment} key={uuid.v4()}>
      <Stars stars={stars} />
      <Text style={{marginVertical: 10}}>{text}</Text>
      <View style={styles.commentFooter}>
        <Text>{author}</Text>
        <Text>{date}</Text>
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
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    minHeight: '100%',
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  starContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  commentContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginVertical: 10,
  },
  comment: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    borderRadius: 10,
  },
  commentFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
});

export default Comentarios;
