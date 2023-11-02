import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Heading from '../../components/Heading';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Comentarios = () => {
  const fetchedPoints = 4.5;
  const fetchedComments = [
    {
      stars: 4,
      text: 'Muy buena atención, el lugar es muy lindo y la comida es excelente.',
      date: '2021-05-01',
      author: 'Juan Perez',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Heading>Comentarios</Heading>
        <Text>{fetchedPoints}</Text>
        <Stars stars={fetchedPoints} />
      </View>
      <View style={styles.commentContainer}>
        {
          fetchedComments.map(comment => <Comment {...comment} />)
        }
      </View>
    </View>
  );
};

const Comment = ({ stars, text, date, author }) => {
  return (
    <View style={styles.comment}>
      <Stars stars={stars} />
      <Text>{text}</Text>
      <View style={styles.commentFooter}>
        <Text>{author}</Text>
        <Text>{date}</Text>
      </View>
    </View>
  )
};

const Stars = ({ stars }) => {
  const [completedStars, setCompletedStars] = React.useState(0);
  const [halfStars, setHalfStars] = React.useState(0);

  useEffect(() => {
    if (stars > 0) {
      const completedStars = Math.floor(stars / 2);
      const halfStars = stars % 2;
      setCompletedStars(completedStars);
      setHalfStars(halfStars);
    }
  }, []);


  return (
    <View style={styles.starContainer}>
      {
        completedStars.map((star, index) => <Ionicons key={index} name="star" size={20} color="#FFC107" />)
      }
      {
        halfStars.map((star, index) => <Ionicons key={index} name="star-half" size={20} color="#FFC107" />)
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  header: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  starContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  commentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  comment: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  commentFooter: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default Comentarios;
