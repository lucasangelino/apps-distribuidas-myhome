import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

function AppLayout({children}) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF5F5',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
});

export default AppLayout;
