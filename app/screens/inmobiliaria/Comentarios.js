import React, { useEffect, useContext } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import Heading from '../../components/Heading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import uuid from 'react-native-uuid';
import { AuthContext } from '../../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserProfile } from '../../services/API';
import NoComentarios from '../../components/NoComentarios';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const Comentarios = ({ navigation }) => {
  const { auth, _ } = React.useContext(AuthContext);
  console.log(auth);
  const [fetchedComments, setFetchedComments] = React.useState([]);
  const [fetchedPoints, setFetchedPoints] = React.useState(0);
  const getComments = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userToken');
      const userData = JSON.parse(jsonValue);
      const token = userData.token;
      const id = userData.id;
      const res = await getUserProfile();
      const user = res.data;
      if (user.comments && user.comments.length > 0) {
        const comments = user.comments.map(comment => {
          // Parsear la fecha y formatearla como "MMM d yyyy"
          const formattedDate = format(new Date(comment.updatedAt), 'MMM d yyyy', { locale: es });

          return {
            author: comment.authorName,
            date: formattedDate,
            text: comment.message,
            id: comment.commentId,
            status: comment.reviewType,
            photo: comment.authorPhoto
          };
        });


        setFetchedComments(comments);
      } else {
        console.log('El usuario no tiene comentarios.');
      };

      setFetchedPoints(user.rating)
    } catch (error) {
      console.log('error: ' + error);
    }
  };
  useEffect(() => {
    const loadComments = navigation.addListener('focus', () => {
      getComments();
    });
    return loadComments;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Heading>Comentarios</Heading>
        </View>
        <Stars stars={fetchedPoints} />
      </View>
      {fetchedComments.length === 0 ? (
        <NoComentarios />
      ) : (
        <View style={styles.commentContainer}>
          {fetchedComments.map(comment => (
            <React.Fragment key={uuid.v4()}>
              <Comment {...comment} />
              <Divider key={uuid.v4()} />
            </React.Fragment>
          ))}
        </View>)}
    </View>
  );
};

const Comment = ({ id, stars, text, date, author, status, photo }) => {
  return (
    <View style={styles.commentContainer} key={uuid.v4()}>
      <View style={styles.imageContainer}>
        {photo ? (
          <Image
            source={{ uri: photo }}
            style={styles.profileImage}
            onError={(error) => console.error('Error al cargar la imagen:', error)}
          />
        ) : (
          <Text>Foto no disponible</Text>
        )}
      </View>
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentAuthor}>{author}</Text>
          <Text style={styles.commentDate}>{date}</Text>
        </View>
        <ComentarioType>{status}</ComentarioType>
        <Text style={styles.commentText}>{text}</Text>
      </View>
    </View>
  );
};

const ComentarioType = ({ children }) => {
  const statusColor = children === 'Positiva' ? 'green' : 'red';

  return (
    <View style={{ ...styles.cardComentarioType, backgroundColor: statusColor }}>
      <Text style={styles.cardComentarioTypeText}>
        {children}
      </Text>
    </View>
  );
};

const Stars = ({ stars }) => {
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
  comment: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    borderRadius: 10,
  },
  cardComentarioType: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: '#fff',
    fontSize: 25,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 5,
  },
  cardComentarioTypeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  commentContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    alignItems: 'flex-start',
    backgroundColor: '#f0f0f0', // Puedes ajustar el color de fondo según tu diseño
  },
  imageContainer: {
    marginRight: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'black',
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  commentAuthor: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  commentDate: {
    color: 'gray',
  },
  commentText: {
    marginBottom: 10,
  },
});

export default Comentarios;
