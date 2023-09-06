import React, {useRef} from 'react';
import {View, StyleSheet, Alert, Button} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const ExternalPage = () => {
  console.log('aqui', DeviceInfo.getUniqueId());

  // const openGoogleChrome = () => {
  //   Linking.openURL(
  //     'https://auth0.openai.com/u/login/identifier?state=hKFo2SBqVHVyY2RreFhtUGJ4WTdodFRzTWxya1hOTDdMYWpCYqFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIFlnZXJTY0hCbUY3MzNZUUE0dE9FdjBXZU1FY0xqa3djo2NpZNkgZEJQWVBIWDh4R1R1ZXBOaFhaSkN5Y3dzeXN0RHN3N1k',
  //   ); // Substitua com o URL que deseja abrir
  // };

  const openLink = async () => {
    try {
      await InAppBrowser.openAuth(
        'https://platform.openai.com/login?launch?redirect_uri=${https://google.com}',
        'meuapp://Chat',
        {
          browserPackage: 'com.android.chrome',
        },
      ).then(response => console.log('teste', response));
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="teste" onPress={() => openLink()} />
      {/* <WebView
        nativeConfig={{
          component: Teste,
        }}
        ref={webViewRef}
        source={{
          uri: 'https://auth0.openai.com/u/login',
        }}
        style={styles.container}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ExternalPage;
