import React from 'react';
import {StatusBar} from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import Stack from './src/services/navigation';

export default function App() {
  const example = async () => {
    try {
      await changeNavigationBarColor('#191a20');
    } catch (e) {
      console.log(e);
    }
  };

  example();

  return (
    <>
      <StatusBar animated={true} backgroundColor="#191a20" />
      <Stack />
    </>
  );
}
