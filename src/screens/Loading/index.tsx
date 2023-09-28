import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import WelcomeAnimation from '../Chat/components/WelcomeAnimation';

const Loading: FC = () => (
  <View style={styles.container}>
    <WelcomeAnimation text={['Snack Prompt ']} disableBackground />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191a20',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 15,
    paddingBottom: 10,
  },
});

export default Loading;
