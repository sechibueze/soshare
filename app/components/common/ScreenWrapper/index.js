import React from 'react';
import { SafeAreaView, Platform, StatusBar, StyleSheet } from 'react-native';

export default function ScreenWrapper({ children }) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
