import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

const NoFavoritos = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Text variant="headlineSmall">{t('No hay favoritos')} 😢</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#fff',
  },
});

export default NoFavoritos;
