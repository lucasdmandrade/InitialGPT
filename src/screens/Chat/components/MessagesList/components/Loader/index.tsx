import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

const LoadingIndicator: React.FC = () => (
  <View style={styles.container}>
    <ActivityIndicator size="small" color="#e453df" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default LoadingIndicator;
