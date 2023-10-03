import React from 'react';
import {StatusBar} from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {MenuProvider} from 'react-native-popup-menu';
import Stack from './src/services/navigation';

export default function App() {
  const changeNavigationBar = async () => {
    try {
      await changeNavigationBarColor('#191a20');
    } catch (e) {
      console.log(e);
    }
  };

  changeNavigationBar();

  return (
    <>
      <MenuProvider>
        <StatusBar animated={true} backgroundColor="#191a20" />
        <Stack />
      </MenuProvider>
    </>
  );
}
