/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View} from 'react-native';
import Heading from '../../components/Heading';
import {SegmentedButtons, TextInput, Button} from 'react-native-paper';
import {postUserComment} from '../../services/API';
import {useTranslation} from 'react-i18next';

const UserComentarAlquiler = ({route, navigation}) => {
  const {alquilerId: contractTypeId} = route.params;

  const [reviewType, setReviewType] = React.useState(false);
  const [commentMessage, setCommentMessage] = useState('');
  const {t} = useTranslation();

  const handlePostComments = async () => {
    const {ok} = await postUserComment({
      contractTypeId,
      reviewType,
      commentMessage,
    });
    if (ok) {
      navigation.navigate('UserComentarioExito', {alquilerId: contractTypeId});
    } else {
      console.log('error');
    }
  };

  return (
    <View
      style={{
        height: '100%',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
      }}>
      <Heading>{t('Comentar Alquiler')}</Heading>
      <SegmentedButtons
        style={{marginTop: 30}}
        value={reviewType}
        onValueChange={setReviewType}
        buttons={[
          {
            value: 'Positiva',
            label: 'Recomendar',
          },
          {
            value: 'Negativa',
            label: 'No Recomendar',
          },
        ]}
      />
      <TextInput
        style={{marginTop: 30}}
        label="Comentario"
        mode="outlined"
        value={commentMessage}
        multiline={true}
        numberOfLines={10}
        onChangeText={text => setCommentMessage(text)}
      />

      <Button
        style={{marginTop: 30}}
        mode="contained"
        onPress={handlePostComments}>
        {t('Guardar')}
      </Button>
    </View>
  );
};

export default UserComentarAlquiler;
